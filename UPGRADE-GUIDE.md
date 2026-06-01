# SmartPrompt Elite - Upgrade Guide

## Upgrading from V1.0.0 to V1.1.0 (Zero Downtime)

### Prerequisites
- Admin wallet with ownership privileges
- 0.05 ETH for gas fees
- Backup of all contract state

### Step-by-Step Upgrade

```bash
# 1. Deploy new implementation
npx hardhat run scripts/upgrade-v1.1.js --network base

# 2. Verify upgrade
npx hardhat run scripts/verify-upgrade.js --network base

# 3. Migrate data (if needed)
node scripts/migrate-staking-data.js

# 4. Update frontend .env
NEXT_PUBLIC_CONTRACT_VERSION=1.1.0

# 5. Redeploy frontend
npm run deploy:vercel
```

Rollback Procedure

```bash
# If issues detected within 24 hours
npx hardhat run scripts/rollback-v1.0.js --network base
```

---

Upgrading from V1.2.0 to V2.0.0 (24h Downtime)

Preparation (1 week before)

1. Announce migration on Discord/Telegram
2. Snapshot all staking positions
3. Deploy new V2 contract on testnet

Migration Day (Day 1 - 00:00 UTC)

```bash
# 00:00 - Pause V1 contract
npx hardhat run scripts/pause-contract.js --network base

# 01:00 - Deploy V2 contract
npx hardhat run scripts/deploy-v2.js --network base

# 02:00 - Begin merkle distribution of V2 passes
node scripts/distribute-v2-passes.js

# 12:00 - Verify 50% of users migrated
# 23:00 - Complete migration

# 23:59 - Unpause V2 contract
```

User Action Required

1. Connect wallet to migration portal
2. Burn V1 NFT → claim V2 NFT + bonus
3. Re-stake in new contract

---

Emergency Procedures

Critical Bug Discovery

```bash
# Emergency pause (30 seconds)
npx hardhat run scripts/emergency-pause.js --network base

# Deploy hotfix (1 hour)
npx hardhat run scripts/hotfix-deploy.js --network base

# Resume operations
npx hardhat run scripts/unpause.js --network base
```

Multisig Requirements

Action Confirmations Delay
Pause contract 2/5 Immediate
Upgrade contract 3/5 48 hours
Emergency withdrawal 4/5 72 hours
Treasury transfer 5/5 7 days
