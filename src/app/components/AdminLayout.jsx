import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { BarChart3, Briefcase, FileText, Bell, Building2, Settings, LogOut, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const SIDEBAR_WIDTH = 260;

const navItems = [
  { icon: BarChart3, label: 'Dashboard', to: '/admin' },
  { icon: Briefcase, label: 'Job Listings', to: '/admin/jobs' },
  { icon: FileText, label: 'Company Profile', to: '/admin/company-profile' },
  { icon: Bell, label: 'Notifications', to: '/admin/notifications' },
  { icon: Building2, label: 'Company Requests', to: '/admin/company-requests' },
  { icon: Settings, label: 'Settings', to: '/admin/settings' },
  { icon: FileText, label: 'Contact Us', to: '/admin/contact-us' },
];

export function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const displayName = user?.name || 'Admin';

  const pageTitle = (() => {
    const p = location.pathname;
    if (p === '/admin') return 'Dashboard';
    if (p.includes('/admin/jobs')) return 'Job Listings';
    if (p.includes('/admin/company-profile')) return 'Company Profile';
    if (p.includes('/admin/company-requests')) return 'Company Requests';
    if (p.includes('/admin/settings')) return 'Settings';
    if (p.includes('/admin/contact-us')) return 'Contact Us';
    return 'Admin';
  })();

  return (
    <div className="min-h-screen bg-background">

      {/* Sidebar */}
      <aside style={{ width: SIDEBAR_WIDTH }} className="fixed h-full bg-white border-r">
        <div className="p-5 border-b">
          <Link to="/" className="flex items-center gap-2 font-bold">
            <Home /> RigWorld
          </Link>
        </div>

        <div className="p-4 space-y-2">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${isActive ? 'bg-blue-100 text-blue-600' : ''}`
              }>
              <item.icon className="inline w-4 mr-2" />
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="p-4 border-t">
          <button
            onClick={() => {
              logout();
              navigate('/admin/login');
            }}
            className="w-full text-left"
          >
            <LogOut className="inline w-4 mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div style={{ marginLeft: SIDEBAR_WIDTH }}>
        <header className="p-4 border-b bg-white">
          <h1 className="text-xl font-bold">{pageTitle}</h1>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}