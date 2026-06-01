/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useCallback, useEffect } from 'react';
import { NFTTier, NFTPass, PassState } from './types.ts';

const TIERS: NFTTier[] = [
  { id: 0, name: '1 Week Access', price: '0.01', durationDays: 7, maxSupply: 1000, minted: 243 },
  { id: 1, name: '1 Month Access', price: '0.03', durationDays: 30, maxSupply: 500, minted: 112 },
  { id: 2, name: 'Lifetime Access', price: '0.1', durationDays: 0, maxSupply: 100, minted: 45 },
];

export function usePasses() {
  const [passState, setPassState] = useState<PassState>({
    ownedPasses: [],
    isMinting: false,
    totalPoints: 0,
    contractAddresses: {
      nft: '0x8f2a...1b9c',
      oracle: '0x3d2e...f5a1',
      treasury: '0x7c1b...b4e2'
    }
  });

  const mintPass = useCallback(async (tierId: number) => {
    setPassState(prev => ({ ...prev, isMinting: true }));
    
    // Simulate transaction
    await new Promise(r => setTimeout(r, 1500));
    
    const tier = TIERS[tierId];
    const newPass: NFTPass = {
      tokenId: Math.floor(Math.random() * 1000).toString(),
      tierId,
      expiryTimestamp: tier.durationDays > 0 ? Date.now() + (tier.durationDays * 24 * 60 * 60 * 1000) : 0,
      isStaked: false,
      stakeRewards: 0,
      isValid: true
    };

    setPassState(prev => ({
      ...prev,
      ownedPasses: [...prev.ownedPasses, newPass],
      isMinting: false
    }));
  }, []);

  const claimAirdrop = useCallback(async () => {
    setPassState(prev => ({ ...prev, isMinting: true }));
    await new Promise(r => setTimeout(r, 1000));
    
    const newPass: NFTPass = {
      tokenId: 'FREE-' + Math.floor(Math.random() * 100).toString(),
      tierId: 0,
      expiryTimestamp: Date.now() + (7 * 24 * 60 * 60 * 1000),
      isStaked: false,
      stakeRewards: 0,
      isValid: true
    };

    setPassState(prev => ({
      ...prev,
      ownedPasses: [...prev.ownedPasses, newPass],
      isMinting: false
    }));
  }, []);

  const stakePass = useCallback((tokenId: string) => {
    setPassState(prev => ({
      ...prev,
      ownedPasses: prev.ownedPasses.map(p => 
        p.tokenId === tokenId ? { ...p, isStaked: true } : p
      )
    }));
  }, []);

  const unstakePass = useCallback((tokenId: string) => {
    setPassState(prev => {
      const pass = prev.ownedPasses.find(p => p.tokenId === tokenId);
      const earned = pass?.isStaked ? 10 : 0;
      return {
        ...prev,
        totalPoints: prev.totalPoints + earned,
        ownedPasses: prev.ownedPasses.map(p => 
          p.tokenId === tokenId ? { ...p, isStaked: false, stakeRewards: 0 } : p
        )
      };
    });
  }, []);

  return { TIERS, passState, mintPass, stakePass, unstakePass, claimAirdrop };
}
