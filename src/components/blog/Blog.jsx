import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import img1 from '../../assets/others/OMF_math_Senegal-1.jpeg';
import img2 from '../../assets/others/Instagram-post-13.png';
import img3 from '../../assets/others/Instagram-post-14.png';
import img4 from '../../assets/others/sans-titre-6798-768x512.jpg';
import img5 from '../../assets/others/sans-titre-6950-1024x683.jpg';
import img6 from '../../assets/others/ofm-2025-Laureat-1024x1024.jpg';
import img7 from '../../assets/others/sans-titre-6950-1024x683.jpg';

// ── DATA ──────────────────────────────────────────────────────────────────────
export const POSTS = [
  {
    id: 'mtym-maroc',
    slug: 'mtym-maroc',
    category: 'olympiades',
    date: '15 janvier 2026',
    dateISO: '2026-01-15',
    author: 'TerangaMath',
    image: img1,
    featured: true,
    titleKey: 'blog.p5.title',
    excerptKey: 'blog.p5.excerpt',
    readTime: 4,
    content: [
      { type: 'intro',     key: 'blog.p5.intro' },
      { type: 'paragraph', key: 'blog.p5.s1' },
      { type: 'paragraph', key: 'blog.p5.s2' },
      { type: 'paragraph', key: 'blog.p5.s3' },
      { type: 'paragraph', key: 'blog.p5.s4' },
      { type: 'paragraph', key: 'blog.p5.s5' },
    ],
  },
  {
    id: 'camp-ete-aims',
    slug: 'camp-ete-aims',
    category: 'olympiades',
    date: '10 octobre 2025',
    dateISO: '2025-10-10',
    author: 'TerangaMath',
    image: img2,
    featured: false,
    titleKey: 'blog.p4.title',
    excerptKey: 'blog.p4.excerpt',
    readTime: 5,
    content: [
      { type: 'intro',     key: 'blog.p4.intro' },
      { type: 'paragraph', key: 'blog.p4.s1' },
      { type: 'paragraph', key: 'blog.p4.s2' },
      { type: 'paragraph', key: 'blog.p4.s3' },
      { type: 'paragraph', key: 'blog.p4.s4' },
      { type: 'paragraph', key: 'blog.p4.s5' },
      { type: 'paragraph', key: 'blog.p4.s6' },
    ],
  },
  {
    id: 'encadrant-valbonne',
    slug: 'encadrant-valbonne',
    category: 'olympiades',
    date: '5 septembre 2025',
    dateISO: '2025-09-05',
    author: 'TerangaMath',
    image: img3,
    featured: false,
    titleKey: 'blog.p3.title',
    excerptKey: 'blog.p3.excerpt',
    readTime: 4,
    content: [
      { type: 'intro',     key: 'blog.p3.intro' },
      { type: 'paragraph', key: 'blog.p3.s1' },
      { type: 'paragraph', key: 'blog.p3.s2' },
      { type: 'paragraph', key: 'blog.p3.s3' },
      { type: 'paragraph', key: 'blog.p3.s4' },
    ],
  },
  {
    id: 'exposition-comprendre-pour-aimer',
    slug: 'exposition-comprendre-pour-aimer',
    category: 'vulgarisation',
    date: '15 mai 2025',
    dateISO: '2025-05-15',
    author: 'TerangaMath',
    image: img4,
    featured: false,
    titleKey: 'blog.p2.title',
    excerptKey: 'blog.p2.excerpt',
    readTime: 5,
    content: [
      { type: 'intro',     key: 'blog.p2.intro' },
      { type: 'paragraph', key: 'blog.p2.s1' },
      { type: 'paragraph', key: 'blog.p2.s2' },
      { type: 'paragraph', key: 'blog.p2.s3' },
      { type: 'paragraph', key: 'blog.p2.s4' },
      { type: 'paragraph', key: 'blog.p2.s5' },
      { type: 'paragraph', key: 'blog.p2.s6' },
      { type: 'image', src: img5, captionKey: 'blog.p2.img_caption' },
    ],
  },
  {
    id: 'ofm-2025-medailles',
    slug: 'ofm-2025-medailles',
    category: 'olympiades',
    date: '25 mars 2025',
    dateISO: '2025-03-25',
    author: 'TerangaMath',
    image: img1,
    featured: false,
    titleKey: 'blog.p1.title',
    excerptKey: 'blog.p1.excerpt',
    readTime: 5,
    content: [
      { type: 'intro',     key: 'blog.p1.intro' },
      { type: 'paragraph', key: 'blog.p1.s1' },
      { type: 'paragraph', key: 'blog.p1.s2' },
      { type: 'paragraph', key: 'blog.p1.s3' },
      { type: 'paragraph', key: 'blog.p1.s4' },
      { type: 'paragraph', key: 'blog.p1.s5' },
      { type: 'image', src: img6, captionKey: 'blog.p1.img_caption' },
    ],
  },
];

