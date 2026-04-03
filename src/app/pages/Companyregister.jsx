import { Link } from 'react-router-dom';
import { Mail, Lock, Building2, User, Globe, Phone, FileText, CheckCircle, Eye, EyeOff, AlertCircle, Loader2, Clock } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

const REQUESTS_KEY = 'rwj_company_requests';

function getRequests() {
  try { return JSON.parse(localStorage.getItem(REQUESTS_KEY) || '[]'); } catch { return []; }
}

function submitRequest(data) {
  const requests = getRequests();
  if (requests.find(r => r.email === data.email && r.status !== 'rejected')) {
    throw new Error('A registration request with this email already exists.');
  }
  const req = {
    id: `req_${Date.now()}`,
    ...data,
    submittedAt: new Date().toISOString(),
    status: 'pending',
  };
  localStorage.setItem(REQUESTS_KEY, JSON.stringify([req, ...requests]));
  return req;
}

export function CompanyRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    companyName: '', contactName: '', email: '', phone: '',
    industry: '', website: '', message: '', password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      submitRequest({
        companyName: form.companyName,
        contactName: form.contactName,
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        website: form.website,
        message: form.message,
        password: form.password,
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:flex-col lg:w-[45%] relative overflow-hidden p-10 justify-between"
        style={{ background: 'linear-gradient(135deg, #0D1B2E 0%, #0E7490 60%, #0891B2 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 bg-cyan-300" />

        <Link to="/" className="flex items-center space-x-2.5 relative">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15">
            <Building2 className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-lg leading-none">RigWorld</div>
            <div className="text-cyan-300 text-[9px] font-semibold tracking-widest uppercase">Company Portal</div>
          </div>
        </Link>

        <div className="relative">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Find Exceptional<br />Energy Professionals</h2>
          <p className="text-cyan-100/70 mb-8">Register your company and start connecting with the best oil & gas talent in the world.</p>
          <div className="space-y-3">
            {[
              'Submit your company registration request',
              'Admin reviews and approves your account',
              'Receive credentials via notification',
              'Post jobs and reach 50k+ candidates',
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

        <div className="bg-white/8 border border-white/15 rounded-2xl p-5 relative">
          <p className="text-white font-semibold text-sm mb-1">Shell Energy</p>
          <p className="text-cyan-100/60 text-xs mb-3">"We hired our entire offshore engineering team through RigWorldJobs in just 3 weeks."</p>
          <div className="text-cyan-300 text-xs">— Head of Talent Acquisition</div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex items-center justify-center bg-background p-6 sm:p-10 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md py-8"
        >
          {submitted ? (
            /* ── Pending Approval Screen ── */
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-5">
                <Clock className="w-8 h-8 text-amber-600" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Request Submitted!</h1>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Your company registration request has been sent to the RigWorldJobs admin team.
                You'll receive your login credentials by email once your account is approved — usually within 24 hours.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left mb-6 space-y-2 text-sm">
                <p className="font-bold text-amber-900">What happens next?</p>
                <div className="flex items-start space-x-2 text-amber-800">
                  <span className="font-bold mt-0.5">1.</span>
                  <span>Admin reviews your company details</span>
                </div>
                <div className="flex items-start space-x-2 text-amber-800">
                  <span className="font-bold mt-0.5">2.</span>
                  <span>If approved, you'll get a notification with your login credentials</span>
                </div>
                <div className="flex items-start space-x-2 text-amber-800">
                  <span className="font-bold mt-0.5">3.</span>
                  {/* ✅ Updated link to /company/login */}
                  <span>Log in at <Link to="/company/login" className="font-semibold underline">/company/login</Link> to access your dashboard</span>
                </div>
              </div>
              <div className="bg-cyan-50 border border-cyan-200 rounded-xl p-3.5 text-xs text-cyan-800 mb-5">
                <p className="font-bold text-cyan-900 mb-1">Want to test right now?</p>
                <p>Use demo: <span className="font-mono font-semibold">company@demo.com</span> / <span className="font-mono font-semibold">company123</span></p>
                <Link to="/company/login" className="text-cyan-700 font-semibold underline mt-1 inline-block">Go to Company Login →</Link>
              </div>
              <Link
                to="/"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg inline-flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <>
              <div className="lg:hidden flex items-center justify-center mb-8">
                <Link to="/" className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold">RigWorldJobs</span>
                </Link>
              </div>

              <div className="mb-7">
                <div className="inline-flex items-center text-xs font-semibold text-secondary bg-secondary/10 px-3 py-1.5 rounded-full mb-4">
                  <Building2 className="w-3.5 h-3.5 mr-1.5" /> Company Registration
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Register Your Company</h1>
                <p className="text-muted-foreground text-sm">Submit your details — our team will review and approve your account within 24 hours.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="flex items-start space-x-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Company Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input name="companyName" type="text" placeholder="Acme Energy Corp" required value={form.companyName} onChange={handleChange}
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all disabled:opacity-60" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Contact Person *</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input name="contactName" type="text" placeholder="Jane Smith" required value={form.contactName} onChange={handleChange}
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all disabled:opacity-60" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Company Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input name="email" type="email" placeholder="hr@company.com" required value={form.email} onChange={handleChange}
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all disabled:opacity-60" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                    <div className="relative">
                      <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input name="phone" type="tel" placeholder="+1 800 000 0000" value={form.phone} onChange={handleChange}
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all disabled:opacity-60" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Website</label>
                    <div className="relative">
                      <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input name="website" type="text" placeholder="company.com" value={form.website} onChange={handleChange}
                        disabled={loading}
                        className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all disabled:opacity-60" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Industry / Sector</label>
                  <select name="industry" value={form.industry} onChange={handleChange} disabled={loading}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all disabled:opacity-60">
                    <option value="">Select industry...</option>
                    <option>Upstream / Drilling</option>
                    <option>Offshore Engineering</option>
                    <option>Downstream / Refining</option>
                    <option>HSE & Safety</option>
                    <option>Marine & Subsea</option>
                    <option>Logistics & Supply Chain</option>
                    <option>Energy Services</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Choose a password" required value={form.password} onChange={handleChange}
                      disabled={loading}
                      className="w-full pl-10 pr-11 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all disabled:opacity-60" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Brief Message (optional)</label>
                  <div className="relative">
                    <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                    <textarea name="message" rows={3} placeholder="Tell us about your company and hiring needs..." value={form.message} onChange={handleChange}
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all resize-none disabled:opacity-60" />
                  </div>
                </div>

                <label className="flex items-start space-x-2.5 cursor-pointer">
                  <input type="checkbox" required className="w-4 h-4 rounded border-border mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    I agree to the{' '}
                    <a href="#" className="text-secondary hover:underline">Company Terms</a>{' '}and{' '}
                    <a href="#" className="text-secondary hover:underline">Privacy Policy</a>
                  </span>
                </label>

                <button type="submit" disabled={loading}
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:scale-[1.01] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
                  style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Submit Registration Request</span>}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-muted-foreground">
                Already approved?{' '}
                {/* ✅ Updated link to /company/login */}
                <Link to="/company/login" className="text-secondary font-semibold hover:underline">Sign In</Link>
              </p>
              <p className="mt-2 text-center text-sm text-muted-foreground">
                Looking for a job?{' '}
                <Link to="/candidate/register" className="text-primary font-semibold hover:underline">Job Seeker Registration</Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}