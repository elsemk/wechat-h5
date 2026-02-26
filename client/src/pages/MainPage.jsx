import { useMemo, useState } from 'react';

const mockChats = [
  { id: 1, name: '文件传输助手', preview: '明早 9:30 评审别忘了', time: '22:41', badge: 1, avatar: '📁' },
  { id: 2, name: '产品小组', preview: 'Alice: 已更新设计稿到 v12', time: '21:19', badge: 5, avatar: '👥' },
  { id: 3, name: 'Else', preview: '今晚先把 H5 验收一版', time: '20:02', badge: 0, avatar: '🙂' },
  { id: 4, name: '腾讯新闻', preview: '你关注的内容有新动态', time: '昨天', badge: 0, avatar: '📰' },
];

const mockContacts = [
  { id: 1, name: 'A-Lin', tag: 'A', avatar: 'A' },
  { id: 2, name: 'Ben', tag: 'B', avatar: 'B' },
  { id: 3, name: 'Cindy', tag: 'C', avatar: 'C' },
  { id: 4, name: 'Else', tag: 'E', avatar: 'E' },
  { id: 5, name: 'Frank', tag: 'F', avatar: 'F' },
];

const discoverItems = [
  { key: 'moments', title: '朋友圈', icon: '📷' },
  { key: 'channels', title: '视频号', icon: '🎬' },
  { key: 'scan', title: '扫一扫', icon: '🔍' },
  { key: 'mini', title: '小程序', icon: '🧩' },
];

function TopBar({ title, right = '' }) {
  return (
    <div className="wx-topbar">
      <div className="wx-topbar-title">{title}</div>
      <div className="wx-topbar-right">{right}</div>
    </div>
  );
}

function ChatsTab() {
  return (
    <>
      <TopBar title="微信" right="＋" />
      <div className="wx-list">
        {mockChats.map((chat) => (
          <div className="wx-cell" key={chat.id}>
            <div className="wx-avatar">{chat.avatar}</div>
            <div className="wx-cell-main">
              <div className="wx-cell-row">
                <div className="wx-cell-title">{chat.name}</div>
                <div className="wx-cell-time">{chat.time}</div>
              </div>
              <div className="wx-cell-row">
                <div className="wx-cell-sub">{chat.preview}</div>
                {chat.badge > 0 && <div className="wx-badge">{chat.badge}</div>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ContactsTab() {
  const grouped = useMemo(() => {
    const map = new Map();
    mockContacts.forEach((item) => {
      if (!map.has(item.tag)) map.set(item.tag, []);
      map.get(item.tag).push(item);
    });
    return [...map.entries()];
  }, []);

  return (
    <>
      <TopBar title="通讯录" right="＋" />
      <div className="wx-list wx-list-compact">
        {grouped.map(([tag, items]) => (
          <div key={tag}>
            <div className="wx-group-title">{tag}</div>
            {items.map((item) => (
              <div className="wx-cell" key={item.id}>
                <div className="wx-avatar wx-avatar-text">{item.avatar}</div>
                <div className="wx-cell-main">
                  <div className="wx-cell-title">{item.name}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function DiscoverTab() {
  return (
    <>
      <TopBar title="发现" />
      <div className="wx-list">
        {discoverItems.map((item) => (
          <div className="wx-cell" key={item.key}>
            <div className="wx-avatar">{item.icon}</div>
            <div className="wx-cell-main">
              <div className="wx-cell-title">{item.title}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function MeTab({ user, onLogout }) {
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
        <button className="wx-primary-btn" onClick={onLogout} type="button">退出登录</button>
      </div>
    </>
  );
}

export default function MainPage({ user, onLogout }) {
  const [tab, setTab] = useState('chats');

  return (
    <div className="wx-shell">
      <div className="wx-content">
        {tab === 'chats' && <ChatsTab />}
        {tab === 'contacts' && <ContactsTab />}
        {tab === 'discover' && <DiscoverTab />}
        {tab === 'me' && <MeTab user={user} onLogout={onLogout} />}
      </div>

      <div className="wx-tabbar">
        <button className={tab === 'chats' ? 'active' : ''} onClick={() => setTab('chats')} type="button">微信</button>
        <button className={tab === 'contacts' ? 'active' : ''} onClick={() => setTab('contacts')} type="button">通讯录</button>
        <button className={tab === 'discover' ? 'active' : ''} onClick={() => setTab('discover')} type="button">发现</button>
        <button className={tab === 'me' ? 'active' : ''} onClick={() => setTab('me')} type="button">我</button>
      </div>
    </div>
  );
}
