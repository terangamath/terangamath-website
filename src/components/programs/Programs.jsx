import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import image1 from '../../assets/programs/Instagram-post-22.png'
import image2 from '../../assets/programs/Instagram-post-20.png'
import image3 from '../../assets/programs/Instagram-post-17.png'
import image4 from '../../assets/programs/Instagram-post-8.png'

const programIds = ['olympiades', 'clubs', 'videos', 'alkindi'];

const programMeta = {
  olympiades: {
    photo: image3,
    tagColor: '#c5a028', tagBg: '#fdf6e3',
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V11C21 13.2091 19.2091 15 17 15C16.2885 15.3476 15.3702 15.6691 14.3372 15.8805C13.5385 16.0434 13 16.7434 13 17.5556V19H15C15.5523 19 16 19.4477 16 20V22H8V20C8 19.4477 8.44772 19 9 19H11V17.5556C11 16.7434 10.4615 16.0434 9.6628 15.8805C8.6298 15.6691 7.7115 15.3476 7 15C4.79086 15 3 13.2091 3 11V4.9934C3 4.44495 3.44481 4 3.9934 4H7ZM5 6V11C5 12.1046 5.89543 13 7 13V6H5ZM17 13C18.1046 13 19 12.1046 19 11V6H17V13Z"/>
      </svg>
    ),
  },
  clubs: {
    photo: image1,
    tagColor: '#1a5c38', tagBg: '#edf7f0',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
      </svg>
    ),
  },
  videos: {
    photo: image4,
    tagColor: '#2c4a8f', tagBg: '#f0f4ff',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
      </svg>
    ),
  },
  alkindi: {
    photo: image2,
    tagColor: '#7c3aed', tagBg: '#f5f3ff',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
      </svg>
    ),
  },
};

const testimonialColors = ['#1a5c38', '#c5a028', '#2c4a8f'];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, delay },
});

