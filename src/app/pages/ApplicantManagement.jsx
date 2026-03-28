import { useState } from 'react';
import { Filter, Search, Mail, Phone, Star, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const columns = [
  { id: 'new', label: 'New', color: 'bg-blue-50 border-blue-200 text-primary' },
  { id: 'reviewed', label: 'Reviewed', color: 'bg-purple-50 border-purple-200 text-purple-700' },
  { id: 'shortlisted', label: 'Shortlisted', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { id: 'rejected', label: 'Rejected', color: 'bg-red-50 border-red-200 text-red-600' },
];

const initialApplicants = {
  new: [
    { id: 1, name: 'John Martinez', initials: 'JM', role: 'Senior Drilling Engineer', experience: '8 years', location: 'Houston, TX', rating: 4.8, color: 'from-blue-500 to-blue-600', email: 'j.martinez@email.com', phone: '+1 555-0101' },
    { id: 2, name: 'Emma Thompson', initials: 'ET', role: 'Senior Drilling Engineer', experience: '7 years', location: 'Dallas, TX', rating: 4.6, color: 'from-amber-500 to-amber-600', email: 'emma.t@email.com', phone: '+1 555-0102' },
  ],
  reviewed: [
    { id: 3, name: 'Sarah Williams', initials: 'SW', role: 'Safety Manager', experience: '5 years', location: 'Aberdeen, UK', rating: 4.9, color: 'from-purple-500 to-purple-600', email: 's.williams@email.com', phone: '+44 555-0201' },
  ],
  shortlisted: [
    { id: 4, name: 'Michael Chen', initials: 'MC', role: 'Process Engineer', experience: '6 years', location: 'Singapore', rating: 4.7, color: 'from-emerald-500 to-emerald-600', email: 'm.chen@email.com', phone: '+65 555-0301' },
  ],
  rejected: [],
};

export function ApplicantManagement() {
  const [applicants, setApplicants] = useState(initialApplicants);
  const [searchQ, setSearchQ] = useState('');
  const [selectedJob, setSelectedJob] = useState('All Jobs');

  const moveApplicant = (id, fromCol, toCol) => {
    const applicant = applicants[fromCol].find(a => a.id === id);
    if (!applicant) return;
    setApplicants(prev => ({
      ...prev,
      [fromCol]: prev[fromCol].filter(a => a.id !== id),
      [toCol]: [...prev[toCol], applicant],
    }));
  };

  const totalApplicants = Object.values(applicants).flat().length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Applicant Management</h2>
          <p className="text-sm text-muted-foreground mt-0.5"><span className="font-bold text-foreground">{totalApplicants}</span> total applicants across all positions</p>
        </div>
        <select value={selectedJob} onChange={e => setSelectedJob(e.target.value)}
          className="px-4 py-2.5 border border-border rounded-xl bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all">
          {['All Jobs', 'Senior Drilling Engineer', 'Safety Manager', 'Process Engineer'].map(j => <option key={j}>{j}</option>)}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center bg-background border border-border rounded-xl px-4 py-2.5 focus-within:border-secondary/50 transition-all">
          <Search className="w-4 h-4 text-muted-foreground mr-2" />
          <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search applicants by name or role..."
            className="bg-transparent outline-none text-sm text-foreground placeholder-muted-foreground flex-1" />
        </div>
        <button className="flex items-center space-x-2 px-5 py-2.5 rounded-xl border border-border bg-white font-medium text-sm hover:bg-muted/50 transition-colors">
          <Filter className="w-4 h-4" /><span>Filters</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {columns.map(col => {
            const colApplicants = (applicants[col.id] || []).filter(a =>
              !searchQ || a.name.toLowerCase().includes(searchQ.toLowerCase()) || a.role.toLowerCase().includes(searchQ.toLowerCase())
            );
            const otherCols = columns.filter(c => c.id !== col.id);
            return (
              <div key={col.id} className="flex flex-col gap-3">
                {/* Column Header */}
                <div className={`flex items-center justify-between px-4 py-2.5 rounded-xl border ${col.color}`}>
                  <span className="font-bold text-sm">{col.label}</span>
                  <span className="w-6 h-6 rounded-full bg-white/60 flex items-center justify-center text-xs font-bold">{colApplicants.length}</span>
                </div>

                {/* Cards */}
                <div className="space-y-3 min-h-32">
                  {colApplicants.map((applicant, i) => (
                    <motion.div
                      key={applicant.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      className="bg-white rounded-xl border border-border/60 p-4 shadow-sm hover:shadow-md transition-all"
                    >
                      {/* Avatar + Name */}
                      <div className="flex items-start space-x-3 mb-3">
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${applicant.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                          {applicant.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-foreground text-sm truncate">{applicant.name}</h3>
                          <p className="text-xs text-muted-foreground truncate">{applicant.role}</p>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-1.5 mb-3">
                        <p className="text-xs text-muted-foreground flex items-center space-x-1.5">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400 flex-shrink-0" />
                          <span>{applicant.experience} experience · {applicant.rating}★</span>
                        </p>
                        <p className="text-xs text-muted-foreground flex items-center space-x-1.5">
                          <MapPin className="w-3 h-3 flex-shrink-0" />
                          <span>{applicant.location}</span>
                        </p>
                      </div>

                      {/* Contact */}
                      <div className="flex gap-1.5 mb-3">
                        <a href={`mailto:${applicant.email}`} className="flex-1 flex items-center justify-center space-x-1 bg-muted/40 hover:bg-muted/70 py-1.5 rounded-lg text-xs font-medium transition-colors">
                          <Mail className="w-3 h-3" /><span>Email</span>
                        </a>
                        <a href={`tel:${applicant.phone}`} className="flex-1 flex items-center justify-center space-x-1 bg-muted/40 hover:bg-muted/70 py-1.5 rounded-lg text-xs font-medium transition-colors">
                          <Phone className="w-3 h-3" /><span>Call</span>
                        </a>
                      </div>

                      {/* Move Buttons */}
                      <div className="space-y-1.5">
                        {otherCols.slice(0, 2).map(targetCol => (
                          <button key={targetCol.id} onClick={() => moveApplicant(applicant.id, col.id, targetCol.id)}
                            className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all border ${targetCol.color} hover:opacity-80`}>
                            Move to {targetCol.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  ))}

                  {colApplicants.length === 0 && (
                    <div className="flex items-center justify-center h-24 border-2 border-dashed border-border rounded-xl text-muted-foreground text-sm">
                      No applicants
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
    </div>
  );
}
