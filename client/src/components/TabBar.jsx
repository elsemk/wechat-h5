import { NavLink } from 'react-router-dom';
import {
  RiChat1Line,
  RiChat1Fill,
  RiContactsBook2Line,
  RiContactsBook2Fill,
  RiCompass3Line,
  RiCompass3Fill,
  RiUser3Line,
  RiUser3Fill,
} from 'react-icons/ri';

const tabs = [
  { key: 'chats', label: '微信', to: '/chats', icon: RiChat1Line, activeIcon: RiChat1Fill },
  { key: 'contacts', label: '通讯录', to: '/contacts', icon: RiContactsBook2Line, activeIcon: RiContactsBook2Fill },
  { key: 'discover', label: '发现', to: '/discover', icon: RiCompass3Line, activeIcon: RiCompass3Fill },
  { key: 'me', label: '我', to: '/me', icon: RiUser3Line, activeIcon: RiUser3Fill },
];

export default function TabBar() {
  return (
    <div className="wx-tabbar">
      {tabs.map(({ key, label, to, icon: Icon, activeIcon: ActiveIcon }) => (
        <NavLink
          key={key}
          to={to}
          className={({ isActive }) => `wx-tab-item ${isActive ? 'active' : ''}`}
        >
          {({ isActive }) => (
            <>
              <span className="wx-tabbar-icon">{isActive ? <ActiveIcon /> : <Icon />}</span>
              <span className="wx-tabbar-text">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </div>
  );
}
