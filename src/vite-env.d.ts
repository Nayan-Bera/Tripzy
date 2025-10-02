
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL?: string
  readonly VITE_APP_TITLE?: string
  // add more variables here, must start with "VITE_"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
