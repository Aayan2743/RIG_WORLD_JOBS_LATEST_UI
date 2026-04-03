import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';
import { motion } from 'motion/react';

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 to-secondary/5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground font-['Poppins']">RigWorldJobs</span>
          </Link>
          <h2 className="text-3xl font-bold text-foreground font-['Poppins']">{title}</h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
