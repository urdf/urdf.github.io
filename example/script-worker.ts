/// <reference lib="webworker" />

// Evaluates a user-supplied JS function expression and returns a binary STL ArrayBuffer.
// Input:  { id: string, src: string }  — src must be a function expression, e.g. (function(){ … })
// Output: { id, buf: ArrayBuffer }     — on success, buf is a transferable
//         { id, error: string, line? } — on failure

self.onmessage = ({ data }: MessageEvent<{ id: string; src: string }>): void => {
    const { id, src } = data;
    try {
        // Wrapping adds one line ("use strict";\n) — subtract 1 from stack line numbers.
        const fn = new Function('"use strict";\nreturn (' + src + ')')() as () => unknown;
        if (typeof fn !== 'function')
            throw new Error('Script must be a function expression, e.g. (function() { … })');
        const result = fn();
        if (!(result instanceof ArrayBuffer))
            throw new Error('Function must return an ArrayBuffer');
        if (result.byteLength < 84 || (result.byteLength - 84) % 50 !== 0)
            throw new Error(`Invalid STL: byteLength=${result.byteLength}, expected 84 + N×50`);
        self.postMessage({ id, buf: result }, [result]);
    } catch (e) {
        const err = e as Error;
        const m   = err.stack?.match(/<anonymous>:(\d+):/);
        const line = m ? parseInt(m[1], 10) - 1 : undefined; // -1 for the injected "use strict" line
        self.postMessage({ id, error: err.message, line });
    }
};
