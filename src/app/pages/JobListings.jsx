import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useJobs } from '../context/JobsContext.jsx';
import {
  Plus, Search, Briefcase, MapPin, Clock, Users, Eye,
  ToggleLeft, ToggleRight, Trash2, Edit3, Filter,
  TrendingUp, CheckCircle, PauseCircle, XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// ─── Helpers ─────────────────────────────────────────────────
const STATUS_CONFIG = {
  Active:  { color: 'text-emerald-700 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-500', icon: CheckCircle },
  Paused:  { color: 'text-amber-700  bg-amber-50  border-amber-200',     dot: 'bg-amber-400',   icon: PauseCircle },
  Closed:  { color: 'text-red-700    bg-red-50    border-red-200',       dot: 'bg-red-400',     icon: XCircle },
};

const FILTER_TABS = ['All', 'Active', 'Paused', 'Closed'];

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] ?? STATUS_CONFIG.Active;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${cfg.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {status}
    </span>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-border/60 p-5 shadow-sm flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────
export function JobListings() {
  const { myJobs, toggleStatus, deleteJob } = useJobs();
  const navigate = useNavigate();

  const [search,    setSearch]    = useState('');
  const [filter,    setFilter]    = useState('All');
  const [deleteId,  setDeleteId]  = useState(null); // confirm modal

  // ── derived stats ──
  const total   = myJobs.length;
  const active  = myJobs.filter(j => j.status === 'Active').length;
  const paused  = myJobs.filter(j => j.status === 'Paused').length;
  const totalApplicants = myJobs.reduce((sum, j) => sum + (j.applicants || 0), 0);

  // ── filtered list ──
  const visible = myJobs.filter(j => {
    const matchFilter = filter === 'All' || j.status === filter;
    const matchSearch = !search ||
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.location.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const confirmDelete = (id) => setDeleteId(id);
  const doDelete = () => { deleteJob(deleteId); setDeleteId(null); };

  return (
    <div className="space-y-6">

      {/* ── Header row ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">My Job Listings</h2>
          <p className="text-sm text-muted-foreground">{total} job{total !== 1 ? 's' : ''} posted</p>
        </div>
        <Link
          to="/company/post-job"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-bold
            hover:shadow-lg hover:scale-[1.02] transition-all"
          style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}
        >
          <Plus className="w-4 h-4" />
          Post a Job
        </Link>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={Briefcase}   label="Total Jobs"       value={total}           color="bg-cyan-50 text-cyan-600" />
        <StatCard icon={CheckCircle} label="Active"           value={active}          color="bg-emerald-50 text-emerald-600" />
        <StatCard icon={PauseCircle} label="Paused"           value={paused}          color="bg-amber-50 text-amber-600" />
        <StatCard icon={Users}       label="Total Applicants" value={totalApplicants} color="bg-purple-50 text-purple-600" />
      </div>

      {/* ── Search + Filter ── */}
      <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-sm flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title or location…"
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-border bg-background
              focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500 transition-all"
          />
        </div>
        {/* Filter tabs */}
        <div className="flex gap-1.5 flex-wrap">
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all
                ${filter === tab
                  ? 'bg-cyan-600 text-white border-cyan-600'
                  : 'border-border text-muted-foreground hover:bg-muted/50'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Job Cards ── */}
      {visible.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl border border-border/60 shadow-sm p-16 text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-2">
            {search || filter !== 'All' ? 'No matching jobs' : 'No jobs posted yet'}
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            {search || filter !== 'All'
              ? 'Try adjusting your search or filter.'
              : 'Post your first job to start receiving applications.'}
          </p>
          {!search && filter === 'All' && (
            <Link
              to="/company/post-job"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-bold
                hover:shadow-lg transition-all"
              style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}
            >
              <Plus className="w-4 h-4" /> Post a Job
            </Link>
          )}
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {visible.map((job, i) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border border-border/60 shadow-sm hover:shadow-md
                  hover:border-cyan-200 transition-all group"
              >
                <div className="p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">

                    {/* Left: info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-base font-bold text-foreground group-hover:text-cyan-600 transition-colors truncate">
                          {job.title}
                        </h3>
                        <StatusBadge status={job.status} />
                      </div>

                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5" /> {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-3.5 h-3.5" /> {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> Posted {job.posted}
                        </span>
                        <span className="flex items-center gap-1 text-red-400">
                          <Clock className="w-3.5 h-3.5" /> Expires {job.expires}
                        </span>
                      </div>

                      {/* Skills chips */}
                      {job.skills?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {job.skills.slice(0, 4).map(s => (
                            <span key={s} className="px-2.5 py-0.5 rounded-lg bg-cyan-50 text-cyan-700
                              text-xs font-medium border border-cyan-100">
                              {s}
                            </span>
                          ))}
                          {job.skills.length > 4 && (
                            <span className="px-2.5 py-0.5 rounded-lg bg-muted text-muted-foreground text-xs">
                              +{job.skills.length - 4} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Right: stats + actions */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-purple-400" />
                          <span className="font-semibold text-foreground">{job.applicants ?? 0}</span> applicants
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-blue-400" />
                          <span className="font-semibold text-foreground">{job.views ?? 0}</span> views
                        </span>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-2">
                        {/* Toggle Active/Paused */}
                        {job.status !== 'Closed' && (
                          <button
                            onClick={() => toggleStatus(job.id)}
                            title={job.status === 'Active' ? 'Pause listing' : 'Activate listing'}
                            className={`p-2 rounded-xl border transition-all
                              ${job.status === 'Active'
                                ? 'border-amber-200 text-amber-600 hover:bg-amber-50'
                                : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'}`}
                          >
                            {job.status === 'Active'
                              ? <PauseCircle className="w-4 h-4" />
                              : <ToggleRight className="w-4 h-4" />}
                          </button>
                        )}

                        {/* View applicants */}
                        <Link
                          to={`/company/jobs/${job.id}/applicants`}
                          className="p-2 rounded-xl border border-border text-muted-foreground
                            hover:bg-purple-50 hover:text-purple-600 hover:border-purple-200 transition-all"
                          title="View applicants"
                        >
                          <Users className="w-4 h-4" />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => confirmDelete(job.id)}
                          className="p-2 rounded-xl border border-border text-muted-foreground
                            hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all"
                          title="Delete listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl border border-border shadow-xl p-7 max-w-sm w-full"
            >
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground text-center mb-2">Delete Job Listing?</h3>
              <p className="text-sm text-muted-foreground text-center mb-6">
                This action cannot be undone. The listing and all associated data will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold
                    hover:bg-muted/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={doDelete}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold
                    hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}