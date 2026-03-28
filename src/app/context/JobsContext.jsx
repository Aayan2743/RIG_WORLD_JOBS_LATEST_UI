import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const JobsContext = createContext(null);

const STORAGE_KEY = 'rwj_jobs';

const seedJobs = [
  {
    id: 1,
    title: 'Senior Drilling Engineer',
    company: 'Shell Energy',
    location: 'Houston, TX',
    type: 'Full-time',
    posted: '2025-03-01',
    expires: '2025-04-01',
    applicants: 45,
    views: 320,
    status: 'Active',
  },
  {
    id: 2,
    title: 'Safety Manager',
    company: 'Shell Energy',
    location: 'Aberdeen, UK',
    type: 'Full-time',
    posted: '2025-02-22',
    expires: '2025-03-22',
    applicants: 28,
    views: 215,
    status: 'Active',
  },
  {
    id: 3,
    title: 'Process Engineer',
    company: 'Shell Energy',
    location: 'Singapore',
    type: 'Full-time',
    posted: '2025-02-26',
    expires: '2025-03-26',
    applicants: 32,
    views: 180,
    status: 'Paused',
  },
  {
    id: 4,
    title: 'Rig Supervisor (Offshore)',
    company: 'Shell Energy',
    location: 'Gulf of Mexico',
    type: 'Contract',
    posted: '2025-02-15',
    expires: '2025-03-15',
    applicants: 61,
    views: 440,
    status: 'Active',
  },
  {
    id: 5,
    title: 'HSE Coordinator',
    company: 'Shell Energy',
    location: 'Houston, TX',
    type: 'Full-time',
    posted: '2025-01-30',
    expires: '2025-03-01',
    applicants: 19,
    views: 95,
    status: 'Closed',
  },
];

function formatDate(d) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export function JobsProvider({ children }) {
  const [jobs, setJobs] = useState(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return seedJobs;
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return seedJobs;
      return parsed;
    } catch {
      return seedJobs;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
  }, [jobs]);

  const api = useMemo(() => {
    const addJob = (job) => {
      const now = new Date();
      const expiresDays = job.expiresDays ?? 30;
      const expires = new Date(now);
      expires.setDate(expires.getDate() + expiresDays);

      const created = {
        id: Date.now(),
        title: job.title,
        company: job.company,
        location: job.location,
        type: job.type,
        category: job.category,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        description: job.description,
        experience: job.experience,
        requirements: job.requirements,
        benefits: job.benefits,
        skills: job.skills,
        posted: formatDate(now),
        expires: formatDate(expires),
        applicants: 0,
        views: 0,
        status: 'Active',
      };

      setJobs(prev => [created, ...prev]);
      return created;
    };

    const updateJob = (id, patch) => {
      setJobs(prev => prev.map(j => (j.id === id ? { ...j, ...patch } : j)));
    };

    const deleteJob = (id) => {
      setJobs(prev => prev.filter(j => j.id !== id));
    };

    const toggleStatus = (id) => {
      setJobs(prev =>
        prev.map(j =>
          j.id !== id
            ? j
            : {
                ...j,
                status: j.status === 'Active' ? 'Paused' : 'Active',
              },
        ),
      );
    };

    return { jobs, addJob, updateJob, deleteJob, toggleStatus };
  }, [jobs]);

  return <JobsContext.Provider value={api}>{children}</JobsContext.Provider>;
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error('useJobs must be used inside JobsProvider');
  return ctx;
}
