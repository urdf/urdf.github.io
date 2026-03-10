export type GitHubAuth = { username: string; token: string };
export type Provider   = 'anthropic' | 'github';

let _connectGitHubFn: ((scope: string, appId: string) => Promise<GitHubAuth>) | null = null;
async function loadConnectGitHub(): Promise<(scope: string, appId: string) => Promise<GitHubAuth>> {
    if (_connectGitHubFn) return _connectGitHubFn;
    // @ts-ignore — CDN module, not bundled by Vite
    const mod = await import(/* @vite-ignore */ 'https://neevs.io/auth/connect.js');
    _connectGitHubFn = mod.connectGitHub;
    return _connectGitHubFn!;
}

export interface AuthUIDeps {
    ghBarEl:      HTMLElement;
    apikeyBarEl:  HTMLElement;
    proxyBarEl:   HTMLElement;
    proxyAvailable: () => boolean;
    provider:     () => Provider;
    appendSystemMsg: (text: string) => void;
    onGitHubAuthChange: (auth: GitHubAuth | null) => void;
    onClearChat: () => void;
}

export function updateProxyBar(deps: Pick<AuthUIDeps, 'proxyBarEl' | 'proxyAvailable' | 'provider'>): void {
    deps.proxyBarEl.hidden = !(deps.proxyAvailable() && deps.provider() === 'anthropic');
}

export function updateApiKeyBar(deps: Pick<AuthUIDeps, 'apikeyBarEl' | 'proxyAvailable'>): void {
    if (deps.proxyAvailable()) { deps.apikeyBarEl.hidden = true; return; }
    deps.apikeyBarEl.innerHTML = '';
    const key = localStorage.getItem('urdf-api-key');
    if (key) {
        const saved = document.createElement('span');
        saved.className = 'chat-apikey-saved';
        saved.textContent = 'API key saved';
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chat-apikey-remove';
        btn.textContent = 'Remove';
        btn.addEventListener('click', () => {
            localStorage.removeItem('urdf-api-key');
            updateApiKeyBar(deps);
        });
        deps.apikeyBarEl.append(saved, btn);
    } else {
        const form = document.createElement('form');
        form.autocomplete = 'off';
        const inp = document.createElement('input');
        inp.type = 'password';
        inp.placeholder = 'sk-ant-… Anthropic API key';
        inp.setAttribute('aria-label', 'Anthropic API key');
        inp.autocomplete = 'new-password';
        const btn = document.createElement('button');
        btn.type = 'submit';
        btn.className = 'chat-apikey-save';
        btn.textContent = 'Save';
        const save = () => {
            const val = inp.value.trim();
            if (!val) return;
            localStorage.setItem('urdf-api-key', val);
            updateApiKeyBar(deps);
        };
        form.addEventListener('submit', (e) => { e.preventDefault(); save(); });
        form.append(inp, btn);
        deps.apikeyBarEl.append(form);
    }
}

export function updateGitHubBar(
    deps: Pick<AuthUIDeps, 'ghBarEl' | 'appendSystemMsg' | 'onGitHubAuthChange' | 'onClearChat'>,
    githubAuth: GitHubAuth | null,
): void {
    deps.ghBarEl.innerHTML = '';
    if (githubAuth) {
        const label = document.createElement('span');
        label.className = 'chat-github-user';
        label.textContent = `@${githubAuth.username}`;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chat-github-disconnect';
        btn.textContent = 'Disconnect';
        btn.addEventListener('click', () => {
            localStorage.removeItem('urdf-gh-auth');
            deps.onClearChat();
            deps.onGitHubAuthChange(null);
            updateGitHubBar(deps, null);
        });
        deps.ghBarEl.append(label, btn);
    } else {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chat-github-connect';
        btn.textContent = 'Connect GitHub';
        btn.addEventListener('click', async () => {
            btn.textContent = 'Connecting…';
            btn.disabled = true;
            try {
                const connect = await loadConnectGitHub();
                const auth = await connect('read:user', 'urdf-viewer');
                localStorage.setItem('urdf-gh-auth', JSON.stringify(auth));
                deps.onGitHubAuthChange(auth);
                updateGitHubBar(deps, auth);
            } catch (err) {
                const e = err as Error;
                if (e.message !== 'OAuth flow cancelled') deps.appendSystemMsg(`GitHub auth failed: ${e.message}`);
                btn.textContent = 'Connect GitHub';
                btn.disabled = false;
            }
        });
        deps.ghBarEl.appendChild(btn);
    }
    const note = document.createElement('span');
    note.className = 'chat-github-note';
    note.textContent = 'Tool calls may be less reliable than Claude.';
    deps.ghBarEl.appendChild(note);
}
