import { useEffect, useState } from 'react';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
import { setAuthToken } from './api';
import './styles/wechat.css';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('wechat_token');
    const userStr = localStorage.getItem('wechat_user');
    if (token) setAuthToken(token);
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch {
        localStorage.removeItem('wechat_user');
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('wechat_token');
    localStorage.removeItem('wechat_user');
    setAuthToken('');
    setUser(null);
  };

  if (!user) return <AuthPage onLoginSuccess={setUser} />;
  return <MainPage user={user} onLogout={logout} />;
}
