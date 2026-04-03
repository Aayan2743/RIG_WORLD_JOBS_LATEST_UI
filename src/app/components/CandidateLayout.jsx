import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Briefcase, FileText, Bookmark, Settings, User, LogOut, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const SIDEBAR_WIDTH = 260;

const navItems = [
  // { icon: Briefcase, label: 'Dashboard', to: '/candidate/dashboard' },
  { icon: FileText, label: 'My Applications', to: '/candidate/applications' },
  { icon: FileText, label: 'My Profile', to: '/candidate/profile' },
  { icon: Bookmark, label: 'Saved Jobs', to: '/candidate/saved-jobs' },
  { icon: Settings, label: 'Settings', to: '/candidate/settings' },
  // { icon: User, label: 'Contact Us', to: '/candidate/contact-us' },
];

export function CandidateLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const initials = (user?.name ?? 'User')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('');

  const pageTitle = (() => {
    const p = location.pathname;
    if (p.includes('/candidate/dashboard')) return 'Dashboard';
    if (p.includes('/candidate/applications')) return 'My Applications';
    if (p.includes('/candidate/profile')) return 'My Profile';
    if (p.includes('/candidate/saved-jobs')) return 'Saved Jobs';
    if (p.includes('/candidate/settings')) return 'Settings';
    if (p.includes('/candidate/notifications')) return 'Notifications';
    if (p.includes('/candidate/contact-us')) return 'Contact Us';
    return 'Candidate';
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
              <span className="w-9 h-9 rounded-xl text-white flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
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
                    `flex items-center justify-between px-3 py-2.5 rounded-xl transition-all group text-sm font-medium ${
                      isActive
                        ? 'bg-primary/8 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`
                  }
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </NavLink>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-border/60">
            <button
              type="button"
              onClick={() => {
                logout();
                navigate('/candidate/login');
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
                <p className="text-xs text-muted-foreground">Candidate</p>
                <h1 className="text-xl font-bold text-foreground truncate">{pageTitle}</h1>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/jobs"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-md hover:scale-[1.02]"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Briefcase className="w-4 h-4" />
                  <span>Browse Jobs</span>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold">
                    {initials}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-bold text-foreground leading-tight">{user?.name ?? 'User'}</div>
                    <div className="text-xs text-muted-foreground leading-tight">Candidate</div>
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
