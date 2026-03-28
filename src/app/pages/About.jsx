import { Link } from 'react-router';
import { Users, Briefcase, Globe, TrendingUp, Heart, Shield, Zap, ChevronRight, Mail, Phone, MapPin, Star } from 'lucide-react';
import { motion } from 'motion/react';

const team = [
  { name: 'David Miller', role: 'CEO & Co-Founder', bio: '25 years in oil & gas recruitment. Former VP at Schlumberger.', initials: 'DM', color: 'from-blue-500 to-blue-600', rating: 5 },
  { name: 'Sarah Chen', role: 'CTO', bio: 'Led engineering at LinkedIn before bringing her expertise to energy recruitment.', initials: 'SC', color: 'from-purple-500 to-purple-600', rating: 5 },
  { name: 'James Okonkwo', role: 'Head of Operations', bio: '12 years in upstream O&G, ex-Shell. Passionate about connecting talent with opportunity.', initials: 'JO', color: 'from-emerald-500 to-emerald-600', rating: 5 },
  { name: 'Lisa Rodriguez', role: 'VP of Partnerships', bio: 'Former HR Director at BP with deep industry connection across 30+ countries.', initials: 'LR', color: 'from-amber-500 to-amber-600', rating: 5 },
];

const values = [
  { icon: Shield, title: 'Integrity', desc: 'Every job posting is verified. Every company is vetted.', color: 'text-blue-500', bg: 'bg-blue-50' },
  { icon: Heart, title: 'People First', desc: 'We build tools that genuinely help professionals land their dream roles.', color: 'text-rose-500', bg: 'bg-rose-50' },
  { icon: Globe, title: 'Global Reach', desc: 'Connecting talent and opportunity across 70+ countries worldwide.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { icon: Zap, title: 'Innovation', desc: 'Continuously building smarter ways to match talent with opportunity.', color: 'text-amber-500', bg: 'bg-amber-50' },
];

const milestones = [
  { year: '2010', event: 'Founded in Houston, TX with a mission to modernize O&G hiring' },
  { year: '2013', event: 'Reached 10,000 registered job seekers and 100 partner companies' },
  { year: '2016', event: 'Expanded globally — opened offices in Aberdeen, Dubai, and Singapore' },
  { year: '2019', event: 'Surpassed 50,000 successful placements across upstream and downstream' },
  { year: '2022', event: 'Launched AI-powered candidate matching and employer analytics dashboard' },
  { year: '2025', event: 'Over 50k active job seekers and 500+ verified partner companies globally' },
];

export function About() {
  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '36px 36px' }} />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-10 bg-cyan-400" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
           
            <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
              Powering Careers in<br />
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #60A5FA, #22D3EE)' }}>
                Global Energy
              </span>
            </h1>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed">
              We connect talented professionals with leading oil & gas companies worldwide — where skills meet opportunity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Stats Band ── */}
      <div className="bg-white border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {[
              { icon: Briefcase, value: '5,000+', label: 'Active Jobs', color: 'text-primary' },
              { icon: Users, value: '50,000+', label: 'Job Seekers', color: 'text-emerald-600' },
              { icon: Globe, value: '70+ Countries', label: 'Global Reach', color: 'text-secondary' },
              { icon: TrendingUp, value: '12,000+', label: 'Successful Hires', color: 'text-amber-500' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className={`w-12 h-12 rounded-2xl bg-muted/40 flex items-center justify-center mx-auto mb-3`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Mission ── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Our Mission</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5">Built by Industry Insiders, for the Industry</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-5">
                RigWorldJobs was born from frustration — too many talented upstream professionals couldn't find roles that matched their specialized expertise, and too many great companies couldn't find qualified candidates fast enough.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                We built a platform that understands the unique language of oil & gas: rotational contracts, HPHT experience, certifications, offshore vs. onshore, and downstream operations. Every feature is designed for this industry, not adapted from generic job boards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/jobs" className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm shine-effect"
                  style={{ background: 'var(--gradient-primary)' }}>
                  <Briefcase className="w-4 h-4" /><span>Browse Jobs</span>
                </Link>
                <Link to="/companies" className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-semibold text-sm border-2 border-primary/20 text-primary hover:bg-primary/5 transition-all">
                  <Globe className="w-4 h-4" /><span>Explore Companies</span>
                </Link>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
              {[
                { icon: '🛢️', val: '94%', label: 'Placement Rate' },
                { icon: '⚡', val: '10 days', label: 'Avg. Time to Hire' },
                { icon: '🌍', val: '70+', label: 'Countries Covered' },
                { icon: '⭐', val: '4.9/5', label: 'Candidate Rating' },
              ].map((c, i) => (
                <motion.div key={c.label} initial={{ scale: 0.9 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-border/60 p-6 text-center shadow-sm hover:shadow-md transition-all">
                  <div className="text-3xl mb-3">{c.icon}</div>
                  <div className="text-2xl font-bold text-foreground">{c.val}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">What Drives Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, i) => (
              <motion.div key={val.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-background rounded-2xl border border-border/60 p-6 hover:shadow-lg hover:border-primary/20 transition-all group">
                <div className={`w-14 h-14 rounded-xl ${val.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <val.icon className={`w-7 h-7 ${val.color}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 100%)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Our Journey</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">15 Years of Growth</h2>
          </div>
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start space-x-5 bg-white rounded-2xl border border-border/60 p-5 shadow-sm hover:shadow-md transition-all">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0 shadow-md" style={{ background: 'var(--gradient-primary)' }}>
                  {m.year}
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-foreground font-medium leading-relaxed">{m.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">The People</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Meet Our Leadership</h2>
            <p className="text-muted-foreground text-lg">Industry veterans working to revolutionize O&G hiring</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-background border border-border/60 rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all group">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 group-hover:scale-105 transition-transform`}>
                  {member.initials}
                </div>
                <div className="flex justify-center space-x-0.5 mb-2">
                  {[...Array(member.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                </div>
                <h3 className="font-bold text-foreground mb-0.5">{member.name}</h3>
                <p className="text-primary font-semibold text-xs mb-3">{member.role}</p>
                <p className="text-muted-foreground text-xs leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-20 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Get in Touch</h2>
          <p className="text-muted-foreground text-lg mb-10">Have questions? We'd love to hear from you.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: Mail, label: 'Email Us', value: 'hello@rigworldjobs.com', color: 'text-primary', bg: 'bg-primary/8' },
              { icon: Phone, label: 'Call Us', value: '+1 (800) RIG-JOBS', color: 'text-secondary', bg: 'bg-secondary/8' },
              { icon: MapPin, label: 'Houston Office', value: '1000 Energy Blvd, Suite 500', color: 'text-emerald-600', bg: 'bg-emerald-50' },
            ].map(({ icon: Icon, label, value, color, bg }) => (
              <div key={label} className="bg-white border border-border/60 rounded-2xl p-6 hover:shadow-md transition-all">
                <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <p className="font-semibold text-foreground mb-1">{label}</p>
                <p className="text-muted-foreground text-sm">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link to="/candidate/register" className="inline-flex items-center space-x-2 px-8 py-4 rounded-xl text-white font-bold text-sm shine-effect hover:shadow-lg hover:scale-[1.02] transition-all"
              style={{ background: 'var(--gradient-primary)' }}>
              <span>Join RigWorldJobs Today</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
