import { Link, useLocation } from 'react-router';
import { Menu, X, Briefcase, ChevronDown, User, Building2, Bell, LogIn } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Find Jobs', to: '/jobs' },
  // { label: 'Companies', to: '/companies' },
  // { label: 'Upload CV', to: '/candidate/profile' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact-us' },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCandidateMenu, setShowCandidateMenu] = useState(false);
  const [showEmployerMenu, setShowEmployerMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isCandidateRoute = location.pathname.startsWith('/candidate');
  const isEmployerRoute = location.pathname.startsWith('/employer');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowCandidateMenu(false);
    setShowEmployerMenu(false);
  }, [location.pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/90 backdrop-blur-xl shadow-md border-b border-border/60'
        : 'bg-white border-b border-border/40'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0 min-w-0">
            <img
              src="/images/Rigworldjobs.png"
              alt="RigWorldJobs"
              className="h-10 sm:h-11 md:h-18 w-auto object-contain"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = '/images/rigworldjobs.png';
              }}
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.to)
                  ? 'text-primary bg-primary/8 font-semibold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-3">
            {!isEmployerRoute && (
              <div className="relative" onMouseLeave={() => setShowCandidateMenu(false)}>
                <button
                  onMouseEnter={() => {
                    setShowCandidateMenu(true);
                    setShowEmployerMenu(false);
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span>Candidates</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showCandidateMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showCandidateMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-border/80 overflow-hidden z-50"
                      onMouseEnter={() => setShowCandidateMenu(true)}
                    >
                      <div className="px-3 py-2 bg-gradient-to-r from-primary/5 to-transparent border-b border-border/60">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">For Candidates</p>
                      </div>
                      <div className="py-1">
                        <Link to="/candidate/login" className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-muted/50">
                          <LogIn className="w-4 h-4 text-primary" />
                          <span>Sign In</span>
                        </Link>
                        <Link to="/candidate/register" className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-muted/50">
                          <User className="w-4 h-4 text-primary" />
                          <span>Create Account</span>
                        </Link>
                        {/* <Link to="/candidate/dashboard" className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-muted/50">
                          <Briefcase className="w-4 h-4 text-primary" />
                          <span>Dashboard</span>
                        </Link> */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {!isCandidateRoute && (
              <div className="relative" onMouseLeave={() => setShowEmployerMenu(false)}>
                <button
                  onMouseEnter={() => {
                    setShowEmployerMenu(true);
                    setShowCandidateMenu(false);
                  }}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:shadow-lg hover:scale-[1.02]"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Building2 className="w-4 h-4" />
                  <span>For Employers</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${showEmployerMenu ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {showEmployerMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-border/80 overflow-hidden z-50"
                      onMouseEnter={() => setShowEmployerMenu(true)}
                    >
                      <div className="px-3 py-2 bg-gradient-to-r from-secondary/5 to-transparent border-b border-border/60">
                        <p className="text-xs font-semibold text-secondary uppercase tracking-wider">For Employers</p>
                      </div>
                      <div className="py-1">
                        <Link to="/employer/login" className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-muted/50">
                          <LogIn className="w-4 h-4 text-secondary" />
                          <span>Sign In as an Employer</span>
                        </Link>
                        <Link to="/employer/register" className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-muted/50">
                          <Building2 className="w-4 h-4 text-secondary" />
                          <span>Register Company</span>
                        </Link>
                        {/* <Link to="/employer/dashboard" className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-muted/50">
                          <Briefcase className="w-4 h-4 text-secondary" />
                          <span>Dashboard</span>
                        </Link> */}
                        {/* <Link to="/employer/post-job" className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-muted/50">
                          <Bell className="w-4 h-4 text-secondary" />
                          <span>Post a Job</span>
                        </Link> */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center hover:bg-muted/60"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border/60 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`block py-2.5 px-4 rounded-lg text-sm font-medium transition-colors ${isActive(link.to)
                  ? 'text-primary bg-primary/8'
                  : 'text-foreground hover:bg-muted/50'
                  }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-border/60 pt-3 mt-3 space-y-1">
              {!isEmployerRoute && (
                <>
                  <p className="text-xs font-semibold text-muted-foreground px-4 mb-2 uppercase tracking-wider">Candidates</p>
                  <Link to="/candidate/login" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">Sign In</Link>
                  <Link to="/candidate/register" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">Create Account</Link>
                  <Link to="/candidate/dashboard" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">Dashboard</Link>
                  <Link to="/candidate/profile" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">My Profile</Link>
                  <Link to="/candidate/applications" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">Applications</Link>
                  <Link to="/candidate/saved-jobs" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">Saved Jobs</Link>
                  <Link to="/candidate/contact-us" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">Contact Us</Link>
                </>
              )}

              {!isCandidateRoute && (
                <>
                  <p className="text-xs font-semibold text-muted-foreground px-4 mb-2 mt-3 uppercase tracking-wider">Employers</p>
                  <Link to="/employer/login" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">Employer Sign In</Link>
                  <Link to="/employer/register" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">Register Company</Link>
                  <Link to="/employer/dashboard" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">Employer Dashboard</Link>
                  <Link to="/employer/contact-us" className="block py-2.5 px-4 rounded-lg text-sm text-foreground hover:bg-muted/50 transition-colors">Contact Us</Link>
                  <Link
                    to="/employer/post-job"
                    className="block py-2.5 px-4 rounded-xl text-sm font-semibold text-white text-center mt-2 shine-effect"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    Post a Job
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}