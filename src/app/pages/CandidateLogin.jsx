import { Link, useNavigate } from 'react-router';
import { Mail, Lock, Briefcase, Eye, EyeOff, ArrowRight, CheckCircle, Users, Star, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

// ── mock auth helpers ──────────────────────────────────────────────
const USERS_KEY = 'rwj_users';
function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function mockLogin(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.trim() === email.trim() && u.password === password);
  if (!user) throw new Error('Invalid email or password.');
  return { token: `mock-token-${user.id}`, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
}

const highlights = [
  '5,000+ active job listings',
  'One-click apply with your profile',
  '500+ verified energy companies',
  'Free forever for job seekers',
];

export function CandidateLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = mockLogin(email, password);
      if (res.user.role !== 'candidate') {
        setError('This account is registered as an employer. Please use the Employer Login.');
        return;
      }
      login(res.token, res.user);
      navigate('/candidate/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Brand */}
      <div className="hidden lg:flex lg:flex-col lg:w-[45%] relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        </div>
        <div className="absolute top-1/3 right-1/4 w-56 h-56 rounded-full blur-3xl opacity-15 bg-cyan-400" />

        <div className="relative flex flex-col justify-between h-full p-10">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-none">RigWorld</div>
              <div className="text-blue-300 text-[9px] font-semibold tracking-widest uppercase">Jobs</div>
            </div>
          </Link>

          {/* Main content */}
          <div>
            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
              Your Next Career<br />Opportunity Awaits
            </h2>
            <p className="text-blue-100/70 text-base mb-8 leading-relaxed">
              Join 50,000+ energy professionals who found their perfect role through RigWorldJobs.
            </p>
            <div className="space-y-3">
              {highlights.map(item => (
                <div key={item} className="flex items-center space-x-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <span className="text-blue-100/80 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white/8 border border-white/15 rounded-2xl p-5">
            <div className="flex space-x-1 mb-3">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
            </div>
            <p className="text-blue-100/80 text-sm italic mb-4">"Found my dream offshore role in under 2 weeks. The platform is unbeatable."</p>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-blue-400/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-blue-300" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">John Martinez</div>
                <div className="text-blue-300 text-xs">Senior Engineer · Shell</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center bg-background p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">RigWorldJobs</span>
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your candidate account to continue</p>
          </div>

          {/* Social Auth */}
          {/* <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center space-x-3 border border-border bg-white hover:bg-gray-50 text-foreground py-3 rounded-xl font-medium text-sm transition-all hover:shadow-sm">
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span>Continue with Google</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-3 border border-border bg-white hover:bg-gray-50 text-foreground py-3 rounded-xl font-medium text-sm transition-all hover:shadow-sm">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              <span>Continue with Facebook</span>
            </button>
          </div> */}

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-background text-xs text-muted-foreground">or continue with email</span></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Banner */}
            {error && (
              <div className="flex items-start space-x-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all disabled:opacity-60"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                  className="w-full pl-11 pr-11 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all disabled:opacity-60"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary hover:underline font-medium">Forgot password?</Link>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:scale-[1.01] shine-effect flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: 'var(--gradient-primary)' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>


          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <Link to="/candidate/register" className="text-primary font-semibold hover:underline">Create Account</Link>
          </p>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Are you an employer?{' '}
            <Link to="/employer/login" className="text-secondary font-semibold hover:underline">Login here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
