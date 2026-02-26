import TopBar from '../../components/TopBar';
import { mockChats } from '../../data/mock';

export default function ChatsPage() {
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
