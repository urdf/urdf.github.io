// Build config for the GitHub Pages demo site (example/ → docs/)
import { defineConfig } from 'vite';

export default defineConfig({
    root: 'example',
    build: {
        outDir: '../docs',
        emptyOutDir: true,
    },
});
