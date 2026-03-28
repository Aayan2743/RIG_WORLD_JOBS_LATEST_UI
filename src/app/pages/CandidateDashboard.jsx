import { Link } from 'react-router';
import { Briefcase, Bookmark, MapPin, TrendingUp, ChevronRight, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const mockStats = { totalApplications: 4, savedJobs: 3, profileViews: 128 };
const mockApplications = [
  { jobTitle: 'Senior Drilling Engineer', company: 'Shell Energy', location: 'Houston, TX', status: 'shortlisted' },
  { jobTitle: 'HSE Coordinator', company: 'BP Operations', location: 'Aberdeen, UK', status: 'applied' },
  { jobTitle: 'Rig Supervisor', company: 'Chevron', location: 'Gulf of Mexico', status: 'applied' },
];
const mockSavedJobs = [
  { _id: '1', job_id: { _id: '1', title: 'Process Engineer', company: 'ExxonMobil', location: 'Singapore', salary: '$95k–$140k' } },
  { _id: '2', job_id: { _id: '2', title: 'Maintenance Engineer', company: 'Equinor', location: 'Oslo, Norway', salary: '$85k–$115k' } },
];

const notifications = [
  { id: 1, message: 'Interview scheduled for Safety Manager at BP Operations', time: '2 hours ago', unread: true, type: 'interview' },
  { id: 2, message: 'Your application for Senior Drilling Engineer is under review', time: '1 day ago', unread: true, type: 'review' },
  { id: 3, message: '5 new jobs matching your profile preferences', time: '2 days ago', unread: false, type: 'match' },
];

const statusConfig = {
  applied: { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400', label: 'Applied' },
  shortlisted: { bg: 'bg-blue-50', text: 'text-primary', dot: 'bg-primary', label: 'Shortlisted' },
  rejected: { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-500', label: 'Rejected' },
};

export function CandidateDashboard() {
  const [stats, setStats] = useState({
    totalApplications: 0,
    savedJobs: 0,
    profileViews: 0,
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingApps, setLoadingApps] = useState(true);
  const [loadingSaved, setLoadingSaved] = useState(true);

  useEffect(() => {
    setStats(mockStats);
    setLoadingStats(false);
    setRecentApplications(mockApplications);
    setLoadingApps(false);
    setSavedJobs(mockSavedJobs);
    setLoadingSaved(false);
  }, []);

  return (
    <div className="space-y-6">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Applications', value: stats.totalApplications, delta: loadingStats ? 'Loading…' : 'Up to date', icon: Briefcase, iconBg: 'bg-blue-50', iconColor: 'text-primary', gradient: 'from-blue-500 to-blue-600' },
          { label: 'Saved Jobs', value: stats.savedJobs, delta: loadingStats ? 'Loading…' : 'Up to date', icon: Bookmark, iconBg: 'bg-amber-50', iconColor: 'text-amber-500', gradient: 'from-amber-500 to-orange-500' },
          { label: 'Profile Views', value: stats.profileViews, delta: loadingStats ? 'Loading…' : 'Up to date', icon: Eye, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-500', gradient: 'from-emerald-500 to-teal-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-border/60 p-5 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
              <div className="text-right">
                <p className="text-xs text-emerald-600 font-semibold flex items-center space-x-0.5">
                  <TrendingUp className="w-3 h-3" />
                  <span>{stat.delta}</span>
                </p>
              </div>
            </div>
            <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Applications */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-border/60">
          <h2 className="text-lg font-bold text-foreground">Recent Applications</h2>
          <Link to="/candidate/applications" className="text-primary hover:underline text-sm font-semibold flex items-center space-x-1">
            <span>View All</span><ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {loadingApps ? (
          <div className="p-5 text-sm text-muted-foreground">Loading…</div>
        ) : recentApplications.length === 0 ? (
          <div className="p-5 text-sm text-muted-foreground">No applications yet.</div>
        ) : (
          <div className="divide-y divide-border/50">
            {recentApplications.map((app, index) => {
              const sc = statusConfig[app.status];
              return (
                <motion.div
                  key={`${app.jobTitle}-${index}`}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start p-5 hover:bg-muted/20 transition-colors"
                >
                  <div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mr-4"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    {(app.company?.[0] || 'J').toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link to="/candidate/applications" className="text-base font-bold text-foreground hover:text-primary transition-colors">{app.jobTitle}</Link>
                    <p className="text-sm text-muted-foreground mb-2">{app.company}</p>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1"><MapPin className="w-3 h-3" /><span>{app.location}</span></span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                      <span>{sc.label}</span>
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Saved Jobs */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-border/60">
          <h2 className="text-lg font-bold text-foreground">Saved Jobs</h2>
          <Link to="/candidate/saved-jobs" className="text-primary hover:underline text-sm font-semibold flex items-center space-x-1">
            <span>View All</span><ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {loadingSaved ? (
          <div className="p-5 text-sm text-muted-foreground">Loading…</div>
        ) : savedJobs.length === 0 ? (
          <div className="p-5 text-sm text-muted-foreground">No saved jobs yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
            {savedJobs.map((saved, index) => (
              <motion.div
                key={saved._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                <Link to={`/jobs/${saved.job_id._id}`} className="block border border-border/60 rounded-xl p-4 hover:shadow-md hover:border-primary/20 transition-all group">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-xs font-bold text-primary">
                      {(saved.job_id.company?.[0] || 'J').toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-foreground group-hover:text-primary transition-colors text-sm truncate">{saved.job_id.title}</h3>
                      <p className="text-xs text-muted-foreground">{saved.job_id.company}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground flex items-center space-x-1"><MapPin className="w-3 h-3" /><span>{saved.job_id.location}</span></span>
                    <span className="text-emerald-600 font-bold">{saved.job_id.salary}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-sm">
        <div className="p-5 border-b border-border/60">
          <h2 className="text-lg font-bold text-foreground">Notifications</h2>
        </div>
        <div className="divide-y divide-border/50">
          {notifications.map(n => (
            <div key={n.id} className={`p-4 flex items-start space-x-3 transition-colors ${n.unread ? 'bg-blue-50/40' : 'hover:bg-muted/20'}`}>
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${n.unread ? 'bg-primary' : 'bg-muted-foreground/30'}`} />
              <div className="flex-1">
                <p className={`text-sm ${n.unread ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{n.message}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{n.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
