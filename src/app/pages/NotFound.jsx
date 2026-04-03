import { Link } from 'react-router-dom';
import { Home, Search, Briefcase, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="text-[10rem] sm:text-[12rem] font-black leading-none select-none"
            style={{ backgroundImage: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', opacity: 0.15 }}>
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl" style={{ background: 'var(--gradient-primary)' }}>
              <Briefcase className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Page Not Found</h1>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          Looks like this rig drifted off course. The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/"
            className="flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm shine-effect hover:shadow-lg hover:scale-[1.02] transition-all"
            style={{ background: 'var(--gradient-primary)' }}>
            <Home className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          <Link to="/jobs"
            className="flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl font-semibold text-sm border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all">
            <Search className="w-4 h-4" />
            <span>Browse Jobs</span>
          </Link>
          <button onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-medium text-sm border border-border text-muted-foreground hover:bg-muted/50 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Find Jobs', to: '/jobs', emoji: '💼' },
            { label: 'Companies', to: '/companies', emoji: '🏢' },
            { label: 'Candidate Login', to: '/candidate/login', emoji: '👤' },
            { label: 'Post a Job', to: '/employer/post-job', emoji: '📋' },
          ].map(link => (
            <Link key={link.to} to={link.to}
              className="flex flex-col items-center p-4 bg-white border border-border/60 rounded-xl hover:shadow-md hover:border-primary/20 transition-all text-center group">
              <span className="text-2xl mb-1.5">{link.emoji}</span>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">{link.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
