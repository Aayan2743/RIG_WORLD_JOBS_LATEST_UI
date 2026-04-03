import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Briefcase, ChevronRight, Star, Users, Globe, TrendingUp, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'motion/react';

const allCompanies = [
  { id: 1, name: 'Shell Energy', slug: 'shell-energy', logo: '🛢️', industry: 'Upstream O&G', location: 'Houston, TX', employees: '82,000+', openJobs: 45, rating: 4.4, founded: 1907, description: 'One of the world\'s largest energy companies, operating in exploration, production, refining, and marketing.', verified: true, tags: ['Deepwater', 'LNG', 'Renewables'] },
  { id: 2, name: 'BP Operations', slug: 'bp-operations', logo: '⚡', industry: 'Integrated O&G', location: 'London, UK', employees: '70,000+', openJobs: 38, rating: 4.2, founded: 1909, description: 'Global energy company focused on upstream, downstream, and alternative energy operations.', verified: true, tags: ['Offshore', 'Refining', 'Solar'] },
  { id: 3, name: 'Chevron', slug: 'chevron', logo: '🌊', industry: 'Upstream O&G', location: 'San Ramon, CA', employees: '43,000+', openJobs: 52, rating: 4.5, founded: 1879, description: 'Leading integrated energy company with major operations in the Gulf of Mexico and Asia Pacific.', verified: true, tags: ['Gulf of Mexico', 'International'] },
  { id: 4, name: 'ExxonMobil', slug: 'exxonmobil', logo: '🏭', industry: 'Integrated O&G', location: 'Irving, TX', employees: '63,000+', openJobs: 41, rating: 4.1, founded: 1870, description: 'World\'s largest publicly traded energy company with operations spanning exploration to chemicals.', verified: true, tags: ['Chemicals', 'LNG', 'Deepwater'] },
  { id: 5, name: 'TotalEnergies', slug: 'totalenergies', logo: '☀️', industry: 'Energy Transition', location: 'Paris, France', employees: '100,000+', openJobs: 29, rating: 4.3, founded: 1924, description: 'French multinational pivoting from oil & gas to become a diversified multi-energy company.', verified: true, tags: ['Renewables', 'LNG', 'Offshore'] },
  { id: 6, name: 'Equinor', slug: 'equinor', logo: '🔵', industry: 'Upstream O&G', location: 'Stavanger, Norway', employees: '21,000+', openJobs: 33, rating: 4.6, founded: 1972, description: 'Norwegian state oil company and major operator in the North Sea with offshore expertise.', verified: true, tags: ['North Sea', 'Offshore', 'Wind'] },
  { id: 7, name: 'Halliburton', slug: 'halliburton', logo: '🔧', industry: 'Oilfield Services', location: 'Houston, TX', employees: '48,000+', openJobs: 67, rating: 3.9, founded: 1919, description: 'One of the world\'s largest oilfield services companies, providing products and services worldwide.', verified: true, tags: ['Services', 'Drilling', 'Completion'] },
  { id: 8, name: 'Schlumberger (SLB)', slug: 'slb', logo: '⚙️', industry: 'Oilfield Services', location: 'Paris, France', employees: '86,000+', openJobs: 89, rating: 4.0, founded: 1926, description: 'Leading provider of technology for reservoir characterization, drilling, production, and processing.', verified: true, tags: ['Technology', 'Services', 'Digital'] },
  { id: 9, name: 'Baker Hughes', slug: 'baker-hughes', logo: '🌐', industry: 'Oilfield Services', location: 'Houston, TX', employees: '57,000+', openJobs: 54, rating: 4.1, founded: 1907, description: 'International industrial technology company providing solutions for the energy and industrial sectors.', verified: true, tags: ['Technology', 'LNG', 'Turbines'] },
  { id: 10, name: 'ConocoPhillips', slug: 'conocophillips', logo: '📊', industry: 'Upstream O&G', location: 'Houston, TX', employees: '9,900+', openJobs: 28, rating: 4.3, founded: 1917, description: 'Explores for, produces, and markets crude oil, natural gas, and natural gas liquids worldwide.', verified: true, tags: ['Unconventional', 'LNG', 'Alaska'] },
  { id: 11, name: 'Weatherford', slug: 'weatherford', logo: '🌀', industry: 'Oilfield Services', location: 'Houston, TX', employees: '17,000+', openJobs: 35, rating: 3.8, founded: 1941, description: 'Multinational oilfield service company providing equipment and services to the oil and gas industry.', verified: false, tags: ['Drilling', 'Completion', 'Production'] },
  { id: 12, name: 'Wood Group', slug: 'wood-group', logo: '🏗️', industry: 'Engineering Services', location: 'Aberdeen, UK', employees: '35,000+', openJobs: 42, rating: 4.0, founded: 1982, description: 'Global engineering and consultancy company operating across energy, process, and industrial sectors.', verified: true, tags: ['Engineering', 'Consultancy', 'EPC'] },
];

