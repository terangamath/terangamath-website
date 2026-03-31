import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import coumba    from '../../assets/team/Coumba_SARR.jpeg';
import khady     from '../../assets/team/Khady_SANKHE.JPG';
import bintou    from '../../assets/team/Bintou_DIOP.jpg';
import abdoulahy from '../../assets/team/Abdoulahy_COUNDOUL.JPG';
import elhadji   from '../../assets/team/Elhadji_SOW.jpg';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function About() {
  const { t } = useTranslation();

  const team = [
    {
      nameKey: 'about.team.m1.name',
      roleKey: 'about.team.m1.role',
      subKey:  'about.team.m1.sub',
      bioKey:  'about.team.m1.bio',
      photo:   coumba,
      initials: 'CS',
    },
    {
      nameKey: 'about.team.m2.name',
      roleKey: 'about.team.m2.role',
      subKey:  'about.team.m2.sub',
      bioKey:  'about.team.m2.bio',
      photo:   khady,
      initials: 'KS',
    },
    {
      nameKey: 'about.team.m3.name',
      roleKey: 'about.team.m3.role',
      subKey:  'about.team.m3.sub',
      bioKey:  'about.team.m3.bio',
      photo:   bintou,
      initials: 'BDS',
    },
    {
      nameKey: 'about.team.m4.name',
      roleKey: 'about.team.m4.role',
      subKey:  'about.team.m4.sub',
      bioKey:  'about.team.m4.bio',
      photo:   abdoulahy,
      initials: 'AC',
    },
    {
      nameKey: 'about.team.m5.name',
      roleKey: 'about.team.m5.role',
      subKey:  'about.team.m5.sub',
      bioKey:  'about.team.m5.bio',
      photo:   elhadji,
      initials: 'EDS',
    },
  ];

  const offerings = [
    {
      title: t('about.offerings.o1_title'),
      desc:  t('about.offerings.o1_desc'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
        </svg>
      ),
    },
    {
      title: t('about.offerings.o2_title'),
      desc:  t('about.offerings.o2_desc'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
    },
    {
      title: t('about.offerings.o3_title'),
      desc:  t('about.offerings.o3_desc'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
        </svg>
      ),
    },
    {
      title: t('about.offerings.o4_title'),
      desc:  t('about.offerings.o4_desc'),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="flex w-full flex-col" style={{ fontFamily: "'Lora', 'Georgia', serif", backgroundColor: '#f5f0e8' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        .font-display { font-family: 'Lora', Georgia, serif; }
        .font-body   { font-family: 'DM Sans', sans-serif; }
        .texture-bg {
          background-color: #f0ebe0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-14px) rotate(4deg); }
        }
        @keyframes float-med {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-10px) rotate(-3deg); }
        }
        .float-slow { animation: float-slow 7s ease-in-out infinite; }
        .float-med  { animation: float-med  5s ease-in-out infinite; }
      `}</style>

      <Header />

      {/* ── HERO BAND ── */}
      <section className="w-full relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 60%, #0a2a18 100%)', minHeight: '260px' }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <span className="float-slow select-none pointer-events-none absolute top-8    left-[6%]   font-display text-6xl font-bold opacity-[0.07] text-white">∑</span>
        <span className="float-med  select-none pointer-events-none absolute top-10   right-[10%] font-display text-5xl font-bold opacity-[0.07] text-white">π</span>
        <span className="float-slow select-none pointer-events-none absolute bottom-5 left-[25%]  font-display text-3xl font-bold opacity-[0.06] text-white">∞</span>
        <span className="float-med  select-none pointer-events-none absolute bottom-8 right-[30%] font-display text-4xl font-bold opacity-[0.06] text-white">√</span>
        <span className="float-slow select-none pointer-events-none absolute top-5    left-[55%]  font-display text-2xl font-bold opacity-[0.06] text-white">∫</span>
        <span className="float-med  select-none pointer-events-none absolute bottom-4 left-[45%]  font-display text-3xl font-bold opacity-[0.05] text-white">Δ</span>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3"
          >
            {t('about.hero.tag')}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-[3.2rem] font-bold text-white leading-tight max-w-2xl"
          >
            {t('about.hero.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.22 }}
            className="font-body text-white/70 text-base mt-4 max-w-xl leading-relaxed"
          >
            {t('about.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ── LEARN → GROW → THRIVE ── */}
      <section className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <motion.div {...fadeUp(0)} className="flex items-center gap-3 mb-6">
                {[t('about.about_section.tagline1'), t('about.about_section.tagline2'), t('about.about_section.tagline3')].map((word, i) => (
                  <React.Fragment key={word}>
                    <span className="font-display text-sm sm:text-base font-semibold" style={{ color: '#1a5c38' }}>{word}</span>
                    {i < 2 && <span className="text-gray-300 text-lg">→</span>}
                  </React.Fragment>
                ))}
              </motion.div>

              <motion.h2 {...fadeUp(0.08)} className="font-display text-3xl sm:text-4xl font-bold leading-tight mb-6" style={{ color: '#1a3a2a' }}>
                {t('about.about_section.title')}
              </motion.h2>

              <motion.div {...fadeUp(0.16)} className="space-y-4 font-body text-gray-600 text-[15px] leading-relaxed">
                <p>{t('about.about_section.p1')}</p>
                <p>{t('about.about_section.p2')}</p>
                <p>{t('about.about_section.p3')}</p>
              </motion.div>

              <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-3 mt-8">
                <a href="/contact" className="font-body px-6 py-3 rounded-lg font-semibold text-[15px] text-white shadow-md hover:opacity-90 transition-all" style={{ backgroundColor: '#1a5c38' }}>
                  {t('about.about_section.cta_join')}
                </a>
                <a href="#equipe" className="font-body px-6 py-3 rounded-lg font-semibold text-[15px] border-2 text-gray-800 bg-white hover:bg-gray-50 transition-all" style={{ borderColor: '#1a5c38' }}>
                  {t('about.about_section.cta_team')}
                </a>
              </motion.div>
            </div>

            <motion.div {...fadeUp(0.2)} className="flex flex-col gap-5">
              {[
                {
                  label: t('about.about_section.mission_label'),
                  text:  t('about.about_section.mission_text'),
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>,
                },
                {
                  label: t('about.about_section.approach_label'),
                  text:  t('about.about_section.approach_text'),
                  icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/></svg>,
                },
              ].map((card, i) => (
                <motion.div
                  key={i} {...fadeUp(0.24 + i * 0.1)}
                  className="rounded-2xl p-6 border border-gray-100 shadow-sm"
                  style={{ backgroundColor: i === 0 ? '#1a5c38' : '#faf8f4' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: i === 0 ? 'rgba(255,255,255,0.18)' : '#edf7f0', color: i === 0 ? '#fff' : '#1a5c38' }}>
                      {card.icon}
                    </div>
                    <h3 className="font-display text-lg font-semibold" style={{ color: i === 0 ? '#fff' : '#1a3a2a' }}>
                      {card.label}
                    </h3>
                  </div>
                  <p className={`font-body text-sm leading-relaxed ${i === 0 ? 'text-white/85' : 'text-gray-600'}`}>
                    {card.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE OFFER ── */}
      <section className="w-full texture-bg py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#1a5c38' }}>{t('about.offerings.tag')}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: '#1a3a2a' }}>{t('about.offerings.title')}</h2>
            <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: '#1a5c38' }} />
            <p className="font-body text-gray-500 text-[15px] mt-4 max-w-xl mx-auto leading-relaxed">{t('about.offerings.subtitle')}</p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {offerings.map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-4 group hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#edf7f0', color: '#1a5c38' }}>
                  {item.icon}
                </div>
                <h3 className="font-display text-[17px] font-semibold leading-snug" style={{ color: '#1a3a2a' }}>{item.title}</h3>
                <p className="font-body text-sm text-gray-500 leading-relaxed flex-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section id="equipe" className="w-full bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div {...fadeUp()} className="mb-12">
            <p className="font-body text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#1a5c38' }}>{t('about.team.tag')}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: '#1a3a2a' }}>{t('about.team.title')}</h2>
            <div className="w-12 h-0.5 mt-4" style={{ backgroundColor: '#1a5c38' }} />
          </motion.div>

          <div className="flex flex-col gap-10">
            {/* Row 1 — 3 membres */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.slice(0, 3).map((member, i) => (
                <TeamCard key={i} member={member} index={i} t={t} />
              ))}
            </div>
            {/* Row 2 — 2 membres centrés */}
            <div className="grid sm:grid-cols-2 gap-8 lg:w-2/3 mx-auto">
              {team.slice(3).map((member, i) => (
                <TeamCard key={i + 3} member={member} index={i + 3} t={t} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="w-full relative overflow-hidden py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 60%, #0a2a18 100%)' }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <span className="float-med  select-none pointer-events-none absolute top-6    left-[5%]  font-display text-7xl font-bold opacity-[0.06] text-white">∮</span>
        <span className="float-slow select-none pointer-events-none absolute bottom-6 right-[8%] font-display text-6xl font-bold opacity-[0.06] text-white">θ</span>

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <motion.p {...fadeUp()} className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-4">
            {t('about.cta.tag')}
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {t('about.cta.title').split('\n').map((line, i) => (
              <React.Fragment key={i}>{line}{i === 0 && <br className="hidden sm:block" />}</React.Fragment>
            ))}
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-body text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {t('about.cta.subtitle')}
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="font-body inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-gray-800 transition-colors hover:bg-white" style={{ backgroundColor: '#e8e2d4' }}>
              {t('about.cta.contact')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </a>
            <a href="https://www.helloasso.com/associations/terangamath/formulaires/1" className="font-body inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-white border-2 border-white/30 hover:bg-white/10 transition-colors">
              {t('about.cta.donate')}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── TEAM CARD ─────────────────────────────────────────────────────────────────
function TeamCard({ member, index, t }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="group flex flex-col items-center text-center px-6 pt-8 pb-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 bg-white overflow-hidden"
    >
      {/* Photo cercle */}
      <div className="relative mb-5 flex-shrink-0" style={{ width: '140px', height: '140px' }}>
        {/* Anneau décoratif */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-300 group-hover:scale-105"
          style={{ border: '3px solid #1a5c38', opacity: 0.25 }}
        />
        {/* Photo */}
        <div className="absolute inset-[5px] rounded-full overflow-hidden bg-gray-100">
          <img
            src={member.photo}
            alt={t(member.nameKey)}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={e => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback initiales */}
          <div
            className="w-full h-full items-center justify-center text-white text-xl font-display font-bold"
            style={{ backgroundColor: '#1a5c38', display: 'none' }}
          >
            {member.initials}
          </div>
        </div>
      </div>

      {/* Infos fixes */}
      <h3 className="font-display text-[16px] font-semibold leading-snug mb-1" style={{ color: '#1a3a2a' }}>
        {t(member.nameKey)}
      </h3>
      <p className="font-body text-xs font-semibold mb-0.5" style={{ color: '#1a5c38' }}>
        {t(member.roleKey)}
      </p>
      <p className="font-body text-xs text-gray-400 mb-0">
        {t(member.subKey)}
      </p>

      {/* Bio — slide down au hover */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: '0px' }}
        ref={el => {
          if (!el) return;
          const card = el.closest('.group');
          const show = () => { el.style.maxHeight = el.scrollHeight + 'px'; el.style.marginTop = '12px'; };
          const hide = () => { el.style.maxHeight = '0px'; el.style.marginTop = '0px'; };
          card.addEventListener('mouseenter', show);
          card.addEventListener('mouseleave', hide);
        }}
      >
        <div
          className="rounded-xl px-4 py-3 text-left"
          style={{ backgroundColor: '#f0f7f3', borderLeft: '3px solid #1a5c38' }}
        >
          <p className="font-body text-xs text-gray-600 leading-relaxed">
            {t(member.bioKey)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}