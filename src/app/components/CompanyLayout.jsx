import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Briefcase, FileText, LogOut, Home, Bell, Building2, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const SIDEBAR_WIDTH = 260;

//  Company nav items — all pointing to /company/* routes
const navItems = [
  { icon: BarChart3,  label: 'Dashboard',       to: '/company/dashboard' },
  { icon: Briefcase,  label: 'Job Listings',     to: '/company/jobs' },
  { icon: FileText,   label: 'Company Profile',  to: '/company/company-profile' },
  { icon: Bell,       label: 'Notifications',    to: '/company/notifications' },
  { icon: Settings,   label: 'Settings',         to: '/company/settings' },
  { icon: FileText,   label: 'Contact Us',       to: '/company/contact-us' },
];

export function CompanyLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const displayName = user?.companyName || user?.name || 'Company';

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('');

  const pageTitle = (() => {
    const p = location.pathname;
    if (p.includes('/company/dashboard'))      return 'Dashboard';
    if (p.includes('/company/jobs'))           return 'Job Listings';
    if (p.includes('/company/company-profile'))return 'Company Profile';
    if (p.includes('/company/notifications'))  return 'Notifications';
    if (p.includes('/company/settings'))       return 'Settings';
    if (p.includes('/company/contact-us'))     return 'Contact Us';
    if (p.includes('/company/post-job'))       return 'Post Job';
    return 'Dashboard';
  })();

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside
        className="bg-white border-r border-border/60"
        style={{ position: 'fixed', left: 0, top: 0, height: '100vh', width: SIDEBAR_WIDTH }}
      >
        <div className="h-full flex flex-col">
          <div className="px-5 py-5 border-b border-border/60">
            <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight text-foreground">
              <span
                className="w-9 h-9 rounded-xl text-white flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}
              >
                <Home className="w-5 h-5" />
              </span>
              <span>RigWorldJobs</span>
            </Link>
          </div>

          <div className="p-4 flex-1 overflow-auto">
            <nav className="space-y-1">
              {navItems.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all group text-sm font-medium ${
                      isActive
                        ? 'bg-secondary/10 text-secondary'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-border/60">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/employer/login');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-border text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div style={{ marginLeft: SIDEBAR_WIDTH }}>
        {/* Top header */}
        <div className="bg-white border-b border-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                {/* Always shows "Company" label */}
                <p className="text-xs text-muted-foreground">Company</p>
                <h1 className="text-xl font-bold text-foreground truncate">{pageTitle}</h1>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                    {initials}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-bold text-foreground leading-tight">{displayName}</div>
                    {/*  Always shows "Company" label */}
                    <div className="text-xs text-muted-foreground leading-tight">Company</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          <Outlet />
        </main>
      </div>
    </div>
  );
}