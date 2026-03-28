import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router';
import { BarChart3, Briefcase, Users, FileText, TrendingUp, LogOut, Home, PlusCircle, Bell, Building2, Settings } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const SIDEBAR_WIDTH = 260;

const navItems = [
  { icon: BarChart3, label: 'Dashboard', to: '/employer/dashboard' },
  { icon: Briefcase, label: 'Job Listings', to: '/employer/jobs' },
  // { icon: Users, label: 'Applicants', to: '/employer/applicants' }, // Applicants tab commented out
  { icon: FileText, label: 'Company Profile', to: '/employer/company-profile' },
  // { icon: TrendingUp, label: 'Analytics', to: '/employer/analytics', platformOnly: true }, // Analytics tab commented out
  { icon: Bell, label: 'Notifications', to: '/employer/notifications' },
  { icon: Building2, label: 'Company Requests', to: '/employer/company-requests', platformOnly: true },
  { icon: Settings, label: 'Settings', to: '/employer/settings' },
  { icon: FileText, label: 'Contact Us', to: '/employer/contact-us' },
];

export function EmployerLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Users who registered via company registration have companyName set
  const isCompany = !!user?.companyName;
  const displayName = user?.companyName || user?.name || 'Employer';
  const visibleNav = navItems.filter(item => !item.platformOnly || !isCompany);

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0]?.toUpperCase())
    .join('');

  const pageTitle = (() => {
    const p = location.pathname;
    if (p.includes('/employer/dashboard')) return 'Dashboard';
    if (p.includes('/employer/jobs')) return 'Job Listings';
    if (p.includes('/employer/applicants')) return 'Applicants';
    if (p.includes('/employer/company-profile')) return 'Company Profile';
    // if (p.includes('/employer/analytics')) return 'Analytics'; // Analytics tab commented out
    if (p.includes('/employer/company-requests')) return 'Company Requests';
    if (p.includes('/employer/settings')) return 'Settings';
    if (p.includes('/employer/contact-us')) return 'Contact Us';
    return 'Employer';
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
              <span className="w-9 h-9 rounded-xl text-white flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
                <Home className="w-5 h-5" />
              </span>
              <span>RigWorldJobs</span>
            </Link>
          </div>

          <div className="p-4 flex-1 overflow-auto">
            <nav className="space-y-1">
              {visibleNav.map(item => (
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
                <p className="text-xs text-muted-foreground">{isCompany ? 'Company' : 'Employer'}</p>
                <h1 className="text-xl font-bold text-foreground truncate">{pageTitle}</h1>
              </div>
              <div className="flex items-center gap-3">
                {/* <Link
                  to="/employer/post-job"
                  className="flex items-center space-x-2 px-4 py-2 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-md hover:scale-[1.02]"
                  style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Post Job</span>
                </Link> */}
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold">
                    {initials}
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-sm font-bold text-foreground leading-tight">{displayName}</div>
                    <div className="text-xs text-muted-foreground leading-tight">{isCompany ? 'Company' : 'Employer'}</div>
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
