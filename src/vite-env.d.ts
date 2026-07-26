/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Dubu Social API base, e.g. https://api.dubupay.com. Only used for the
   *  public seminar fetch; the site falls back to bundled copy without it. */
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
