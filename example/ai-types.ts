// Shared message types and rendering utility for AI chat controllers.

export interface TextBlock    { type: 'text'; text: string; }
export interface ToolUseBlock { type: 'tool_use'; id: string; name: string; input: Record<string, unknown>; }
export interface ToolResBlock { type: 'tool_result'; tool_use_id: string; content: string; }
export type ContentBlock = TextBlock | ToolUseBlock | ToolResBlock;
export type Msg =
    | { role: 'user';      content: string | ToolResBlock[] }
    | { role: 'assistant'; content: ContentBlock[] };

declare const marked: { parse(s: string): string } | undefined;
declare const DOMPurify: { sanitize(s: string, o?: object): string } | undefined;

export function renderMd(text: string): string {
    if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
        return DOMPurify.sanitize(marked.parse(text), { ADD_ATTR: ['style'] });
    }
    return text
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\n/g, '<br>');
}
