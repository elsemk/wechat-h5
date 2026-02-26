export default function TopBar({ title, right = '' }) {
  return (
    <div className="wx-topbar">
      <div className="wx-topbar-title">{title}</div>
      <div className="wx-topbar-right">{right}</div>
    </div>
  );
}
