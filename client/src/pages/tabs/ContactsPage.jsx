import { useMemo } from 'react';
import TopBar from '../../components/TopBar';
import { mockContacts } from '../../data/mock';

export default function ContactsPage() {
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
