import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import animath from '../../assets/partners/animath.png';
import aimssn from '../../assets/partners/aimssn.png';
import ansts from '../../assets/partners/ANSTS.jpg';
import caci from '../../assets/partners/CaCI.png';
import forcen from '../../assets/partners/ForceN.webp';

// ── PARTNERS DATA ─────────────────────────────────────────────────────────────
const SECTIONS = [
  {
    titleKey: 'home.partners.sections.associations',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
    partners: [
      {
        name: 'Animath',
        logo: animath,
        url: 'https://www.animath.fr/',
      },
      {
        name: 'Math & Maroc',
        logo: 'https://mathmaroc.com/wp-content/uploads/2020/09/logo-math-maroc.png',
        url: 'https://mathmaroc.com/',
      },
    ],
  },
  {
    titleKey: 'home.partners.sections.entreprises',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
      </svg>
    ),
    partners: [
      {
        name: 'CACI Assurance',
        logo: caci,
        url: 'https://www.ca-assurances.com/en/the-group/our-companies/caci/caci-life-non-life/',
      },
    ],
  },
  {
    titleKey: 'home.partners.sections.institutionnels',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"/>
      </svg>
    ),
    partners: [
      {
        name: 'Ministère de l\'Éducation Nationale',
        logo: null,
        initials: 'MEN',
        url: 'https://www.education.sn/',
      },
      {
        name: 'ANSTS',
        logo: ansts,
        url: 'https://ansts.sn/',
      },
    ],
  },
  {
    titleKey: 'home.partners.sections.academiques',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"/>
      </svg>
    ),
    partners: [
      {
        name: 'FORCE N',
        logo: forcen,
        url: 'https://force-n.sn/en',
      },
      {
        name: 'AIMS Sénégal',
        logo: aimssn,
        url: 'https://aims-senegal.org/',
      },
    ],
  },
];

// ── LOGO CARD ─────────────────────────────────────────────────────────────────
function PartnerLogo({ partner, index }) {
  return (
    <motion.a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.07 }}
      className="group flex items-center justify-center bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 px-6 py-6 sm:px-8 sm:py-8"
      style={{ border: '1.5px solid #ece7df', minHeight: '100px' }}
      title={partner.name}
    >
      {partner.logo ? (
        <img
          src={partner.logo}
          alt={partner.name}
          className="max-h-12 sm:max-h-16 max-w-[120px] sm:max-w-[160px] w-auto object-contain group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <span
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center font-display font-bold text-base sm:text-lg text-white"
          style={{ backgroundColor: '#1a5c38' }}
        >
          {partner.initials}
        </span>
      )}
    </motion.a>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function Partenaires() {
  const { t } = useTranslation();

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
        style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 60%, #0a2a18 100%)', minHeight: '220px' }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <span className="float-slow select-none pointer-events-none absolute top-8 left-[8%] font-display text-5xl font-bold opacity-[0.08] text-white">∑</span>
        <span className="float-med select-none pointer-events-none absolute top-12 right-[12%] font-display text-4xl font-bold opacity-[0.08] text-white">π</span>
        <span className="float-slow select-none pointer-events-none absolute bottom-6 left-[22%] font-display text-3xl font-bold opacity-[0.07] text-white">∞</span>
        <span className="float-med select-none pointer-events-none absolute bottom-8 right-[28%] font-display text-4xl font-bold opacity-[0.07] text-white">√</span>
        <span className="float-slow select-none pointer-events-none absolute top-6 left-[55%] font-display text-2xl font-bold opacity-[0.06] text-white">∫</span>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-10 sm:py-14 md:py-20">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
            TerangaMath
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
            {t('partners.hero.title')}
          </motion.h1>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.22 }}
            className="font-body text-white/70 text-base max-w-xl leading-relaxed">
            {t('partners.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ── SECTIONS ── */}
      <section className="texture-bg w-full flex-1 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 flex flex-col gap-10 sm:gap-16">

          {SECTIONS.map((section, si) => (
            <div key={si}>
              {/* Section heading with icon */}
              <motion.div
                initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.5 }}
                className="flex items-center gap-2.5 sm:gap-3 mb-2"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center text-white shrink-0"
                  style={{ backgroundColor: '#1a5c38' }}>
                  {section.icon}
                </div>
                <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold" style={{ color: '#1a3a2a' }}>
                  {t(section.titleKey, section.titleKey.split('.').pop())}
                </h2>
              </motion.div>
              <div className="w-8 sm:w-10 h-0.5 mb-5 sm:mb-6 ml-[42px] sm:ml-[52px]" style={{ backgroundColor: '#1a5c38', opacity: 0.3 }} />

              {/* Logo grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-5">
                {section.partners.map((partner, pi) => (
                  <PartnerLogo key={pi} partner={partner} index={pi} />
                ))}
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ── CTA DEVENIR PARTENAIRE ── */}
      <section className="w-full py-14 md:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6 }}
            className="rounded-2xl p-7 sm:p-10 md:p-14 text-center flex flex-col items-center"
            style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 100%)' }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6"
              style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}>
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <p className="font-body text-xs font-bold uppercase tracking-[0.2em] text-white/50 mb-3">{t('partners.cta.tag')}</p>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
              {t('partners.cta.title')}
            </h2>
            <p className="font-body text-white/70 text-base mb-8 max-w-lg leading-relaxed">
              {t('partners.cta.subtitle')}
            </p>
            <a href="/contact"
              className="font-body inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-[15px] text-gray-800 hover:bg-white transition-all"
              style={{ backgroundColor: '#e8e2d4' }}>
              {t('partners.cta.button')}
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