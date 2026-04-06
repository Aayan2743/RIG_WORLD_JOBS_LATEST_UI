import { useState, useMemo } from 'react';
import {
  Factory, Briefcase, Plus, Trash2, Pencil, Search,
  CheckCircle, X, ChevronLeft, ChevronRight, AlertTriangle
} from 'lucide-react';
import { getIndustries, getJobCategories } from './AdminSettings.jsx';

const INDUSTRIES_KEY = 'rwj_industries';
const CATEGORIES_KEY = 'rwj_job_categories';
function saveIndustries(list) { localStorage.setItem(INDUSTRIES_KEY, JSON.stringify(list)); }
function saveJobCategories(list) { localStorage.setItem(CATEGORIES_KEY, JSON.stringify(list)); }

const PAGE_SIZE = 8;

function ConfirmModal({ item, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl border border-border shadow-xl p-7 max-w-sm w-full">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-foreground text-center mb-2">Delete Item?</h3>
        <p className="text-sm text-muted-foreground text-center mb-6">
          <span className="font-semibold text-foreground">"{item}"</span> will be permanently removed.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-border text-sm font-semibold hover:bg-muted/50 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function ListPanel({ items, setItems, saveFn, placeholder, description, icon: Icon, accentColor }) {
  const [input,        setInput]        = useState('');
  const [error,        setError]        = useState('');
  const [search,       setSearch]       = useState('');
  const [page,         setPage]         = useState(1);
  const [editIdx,      setEditIdx]      = useState(null);
  const [editVal,      setEditVal]      = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast,        setToast]        = useState(false);

  const showToast = () => { setToast(true); setTimeout(() => setToast(false), 2000); };

  const filtered = useMemo(() =>
    items.filter(i => i.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage   = Math.min(page, totalPages);
  const pageItems  = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handleAdd = () => {
    setError('');
    const val = input.trim();
    if (!val) { setError('Please enter a name.'); return; }
    if (items.map(i => i.toLowerCase()).includes(val.toLowerCase())) {
      setError('This item already exists.'); return;
    }
    const updated = [...items, val];
    setItems(updated); saveFn(updated); setInput(''); showToast();
  };

  const startEdit = (realIdx) => { setEditIdx(realIdx); setEditVal(items[realIdx]); };
  const saveEdit  = (realIdx) => {
    const val = editVal.trim();
    if (!val) return;
    if (items.some((i, idx) => i.toLowerCase() === val.toLowerCase() && idx !== realIdx)) return;
    const updated = items.map((i, idx) => idx === realIdx ? val : i);
    setItems(updated); saveFn(updated); setEditIdx(null); showToast();
  };

  const confirmDelete = () => {
    const updated = items.filter((_, i) => i !== deleteTarget.idx);
    setItems(updated); saveFn(updated); setDeleteTarget(null); showToast();
  };

  const realIndex = (filteredItem) => items.indexOf(filteredItem);

  return (
    <div className="space-y-5">
      {toast && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm text-emerald-800 font-semibold">
          <CheckCircle className="w-4 h-4" /> Changes saved.
        </div>
      )}

      <p className="text-xs text-muted-foreground">{description}</p>

      <div className="space-y-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              value={input}
              onChange={e => { setInput(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
              placeholder={placeholder}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-xl text-sm
                focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
            />
          </div>
          <button
            type="button"
            onClick={handleAdd}
            className="flex items-center gap-2 px-5 py-3 rounded-xl text-white text-sm font-semibold
              transition-all hover:shadow-md whitespace-nowrap"
            style={{ background: 'linear-gradient(135deg, #0891B2 0%, #0E7490 100%)' }}
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        {error && <p className="text-xs text-red-600 flex items-center gap-1"><X className="w-3 h-3" />{error}</p>}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search…"
            className="w-full pl-9 pr-4 py-2.5 border border-border rounded-xl text-sm
              focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary transition-all"
          />
        </div>
        <span className="text-xs text-muted-foreground bg-muted/40 px-3 py-1.5 rounded-full font-medium">
          {filtered.length} total
        </span>
      </div>

      {pageItems.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-border rounded-xl text-muted-foreground text-sm">
          {search ? 'No results match your search.' : 'No items added yet.'}
        </div>
      ) : (
        <div className="space-y-2">
          {pageItems.map((item) => {
            const ri = realIndex(item);
            return (
              <div key={ri}
                className="flex items-center justify-between px-4 py-3 bg-muted/20 border border-border/50
                  rounded-xl group hover:border-secondary/30 hover:bg-muted/40 transition-all"
              >
                {editIdx === ri ? (
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      autoFocus
                      value={editVal}
                      onChange={e => setEditVal(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') saveEdit(ri);
                        if (e.key === 'Escape') setEditIdx(null);
                      }}
                      className="flex-1 px-3 py-1.5 border border-secondary rounded-lg text-sm
                        focus:outline-none focus:ring-2 focus:ring-secondary/20"
                    />
                    <button onClick={() => saveEdit(ri)}
                      className="p-1.5 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-colors">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                    <button onClick={() => setEditIdx(null)}
                      className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${accentColor}`} />
                      <span className="text-sm text-foreground">{item}</span>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(ri)}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-secondary hover:bg-secondary/10 transition-all"
                        title="Edit">
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => setDeleteTarget({ idx: ri, name: item })}
                        className="p-1.5 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-all"
                        title="Delete">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-muted-foreground">
            Page {safePage} of {totalPages}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={safePage === 1}
              className="p-2 rounded-lg border border-border text-muted-foreground hover:bg-muted/50
                disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  n === safePage
                    ? 'bg-secondary text-white'
                    : 'border border-border text-muted-foreground hover:bg-muted/50'
                }`}
              >
                {n}
              </button>
            ))}
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={safePage === totalPages}
              className="p-2 rounded-lg border border-border text-muted-foreground hover:bg-muted/50
                disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmModal
          item={deleteTarget.name}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

export function AdminIndustries() {
  const [activeTab, setActiveTab] = useState('industries');
  const [industries, setIndustries] = useState(() => getIndustries());
  const [categories, setCategories] = useState(() => getJobCategories());

  const tabs = [
    {
      id:          'industries',
      label:       'Company Register',
      icon:        Factory,
      count:       industries.length,
      description: 'These appear in the Industry / Sector dropdown on the company registration form.',
    },
    {
      id:          'categories',
      label:       'Job Categories',
      icon:        Briefcase,
      count:       categories.length,
      description: 'These appear in the Category dropdown on the Post Job form.',
    },
  ];

  return (
    <div className="space-y-6 w-full">

      {/* Tab bar */}
      <div className="flex gap-2 p-1 bg-muted/40 rounded-xl w-fit">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === t.id
                ? 'bg-white shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
              activeTab === t.id
                ? 'bg-secondary/10 text-secondary'
                : 'bg-muted text-muted-foreground'
            }`}>
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
        {activeTab === 'industries' ? (
          <>
            <div className="mb-5">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Factory className="w-4 h-4 text-secondary" /> Industry / Sector
              </h3>
            </div>
            <ListPanel
              items={industries}
              setItems={setIndustries}
              saveFn={saveIndustries}
              placeholder="e.g. Subsea Engineering"
              description={tabs[0].description}
              icon={Factory}
              accentColor="bg-secondary/60"
            />
          </>
        ) : (
          <>
            <div className="mb-5">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-secondary" /> Job Categories
              </h3>
            </div>
            <ListPanel
              items={categories}
              setItems={setCategories}
              saveFn={saveJobCategories}
              placeholder="e.g. Subsea Operations"
              description={tabs[1].description}
              icon={Briefcase}
              accentColor="bg-cyan-400"
            />
          </>
        )}
      </div>
    </div>
  );
}