import { useEffect } from 'react';
import AuthPage from './pages/AuthPage';
import { setAuthToken } from './api';

export default function App() {
  useEffect(() => {
    const token = localStorage.getItem('wechat_token');
    if (token) setAuthToken(token);
  }, []);

  return <AuthPage />;
}
