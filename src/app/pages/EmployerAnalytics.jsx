import { Link } from 'react-router';
import { BarChart3, TrendingUp, Users, Eye, Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useJobs } from '../context/JobsContext.jsx';

export function EmployerAnalytics() {
  const { jobs } = useJobs();

  const active = jobs.filter(j => j.status === 'Active');
  const totalViews = jobs.reduce((s, j) => s + j.views, 0);
  const totalApplicants = jobs.reduce((s, j) => s + j.applicants, 0);

  const topJobs = [...jobs]
    .sort((a, b) => (b.views + b.applicants * 3) - (a.views + a.applicants * 3))
    .slice(0, 5);

  const weekly = [
    { label: 'Mon', views: 210, applicants: 8 },
    { label: 'Tue', views: 260, applicants: 12 },
    { label: 'Wed', views: 180, applicants: 7 },
    { label: 'Thu', views: 320, applicants: 15 },
    { label: 'Fri', views: 290, applicants: 13 },
    { label: 'Sat', views: 140, applicants: 4 },
    { label: 'Sun', views: 160, applicants: 5 },
  ];

  const maxViews = Math.max(...weekly.map(d => d.views));

  return (
    <div className="space-y-7">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs', value: active.length, icon: Briefcase, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
          { label: 'Total Views', value: totalViews, icon: Eye, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
          { label: 'Total Applicants', value: totalApplicants, icon: Users, iconBg: 'bg-blue-50', iconColor: 'text-primary' },
          { label: 'Engagement Score', value: Math.min(100, Math.round(((totalApplicants * 6 + totalViews) / Math.max(1, jobs.length)) / 10)), icon: TrendingUp, iconBg: 'bg-amber-50', iconColor: 'text-amber-500' },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="bg-white rounded-2xl border border-border/60 p-4 shadow-sm"
          >
            <div className={`w-9 h-9 rounded-xl ${s.iconBg} flex items-center justify-center mb-3`}>
              <s.icon className={`w-4.5 h-4.5 ${s.iconColor}`} />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-border/60">
            <div className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5 text-secondary" />
              <h2 className="text-lg font-bold text-foreground">Weekly Views</h2>
            </div>
            <span className="text-xs text-muted-foreground">Views per day</span>
          </div>
          <div className="p-5">
            <div className="grid grid-cols-7 gap-3 items-end h-44">
              {weekly.map(d => (
                <div key={d.label} className="flex flex-col items-center justify-end gap-2">
                  <div className="w-full rounded-xl bg-muted/40 overflow-hidden h-36 flex items-end">
                    <div
                      className="w-full rounded-xl"
                      style={{
                        height: `${Math.round((d.views / maxViews) * 100)}%`,
                        background: 'linear-gradient(135deg, #0891B2, #0E7490)',
                      }}
                    />
                  </div>
                  <div className="text-[11px] text-muted-foreground">{d.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl border border-border/60 bg-muted/10 p-3">
                <p className="text-muted-foreground">Total this week</p>
                <p className="text-foreground font-bold mt-0.5">{weekly.reduce((s, d) => s + d.views, 0).toLocaleString()} views</p>
              </div>
              <div className="rounded-xl border border-border/60 bg-muted/10 p-3">
                <p className="text-muted-foreground">Applicants this week</p>
                <p className="text-foreground font-bold mt-0.5">{weekly.reduce((s, d) => s + d.applicants, 0).toLocaleString()} applicants</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between p-5 border-b border-border/60">
            <h2 className="text-lg font-bold text-foreground">Top Performing Jobs</h2>
            <Link to="/employer/jobs" className="text-secondary hover:underline text-sm font-semibold flex items-center space-x-1">
              <span>All</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-border/50">
            {topJobs.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">No jobs yet</div>
            ) : (
              topJobs.map(job => (
                <div key={job.id} className="p-4">
                  <p className="text-sm font-bold text-foreground truncate">{job.title}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center space-x-1"><Eye className="w-3.5 h-3.5" /><span>{job.views.toLocaleString()}</span></span>
                    <span className="inline-flex items-center space-x-1"><Users className="w-3.5 h-3.5" /><span>{job.applicants.toLocaleString()}</span></span>
                    <span className="inline-flex items-center space-x-1"><TrendingUp className="w-3.5 h-3.5" /><span>{Math.min(100, Math.round((job.views + job.applicants * 6) / 10))}</span></span>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-secondary" />
          <h2 className="text-lg font-bold text-foreground">Recommendations</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: 'Improve descriptions', body: 'Add 3–5 bullet responsibilities and clear shift schedule to increase apply rate.' },
            { title: 'Boost visibility', body: 'Add salary range and benefits to rank higher in candidate searches.' },
            { title: 'Respond faster', body: 'Aim to review new applicants within 24 hours to improve acceptance rates.' },
          ].map(r => (
            <div key={r.title} className="rounded-2xl border border-border/60 bg-muted/10 p-4">
              <p className="font-bold text-foreground text-sm">{r.title}</p>
              <p className="text-sm text-muted-foreground mt-1.5">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
