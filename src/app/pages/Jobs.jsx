import { useState } from 'react';
import { Link } from 'react-router';
import { Search, MapPin, DollarSign, Clock, SlidersHorizontal, ChevronDown, X, Building2, Star, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ApplyNowPaymentModal } from '../components/ApplyNowPaymentModal.jsx';

const allJobs = [
  { id: 1, title: 'Senior Drilling Engineer', company: 'Shell Energy', location: 'Houston, TX', type: 'Full-time', salary: '$120k – $180k', logo: '', posted: '2 days ago', category: 'Engineering', experience: '5–8 years', featured: true },
  { id: 2, title: 'Safety Manager', company: 'BP Operations', location: 'Aberdeen, UK', type: 'Full-time', salary: '$90k – $130k', logo: '', posted: '1 week ago', category: 'Safety & HSE', experience: '3–5 years', featured: false },
  { id: 3, title: 'Offshore Rig Supervisor', company: 'Chevron', location: 'Gulf of Mexico', type: 'Contract', salary: '$150k – $200k', logo: '', posted: '3 days ago', category: 'Operations', experience: '8+ years', featured: true },
  { id: 4, title: 'Process Engineer', company: 'ExxonMobil', location: 'Singapore', type: 'Full-time', salary: '$95k – $140k', logo: '', posted: '5 days ago', category: 'Engineering', experience: '3–5 years', featured: false },
  { id: 5, title: 'HSE Coordinator', company: 'TotalEnergies', location: 'Paris, France', type: 'Full-time', salary: '$70k – $95k', logo: '', posted: '1 week ago', category: 'Safety & HSE', experience: '2–4 years', featured: false },
  { id: 6, title: 'Maintenance Engineer', company: 'Equinor', location: 'Oslo, Norway', type: 'Full-time', salary: '$85k – $115k', logo: '', posted: '4 days ago', category: 'Engineering', experience: '4–6 years', featured: false },
  { id: 7, title: 'Project Manager', company: 'ConocoPhillips', location: 'London, UK', type: 'Full-time', salary: '$110k – $160k', logo: '', posted: '2 days ago', category: 'Management', experience: '6–10 years', featured: false },
  { id: 8, title: 'Field Operations Technician', company: 'Halliburton', location: 'Dubai, UAE', type: 'Contract', salary: '$60k – $85k', logo: '', posted: '1 day ago', category: 'Operations', experience: '1–3 years', featured: false },
];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary'];
const experienceLevels = ['Entry Level (0–2 yrs)', 'Mid Level (2–5 yrs)', 'Senior (5–10 yrs)', 'Expert (10+ yrs)'];
const salaryRanges = ['$0 – $50k', '$50k – $100k', '$100k – $150k', '$150k+'];
const categories = ['Engineering', 'Safety & HSE', 'Operations', 'Management', 'Technical Support'];

