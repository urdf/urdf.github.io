import type { Plugin } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import fs from 'node:fs';
import path from 'node:path';

export interface RobotParts {
    name:     string;  // robot identifier, becomes <robot name="...">
    partsDir: string;  // absolute path to the parts/ directory
    outFile:  string;  // absolute path to the assembled .urdf output
}

function readPartFiles(partsDir: string): string[] {
    return fs.readdirSync(partsDir).filter(f => f.endsWith('.xml')).sort();
}

function assemble({ name, partsDir, outFile }: RobotParts): void {
    const files     = readPartFiles(partsDir);
    const introFiles = files.filter(f => f.startsWith('00'));
    const bodyFiles  = files.filter(f => !f.startsWith('00'));

    const intro = introFiles
        .map(f => fs.readFileSync(path.join(partsDir, f), 'utf-8').trimEnd())
        .join('\n');
    const body = bodyFiles
        .map(f => fs.readFileSync(path.join(partsDir, f), 'utf-8').trimEnd())
        .join('\n\n');

    const out = `<?xml version="1.0"?>\n${intro}\n<robot name="${name}">\n\n${body}\n\n</robot>\n`;
    fs.writeFileSync(outFile, out, 'utf-8');

    // Manifest lets the browser discover available parts
    const manifest = path.join(
        path.dirname(outFile),
        `${path.basename(outFile, '.urdf')}.parts.json`,
    );
    fs.writeFileSync(manifest, JSON.stringify({ robot: name, parts: files }), 'utf-8');
    console.log(`[urdf-assembler] ${name}: assembled ${files.length} parts`);
}

function readBody(req: IncomingMessage): Promise<string> {
    return new Promise((resolve, reject) => {
        let s = '';
        req.on('data', (c: Buffer) => { s += c.toString(); });
        req.on('end', () => resolve(s));
        req.on('error', reject);
    });
}

export function urdfAssembler(robots: RobotParts[]): Plugin {
    return {
        name: 'urdf-assembler',

        buildStart() {
            for (const r of robots) assemble(r);
        },

        configureServer(server) {
            for (const r of robots) server.watcher.add(r.partsDir);

            server.watcher.on('change', (file) => {
                const r = robots.find(r => file.startsWith(r.partsDir + path.sep));
                if (r) { assemble(r); server.ws.send({ type: 'full-reload' }); }
            });
            server.watcher.on('add', (file) => {
                const r = robots.find(r => file.startsWith(r.partsDir + path.sep));
                if (r) { assemble(r); server.ws.send({ type: 'full-reload' }); }
            });

            // Endpoint for the editor to write individual part files
            server.middlewares.use('/urdf-write-part', async (
                req: IncomingMessage,
                res: ServerResponse,
            ) => {
                if (req.method !== 'POST') { res.statusCode = 405; res.end(); return; }
                try {
                    const body = JSON.parse(await readBody(req)) as {
                        robot: string; filename: string; content: string;
                    };
                    const robot = robots.find(r => r.name === body.robot);
                    if (!robot) {
                        res.statusCode = 404;
                        res.end(JSON.stringify({ error: 'unknown robot' }));
                        return;
                    }
                    // Only allow simple filenames — no path traversal
                    if (!/^[\w-]+\.xml$/.test(body.filename)) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: 'invalid filename' }));
                        return;
                    }
                    fs.writeFileSync(path.join(robot.partsDir, body.filename), body.content, 'utf-8');
                    assemble(robot);
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ ok: true }));
                } catch (e) {
                    res.statusCode = 500;
                    res.end(JSON.stringify({ error: String(e) }));
                }
            });
        },
    };
}
