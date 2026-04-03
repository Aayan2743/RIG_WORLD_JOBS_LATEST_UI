import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, Clock, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const applications = [
  { id: 1, title: 'Senior Drilling Engineer', company: 'Shell Energy', location: 'Houston, TX', salary: '$120k–$180k', appliedDate: '2 days ago', status: 'Interview Scheduled', interviewDate: 'Mar 15, 2026', logo: '🛢️' },
  { id: 2, title: 'Safety Manager', company: 'BP Operations', location: 'Aberdeen, UK', salary: '$90k–$130k', appliedDate: '5 days ago', status: 'Under Review', logo: '⚡' },
  { id: 3, title: 'Process Engineer', company: 'ExxonMobil', location: 'Singapore', salary: '$95k–$140k', appliedDate: '1 week ago', status: 'Application Sent', logo: '🏭' },
  { id: 4, title: 'Offshore Platform Engineer', company: 'Equinor', location: 'Stavanger, Norway', salary: '$100k–$145k', appliedDate: '2 weeks ago', status: 'Shortlisted', logo: '🔵' },
  { id: 5, title: 'Rig Supervisor', company: 'Chevron', location: 'Gulf of Mexico', salary: '$150k–$200k', appliedDate: '3 weeks ago', status: 'Rejected', logo: '🌊' },
  { id: 6, title: 'HSE Coordinator', company: 'TotalEnergies', location: 'Paris, France', salary: '$70k–$95k', appliedDate: '1 month ago', status: 'Withdrawn', logo: '☀️' },
];

const statusConfig = {
  'Interview Scheduled': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-500', label: '🗓️ Interview Scheduled' },
  'Shortlisted': { bg: 'bg-blue-50', text: 'text-primary', dot: 'bg-primary', label: '⭐ Shortlisted' },
  'Under Review': { bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500', label: '🔍 Under Review' },
  'Application Sent': { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-400', label: '📤 Application Sent' },
  'Rejected': { bg: 'bg-red-50', text: 'text-red-600', dot: 'bg-red-400', label: '❌ Not Selected' },
  'Withdrawn': { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400', label: '↩️ Withdrawn' },
};

const statusFilters = ['All', 'Interview Scheduled', 'Shortlisted', 'Under Review', 'Application Sent', 'Rejected'];

export function CandidateApplications() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = applications.filter(a => {
    if (filter !== 'All' && a.status !== filter) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) && !a.company.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = [
    { label: 'Total Applied', value: applications.length },
    { label: 'Active', value: applications.filter(a => !['Rejected', 'Withdrawn'].includes(a.status)).length },
    { label: 'Interviews', value: applications.filter(a => a.status === 'Interview Scheduled').length },
    { label: 'Shortlisted', value: applications.filter(a => a.status === 'Shortlisted').length },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-background border border-border/60 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold text-foreground">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center bg-background border border-border rounded-xl px-4 py-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all max-w-sm">
        <Search className="w-4 h-4 text-muted-foreground mr-2" />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search applications..."
          className="bg-transparent outline-none text-sm flex-1" />
        {search && <button onClick={() => setSearch('')}><X className="w-4 h-4 text-muted-foreground" /></button>}
      </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {statusFilters.map(s => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                filter === s
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white border-border text-muted-foreground hover:text-foreground hover:border-primary/30'
              }`}>
              {s}
              {s !== 'All' && <span className="ml-1.5 text-xs opacity-70">({applications.filter(a => a.status === s).length})</span>}
            </button>
          ))}
        </div>

        {/* Applications list */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-border/60">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
            <p className="font-semibold text-foreground">No applications found</p>
            <p className="text-sm text-muted-foreground mt-1">Try a different filter or search term</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((app, i) => {
              const sc = statusConfig[app.status] || statusConfig['Application Sent'];
              return (
                <motion.div key={app.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                  <div className="bg-white border border-border/60 rounded-2xl p-5 hover:shadow-md hover:border-primary/20 transition-all group">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-13 h-13 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm w-14 h-14">
                          {app.logo}
                        </div>
                        <div>
                          <Link to={`/jobs/${app.id}`} className="text-lg font-bold text-foreground group-hover:text-primary transition-colors block mb-0.5">{app.title}</Link>
                          <p className="text-sm text-muted-foreground mb-3">{app.company}</p>
                          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                            <span className="flex items-center space-x-1"><MapPin className="w-3 h-3" /><span>{app.location}</span></span>
                            <span className="flex items-center space-x-1 text-emerald-600 font-semibold"><DollarSign className="w-3 h-3" /><span>{app.salary}</span></span>
                            <span className="flex items-center space-x-1"><Clock className="w-3 h-3" /><span>Applied {app.appliedDate}</span></span>
                          </div>
                          {app.interviewDate && (
                            <div className="mt-2 inline-flex items-center space-x-2 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs text-emerald-700 font-semibold">
                              <span>📅</span><span>Interview: {app.interviewDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <span className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${sc.bg} ${sc.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot} flex-shrink-0`} />
                          <span>{app.status}</span>
                        </span>
                        <Link to={`/jobs/${app.id}`} className="text-xs text-primary hover:underline font-semibold">View Job →</Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
    </div>
  );
}
