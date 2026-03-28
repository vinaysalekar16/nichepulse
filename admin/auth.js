/**
 * NichePulse Admin Auth
 * Simple SHA-256 password gate for static-site admin protection.
 * Change ADMIN_HASH to the SHA-256 of your chosen password.
 *
 * Default password: nichepulse2026
 * Generate your own hash at: https://emn178.github.io/online-tools/sha256.html
 */

const ADMIN_HASH = '921b587fa9d65a7581dc4a755fbdfd15de56eacceaaf6885c9703fb4ebb9ac52'; // SHA-256 of: nichepulse2026  ← CHANGE THIS

// Lightweight SHA-256 (no external dependency needed)
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

const AUTH_KEY   = 'np_admin_auth';
const SESSION_MS = 8 * 60 * 60 * 1000; // 8 hours

function isAuthed() {
  try {
    const s = JSON.parse(localStorage.getItem(AUTH_KEY) || '{}');
    return s.token && s.expires && Date.now() < s.expires;
  } catch { return false; }
}

function setAuthed() {
  localStorage.setItem(AUTH_KEY, JSON.stringify({
    token: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36),
    expires: Date.now() + SESSION_MS
  }));
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  location.reload();
}

// Inject login screen if not authenticated
if (!isAuthed()) {
  document.addEventListener('DOMContentLoaded', function () {
    document.body.innerHTML = `
      <style>
        *{box-sizing:border-box;margin:0;padding:0}
        body{background:#080809;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:'DM Sans',sans-serif}
        .login-card{background:#111113;border:1px solid #1f1f22;border-radius:12px;padding:2.5rem 2rem;width:90%;max-width:380px}
        .login-logo{display:flex;align-items:center;gap:.6rem;margin-bottom:2rem;justify-content:center}
        .logo-mark{color:#f0a500;font-size:1.4rem}
        .logo-text{font-family:'Fraunces',serif;font-size:1.3rem;font-weight:700;color:#e8e6de}
        .login-title{font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;color:#555;text-align:center;margin-bottom:1.75rem}
        .field{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1.2rem}
        .field label{font-size:.78rem;color:#666;font-weight:500}
        .field input{background:#080809;border:1px solid #1f1f22;border-radius:6px;color:#e8e6de;padding:.7rem 1rem;font-size:.9rem;font-family:'DM Sans',sans-serif;transition:border-color .2s;width:100%}
        .field input:focus{outline:none;border-color:#f0a500}
        .btn-login{width:100%;padding:.75rem;background:#f0a500;border:none;border-radius:6px;color:#000;font-weight:600;font-size:.9rem;font-family:'DM Sans',sans-serif;cursor:pointer;transition:background .15s;margin-top:.5rem}
        .btn-login:hover{background:#d99400}
        .login-error{color:#e05252;font-size:.82rem;text-align:center;margin-top:.75rem;min-height:1.2em}
        .login-hint{font-size:.75rem;color:#444;text-align:center;margin-top:1.25rem}
      </style>
      <link href="https://fonts.googleapis.com/css2?family=Fraunces:wght@700&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet"/>
      <div class="login-card">
        <div class="login-logo">
          <span class="logo-mark">◈</span>
          <span class="logo-text">NichePulse</span>
        </div>
        <div class="login-title">Admin Access</div>
        <div class="field">
          <label>Password</label>
          <input type="password" id="pw-input" placeholder="Enter admin password" autocomplete="current-password"/>
        </div>
        <button class="btn-login" onclick="doLogin()">Unlock Admin Panel</button>
        <div class="login-error" id="login-error"></div>
        <div class="login-hint">Session lasts 8 hours. Change your password in auth.js.</div>
      </div>
    `;

    document.getElementById('pw-input').addEventListener('keydown', e => {
      if (e.key === 'Enter') doLogin();
    });
  });
}

async function doLogin() {
  const pw  = document.getElementById('pw-input').value;
  const err = document.getElementById('login-error');
  if (!pw) { err.textContent = 'Please enter a password.'; return; }

  const hash = await sha256(pw);
  if (hash === ADMIN_HASH) {
    setAuthed();
    location.reload();
  } else {
    err.textContent = '❌ Wrong password. Try again.';
    document.getElementById('pw-input').value = '';
    document.getElementById('pw-input').focus();
  }
}
