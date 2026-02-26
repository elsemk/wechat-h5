import TopBar from '../../components/TopBar';
import { discoverItems } from '../../data/mock';

export default function DiscoverPage() {
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
