import { Link } from 'react-router';
import { MapPin, Send } from 'lucide-react';
import { useState } from 'react';

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Find Job', to: '/jobs' },
  { label: 'Employers', to: '/employer/login' },
];

const forCandidates = [
  { label: 'About Us', to: '/about' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Terms Of Use', to: '/terms-of-use' },
  { label: 'Contact us', to: '/contact-us' },
];

const followUs = [
  { label: 'Applicant Terms & Conditions', to: '/applicant-terms' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Refund Policy', to: '/refund-policy' },
  { label: 'RigWorldJobs Policies', to: '/terms-of-use' },
  { label: 'Shipping Policy', to: '/shipping-policy' },
];

const socials = [
  {
    label: 'Facebook', href: '#',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
  },
  {
    label: 'LinkedIn', href: '#',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>,
  },
  {
    label: 'Instagram', href: '#',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>,
  },
  {
    label: 'YouTube', href: '#',
    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>,
  },
];

export function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer className="bg-[#f5f5f0] border-t border-gray-200">
      {/* Top social bar */}
 
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Brand + address + subscribe */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-3">
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-extrabold tracking-tight" style={{ color: '#1a3a5c' }}>
                  <span style={{ color: '#e63946' }}>R</span>IGWORLDJOBS
                </span>
                <span className="text-[9px] tracking-widest text-gray-400 uppercase">Oil &amp; Gas Job Platform</span>
              </div>
            </Link>

            <p className="text-xs text-gray-500 leading-relaxed mb-3">
              Job Searching Just Got Easy. Use RigWorldJobs to be a hiring site and earn money in the process!
            </p>

            <div className="flex items-start gap-1.5 text-xs text-gray-500 mb-4">
              <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-gray-400" />
              <span>101 E 129th St, East Chicago, IN 46312, US</span>
            </div>

            {/* Email subscribe */}
            <div className="flex rounded-lg overflow-hidden border border-gray-300 bg-white">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-3 py-2 text-xs outline-none bg-transparent text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={() => setEmail('')}
                className="px-3 py-2 flex items-center justify-center text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}
                aria-label="Subscribe"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-gray-500 hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Candidates */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-4">For Candidates</h4>
            <ul className="space-y-2.5">
              {forCandidates.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-gray-500 hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us / Policies */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-4">Follow Us</h4>
            <ul className="space-y-2.5">
              {followUs.map(l => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-gray-500 hover:text-primary transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="text-sm font-bold text-gray-800 mb-4">Download App</h4>
            <div className="space-y-3">
              {/* Google Play */}
              <a href="#" aria-label="Get it on Google Play"
                className="flex items-center gap-2 bg-black text-white rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors w-fit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76c.3.17.64.24.99.2l12.6-11.46-2.9-2.9L3.18 23.76z"/>
                  <path d="M22.14 10.5c-.5-.28-4.7-2.7-5.37-3.08L13.5 10.7l3.27 3.27 5.37-3.08c.76-.44.76-1.95 0-2.39z"/>
                  <path d="M2.5.24C2.2.5 2 .9 2 1.4v21.2c0 .5.2.9.5 1.16l.1.08 11.88-11.88v-.28L2.6.16 2.5.24z"/>
                  <path d="M16.77 7.42L13.5 4.15 3.18.24c-.35-.04-.69.03-.99.2l10.69 10.26 3.89-3.28z"/>
                </svg>
                <div className="leading-tight">
                  <div className="text-[9px] text-gray-300">GET IT ON</div>
                  <div className="text-xs font-semibold">Google Play</div>
                </div>
              </a>

              {/* App Store */}
              <a href="#" aria-label="Download on the App Store"
                className="flex items-center gap-2 bg-black text-white rounded-lg px-3 py-2 hover:bg-gray-800 transition-colors w-fit">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                <div className="leading-tight">
                  <div className="text-[9px] text-gray-300">Download on the</div>
                  <div className="text-xs font-semibold">App Store</div>
                </div>
              </a>
            </div>
                 <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-end gap-3">
          <span className="text-sm text-gray-500 mr-2">Follow Us:</span>
          {socials.map(s => (
            <a key={s.label} href={s.href} aria-label={s.label}
              className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-400">&copy;2023 Themesflat. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-xs text-gray-500 border border-gray-300 rounded-md px-3 py-1.5 bg-white">
            <svg width="16" height="12" viewBox="0 0 20 15" fill="none">
              <rect width="20" height="15" rx="2" fill="#012169"/>
              <path d="M0 0l20 15M20 0L0 15" stroke="white" strokeWidth="3"/>
              <path d="M0 0l20 15M20 0L0 15" stroke="#C8102E" strokeWidth="2"/>
              <path d="M10 0v15M0 7.5h20" stroke="white" strokeWidth="5"/>
              <path d="M10 0v15M0 7.5h20" stroke="#C8102E" strokeWidth="3"/>
            </svg>
            <span>English</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
