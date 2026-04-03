import { Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, Briefcase, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <div className="hidden lg:flex lg:flex-col lg:w-[45%] relative overflow-hidden p-10 justify-center items-center" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
        <div className="absolute top-1/4 right-1/4 w-56 h-56 rounded-full blur-3xl opacity-15 bg-cyan-400" />
        <div className="relative text-center max-w-xs">
          <Link to="/" className="flex items-center justify-center space-x-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/15">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-lg leading-none">RigWorld</div>
              <div className="text-blue-300 text-[9px] font-semibold tracking-widest uppercase">Jobs</div>
            </div>
          </Link>
          <div className="w-16 h-16 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">Password Recovery</h2>
          <p className="text-blue-100/70 leading-relaxed">
            We'll send a secure reset link to your email address. It's quick and easy.
          </p>
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
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--gradient-primary)' }}>
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">RigWorldJobs</span>
            </Link>
          </div>

          {submitted ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-emerald-500" />
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h1>
              <p className="text-muted-foreground mb-3">
                We sent a password reset link to
              </p>
              <p className="font-semibold text-primary mb-8">{email}</p>
              <p className="text-sm text-muted-foreground mb-6">
                Didn't receive it? Check your spam folder or{' '}
                <button onClick={() => setSubmitted(false)} className="text-primary hover:underline font-semibold">
                  try again
                </button>
              </p>
              <Link to="/candidate/login" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                <ArrowLeft className="w-4 h-4" /><span>Back to login</span>
              </Link>
            </motion.div>
          ) : (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Forgot Password?</h1>
                <p className="text-muted-foreground">Enter your email and we'll send you a reset link</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-10 pr-4 py-3.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all" />
                  </div>
                </div>
                <button type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:shadow-lg hover:scale-[1.01] shine-effect flex items-center justify-center space-x-2"
                  style={{ background: 'var(--gradient-primary)' }}>
                  <span>Send Reset Link</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-6 text-center">
                <Link to="/candidate/login" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium">
                  <ArrowLeft className="w-4 h-4" /><span>Back to login</span>
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
