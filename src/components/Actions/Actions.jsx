import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

// ── ICONS ─────────────────────────────────────────────────────────────────────
const IconTrophy    = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M12 17v4M7 4H4a1 1 0 00-1 1v3a5 5 0 005 5h.5M17 4h3a1 1 0 011 1v3a5 5 0 01-5 5h-.5M7 4h10M7 4a5 5 0 005 13A5 5 0 0017 4"/></svg>;
const IconGlobe     = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IconRocket    = () => <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.63 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/></svg>;
const IconCalendar  = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IconBook      = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>;
const IconUsers     = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
const IconFlask     = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-6 0v6l-4 9a1 1 0 001 1h12a1 1 0 001-1l-4-9V3M9 3H6m3 0h6"/></svg>;
const IconStar      = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IconVideo     = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>;
const IconBriefcase = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>;
const IconCheck     = () => <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#1a5c38' }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>;

// ── STATIC CONFIG ─────────────────────────────────────────────────────────────
const OLYMPIADES_ITEMS = [
  {
    icon: <IconBook />,
    titleKey: 'actions.olympiades.preparation.title',
    textKey:  'actions.olympiades.preparation.text',
    color: '#1a5c38', colorBg: '#edf7f0',
    bullets: [
      'actions.olympiades.preparation.bullet1',
      'actions.olympiades.preparation.bullet2',
      'actions.olympiades.preparation.bullet3',
      'actions.olympiades.preparation.bullet4',
    ],
  },
  {
    icon: <IconStar />,
    titleKey: 'actions.olympiades.stages.title',
    textKey:  'actions.olympiades.stages.text',
    color: '#8a6500', colorBg: '#fdf6e3',
    bullets: [
      'actions.olympiades.stages.bullet1',
      'actions.olympiades.stages.bullet2',
      'actions.olympiades.stages.bullet3',
      'actions.olympiades.stages.bullet4',
    ],
  },
  {
    icon: <IconUsers />,
    titleKey: 'actions.olympiades.formation.title',
    textKey:  'actions.olympiades.formation.text',
    color: '#2c4a8f', colorBg: '#f0f4ff',
    bullets: [
      'actions.olympiades.formation.bullet1',
      'actions.olympiades.formation.bullet2',
      'actions.olympiades.formation.bullet3',
      'actions.olympiades.formation.bullet4',
    ],
  },
];

const VULGARISATION_ITEMS = [
  {
    icon: <IconCalendar />,
    titleKey: 'actions.vulgarisation.events.title',
    textKey:  'actions.vulgarisation.events.text',
    color: '#1a5c38', colorBg: '#edf7f0',
    bullets: [
      'actions.vulgarisation.events.bullet1',
      'actions.vulgarisation.events.bullet2',
      'actions.vulgarisation.events.bullet3',
      'actions.vulgarisation.events.bullet4',
    ],
  },
  {
    icon: <IconFlask />,
    titleKey: 'actions.vulgarisation.expo.title',
    textKey:  'actions.vulgarisation.expo.text',
    color: '#8a6500', colorBg: '#fdf6e3',
    bullets: [
      'actions.vulgarisation.expo.bullet1',
      'actions.vulgarisation.expo.bullet2',
      'actions.vulgarisation.expo.bullet3',
      'actions.vulgarisation.expo.bullet4',
    ],
  },
  {
    icon: <IconVideo />,
    titleKey: 'actions.vulgarisation.videos.title',
    textKey:  'actions.vulgarisation.videos.text',
    color: '#2c4a8f', colorBg: '#f0f4ff',
    bullets: [
      'actions.vulgarisation.videos.bullet1',
      'actions.vulgarisation.videos.bullet2',
      'actions.vulgarisation.videos.bullet3',
      'actions.vulgarisation.videos.bullet4',
    ],
  },
];

