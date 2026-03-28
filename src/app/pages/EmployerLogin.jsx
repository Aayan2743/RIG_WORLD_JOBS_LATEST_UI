import { Link, useNavigate } from 'react-router';
import { Mail, Lock, Building2, Eye, EyeOff, ArrowRight, CheckCircle, AlertCircle, Loader2, Clock } from 'lucide-react';
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
  if (user.approvalStatus === 'pending') throw new Error('PENDING');
  if (user.approvalStatus === 'rejected') throw new Error('REJECTED');
  return { token: `mock-token-${user.id}`, user: { id: user.id, name: user.name, email: user.email, role: user.role, companyName: user.companyName || null } };
}

export function EmployerLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [blockedStatus, setBlockedStatus] = useState(null); // 'pending' | 'rejected'

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setBlockedStatus(null);
    setLoading(true);
    try {
      const res = mockLogin(form.email, form.password);
      if (res.user.role !== 'employer') {
        setError('This account is registered as a candidate. Please use the Candidate Login.');
        return;
      }
      login(res.token, res.user);
      navigate('/employer/dashboard');
    } catch (err) {
      if (err.message === 'PENDING') { setBlockedStatus('pending'); }
      else if (err.message === 'REJECTED') { setBlockedStatus('rejected'); }
      else setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Employer Brand */}
      <div className="hidden lg:flex lg:flex-col lg:w-[45%] relative overflow-hidden p-10 justify-between"
        style={{ background: 'linear-gradient(135deg, #0D1B2E 0%, #0E7490 50%, #0891B2 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/3 left-1/3 w-56 h-56 rounded-full blur-3xl opacity-15 bg-cyan-300" />

        <Link to="/" className="flex items-center space-x-2.5 relative">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-none">RigWorld</div>
            <div className="text-cyan-300 text-[9px] font-semibold tracking-widest uppercase">Employers</div>
          </div>
        </Link>

        <div className="relative">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Hire the Best<br />Energy Talent</h2>
          <p className="text-cyan-100/70 mb-8">Access a pool of 50,000+ verified oil & gas professionals ready to join your team.</p>
          <div className="space-y-3">
            {[
              'Post unlimited jobs with ease',
              'Access pre-screened candidates',
              'Manage all applications in one place',
              'Advanced analytics & reporting',
            ].map(item => (
              <div key={item} className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full bg-cyan-400/20 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <span className="text-cyan-100/80 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 relative">
          {[{ v: '500+', l: 'Companies' }, { v: '12k+', l: 'Hires Made' }, { v: '47', l: 'Avg. Applicants' }].map(s => (
            <div key={s.l} className="bg-white/8 border border-white/15 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-white">{s.v}</div>
              <div className="text-cyan-300 text-xs mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-background p-6 sm:p-10">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">RigWorldJobs</span>
            </Link>
          </div>

          <div className="mb-8">
            <div className="inline-flex items-center text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full mb-4">
              <Building2 className="w-3.5 h-3.5 mr-1.5" /> Employer Portal
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Employer Login</h1>
            <p className="text-muted-foreground">Access your hiring dashboard and manage candidates</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Demo credentials */}
            <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3.5 text-xs text-cyan-800 space-y-1">
              <p className="font-bold text-cyan-900">Demo Employer Credentials</p>
              <p>Email: <span className="font-mono font-semibold">employer@demo.com</span> / Password: <span className="font-mono font-semibold">employer123</span></p>
              <p>Email: <span className="font-mono font-semibold">company@demo.com</span> / Password: <span className="font-mono font-semibold">company123</span></p>
            </div>

            {blockedStatus === 'pending' && (
              <div className="flex items-start space-x-2.5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                <Clock className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-600" />
                <div>
                  <p className="font-bold text-amber-900 mb-0.5">Account Pending Approval</p>
                  <p>Your company registration is under review. You'll receive your credentials once the admin approves your account.</p>
                </div>
              </div>
            )}
            {blockedStatus === 'rejected' && (
              <div className="flex items-start space-x-2.5 p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold mb-0.5">Registration Rejected</p>
                  <p>Your company registration was not approved. Please <Link to="/contact-us" className="underline font-semibold">contact support</Link> for more information.</p>
                </div>
              </div>
            )}
            {error && (
              <div className="flex items-start space-x-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Company Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="email" type="email" placeholder="company@example.com" value={form.email} onChange={handleChange}
                  required disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all disabled:opacity-60" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" value={form.password} onChange={handleChange}
                  required disabled={loading}
                  className="w-full pl-10 pr-11 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all disabled:opacity-60" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-secondary hover:underline font-medium">Forgot password?</Link>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:scale-[1.01] shine-effect flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Sign In to Dashboard</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>


          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an employer account?{' '}
            <Link to="/employer/register" className="text-secondary font-semibold hover:underline">Register Company</Link>
          </p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Looking for a job?{' '}
            <Link to="/candidate/login" className="text-primary font-semibold hover:underline">Login as Candidate</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
