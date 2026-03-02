// Build config for the GitHub Pages demo site (example/ → docs/)
import { defineConfig } from 'vite';
import path from 'node:path';
import { urdfAssembler } from './vite-plugin-urdf-assembler';

const robotsRoot = path.resolve('example/public/robots');

export default defineConfig({
    root: 'example',
    plugins: [
        urdfAssembler([{
            name:     'robot-car',
            partsDir: path.join(robotsRoot, 'robot-car', 'parts'),
            outFile:  path.join(robotsRoot, 'robot-car', 'robot-car.urdf'),
        }]),
    ],
    build: {
        outDir: '../docs',
        emptyOutDir: true,
    },
});