const CATEGORIES = ['all', 'olympiades', 'vulgarisation'];

const CAT_STYLES = {
  olympiades:    { bg: '#edf7f0', color: '#1a5c38' },
  vulgarisation: { bg: '#f4effe', color: '#6c3aad' },
};

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────
export function CategoryBadge({ cat }) {
  const { t } = useTranslation();
  const s = CAT_STYLES[cat] || { bg: '#f0ebe0', color: '#555' };
  return (
    <span className="inline-flex items-center rounded-full font-body font-semibold text-[11px] px-2.5 py-0.5"
      style={{ backgroundColor: s.bg, color: s.color }}>
      {t(`blog.cat.${cat}`)}
    </span>
  );
}

export function ReadTime({ min }) {
  const { t } = useTranslation();
  return (
    <span className="font-body text-[12px] text-gray-400 flex items-center gap-1">
      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
      {min} {t('blog.read_time')}
    </span>
  );
}

function FeaturedPost({ post }) {
  const { t } = useTranslation();
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7 }}
      className="group relative rounded-2xl overflow-hidden shadow-2xl mb-12" style={{ minHeight: '420px' }}>
      <img src={post.image} alt={t(post.titleKey)}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(10,30,18,0.97) 0%, rgba(10,30,18,0.7) 50%, rgba(10,30,18,0.2) 100%)' }} />

      <div className="absolute top-5 left-5">
        <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-body font-bold uppercase tracking-wider"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: '#fff', backdropFilter: 'blur(4px)' }}>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          {t('blog.featured')}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
        <div className="flex items-center gap-3 mb-3 flex-wrap">
          <CategoryBadge cat={post.category} />
          <span className="font-body text-[12px] text-white/60">{post.date}</span>
          <ReadTime min={post.readTime} />
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white leading-tight mb-3 max-w-2xl">
          {t(post.titleKey)}
        </h2>
        <p className="font-body text-white/70 text-sm md:text-base leading-relaxed mb-5 max-w-2xl">
          {t(post.excerptKey)}
        </p>
        <Link to={`/actualite/blog/${post.slug}`}
          className="font-body inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: '#1a5c38', border: '1.5px solid rgba(255,255,255,0.2)' }}>
          {t('blog.read_more')}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

