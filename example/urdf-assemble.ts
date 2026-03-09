/**
 * Assemble a full URDF document from part-filename → XML content pairs.
 *
 * Files whose name starts with "00" are treated as header-only (XML comments,
 * processing instructions) and are placed before the <robot> wrapper. They must
 * NOT contain element nodes; such nodes would appear outside the root element
 * and be silently dropped by DOMParser.
 */
export function assembleURDF(robotName: string, parts: Iterable<[string, string]>): string {
    const sorted = [...parts].sort(([a], [b]) => a.localeCompare(b));
    const headers = sorted.filter(([k]) =>  k.startsWith('00'));
    const body    = sorted.filter(([k]) => !k.startsWith('00'));

    for (const [k, v] of headers) {
        const doc = new DOMParser().parseFromString(`<_r>${v}</_r>`, 'application/xml');
        if (doc.querySelector('_r > *')) {
            throw new Error(`assembleURDF: "${k}" contains element nodes outside <robot>. Only XML comments and processing instructions are allowed in "00-*" files.`);
        }
    }

    const introXml = headers.map(([, v]) => v.trimEnd()).join('\n');
    const bodyXml  = body.map(([, v]) => v.trimEnd()).join('\n\n');
    return `<?xml version="1.0"?>\n${introXml}\n<robot name="${robotName}">\n\n${bodyXml}\n\n</robot>\n`;
}
