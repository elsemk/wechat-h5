import { lazy, Suspense } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { initSession } from './utils/auth';
import './styles/wechat.css';

const AuthPage = lazy(() => import('./pages/AuthPage'));
const ChatsPage = lazy(() => import('./pages/tabs/ChatsPage'));
const ContactsPage = lazy(() => import('./pages/tabs/ContactsPage'));
const DiscoverPage = lazy(() => import('./pages/tabs/DiscoverPage'));
const MePage = lazy(() => import('./pages/tabs/MePage'));

function RequireAuth() {
  const { token } = initSession();
  if (!token) return <Navigate to="/auth" replace />;
  return <Outlet />;
}

function GuestOnly() {
  const { token } = initSession();
  if (token) return <Navigate to="/chats" replace />;
  return <Outlet />;
}

export default function App() {
  return (
    <Suspense fallback={<div className="wx-loading">加载中...</div>}>
      <Routes>
        <Route element={<GuestOnly />}>
          <Route path="/auth" element={<AuthPage />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route element={<MainLayout />}>
            <Route path="/chats" element={<ChatsPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/me" element={<MePage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/chats" replace />} />
        <Route path="*" element={<Navigate to="/chats" replace />} />
      </Routes>
    </Suspense>
  );
}
