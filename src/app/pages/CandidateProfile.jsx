import { useState, useRef } from 'react';
import { User, Briefcase, Edit3, Plus, X, Star, Award, Upload, FileText, Trash2, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

const profileData = {
  name: 'John Doe',
  initials: 'JD',
  title: 'Senior Drilling Engineer',
  location: 'Houston, TX',
  email: 'john.doe@email.com',
  phone: '+1 (555) 012-3456',
  website: 'johndoe.dev',
  about: 'Experienced drilling engineer with 8+ years in deepwater and HPHT operations. Specialized in well planning, risk assessment, and drilling optimization for major energy companies across the Gulf of Mexico and North Sea.',
  skills: ['Drilling Engineering', 'Well Planning', 'Deepwater Operations', 'Risk Assessment', 'HPHT Drilling', 'Leadership', 'Data Analysis'],
  experience: [
    { id: 1, company: 'Shell Energy', title: 'Senior Drilling Engineer', period: '2020 – Present', location: 'Houston, TX', description: 'Lead drilling operations for deepwater projects in the Gulf of Mexico. Managed teams of 15+ engineers and achieved 20% reduction in NPT.' },
    { id: 2, company: 'BP Operations', title: 'Drilling Engineer', period: '2017 – 2020', location: 'Aberdeen, UK', description: 'Designed and executed drilling programs for North Sea assets. Expert in HPHT well operations and complex completion designs.' },
  ],
  education: [
    { id: 1, school: 'University of Houston', degree: 'B.Sc. Petroleum Engineering', period: '2013 – 2017', gpa: '3.8 GPA' },
  ],
  certifications: ['IWCF Well Control – Subsea Level 3', 'OPITO BOSIET Offshore Safety', 'API Well Control Certified'],
};

function EditableSection({ title, icon: Icon, children, onEdit }) {
  return (
    <div className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="w-4.5 h-4.5 text-primary" />
          </div>
          <h2 className="text-lg font-bold text-foreground">{title}</h2>
        </div>
        <button onClick={onEdit} className="flex items-center space-x-1.5 text-sm text-primary hover:underline font-semibold">
          <Edit3 className="w-4 h-4" /><span>Edit</span>
        </button>
      </div>
      {children}
    </div>
  );
}

export function CandidateProfile() {
  const [skills, setSkills] = useState(profileData.skills);
  const [skillInput, setSkillInput] = useState('');
  const [about, setAbout] = useState(profileData.about);
  const [editingAbout, setEditingAbout] = useState(false);
  const [savedAbout, setSavedAbout] = useState(false);
  const [resumes, setResumes] = useState([]);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const valid = Array.from(files).filter(f => f.type === 'application/pdf');
    if (!valid.length) return;
    const newEntries = valid.map(f => ({
      id: Date.now() + Math.random(),
      name: f.name,
      size: (f.size / 1024).toFixed(0) + ' KB',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
    }));
    setResumes(prev => [...prev, ...newEntries]);
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  const removeResume = (id) => setResumes(prev => prev.filter(r => r.id !== id));

  const addSkill = () => {
    const s = skillInput.trim();
    if (s && !skills.includes(s)) { setSkills([...skills, s]); setSkillInput(''); }
  };

  return (
    <div className="space-y-5">

            {/* About */}
            <EditableSection title="About Me" icon={User} onEdit={() => setEditingAbout(!editingAbout)}>
              {editingAbout ? (
                <div>
                  <textarea value={about} onChange={e => setAbout(e.target.value)} rows={5}
                    className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-sm transition-all resize-none mb-3" />
                  <div className="flex space-x-2">
                    <button onClick={() => { setEditingAbout(false); setSavedAbout(true); setTimeout(() => setSavedAbout(false), 2000); }}
                      className="px-5 py-2.5 rounded-xl text-white font-semibold text-sm shine-effect" style={{ background: 'var(--gradient-primary)' }}>
                      {savedAbout ? '✓ Saved!' : 'Save'}
                    </button>
                    <button onClick={() => setEditingAbout(false)} className="px-5 py-2.5 rounded-xl border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-colors">Cancel</button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm leading-relaxed">{about}</p>
              )}
            </EditableSection>

            {/* Skills */}
            <EditableSection title="Skills & Expertise" icon={Award}>
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map(skill => (
                  <span key={skill} className="inline-flex items-center space-x-1.5 bg-primary/8 text-primary px-4 py-2 rounded-xl text-sm font-semibold border border-primary/15 group">
                    <span>{skill}</span>
                    <button onClick={() => setSkills(skills.filter(s => s !== skill))} className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex space-x-2">
                <input value={skillInput} onChange={e => setSkillInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  placeholder="Add a skill..."
                  className="flex-1 px-4 py-2.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background text-sm transition-all" />
                <button onClick={addSkill} className="px-4 py-2.5 rounded-xl text-white font-semibold text-sm" style={{ background: 'var(--gradient-primary)' }}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </EditableSection>

            {/* Experience */}
            <EditableSection title="Work Experience" icon={Briefcase}>
              <div className="space-y-5">
                {profileData.experience.map((exp, i) => (
                  <div key={exp.id} className={`relative pl-5 ${i < profileData.experience.length - 1 ? 'pb-5 border-b border-border/60' : ''}`}>
                    <div className="absolute left-0 top-1.5 w-2 h-2 rounded-full bg-primary" />
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <div>
                        <h3 className="font-bold text-foreground">{exp.title}</h3>
                        <p className="text-primary font-semibold text-sm">{exp.company}</p>
                      </div>
                      <div className="text-right text-xs text-muted-foreground">
                        <div className="font-medium">{exp.period}</div>
                        <div>{exp.location}</div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                ))}
                <button className="flex items-center space-x-2 text-primary hover:underline font-semibold text-sm">
                  <Plus className="w-4 h-4" /><span>Add Experience</span>
                </button>
              </div>
            </EditableSection>

            {/* Education */}
            <EditableSection title="Education" icon={Award}>
              <div className="space-y-4">
                {profileData.education.map(edu => (
                  <div key={edu.id} className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl flex-shrink-0">🎓</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground">{edu.degree}</h3>
                      <p className="text-muted-foreground text-sm">{edu.school}</p>
                      <div className="flex items-center space-x-3 mt-1 text-xs text-muted-foreground">
                        <span>{edu.period}</span>
                        <span className="text-emerald-600 font-semibold">{edu.gpa}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <button className="flex items-center space-x-2 text-primary hover:underline font-semibold text-sm">
                  <Plus className="w-4 h-4" /><span>Add Education</span>
                </button>
              </div>
            </EditableSection>

            {/* Certifications */}
            <EditableSection title="Certifications" icon={Award}>
              <div className="space-y-2.5">
                {profileData.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-background border border-border/60 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    </div>
                    <span className="text-sm text-foreground font-medium">{cert}</span>
                  </div>
                ))}
                <button className="flex items-center space-x-2 text-primary hover:underline font-semibold text-sm mt-2">
                  <Plus className="w-4 h-4" /><span>Add Certification</span>
                </button>
              </div>
            </EditableSection>

            {/* Resume & Documents */}
            <div className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-lg font-bold text-foreground">Resume & Documents</h2>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center space-x-1.5 text-sm text-primary hover:underline font-semibold"
                >
                  <Upload className="w-4 h-4" /><span>Upload</span>
                </button>
              </div>

              {/* Hidden file input — PDF only */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                multiple
                className="hidden"
                onChange={e => { handleFileSelect(e.target.files); e.target.value = ''; }}
              />

              {/* Success toast */}
              {uploadSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-2.5 text-sm font-semibold mb-4"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Resume uploaded successfully!</span>
                </motion.div>
              )}

              {/* Drop zone */}
              <div
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); handleFileSelect(e.dataTransfer.files); }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all mb-4 ${
                  dragOver
                    ? 'border-primary bg-primary/5'
                    : 'border-border/60 hover:border-primary/40 hover:bg-muted/30'
                }`}
              >
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-semibold text-foreground mb-1">Drag & drop your resume here</p>
                <p className="text-xs text-muted-foreground">PDF files only · Max 10MB per file</p>
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); fileInputRef.current?.click(); }}
                  className="mt-4 px-5 py-2 rounded-xl text-white text-sm font-semibold shine-effect"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  Browse Files
                </button>
              </div>

              {/* Uploaded files list */}
              {resumes.length > 0 ? (
                <div className="space-y-2.5">
                  {resumes.map(r => (
                    <motion.div
                      key={r.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-3.5 bg-background border border-border/60 rounded-xl group"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-red-500" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{r.name}</p>
                          <p className="text-xs text-muted-foreground">{r.size} · Uploaded {r.date}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeResume(r.id)}
                        className="ml-3 p-1.5 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground text-center">No resumes uploaded yet.</p>
              )}
            </div>
    </div>
  );
}