function JobTypeBadge({ type }) {
  const colors = {
    'Full-time': 'bg-emerald-50 text-emerald-700 border-emerald-100',
    'Contract': 'bg-amber-50 text-amber-700 border-amber-100',
    'Part-time': 'bg-blue-50 text-blue-700 border-blue-100',
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${colors[type] || 'bg-gray-50 text-gray-700 border-gray-100'}`}>
      {type}
    </span>
  );
}

function FilterChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center space-x-1 bg-primary/10 text-primary text-xs font-medium px-3 py-1.5 rounded-full">
      <span>{label}</span>
      <button onClick={onRemove} className="hover:text-primary/60 transition-colors">
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

export function Jobs() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJobTypes, setSelectedJobTypes] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState([]);
  const [searchQ, setSearchQ] = useState('');
  const [locationQ, setLocationQ] = useState('');
  const [sortBy, setSortBy] = useState('Most Recent');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const toggleFilter = (arr, setArr, val) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const activeFilters = [
    ...selectedJobTypes.map(t => ({ label: t, remove: () => toggleFilter(selectedJobTypes, setSelectedJobTypes, t) })),
    ...selectedCategories.map(c => ({ label: c, remove: () => toggleFilter(selectedCategories, setSelectedCategories, c) })),
    ...selectedExperience.map(e => ({ label: e, remove: () => toggleFilter(selectedExperience, setSelectedExperience, e) })),
  ];

  const clearAll = () => { setSelectedJobTypes([]); setSelectedCategories([]); setSelectedExperience([]); };

  const filteredJobs = allJobs.filter(job => {
    if (selectedJobTypes.length && !selectedJobTypes.includes(job.type)) return false;
    if (selectedCategories.length && !selectedCategories.includes(job.category)) return false;
    if (searchQ && !job.title.toLowerCase().includes(searchQ.toLowerCase()) && !job.company.toLowerCase().includes(searchQ.toLowerCase())) return false;
    if (locationQ && !job.location.toLowerCase().includes(locationQ.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">

      {/* ── Search Header ── */}
      <div className="bg-white border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-foreground mb-6">
            Find Your <span className="gradient-text">Perfect Job</span>
          </h1>

          {/* Search bar */}
          <div className="flex flex-col lg:flex-row gap-3">
            <div className="flex-1 flex items-center bg-background border border-border rounded-xl px-4 py-3.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <Search className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                className="bg-transparent w-full outline-none text-foreground text-sm placeholder-muted-foreground"
              />
              {searchQ && (
                <button onClick={() => setSearchQ('')} className="ml-2 text-muted-foreground hover:text-foreground">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="flex-1 flex items-center bg-background border border-border rounded-xl px-4 py-3.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <MapPin className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
              <input
                type="text"
                placeholder="City, country, or 'Remote'"
                value={locationQ}
                onChange={e => setLocationQ(e.target.value)}
                className="bg-transparent w-full outline-none text-foreground text-sm placeholder-muted-foreground"
              />
            </div>
            <button
              className="flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg hover:scale-[1.02] shine-effect"
              style={{ background: 'var(--gradient-primary)' }}
            >
              <Search className="w-4 h-4" />
              <span>Search</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`lg:hidden flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl border font-semibold text-sm transition-all ${
                showFilters ? 'bg-primary text-white border-primary' : 'bg-background border-border text-foreground hover:bg-muted/50'
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters {activeFilters.length > 0 && `(${activeFilters.length})`}</span>
            </button>
          </div>

          {/* Active Filter Chips */}
          {activeFilters.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="flex flex-wrap items-center gap-2 mt-4"
            >
              {activeFilters.map(f => (
                <FilterChip key={f.label} label={f.label} onRemove={f.remove} />
              ))}
              <button onClick={clearAll} className="text-xs text-muted-foreground hover:text-foreground underline transition-colors">
                Clear all
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-7">

          {/* ── Sidebar Filters ── */}
          <AnimatePresence>
            {(showFilters || true) && (
              <motion.aside
                initial={false}
                animate={{ opacity: 1 }}
                className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72 flex-shrink-0`}
              >
                <div className="bg-white rounded-2xl border border-border/60 p-6 sticky top-24 shadow-sm">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-foreground flex items-center space-x-2">
                      <SlidersHorizontal className="w-4 h-4 text-primary" />
                      <span>Filters</span>
                    </h3>
                    {activeFilters.length > 0 && (
                      <button onClick={clearAll} className="text-xs text-primary hover:underline">Clear all</button>
                    )}
                  </div>

                  {/* Job Type */}
                  <FilterSection title="Job Type">
                    {jobTypes.map(type => (
                      <CheckboxItem
                        key={type}
                        label={type}
                        checked={selectedJobTypes.includes(type)}
                        onChange={() => toggleFilter(selectedJobTypes, setSelectedJobTypes, type)}
                      />
                    ))}
                  </FilterSection>

                  {/* Experience */}
                  <FilterSection title="Experience Level">
                    {experienceLevels.map(level => (
                      <CheckboxItem
                        key={level}
                        label={level}
                        checked={selectedExperience.includes(level)}
                        onChange={() => toggleFilter(selectedExperience, setSelectedExperience, level)}
                      />
                    ))}
                  </FilterSection>

                  {/* Salary */}
                  <FilterSection title="Salary Range">
                    {salaryRanges.map(range => (
                      <CheckboxItem
                        key={range}
                        label={range}
                        checked={false}
                        onChange={() => {}}
                      />
                    ))}
                  </FilterSection>

                  {/* Category */}
                  <FilterSection title="Category" noBorder>
                    {categories.map(cat => (
                      <CheckboxItem
                        key={cat}
                        label={cat}
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                      />
                    ))}
                  </FilterSection>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* ── Job Listings ── */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5">
              <p className="text-muted-foreground text-sm">
                Showing <span className="font-bold text-foreground">{filteredJobs.length}</span> jobs
              </p>
              <div className="relative">
                <button
                  onClick={() => setShowSortMenu(!showSortMenu)}
                  className="flex items-center space-x-2 bg-white border border-border rounded-lg px-4 py-2 text-sm font-medium hover:bg-muted/40 transition-colors"
                >
                  <span>Sort: {sortBy}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {showSortMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="absolute right-0 top-full mt-1 bg-white border border-border rounded-xl shadow-lg overflow-hidden z-20 w-44"
                    >
                      {['Most Recent', 'Highest Salary', 'Most Applicants', 'Relevance'].map(opt => (
                        <button
                          key={opt}
                          onClick={() => { setSortBy(opt); setShowSortMenu(false); }}
                          className={`block w-full text-left px-4 py-2.5 text-sm transition-colors ${sortBy === opt ? 'text-primary bg-primary/5 font-medium' : 'text-foreground hover:bg-muted/50'}`}
                        >
                          {opt}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground bg-white rounded-2xl border border-border/60">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-semibold">No jobs match your filters</p>
                  <p className="text-sm mt-1">Try adjusting your search or clearing filters</p>
                </div>
              ) : (
                filteredJobs.map((job, index) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04, duration: 0.35 }}
                    whileHover={{ y: -3 }}
                  >
                    <Link
                      to={`/jobs/${job.id}`}
                      className="block bg-white border border-border/60 rounded-2xl p-5 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-start space-x-4 flex-1 min-w-0">
                          {/* Logo */}
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-2xl flex-shrink-0 shadow-sm">
                            {job.logo}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              {job.featured && (
                                <span className="inline-flex items-center space-x-1 text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                                  <Star className="w-2.5 h-2.5 fill-amber-500" />
                                  <span>FEATURED</span>
                                </span>
                              )}
                              <JobTypeBadge type={job.type} />
                            </div>
                            <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1 truncate">
                              {job.title}
                            </h3>
                            <p className="text-muted-foreground text-sm font-medium flex items-center space-x-1 mb-3">
                              <Building2 className="w-3.5 h-3.5 flex-shrink-0" />
                              <span>{job.company}</span>
                            </p>

                            <div className="flex flex-wrap gap-2">
                              <span className="inline-flex items-center space-x-1 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">
                                <MapPin className="w-3 h-3" /> <span>{job.location}</span>
                              </span>
                              <span className="inline-flex items-center space-x-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-semibold">
                                <DollarSign className="w-3 h-3" /> <span>{job.salary}</span>
                              </span>
                              <span className="inline-flex items-center space-x-1 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">
                                <TrendingUp className="w-3 h-3" /> <span>{job.experience}</span>
                              </span>
                              <span className="inline-flex items-center space-x-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" /> <span>Posted {job.posted}</span>
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Action */}
                        <div className="flex-shrink-0">
                          <ApplyNowPaymentModal
                            feeAmount={5}
                            feeLabel="Application Fee"
                            paymentPath="/payment"
                            triggerLabel="Apply Now"
                            triggerClassName="px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:shadow-md hover:scale-[1.03] shine-effect"
                            triggerStyle={{ background: 'var(--gradient-primary)' }}
                          />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-1">
              {['‹', '1', '2', '3', '...', '12', '›'].map((p, i) => (
                <button
                  key={i}
                  className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                    p === '1'
                      ? 'text-white shadow-md'
                      : 'border border-border bg-white text-foreground hover:bg-muted/50 hover:border-primary/30'
                  }`}
                  style={p === '1' ? { background: 'var(--gradient-primary)' } : {}}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */
function FilterSection({ title, children, noBorder = false }) {
  const [open, setOpen] = useState(true);
  return (
    <div className={`${noBorder ? '' : 'border-b border-border/60'} pb-5 mb-5`}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full mb-3 group"
      >
        <h4 className="font-semibold text-foreground text-sm">{title}</h4>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden space-y-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckboxItem({ label, checked, onChange }) {
  return (
    <label className="flex items-center space-x-2.5 cursor-pointer group">
      <div
        onClick={onChange}
        className={`w-4.5 h-4.5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
          checked ? 'bg-primary border-primary' : 'border-border/80 group-hover:border-primary/40'
        }`}
      >
        {checked && <span className="text-white text-xs">✓</span>}
      </div>
      <span className={`text-sm transition-colors ${checked ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
        {label}
      </span>
    </label>
  );
}
