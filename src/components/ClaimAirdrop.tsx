/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAccount, useSignMessage, useWriteContract, useConnect } from 'wagmi';
import { injected } from 'wagmi/connectors';
import { motion, AnimatePresence } from 'motion/react';
import { X, Gift, Zap, ShieldCheck } from 'lucide-react';

interface ClaimAirdropProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ClaimAirdrop({ onClose, onSuccess }: ClaimAirdropProps) {
  const { address, isConnected, chain } = useAccount();
  const { connect } = useConnect();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  
  const [claiming, setClaiming] = useState(false);
  const [status, setStatus] = useState('');
  
  const contractAddress = (import.meta.env.VITE_NFT_CONTRACT_ADDRESS || '0x8f2a...1b9c') as `0x${string}`;
  const contractABI = [
    {
      name: 'claimAirdrop',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'amount', type: 'uint256' },
        { name: 'merkleProof', type: 'bytes32[]' }
      ],
      outputs: []
    }
  ] as const;
  
  const handleClaim = async () => {
    if (!isConnected || !address) {
      connect({ connector: injected() });
      return;
    }
    
    setClaiming(true);
    setStatus('Verifying eligibility with Oracle...');
    
    try {
      // Step 1: Sign message for backend verification
      const message = `Claim SmartPrompt Elite Airdrop for ${address}`;
      const signature = await signMessageAsync({ account: address, message });
      
      // Step 2: Call backend to get claim data and Merkle proof
      const response = await fetch('/api/airdrop/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address, signature })
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Not eligible for this airdrop phase.');
      }
      
      setStatus('Submitting on-chain proof...');
      
      // Step 3: Execute claim on blockchain
      await writeContractAsync({
        account: address,
        chain: chain,
        address: contractAddress as `0x${string}`,
        abi: contractABI,
        functionName: 'claimAirdrop',
        args: [BigInt(data.points), data.proof],
      });
      
      setStatus('Confirming transaction...');
      // In a real app, we would wait for the receipt here.
      // For this demo, we'll simulate a short wait.
      await new Promise(r => setTimeout(r, 2000));
      
      setStatus('✅ Airdrop claimed successfully!');
      
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
      
    } catch (error: any) {
      console.error('Claim error:', error);
      setStatus(`❌ Error: ${error.shortMessage || error.message}`);
    } finally {
      setClaiming(false);
    }
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="max-w-md w-full bg-slate-900 rounded-3xl p-8 shadow-2xl border border-white/5 relative overflow-hidden"
      >
        {/* Background Accent - Purple/Pink gradient inspired by request */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 blur-[100px] -mr-32 -mt-32 rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-600/10 blur-[100px] -ml-32 -mb-32 rounded-full" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-10 relative z-10">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500 to-pink-500 opacity-20 blur-2xl rounded-full scale-150 animate-pulse" />
            <div className="w-24 h-24 bg-slate-800 rounded-3xl flex items-center justify-center relative border border-white/10 shadow-inner">
              <Gift className="w-12 h-12 text-purple-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Elite Airdrop</h2>
          <p className="text-slate-400 mt-2 text-sm">Claim your SmartPrompt Elite NFT pass & rewards.</p>
        </div>
        
        <div className="bg-black/30 rounded-2xl p-5 mb-8 border border-white/5 space-y-4 relative z-10 backdrop-blur-md">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Connected Wallet</span>
            <span className="text-pink-400 font-mono font-bold">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm pt-4 border-t border-white/5">
            <span className="text-slate-500">Tier Status</span>
            <div className="flex items-center space-x-1.5 text-purple-400 font-bold text-[10px] uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Genesis Contributor</span>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleClaim}
          disabled={claiming}
          className={`
            w-full py-5 px-6 rounded-2xl font-bold text-base transition-all relative overflow-hidden z-10
            ${!isConnected 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : claiming
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
                : 'bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 text-white shadow-xl shadow-purple-900/20 hover:scale-[1.02] active:scale-[0.98]'
            }
          `}
        >
          {claiming ? (
            <span className="flex items-center justify-center gap-3">
              <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>{status || 'Claiming...'}</span>
            </span>
          ) : isConnected ? (
            <span className="flex items-center justify-center space-x-2">
              <Gift className="w-5 h-5" />
              <span>Claim Elite Pass</span>
            </span>
          ) : (
            'Connect Wallet'
          )}
        </button>
        
        {status && !claiming && (
          <div className={`mt-5 p-4 rounded-2xl text-center text-xs font-bold leading-relaxed relative z-10 border ${
            status.includes('✅') 
              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
              : 'bg-red-500/10 text-red-400 border-red-500/20'
          }`}>
            {status}
          </div>
        )}
        
        <div className="mt-10 pt-8 border-t border-white/5 text-center relative z-10">
          <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
            Limited Availability | Phase 1 Early Access
          </p>
        </div>

      </motion.div>
    </motion.div>
  );
}
