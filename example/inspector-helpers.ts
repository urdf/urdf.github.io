// ── Inspector utilities ────────────────────────────────────────────────────
//
// Pure helper functions for the joint inspector panel.

/** Format a number for display in inspector inputs. */
export function fmt(v: number): string { return v.toFixed(4); }

/** Convert a joint name to a human-readable label. */
export function toLabel(jointName: string): string {
    return jointName
        .replace(/_joint$/, '')
        .replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
}

/** Derive the link name from a joint name. */
export function linkNameFor(jointName: string): string {
    return jointName.replace(/_joint$/, '');
}
