import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, DollarSign, CheckCircle, ArrowRight, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useJobs } from '../context/JobsContext.jsx';

const steps = ['Job Details', 'Requirements', 'Preview & Post'];

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'];
const experienceLevels = ['Entry Level (0–2 yrs)', 'Mid Level (2–5 yrs)', 'Senior (5+ yrs)', 'Executive (10+ yrs)'];
const categories = ['Engineering', 'Safety & HSE', 'Operations', 'Management', 'Technical Support', 'Logistics'];

// ─── Reusable chip input ──────────────────────────────────────────────────────
function ChipInput({ label, chips, onAdd, onRemove, inputValue, onInputChange, placeholder, chipColor = 'secondary' }) {
  const colorMap = {
    secondary: {
      chip: 'bg-secondary/10 text-secondary border-secondary/20',
      btn:  'linear-gradient(135deg, #0891B2, #0E7490)',
    },
    emerald: {
      chip: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      btn:  'linear-gradient(135deg, #059669, #047857)',
    },
  };
  const c = colorMap[chipColor] ?? colorMap.secondary;

  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>

      {/* Chips */}
      {chips.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {chips.map(chip => (
            <span
              key={chip}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${c.chip}`}
            >
              <span>{chip}</span>
              <button
                type="button"
                onClick={() => onRemove(chip)}
                className="hover:opacity-60 transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input row */}
      <div className="flex gap-2">
        <input
          value={inputValue}
          onChange={e => onInputChange(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') { e.preventDefault(); onAdd(); }
          }}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none
            focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
        />
        <button
          type="button"
          onClick={onAdd}
          className="px-4 py-3 rounded-xl text-white font-semibold text-sm flex-shrink-0"
          style={{ background: c.btn }}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function PostJob() {
  const { addJob } = useJobs();
  const [currentStep, setCurrentStep] = useState(0);

  // Skills state
  const [skills, setSkills]           = useState(['Drilling Engineering', 'Well Planning']);
  const [skillInput, setSkillInput]   = useState('');

  // Benefits state
  const [benefits, setBenefits]         = useState([]);
  const [benefitInput, setBenefitInput] = useState('');

  const [posted, setPosted] = useState(false);

  const [form, setForm] = useState({
    title: '', company: 'Shell Energy', location: '', type: 'Full-time',
    category: '', salaryMin: '', salaryMax: '', description: '',
    experience: '', requirements: '',
  });

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  // Skill helpers
  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) setSkills(prev => [...prev, s]);
    setSkillInput('');
  };
  const removeSkill = (s) => setSkills(prev => prev.filter(x => x !== s));

  // Benefit helpers
  const addBenefit = () => {
    const b = benefitInput.trim();
    if (b && !benefits.includes(b)) setBenefits(prev => [...prev, b]);
    setBenefitInput('');
  };
  const removeBenefit = (b) => setBenefits(prev => prev.filter(x => x !== b));

  // ── Success screen ────────────────────────────────────────────────────────
  if (posted) {
    return (
      <div className="bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-3xl border border-border shadow-xl p-12 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-3">Job Posted Successfully!</h2>
          <p className="text-muted-foreground mb-8">
            Your job listing is now live and visible to thousands of qualified candidates.
          </p>
          <div className="space-y-3">
            <Link
              to="/company/jobs"
              className="block w-full py-3.5 rounded-xl font-bold text-sm text-white shine-effect"
              style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
            >
              View Job Listings
            </Link>
            <button
              onClick={() => { setPosted(false); setCurrentStep(0); }}
              className="block w-full py-3 rounded-xl border border-border text-muted-foreground text-sm font-medium hover:bg-muted/50 transition-colors"
            >
              Post Another Job
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ── Progress Steps ── */}
      <div className="flex items-center">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center flex-1 last:flex-none">
            <button
              onClick={() => i < currentStep && setCurrentStep(i)}
              className="flex items-center space-x-2.5 flex-shrink-0"
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${
                i < currentStep ? 'bg-secondary border-secondary text-white' :
                i === currentStep ? 'border-secondary text-secondary bg-secondary/10' :
                'border-border text-muted-foreground bg-white'
              }`}>
                {i < currentStep ? <CheckCircle className="w-5 h-5" /> : i + 1}
              </div>
              <span className={`hidden sm:block text-sm font-semibold ${
                i === currentStep ? 'text-foreground' :
                i < currentStep  ? 'text-secondary'  : 'text-muted-foreground'
              }`}>
                {step}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-3 rounded transition-all ${
                i < currentStep ? 'bg-secondary' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* ── Step 1: Job Details ── */}
        {currentStep === 0 && (
          <motion.div key="step0"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-5">Basic Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2">Job Title *</label>
                  <input name="title" value={form.title} onChange={handleChange}
                    placeholder="e.g. Senior Drilling Engineer"
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none
                      focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input name="location" value={form.location} onChange={handleChange}
                      placeholder="Houston, TX or Remote"
                      className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none
                        focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Job Type *</label>
                  <select name="type" value={form.type} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none
                      focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all appearance-none">
                    {jobTypes.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Category *</label>
                  <select name="category" value={form.category} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none
                      focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all appearance-none">
                    <option value="">Select category...</option>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Experience Level</label>
                  <select name="experience" value={form.experience} onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none
                      focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all appearance-none">
                    <option value="">Select level...</option>
                    {experienceLevels.map(e => <option key={e}>{e}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Salary Range</label>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input name="salaryMin" value={form.salaryMin} onChange={handleChange} placeholder="Min"
                        className="w-full pl-9 pr-3 py-3 border border-border rounded-xl focus:outline-none
                          focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
                    </div>
                    <span className="text-muted-foreground">–</span>
                    <div className="relative flex-1">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input name="salaryMax" value={form.salaryMax} onChange={handleChange} placeholder="Max"
                        className="w-full pl-9 pr-3 py-3 border border-border rounded-xl focus:outline-none
                          focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all" />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-foreground mb-2">Job Description *</label>
                  <textarea name="description" value={form.description} onChange={handleChange} rows={5}
                    placeholder="Describe the role, team, and what makes this opportunity exciting..."
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none
                      focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all resize-none" />
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Requirements ── */}
        {currentStep === 1 && (
          <motion.div key="step1"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-foreground mb-5">Requirements & Skills</h2>
              <div className="space-y-6">

                {/* Requirements textarea */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Requirements</label>
                  <textarea name="requirements" value={form.requirements} onChange={handleChange} rows={5}
                    placeholder={`List key requirements, one per line:\n• Bachelor's degree in Petroleum Engineering\n• 5+ years of drilling experience\n• Proficiency in WellPlan software`}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none
                      focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all resize-none" />
                </div>

                {/* Required Skills — teal chips */}
                <ChipInput
                  label="Required Skills"
                  chips={skills}
                  onAdd={addSkill}
                  onRemove={removeSkill}
                  inputValue={skillInput}
                  onInputChange={setSkillInput}
                  placeholder="Type a skill and press Enter..."
                  chipColor="secondary"
                />

                {/* Benefits & Perks — emerald chips, identical UX */}
                <ChipInput
                  label="Benefits & Perks"
                  chips={benefits}
                  onAdd={addBenefit}
                  onRemove={removeBenefit}
                  inputValue={benefitInput}
                  onInputChange={setBenefitInput}
                  placeholder="Type a benefit and press Enter..."
                  chipColor="emerald"
                />

              </div>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Preview ── */}
        {currentStep === 2 && (
          <motion.div key="step2"
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl border border-border/60 overflow-hidden shadow-sm">
              <div className="h-1.5 w-full" style={{ background: 'var(--gradient-primary)' }} />
              <div className="p-6">

                <div className="flex items-start space-x-4 mb-5">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-3xl">
                    🛢️
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{form.title || 'Your Job Title'}</h2>
                    <p className="text-muted-foreground">{form.company}</p>
                  </div>
                </div>

                {/* Meta badges */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {form.location && (
                    <span className="inline-flex items-center gap-1 text-sm text-primary bg-primary/8 px-3 py-1.5 rounded-full">
                      <MapPin className="w-3.5 h-3.5" /> {form.location}
                    </span>
                  )}
                  {form.type && (
                    <span className="text-sm text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full font-medium">
                      {form.type}
                    </span>
                  )}
                  {(form.salaryMin || form.salaryMax) && (
                    <span className="inline-flex items-center gap-1 text-sm text-amber-700 bg-amber-50 px-3 py-1.5 rounded-full">
                      <DollarSign className="w-3.5 h-3.5" /> ${form.salaryMin}–${form.salaryMax}
                    </span>
                  )}
                  {form.experience && (
                    <span className="text-sm text-purple-700 bg-purple-50 px-3 py-1.5 rounded-full">
                      {form.experience}
                    </span>
                  )}
                </div>

                {/* Description */}
                {form.description && (
                  <p className="text-muted-foreground text-sm leading-relaxed mb-5">{form.description}</p>
                )}

                {/* Skills preview */}
                {skills.length > 0 && (
                  <div className="mb-5">
                    <h3 className="font-bold text-foreground mb-3">Required Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {skills.map(skill => (
                        <span key={skill} className="bg-primary/8 text-primary px-3.5 py-1.5 rounded-xl text-sm font-semibold border border-primary/15">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Benefits preview */}
                {benefits.length > 0 && (
                  <div className="mb-5">
                    <h3 className="font-bold text-foreground mb-3">Benefits & Perks</h3>
                    <div className="flex flex-wrap gap-2">
                      {benefits.map(b => (
                        <span key={b} className="bg-emerald-50 text-emerald-700 px-3.5 py-1.5 rounded-xl text-sm font-semibold border border-emerald-200">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-700">
                  <strong>Preview Mode:</strong> Review your listing before publishing. It will go live immediately upon posting.
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Navigation Buttons ── */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
          disabled={currentStep === 0}
          className="px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm
            hover:bg-muted/50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ← Back
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(prev => prev + 1)}
            className="flex items-center gap-2 px-7 py-3 rounded-xl text-white font-bold text-sm
              transition-all hover:shadow-lg hover:scale-[1.02] shine-effect"
            style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
          >
            <span>Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={() => {
              addJob({
                title:        form.title || 'Untitled Role',
                company:      form.company,
                location:     form.location || 'Remote',
                type:         form.type,
                category:     form.category,
                salaryMin:    form.salaryMin,
                salaryMax:    form.salaryMax,
                description:  form.description,
                experience:   form.experience,
                requirements: form.requirements,
                benefits,   // ✅ chip array
                skills,     // ✅ chip array
              });
              setPosted(true);
            }}
            className="flex items-center gap-2 px-8 py-3 rounded-xl text-white font-bold text-sm
              transition-all hover:shadow-lg hover:scale-[1.02] shine-effect"
            style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
          >
            <Briefcase className="w-4 h-4" />
            <span>Publish Job</span>
          </button>
        )}
      </div>
    </div>
  );
}