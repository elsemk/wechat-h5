import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from '../../components/TopBar';
import { clearSession, getUser } from '../../utils/auth';

export default function MePage() {
  const navigate = useNavigate();
  const user = useMemo(() => getUser(), []);

  const logout = () => {
    clearSession();
    navigate('/auth', { replace: true });
  };

  return (
    <>
      <TopBar title="我" />
      <div className="wx-me-header">
        <div className="wx-me-avatar">🙂</div>
        <div>
          <div className="wx-me-name">{user?.nickname || user?.account || '微信用户'}</div>
          <div className="wx-me-id">微信号：{user?.account || 'wx_user'}</div>
        </div>
      </div>

      <div className="wx-list">
        <div className="wx-cell"><div className="wx-cell-main"><div className="wx-cell-title">服务</div></div></div>
        <div className="wx-cell"><div className="wx-cell-main"><div className="wx-cell-title">收藏</div></div></div>
        <div className="wx-cell"><div className="wx-cell-main"><div className="wx-cell-title">设置</div></div></div>
      </div>

      <div className="wx-logout-wrap">
        <button className="wx-primary-btn" onClick={logout} type="button">退出登录</button>
      </div>
    </>
  );
}
