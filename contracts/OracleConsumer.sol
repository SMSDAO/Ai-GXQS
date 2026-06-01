// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title OracleConsumer
 * @dev Connects SmartPrompt Elite to real-world GitHub commit data via Chainlink.
 */
contract OracleConsumer is ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;
    
    address public oracle;
    bytes32 public jobId;
    uint256 public fee;
    
    mapping(bytes32 => bool) public pendingRequests;
    mapping(bytes32 => bool) public verificationResults;
    
    event OracleRequest(bytes32 indexed requestId, uint256 tokenId, bytes32 hashToVerify);
    event OracleResponse(bytes32 indexed requestId, bool isValid);
    
    constructor(address _oracle, bytes32 _jobId, uint256 _fee) {
        setChainlinkToken(0x779877A7B0D9E8603169DdbD7836e478b4624789); // LINK on Base
        oracle = _oracle;
        jobId = _jobId;
        fee = _fee;
    }
    
    function requestGitHubVerification(
        uint256 tokenId, 
        bytes32 hashToVerify,
        string memory githubRepo,
        string memory commitSha
    ) external returns (bytes32 requestId) {
        Chainlink.Request memory req = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        req.add("repo", githubRepo);
        req.add("commit", commitSha);
        req.add("hashToVerify", string(abi.encodePacked(hashToVerify)));
        req.add("get", "https://api.github.com/repos/{repo}/commits/{commit}");
        req.add("path", "sha");
        
        requestId = sendChainlinkRequestTo(oracle, req, fee);
        pendingRequests[requestId] = true;
        
        emit OracleRequest(requestId, tokenId, hashToVerify);
        return requestId;
    }
    
    function fulfill(bytes32 requestId, bool isValid) public recordChainlinkFulfillment(requestId) {
        pendingRequests[requestId] = false;
        verificationResults[requestId] = isValid;
        emit OracleResponse(requestId, isValid);
    }
    
    function getVerificationResult(bytes32 requestId) public view returns (bool) {
        return verificationResults[requestId];
    }
}
