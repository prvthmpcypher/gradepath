/* ===== app-launcher.js — Ecosystem Auth & Google App Launcher Dropdown ===== */

(function () {
  const SUPABASE_URL = 'https://xyzcompany.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';
  
  const cookieStorage = {
    getItem: (key) => {
      const name = key + '=';
      const decodedCookie = decodeURIComponent(document.cookie);
      const ca = decodedCookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
      }
      return null;
    },
    setItem: (key, value) => {
      document.cookie = `${key}=${encodeURIComponent(value)}; path=/; domain=.poorvithmp.com; max-age=31536000; SameSite=Lax; Secure`;
    },
    removeItem: (key) => {
      document.cookie = `${key}=; path=/; domain=.poorvithmp.com; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Secure`;
    }
  };

  let supabaseClient = null;
  if (window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        storage: cookieStorage
      }
    });
  }

  const TOOLS_LIST = [
    { id: 'aiscrubber', name: 'AIScrubber', desc: 'AI Prompt & Metadata Privacy', icon: '🛡️', color: '#059669', url: 'https://aiscrubber.poorvithmp.com' },
    { id: 'portfoliogen', name: 'PortfolioGen', desc: 'Developer Portfolio Generator', icon: '📁', color: '#2563eb', url: 'https://portfoliogen.poorvithmp.com' },
    { id: 'gradepath', name: 'GradePath', desc: 'Academic GPA Goal Planner', icon: '🎓', color: '#d97706', url: 'https://gradepath.poorvithmp.com' },
    { id: 'safegen', name: 'SafeGen', desc: 'Crypto Key & Password Vault', icon: '🔐', color: '#e11d48', url: 'https://safegen.poorvithmp.com' },
    { id: 'infinitecanvas', name: 'InfiniteCanvas', desc: 'Endless Visual Canvas', icon: '🎨', color: '#9333ea', url: 'https://infinitecanvas.poorvithmp.com' },
    { id: 'poorvithmp', name: 'PoorvithMP', desc: 'Main Portfolio & Hub', icon: '🏠', color: '#1e293b', url: 'https://poorvithmp.com' }
  ];

  // Daily Trial Logic
  window.getGradePathTrialInfo = function () {
    const today = new Date().toISOString().slice(0, 10);
    const key = `poorvithmp_trial_gradepath_${today}`;
    const count = parseInt(localStorage.getItem(key) || '0', 10);
    const max = 3;
    return {
      count,
      max,
      remaining: Math.max(0, max - count),
      isBlocked: count >= max
    };
  };

  window.recordGradePathTrial = function () {
    const today = new Date().toISOString().slice(0, 10);
    const key = `poorvithmp_trial_gradepath_${today}`;
    const { count } = window.getGradePathTrialInfo();
    localStorage.setItem(key, (count + 1).toString());
    return window.getGradePathTrialInfo();
  };

  window.showTrialLimitModal = function () {
    if (typeof showModal === 'function') {
      showModal({
        title: '⚡ Daily Free Trial Reached',
        body: `
          <p style="margin-bottom:12px; color:#475569;">You've used your 3 free GPA calculations for today. Sign in to your <strong>PoorvithMP</strong> account for unlimited, unblocked access across all PoorvithMP Tools!</p>
          <div style="margin-top:16px; text-align:center;">
            <a href="https://poorvithmp.com/auth" target="_blank" style="display:inline-block; padding:10px 20px; background:#2F6FED; color:#fff; font-weight:bold; border-radius:8px; text-decoration:none;">Sign In / Create Account</a>
          </div>
        `,
        actions: [{ text: 'Maybe Later', class: 'btn-secondary', onClick: () => {} }]
      });
    } else {
      alert("You've reached your 3 free GPA calculations for today. Sign in to PoorvithMP for unlimited access!");
    }
  };

  // Mount App Launcher Dropdown into Header Navbar
  document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.getElementById('navLinks');
    if (!navLinks) return;

    const launcherLi = document.createElement('li');
    launcherLi.className = 'app-launcher-li';
    launcherLi.style.position = 'relative';

    launcherLi.innerHTML = `
      <button id="appLauncherBtn" class="app-launcher-trigger" style="display:flex; align-items:center; gap:6px; padding:6px 12px; border:1px solid rgba(0,0,0,0.12); background:rgba(255,255,255,0.7); border-radius:10px; cursor:pointer; font-weight:bold; font-size:12px;">
        <span style="font-size:14px;">⋮⋮⋮</span>
        <span id="appLauncherUser">Apps</span>
      </button>

      <div id="appLauncherMenu" class="app-launcher-menu" style="display:none; position:absolute; right:0; top:calc(100% + 8px); width:320px; background:#0f172a; color:#f8fafc; border-radius:16px; border:1px solid #1e293b; padding:16px; box-shadow:0 20px 40px rgba(0,0,0,0.3); z-index:9999;">
        <div style="border-bottom:1px solid #1e293b; padding-bottom:12px; margin-bottom:12px; font-size:12px;">
          <div id="userHeaderInfo" style="display:flex; justify-content:space-between; align-items:center;">
            <div>
              <div style="font-weight:bold; color:#fff;">Guest User (3 Free/Day)</div>
              <div style="font-size:11px; color:#94a3b8;">Sign in for unlimited access</div>
            </div>
            <a href="https://poorvithmp.com/auth" target="_blank" style="padding:4px 10px; background:#2563eb; color:#fff; border-radius:6px; font-weight:bold; text-decoration:none; font-size:11px;">Sign In</a>
          </div>
        </div>

        <div style="font-size:10px; font-weight:bold; text-transform:uppercase; letter-spacing:1px; color:#64748b; margin-bottom:8px;">
          MY TOOLS & LABS
        </div>

        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:8px;">
          ${TOOLS_LIST.map(tool => `
            <a href="${tool.url}" style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:10px 4px; background:rgba(255,255,255,0.05); border-radius:10px; text-decoration:none; color:#e2e8f0; font-size:11px; text-align:center; transition:background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='rgba(255,255,255,0.05)'">
              <span style="font-size:20px; margin-bottom:4px;">${tool.icon}</span>
              <span style="font-weight:bold; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:100%;">${tool.name}</span>
            </a>
          `).join('')}
        </div>
      </div>
    `;

    navLinks.appendChild(launcherLi);

    const btn = document.getElementById('appLauncherBtn');
    const menu = document.getElementById('appLauncherMenu');

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', function (e) {
      if (!launcherLi.contains(e.target)) {
        menu.style.display = 'none';
      }
    });

    // Check Supabase Auth state if client exists
    if (supabaseClient) {
      supabaseClient.auth.getSession().then(({ data: { session } }) => {
        updateUserUI(session?.user);
      });
      supabaseClient.auth.onAuthStateChange((_event, session) => {
        updateUserUI(session?.user);
      });
    }

    function updateUserUI(user) {
      const userSpan = document.getElementById('appLauncherUser');
      const userHeaderInfo = document.getElementById('userHeaderInfo');

      if (user) {
        const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Account';
        if (userSpan) userSpan.textContent = name;
        if (userHeaderInfo) {
          userHeaderInfo.innerHTML = `
            <div>
              <div style="font-weight:bold; color:#fff;">${name}</div>
              <div style="font-size:11px; color:#94a3b8;">${user.email}</div>
            </div>
            <button id="signOutBtn" style="padding:4px 10px; background:#e11d48; color:#fff; border:none; border-radius:6px; font-weight:bold; cursor:pointer; font-size:11px;">Sign Out</button>
          `;
          document.getElementById('signOutBtn')?.addEventListener('click', async () => {
            await supabaseClient.auth.signOut();
            location.reload();
          });
        }
      }
    }
  });
})();
