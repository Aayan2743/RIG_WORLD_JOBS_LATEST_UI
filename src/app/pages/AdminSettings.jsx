import { useState } from 'react';
import { User, Lock, Eye, EyeOff, Save, CheckCircle, Plus, Trash2, Factory, Briefcase } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const USERS_KEY = 'rwj_users';
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
function saveIndustries(list) {
  localStorage.setItem(INDUSTRIES_KEY, JSON.stringify(list));
}

export function getJobCategories() {
  try {
    const stored = localStorage.getItem(CATEGORIES_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  } catch { return DEFAULT_CATEGORIES; }
}
function saveJobCategories(list) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list));
}

function ListManager({ items, onDelete, newValue, onNewValueChange, onAdd, error, placeholder, emptyText }) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={newValue}
            onChange={e => onNewValueChange(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), onAdd())}
            placeholder={placeholder}
            className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
          />
        </div>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-2 px-4 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-md whitespace-nowrap"
          style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}>
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-foreground">Current list</span>
        <span className="text-xs text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">{items.length} total</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground text-sm border border-dashed border-border rounded-xl">
          {emptyText}
        </div>
      ) : (
        <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between px-4 py-3 bg-muted/30 border border-border/50 rounded-xl group">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary/60 flex-shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
              <button
                type="button"
                onClick={() => onDelete(idx)}
                className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminSettings() {
  const { user } = useAuth();
  const [tab, setTab] = useState('account');
  const [indSection, setIndSection] = useState('industries');
  const [saved, setSaved] = useState(false);
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const [account, setAccount] = useState({ name: user?.name || '', email: user?.email || '' });
  const [security, setSecurity] = useState({ oldPassword: '', newPassword: '', confirm: '' });
  const [secError, setSecError] = useState('');

  const [industries, setIndustries] = useState(() => getIndustries());
  const [newIndustry, setNewIndustry] = useState('');
  const [indError, setIndError] = useState('');

  const [categories, setCategories] = useState(() => getJobCategories());
  const [newCategory, setNewCategory] = useState('');
  const [catError, setCatError] = useState('');

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

  const addIndustry = () => {
    setIndError('');
    const val = newIndustry.trim();
    if (!val) { setIndError('Please enter an industry name.'); return; }
    if (industries.map(i => i.toLowerCase()).includes(val.toLowerCase())) { setIndError('This industry already exists.'); return; }
    const updated = [...industries, val];
    setIndustries(updated);
    saveIndustries(updated);
    setNewIndustry('');
    showToast();
  };

  const addCategory = () => {
    setCatError('');
    const val = newCategory.trim();
    if (!val) { setCatError('Please enter a category name.'); return; }
    if (categories.map(c => c.toLowerCase()).includes(val.toLowerCase())) { setCatError('This category already exists.'); return; }
    const updated = [...categories, val];
    setCategories(updated);
    saveJobCategories(updated);
    setNewCategory('');
    showToast();
  };

  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'industries', label: 'Industries', icon: Factory },
  ];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Manage your account preferences.</p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800 font-semibold">
          <CheckCircle className="w-4 h-4" /> Changes saved successfully.
        </div>
      )}

      {/* Tabs */}
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
            {t.id === 'industries' && (
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                tab === 'industries' ? 'bg-white/20 text-white' : 'bg-secondary/10 text-secondary'
              }`}>
                {industries.length + categories.length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Account Tab */}
      {tab === 'account' && (
        <form onSubmit={saveAccount} className="bg-white rounded-2xl border border-border/60 p-6 space-y-4">
          <h3 className="font-bold text-foreground">Account Information</h3>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
            <input type="text" value={account.name} onChange={e => setAccount(p => ({ ...p, name: e.target.value }))}
              required className="w-full px-4 py-3 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary" />
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

      {/* Security Tab */}
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
              <button type="button" onClick={() => setShowOld(!showOld)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
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
              <button type="button" onClick={() => setShowNew(!showNew)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">
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

      {/* Industries Tab */}
      {tab === 'industries' && (
        <div className="bg-white rounded-2xl border border-border/60 p-6 space-y-5">
          <div>
            <h3 className="font-bold text-foreground">Manage Industries & Job Categories</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Control the dropdown options shown across the platform.
            </p>
          </div>

          {/* Sub-section toggle */}
          <div className="flex gap-2 p-1 bg-muted/40 rounded-xl w-fit">
            <button
              onClick={() => setIndSection('industries')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                indSection === 'industries' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}>
              Company Register
              <span className="ml-1.5 text-xs bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full">{industries.length}</span>
            </button>
            <button
              onClick={() => setIndSection('categories')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                indSection === 'categories' ? 'bg-white shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
              }`}>
              Job Categories
              <span className="ml-1.5 text-xs bg-secondary/10 text-secondary px-1.5 py-0.5 rounded-full">{categories.length}</span>
            </button>
          </div>

          {/* Company Register Industries */}
          {indSection === 'industries' && (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Industry / Sector</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Shown in the <span className="font-semibold text-foreground">Industry / Sector</span> dropdown on the company registration form.
                </p>
              </div>
              <ListManager
                items={industries}
                onDelete={(idx) => { const u = industries.filter((_, i) => i !== idx); setIndustries(u); saveIndustries(u); showToast(); }}
                newValue={newIndustry}
                onNewValueChange={(v) => { setNewIndustry(v); setIndError(''); }}
                onAdd={addIndustry}
                error={indError}
                placeholder="e.g. Subsea Engineering"
                emptyText="No industries added yet. Add one above."
              />
            </div>
          )}

          {/* Job Categories */}
          {indSection === 'categories' && (
            <div className="space-y-3">
              <div>
                <p className="text-sm font-semibold text-foreground">Job Categories</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Shown in the <span className="font-semibold text-foreground">Category</span> dropdown on the Post Job form.
                </p>
              </div>
              <ListManager
                items={categories}
                onDelete={(idx) => { const u = categories.filter((_, i) => i !== idx); setCategories(u); saveJobCategories(u); showToast(); }}
                newValue={newCategory}
                onNewValueChange={(v) => { setNewCategory(v); setCatError(''); }}
                onAdd={addCategory}
                error={catError}
                placeholder="e.g. Subsea Operations"
                emptyText="No categories added yet. Add one above."
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}