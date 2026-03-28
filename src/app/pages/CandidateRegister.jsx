import { Link, useNavigate } from 'react-router';
import { Mail, Lock, User, Briefcase, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

// ── mock auth helpers ──────────────────────────────────────────────
const USERS_KEY = 'rwj_users';
function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function mockRegister(name, email, password, role) {
  const users = getUsers();
  if (users.find(u => u.email === email)) throw new Error('An account with this email already exists.');
  const user = { id: Date.now(), name, email, password, role };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  return { token: `mock-token-${user.id}`, user: { id: user.id, name, email, role } };
}

export function CandidateRegister() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (form.password !== form.confirmPassword) { setError('Passwords do not match.'); return; }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    setLoading(true);
    try {
      const res = mockRegister(form.name, form.email, form.password, 'candidate');
      login(res.token, res.user);
      navigate('/candidate/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pwStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ['', 'bg-red-400', 'bg-amber-400', 'bg-emerald-500'];
  const strengthLabels = ['', 'Weak', 'Fair', 'Strong'];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:flex-col lg:w-[45%] relative overflow-hidden p-10 justify-between" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-cyan-300" />

        <Link to="/" className="flex items-center space-x-2.5 relative">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15">
            <Briefcase className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-none">RigWorld</div>
            <div className="text-blue-300 text-[9px] font-semibold tracking-widest uppercase">Jobs</div>
          </div>
        </Link>

        <div className="relative">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Start Your Journey<br />in Energy Careers</h2>
          <p className="text-blue-100/70 mb-8">Create your professional profile and get discovered by top oil & gas employers globally.</p>
          <div className="space-y-3">
            {['Build a professional profile in minutes', 'Get matched with relevant opportunities', 'Apply with one click to any job', 'Track all applications in one dashboard'].map(item => (
              <div key={item} className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-emerald-400/20 flex items-center justify-center">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-blue-100/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 relative">
          {[{ v: '50k+', l: 'Job Seekers' }, { v: '12k+', l: 'Hires Made' }, { v: '4.9★', l: 'App Rating' }].map(s => (
            <div key={s.l} className="bg-white/8 border border-white/15 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-white">{s.v}</div>
              <div className="text-blue-300 text-xs mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center bg-background p-6 sm:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-8"
        >
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">RigWorldJobs</span>
            </Link>
          </div>

          <div className="mb-7">
            <h1 className="text-3xl font-bold text-foreground mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">Start your career journey today — it's free</p>
          </div>

          {/* Social */}
          {/* <div className="grid grid-cols-2 gap-3 mb-6">
            <button className="flex items-center justify-center space-x-2 border border-border bg-white hover:bg-gray-50 py-3 rounded-xl text-sm font-medium transition-all hover:shadow-sm">
              <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span>Google</span>
            </button>
            <button className="flex items-center justify-center space-x-2 border border-border bg-white hover:bg-gray-50 py-3 rounded-xl text-sm font-medium transition-all hover:shadow-sm">
              <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              <span>Facebook</span>
            </button>
          </div> */}

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="px-3 bg-background text-xs text-muted-foreground">or register with email</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start space-x-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="name" type="text" placeholder="John Doe" value={form.name} onChange={handleChange}
                  required disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all disabled:opacity-60" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange}
                  required disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all disabled:opacity-60" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password" value={form.password} onChange={handleChange}
                  required disabled={loading}
                  className="w-full pl-10 pr-11 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all disabled:opacity-60" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {form.password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3].map(i => (
                      <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= pwStrength ? strengthColors[pwStrength] : 'bg-muted'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{strengthLabels[pwStrength]} password</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="confirmPassword" type="password" placeholder="Confirm your password" value={form.confirmPassword} onChange={handleChange}
                  required disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all disabled:opacity-60" />
              </div>
            </div>

            <label className="flex items-start space-x-2.5 cursor-pointer">
              <input type="checkbox" required className="w-4 h-4 rounded border-border text-primary mt-0.5" />
              <span className="text-sm text-muted-foreground">
                I agree to the{' '}
                <Link to="#" className="text-primary hover:underline">Terms of Service</Link>{' '}and{' '}
                <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
              </span>
            </label>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:scale-[1.01] shine-effect flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: 'var(--gradient-primary)' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Create Account</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/candidate/login" className="text-primary font-semibold hover:underline">Sign In</Link>
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Want to hire talent?{' '}
            <Link to="/employer/register" className="text-secondary font-semibold hover:underline">Register as Employer</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
