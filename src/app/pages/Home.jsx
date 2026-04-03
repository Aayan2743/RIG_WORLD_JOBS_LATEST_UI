import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, Users, TrendingUp, CheckCircle, Building2, DollarSign, Clock, ChevronRight, Star, Zap, Shield, Globe } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback.jsx';

/* ─── Data ─────────────────────────────────────────────────────── */
const jobCategories = [
  { name: 'Drilling & Rig Operations', count: 1420, icon: '🛢️', color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
  { name: 'Offshore Engineering', count: 980, icon: '🌊', color: 'from-cyan-500 to-cyan-600', bg: 'bg-cyan-50' },
  { name: 'HSE & Safety', count: 654, icon: '�️', color: 'from-emerald-500 to-emerald-600', bg: 'bg-emerald-50' },
  { name: 'Marine Crew', count: 430, icon: '⚓', color: 'from-indigo-500 to-indigo-600', bg: 'bg-indigo-50' },
  { name: 'Logistics & Supply Chain', count: 512, icon: '�', color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50' },
  { name: 'Process & Refining', count: 760, icon: '🏭', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50' },
  { name: 'Subsea & Pipeline', count: 345, icon: '�', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
  { name: 'Management & Leadership', count: 290, icon: '👔', color: 'from-rose-500 to-rose-600', bg: 'bg-rose-50' },
];

const featuredJobs = [
  { id: 1, title: 'Senior Drilling Engineer', company: 'Shell Energy', location: 'Houston, TX', type: 'Full-time', salary: '$120k–$180k', logo: '🛢️', posted: '2 days ago', tags: ['Deepwater', 'Offshore'] },
  { id: 2, title: 'Safety Manager', company: 'BP Operations', location: 'Aberdeen, UK', type: 'Full-time', salary: '$90k–$130k', logo: '⚡', posted: '1 week ago', tags: ['HSE', 'Leadership'] },
  { id: 3, title: 'Offshore Rig Supervisor', company: 'Chevron', location: 'Gulf of Mexico', type: 'Contract', salary: '$150k–$200k', logo: '🌊', posted: '3 days ago', tags: ['Offshore', 'Contract'] },
  { id: 4, title: 'Process Engineer', company: 'ExxonMobil', location: 'Singapore', type: 'Full-time', salary: '$95k–$140k', logo: '🏭', posted: '5 days ago', tags: ['Process', 'Asia'] },
];

const topCompanies = [
  { name: 'Shell', jobs: 45, icon: '🛢️' },
  { name: 'BP', jobs: 38, icon: '⚡' },
  { name: 'Chevron', jobs: 52, icon: '🌊' },
  { name: 'ExxonMobil', jobs: 41, icon: '🏭' },
  { name: 'TotalEnergies', jobs: 29, icon: '☀️' },
  { name: 'Equinor', jobs: 33, icon: '🔵' },
];

const testimonials = [
  { name: 'John Martinez', role: 'Senior Engineer', company: 'Shell', content: 'Found my dream job within 2 weeks! The platform connects you with top offshore employers effortlessly.', avatar: 'https://images.unsplash.com/photo-1678803262971-329b90abaa51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200', rating: 5 },
  { name: 'Sarah Williams', role: 'HSE Manager', company: 'BP', content: 'Professional platform with quality listings. Best job portal in the oil & gas industry by far.', avatar: 'https://images.unsplash.com/photo-1758876202618-7197443c717f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200', rating: 5 },
  { name: 'Michael Chen', role: 'Operations Manager', company: 'Chevron', content: 'Best job portal for rig and offshore positions. Closed my search in 10 days after years of trying elsewhere.', avatar: 'https://images.unsplash.com/photo-1630487656049-6db93a53a7e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200', rating: 5 },
];

const stats = [
  { label: 'Active Jobs', value: 5000, suffix: '+' },
  { label: 'Top Companies', value: 500, suffix: '+' },
  { label: 'Job Seekers', value: 50, suffix: 'k+' },
  { label: 'Hires Made', value: 12, suffix: 'k+' },
];

const howItWorks = [
  { step: '01', title: 'Create Your Profile', description: 'Build a professional profile showcasing your skills, certifications, and offshore experience.', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
  { step: '02', title: 'Search & Apply', description: 'Browse thousands of rig and energy jobs, apply with one click using your saved profile.', icon: Search, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  { step: '03', title: 'Get Hired', description: 'Connect with top upstream & downstream employers and land your next great role.', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-50' },
];

/* ─── Animated Counter ──────────────────────────────────────────── */
function AnimatedCounter({ value, suffix }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1400;
    const step = value / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= value) { setDisplay(value); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [started, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Job Type Badge ─────────────────────────────────────────────── */
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

/* ─── Home Component ─────────────────────────────────────────────── */
export function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen">

      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center"
        style={{ background: 'var(--gradient-hero)' }}>

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/6 w-72 h-72 rounded-full opacity-10 blur-3xl"
          style={{ background: 'var(--gradient-primary)' }} />
        <div className="absolute bottom-1/4 left-1/6 w-96 h-96 rounded-full opacity-8 blur-3xl bg-cyan-400" />

        {/* Background image overlay */}
        <div className="absolute inset-0 opacity-8">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1765005629275-110a02f16d65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
            alt="Oil rig"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="text-center max-w-5xl mx-auto">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-8"
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span>#1 Job Platform for Oil & Gas Professionals</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight tracking-tight"
            >
              Find Onshore & Offshore<br />
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: 'linear-gradient(90deg, #60A5FA, #22D3EE)' }}>
                Oil & Gas Jobs Worldwide
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-blue-100/90 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
            </motion.p>
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xl mx-auto"
            >
                <div className="bg-white rounded-2xl shadow-2xl p-2 sm:p-2.5">
                <div className="flex items-center gap-2">
                  <div className="flex-1 flex items-center px-4 py-3 border border-gray-200 rounded-xl">
                    <Search className="w-2 h-5 text-gray-400 mr-3 flex-shrink-0" />
                    <input
                      type="text"
                      placeholder="Job title,Keywords,Location,Job Category,Job Type(Full time/contract/offshore)"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') window.location.href = `/jobs?q=${searchQuery}`; }}
                      className="bg-transparent w-full outline-none text-foreground placeholder-gray-400 text-sm"
                    />
                  </div>
                  <Link
                    to={`/jobs?q=${searchQuery}`}
                    className="flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:shadow-lg hover:scale-[1.02] shine-effect whitespace-nowrap"
                    style={{ background: 'var(--gradient-primary)' }}
                  >
                    <Search className="w-4 h-4" />
                    <span>Find Jobs</span>
                  </Link>
                </div>
                {/* Popular tags */}
                {/* <div className="flex flex-wrap gap-2 px-4 pt-2 pb-1.5">
                  <span className="text-xs text-gray-400 self-center">Popular:</span>
                  {['Drilling Engineer', 'HSE Manager', 'Rig Supervisor', 'Process Engineer'].map(tag => (
                    <Link
                      key={tag}
                      to={`/jobs?q=${tag}`}
                      className="text-xs text-gray-500 hover:text-primary hover:bg-blue-50 px-2.5 py-1 rounded-full border border-gray-200 hover:border-primary/30 transition-all"
                    >
                      {tag}
                    </Link>
                  ))}
                </div> */}
              </div>

              {/* CTA Buttons below search */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-5">
                <Link
                  to={`/jobs?q=${encodeURIComponent(searchQuery.trim())}`}
                  className="flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl text-white font-bold text-sm transition-all hover:shadow-xl hover:scale-[1.02] shine-effect"
                  style={{ background: 'var(--gradient-primary)' }}
                >
                  <Search className="w-4 h-4" />
                  <span>Search Jobs</span>
                </Link>

                <Link
                  to="/candidate/profile"
                  className="flex items-center justify-center space-x-2 px-7 py-3.5 rounded-xl font-bold text-sm border-2 border-white/40 text-white hover:bg-white/10 hover:border-white/70 transition-all"
                >
                  <Users className="w-4 h-4" />
                  <span>Upload CV</span>
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto"
            >
              {stats.map(stat => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-blue-200/70 text-xs sm:text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 28C840 36 960 42 1080 38C1200 34 1320 20 1380 13L1440 6V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z" fill="white" />
          </svg>
        </div>
      </section>
      {/* ─── Find Jobs Section ─── */}
      <section className="py-16 bg-white border-b border-border/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Explore Opportunities</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-5 leading-tight">
                Find Onshore & Offshore<br />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(90deg, #1D4ED8, #0891B2)' }}>
                  Oil & Gas Jobs Worldwide
                </span>
              </h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                RigWorldJobs connects skilled energy professionals with leading upstream and downstream operators across the globe. Whether you're an experienced drilling engineer, an HSE specialist, or a rig supervisor seeking your next offshore rotation — we have thousands of verified roles waiting for you. From the Gulf of Mexico to the North Sea, the Middle East to Southeast Asia, your next career move starts here.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/jobs" className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl text-white font-semibold text-sm shine-effect hover:shadow-lg hover:scale-[1.02] transition-all" style={{ background: 'var(--gradient-primary)' }}>
                  <Briefcase className="w-4 h-4" />
                  <span>Browse All Jobs</span>
                </Link>
                <Link to="/candidate/register" className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-sm border border-border hover:bg-muted/50 transition-all text-foreground">
                  <Users className="w-4 h-4" />
                  <span>Create Free Profile</span>
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🛢️', title: 'Upstream & Exploration', count: '1,800+ jobs', color: 'bg-blue-50 border-blue-100' },
                { icon: '🏭', title: 'Refining & Downstream', count: '950+ jobs', color: 'bg-emerald-50 border-emerald-100' },
                { icon: '🌊', title: 'Offshore & Marine', count: '1,200+ jobs', color: 'bg-cyan-50 border-cyan-100' },
                { icon: '⚙️', title: 'Engineering & Technical', count: '2,100+ jobs', color: 'bg-purple-50 border-purple-100' },
              ].map(card => (
                <Link key={card.title} to="/jobs"
                  className={`block border rounded-2xl p-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300 ${card.color}`}>
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <h4 className="font-bold text-foreground text-sm mb-1">{card.title}</h4>
                  <p className="text-primary text-xs font-semibold">{card.count}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Featured Jobs ─── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Today's Picks</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Featured Opportunities</h2>
              <p className="text-muted-foreground mt-2">Top opportunities from leading energy companies</p>
            </div>
            <Link to="/jobs" className="flex items-center space-x-1.5 text-primary hover:text-primary/80 font-semibold text-sm transition-colors group flex-shrink-0">
              <span>View all jobs</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {featuredJobs.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  to={`/jobs/${job.id}`}
                  className="block bg-white border border-border/60 rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group"
                >
                  {/* Card header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm">
                        {job.logo}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-0.5">{job.title}</h3>
                        <p className="text-muted-foreground text-sm font-medium flex items-center space-x-1">
                          <Building2 className="w-3.5 h-3.5" />
                          <span>{job.company}</span>
                        </p>
                      </div>
                    </div>
                    <JobTypeBadge type={job.type} />
                  </div>

                  {/* Tags row */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center space-x-1 text-xs text-muted-foreground bg-muted/50 px-2.5 py-1 rounded-lg">
                      <MapPin className="w-3 h-3" /> <span>{job.location}</span>
                    </span>
                    <span className="inline-flex items-center space-x-1 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg font-medium">
                      <DollarSign className="w-3 h-3" /> <span>{job.salary}</span>
                    </span>
                    {job.tags.map(tag => (
                      <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg font-medium">{tag}</span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-xs text-muted-foreground flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" /> <span>Posted {job.posted}</span>
                    </span>
                    <span className="text-sm font-semibold text-primary group-hover:underline">
                      Apply Now →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Browse by Category ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Explore Roles</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Explore Jobs by Oil & Gas Industry Categories</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">Find jobs matching your specific expertise area</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {jobCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                <Link
                  to={`/jobs?category=${category.name}`}
                  className="block bg-white border border-border/60 rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl ${category.bg} flex items-center justify-center text-3xl shadow-sm`}>
                      {category.icon}
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{category.name}</h3>
                  <p className="text-muted-foreground text-sm">{category.count.toLocaleString()} open positions</p>
                  <div className="mt-3 h-1 w-full bg-muted/40 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                      style={{ width: `${Math.min((category.count / 1500) * 100, 100)}%` }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #ECFEFF 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">What You Can Do</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Everything You Need to Land Your Next Role</h2>
            <p className="text-muted-foreground text-lg">Powerful tools built for oil & gas professionals</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, step: '01', title: 'Search Jobs', desc: 'Browse thousands of verified onshore and offshore roles filtered by category, location, and experience level.', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: Users, step: '02', title: 'Upload CV', desc: 'Build your professional profile and upload your CV to get discovered by top energy companies worldwide.', color: 'text-emerald-500', bg: 'bg-emerald-50' },
              { icon: Briefcase, step: '03', title: 'Apply to Companies', desc: 'Apply directly to Shell, BP, Chevron, ExxonMobil and hundreds of other leading operators with one click.', color: 'text-purple-500', bg: 'bg-purple-50' },
              { icon: Zap, step: '04', title: 'Get Alerts', desc: 'Set up job alerts and be the first to know when new roles matching your skills and preferences are posted.', color: 'text-amber-500', bg: 'bg-amber-50' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.12, duration: 0.5 }}
                className="bg-white rounded-2xl border border-border/60 p-6 text-center hover:shadow-lg hover:border-primary/20 transition-all group"
              >
                <div className="relative inline-block mb-5">
                  <div className={`w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Top Companies ─── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Industry Leaders</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">Top Companies Hiring</h2>
            <p className="text-muted-foreground text-lg">Join the teams shaping the future of energy</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {topCompanies.map((company, index) => (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.4 }}
                whileHover={{ scale: 1.06, y: -3 }}
              >
                <Link
                  to={`/companies/${company.name}`}
                  className="block bg-background border border-border/60 rounded-2xl p-5 text-center hover:shadow-lg hover:border-primary/20 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-3xl mx-auto mb-3 group-hover:scale-110 transition-transform">
                    {company.icon}
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-0.5">{company.name}</h3>
                  <p className="text-xs text-primary font-semibold">{company.jobs} jobs</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-3">Why RigWorldJobs</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">The Platform Built for Energy Professionals</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                We understand the unique demands of the oil & gas industry. Every feature is designed to help professionals find the right opportunity faster.
              </p>
              <div className="space-y-5">
                {[
                  { icon: Shield, color: 'text-blue-500', bg: 'bg-blue-50', title: 'Verified Employers', desc: 'All companies are vetted to ensure legitimate, high-quality job postings.' },
                  { icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50', title: 'Fast-Track Applications', desc: 'Apply to multiple positions with your saved profile in seconds.' },
                  { icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-50', title: 'Global Reach', desc: 'Access jobs from Houston to Aberdeen, Dubai to Singapore and beyond.' },
                ].map(item => (
                  <div key={item.title} className="flex items-start space-x-4">
                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🎯', val: '94%', label: 'Placement Rate' },
                { icon: '⚡', val: '10 days', label: 'Avg. Time to Hire' },
                { icon: '🌍', val: '70+ countries', label: 'Global Coverage' },
                { icon: '⭐', val: '4.9/5', label: 'Candidate Rating' },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-border/60 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all"
                >
                  <div className="text-3xl mb-3">{card.icon}</div>
                  <div className="text-2xl font-bold text-foreground mb-1">{card.val}</div>
                  <div className="text-xs text-muted-foreground">{card.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* ─── CTA Section ─── */}
      <section className="py-20 relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-5">
              Ready to Take the Next Step?
            </h2>
            <p className="text-blue-100/80 text-lg mb-10 max-w-2xl mx-auto">
              Join thousands of professionals who found their dream careers through RigWorldJobs. Your next chapter starts with one click.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/candidate/register"
                className="flex items-center justify-center space-x-2 bg-white text-primary px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all transform hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <Users className="w-5 h-5" />
                <span>Get Started as Job Seeker</span>
              </Link>
              <Link
                to="/employer/post-job"
                className="flex items-center justify-center space-x-2 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 shine-effect"
              >
                <Briefcase className="w-5 h-5" />
                <span>Post a Job</span>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-blue-200/60 text-sm">
              {['Free to join', 'No hidden fees', '5k+ active jobs', '500+ verified companies'].map(item => (
                <div key={item} className="flex items-center space-x-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
