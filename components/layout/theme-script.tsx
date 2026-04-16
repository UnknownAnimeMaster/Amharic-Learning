export function ThemeScript() {
  const code = `
    try {
      const profileRaw = localStorage.getItem('fidel-friends.profile');
      const profile = profileRaw ? JSON.parse(profileRaw) : null;
      const theme = profile?.theme || 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (e) {}
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
