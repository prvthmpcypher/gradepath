const key = 'gradepath_theme';
const applyTheme = (theme) => { document.documentElement.dataset.theme = theme; try { localStorage.setItem(key, theme); } catch {} };
let theme = 'light'; try { theme = localStorage.getItem(key) === 'dark' ? 'dark' : 'light'; } catch {}
applyTheme(theme);
document.getElementById('theme-toggle')?.addEventListener('click', () => { theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'; applyTheme(theme); });
