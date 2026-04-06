import { useState } from 'react';
import { User, Lock, Eye, EyeOff, Save, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const USERS_KEY      = 'rwj_users';
const INDUSTRIES_KEY = 'rwj_industries';
const CATEGORIES_KEY = 'rwj_job_categories';

const DEFAULT_INDUSTRIES = [
  'Upstream / Drilling',
  'Offshore Engineering',
  'Downstream / Refining',
  'HSE & Safety',
  'Marine & Subsea',
  'Logistics & Supply Chain',
  'Energy Services',
  'Other',
];

const DEFAULT_CATEGORIES = [
  'Engineering',
  'Safety & HSE',
  'Operations',
  'Management',
  'Technical Support',
  'Logistics',
];

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function saveUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function getIndustries() {
  try {
    const stored = localStorage.getItem(INDUSTRIES_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(INDUSTRIES_KEY, JSON.stringify(DEFAULT_INDUSTRIES));
    return DEFAULT_INDUSTRIES;
  } catch { return DEFAULT_INDUSTRIES; }
}

export function getJobCategories() {
  try {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  } catch { return DEFAULT_CATEGORIES; }
}

export default function AdminSettings() {
  const { user } = useAuth();
  const [tab,     setTab]     = useState('account');
  const [saved,   setSaved]   = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [account,  setAccount]  = useState({ name: user?.name || '', email: user?.email || '' });
  const [security, setSecurity] = useState({ oldPassword: '', newPassword: '', confirm: '' });
  const [secError, setSecError] = useState('');

  const showToast = () => { setSaved(true); setTimeout(() => setSaved(false), 2500); };

  const saveAccount = (e) => {
    e.preventDefault();
    const users = getUsers();
    saveUsers(users.map(u => u.email === user?.email ? { ...u, name: account.name } : u));
    showToast();
  };

  const savePassword = (e) => {
    e.preventDefault();
    setSecError('');
    const users = getUsers();
    const current = users.find(u => u.email === user?.email);
    if (!current || current.password !== security.oldPassword) { setSecError('Current password is incorrect.'); return; }
    if (security.newPassword.length < 6) { setSecError('New password must be at least 6 characters.'); return; }
    if (security.newPassword !== security.confirm) { setSecError('Passwords do not match.'); return; }
    saveUsers(users.map(u => u.email === user?.email ? { ...u, password: security.newPassword } : u));
    setSecurity({ oldPassword: '', newPassword: '', confirm: '' });
    showToast();
  };

  const tabs = [
    { id: 'account',  label: 'Account',  icon: User },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  return (
    <div className="space-y-6 max-w-2xl">

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800 font-semibold">
          <CheckCircle className="w-4 h-4" /> Changes saved successfully.
        </div>
      )}

      <div className="flex gap-2 flex-wrap">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              tab === t.id
                ? 'bg-secondary text-white shadow-sm'
                : 'bg-white border border-border text-muted-foreground hover:bg-muted/40'
            }`}>
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'account' && (
        <form onSubmit={saveAccount} className="bg-white rounded-2xl border border-border/60 p-6 space-y-4">
          <h3 className="font-bold text-foreground">Account Information</h3>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
            <input type="text" value={account.name}
              onChange={e => setAccount(p => ({ ...p, name: e.target.value }))} required
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
            <input type="email" value={account.email} disabled
              className="w-full px-4 py-3 border border-border rounded-xl text-sm bg-muted/30 text-muted-foreground cursor-not-allowed" />
            <p className="text-xs text-muted-foreground mt-1">Email cannot be changed.</p>
          </div>
          <button type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </form>
      )}

      {tab === 'security' && (
        <form onSubmit={savePassword} className="bg-white rounded-2xl border border-border/60 p-6 space-y-4">
          <h3 className="font-bold text-foreground">Change Password</h3>
          {secError && (
            <div className="px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">{secError}</div>
          )}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Current Password</label>
            <div className="relative">
              <input type={showOld ? 'text' : 'password'} value={security.oldPassword}
                onChange={e => setSecurity(p => ({ ...p, oldPassword: e.target.value }))} required
                className="w-full pl-4 pr-11 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
              <button type="button" onClick={() => setShowOld(!showOld)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showOld ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">New Password</label>
            <div className="relative">
              <input type={showNew ? 'text' : 'password'} value={security.newPassword}
                onChange={e => setSecurity(p => ({ ...p, newPassword: e.target.value }))} required
                className="w-full pl-4 pr-11 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
              <button type="button" onClick={() => setShowNew(!showNew)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Confirm New Password</label>
            <input type="password" value={security.confirm}
              onChange={e => setSecurity(p => ({ ...p, confirm: e.target.value }))} required
              className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
          </div>
          <button type="submit"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md"
            style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
            <Save className="w-4 h-4" /> Update Password
          </button>
        </form>
      )}
    </div>
  );
}