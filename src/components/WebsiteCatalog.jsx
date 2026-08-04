import React, { useState } from 'react';
import { Search, Eye, Calendar, Star, Check, Code2, Sparkles, Filter } from 'lucide-react';
import { WEBSITE_TEMPLATES } from '../data/websitesData';

export default function WebsiteCatalog({ onSelectPreview, onSelectBuy }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'SaaS & AI', 'E-Commerce', 'Portfolio & Agency', 'Hospitality & Business', 'Mobile & Apps'];

  const filteredTemplates = WEBSITE_TEMPLATES.filter((site) => {
    const matchesCategory = selectedCategory === 'All' || site.category === selectedCategory;
    const matchesSearch = site.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          site.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          site.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="catalog" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-2 text-[#38BDF8] text-sm font-semibold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Tailored Web Architecture Concepts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore Service Concepts & Designs
          </h2>
          <p className="text-[#94A3B8] text-sm mt-1">
            Preview custom frameworks engineered with elite <strong>Website Design</strong>, <strong>Website Development</strong>, and <strong>Technical SEO</strong> principles, then schedule a consultation to launch your platform.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[280px]">
          <Search className="w-4 h-4 text-[#A0C4FF]/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates, tech, features..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0E1420] border border-[#A0C4FF]/20 text-white placeholder-[#94A3B8]/60 focus:outline-none focus:border-[#38BDF8] transition-colors text-sm"
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        <Filter className="w-4 h-4 text-[#A0C4FF] shrink-0 mr-1" />
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === category
                ? 'bg-gradient-to-r from-[#A0C4FF] to-[#38BDF8] text-[#070A0F] font-bold shadow-md shadow-[#38BDF8]/20 scale-105'
                : 'glass-panel text-[#B9D6F2] hover:bg-[#141C2E] hover:border-[#A0C4FF]/30'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Catalog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTemplates.map((site) => (
          <div
            key={site.id}
            className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-[#A0C4FF]/15 flex flex-col group"
          >
            {/* Template Card Image & Hover Overlay */}
            <div className="relative h-52 overflow-hidden bg-[#070A0F]">
              <img
                src={site.image}
                alt={site.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E1420] via-transparent to-transparent opacity-80" />

              {/* Badge */}
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-[11px] font-bold border backdrop-blur-md ${site.badgeColor}`}>
                  {site.badge}
                </span>
              </div>

              {/* Quick Rating Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#070A0F]/80 border border-white/10 backdrop-blur-md text-xs font-semibold text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{site.rating}</span>
                <span className="text-[#94A3B8] text-[10px]">({site.reviewsCount})</span>
              </div>

              {/* Hover Live Preview Trigger */}
              <div className="absolute inset-0 bg-[#070A0F]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                <button
                  onClick={() => onSelectPreview(site)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold text-xs flex items-center gap-2 backdrop-blur-md transition-transform hover:scale-105"
                >
                  <Eye className="w-4 h-4 text-[#38BDF8]" />
                  <span>Live Preview</span>
                </button>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-[#A0C4FF] font-medium mb-1">
                  <span>{site.category}</span>
                  <span className="text-[#94A3B8]">Includes Full Source Code</span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-[#A0C4FF] transition-colors">
                  {site.name}
                </h3>
                
                <p className="text-xs text-[#94A3B8] mt-1 line-clamp-2 leading-relaxed">
                  {site.tagline}
                </p>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {site.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md bg-[#070A0F] border border-[#A0C4FF]/10 text-[10px] text-[#B9D6F2] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Feature bullet list */}
                <ul className="mt-4 space-y-1.5 border-t border-[#A0C4FF]/10 pt-3">
                  {site.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                      <Check className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                      <span className="truncate">{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation CTA Footer */}
              <div className="pt-4 border-t border-[#A0C4FF]/15 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#94A3B8] uppercase tracking-wider font-semibold">Consultation</div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-xl font-extrabold text-emerald-400">Free Strategy Call</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onSelectPreview(site)}
                    className="p-2.5 rounded-xl bg-[#070A0F] border border-[#A0C4FF]/20 text-[#A0C4FF] hover:bg-[#141C2E] transition-all"
                    title="Live Interactive Concept Preview"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onSelectBuy(site)}
                    className="btn-pastel-primary px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Consultation</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-16 glass-panel rounded-2xl border border-[#A0C4FF]/15">
          <Code2 className="w-12 h-12 text-[#A0C4FF]/40 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No websites match your filter</h3>
          <p className="text-sm text-[#94A3B8] mt-1">Try resetting your search query or choosing another category.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 rounded-xl bg-[#A0C4FF]/20 text-[#A0C4FF] text-xs font-semibold border border-[#A0C4FF]/30"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
}
