import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import atelier from '../../assets/others/atelier.avif';
import team from '../../assets/others/OMF_math_Senegal-1.avif';
import instapost from '../../assets/others/Instagram-post-16.avif';
import conference from '../../assets/others/sans-titre-6911-scaled.avif';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { POSTS } from '../blog/Blog';
import animath from '../../assets/partners/animath.png';
import logo from '../../assets/logo/tm.png';
import ansts from '../../assets/partners/ANSTS.jpg';
import caci from '../../assets/partners/CaCI.png';
import forcen from '../../assets/partners/ForceN.webp';
import afr from '../../assets/partners/afr.jpg';
import mafally from '../../assets/gallery/student.jpeg';
import hero1 from '../../assets/hero/hero1.jpg';
import hero2 from '../../assets/hero/hero2.jpg';
import hero3 from '../../assets/hero/hero3.jpg';
import hero4 from '../../assets/hero/hero4.jpg';
import hero5 from '../../assets/hero/hero5.jpg';

export default function Home() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState({ olympiades: false, vulgarisation: false });
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const toggle = (id) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const pillars = [
    {
      id: 'olympiades',
      href: '/actions#olympiades',
      src: hero2,
      title: t('home.pillars.olympiades.title'),
      desc: t('home.pillars.olympiades.desc'),
      cta: t('home.pillars.olympiades.cta'),
      expandTitle: t('home.pillars.olympiades.expand_title'),
      expandText: t('home.pillars.olympiades.expand_text'),
      highlights: [
        t('home.pillars.olympiades.h1'),
        t('home.pillars.olympiades.h2'),
        t('home.pillars.olympiades.h3'),
      ],
      icon: <path d="M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4 20v-1a8 8 0 0 1 16 0v1H4zm2.06-2h11.88A6 6 0 0 0 6.06 18z"/>,
      filled: true,
    },
    {
      id: 'vulgarisation',
      href: '/actions#vulgarisation',
      src: instapost,
      title: t('home.pillars.vulgarisation.title'),
      desc: t('home.pillars.vulgarisation.desc'),
      cta: t('home.pillars.vulgarisation.cta'),
      expandTitle: t('home.pillars.vulgarisation.expand_title'),
      expandText: t('home.pillars.vulgarisation.expand_text'),
      highlights: [
        t('home.pillars.vulgarisation.h1'),
        t('home.pillars.vulgarisation.h2'),
        t('home.pillars.vulgarisation.h3'),
      ],
      icon: <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
      filled: false,
    },
  ];

  const stats = [
    { value: t('home.stats.s1_value'), label: t('home.stats.s1_label') },
    { value: t('home.stats.s2_value'), label: t('home.stats.s2_label') },
    { value: t('home.stats.s3_value'), label: t('home.stats.s3_label') },
    { value: t('home.stats.s4_value'), label: t('home.stats.s4_label'), trophy: true },
  ];

  const partners = [
    { name: 'POFM — Préparation Olympique',  src: 'https://maths-olympiques.fr/wp-content/uploads/2017/11/logo-transparent.png' },
    { name: 'Animath',                        src: animath },
    { name: 'ADAM-Maths — Djibouti',         src: 'https://lh3.googleusercontent.com/sitesv/APaQ0STxOooNuAQD7qmbWuXUst6bNsFap-2Dgh9nfgcc9Bw94KDlCOTbiTHz4xXXweQMEStq-XOyUQpsLQr93e8sZ_n8RF2EOG1oX-XvHl1CUv7wO0eJxQfbIDrPjnwhOGfRU-Sr2zP0GkSnJO4TYYbCqaJL7nqvmGdA3O2hTm5DH7sv4RA4G0vHbc4whSA=w16383' },
    { name: 'ForceN',                         src: forcen },
  ];

  const recentArticles = POSTS.slice(0, 3);

  const testimonials = [
    {
      name: 'Mafally THIAM',
      role: t('home.testimonials.role1'),
      avatar: mafally,
      text: t('home.testimonials.t1'),
    },
    // {
    //   name: t('home.testimonials.name2'),
    //   role: t('home.testimonials.role2'),
    //   avatar: conference,
    //   text: t('home.testimonials.t2'),
    // },
    // {
    //   name: t('home.testimonials.name3'),
    //   role: t('home.testimonials.role3'),
    //   avatar: atelier,
    //   text: t('home.testimonials.t3'),
    // },
  ];

  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length);

  const CAT_COLORS = {
    olympiades:    '#1a5c38',
    vulgarisation: '#6c3aad',
  };

  return (
    <div className="flex w-full flex-col" style={{ fontFamily: "'Lora', 'Georgia', serif", backgroundColor: '#f5f0e8' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        body { font-family: 'DM Sans', sans-serif; }
        .font-display { font-family: 'Lora', Georgia, serif; }
        .font-body   { font-family: 'DM Sans', sans-serif; }
        .texture-bg {
          background-color: #f0ebe0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
        }
        .hero-bg {
          background-color: #ede8db;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .inclusion-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 13px; border-radius: 999px;
          font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500; letter-spacing: 0.01em;
        }
        @keyframes marquee-photos {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-photos { animation: marquee-photos 18s linear infinite; display: flex; width: max-content; }
        .marquee-photos:hover { animation-play-state: paused; }
        @keyframes marquee-partners {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-partners { animation: marquee-partners 22s linear infinite; display: flex; width: max-content; align-items: center; }
        .marquee-partners:hover { animation-play-state: paused; }
        .article-card:hover .article-img { transform: scale(1.05); }
        .article-img { transition: transform 0.4s ease; }
        .testimonial-nav-btn { transition: background-color 0.2s, color 0.2s; }
        .testimonial-nav-btn:hover { background-color: #1a5c38 !important; color: #fff !important; }
      `}</style>

      <Header />

      {/* ── HERO ── */}
      <section className="hero-bg w-full overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-16 pb-12 md:pt-20 md:pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="font-display text-4xl sm:text-5xl lg:text-[3.2rem] xl:text-[3.6rem] font-bold leading-[1.15] tracking-tight mb-6"
                style={{ color: '#1a3a2a' }}
              >
                {t('home.hero.title')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="font-body text-base sm:text-lg text-gray-600 leading-relaxed mb-10 max-w-md"
              >
                {t('home.hero.subtitle')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#actions" className="font-body px-6 py-3 rounded-lg font-semibold text-[15px] text-white shadow-md hover:shadow-lg transition-all hover:opacity-90" style={{ backgroundColor: '#1a5c38' }}>
                  {t('home.hero.cta_actions')}
                </a>
                <a href="/events" className="font-body px-6 py-3 rounded-lg font-semibold text-[15px] border-2 text-gray-800 bg-white hover:bg-gray-50 transition-all shadow-sm" style={{ borderColor: '#1a5c38' }}>
                  Actualités
                </a>
              </motion.div>
            </motion.div>

            {/* Mobile carousel */}
            <div className="lg:hidden w-full overflow-hidden pb-6 -mx-6" style={{ width: 'calc(100% + 3rem)' }}>
              <div className="relative">
                <div className="absolute left-0 top-0 bottom-0 w-10 z-10 pointer-events-none" style={{ background: 'linear-gradient(to right, #ede8db, transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-10 z-10 pointer-events-none" style={{ background: 'linear-gradient(to left, #ede8db, transparent)' }} />
                <div className="marquee-photos py-3 px-2" style={{ gap: '1rem' }}>
                  {[...[hero5, hero1, hero2, hero3, hero4], ...[conference, hero1, hero2, atelier, instapost]].map((img, i) => (
                    <div key={i} className="bg-white shadow-md rounded-sm flex-shrink-0" style={{ width: '150px', padding: '6px 6px 20px 6px', transform: `rotate(${[-3,4,-2,5,-4,-3,4,-2,5,-4][i%10]}deg)`, marginTop: [0,10,4,12,2,0,10,4,12,2][i%10] }}>
                      <div className="w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                        <img src={img} alt="" className="w-full h-full object-cover" draggable="false" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop scatter */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="hidden lg:block relative h-[500px] xl:h-[560px] w-full">
              {[
                { src: hero2, alt: 'Conference', s: { width:'52%', top:'1%',    left:'0%',  zIndex:2 }, i: { opacity:0, y:-30, rotate:-12 },    a: { opacity:1, y:0,  rotate:-8  }, h: { scale:1.07, rotate:-5  }, d:0.25 },
                { src: hero1,      alt: 'Maths',      s: { width:'42%', top:'0%',    right:'0%', zIndex:3 }, i: { opacity:0, x:40,  rotate:18  },    a: { opacity:1, x:0,  rotate:12  }, h: { scale:1.07, rotate:8   }, d:0.38 },
                { src: hero2,      alt: 'Olympiades', s: { width:'54%', top:'26%',   left:'22%', zIndex:6 }, i: { opacity:0, scale:0.8, rotate:5 },  a: { opacity:1, scale:1, rotate:-3 }, h: { scale:1.08, rotate:0  }, d:0.5  },
                { src: hero3,    alt: 'Atelier',    s: { width:'45%', bottom:'0%', left:'3%',  zIndex:4 }, i: { opacity:0, y:40,  rotate:14  },    a: { opacity:1, y:0,  rotate:9   }, h: { scale:1.07, rotate:12  }, d:0.62 },
                { src: hero5,  alt: 'Team',       s: { width:'43%', bottom:'3%', right:'1%', zIndex:5 }, i: { opacity:0, x:30,  rotate:-16 },    a: { opacity:1, x:0,  rotate:-11 }, h: { scale:1.07, rotate:-8  }, d:0.74 },
              ].map((c, idx) => (
                <motion.div key={idx} initial={c.i} animate={c.a} transition={{ duration:0.6, delay:c.d, type:'spring', stiffness:110 }} whileHover={{ ...c.h, zIndex:20, transition:{duration:0.2} }} className="absolute bg-white p-2 pb-8 shadow-xl rounded-sm cursor-pointer" style={c.s}>
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={c.src} alt={c.alt} className="w-full h-full object-cover" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NOS DEUX PILIERS ── */}
      <section id="actions" className="w-full py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.h2
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6 }}
            className="font-display text-3xl sm:text-4xl font-bold text-center mb-3"
            style={{ color:'#1a3a2a' }}
          >
            {t('home.pillars.section_title')}
          </motion.h2>
          <div className="w-16 h-0.5 mx-auto mb-10" style={{ backgroundColor:'#1a5c38' }} />

          <div className="grid md:grid-cols-2 gap-5 lg:gap-7 items-start">
            {pillars.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.1+0.1 }}
                className="rounded-2xl overflow-hidden shadow-xl flex flex-col"
                style={{ backgroundColor:'#1d5c3a' }}
              >
                <div className="relative overflow-hidden flex-shrink-0" style={{ height:'240px' }}>
                  <img src={card.src} alt={card.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor:'rgba(255,255,255,0.18)', backdropFilter:'blur(4px)' }}>
                      <svg className="w-4 h-4 text-white" fill={card.filled ? 'currentColor' : 'none'} stroke={card.filled ? undefined : 'currentColor'} strokeWidth={card.filled ? undefined : '2'} viewBox="0 0 24 24">
                        {card.icon}
                      </svg>
                    </div>
                    <span className="font-display text-[17px] font-bold text-white drop-shadow">{card.title}</span>
                  </div>
                </div>

                <div className="p-6 pb-5">
                  <p className="font-body text-white/90 text-[15px] leading-relaxed mb-5">{card.desc}</p>
                  <button
                    onClick={() => toggle(card.id)}
                    className="font-body inline-flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold text-white w-fit transition-colors"
                    style={{ border:'1.5px solid rgba(255,255,255,0.45)' }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    {expanded[card.id] ? t('home.pillars.reduce') : card.cta}
                    <motion.svg
                      animate={{ rotate: expanded[card.id] ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </motion.svg>
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {expanded[card.id] && (
                    <motion.div
                      key="expand"
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="mx-5 mb-6 rounded-xl p-5" style={{ backgroundColor: 'rgba(0,0,0,0.18)' }}>
                        <p className="font-display text-[15px] font-semibold text-white mb-3">{card.expandTitle}</p>
                        <p className="font-body text-white/80 text-sm leading-relaxed mb-5">{card.expandText}</p>
                        <div className="flex flex-col gap-2.5">
                          {card.highlights.map((h, k) => (
                            <div key={k} className="flex items-start gap-2.5">
                              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#7dd3a8' }} fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                              <span className="font-body text-xs text-white/75 leading-snug">{h}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                          <Link
                            to={card.href}
                            className="font-body inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-all"
                            style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.28)'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
                          >
                            {t('home.pillars.see_full')}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="w-full pb-16 md:pb-20 bg-white">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="bg-white rounded-2xl shadow-md px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-100">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:i*0.1 }} className="text-center px-2">
                <div className="flex items-center justify-center gap-1 mb-1">
                  {stat.trophy && (
                    <svg className="w-5 h-5" style={{ color:'#c5a028' }} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V11C21 13.2091 19.2091 15 17 15C16.2885 15.3476 15.3702 15.6691 14.3372 15.8805C13.5385 16.0434 13 16.7434 13 17.5556V19H15C15.5523 19 16 19.4477 16 20V22H8V20C8 19.4477 8.44772 19 9 19H11V17.5556C11 16.7434 10.4615 16.0434 9.6628 15.8805C8.6298 15.6691 7.7115 15.3476 7 15C4.79086 15 3 13.2091 3 11V4.9934C3 4.44495 3.44481 4 3.9934 4H7ZM5 6V11C5 12.1046 5.89543 13 7 13V6H5ZM17 13C18.1046 13 19 12.1046 19 11V6H17V13Z"/>
                    </svg>
                  )}
                  <span className="font-display text-3xl sm:text-4xl font-bold" style={{ color:'#1a5c38' }}>{stat.value}</span>
                </div>
                <p className="font-body text-xs sm:text-sm text-gray-500 leading-snug">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity:0, y:15 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.3 }} className="flex flex-wrap justify-center gap-4 mt-8">
            <a href="#actions" className="font-body px-6 py-3 rounded-lg font-semibold text-[15px] text-white shadow-md hover:opacity-90 transition-all" style={{ backgroundColor:'#1a5c38' }}>
              {t('home.stats.cta_actions')}
            </a>
            <a href="https://www.helloasso.com/associations/terangamath/formulaires/1" className="font-body px-6 py-3 rounded-lg font-semibold text-[15px] border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
              {t('home.stats.cta_don')}
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── INCLUSION & ÉGALITÉ DE GENRE ── */}
      <section className="w-full py-16 md:py-24 texture-bg">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="mb-12">
            <p className="font-body text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color:'#1a5c38' }}>{t('home.inclusion.tag')}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight" style={{ color:'#1a3a2a' }}>{t('home.inclusion.title')}</h2>
            <div className="w-12 h-0.5 mt-4" style={{ backgroundColor:'#1a5c38' }} />
          </motion.div>

          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7, delay:0.1 }} className="rounded-2xl overflow-hidden shadow-xl bg-white">
            <div className="grid lg:grid-cols-5">
              <div className="lg:col-span-2 relative overflow-hidden" style={{ minHeight:'280px' }}>
                <img src={atelier} alt="Inclusion" className="absolute inset-0 w-full h-full object-cover" />
                <div className="lg:hidden absolute inset-0" style={{ background:'linear-gradient(to bottom, transparent 55%, #fff 100%)' }} />
                <motion.div initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.45 }} className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-xl px-4 py-2.5 shadow-lg" style={{ backgroundColor:'#1a5c38' }}>
                  <svg className="w-5 h-5 text-white flex-shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4a6 6 0 1 1 0 12A6 6 0 0 1 12 4zm0-2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm-1 9v7h2v-7h3l-4-4-4 4h3z"/></svg>
                  <span className="font-body text-white text-xs font-semibold leading-tight">{t('home.inclusion.badge').split(' ')[0]}<br />{t('home.inclusion.badge').split(' ').slice(1).join(' ')}</span>
                </motion.div>
              </div>

              <div className="lg:col-span-3 flex flex-col justify-center px-7 py-8 lg:px-10 lg:py-12">
                <motion.div initial={{ opacity:0, x:15 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }} className="flex flex-wrap gap-2 mb-6">
                  {[
                    { label: t('home.inclusion.pill1'), bg:'#edf7f0', color:'#1a5c38', d:'M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4z' },
                    { label: t('home.inclusion.pill2'), bg:'#fdf6e3', color:'#8a6500', d:'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
                    { label: t('home.inclusion.pill3'), bg:'#f0f4ff', color:'#2c4a8f', d:'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z' },
                  ].map((pill, i) => (
                    <span key={i} className="inclusion-pill" style={{ backgroundColor:pill.bg, color:pill.color }}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d={pill.d}/></svg>
                      {pill.label}
                    </span>
                  ))}
                </motion.div>

                <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.28 }} className="font-body text-gray-600 text-[15px] sm:text-base leading-relaxed mb-8">
                  {t('home.inclusion.text')}{' '}
                  <span className="font-semibold" style={{ color:'#1a3a2a' }}>{t('home.inclusion.text_strong')}</span>
                  {t('home.inclusion.text_end')}
                </motion.p>

                <motion.div initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.55, delay:0.38 }} className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { label: t('home.inclusion.card1'), d:'M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z' },
                    { label: t('home.inclusion.card2'), d:'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z' },
                    { label: t('home.inclusion.card3'), d:'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z' },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl p-4 text-center" style={{ backgroundColor:'#f0ebe0' }}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor:'#1a5c38', color:'white' }}>
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d={item.d}/></svg>
                      </div>
                      <p className="font-body text-[11px] sm:text-xs text-gray-600 leading-snug font-medium">{item.label}</p>
                    </div>
                  ))}
                </motion.div>

                <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ duration:0.5, delay:0.48 }}>
                  <a href="#" className="font-body inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all" style={{ backgroundColor:'#1a5c38' }}>
                    {t('home.inclusion.cta')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/></svg>
                  </a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Quote */}
          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:0.35 }} className="mt-8 rounded-xl px-7 py-6 flex items-start gap-5" style={{ backgroundColor:'rgba(26,92,56,0.08)', borderLeft:'4px solid #1a5c38' }}>
            <svg className="flex-shrink-0 mt-0.5" width="28" height="22" viewBox="0 0 28 22" fill="none">
              <path d="M0 22V13.2C0 9.07 1.08 5.87 3.24 3.6 5.44 1.2 8.6 0 12.72 0v4.08C10.56 4.08 8.92 4.72 7.8 6c-.96 1.12-1.48 2.72-1.56 4.8H11V22H0zm17 0V13.2c0-4.13 1.08-7.33 3.24-9.6C22.44 1.2 25.6 0 29.72 0v4.08c-2.16 0-3.8.64-4.92 1.92-.96 1.12-1.48 2.72-1.56 4.8H28V22H17z" fill="#1a5c38" fillOpacity="0.25"/>
            </svg>
            <p className="font-display italic text-base sm:text-lg leading-relaxed" style={{ color:'#1a3a2a' }}>
              {t('home.inclusion.quote')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="w-full py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-[0.18em] uppercase mb-3" style={{ color:'#1a5c38' }}>{t('home.testimonials.tag')}</p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color:'#1a3a2a' }}>{t('home.testimonials.title')}</h2>
            <div className="w-12 h-0.5 mt-4 mx-auto" style={{ backgroundColor:'#1a5c38' }} />
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonialIndex}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="rounded-2xl bg-white shadow-md border border-gray-100 px-8 py-10 md:px-12 md:py-12"
              >
                <div className="flex flex-col sm:flex-row items-start gap-8">

                  {/* Photo cercle */}
                  <div className="flex-shrink-0 mx-auto sm:mx-0">
                    <div
                      className="rounded-full overflow-hidden border-4"
                      style={{ width: '125px', height: '125px', borderColor: '#1a5c38' }}
                    >
                      <img
                        src={testimonials[testimonialIndex].avatar}
                        alt={testimonials[testimonialIndex].name}
                        className="w-full h-full object-cover  object-top"
                      />
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-col flex-1">
                    {/* Guillemets verts */}
                    <svg className="mb-4" width="36" height="28" viewBox="0 0 36 28" fill="none">
                      <path d="M0 28V16.8C0 11.29 1.38 7.14 4.14 4.32 6.94 1.44 11.02 0 16.38 0v5.22c-2.77 0-4.86.83-6.27 2.48C8.95 9.04 8.3 11.36 8.2 14.4H14V28H0zm22 0V16.8c0-5.51 1.38-9.66 4.14-12.48C28.94 1.44 33.02 0 38.38 0v5.22c-2.77 0-4.86.83-6.27 2.48-1.16 1.34-1.81 3.66-1.91 6.7H36V28H22z" fill="#1a5c38" fillOpacity="0.9"/>
                    </svg>

                    {/* Texte */}
                    <p className="font-body text-gray-600 text-[15px] leading-relaxed mb-6">
                      {testimonials[testimonialIndex].text}
                    </p>

                    {/* Étoiles vertes */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, k) => (
                        <svg key={k} className="w-4 h-4" viewBox="0 0 20 20" fill="#1a5c38">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>

                    {/* Nom + rôle + flèches */}
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="font-body font-bold text-[15px]" style={{ color: '#1a3a2a' }}>
                          {testimonials[testimonialIndex].name}
                        </p>
                        <p className="font-body text-sm text-gray-400">
                          {testimonials[testimonialIndex].role}
                        </p>
                      </div>

                      {/* Boutons « » */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={prevTestimonial}
                          className="testimonial-nav-btn w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold"
                          style={{ borderColor: '#1a5c38', color: '#1a5c38', backgroundColor: 'transparent' }}
                        >
                          «
                        </button>
                        <button
                          onClick={nextTestimonial}
                          className="testimonial-nav-btn w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-bold"
                          style={{ borderColor: '#1a5c38', color: '#1a5c38', backgroundColor: 'transparent' }}
                        >
                          »
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className="rounded-full transition-all"
                  style={{
                    width: i === testimonialIndex ? '24px' : '8px',
                    height: '8px',
                    backgroundColor: i === testimonialIndex ? '#1a5c38' : '#d1d5db',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARTICLES RÉCENTS ── */}
      <section className="w-full py-16 md:py-20 texture-bg">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="flex items-end justify-between mb-10">
            <div>
              <p className="font-body text-xs font-semibold tracking-[0.18em] uppercase mb-2" style={{ color:'#1a5c38' }}>{t('home.blog.tag')}</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold" style={{ color:'#1a3a2a' }}>{t('home.blog.title')}</h2>
              <div className="w-12 h-0.5 mt-4" style={{ backgroundColor:'#1a5c38' }} />
            </div>
            <Link to="/actualite/blog" className="hidden md:inline-flex items-center gap-2 font-body text-sm font-semibold transition-colors hover:opacity-70" style={{ color:'#1a5c38' }}>
              {t('home.blog.see_all')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {recentArticles.map((post, i) => (
              <motion.div
                key={post.id}
                initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
                viewport={{ once:true }} transition={{ duration:0.6, delay:i*0.1 }}
              >
                <Link
                  to={`/actualite/blog/${post.slug}`}
                  className="article-card group flex flex-col rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow h-full"
                >
                  <div className="relative overflow-hidden" style={{ height: '200px' }}>
                    <img src={post.image} alt={t(post.titleKey)} className="article-img w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <span
                      className="absolute top-3 left-3 font-body text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full text-white"
                      style={{ backgroundColor: CAT_COLORS[post.category] || '#1a5c38' }}
                    >
                      {t(`blog.cat.${post.category}`)}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <p className="font-body text-xs text-gray-400 mb-2">{post.date}</p>
                    <h3 className="font-display font-bold text-[16px] leading-snug mb-3 group-hover:text-[#1a5c38] transition-colors flex-1" style={{ color: '#1a3a2a' }}>
                      {t(post.titleKey)}
                    </h3>
                    <p className="font-body text-sm text-gray-500 leading-relaxed mb-4 line-clamp-3">
                      {t(post.excerptKey)}
                    </p>
                    <span className="font-body inline-flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color:'#1a5c38' }}>
                      {t('home.blog.read_more')}
                      <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 flex justify-center md:hidden">
            <Link to="/actualite/blog" className="font-body inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ backgroundColor:'#1a5c38' }}>
              {t('home.blog.see_all')}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── PARTENAIRES ── */}
      <section className="w-full relative overflow-hidden" style={{ minHeight:'320px' }}>
        <div className="absolute inset-0">
          <img src={team} alt="TerangaMath team" className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ backgroundColor:'rgba(10,40,22,0.72)' }} />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-16">
          <motion.h2 initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} className="font-display text-3xl sm:text-4xl font-bold text-white text-center mb-10">
            {t('home.partners.title')}
          </motion.h2>
          <div className="relative overflow-hidden w-full">
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background:'linear-gradient(to right, rgba(10,40,22,0.72), transparent)' }} />
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none" style={{ background:'linear-gradient(to left, rgba(10,40,22,0.72), transparent)' }} />
            <div className="marquee-partners" style={{ gap: '2rem' }}>
              {[...partners, ...partners].map((partner, i) => (
                <div key={i} className="bg-white rounded-xl px-5 py-4 flex items-center justify-center shadow-lg flex-shrink-0" style={{ height:'80px', minWidth:'140px' }}>
                  <img src={partner.src} alt={partner.name} className="max-h-12 max-w-[140px] w-auto object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}