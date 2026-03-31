import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import img1 from '../../assets/events/Instagram-post-7.png';
import img2 from '../../assets/events/Instagram-post-8.png';
import img3 from '../../assets/events/Instagram-post-9.png';
import img4 from '../../assets/events/Instagram-post-26.png';
import img5 from '../../assets/events/Instagram-post-27.png';

// ── DATA ──────────────────────────────────────────────────────────────────────
const EVENTS = [
  {
    id: 1,
    status: 'past',
    category: 'conference',
    image: img1,
    day: 'Samedi',
    date: '30 Mars 2024',
    time: '16h – 18h',
    location: 'En ligne',
    locationIcon: 'online',
    titleKey: 'events.e1.title',
    descKey: 'events.e1.desc',
  },
  {
    id: 2,
    status: 'past',
    category: 'conference',
    image: img2,
    day: 'Samedi',
    date: '08 Juin 2024',
    time: '16h – 18h',
    location: 'En ligne',
    locationIcon: 'online',
    titleKey: 'events.e2.title',
    descKey: 'events.e2.desc',
  },
  {
    id: 3,
    status: 'past',
    category: 'atelier',
    image: img3,
    day: 'Google Meet',
    date: '29 Juin 2024',
    time: '16h GMT',
    location: 'Google Meet',
    locationIcon: 'online',
    titleKey: 'events.e3.title',
    descKey: 'events.e3.desc',
  },
  {
    id: 4,
    status: 'upcoming',
    category: 'olympiades',
    image: img4,
    day: 'Samedi',
    date: '12 Avril 2025',
    time: '09h – 17h',
    location: 'Dakar, Sénégal',
    locationIcon: 'place',
    titleKey: 'events.e4.title',
    descKey: 'events.e4.desc',
    featured: true,
  },
  {
    id: 5,
    status: 'upcoming',
    category: 'vulgarisation',
    image: img5,
    day: 'Vendredi',
    date: '25 Avril 2025',
    time: '18h – 20h',
    location: 'En ligne',
    locationIcon: 'online',
    titleKey: 'events.e5.title',
    descKey: 'events.e5.desc',
  },
];

const CATEGORIES = ['all', 'conference', 'atelier', 'olympiades', 'vulgarisation'];

// ── CATEGORY STYLES ───────────────────────────────────────────────────────────
const CAT_STYLES = {
  conference:    { bg: '#e8f4fe', color: '#1a5c9a' },
  atelier:       { bg: '#fdf6e3', color: '#8a6500' },
  olympiades:    { bg: '#edf7f0', color: '#1a5c38' },
  vulgarisation: { bg: '#f4effe', color: '#6c3aad' },
};

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────
function CategoryBadge({ cat, label, size = 'sm' }) {
  const s = CAT_STYLES[cat] || { bg: '#f0ebe0', color: '#555' };
  return (
    <span
      className={`inline-flex items-center rounded-full font-body font-semibold ${size === 'sm' ? 'text-[11px] px-2.5 py-0.5' : 'text-[12px] px-3 py-1'}`}
      style={{ backgroundColor: s.bg, color: s.color }}
    >
      {label}
    </span>
  );
}

function LocationIcon({ type }) {
  if (type === 'online') return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
  return (
    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
    </svg>
  );
}

