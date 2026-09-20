/// <reference types="vite-plugin-pwa/vanillajs" />

declare module "*.json" {
    const types: Array<string>;
    export default types;
}
