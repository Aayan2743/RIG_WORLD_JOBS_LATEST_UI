import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft, Search, Filter, Download, Mail, Phone,
  MapPin, Calendar, Star, CheckCircle, XCircle, Clock,
  Eye, FileText, ChevronDown, User
} from 'lucide-react';

const mockApplicants = [
  { id: 1, name: 'James Hartley', role: 'Senior Drilling Engineer', location: 'Houston, TX', email: 'james.hartley@email.com', phone: '+1 (832) 555-0121', applied: '2025-03-15', experience: '12 years', status: 'Shortlisted', rating: 5, avatar: 'JH', resume: true },
  { id: 2, name: 'Priya Nair', role: 'Senior Drilling Engineer', location: 'Dubai, UAE', email: 'priya.nair@email.com', phone: '+971 50 555 0234', applied: '2025-03-14', experience: '9 years', status: 'Under Review', rating: 4, avatar: 'PN', resume: true },
  { id: 3, name: 'Carlos Mendes', role: 'Senior Drilling Engineer', location: 'Bogotá, Colombia', email: 'c.mendes@email.com', phone: '+57 300 555 0345', applied: '2025-03-13', experience: '15 years', status: 'New', rating: 4, avatar: 'CM', resume: true },
  { id: 4, name: 'Aisha Bello', role: 'Senior Drilling Engineer', location: 'Lagos, Nigeria', email: 'aisha.bello@email.com', phone: '+234 801 555 0456', applied: '2025-03-12', experience: '7 years', status: 'Rejected', rating: 2, avatar: 'AB', resume: false },
  { id: 5, name: 'Tom Eriksson', role: 'Senior Drilling Engineer', location: 'Stavanger, Norway', email: 'tom.eriksson@email.com', phone: '+47 900 55 567', applied: '2025-03-11', experience: '11 years', status: 'Shortlisted', rating: 5, avatar: 'TE', resume: true },
  { id: 6, name: 'Mei Lin Zhang', role: 'Senior Drilling Engineer', location: 'Singapore', email: 'meilin.z@email.com', phone: '+65 9123 4567', applied: '2025-03-10', experience: '8 years', status: 'Under Review', rating: 3, avatar: 'MZ', resume: true },
];

const jobTitles = {
  1: 'Senior Drilling Engineer',
  2: 'Safety Manager',
  3: 'Process Engineer',
  4: 'Rig Supervisor (Offshore)',
  5: 'HSE Coordinator',
};

const statusConfig = {
  'New': { color: 'bg-blue-50 text-blue-700 border-blue-100', icon: Clock },
  'Under Review': { color: 'bg-amber-50 text-amber-700 border-amber-100', icon: Eye },
  'Shortlisted': { color: 'bg-emerald-50 text-emerald-700 border-emerald-100', icon: CheckCircle },
  'Rejected': { color: 'bg-red-50 text-red-500 border-red-100', icon: XCircle },
};

const avatarColors = [
  'from-cyan-500 to-cyan-600',
  'from-purple-500 to-purple-600',
  'from-emerald-500 to-emerald-600',
  'from-rose-500 to-rose-600',
  'from-amber-500 to-amber-600',
  'from-indigo-500 to-indigo-600',
];

