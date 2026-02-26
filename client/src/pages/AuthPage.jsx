import { useState } from 'react';
import { api, setAuthToken } from '../api';
import '../styles/wechat.css';

const defaultForm = { account: '', password: '', nickname: '' };

export default function AuthPage({ onLoginSuccess }) {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

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
        localStorage.setItem('wechat_user', JSON.stringify(data.user));
        setAuthToken(data.token);
        onLoginSuccess(data.user);
      }
    } catch (error) {
      setMsg(error?.response?.data?.message || '请求失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wx-auth-wrap">
      <div className="wx-auth-logo">微信</div>
      <div className="wx-auth-sub">手机号 / 微信号 / QQ号</div>

      <div className="wx-auth-tabs">
        <button
          className={mode === 'login' ? 'active' : ''}
          onClick={() => setMode('login')}
          type="button"
        >
          登录
        </button>
        <button
          className={mode === 'register' ? 'active' : ''}
          onClick={() => setMode('register')}
          type="button"
        >
          注册
        </button>
      </div>

      <form className="wx-auth-form" onSubmit={submit}>
        <input
          placeholder="请输入账号"
          value={form.account}
          onChange={(e) => setForm({ ...form, account: e.target.value })}
        />
        <input
          type="password"
          placeholder="请输入密码"
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

        <button className="wx-primary-btn" type="submit" disabled={loading}>
          {loading ? '处理中...' : mode === 'login' ? '登录' : '注册'}
        </button>
      </form>

      {msg && <div className="wx-auth-msg">{msg}</div>}
    </div>
  );
}
