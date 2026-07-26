/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** dubu-social API base. Defaults to https://lapai.dubupay.com, which is
   *  correct for production — only set this to point at a local backend.
   *  NOT api.dubupay.com; that is the separate dubu-api service. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
