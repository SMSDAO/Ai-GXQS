// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

/**
 * @title SmartPromptPass
 * @dev Time-limited NFT passes with staking, airdrops, and oracle verification
 * @notice 1 week, 1 month, or lifetime access to SmartPrompt AI service
 */
contract SmartPromptPass is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable, ReentrancyGuard {
    
    // ============ Structs ============
    
    struct Pass {
        uint256 expiryTimestamp;  // 0 = lifetime
        uint256 tier;              // 0=1week, 1=1month, 2=lifetime
        uint256 stakeAmount;
        uint256 lastStakeTimestamp;
        bool isStaked;
        bytes32 encryptedHash;     // For GitHub/AI verification
    }
    
    struct Tier {
        string name;
        uint256 price;
        uint256 durationDays;
        uint256 maxSupply;
        uint256 minted;
    }
    
    // ============ State Variables ============
    
    mapping(uint256 => Pass) public passes;
    mapping(address => bool) public hasFreeMint;
    mapping(address => uint256[]) public userTokens;
    mapping(bytes32 => bool) public usedHashes;
    
    Tier[] public tiers;
    bytes32 public merkleRoot;  // For airdrop claims
    
    uint256 public reserveWallet;  // Admin fee reserve
    uint256 public totalStaked;
    uint256 public rewardRate = 10;  // Points per day staked
    uint256 public lastRewardDistribution;
    
    address public oracleAddress;     // Chainlink oracle for verification
    address public treasuryAddress;   // Fee collection
    string public baseURI;
    
    // Events
    event PassMinted(address indexed user, uint256 indexed tokenId, uint256 tier);
    event PassStaked(uint256 indexed tokenId, address indexed user);
    event PassUnstaked(uint256 indexed tokenId, address indexed user);
    event RewardsClaimed(address indexed user, uint256 amount);
    event AirdropClaimed(address indexed user, uint256 amount);
    event HashVerified(uint256 indexed tokenId, bool isValid);
    event BuybackExecuted(uint256 amount);
    
    // ============ Constructor ============
    
    constructor(address _treasuryAddress) ERC721("SmartPrompt Elite Pass", "SPEP") {
        treasuryAddress = _treasuryAddress;
        
        // Define tiers: [name, price in wei, duration days, max supply]
        tiers.push(Tier("1 Week Access", 0.01 ether, 7, 1000, 0));
        tiers.push(Tier("1 Month Access", 0.03 ether, 30, 500, 0));
        tiers.push(Tier("Lifetime Access", 0.1 ether, 0, 100, 0));
        
        reserveWallet = address(this).balance;
        lastRewardDistribution = block.timestamp;
    }
    
    // ============ Minting Functions ============
    
    function mintWithTier(uint256 tierId) external payable nonReentrant {
        require(tierId < tiers.length, "Invalid tier");
        Tier storage tier = tiers[tierId];
        require(tier.minted < tier.maxSupply, "Max supply reached");
        require(msg.value >= tier.price, "Insufficient payment");
        
        uint256 tokenId = totalSupply() + 1;
        _safeMint(msg.sender, tokenId);
        
        // Set pass properties
        uint256 expiry = tier.durationDays > 0 
            ? block.timestamp + (tier.durationDays * 1 days)
            : 0;  // 0 = lifetime
        
        passes[tokenId] = Pass({
            expiryTimestamp: expiry,
            tier: tierId,
            stakeAmount: 0,
            lastStakeTimestamp: 0,
            isStaked: false,
            encryptedHash: bytes32(0)
        });
        
        userTokens[msg.sender].push(tokenId);
        tiers[tierId].minted++;
        
        // Send admin fee to reserve
        uint256 adminFee = msg.value / 10;  // 10% admin fee
        uint256 royaltyFee = msg.value / 20; // 5% royalty
        payable(treasuryAddress).transfer(adminFee + royaltyFee);
        
        emit PassMinted(msg.sender, tokenId, tierId);
    }
    
    function freeMint(address to, uint256 tierId) external onlyOwner {
        require(tierId < tiers.length, "Invalid tier");
        require(!hasFreeMint[to], "Already claimed free mint");
        
        uint256 tokenId = totalSupply() + 1;
        _safeMint(to, tokenId);
        
        Tier storage tier = tiers[tierId];
        uint256 expiry = tier.durationDays > 0 
            ? block.timestamp + (tier.durationDays * 1 days)
            : 0;
        
        passes[tokenId] = Pass({
            expiryTimestamp: expiry,
            tier: tierId,
            stakeAmount: 0,
            lastStakeTimestamp: 0,
            isStaked: false,
            encryptedHash: bytes32(0)
        });
        
        hasFreeMint[to] = true;
        tiers[tierId].minted++;
        
        emit PassMinted(to, tokenId, tierId);
    }
    
    // ============ Oracle Verification ============
    
    function setEncryptedHash(uint256 tokenId, bytes32 hash) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        passes[tokenId].encryptedHash = hash;
    }
    
    function verifyHash(uint256 tokenId, bytes32 providedHash) external view returns (bool) {
        require(oracleAddress != address(0), "Oracle not set");
        return passes[tokenId].encryptedHash == providedHash && !usedHashes[providedHash];
    }
    
    function markHashUsed(bytes32 hash) external {
        require(msg.sender == oracleAddress, "Only oracle");
        usedHashes[hash] = true;
    }
    
    function isAccessValid(uint256 tokenId) public view returns (bool) {
        Pass memory pass = passes[tokenId];
        if (pass.expiryTimestamp == 0) return true; // Lifetime
        return block.timestamp < pass.expiryTimestamp;
    }
    
    // ============ Staking System ============
    
    function stakeToken(uint256 tokenId) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        require(!passes[tokenId].isStaked, "Already staked");
        require(isAccessValid(tokenId), "Pass expired");
        
        passes[tokenId].isStaked = true;
        passes[tokenId].lastStakeTimestamp = block.timestamp;
        totalStaked++;
        
        emit PassStaked(tokenId, msg.sender);
    }
    
    function unstakeToken(uint256 tokenId) external nonReentrant {
        require(passes[tokenId].isStaked, "Not staked");
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        
        // Calculate rewards
        uint256 rewards = calculateRewards(tokenId);
        passes[tokenId].stakeAmount += rewards;
        
        passes[tokenId].isStaked = false;
        passes[tokenId].lastStakeTimestamp = 0;
        totalStaked--;
        
        emit PassUnstaked(tokenId, msg.sender);
    }
    
    function calculateRewards(uint256 tokenId) public view returns (uint256) {
        Pass memory pass = passes[tokenId];
        if (!pass.isStaked) return 0;
        
        uint256 daysStaked = (block.timestamp - pass.lastStakeTimestamp) / 1 days;
        return daysStaked * rewardRate;
    }
    
    function claimRewards(uint256 tokenId) external nonReentrant {
        require(ownerOf(tokenId) == msg.sender, "Not owner");
        
        uint256 rewards = calculateRewards(tokenId);
        require(rewards > 0, "No rewards");
        
        passes[tokenId].stakeAmount = 0;
        passes[tokenId].lastStakeTimestamp = block.timestamp;
        
        // Mint reward tokens (simplified - would call ERC20 in production)
        emit RewardsClaimed(msg.sender, rewards);
    }
    
    // ============ Airdrop System ============
    
    function setMerkleRoot(bytes32 _merkleRoot) external onlyOwner {
        merkleRoot = _merkleRoot;
    }
    
    function claimAirdrop(uint256 amount, bytes32[] calldata merkleProof) external {
        require(!hasFreeMint[msg.sender], "Already claimed");
        
        bytes32 leaf = keccak256(abi.encodePacked(msg.sender, amount));
        require(MerkleProof.verify(merkleProof, merkleRoot, leaf), "Invalid proof");
        
        hasFreeMint[msg.sender] = true;
        
        // Mint free pass
        freeMint(msg.sender, 0); // 1-week tier
        
        emit AirdropClaimed(msg.sender, amount);
    }
    
    // ============ Buyback & Liquidity ============
    
    function executeBuyback(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient reserve");
        
        // Transfer to buyback wallet
        payable(treasuryAddress).transfer(amount);
        
        emit BuybackExecuted(amount);
    }
    
    function getReserveBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    // ============ Admin Functions ============
    
    function setOracleAddress(address _oracle) external onlyOwner {
        oracleAddress = _oracle;
    }
    
    function setBaseURI(string memory _baseURI) external onlyOwner {
        baseURI = _baseURI;
    }
    
    function setRewardRate(uint256 _rate) external onlyOwner {
        rewardRate = _rate;
    }
    
    function withdrawFees() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds");
        payable(treasuryAddress).transfer(balance);
    }
    
    // ============ View Functions ============
    
    function getUserTokens(address user) public view returns (uint256[] memory) {
        return userTokens[user];
    }
    
    function getTierInfo(uint256 tierId) public view returns (
        string memory name,
        uint256 price,
        uint256 durationDays,
        uint256 maxSupply,
        uint256 minted
    ) {
        Tier memory tier = tiers[tierId];
        return (tier.name, tier.price, tier.durationDays, tier.maxSupply, tier.minted);
    }
    
    // ============ Overrides ============
    
    function _beforeTokenTransfer(address from, address to, uint256 firstTokenId, uint256 batchSize) 
        internal 
        override(ERC721, ERC721Enumerable) 
    {
        super._beforeTokenTransfer(from, to, firstTokenId, batchSize);
    }
    
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }
    
    function tokenURI(uint256 tokenId) 
        public 
        view 
        override(ERC721, ERC721URIStorage) 
        returns (string memory) 
    {
        return super.tokenURI(tokenId);
    }
    
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    receive() external payable {}
}
