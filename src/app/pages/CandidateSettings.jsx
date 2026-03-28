import { Mail, Phone, Lock, Bell, Globe, User, Shield, Save, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

const settingsSections = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: Shield },
  { id: 'security', label: 'Security', icon: Lock },
];

export function CandidateSettings() {
  const [activeSection, setActiveSection] = useState('account');
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'John Doe', email: 'john.doe@email.com', phone: '+1 (555) 012-3456',
    title: 'Senior Drilling Engineer', location: 'Houston, TX',
    jobAlerts: true, applicationUpdates: true, weeklyDigest: false, marketingEmails: false,
    profileVisible: true, showSalary: true, openToWork: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">

      {/* Sidebar navigation */}
      <aside className="lg:col-span-1">
        <div className="bg-white rounded-2xl border border-border/60 p-4 shadow-sm">
          {settingsSections.map(section => (
            <button key={section.id} onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium text-left transition-all ${
                activeSection === section.id ? 'bg-primary/8 text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
              }`}>
              <section.icon className="w-4 h-4 flex-shrink-0" />
              <span>{section.label}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Main */}
      <div className="lg:col-span-3">
        <motion.div key={activeSection} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.25 }}>

              {/* ── Account Section ── */}
              {activeSection === 'account' && (
                <div className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm space-y-5">
                  <h2 className="text-xl font-bold text-foreground border-b border-border/60 pb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input name="name" value={form.name} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Job Title</label>
                      <input name="title" value={form.title} onChange={handleChange}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input name="email" type="email" value={form.email} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Phone Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input name="phone" value={form.phone} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all" />
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-foreground mb-2">Location</label>
                      <div className="relative">
                        <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input name="location" value={form.location} onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* Open to Work */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-emerald-800">Open to Work</p>
                      <p className="text-sm text-emerald-700 mt-0.5">Show recruiters you're actively looking for roles</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" name="openToWork" checked={form.openToWork} onChange={handleChange} className="sr-only peer" />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-emerald-500 peer-focus:ring-2 peer-focus:ring-emerald-300 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 after:shadow-sm" />
                    </label>
                  </div>
                </div>
              )}

              {/* ── Notifications Section ── */}
              {activeSection === 'notifications' && (
                <div className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-foreground border-b border-border/60 pb-4 mb-5">Notification Preferences</h2>
                  <div className="space-y-5">
                    {[
                      { name: 'jobAlerts', label: 'Job Alerts', desc: 'New jobs matching your profile and preferences' },
                      { name: 'applicationUpdates', label: 'Application Updates', desc: 'Status changes for your submitted applications' },
                      { name: 'weeklyDigest', label: 'Weekly Digest', desc: 'A weekly roundup of top opportunities' },
                      { name: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional content, tips, and platform updates' },
                    ].map(({ name, label, desc }) => (
                      <div key={name} className="flex items-center justify-between p-4 bg-background border border-border/60 rounded-xl">
                        <div>
                          <p className="font-semibold text-foreground text-sm">{label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input type="checkbox" name={name} checked={form[name] } onChange={handleChange} className="sr-only peer" />
                          <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/30 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 after:shadow-sm" />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Privacy Section ── */}
              {activeSection === 'privacy' && (
                <div className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-foreground border-b border-border/60 pb-4 mb-5">Privacy Settings</h2>
                  <div className="space-y-4">
                    {[
                      { name: 'profileVisible', label: 'Profile Visibility', desc: 'Allow employers to discover your profile in search' },
                      { name: 'showSalary', label: 'Show Salary Expectations', desc: 'Display your desired salary range to employers' },
                    ].map(({ name, label, desc }) => (
                      <div key={name} className="flex items-center justify-between p-4 bg-background border border-border/60 rounded-xl">
                        <div>
                          <p className="font-semibold text-foreground text-sm">{label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                          <input type="checkbox" name={name} checked={form[name] } onChange={handleChange} className="sr-only peer" />
                          <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-focus:ring-2 peer-focus:ring-primary/30 transition-all after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5 after:shadow-sm" />
                        </label>
                      </div>
                    ))}
                    <div className="mt-6 p-4 border border-red-200 bg-red-50 rounded-xl">
                      <p className="font-semibold text-red-700 text-sm mb-1">Danger Zone</p>
                      <p className="text-xs text-red-600 mb-3">Permanently delete your account and all data</p>
                      <button className="text-sm font-semibold text-red-600 border border-red-300 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Security Section ── */}
              {activeSection === 'security' && (
                <div className="bg-white rounded-2xl border border-border/60 p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-foreground border-b border-border/60 pb-4 mb-5">Security Settings</h2>
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Current Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="password" placeholder="Enter current password"
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="password" placeholder="Create new password"
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">Confirm New Password</label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input type="password" placeholder="Confirm new password"
                          className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white text-sm transition-all" />
                      </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-blue-800 text-sm">Two-Factor Authentication</p>
                        <p className="text-xs text-blue-700 mt-0.5">Add an extra layer of security to your account</p>
                      </div>
                      <button className="text-sm font-semibold text-primary border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Btn */}
              <div className="mt-5 flex justify-end">
                <button onClick={handleSave}
                  className={`flex items-center space-x-2 px-7 py-3 rounded-xl text-white font-bold text-sm transition-all hover:shadow-md ${saved ? 'bg-emerald-500' : 'shine-effect hover:scale-[1.02]'}`}
                  style={!saved ? { background: 'var(--gradient-primary)' } : {}}>
                  {saved ? <><Check className="w-4 h-4" /><span>Saved!</span></> : <><Save className="w-4 h-4" /><span>Save Changes</span></>}
                </button>
              </div>
        </motion.div>
      </div>
    </div>
  );
}
