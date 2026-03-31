import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

// ── DATA ──────────────────────────────────────────────────────────────────────
const PRESS_ITEMS = [
  {
    id: 'rts-ofm-2025',
    titleKey:   'presse.items.p1.title',
    excerptKey: 'presse.items.p1.excerpt',
    dateKey:    'presse.items.p1.date',
    url:        'https://www.rts.sn/actualite/detail/education/le-senegal-brille-aux-olympiades-francophones-de-mathematiques-avec-quatre-medailles-de-bronze',
    source:     'RTS',
    logo:       'https://www.rts.sn/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Frts.13e4ee12.png&w=128&q=75',
    logoBg:     '#fff',
    logoText:   'RTS',
    logoTextColor: '#fff',
  },
  {
    id: 'jds-ofm-2025',
    titleKey:   'presse.items.p2.title',
    excerptKey: 'presse.items.p2.excerpt',
    dateKey:    'presse.items.p2.date',
    url:        'https://www.journaldusenegal.com/le-senegal-brille-aux-olympiades-francophones-de-mathematiques-4-medailles-et-une-mention-honorable/',
    source:     'Journal du Sénégal',
    logo:       'https://www.journaldusenegal.com/wp-content/themes/jdsenegal-new/assets/img/logo.png',
    logoBg:     '#f5f5f5',
    logoText:   'JDS',
    logoTextColor: '#333',
  },
  {
    id: 'ems-prize-2024',
    titleKey:   'presse.items.p3.title',
    excerptKey: 'presse.items.p3.excerpt',
    dateKey:    'presse.items.p3.date',
    url:        'https://euromathsoc.org/committee-outreach-Simon-Norton-Prize-2024',
    source:     'European Mathematical Society',
    logo:       null,
    logoBg:     'rgb(26, 92, 56)',
    logoText:   'EMS',
    logoTextColor: '#fff',
  },
  {
    id: 'force-n-expo',
    titleKey:   'presse.items.p4.title',
    excerptKey: 'presse.items.p4.excerpt',
    dateKey:    'presse.items.p4.date',
    url:        'https://force-n.sn/articles/exposition-force-n-et-teranga-math-mettent-les-mathematiques-lhonneur-au-musee-des',
    source:     'Force-N',
    logo:       'https://force-n.sn/themes/forcen/logo.webp',
    logoBg:     '#f5f5f5',
    logoText:   'Force-N',
    logoTextColor: '#333',
  },
  {
    id: 'ima-harmonograph',
    titleKey:   'presse.items.p5.title',
    excerptKey: 'presse.items.p5.excerpt',
    dateKey:    'presse.items.p5.date',
    url:        'https://ima.org.uk/28434/senegalese-students-build-a-harmonograph/',
    source:     'Institute of Mathematics and its Applications',
    logo:       'https://ima.org.uk/wp/wp-content/themes/ima-s8/dist/images/ima-logo.png?new',
    logoBg:     'rgb(26, 92, 56)',
    logoText:   'IMA',
    logoTextColor: '#333',
  },
];

// ── PRESS CARD ────────────────────────────────────────────────────────────────
function PressCard({ item, index }) {
  const { t } = useTranslation();
  const [logoError, setLogoError] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden"
    >
      {/* Zone logo */}
      <div
        className="flex items-center justify-center flex-shrink-0 px-8"
        style={{ height: '130px', backgroundColor: item.logoBg }}
      >
        {item.logo && !logoError ? (
          <img
            src={item.logo}
            alt={item.source}
            style={{ maxHeight: '64px', maxWidth: '180px', objectFit: 'contain' }}
            onError={() => setLogoError(true)}
          />
        ) : (
          <span
            className="font-display text-3xl font-bold tracking-wide"
            style={{ color: item.logoTextColor }}
          >
            {item.logoText}
          </span>
        )}
      </div>

      {/* Contenu */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Source + date */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="font-body text-xs font-bold uppercase tracking-widest" style={{ color: '#1a5c38' }}>
            {item.source}
          </span>
          <span className="font-body text-[11px] text-gray-400">{t(item.dateKey)}</span>
        </div>

        {/* Titre article */}
        <h3 className="font-display text-[15px] font-semibold leading-snug flex-1" style={{ color: '#1a3a2a' }}>
          {t(item.titleKey)}
        </h3>

        {/* Excerpt */}
        <p className="font-body text-sm text-gray-500 leading-relaxed line-clamp-3">
          {t(item.excerptKey)}
        </p>

        {/* Bouton visiter */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-body text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-95"
          style={{ backgroundColor: '#1a5c38' }}
        >
          {t('presse.read_article')}
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Presse() {
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full flex-col min-h-screen"
      style={{ fontFamily: "'Lora', 'Georgia', serif", backgroundColor: '#f5f0e8' }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Lora', Georgia, serif; }
        .font-body   { font-family: 'DM Sans', sans-serif; }
        .texture-bg {
          background-color: #f0ebe0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }
        .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        @keyframes float-slow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(4deg)} }
        @keyframes float-med  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-3deg)} }
        .float-slow { animation: float-slow 7s ease-in-out infinite; }
        .float-med  { animation: float-med  5s ease-in-out infinite; }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section
        className="w-full relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 60%, #0a2a18 100%)', minHeight: '240px' }}
      >
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <span className="float-slow select-none pointer-events-none absolute top-8 left-[8%] font-display text-5xl font-bold opacity-[0.08] text-white">∑</span>
        <span className="float-med  select-none pointer-events-none absolute top-12 right-[12%] font-display text-4xl font-bold opacity-[0.08] text-white">π</span>
        <span className="float-slow select-none pointer-events-none absolute bottom-6 left-[22%] font-display text-3xl font-bold opacity-[0.07] text-white">∞</span>
        <span className="float-med  select-none pointer-events-none absolute bottom-8 right-[28%] font-display text-4xl font-bold opacity-[0.07] text-white">√</span>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-14 md:py-20">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3"
          >
            {t('presse.hero.tag')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight"
          >
            {t('presse.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.22 }}
            className="font-body text-white/70 text-base mt-3 max-w-2xl leading-relaxed"
          >
            {t('presse.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="texture-bg w-full flex-1 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Intro texte */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5 }}
            className="mb-12 max-w-3xl"
          >
            <p className="font-body text-gray-500 text-[15px] leading-relaxed">
              {t('presse.intro')}
            </p>
          </motion.div>

          {/* ── Grille cartes logos ── */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRESS_ITEMS.map((item, i) => (
              <PressCard key={item.id} item={item} index={i} />
            ))}
          </div>

          {/* ── Contact presse CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 rounded-2xl px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center gap-6"
            style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 100%)' }}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-white">{t('presse.contact.title')}</h3>
              </div>
              <p className="font-body text-white/70 text-sm">{t('presse.contact.subtitle')}</p>
            </div>
            <a
              href="/contact"
              className="font-body flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-gray-800 transition-all hover:scale-105"
              style={{ backgroundColor: '#e8e2d4' }}
            >
              {t('presse.contact.cta')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </a>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
}