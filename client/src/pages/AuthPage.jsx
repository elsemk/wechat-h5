import { useState } from 'react';
import { api, setAuthToken } from '../api';
import '../styles/wechat.css';

const defaultForm = { account: '', password: '', nickname: '' };

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [user, setUser] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    try {
      if (mode === 'register') {
        await api.post('/auth/register', form);
        setMsg('注册成功，请登录');
        setMode('login');
      } else {
        const { data } = await api.post('/auth/login', form);
        localStorage.setItem('wechat_token', data.token);
        setAuthToken(data.token);
        setUser(data.user);
        setMsg('登录成功');
      }
    } catch (error) {
      setMsg(error?.response?.data?.message || '请求失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('wechat_token');
    setAuthToken('');
    setUser(null);
    setForm(defaultForm);
    setMsg('已退出登录');
  };

  return (
    <div className="wechat-page">
      <div className="wechat-card">
        <div className="wechat-header">
          <div className="wechat-logo">微信</div>
          <div className="wechat-sub">与 App 视觉对齐（H5）</div>
        </div>

        {user ? (
          <div className="wechat-profile">
            <h3>欢迎，{user.nickname || user.account}</h3>
            <p>账号：{user.account}</p>
            <button className="wechat-btn secondary" onClick={logout}>退出登录</button>
          </div>
        ) : (
          <>
            <div className="wechat-tabs">
              <button
                className={mode === 'login' ? 'active' : ''}
                onClick={() => setMode('login')}
              >
                登录
              </button>
              <button
                className={mode === 'register' ? 'active' : ''}
                onClick={() => setMode('register')}
              >
                注册
              </button>
            </div>

            <form className="wechat-form" onSubmit={submit}>
              <input
                placeholder="请输入账号（6-20 位）"
                value={form.account}
                onChange={(e) => setForm({ ...form, account: e.target.value })}
              />
              <input
                type="password"
                placeholder="请输入密码（8-32 位，字母+数字）"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {mode === 'register' && (
                <input
                  placeholder="昵称（可选）"
                  value={form.nickname}
                  onChange={(e) => setForm({ ...form, nickname: e.target.value })}
                />
              )}

              <button className="wechat-btn" type="submit" disabled={loading}>
                {loading ? '处理中...' : mode === 'login' ? '登录' : '注册'}
              </button>
            </form>
          </>
        )}

        {msg && <div className="wechat-msg">{msg}</div>}
      </div>
    </div>
  );
}
