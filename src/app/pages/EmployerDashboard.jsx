import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Eye, TrendingUp, MapPin, Clock, ChevronRight, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useJobs } from '../context/JobsContext.jsx';

const recentApplicants = [
  { id: 1, name: 'John Martinez', initials: 'JM', position: 'Senior Drilling Engineer', experience: '8 years', appliedDate: '2 hours ago', status: 'New', color: 'from-blue-500 to-blue-600' },
  { id: 2, name: 'Sarah Williams', initials: 'SW', position: 'Safety Manager', experience: '5 years', appliedDate: '5 hours ago', status: 'Reviewed', color: 'from-purple-500 to-purple-600' },
  { id: 3, name: 'Michael Chen', initials: 'MC', position: 'Process Engineer', experience: '6 years', appliedDate: '1 day ago', status: 'Shortlisted', color: 'from-emerald-500 to-emerald-600' },
  { id: 4, name: 'Emma Thompson', initials: 'ET', position: 'Senior Drilling Engineer', experience: '7 years', appliedDate: '1 day ago', status: 'New', color: 'from-amber-500 to-amber-600' },
];

const applicantStatusConfig = {
  'New': { bg: 'bg-blue-50', text: 'text-primary' },
  'Reviewed': { bg: 'bg-purple-50', text: 'text-purple-700' },
  'Shortlisted': { bg: 'bg-emerald-50', text: 'text-emerald-700' },
  'Rejected': { bg: 'bg-red-50', text: 'text-red-600' },
};

const cardDetails = {
  'Active Jobs': {
    stats: [
      { label: 'Total Active', value: '12' },
      { label: 'New This Week', value: '2' },
      { label: 'Expiring Soon', value: '3' },
    ],
    list: [
      { title: 'Senior Drilling Engineer', sub: 'Drilling', badge: 'Active', badgeStyle: 'bg-emerald-50 text-emerald-700', meta: '18 applicants' },
      { title: 'Offshore Safety Officer', sub: 'HSE', badge: 'Active', badgeStyle: 'bg-emerald-50 text-emerald-700', meta: '11 applicants' },
      { title: 'Rig Supervisor', sub: 'Operations', badge: 'Expiring', badgeStyle: 'bg-amber-50 text-amber-700', meta: '24 applicants' },
      { title: 'Mechanical Technician', sub: 'Maintenance', badge: 'Active', badgeStyle: 'bg-emerald-50 text-emerald-700', meta: '9 applicants' },
      { title: 'Mud Engineer', sub: 'Drilling Fluids', badge: 'New', badgeStyle: 'bg-blue-50 text-primary', meta: '5 applicants' },
    ],
  },
  'Total Applicants': {
    stats: [
      { label: 'Total Applicants', value: '156' },
      { label: 'Shortlisted', value: '34' },
      { label: 'Rejected', value: '28' },
    ],
    list: [
      { title: 'Mohammed Al-Rashid', sub: 'Drilling Engineer', badge: 'Shortlisted', badgeStyle: 'bg-emerald-50 text-emerald-700', meta: '2 days ago' },
      { title: 'Sarah Collins', sub: 'Safety Officer', badge: 'Reviewed', badgeStyle: 'bg-purple-50 text-purple-700', meta: '3 days ago' },
      { title: 'Raj Kumar', sub: 'Rig Supervisor', badge: 'New', badgeStyle: 'bg-blue-50 text-primary', meta: '5 days ago' },
      { title: 'Ivan Petrov', sub: 'Mechanical Tech', badge: 'Shortlisted', badgeStyle: 'bg-emerald-50 text-emerald-700', meta: '6 days ago' },
      { title: 'Aisha Nwosu', sub: 'Mud Engineer', badge: 'Rejected', badgeStyle: 'bg-red-50 text-red-600', meta: '1 week ago' },
    ],
  },
  'Job Views': {
    stats: [
      { label: 'Total Views', value: '2,345' },
      { label: 'This Week', value: '+180' },
      { label: 'Avg Per Job', value: '195' },
    ],
    list: [
      { title: 'Rig Supervisor', sub: 'Operations', badge: 'Trending', badgeStyle: 'bg-emerald-50 text-emerald-700', meta: '542 views' },
      { title: 'Senior Drilling Engineer', sub: 'Drilling', badge: 'High', badgeStyle: 'bg-blue-50 text-primary', meta: '487 views' },
      { title: 'Offshore Safety Officer', sub: 'HSE', badge: 'High', badgeStyle: 'bg-blue-50 text-primary', meta: '401 views' },
      { title: 'Mechanical Technician', sub: 'Maintenance', badge: 'Medium', badgeStyle: 'bg-amber-50 text-amber-700', meta: '234 views' },
      { title: 'Mud Engineer', sub: 'Drilling Fluids', badge: 'Medium', badgeStyle: 'bg-amber-50 text-amber-700', meta: '195 views' },
    ],
  },
  'New This Week': {
    stats: [
      { label: 'New This Week', value: '23' },
      { label: 'Mon – Wed', value: '14' },
      { label: 'Thu – Today', value: '9' },
    ],
    list: [
      { title: 'Carlos Mendez', sub: 'Drilling Engineer', badge: 'New', badgeStyle: 'bg-blue-50 text-primary', meta: 'Today, 9:14 AM' },
      { title: 'Priya Sharma', sub: 'HSE Analyst', badge: 'New', badgeStyle: 'bg-blue-50 text-primary', meta: 'Today, 8:02 AM' },
      { title: 'Abdullah Hassan', sub: 'Rig Supervisor', badge: 'Reviewed', badgeStyle: 'bg-purple-50 text-purple-700', meta: 'Yesterday, 4:30 PM' },
      { title: 'Natasha Ivanova', sub: 'Mechanical Tech', badge: 'New', badgeStyle: 'bg-blue-50 text-primary', meta: 'Yesterday, 11:00 AM' },
      { title: 'James Okafor', sub: 'Mud Engineer', badge: 'Pending', badgeStyle: 'bg-amber-50 text-amber-700', meta: '2 days ago' },
    ],
  },
};

