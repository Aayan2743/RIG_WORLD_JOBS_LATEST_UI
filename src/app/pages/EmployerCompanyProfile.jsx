import { Link } from 'react-router';
import { Building2, Globe, MapPin, Mail, Phone, Users, ShieldCheck, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export function EmployerCompanyProfile() {
  const [form, setForm] = useState({
    companyName: 'Shell Energy',
    tagline: 'Powering progress with responsible energy.',
    industry: 'Oil & Gas',
    website: 'https://www.shell.com',
    hq: 'Houston, TX',
    size: '10,000+',
    email: 'careers@shellenergy.com',
    phone: '+1 (800) RIG-JOBS',
    about:
      'Shell Energy is a global energy leader focused on safe, reliable operations and building the workforce of tomorrow. We hire engineers, operations specialists, HSE leaders, and technical professionals for onshore and offshore roles worldwide.',
    compliance: 'ISO 45001, ISO 14001, IADC, OPITO',
  });

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-border/60 shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-foreground mb-5">Public Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    name="companyName"
                    value={form.companyName}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Tagline</label>
                <input
                  name="tagline"
                  value={form.tagline}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Industry</label>
                <input
                  name="industry"
                  value={form.industry}
                  onChange={onChange}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Company Size</label>
                <div className="relative">
                  <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    name="size"
                    value={form.size}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Website</label>
                <div className="relative">
                  <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    name="website"
                    value={form.website}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Headquarters</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    name="hq"
                    value={form.hq}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={onChange}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">About</label>
                <textarea
                  name="about"
                  value={form.about}
                  onChange={onChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-foreground mb-2">Compliance & Certifications</label>
                <div className="relative">
                  <ShieldCheck className="absolute left-3.5 top-3.5 w-4 h-4 text-muted-foreground" />
                  <textarea
                    name="compliance"
                    value={form.compliance}
                    onChange={onChange}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white text-sm transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 h-fit"
          >
            <h3 className="text-sm font-bold text-foreground mb-3">Profile Preview</h3>
            <div className="rounded-2xl border border-border/60 p-4 bg-muted/10">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white font-bold">SE</div>
                <div className="min-w-0">
                  <p className="font-bold text-foreground truncate">{form.companyName}</p>
                  <p className="text-xs text-muted-foreground truncate">{form.tagline}</p>
                </div>
              </div>
              <div className="space-y-2 text-xs text-muted-foreground">
                <p className="flex items-center space-x-2"><MapPin className="w-3.5 h-3.5" /><span>{form.hq}</span></p>
                <p className="flex items-center space-x-2"><Globe className="w-3.5 h-3.5" /><span className="truncate">{form.website}</span></p>
                <p className="flex items-center space-x-2"><Users className="w-3.5 h-3.5" /><span>{form.size} employees</span></p>
              </div>
            </div>

            <div className="mt-5">
              <Link
                to="/employer/jobs"
                className="w-full inline-flex items-center justify-center space-x-2 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md"
                style={{ background: 'linear-gradient(135deg, #0891B2, #0E7490)' }}
              >
                <span>View Job Listings</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.aside>
    </div>
  );
}
