import { Link } from 'react-router';
import { Briefcase, Eye, Clock, MapPin, Users, TrendingUp, Edit, Pause, Play, Trash2, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const initialJobs = [
  { id: 1, title: 'Senior Drilling Engineer', location: 'Houston, TX', type: 'Full-time', posted: '2025-03-01', expires: '2025-04-01', applicants: 45, views: 320, status: 'Active' },
  { id: 2, title: 'Safety Manager', location: 'Aberdeen, UK', type: 'Full-time', posted: '2025-02-22', expires: '2025-03-22', applicants: 28, views: 215, status: 'Active' },
  { id: 3, title: 'Process Engineer', location: 'Singapore', type: 'Full-time', posted: '2025-02-26', expires: '2025-03-26', applicants: 32, views: 180, status: 'Paused' },
  { id: 4, title: 'Rig Supervisor (Offshore)', location: 'Gulf of Mexico', type: 'Contract', posted: '2025-02-15', expires: '2025-03-15', applicants: 61, views: 440, status: 'Active' },
  { id: 5, title: 'HSE Coordinator', location: 'Houston, TX', type: 'Full-time', posted: '2025-01-30', expires: '2025-03-01', applicants: 19, views: 95, status: 'Closed' },
];

const statusBadge = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Paused: 'bg-amber-50 text-amber-700 border-amber-100',
  Closed: 'bg-gray-50 text-gray-600 border-gray-100',
};

export function EmployerJobListings() {
  const [jobs, setJobs] = useState(initialJobs);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const toggleStatus = (id) => {
    setJobs(prev => prev.map(j => j.id === id ? {
      ...j, status: j.status === 'Active' ? 'Paused' : 'Active'
    } : j));
  };

  const deleteJob = (id) => setJobs(prev => prev.filter(j => j.id !== id));

  const filtered = jobs.filter(j => {
    if (filterStatus !== 'All' && j.status !== filterStatus) return false;
    if (search && !j.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const totals = { jobs: jobs.length, active: jobs.filter(j => j.status === 'Active').length, applicants: jobs.reduce((s, j) => s + j.applicants, 0), views: jobs.reduce((s, j) => s + j.views, 0) };

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Briefcase, label: 'Total Jobs', value: totals.jobs, color: 'text-primary', bg: 'bg-primary/8' },
            { icon: TrendingUp, label: 'Active', value: totals.active, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { icon: Users, label: 'Total Applicants', value: totals.applicants, color: 'text-purple-600', bg: 'bg-purple-50' },
            { icon: Eye, label: 'Total Views', value: totals.views, color: 'text-amber-500', bg: 'bg-amber-50' },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              className="bg-white rounded-2xl border border-border/60 p-4 shadow-sm">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-3`}>
                <s.icon className={`w-4.5 h-4.5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 flex items-center bg-white border border-border rounded-xl px-4 py-3 focus-within:border-secondary/50 transition-all">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search your jobs..."
              className="bg-transparent outline-none text-sm flex-1 text-foreground" />
          </div>
          <div className="flex gap-2">
            {(['All', 'Active', 'Paused', 'Closed']).map(s => (
              <button key={s} onClick={() => setFilterStatus(s)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                  filterStatus === s ? 'text-white border-secondary shadow-sm' : 'border-border text-muted-foreground bg-white hover:border-secondary/30'
                }`}
                style={filterStatus === s ? { background: 'linear-gradient(135deg, #0891B2, #0E7490)' } : {}}
              >{s}</button>
            ))}
          </div>
        </div>

        {/* Jobs Table */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
          <div className="divide-y divide-border/50">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Briefcase className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                <p className="font-semibold text-foreground">No jobs found</p>
                <Link to="/employer/post-job" className="text-secondary hover:underline text-sm font-semibold mt-2 block">Post your first job</Link>
              </div>
            ) : filtered.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="p-5 hover:bg-muted/10 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-bold text-foreground">{job.title}</h3>
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${statusBadge[job.status]}`}>{job.status}</span>
                      <span className="text-xs text-muted-foreground hidden sm:block bg-muted/40 px-2 py-0.5 rounded-full">{job.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center space-x-1"><MapPin className="w-3 h-3" /><span>{job.location}</span></span>
                      <span className="flex items-center space-x-1"><Users className="w-3 h-3" /><strong className="text-foreground">{job.applicants}</strong><span>applicants</span></span>
                      <span className="flex items-center space-x-1"><Eye className="w-3 h-3" /><strong className="text-foreground">{job.views}</strong><span>views</span></span>
                      <span className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>Expires {job.expires}</span></span>
                    </div>
                    {/* Quick progress bar */}
                    <div className="mt-2.5 flex items-center space-x-2">
                      <div className="flex-1 h-1 bg-muted/40 rounded-full overflow-hidden max-w-40">
                        <div className="h-full rounded-full bg-secondary" style={{ width: `${Math.min((job.applicants / 70) * 100, 100)}%` }} />
                      </div>
                      <span className="text-[11px] text-muted-foreground">{job.applicants}/70 target</span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap flex-shrink-0">
                    <Link to={`/employer/applicants`}
                      className="px-3.5 py-2 rounded-lg text-sm font-semibold text-white shine-effect hover:shadow-md transition-all"
                      style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}>
                      Applicants
                    </Link>
                    <button className="p-2 rounded-lg border border-border text-muted-foreground hover:bg-muted/50 transition-colors" title="Edit">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => toggleStatus(job.id)} className="p-2 rounded-lg border border-border text-muted-foreground hover:bg-muted/50 transition-colors" title={job.status === 'Active' ? 'Pause' : 'Activate'}>
                      {job.status === 'Active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button onClick={() => deleteJob(job.id)} className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors" title="Delete">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
    </div>
  );
}