function FeaturedCard({ event, catLabel }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7 }}
      className="relative rounded-2xl overflow-hidden shadow-2xl mb-12"
      style={{ minHeight: '340px' }}
    >
      <img src={event.image} alt={t(event.titleKey)} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(10,40,22,0.92) 45%, rgba(10,40,22,0.5) 100%)' }} />
      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-body font-bold uppercase tracking-wider"
              style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff' }}>
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              {t('events.featured_label')}
            </span>
            <CategoryBadge cat={event.category} label={catLabel} />
          </div>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">{t(event.titleKey)}</h3>
          <p className="font-body text-white/75 text-sm md:text-base leading-relaxed mb-5 max-w-lg">{t(event.descKey)}</p>
          <div className="flex flex-wrap gap-4 text-white/80 text-sm font-body">
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              {event.day} {event.date}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              {event.time}
            </span>
            <span className="flex items-center gap-1.5">
              <LocationIcon type={event.locationIcon} />
              {event.location}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0">
          <a href="#"
            className="font-body inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-white shadow-lg transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#1a5c38', border: '1.5px solid rgba(255,255,255,0.2)' }}>
            {t('events.cta.join')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function EventCard({ event, index, catLabel }) {
  const { t } = useTranslation();
  const isPast = event.status === 'past';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.07 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: '200px' }}>
        <img src={event.image} alt={t(event.titleKey)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ filter: isPast ? 'grayscale(30%)' : 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {isPast && (
          <div className="absolute top-3 right-3 rounded-lg px-2.5 py-1 text-[11px] font-body font-bold uppercase tracking-wider"
            style={{ backgroundColor: 'rgba(0,0,0,0.55)', color: 'rgba(255,255,255,0.75)' }}>
            {t('events.status.past')}
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-white rounded-xl px-3 py-2 shadow-lg">
          <p className="font-display text-[13px] font-bold leading-none" style={{ color: '#1a5c38' }}>
            {event.date.split(' ')[0]}
          </p>
          <p className="font-body text-[10px] text-gray-500 uppercase tracking-wide mt-0.5">
            {event.date.split(' ').slice(1).join(' ')}
          </p>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <CategoryBadge cat={event.category} label={catLabel} />
        </div>
        <h3 className="font-display text-[17px] font-bold leading-snug mb-2" style={{ color: '#1a3a2a' }}>
          {t(event.titleKey)}
        </h3>
        <p className="font-body text-sm text-gray-500 leading-relaxed mb-4 flex-1">{t(event.descKey)}</p>

        <div className="flex flex-col gap-1.5 mb-5">
          <div className="flex items-center gap-2 font-body text-[13px] text-gray-500">
            <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#1a5c38' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            {event.day} · {event.time}
          </div>
          <div className="flex items-center gap-2 font-body text-[13px] text-gray-500">
            <span style={{ color: '#1a5c38' }}><LocationIcon type={event.locationIcon} /></span>
            {event.location}
          </div>
        </div>

        <a href="#"
          className="font-body inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={isPast
            ? { border: '1.5px solid #e2ddd5', color: '#6b7280', backgroundColor: '#faf8f4' }
            : { backgroundColor: '#1a5c38', color: '#fff' }
          }
          onMouseEnter={e => { if (!isPast) e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={e => { if (!isPast) e.currentTarget.style.opacity = '1'; }}
        >
          {isPast ? t('events.cta.details') : t('events.cta.join')}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Evenements() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab]   = useState('all');
  const [activeCat, setActiveCat]   = useState('all');
  const [email, setEmail]           = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const filtered = EVENTS.filter(e => {
    const tabOk = activeTab === 'all' || e.status === activeTab;
    const catOk = activeCat === 'all' || e.category === activeCat;
    return tabOk && catOk;
  });

  const featuredEvent = EVENTS.find(e =>
    e.featured &&
    (activeTab === 'all' || activeTab === 'upcoming') &&
    (activeCat === 'all' || activeCat === e.category)
  );

  const tabBtn = (val, labelKey) => (
    <button
      key={val}
      onClick={() => setActiveTab(val)}
      className="font-body px-5 py-2 rounded-lg text-sm font-semibold transition-all"
      style={{
        backgroundColor: activeTab === val ? '#1a5c38' : 'transparent',
        color: activeTab === val ? '#fff' : '#6b7280',
        border: activeTab === val ? 'none' : '1.5px solid #e2ddd5',
      }}
    >
      {t(labelKey)}
    </button>
  );

  return (
    <div className="flex w-full flex-col min-h-screen" style={{ fontFamily: "'Lora', 'Georgia', serif", backgroundColor: '#f5f0e8' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Lora', Georgia, serif; }
        .font-body   { font-family: 'DM Sans', sans-serif; }
        .texture-bg {
          background-color: #f0ebe0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }
        @keyframes float-slow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(4deg)} }
        @keyframes float-med  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-3deg)} }
        .float-slow { animation: float-slow 7s ease-in-out infinite; }
        .float-med  { animation: float-med  5s ease-in-out infinite; }
        .newsletter-input {
          font-family: 'DM Sans', sans-serif;
          flex: 1; padding: 11px 16px; border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.25); background: rgba(255,255,255,0.12);
          font-size: 14px; color: #fff; outline: none;
          transition: border-color 0.2s, background 0.2s;
        }
        .newsletter-input::placeholder { color: rgba(255,255,255,0.5); }
        .newsletter-input:focus { border-color: rgba(255,255,255,0.55); background: rgba(255,255,255,0.18); }
      `}</style>

      <Header />

      {/* ── HERO BAND ── */}
      <section className="w-full relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 60%, #0a2a18 100%)', minHeight: '220px' }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <span className="float-slow select-none pointer-events-none absolute top-8    left-[8%]   font-display text-5xl font-bold opacity-[0.08] text-white">∑</span>
        <span className="float-med  select-none pointer-events-none absolute top-12   right-[12%] font-display text-4xl font-bold opacity-[0.08] text-white">π</span>
        <span className="float-slow select-none pointer-events-none absolute bottom-6 left-[22%]  font-display text-3xl font-bold opacity-[0.07] text-white">∞</span>
        <span className="float-med  select-none pointer-events-none absolute bottom-8 right-[28%] font-display text-4xl font-bold opacity-[0.07] text-white">√</span>
        <span className="float-slow select-none pointer-events-none absolute top-6    left-[52%]  font-display text-2xl font-bold opacity-[0.06] text-white">∫</span>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-14 md:py-20">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
            {t('events.hero.tag')}
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            {t('events.hero.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.22 }}
            className="font-body text-white/70 text-base mt-3 max-w-md">
            {t('events.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="texture-bg w-full flex-1 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* ── Filters ── */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              {tabBtn('all',      'events.tab.all')}
              {tabBtn('upcoming', 'events.tab.upcoming')}
              {tabBtn('past',     'events.tab.past')}
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(val => (
                <button
                  key={val}
                  onClick={() => setActiveCat(val)}
                  className="font-body px-4 py-1.5 rounded-full text-[13px] font-medium transition-all"
                  style={{
                    backgroundColor: activeCat === val ? '#1a3a2a' : '#f0ebe0',
                    color: activeCat === val ? '#fff' : '#555',
                  }}
                >
                  {t(`events.filter.${val}`)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* ── Featured event ── */}
          <AnimatePresence mode="wait">
            {featuredEvent && (
              <motion.div key="featured" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FeaturedCard
                  event={featuredEvent}
                  catLabel={t(`events.filter.${featuredEvent.category}`)}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Events grid ── */}
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-center py-20">
                <p className="font-display text-xl text-gray-400">{t('events.no_events')}</p>
              </motion.div>
            ) : (
              <motion.div key={activeTab + activeCat}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((event, i) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={i}
                    catLabel={t(`events.filter.${event.category}`)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Newsletter strip ── */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 rounded-2xl px-8 py-8 md:py-10"
            style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 100%)' }}>
            <div className="flex flex-col md:flex-row md:items-center gap-7">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{t('events.newsletter.title')}</h3>
                </div>
                <p className="font-body text-white/70 text-sm">{t('events.newsletter.subtitle')}</p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto md:min-w-[380px]">
                {subscribed ? (
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <p className="font-body text-white text-sm font-semibold">{t('events.newsletter.success')}</p>
                  </motion.div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder={t('events.newsletter.placeholder')}
                      className="newsletter-input"
                    />
                    <button
                      onClick={() => { if (email) setSubscribed(true); }}
                      className="font-body flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm text-gray-800 transition-all hover:scale-105"
                      style={{ backgroundColor: '#e8e2d4' }}
                    >
                      {t('events.newsletter.cta')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}