export function CompanyApplicants() {
  const { jobId } = useParams();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [applicants, setApplicants] = useState(mockApplicants);
  const [selected, setSelected] = useState(null);

  const jobTitle = jobTitles[jobId] || 'Job Position';

  const filtered = applicants.filter(a => {
    if (filterStatus !== 'All' && a.status !== filterStatus) return false;
    if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const updateStatus = (id, newStatus) => {
    setApplicants(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status: newStatus }));
  };

  const counts = {
    All: applicants.length,
    New: applicants.filter(a => a.status === 'New').length,
    'Under Review': applicants.filter(a => a.status === 'Under Review').length,
    Shortlisted: applicants.filter(a => a.status === 'Shortlisted').length,
    Rejected: applicants.filter(a => a.status === 'Rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Link to="/company/jobs"
            className="p-2 rounded-xl border border-border text-muted-foreground hover:bg-muted/50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Applicants for</p>
            <h1 className="text-xl font-bold text-foreground">{jobTitle}</h1>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:bg-muted/50 transition-colors">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Total', value: counts.All, color: 'text-primary', bg: 'bg-primary/8' },
          { label: 'Shortlisted', value: counts.Shortlisted, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Under Review', value: counts['Under Review'], color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Rejected', value: counts.Rejected, color: 'text-red-500', bg: 'bg-red-50' },
        ].map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            className="bg-white rounded-2xl border border-border/60 p-4 shadow-sm text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center bg-white border border-border rounded-xl px-4 py-3 focus-within:border-secondary/50 transition-all">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search applicants..."
            className="bg-transparent outline-none text-sm flex-1 text-foreground" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {(['All', 'New', 'Under Review', 'Shortlisted', 'Rejected']).map(s => (
            <button key={s} onClick={() => setFilterStatus(s)}
              className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                filterStatus === s ? 'text-white border-secondary shadow-sm' : 'border-border text-muted-foreground bg-white hover:border-secondary/30'
              }`}
              style={filterStatus === s ? { background: 'linear-gradient(135deg, #0891B2, #0E7490)' } : {}}>
              {s} {counts[s] !== undefined ? `(${counts[s]})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout: list + detail panel */}
      <div className={`flex gap-5 ${selected ? 'flex-col lg:flex-row' : ''}`}>
        {/* Applicants List */}
        <div className={`bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden ${selected ? 'lg:w-1/2' : 'w-full'}`}>
          <div className="divide-y divide-border/50">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <User className="w-12 h-12 mx-auto mb-3 text-muted-foreground/30" />
                <p className="font-semibold text-foreground">No applicants found</p>
              </div>
            ) : filtered.map((applicant, i) => {
              const StatusIcon = statusConfig[applicant.status]?.icon || Clock;
              return (
                <motion.div key={applicant.id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
                  onClick={() => setSelected(applicant)}
                  className={`p-4 hover:bg-muted/10 transition-colors cursor-pointer ${selected?.id === applicant.id ? 'bg-secondary/5 border-l-2 border-secondary' : ''}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                      {applicant.avatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-semibold text-foreground text-sm truncate">{applicant.name}</p>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${statusConfig[applicant.status]?.color}`}>
                          {applicant.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{applicant.location}</span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{applicant.applied}</span>
                      </div>
                      <div className="flex items-center gap-0.5 mt-1.5">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className={`w-3 h-3 ${idx < applicant.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/20'}`} />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">{applicant.experience}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Detail Panel */}
        {selected && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/2 bg-white rounded-2xl border border-border/60 shadow-sm p-6 h-fit">
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${avatarColors[filtered.findIndex(a => a.id === selected.id) % avatarColors.length]} flex items-center justify-center text-white font-bold text-lg`}>
                  {selected.avatar}
                </div>
                <div>
                  <h2 className="font-bold text-foreground text-lg">{selected.name}</h2>
                  <p className="text-sm text-muted-foreground">{selected.experience} experience</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground p-1">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><Mail className="w-4 h-4" />{selected.email}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><Phone className="w-4 h-4" />{selected.phone}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" />{selected.location}</p>
              <p className="flex items-center gap-2 text-sm text-muted-foreground"><Calendar className="w-4 h-4" />Applied on {selected.applied}</p>
            </div>

            <div className="flex items-center gap-1 mb-5">
              {[...Array(5)].map((_, idx) => (
                <Star key={idx} className={`w-4 h-4 ${idx < selected.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/20'}`} />
              ))}
              <span className="text-sm text-muted-foreground ml-1">({selected.rating}/5)</span>
            </div>

            {/* Resume */}
            <div className={`rounded-xl border p-3 mb-5 flex items-center justify-between ${selected.resume ? 'border-border' : 'border-dashed border-border/50'}`}>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{selected.resume ? 'Resume_' + selected.name.replace(' ', '_') + '.pdf' : 'No resume uploaded'}</span>
              </div>
              {selected.resume && (
                <button className="text-xs font-semibold text-secondary hover:underline">Download</button>
              )}
            </div>

            {/* Status Update */}
            <div className="mb-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Update Status</p>
              <div className="grid grid-cols-2 gap-2">
                {(['New', 'Under Review', 'Shortlisted', 'Rejected']).map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`py-2 rounded-xl text-xs font-semibold border transition-all ${
                      selected.status === s
                        ? 'text-white border-secondary'
                        : 'border-border text-muted-foreground bg-white hover:border-secondary/40'
                    }`}
                    style={selected.status === s ? { background: 'linear-gradient(135deg, #0891B2, #0E7490)' } : {}}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a href={`mailto:${selected.email}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md"
                style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}>
                <Mail className="w-4 h-4" /> Email
              </a>
              <a href={`tel:${selected.phone}`}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border text-sm font-semibold text-foreground hover:bg-muted/50 transition-colors">
                <Phone className="w-4 h-4" /> Call
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}