function PostCard({ post, index }) {
  const { t } = useTranslation();
  return (
    <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.55, delay: index * 0.08 }}
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300">
      <div className="relative overflow-hidden flex-shrink-0" style={{ height: '210px' }}>
        <img src={post.image} alt={t(post.titleKey)}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <CategoryBadge cat={post.category} />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-body text-[12px] text-gray-400">{post.date}</span>
          <span className="text-gray-200">·</span>
          <ReadTime min={post.readTime} />
        </div>
        <h3 className="font-display text-[17px] font-bold leading-snug mb-2 flex-1" style={{ color: '#1a3a2a' }}>
          {t(post.titleKey)}
        </h3>
        <p className="font-body text-sm text-gray-500 leading-relaxed mb-5 line-clamp-3">
          {t(post.excerptKey)}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
              style={{ backgroundColor: '#1a5c38' }}>TM</div>
            <span className="font-body text-[12px] text-gray-500">{post.author}</span>
          </div>
          <Link to={`/actualite/blog/${post.slug}`}
            className="font-body inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-70"
            style={{ color: '#1a5c38' }}>
            {t('blog.read_more')}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
            </svg>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function Blog() {
  const { t } = useTranslation();
  const [activeCat, setActiveCat] = useState('all');
  const [email, setEmail]         = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredPost = POSTS.find(p => p.featured && (activeCat === 'all' || activeCat === p.category));
  const otherPosts   = POSTS.filter(p => !p.featured && (activeCat === 'all' || activeCat === p.category));

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
        .line-clamp-3 { display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        @keyframes float-slow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(4deg)} }
        @keyframes float-med  { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-3deg)} }
        .float-slow { animation: float-slow 7s ease-in-out infinite; }
        .float-med  { animation: float-med  5s ease-in-out infinite; }
        .newsletter-input {
          font-family: 'DM Sans', sans-serif; flex:1; padding:11px 16px; border-radius:10px;
          border:1.5px solid rgba(255,255,255,0.25); background:rgba(255,255,255,0.12);
          font-size:14px; color:#fff; outline:none; transition:border-color 0.2s, background 0.2s;
        }
        .newsletter-input::placeholder { color:rgba(255,255,255,0.5); }
        .newsletter-input:focus { border-color:rgba(255,255,255,0.55); background:rgba(255,255,255,0.18); }
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
        <span className="float-slow select-none pointer-events-none absolute top-6 left-[52%] font-display text-2xl font-bold opacity-[0.06] text-white">∫</span>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-14 md:py-20">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
            {t('blog.hero.tag')}
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            {t('blog.hero.title')}
          </motion.h1>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.22 }}
            className="font-body text-white/70 text-base mt-3 max-w-md">
            {t('blog.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="texture-bg w-full flex-1 py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Category filter */}
          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5, delay:0.1 }}
            className="flex items-center gap-2 mb-10 flex-wrap">
            {CATEGORIES.map(val => (
              <button key={val} onClick={() => setActiveCat(val)}
                className="font-body px-4 py-2 rounded-full text-[13px] font-semibold transition-all"
                style={{
                  backgroundColor: activeCat === val ? '#1a3a2a' : '#e8e2d4',
                  color: activeCat === val ? '#fff' : '#555',
                }}>
                {t(`blog.cat.${val}`)}
              </button>
            ))}
            <span className="font-body text-[13px] text-gray-400 ml-2">
              {POSTS.filter(p => activeCat === 'all' || p.category === activeCat).length} {t('blog.articles_count')}
            </span>
          </motion.div>

          {/* Featured */}
          <AnimatePresence mode="wait">
            {featuredPost && (
              <motion.div key={`featured-${activeCat}`} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                <FeaturedPost post={featuredPost} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Grid */}
          <AnimatePresence mode="wait">
            {otherPosts.length > 0 && (
              <motion.div key={`grid-${activeCat}`}
                initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:0.3 }}>
                <h2 className="font-display text-xl font-bold mb-6" style={{ color:'#1a3a2a' }}>
                  {t('blog.other_articles')}
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {otherPosts.map((post, i) => (
                    <PostCard key={post.id} post={post} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state */}
          {!featuredPost && otherPosts.length === 0 && (
            <div className="text-center py-20">
              <p className="font-display text-xl text-gray-400">{t('blog.no_articles')}</p>
            </div>
          )}

          {/* Newsletter */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.2 }}
            className="mt-16 rounded-2xl px-8 py-8 md:py-10"
            style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 100%)' }}>
            <div className="flex flex-col md:flex-row md:items-center gap-7">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{t('blog.newsletter.title')}</h3>
                </div>
                <p className="font-body text-white/70 text-sm">{t('blog.newsletter.subtitle')}</p>
              </div>
              <div className="flex-shrink-0 w-full md:w-auto md:min-w-[380px]">
                {subscribed ? (
                  <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                    className="flex items-center gap-3 px-5 py-3 rounded-xl"
                    style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
                    <svg className="w-5 h-5 text-white flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                    <p className="font-body text-white text-sm font-semibold">{t('blog.newsletter.success')}</p>
                  </motion.div>
                ) : (
                  <div className="flex gap-2">
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      placeholder={t('blog.newsletter.placeholder')} className="newsletter-input" />
                    <button onClick={() => { if (email) setSubscribed(true); }}
                      className="font-body flex-shrink-0 px-5 py-2.5 rounded-xl font-semibold text-sm text-gray-800 transition-all hover:scale-105"
                      style={{ backgroundColor: '#e8e2d4' }}>
                      {t('blog.newsletter.cta')}
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