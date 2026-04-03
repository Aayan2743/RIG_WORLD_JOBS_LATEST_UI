import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const banners = [
  {
    id: 1,
    tag: 'Now Hiring',
    headline: 'Offshore Drilling',
    highlight: 'Opportunities',
    sub: 'Over 1,200+ offshore rig positions open globally. Connect with Shell, Chevron, BP and more.',
    cta: { label: 'Browse Offshore Jobs', to: '/jobs' },
    ctaSecondary: { label: 'Learn More', to: '/about' },
    bg: 'from-[#0D1B2E] via-[#0E4D6E] to-[#0891B2]',
    accent: 'text-cyan-300',
    badge: 'bg-cyan-400/20 text-cyan-200 border-cyan-400/30',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    stat1: { value: '1,200+', label: 'Offshore Roles' },
    stat2: { value: '40+', label: 'Countries' },
  },
  {
    id: 2,
    tag: 'Top Employers',
    headline: 'Energy Giants Are',
    highlight: 'Hiring Now',
    sub: 'Shell, BP, ExxonMobil and 500+ verified companies are actively recruiting on RigWorldJobs.',
    cta: { label: 'View Companies', to: '/companies' },
    ctaSecondary: { label: 'Post a Job', to: '/employer/register' },
    bg: 'from-[#1a0533] via-[#4c1d95] to-[#7c3aed]',
    accent: 'text-violet-300',
    badge: 'bg-violet-400/20 text-violet-200 border-violet-400/30',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    stat1: { value: '500+', label: 'Verified Companies' },
    stat2: { value: '12k+', label: 'Hires Made' },
  },
  {
    id: 3,
    tag: 'For Candidates',
    headline: 'Build Your Energy',
    highlight: 'Career Today',
    sub: 'Create a free profile, get matched with top roles, and apply with one click to any position.',
    cta: { label: 'Create Free Profile', to: '/candidate/register' },
    ctaSecondary: { label: 'Browse Jobs', to: '/jobs' },
    bg: 'from-[#052e16] via-[#065f46] to-[#059669]',
    accent: 'text-emerald-300',
    badge: 'bg-emerald-400/20 text-emerald-200 border-emerald-400/30',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    stat1: { value: '50k+', label: 'Job Seekers' },
    stat2: { value: '4.9★', label: 'App Rating' },
  },
  {
    id: 4,
    tag: 'For Employers',
    headline: 'Find Skilled Rig',
    highlight: 'Professionals Fast',
    sub: 'Post jobs, screen candidates, and hire the best oil & gas talent from a pool of 50,000+ professionals.',
    cta: { label: 'Start Hiring', to: '/employer/register' },
    ctaSecondary: { label: 'See Pricing', to: '/contact-us' },
    bg: 'from-[#1c1917] via-[#92400e] to-[#d97706]',
    accent: 'text-amber-300',
    badge: 'bg-amber-400/20 text-amber-200 border-amber-400/30',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800',
    stat1: { value: '47', label: 'Avg. Applicants' },
    stat2: { value: '3 days', label: 'Avg. Time to Hire' },
  },
];

export function HeroBannerCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(c => (c + 1) % banners.length), []);
  const prev = () => setCurrent(c => (c - 1 + banners.length) % banners.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [paused, next]);

  const banner = banners[current];

  return (
    <section
      className="relative overflow-hidden -mt-px"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={banner.id}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className={`bg-gradient-to-r ${banner.bg} relative`}
        >
          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-10">
            <img src={banner.image} alt="" className="w-full h-full object-cover" />
          </div>
          {/* Dot pattern */}
          <div className="absolute inset-0 opacity-5"
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '28px 28px' }} />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
            <div className="flex flex-col lg:flex-row items-center gap-10">

              {/* Left — Text */}
              <div className="flex-1 text-center lg:text-left">
                <span className={`inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full border mb-4 ${banner.badge}`}>
                  {banner.tag}
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                  {banner.headline}<br />
                  <span className={banner.accent}>{banner.highlight}</span>
                </h2>
                <p className="text-white/70 text-base mb-7 max-w-lg">{banner.sub}</p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Link to={banner.cta.to}
                    className="inline-flex items-center space-x-2 px-6 py-3 bg-white text-gray-900 font-bold text-sm rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all">
                    <span>{banner.cta.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link to={banner.ctaSecondary.to}
                    className="inline-flex items-center px-6 py-3 border border-white/30 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-all">
                    {banner.ctaSecondary.label}
                  </Link>
                </div>
              </div>

              {/* Right — Stats */}
              <div className="flex gap-4 lg:flex-col lg:gap-5">
                {[banner.stat1, banner.stat2].map(s => (
                  <div key={s.label} className="bg-white/10 border border-white/20 backdrop-blur-sm rounded-2xl px-8 py-5 text-center min-w-[130px]">
                    <div className="text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-white/60 text-xs mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next arrows */}
      <button onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm z-10">
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/15 hover:bg-white/30 border border-white/20 flex items-center justify-center text-white transition-all backdrop-blur-sm z-10">
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        {banners.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${i === current ? 'w-6 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'}`}
          />
        ))}
      </div>
    </section>
  );
}
