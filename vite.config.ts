import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ command }) => {
    if (command === 'build') {
        return {
            plugins: [dts({ include: ['src'] })],
            build: {
                lib: {
                    entry: 'src/index.ts',
                    name: 'URDFLoader',
                    fileName: 'urdf-loader',
                    formats: ['es', 'cjs'],
                },
                rollupOptions: {
                    external: ['three'],
                    output: {
                        globals: { three: 'THREE' },
                    },
                },
            },
        };
    }

    // dev server — serve the example app
    return {
        root: 'example',
    };
});
