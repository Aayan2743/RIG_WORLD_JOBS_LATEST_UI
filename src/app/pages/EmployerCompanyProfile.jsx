import { Link } from 'react-router-dom';
import { Building2, Globe, MapPin, Mail, Phone, Users, ShieldCheck, ChevronRight, Calendar, Briefcase, Plus, X, Star, Heart, Target } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useJobs } from '../context/JobsContext.jsx';

// ─── Reusable chip input ──────────────────────────────────────────────────────
function ChipInput({ chips, onAdd, onRemove, inputValue, onInputChange, placeholder }) {
  return (
    <div>
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {chips.map(chip => (
            <span key={chip} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border bg-emerald-50 text-emerald-700 border-emerald-200">
              <span>{chip}</span>
              <button type="button" onClick={() => onRemove(chip)} className="hover:opacity-60 transition-opacity">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          value={inputValue}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); onAdd(); } }}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none
            focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
        />
        <button
          type="button"
          onClick={onAdd}
          className="px-4 py-3 rounded-xl text-white text-sm flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #059669, #047857)' }}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export function EmployerCompanyProfile() {
  const { user } = useAuth();
  const { myJobs } = useJobs();
  const PROFILE_KEY = user?.email ? `rwj_company_public_profile:${user.email}` : null;

  const [form, setForm] = useState({
    companyName: 'Shell Energy',
    tagline: 'Powering progress with responsible energy.',
    industry: 'Oil & Gas',
    website: 'https://www.shell.com',
    hq: 'Houston, TX',
    size: '10,000+',
    email: 'careers@shellenergy.com',
    phone: '+1 (800) RIG-JOBS',
    about: 'Shell Energy is a global energy leader focused on safe, reliable operations and building the workforce of tomorrow. We hire engineers, operations specialists, HSE leaders, and technical professionals for onshore and offshore roles worldwide.',
    compliance: 'ISO 45001, ISO 14001, IADC, OPITO',
    founded: '',
    cultureHeadline: '',
    cultureDescription: '',
  });

  const [benefits,      setBenefits]      = useState([]);
  const [benefitInput,  setBenefitInput]  = useState('');
  const [values,        setValues]        = useState([]);
  const [valueInput,    setValueInput]    = useState('');
  const [openRoles,     setOpenRoles]     = useState([]);
  const [roleInput,     setRoleInput]     = useState({ title: '', location: '', type: 'Full-time' });

  const [saved,  setSaved]  = useState(false);
  const [saving, setSaving] = useState(false);

  const onChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Load saved profile
  useEffect(() => {
    if (!PROFILE_KEY) return;
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') {
        setForm(prev => ({ ...prev, ...parsed }));
        if (Array.isArray(parsed.benefits))  setBenefits(parsed.benefits);
        if (Array.isArray(parsed.values))    setValues(parsed.values);
        if (Array.isArray(parsed.openRoles)) setOpenRoles(parsed.openRoles);
      }
    } catch { /* fall back to defaults */ }
  }, [PROFILE_KEY]);

  const handleUpdate = () => {
    if (!PROFILE_KEY) return;
    setSaving(true);
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify({ ...form, benefits, values, openRoles }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } finally {
      setSaving(false);
    }
  };

  // Benefit helpers
  const addBenefit    = () => { const b = benefitInput.trim(); if (b && !benefits.includes(b)) setBenefits(p => [...p, b]); setBenefitInput(''); };
  const removeBenefit = (b) => setBenefits(p => p.filter(x => x !== b));

  // Values helpers
  const addValue    = () => { const v = valueInput.trim(); if (v && !values.includes(v)) setValues(p => [...p, v]); setValueInput(''); };
  const removeValue = (v) => setValues(p => p.filter(x => x !== v));

  // Open Roles helpers
  const addOpenRole = () => {
    const title = roleInput.title.trim();
    if (!title) return;
    setOpenRoles(p => [...p, { id: Date.now(), ...roleInput, title }]);
    setRoleInput({ title: '', location: '', type: 'Full-time' });
  };
  const removeOpenRole = (id) => setOpenRoles(p => p.filter(r => r.id !== id));

  // Active jobs from context
  const openJobs = myJobs.filter(j => j.status === 'Active');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">

      {/* ── Left: Form ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="lg:col-span-2 space-y-6"
      >
        {/* Public Details card */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
          <h2 className="text-lg font-bold text-foreground mb-5">Public Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-2">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="companyName" value={form.companyName} onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-2">Tagline</label>
              <input name="tagline" value={form.tagline} onChange={onChange}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Industry</label>
              <input name="industry" value={form.industry} onChange={onChange}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Company Size</label>
              <div className="relative">
                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="size" value={form.size} onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Website</label>
              <div className="relative">
                <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="website" value={form.website} onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Headquarters</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="hq" value={form.hq} onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Founded Year</label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="founded" value={form.founded} onChange={onChange} placeholder="e.g. 1907" maxLength={4}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="email" value={form.email} onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input name="phone" value={form.phone} onChange={onChange}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-2">About</label>
              <textarea name="about" value={form.about} onChange={onChange} rows={6}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all resize-none" />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-semibold text-foreground mb-2">Compliance & Certifications</label>
              <div className="relative">
                <ShieldCheck className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                <textarea name="compliance" value={form.compliance} onChange={onChange} rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all resize-none" />
              </div>
            </div>
          </div>
        </div>

        {/* ── Culture & Values card ── */}
       {/* ── Culture & Values card ── */}
<div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
  <div className="flex items-center gap-2 mb-4">
    <Heart className="w-4 h-4 text-rose-500" />
    <h2 className="text-lg font-bold text-foreground">Culture & Values</h2>
  </div>
  <ChipInput
    chips={values}
    onAdd={addValue}
    onRemove={removeValue}
    inputValue={valueInput}
    onInputChange={setValueInput}
    placeholder='e.g. "Safety First", "Integrity", "Innovation"…'
  />
</div>
       

        {/* ── Benefits & Perks card ── */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-1">
            <Star className="w-4 h-4 text-amber-500" />
            <h2 className="text-lg font-bold text-foreground">Benefits & Perks</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Highlight what makes your company a great place to work. These appear on your public profile.
          </p>
          <ChipInput
            chips={benefits}
            onAdd={addBenefit}
            onRemove={removeBenefit}
            inputValue={benefitInput}
            onInputChange={setBenefitInput}
            placeholder='e.g. "Health Insurance", "25 days PTO", "Remote Work"…'
          />
        </div>

        {/* ── Open Roles card ── */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-cyan-600" />
            <h2 className="text-lg font-bold text-foreground">Open Roles</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            Manually add roles to highlight on your public profile (separate from posted jobs).
          </p>

          {/* Add role form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <input
              value={roleInput.title}
              onChange={e => setRoleInput(p => ({ ...p, title: e.target.value }))}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addOpenRole())}
              placeholder="Role title e.g. Drilling Engineer"
              className="sm:col-span-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
            />
            <input
              value={roleInput.location}
              onChange={e => setRoleInput(p => ({ ...p, location: e.target.value }))}
              placeholder="Location e.g. Houston, TX"
              className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
            />
            <div className="flex gap-2">
              <select
                value={roleInput.type}
                onChange={e => setRoleInput(p => ({ ...p, type: e.target.value }))}
                className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
              >
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Temporary</option>
              </select>
              <button
                type="button"
                onClick={addOpenRole}
                className="px-4 py-3 rounded-xl text-white text-sm flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Roles list */}
          {openRoles.length === 0 ? (
            <div className="text-center py-8 border border-dashed border-border rounded-xl text-muted-foreground text-sm">
              No open roles added yet.
            </div>
          ) : (
            <div className="space-y-2">
              {openRoles.map(role => (
                <div key={role.id}
                  className="flex items-center justify-between px-4 py-3 bg-muted/20 border border-border/50 rounded-xl group hover:border-secondary/30 hover:bg-muted/40 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{role.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        {role.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{role.location}</span>}
                        <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{role.type}</span>
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeOpenRole(role.id)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ── Open Positions from JobsContext ── */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-cyan-600" />
              <h2 className="text-lg font-bold text-foreground">Open Positions</h2>
              <span className="ml-1 px-2 py-0.5 rounded-full bg-cyan-50 text-cyan-700 text-xs font-bold border border-cyan-100">
                {openJobs.length}
              </span>
            </div>
            <Link
              to="/company/post-job"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-semibold transition-all hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
            >
              <Plus className="w-3.5 h-3.5" /> Post a Job
            </Link>
          </div>

          {openJobs.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No active positions yet.</p>
              <p className="text-xs mt-1">Jobs you post will appear here automatically.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {openJobs.map(job => (
                <div key={job.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-border/60
                    bg-background hover:border-cyan-200 hover:shadow-sm transition-all group"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-foreground group-hover:text-cyan-600 transition-colors truncate">
                      {job.title}
                    </p>
                    <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                      <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{job.type}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <span className="text-xs text-muted-foreground hidden sm:block">{job.applicants ?? 0} applicants</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Save button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleUpdate}
            disabled={!PROFILE_KEY || saving}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-white text-sm font-semibold
              shine-effect transition-all hover:shadow-md hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}
          >
            {saving ? 'Updating…' : 'Update Profile'}
          </button>
          {saved && (
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semibold">
              ✓ Profile saved
            </span>
          )}
        </div>
      </motion.div>

      {/* ── Right: Preview sidebar ── */}
      <motion.aside
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-5 h-fit lg:sticky lg:top-24"
      >
        {/* Preview card */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
          <h3 className="text-sm font-bold text-foreground mb-3">Profile Preview</h3>
          <div className="rounded-2xl border border-border/60 p-4 bg-muted/10">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                {form.companyName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-foreground truncate">{form.companyName}</p>
                <p className="text-xs text-muted-foreground truncate">{form.tagline}</p>
              </div>
            </div>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 flex-shrink-0" />{form.hq}</p>
              <p className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 flex-shrink-0" /><span className="truncate">{form.website}</span></p>
              <p className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5 flex-shrink-0" />{form.size} employees</p>
              {form.founded && (
                <p className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 flex-shrink-0" />Founded {form.founded}</p>
              )}
              <p className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 flex-shrink-0 text-cyan-500" />
                <span className="font-semibold text-cyan-600">{openJobs.length} open position{openJobs.length !== 1 ? 's' : ''}</span>
              </p>
            </div>

            {/* Culture headline preview */}
            {form.cultureHeadline && (
              <div className="mt-3 pt-3 border-t border-border/60">
                <p className="text-xs font-semibold text-foreground mb-1 flex items-center gap-1">
                  <Heart className="w-3 h-3 text-rose-500" /> Culture
                </p>
                <p className="text-xs text-muted-foreground italic">"{form.cultureHeadline}"</p>
              </div>
            )}

            {/* Values preview chips */}
            {values.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border/60">
                <p className="text-xs font-semibold text-foreground mb-2">Values</p>
                <div className="flex flex-wrap gap-1.5">
                  {values.slice(0, 3).map(v => (
                    <span key={v} className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 text-xs border border-rose-100">{v}</span>
                  ))}
                  {values.length > 3 && (
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">+{values.length - 3}</span>
                  )}
                </div>
              </div>
            )}

            {/* Benefits preview chips */}
            {benefits.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border/60">
                <p className="text-xs font-semibold text-foreground mb-2">Perks</p>
                <div className="flex flex-wrap gap-1.5">
                  {benefits.slice(0, 4).map(b => (
                    <span key={b} className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs border border-emerald-100">{b}</span>
                  ))}
                  {benefits.length > 4 && (
                    <span className="px-2 py-0.5 rounded-full bg-muted text-muted-foreground text-xs">+{benefits.length - 4}</span>
                  )}
                </div>
              </div>
            )}

            {/* Open Roles preview */}
            {openRoles.length > 0 && (
              <div className="mt-3 pt-3 border-t border-border/60">
                <p className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
                  <Target className="w-3 h-3 text-cyan-600" /> Open Roles
                </p>
                <div className="space-y-1">
                  {openRoles.slice(0, 3).map(r => (
                    <p key={r.id} className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      {r.title}
                    </p>
                  ))}
                  {openRoles.length > 3 && (
                    <p className="text-xs text-muted-foreground">+{openRoles.length - 3} more</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4">
            <Link
              to="/company/jobs"
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md"
              style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
            >
              <span>View Job Listings</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Quick stats card */}
        <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-5">
          <h3 className="text-sm font-bold text-foreground mb-3">Quick Stats</h3>
          <div className="space-y-3">
            {[
              { label: 'Total Jobs Posted', value: myJobs.length,                                color: 'text-cyan-600'    },
              { label: 'Active Positions',  value: openJobs.length,                              color: 'text-emerald-600' },
              { label: 'Total Applicants',  value: myJobs.reduce((s, j) => s + (j.applicants || 0), 0), color: 'text-purple-600'  },
              { label: 'Benefits Listed',   value: benefits.length,                              color: 'text-amber-600'   },
              { label: 'Core Values',       value: values.length,                                color: 'text-rose-600'    },
              { label: 'Open Roles',        value: openRoles.length,                             color: 'text-cyan-600'    },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{label}</span>
                <span className={`text-sm font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}