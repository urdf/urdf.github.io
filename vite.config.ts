import { defineConfig } from 'vite';
import path from 'node:path';
import dts from 'vite-plugin-dts';
import { urdfAssembler } from './vite-plugin-urdf-assembler';

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
    const robotsRoot = path.resolve('example/public/robots');
    return {
        root: 'example',
        plugins: [
            urdfAssembler([{
                name:     'robot-car',
                partsDir: path.join(robotsRoot, 'robot-car', 'parts'),
                outFile:  path.join(robotsRoot, 'robot-car', 'robot-car.urdf'),
            }]),
        ],
    };
});