const industries = ['All Industries', 'Upstream O&G', 'Integrated O&G', 'Oilfield Services', 'Energy Transition', 'Engineering Services'];
const sizes = ['All Sizes', 'Small (< 5k)', 'Medium (5k–25k)', 'Large (25k–100k)', 'Enterprise (100k+)'];

export function Companies() {
  const [search, setSearch] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [sortBy, setSortBy] = useState('Most Jobs');

  const filtered = allCompanies.filter(c => {
    if (selectedIndustry !== 'All Industries' && c.industry !== selectedIndustry) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'Most Jobs') return b.openJobs - a.openJobs;
    if (sortBy === 'Highest Rated') return b.rating - a.rating;
    if (sortBy === 'Alphabetical') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <div className="bg-white border-b border-border/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">Top Employers</p>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
            Browse Energy <span className="gradient-text">Companies</span>
          </h1>

          {/* Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 flex items-center bg-background border border-border rounded-xl px-4 py-3.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <Search className="w-5 h-5 text-muted-foreground mr-3 flex-shrink-0" />
              <input type="text" placeholder="Company name or location..." value={search} onChange={e => setSearch(e.target.value)}
                className="bg-transparent w-full outline-none text-foreground text-sm placeholder-muted-foreground" />
              {search && <button onClick={() => setSearch('')} className="text-muted-foreground hover:text-foreground ml-2"><X className="w-4 h-4" /></button>}
            </div>
            <select value={selectedIndustry} onChange={e => setSelectedIndustry(e.target.value)}
              className="px-4 py-3.5 border border-border rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
              {industries.map(i => <option key={i}>{i}</option>)}
            </select>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              className="px-4 py-3.5 border border-border rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
              {['Most Jobs', 'Highest Rated', 'Alphabetical'].map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-bold text-foreground">{filtered.length}</span> companies found
          </p>
        </div>
      </div>

      {/* Company Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((company, index) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <Link to={`/companies/${company.slug}`}
                className="block bg-white border border-border/60 rounded-2xl p-6 hover:shadow-xl hover:border-primary/20 transition-all duration-300 group h-full">

                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-3xl flex-shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      {company.logo}
                    </div>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h2 className="font-bold text-foreground group-hover:text-primary transition-colors">{company.name}</h2>
                        {company.verified && (
                          <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center" title="Verified Employer">
                            <span className="text-white text-[9px] font-bold">✓</span>
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 mt-0.5">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-semibold text-foreground">{company.rating}</span>
                        <span className="text-xs text-muted-foreground">· Glassdoor</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary/8 px-2.5 py-1 rounded-full border border-primary/15 flex-shrink-0">
                    {company.openJobs} jobs
                  </span>
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">{company.description}</p>

                {/* Meta */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center space-x-1 text-xs text-muted-foreground bg-muted/40 px-2.5 py-1.5 rounded-lg">
                    <MapPin className="w-3 h-3" /><span>{company.location}</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 text-xs text-muted-foreground bg-muted/40 px-2.5 py-1.5 rounded-lg">
                    <Users className="w-3 h-3" /><span>{company.employees}</span>
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {company.tags.map(tag => (
                    <span key={tag} className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{tag}</span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/60">
                  <span className="text-xs text-muted-foreground flex items-center space-x-1">
                    <Globe className="w-3 h-3" /><span>{company.industry}</span>
                  </span>
                  <span className="text-sm font-semibold text-primary group-hover:underline flex items-center space-x-0.5">
                    <span>View Profile</span><ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-muted-foreground">
            <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-semibold text-lg">No companies match your search</p>
            <p className="text-sm mt-1">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}
