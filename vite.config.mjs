import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    root: "src",
    publicDir: "../public",
    base: "./",
    plugins: [
        VitePWA({
            registerType: "prompt",
            includeAssets: [
                "favicon.ico",
                "favicon.svg",
                "apple-touch-icon-180x180.png",
            ],
            manifest: {
                name: "Commitlint",
                short_name: "Commitlint",
                description: "Create and lint conventional commit messages.",
                start_url: "./",
                scope: "./",
                display: "standalone",
                background_color: "#555b6e",
                theme_color: "#555b6e",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                    {
                        src: "maskable-icon-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "maskable",
                    },
                ],
            },
        }),
    ],
    build: {
        outDir: "../dist",
        emptyOutDir: true,
        sourcemap: false,
    },
});
