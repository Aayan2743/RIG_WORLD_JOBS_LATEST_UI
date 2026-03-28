import { Link } from 'react-router';
import { Briefcase, Users, Eye, TrendingUp, MapPin, Clock, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { useJobs } from '../context/JobsContext.jsx';

const recentApplicants = [
  { id: 1, name: 'John Martinez', initials: 'JM', position: 'Senior Drilling Engineer', experience: '8 years', appliedDate: '2 hours ago', status: 'New', color: 'from-blue-500 to-blue-600' },
  { id: 2, name: 'Sarah Williams', initials: 'SW', position: 'Safety Manager', experience: '5 years', appliedDate: '5 hours ago', status: 'Reviewed', color: 'from-purple-500 to-purple-600' },
  { id: 3, name: 'Michael Chen', initials: 'MC', position: 'Process Engineer', experience: '6 years', appliedDate: '1 day ago', status: 'Shortlisted', color: 'from-emerald-500 to-emerald-600' },
  { id: 4, name: 'Emma Thompson', initials: 'ET', position: 'Senior Drilling Engineer', experience: '7 years', appliedDate: '1 day ago', status: 'New', color: 'from-amber-500 to-amber-600' },
];

const applicantStatusConfig = {
  'New': { bg: 'bg-blue-50', text: 'text-primary' },
  'Reviewed': { bg: 'bg-purple-50', text: 'text-purple-700' },
  'Shortlisted': { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'Rejected': { bg: 'bg-red-50', text: 'text-red-600' },
};

export function EmployerDashboard() {
  const { jobs } = useJobs();
  const activeJobs = jobs.filter(j => j.status === 'Active').slice(0, 5);

  return (
    <div className="space-y-6">

      {/* Stat Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs', value: '12', delta: '+2', icon: Briefcase, iconBg: 'bg-blue-50', iconColor: 'text-primary' },
          { label: 'Total Applicants', value: '156', delta: '+23', icon: Users, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
          { label: 'Job Views', value: '2,345', delta: '+180', icon: Eye, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
          { label: 'New This Week', value: '23', delta: 'applicants', icon: TrendingUp, iconBg: 'bg-amber-50', iconColor: 'text-amber-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-white rounded-2xl border border-border/60 p-4 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                <stat.icon className={`w-4.5 h-4.5 ${stat.iconColor}`} />
              </div>
              <span className="text-xs text-emerald-600 font-semibold">{stat.delta}</span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-0.5">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Active Jobs Table */}
      {/* <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-border/60">
          <h2 className="text-lg font-bold text-foreground">Active Job Listings</h2>
          <Link to="/employer/jobs" className="text-secondary hover:underline text-sm font-semibold flex items-center space-x-1">
            <span>Manage All</span><ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-border/50">
          {activeJobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 hover:bg-muted/10 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1.5">
                    <Link to={`/employer/jobs/${job.id}`} className="text-base font-bold text-foreground hover:text-secondary transition-colors">{job.title}</Link>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${job.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                      {job.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1"><MapPin className="w-3 h-3" /><span>{job.location}</span></span>
                    <span>{job.type}</span>
                    <span className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>Posted {job.posted}</span></span>
                  </div>
                  <div className="flex items-center space-x-3 mt-3">
                    <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span><strong className="text-foreground">{job.applicants}</strong> applicants</span>
                    </div>
                    <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden max-w-24">
                      <div className="h-full rounded-full bg-secondary" style={{ width: `${Math.min((job.applicants / 60) * 100, 100)}%` }} />
                    </div>
                    <div className="flex items-center space-x-1.5 text-xs text-muted-foreground">
                      <Eye className="w-3 h-3" />
                      <span><strong className="text-foreground">{job.views}</strong> views</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <Link
                    to={`/employer/jobs/${job.id}/applicants`}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:shadow-md"
                    style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
                  >
                    Applicants
                  </Link>
                  <Link
                    to={`/employer/jobs/${job.id}/edit`}
                    className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div> */}

      {/* Recent Applicants */}
      {/* <div className="bg-white rounded-2xl border border-border/60 shadow-sm">
        <div className="flex items-center justify-between p-5 border-b border-border/60">
          <h2 className="text-lg font-bold text-foreground">Recent Applicants</h2>
          <Link to="/employer/applicants" className="text-secondary hover:underline text-sm font-semibold flex items-center space-x-1">
            <span>View All</span><ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="divide-y divide-border/50">
          {recentApplicants.map((applicant, i) => {
            const sc = applicantStatusConfig[applicant.status] || applicantStatusConfig['New'];
            return (
              <motion.div
                key={applicant.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center p-5 hover:bg-muted/10 transition-colors gap-4"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${applicant.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {applicant.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground text-sm">{applicant.name}</h3>
                  <p className="text-xs text-muted-foreground">Applied for <span className="text-foreground font-medium">{applicant.position}</span></p>
                  <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                    <span className="flex items-center space-x-1"><Star className="w-3 h-3 text-amber-400 fill-amber-400" /><span>{applicant.experience} exp.</span></span>
                    <span>Applied {applicant.appliedDate}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>{applicant.status}</span>
                  <Link to={`/employer/applicants/${applicant.id}`} className="text-secondary hover:underline font-semibold text-xs">View →</Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
}
