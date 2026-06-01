/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NFT_CONTRACT_ADDRESS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
