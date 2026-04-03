import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Shield, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';

const USERS_KEY = 'rwj_users';
function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function adminLogin(email, password) {
  const users = getUsers();
  const user = users.find(u => u.email.trim() === email.trim() && u.password === password && u.role === 'admin');
  if (!user) throw new Error('Invalid admin credentials.');
  return { token: `admin-token-${user.id}`, user: { id: user.id, name: user.name, email: user.email, role: 'admin' } };
}

export function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = adminLogin(form.email, form.password);
      login(res.token, res.user);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-cyan-400" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">Admin Portal</h1>
          <p className="text-slate-400 text-sm">RigWorldJobs Administration</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3.5 text-xs text-cyan-800 mb-5 space-y-1">
            <p className="font-bold text-cyan-900">Demo Admin Credentials</p>
            <p>Email: <span className="font-mono font-semibold">admin@rigworldjobs.com</span></p>
            <p>Password: <span className="font-mono font-semibold">admin@123</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start space-x-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="email" type="email" placeholder="admin@rigworldjobs.com" value={form.email} onChange={handleChange}
                  required disabled={loading}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white text-sm transition-all disabled:opacity-60" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={handleChange}
                  required disabled={loading}
                  className="w-full pl-10 pr-11 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white text-sm transition-all disabled:opacity-60" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:scale-[1.01] flex items-center justify-center space-x-2 disabled:opacity-70"
              style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><span>Sign In to Admin</span><ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-xs mt-5">
          <Link to="/" className="hover:text-slate-300 transition-colors">← Back to RigWorldJobs</Link>
        </p>
      </motion.div>
    </div>
  );
}
