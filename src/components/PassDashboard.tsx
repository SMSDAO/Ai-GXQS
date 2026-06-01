/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Crown, Timer, ShieldCheck, Zap, Coins, Info, ExternalLink, X, Gift } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NFTTier, NFTPass, PassState } from '../types.ts';
import ClaimAirdrop from './ClaimAirdrop.tsx';

interface PassDashboardProps {
  tiers: NFTTier[];
  state: PassState;
  onMint: (tierId: number) => void;
  onStake: (tokenId: string) => void;
  onUnstake: (tokenId: string) => void;
  onClaimAirdrop: () => void;
}

export default function PassDashboard({ tiers, state, onMint, onStake, onUnstake, onClaimAirdrop }: PassDashboardProps) {
  const [showAirdrop, setShowAirdrop] = useState(false);

  return (
    <div className="flex-1 p-8 space-y-8 overflow-y-auto bg-slate-50/30">
      <AnimatePresence>
        {showAirdrop && (
          <ClaimAirdrop 
            onClose={() => setShowAirdrop(false)}
            onSuccess={onClaimAirdrop}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Access Passes</h2>
          <p className="text-slate-500 text-sm">Mint and stake SmartPrompt Elite Passes for enhanced deployment capabilities.</p>
        </div>
        <button
          onClick={() => setShowAirdrop(true)}
          disabled={state.isMinting}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold border border-indigo-100 hover:bg-indigo-100 transition-all disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Claim Airdrop</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tiers Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          {tiers.map((tier) => (
            <div key={tier.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col shadow-sm relative overflow-hidden group">
              {tier.id === 2 && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-lg">
                  Exclusive
                </div>
              )}
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-2 rounded-lg ${tier.id === 2 ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-600'}`}>
                  {tier.id === 2 ? <Crown className="w-5 h-5" /> : <Timer className="w-5 h-5" />}
                </div>
                <h3 className="font-bold text-slate-800">{tier.name}</h3>
              </div>
              <div className="mb-6">
                <span className="text-3xl font-bold text-slate-900">{tier.price} ETH</span>
                <p className="text-xs text-slate-400 mt-1">{tier.minted} / {tier.maxSupply} Minted</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-center space-x-2 text-xs text-slate-600">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Oracle Identity Proof</span>
                </li>
                <li className="flex items-center space-x-2 text-xs text-slate-600">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Priority Build Queue</span>
                </li>
              </ul>
              <button
                onClick={() => onMint(tier.id)}
                disabled={state.isMinting}
                className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${
                  state.isMinting 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95'
                }`}
              >
                {state.isMinting ? 'Minting...' : 'Purchase Pass'}
              </button>
            </div>
          ))}
        </div>

        {/* Contract Info Panel */}
        <div className="lg:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col shadow-xl text-white">
          <h3 className="text-sm font-bold mb-4 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>On-Chain Status</span>
          </h3>
          <div className="space-y-6 flex-1">
            <ContractRow label="NFT Contract" address={state.contractAddresses.nft} />
            <ContractRow label="Oracle Node" address={state.contractAddresses.oracle} />
            <ContractRow label="Treasury" address={state.contractAddresses.treasury} />
            <div className="pt-4 border-t border-white/5">
              <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-2">
                <span>Network</span>
                <span className="text-emerald-400">Base Mainnet</span>
              </div>
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-full opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Passes Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
            <Coins className="w-5 h-5 text-indigo-600" />
            <span>My Owned Passes</span>
          </h3>
          <div className="bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full flex items-center space-x-2">
            <Zap className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-indigo-800">{state.totalPoints} Staking Points</span>
          </div>
        </div>

        {state.ownedPasses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Info className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500 text-sm font-medium">You don't own any elite passes yet.</p>
            <p className="text-slate-400 text-xs mt-1">Mint a pass to unlock premium deployment features.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <AnimatePresence>
              {state.ownedPasses.map((pass) => (
                <motion.div
                  key={pass.tokenId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-xl border border-slate-200 p-4 flex items-center justify-between shadow-sm relative overflow-hidden"
                >
                  {pass.isStaked && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                  )}
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${pass.tierId === 2 ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-50 text-slate-400'}`}>
                      <TowerControlIcon tierId={pass.tierId} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm">SmartPrompt Elite #{pass.tokenId}</h4>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {pass.expiryTimestamp === 0 ? 'Lifetime Access' : `Expires: ${new Date(pass.expiryTimestamp).toLocaleDateString()}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {pass.isStaked ? (
                      <button 
                        onClick={() => onUnstake(pass.tokenId)}
                        className="px-4 py-1.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-xs font-bold hover:bg-emerald-100 transition-colors"
                      >
                        Unstake & Claim
                      </button>
                    ) : (
                      <button 
                        onClick={() => onStake(pass.tokenId)}
                        className="px-4 py-1.5 bg-indigo-50 text-indigo-600 border border-indigo-100 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-colors"
                      >
                        Stake Pass
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

function TowerControlIcon({ tierId }: { tierId: number }) {
  if (tierId === 2) return <Crown className="w-5 h-5" />;
  if (tierId === 1) return <Timer className="w-5 h-5" />;
  return <Zap className="w-5 h-5" />;
}

function ContractRow({ label, address }: { label: string; address: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{label}</p>
      <div className="flex items-center justify-between text-xs font-mono bg-white/5 rounded-lg p-2 border border-white/5 group transition-colors hover:border-indigo-500/30">
        <span className="text-slate-300">{address}</span>
        <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-indigo-400 transition-colors" />
      </div>
    </div>
  );
}
