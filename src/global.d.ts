declare module "*.svg" {
  const src: string;
  export default src;
}

interface ImportMetaEnv {
  readonly VITE_SITE_MODE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}