export function EmployerDashboard() {
  const { jobs } = useJobs();
  const activeJobs = jobs.filter(j => j.status === 'Active').slice(0, 5);
  const [activeCard, setActiveCard] = useState(null);

  const handleCardClick = (label) => {
    setActiveCard(prev => (prev === label ? null : label));
  };

  const detail = activeCard ? cardDetails[activeCard] : null;

  return (
    <div className="space-y-6">

      {/* Stat Widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Jobs', value: '12', delta: '+2', icon: Briefcase, iconBg: 'bg-blue-50', iconColor: 'text-primary' },
          { label: 'Total Applicants', value: '156', delta: '+23', icon: Users, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
          { label: 'Job Views', value: '2,345', delta: '+180', icon: Eye, iconBg: 'bg-purple-50', iconColor: 'text-purple-600' },
          { label: 'New This Week', value: '23', delta: 'applicants', icon: TrendingUp, iconBg: 'bg-amber-50', iconColor: 'text-amber-500' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => handleCardClick(stat.label)}
            className={`bg-white rounded-2xl border p-4 shadow-sm hover:shadow-md transition-all cursor-pointer select-none
              ${activeCard === stat.label
                ? 'border-primary ring-2 ring-primary/20'
                : 'border-border/60 hover:border-border'
              }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                <stat.icon className={`w-4.5 h-4.5 ${stat.iconColor}`} />
              </div>
              <span className="text-xs text-emerald-600 font-semibold">{stat.delta}</span>
            </div>
            <p className="text-2xl font-bold text-foreground mb-0.5">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Detail Panel */}
      <AnimatePresence>
        {detail && (
          <motion.div
            key={activeCard}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden"
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border/60">
              <h2 className="text-base font-bold text-foreground">{activeCard}</h2>
              <button
                onClick={() => setActiveCard(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted/50 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-3 px-5 py-4 border-b border-border/60">
              {detail.stats.map(s => (
                <div key={s.label} className="bg-muted/30 rounded-xl px-4 py-3">
                  <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
                  <p className="text-xl font-bold text-foreground">{s.value}</p>
                </div>
              ))}
            </div>

            {/* List */}
            <div className="divide-y divide-border/50">
              {detail.list.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between px-5 py-3.5 hover:bg-muted/10 transition-colors"
                >
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.sub}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{item.meta}</span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.badgeStyle}`}>
                      {item.badge}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}