export default function Programs() {
  const { t } = useTranslation();
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = t('programs.testimonials.items', { returnObjects: true });

  const programs = programIds.map((id) => ({
    id,
    tag: t(`programs.items.${id}.tag`),
    title: t(`programs.items.${id}.title`),
    desc: t(`programs.items.${id}.desc`),
    highlight: t(`programs.items.${id}.highlight`),
    ...programMeta[id],
  }));

  const prev = () => setActiveTestimonial((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setActiveTestimonial((i) => (i + 1) % testimonials.length);

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
        @keyframes float-slow { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-14px) rotate(4deg); } }
        @keyframes float-med  { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-3deg); } }
        .float-slow { animation: float-slow 7s ease-in-out infinite; }
        .float-med  { animation: float-med  5s ease-in-out infinite; }
        .program-img { transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94); }
        .program-img:hover { transform: scale(1.04); }
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
        <span className="float-med  select-none pointer-events-none absolute bottom-4 left-[42%]  font-display text-3xl font-bold opacity-[0.05] text-white">Δ</span>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-16 md:py-24">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
            {t('programs.hero.tag')}
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }} className="font-display text-4xl sm:text-5xl lg:text-[3.2rem] font-bold text-white leading-tight max-w-2xl">
            {t('programs.hero.title')}
          </motion.h1>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.22 }} className="font-body text-white/70 text-base mt-4 max-w-xl leading-relaxed">
            {t('programs.hero.subtitle')}
          </motion.p>

          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.35 }} className="flex flex-wrap gap-2 mt-8">
            {programs.map((p) => (
              <a key={p.id} href={`#${p.id}`}
                className="font-body text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.85)' }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.22)'; }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'; }}
              >
                {p.title}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROGRAMS ── */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col gap-24">
          {programs.map((program, i) => {
            const isEven = i % 2 === 0;
            return (
              <div key={program.id} id={program.id} className="scroll-mt-24">
                <motion.div
                  {...fadeUp(0.05)}
                  className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${isEven ? '' : 'lg:[direction:rtl]'}`}
                >
                  <div className={`relative rounded-2xl overflow-hidden shadow-xl ${isEven ? '' : 'lg:[direction:ltr]'}`} style={{ aspectRatio: '4/3' }}>
                    <img src={program.photo} alt={program.title} className="program-img w-full h-full object-cover" />
                  </div>

                  <div className={isEven ? '' : 'lg:[direction:ltr]'}>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold leading-tight mb-4" style={{ color: '#1a3a2a' }}>
                      {program.title}
                    </h2>
                    <p className="font-body text-gray-600 text-[15px] leading-relaxed mb-6">{program.desc}</p>

                    <div className="flex items-center gap-3 rounded-xl px-4 py-3 mb-7" style={{ backgroundColor: 'rgba(26,92,56,0.07)', borderLeft: '3px solid #1a5c38' }}>
                      <svg className="w-4 h-4 flex-shrink-0" style={{ color: '#1a5c38' }} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <p className="font-body text-sm font-medium" style={{ color: '#1a3a2a' }}>{program.highlight}</p>
                    </div>

                    <a href="/contact" className="font-body inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-[15px] text-white shadow-sm hover:opacity-90 active:scale-95 transition-all" style={{ backgroundColor: '#1a5c38' }}>
                      {t('programs.cta_join')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>
                {i < programs.length - 1 && <div className="mt-24 h-px bg-gray-100" />}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section className="w-full texture-bg py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <motion.div {...fadeUp()} className="bg-white rounded-2xl shadow-md px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {['s1','s2','s3','s4'].map((key, i) => (
              <motion.div key={i} {...fadeUp(i * 0.1)} className="text-center px-2">
                <div className="font-display text-3xl sm:text-4xl font-bold mb-1" style={{ color: '#1a5c38' }}>
                  {t(`programs.stats.${key}_value`)}
                </div>
                <p className="font-body text-xs sm:text-sm text-gray-500 leading-snug">{t(`programs.stats.${key}_label`)}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="w-full bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color: '#1a5c38' }}>
              {t('programs.testimonials.tag')}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color: '#1a3a2a' }}>
              {t('programs.testimonials.title')}
            </h2>
            <div className="w-12 h-0.5 mx-auto mt-4" style={{ backgroundColor: '#1a5c38' }} />
          </motion.div>

          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-20 }}
                transition={{ duration:0.4 }}
                className="rounded-2xl p-8 sm:p-10 shadow-md text-center"
                style={{ backgroundColor: '#faf8f4' }}
              >
                <svg className="mx-auto mb-5" width="36" height="28" viewBox="0 0 36 28" fill="none">
                  <path d="M0 28V16.8C0 11.55 1.38 7.48 4.14 4.59 6.94 1.53 11 0 16.38 0v5.21C13.5 5.21 11.41 6.02 10 7.65c-1.23 1.43-1.9 3.48-2 6.14H14V28H0zm22 0V16.8c0-5.28 1.38-9.35 4.14-12.21C28.94 1.53 33 0 38.38 0v5.21c-2.88 0-4.97.81-6.38 2.44-1.23 1.43-1.9 3.48-2 6.14H36V28H22z"
                    fill="#1a5c38" fillOpacity="0.18"/>
                </svg>
                <p className="font-display italic text-lg sm:text-xl leading-relaxed mb-8" style={{ color: '#1a3a2a' }}>
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-body font-bold text-sm text-white flex-shrink-0" style={{ backgroundColor: testimonialColors[activeTestimonial] }}>
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div className="text-left">
                    <p className="font-body font-semibold text-sm text-gray-800">{testimonials[activeTestimonial].name}</p>
                    <p className="font-body text-xs text-gray-400">{testimonials[activeTestimonial].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-6">
              <button onClick={prev} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-green-700 hover:text-green-700 transition-colors bg-white shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/></svg>
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)} className="rounded-full transition-all"
                    style={{ width: i === activeTestimonial ? '24px' : '8px', height: '8px', backgroundColor: i === activeTestimonial ? '#1a5c38' : '#d1d5db' }}
                  />
                ))}
              </div>
              <button onClick={next} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-green-700 hover:text-green-700 transition-colors bg-white shadow-sm">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="w-full relative overflow-hidden py-20 md:py-28" style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 60%, #0a2a18 100%)' }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <span className="float-med select-none pointer-events-none absolute top-6    left-[5%]  font-display text-7xl font-bold opacity-[0.06] text-white">∮</span>
        <span className="float-slow select-none pointer-events-none absolute bottom-6 right-[8%] font-display text-6xl font-bold opacity-[0.06] text-white">θ</span>

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <motion.p {...fadeUp()} className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-4">
            {t('programs.cta_band.tag')}
          </motion.p>
          <motion.h2 {...fadeUp(0.1)} className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
            {t('programs.cta_band.title')}
          </motion.h2>
          <motion.p {...fadeUp(0.2)} className="font-body text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            {t('programs.cta_band.subtitle')}
          </motion.p>
          <motion.div {...fadeUp(0.3)} className="flex flex-wrap justify-center gap-4">
            <a href="/contact" className="font-body inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-gray-800 transition-colors hover:bg-white" style={{ backgroundColor: '#e8e2d4' }}>
              {t('programs.cta_band.contact')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </a>
            <a href="https://www.helloasso.com/associations/terangamath/formulaires/1" className="font-body inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-[15px] text-white border-2 border-white/30 hover:bg-white/10 transition-colors">
              {t('programs.cta_band.donation')}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}