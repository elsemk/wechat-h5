import { Outlet } from 'react-router-dom';
import TabBar from '../components/TabBar';

export default function MainLayout() {
  return (
    <div className="wx-shell">
      <div className="wx-content">
        <Outlet />
      </div>
      <TabBar />
    </div>
  );
}