const PROJETS_ITEMS = [
  {
    icon: <IconStar />,
    titleKey: 'actions.projets.immersion.title',
    textKey:  'actions.projets.immersion.text',
    color: '#1a5c38', colorBg: '#edf7f0',
    bullets: [
      'actions.projets.immersion.bullet1',
      'actions.projets.immersion.bullet2',
      'actions.projets.immersion.bullet3',
      'actions.projets.immersion.bullet4',
    ],
  },
  {
    icon: <IconBriefcase />,
    titleKey: 'actions.projets.mallette.title',
    textKey:  'actions.projets.mallette.text',
    color: '#0f3d22', colorBg: '#e8f5ee',
    bullets: [
      'actions.projets.mallette.bullet1',
      'actions.projets.mallette.bullet2',
      'actions.projets.mallette.bullet3',
      'actions.projets.mallette.bullet4',
    ],
  },
];

// ── CARD COMPONENT (shared by all tabs) ───────────────────────────────────────
function ActionCard({ icon, titleKey, textKey, bullets, color, colorBg, index, badge }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative bg-white rounded-2xl shadow-md overflow-hidden flex flex-col"
    >
      <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
      {badge && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full font-body text-[10px] font-bold uppercase tracking-widest text-white"
          style={{ backgroundColor: color }}>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/></svg>
          {badge}
        </div>
      )}
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: colorBg, color }}>
            {icon}
          </div>
          <h3 className="font-display text-[18px] font-bold leading-snug" style={{ color: '#1a3a2a' }}>
            {t(titleKey)}
          </h3>
        </div>
        <p className="font-body text-[14px] text-gray-500 leading-relaxed mb-5">{t(textKey)}</p>
        {bullets && (
          <ul className="mt-auto flex flex-col gap-2">
            {bullets.map((bKey, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-[13px] text-gray-600">
                <IconCheck />
                {t(bKey)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function NosActions() {
  const { t } = useTranslation();
  const { hash } = useLocation();
  const [activeTab, setActiveTab] = useState('olympiades');

  useEffect(() => {
    if (hash === '#vulgarisation') {
      setActiveTab('vulgarisation');
      setTimeout(() => document.getElementById('actions-tabs')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (hash === '#projets') {
      setActiveTab('projets');
      setTimeout(() => document.getElementById('actions-tabs')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (hash === '#olympiades') {
      setActiveTab('olympiades');
      setTimeout(() => document.getElementById('actions-tabs')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, [hash]);

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
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section className="w-full relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 60%, #0a2a18 100%)', minHeight: '240px' }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <span className="float-slow select-none pointer-events-none absolute top-8 left-[8%] font-display text-5xl font-bold opacity-[0.08] text-white">∑</span>
        <span className="float-med select-none pointer-events-none absolute top-12 right-[12%] font-display text-4xl font-bold opacity-[0.08] text-white">π</span>
        <span className="float-slow select-none pointer-events-none absolute bottom-6 left-[22%] font-display text-3xl font-bold opacity-[0.07] text-white">∞</span>
        <span className="float-med select-none pointer-events-none absolute bottom-8 right-[28%] font-display text-4xl font-bold opacity-[0.07] text-white">√</span>
        <span className="float-slow select-none pointer-events-none absolute top-6 left-[55%] font-display text-2xl font-bold opacity-[0.06] text-white">∫</span>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-14 md:py-20">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
            {t('actions.hero.tag')}
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            {t('actions.hero.title')}
          </motion.h1>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.22 }}
            className="font-body text-white/70 text-base max-w-xl leading-relaxed">
            {t('actions.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ── INTRO BAND ── */}
      <section className="w-full bg-white py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-6">
            {[
              { icon: <IconTrophy />, color: '#1a5c38', bg: '#edf7f0',
                labelKey: 'actions.intro.excellence_label',
                titleKey: 'actions.intro.excellence_title',
                textKey:  'actions.intro.excellence_text' },
              { icon: <IconGlobe />,  color: '#6c3aad', bg: '#f4effe',
                labelKey: 'actions.intro.accessibility_label',
                titleKey: 'actions.intro.accessibility_title',
                textKey:  'actions.intro.accessibility_text' },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.1 }}
                className="rounded-2xl p-7 flex gap-5 items-start"
                style={{ backgroundColor: item.bg }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: item.color, color: '#fff' }}>
                  {item.icon}
                </div>
                <div>
                  <p className="font-body text-[11px] font-bold uppercase tracking-widest mb-1" style={{ color: item.color }}>{t(item.labelKey)}</p>
                  <h2 className="font-display text-xl font-bold mb-2" style={{ color: '#1a3a2a' }}>{t(item.titleKey)}</h2>
                  <p className="font-body text-[14px] text-gray-600 leading-relaxed">{t(item.textKey)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Ambition quote */}
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
            className="mt-6 rounded-xl px-7 py-5 flex items-start gap-5"
            style={{ backgroundColor: 'rgba(26,92,56,0.07)', borderLeft: '4px solid #1a5c38' }}>
            <svg className="flex-shrink-0 mt-0.5 w-7 h-6 opacity-25" viewBox="0 0 28 22" fill="none">
              <path d="M0 22V13.2C0 9.07 1.08 5.87 3.24 3.6 5.44 1.2 8.6 0 12.72 0v4.08C10.56 4.08 8.92 4.72 7.8 6c-.96 1.12-1.48 2.72-1.56 4.8H11V22H0zm17 0V13.2c0-4.13 1.08-7.33 3.24-9.6C22.44 1.2 25.6 0 29.72 0v4.08c-2.16 0-3.8.64-4.92 1.92-.96 1.12-1.48 2.72-1.56 4.8H28V22H17z" fill="#1a5c38"/>
            </svg>
            <p className="font-display italic text-base sm:text-lg leading-relaxed" style={{ color: '#1a3a2a' }}
              dangerouslySetInnerHTML={{ __html: t('actions.intro.quote') }} />
          </motion.div>
        </div>
      </section>

      {/* ── TABS ── */}
      <section id="actions-tabs" className="texture-bg w-full flex-1 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Tab switcher */}
          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}
            className="flex flex-wrap items-center gap-3 mb-12">
            {[
              { val: 'olympiades',    icon: <IconTrophy />, labelKey: 'actions.tabs.olympiades' },
              { val: 'vulgarisation', icon: <IconGlobe />,  labelKey: 'actions.tabs.vulgarisation' },
              { val: 'projets',       icon: <IconRocket />, labelKey: 'actions.tabs.projets' },
            ].map(tab => (
              <button key={tab.val} onClick={() => setActiveTab(tab.val)}
                className="flex items-center gap-2.5 px-6 py-3 rounded-xl font-body font-semibold text-[15px] transition-all shadow-sm"
                style={activeTab === tab.val
                  ? { backgroundColor: '#1a5c38', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#374151', border: '1.5px solid #e2ddd5' }
                }>
                <span style={{ color: activeTab === tab.val ? '#fff' : '#9ca3af' }}>{tab.icon}</span>
                {t(tab.labelKey)}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">

            {/* ── OLYMPIADES TAB ── */}
            {activeTab === 'olympiades' && (
              <motion.div key="olympiades"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-12 }} transition={{ duration:0.35 }}>

                <div className="mb-10">
                  <p className="font-body text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#1a5c38' }}>{t('actions.olympiades.tag')}</p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a3a2a' }}>{t('actions.olympiades.title')}</h2>
                  <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: '#1a5c38' }} />
                  <p className="font-body text-[15px] text-gray-600 leading-relaxed max-w-3xl">{t('actions.olympiades.description')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {OLYMPIADES_ITEMS.map((item, i) => (
                    <ActionCard key={i} index={i} {...item} />
                  ))}
                </div>

                {/* Stats strip */}
                <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.6, delay:0.2 }}
                  className="mt-10 bg-white rounded-2xl shadow-md px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
                  {['s1','s2','s3','s4'].map((s, i) => (
                    <div key={i} className="text-center px-2">
                      <p className="font-display text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#1a5c38' }}>{t(`actions.olympiades.stats.${s}_value`)}</p>
                      <p className="font-body text-xs sm:text-sm text-gray-500 leading-snug">{t(`actions.olympiades.stats.${s}_label`)}</p>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* ── VULGARISATION TAB ── */}
            {activeTab === 'vulgarisation' && (
              <motion.div key="vulgarisation"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-12 }} transition={{ duration:0.35 }}>

                <div className="mb-10">
                  <p className="font-body text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#0f3d22' }}>{t('actions.vulgarisation.tag')}</p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a3a2a' }}>{t('actions.vulgarisation.title')}</h2>
                  <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: '#0f3d22' }} />
                  <p className="font-body text-[15px] text-gray-600 leading-relaxed max-w-3xl">{t('actions.vulgarisation.description')}</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {VULGARISATION_ITEMS.map((item, i) => (
                    <ActionCard key={i} index={i} {...item} />
                  ))}
                </div>

                {/* Objectif highlight */}
                <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.55, delay:0.2 }}
                  className="mt-10 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                  style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 100%)' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/15">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-white font-bold text-lg mb-2">{t('actions.vulgarisation.objective_title')}</p>
                    <p className="font-body text-white/80 text-[15px] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: t('actions.vulgarisation.objective_text') }} />
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* ── PROJETS TAB ── */}
            {activeTab === 'projets' && (
              <motion.div key="projets"
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
                exit={{ opacity:0, y:-12 }} transition={{ duration:0.35 }}>

                <div className="mb-10">
                  <p className="font-body text-[11px] font-bold uppercase tracking-widest mb-2" style={{ color: '#1a5c38' }}>{t('actions.projets.tag', 'BIENTÔT')}</p>
                  <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: '#1a3a2a' }}>{t('actions.projets.title', 'Projets à venir')}</h2>
                  <div className="w-12 h-0.5 mb-6" style={{ backgroundColor: '#1a5c38' }} />
                  <p className="font-body text-[15px] text-gray-600 leading-relaxed max-w-3xl">{t('actions.projets.description', 'Des initiatives en cours de préparation pour aller encore plus loin dans la promotion des mathématiques et des sciences.')}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                  {PROJETS_ITEMS.map((item, i) => (
                    <ActionCard key={i} index={i} {...item} badge={t('actions.projets.badge', 'À venir')} />
                  ))}
                </div>

                {/* Call to action */}
                <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                  viewport={{ once:true }} transition={{ duration:0.55, delay:0.2 }}
                  className="mt-10 rounded-2xl p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                  style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 100%)' }}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-white/15">
                    <IconRocket />
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-white font-bold text-lg mb-2">{t('actions.projets.cta_title', 'Vous souhaitez soutenir ces projets ?')}</p>
                    <p className="font-body text-white/80 text-[15px] leading-relaxed">
                      {t('actions.projets.cta_text', 'Ces projets sont en phase de préparation. Votre soutien — financier, logistique ou humain — peut faire la différence.')}
                    </p>
                  </div>
                  <a href="/contact"
                    className="font-body shrink-0 px-6 py-3 rounded-xl font-semibold text-[14px] text-gray-800 hover:bg-white transition-all"
                    style={{ backgroundColor: '#e8e2d4' }}>
                    {t('actions.projets.cta_button', 'Nous contacter')}
                  </a>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="w-full relative overflow-hidden py-16 md:py-20"
        style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 100%)' }}>
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5 }}
            className="font-body text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-4">
            {t('actions.cta.tag')}
          </motion.p>
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6, delay:0.1 }}
            className="font-display text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
            {t('actions.cta.title')}
          </motion.h2>
          <motion.p initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.55, delay:0.2 }}
            className="font-body text-white/70 text-base mb-8 max-w-lg mx-auto leading-relaxed">
            {t('actions.cta.subtitle')}
          </motion.p>
          <motion.div initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }}
            className="flex flex-wrap justify-center gap-4">
            <a href="/contact"
              className="font-body px-7 py-3 rounded-xl font-semibold text-[15px] text-white border-2 border-white/40 hover:border-white/70 transition-all">
              {t('actions.cta.contact')}
            </a>
            <a href="https://www.helloasso.com/associations/terangamath/formulaires/1"
              className="font-body px-7 py-3 rounded-xl font-semibold text-[15px] text-gray-800 hover:bg-white transition-all"
              style={{ backgroundColor: '#e8e2d4' }}>
              {t('actions.cta.donate')}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}