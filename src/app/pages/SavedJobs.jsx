import { Link } from 'react-router-dom';
import { Bookmark, BookmarkX, Briefcase, Building2, DollarSign, MapPin, Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { ApplyNowPaymentModal } from '../components/ApplyNowPaymentModal.jsx';

const initialSavedJobs = [
  { id: 1, title: 'Offshore Rig Supervisor', company: 'Chevron', location: 'Gulf of Mexico', salary: '$150k–$200k', type: 'Contract', logo: '🌊', savedDate: 'Today', category: 'Operations' },
  { id: 2, title: 'HSE Coordinator', company: 'TotalEnergies', location: 'Paris, France', salary: '$70k–$95k', type: 'Full-time', logo: '🔰', savedDate: '2 days ago', category: 'Safety & HSE' },
  { id: 3, title: 'Process Engineer', company: 'ExxonMobil', location: 'Singapore', salary: '$95k–$140k', type: 'Full-time', logo: '🏭', savedDate: '3 days ago', category: 'Engineering' },
  { id: 4, title: 'Maintenance Engineer', company: 'Equinor', location: 'Oslo, Norway', salary: '$85k–$115k', type: 'Full-time', logo: '⚙️', savedDate: '5 days ago', category: 'Engineering' },
  { id: 5, title: 'Project Manager – Upstream', company: 'ConocoPhillips', location: 'London, UK', salary: '$110k–$160k', type: 'Full-time', logo: '📊', savedDate: '1 week ago', category: 'Management' },
];

const jobTypeBadgeStyles = {
  'Full-time': 'bg-emerald-50 text-emerald-700 border-emerald-100',
  'Contract': 'bg-amber-50 text-amber-700 border-amber-100',
  'Part-time': 'bg-blue-50 text-blue-700 border-blue-100',
};

export function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState(initialSavedJobs);
  const [search, setSearch] = useState('');

  const filtered = savedJobs.filter(j =>
    !search ||
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  const removeJob = (id) => setSavedJobs(prev => prev.filter(j => j.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center bg-background border border-border rounded-xl px-4 py-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all max-w-md">
        <Search className="w-4 h-4 text-muted-foreground mr-3 flex-shrink-0" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search saved jobs..."
          className="bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground flex-1" />
        {search && <button onClick={() => setSearch('')}><X className="w-4 h-4 text-muted-foreground hover:text-foreground" /></button>}
      </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-border/60">
            <BookmarkX className="w-14 h-14 mx-auto mb-4 text-muted-foreground/40" />
            <h2 className="text-xl font-bold text-foreground mb-2">
              {search ? 'No matching saved jobs' : 'No saved jobs yet'}
            </h2>
            <p className="text-muted-foreground mb-6">
              {search ? 'Try a different search term' : 'Browse jobs and bookmark ones you like'}
            </p>
            <Link to="/jobs" className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shine-effect"
              style={{ background: 'var(--gradient-primary)' }}>
              <Briefcase className="w-4 h-4" /><span>Browse Jobs</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  layout
                >
                  <div className="bg-white border border-border/60 rounded-2xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start space-x-4 flex-1 min-w-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                          {job.logo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${jobTypeBadgeStyles[job.type] || 'bg-gray-50 text-gray-600 border-gray-100'}`}>{job.type}</span>
                          </div>
                          <Link to={`/jobs/${job.id}`} className="block text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1 truncate">
                            {job.title}
                          </Link>
                          <p className="text-sm text-muted-foreground flex items-center space-x-1 mb-3">
                            <Building2 className="w-3.5 h-3.5 flex-shrink-0" /><span>{job.company}</span>
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="inline-flex items-center space-x-1 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">
                              <MapPin className="w-3 h-3" /><span>{job.location}</span>
                            </span>
                            <span className="inline-flex items-center space-x-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-semibold">
                              <DollarSign className="w-3 h-3" /><span>{job.salary}</span>
                            </span>
                            <span className="text-xs text-muted-foreground self-center">Saved {job.savedDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <ApplyNowPaymentModal
                          feeAmount={5}
                          feeLabel="Application Fee"
                          paymentPath="/payment"
                          triggerLabel="Apply Now"
                          triggerClassName="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-md hover:scale-[1.02] shine-effect text-center"
                          triggerStyle={{ background: 'var(--gradient-primary)' }}
                        />
                        <button onClick={() => removeJob(job.id)}
                          className="flex items-center justify-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium border border-border text-muted-foreground hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all">
                          <Bookmark className="w-3.5 h-3.5" /><span>Unsave</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Alert */}
        {savedJobs.length > 0 && (
          <div className="mt-6 bg-amber-50 border border-amber-100 rounded-2xl p-4 flex items-start space-x-3">
            <span className="text-xl flex-shrink-0">⏰</span>
            <div>
              <p className="font-semibold text-amber-800 text-sm">Don't wait too long!</p>
              <p className="text-amber-700 text-xs mt-0.5">Some saved jobs may close soon. Apply while they're still open.</p>
            </div>
          </div>
        )}
    </div>
  );
}
