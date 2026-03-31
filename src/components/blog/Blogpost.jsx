import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { POSTS, CategoryBadge, ReadTime } from './Blog';

// ── CONTENT BLOCK RENDERER ────────────────────────────────────────────────────
function ContentBlock({ block }) {
  const { t } = useTranslation();

  switch (block.type) {
    case 'intro':
      return (
        <p className="font-body text-lg md:text-xl leading-relaxed text-gray-700 font-medium border-l-4 pl-6 py-1 mb-8"
          style={{ borderColor: '#1a5c38' }}>
          {t(block.key)}
        </p>
      );
    case 'heading':
      return (
        <h2 className="font-display text-xl md:text-2xl font-bold mt-10 mb-4" style={{ color: '#1a3a2a' }}>
          {t(block.key)}
        </h2>
      );
    case 'paragraph':
      return (
        <p className="font-body text-base leading-[1.85] text-gray-600 mb-6">
          {t(block.key)}
        </p>
      );
    case 'list':
      return (
        <ul className="mb-6 space-y-3 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="font-body text-base text-gray-600 flex items-start gap-3">
              <span className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#1a5c38' }} />
              {t(item)}
            </li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <figure className="my-10">
          <img
            src={block.src}
            alt={block.captionKey ? t(block.captionKey) : ''}
            className="w-full rounded-2xl object-cover shadow-lg"
            style={{ maxHeight: '500px' }}
          />
          {block.captionKey && t(block.captionKey) && (
            <figcaption className="font-body text-sm text-gray-400 text-center mt-3 italic">
              {t(block.captionKey)}
            </figcaption>
          )}
        </figure>
      );
    default:
      return null;
  }
}

// ── RELATED CARD ─────────────────────────────────────────────────────────────
function RelatedCard({ post }) {
  const { t } = useTranslation();
  return (
    <Link to={`/actualite/blog/${post.slug}`}
      className="flex gap-4 group p-3 -mx-3 rounded-xl transition-colors hover:bg-gray-50">
      <img src={post.image} alt={t(post.titleKey)}
        className="w-20 h-20 rounded-xl object-cover flex-shrink-0" />
      <div className="flex flex-col gap-1 min-w-0">
        <CategoryBadge cat={post.category} />
        <p className="font-body text-[13px] font-semibold leading-snug mt-0.5 group-hover:opacity-70 transition-opacity line-clamp-2"
          style={{ color: '#1a3a2a' }}>
          {t(post.titleKey)}
        </p>
        <span className="font-body text-[11px] text-gray-400">{post.date}</span>
      </div>
    </Link>
  );
}

// ── MAIN PAGE ─────────────────────────────────────────────────────────────────
export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const post = POSTS.find(p => p.slug === slug);
  const related = post
    ? POSTS.filter(p => p.slug !== slug && p.category === post.category).slice(0, 3)
    : [];

  // ── 404 ──
  if (!post) {
    return (
      <div className="flex flex-col min-h-screen" style={{ backgroundColor: '#f5f0e8', fontFamily: "'Lora', Georgia, serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=DM+Sans:wght@400;600&display=swap');.font-display{font-family:'Lora',Georgia,serif}.font-body{font-family:'DM Sans',sans-serif}`}</style>
        <Header />
        <div className="flex-1 flex items-center justify-center text-center px-6 py-24">
          <div>
            <p className="font-display text-6xl font-bold mb-4" style={{ color: '#1a5c38' }}>404</p>
            <p className="font-body text-gray-500 mb-8">Article introuvable.</p>
            <Link to="/actualite/blog"
              className="font-body inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
              style={{ backgroundColor: '#1a5c38' }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
              </svg>
              {t('blog.back')}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = t(post.titleKey);

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
        .line-clamp-2 { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }
        .newsletter-input {
          font-family: 'DM Sans', sans-serif; flex:1; padding:11px 16px; border-radius:10px;
          border:1.5px solid rgba(255,255,255,0.25); background:rgba(255,255,255,0.12);
          font-size:14px; color:#fff; outline:none; transition:border-color 0.2s;
        }
        .newsletter-input::placeholder { color:rgba(255,255,255,0.5); }
        .newsletter-input:focus { border-color:rgba(255,255,255,0.55); background:rgba(255,255,255,0.18); }
        @keyframes float-slow { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        .float-slow { animation: float-slow 7s ease-in-out infinite; }
      `}</style>

      <Header />

      {/* ── HERO IMAGE ── */}
      <section className="w-full relative overflow-hidden" style={{ minHeight: '440px' }}>
        <img src={post.image} alt={t(post.titleKey)}
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,30,18,0.97) 0%, rgba(10,30,18,0.75) 45%, rgba(10,30,18,0.2) 100%)' }} />

        {/* Decorative floaters */}
        <span className="float-slow select-none pointer-events-none absolute top-6 right-[10%] font-display text-5xl font-bold opacity-[0.07] text-white">∑</span>
        <span className="float-slow select-none pointer-events-none absolute bottom-16 left-[6%] font-display text-3xl font-bold opacity-[0.07] text-white">π</span>

        <div className="relative z-10 mx-auto max-w-4xl px-6 lg:px-10 flex flex-col justify-end" style={{ minHeight: '440px', paddingBottom: '3rem' }}>
          {/* Back link */}
          <Link to="/actualite/blog"
            className="font-body inline-flex items-center gap-2 text-white/60 text-sm mb-6 hover:text-white transition-colors w-fit group">
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>
            </svg>
            {t('blog.back')}
          </Link>

          {/* Meta */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <CategoryBadge cat={post.category} />
            <span className="font-body text-[12px] text-white/60">{post.date}</span>
            <ReadTime min={post.readTime} />
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65 }}
            className="font-display text-3xl md:text-4xl lg:text-[2.6rem] font-bold text-white leading-tight max-w-3xl">
            {t(post.titleKey)}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.15 }}
            className="font-body text-white/70 text-base mt-3 max-w-2xl leading-relaxed">
            {t(post.excerptKey)}
          </motion.p>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="texture-bg w-full flex-1 py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-10 xl:gap-16 items-start">

            {/* ── ARTICLE ── */}
            <motion.article
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex-1 min-w-0">

              {/* Content card */}
              <div className="bg-white rounded-2xl shadow-md px-8 md:px-12 py-10 md:py-14">
                {post.content.map((block, i) => (
                  <ContentBlock key={i} block={block} />
                ))}
              </div>

              {/* Share bar */}
              <div className="mt-8 flex items-center gap-4 flex-wrap">
                <span className="font-body text-sm text-gray-500 font-semibold">{t('blog.share')}</span>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
                  style={{ backgroundColor: '#1a1a1a' }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
                  style={{ backgroundColor: '#0077b5' }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-opacity hover:opacity-75"
                  style={{ backgroundColor: '#1877f2' }}>
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </motion.article>

            {/* ── SIDEBAR ── */}
            <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 lg:sticky lg:top-8 space-y-6">

              {/* Author */}
              <motion.div initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5, delay:0.2 }}
                className="bg-white rounded-2xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                    style={{ backgroundColor: '#1a5c38' }}>TM</div>
                  <div>
                    <p className="font-body text-sm font-semibold text-gray-800">{post.author}</p>
                    <p className="font-body text-xs text-gray-400">Association TerangaMath</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100 flex-wrap">
                  <span className="font-body text-xs text-gray-400 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {post.date}
                  </span>
                  <span className="font-body text-xs text-gray-400 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {post.readTime} min
                  </span>
                </div>
              </motion.div>

              {/* Related articles */}
              {related.length > 0 && (
                <motion.div initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5, delay:0.3 }}
                  className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-display text-base font-bold mb-5" style={{ color: '#1a3a2a' }}>
                    {t('blog.related')}
                  </h3>
                  <div className="space-y-3">
                    {related.map(p => <RelatedCard key={p.id} post={p} />)}
                  </div>
                </motion.div>
              )}

              {/* CTA donate */}
              <motion.div initial={{ opacity:0, x:16 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.5, delay:0.4 }}
                className="rounded-2xl p-6 text-white"
                style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 100%)' }}>
                <p className="font-display text-base font-bold mb-1">{t('blog.cta.title')}</p>
                <p className="font-body text-white/70 text-sm mb-4">{t('blog.cta.subtitle')}</p>
                <Link to="/don"
                  className="font-body inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-800 hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#e8e2d4' }}>
                  {t('blog.cta.cta')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </Link>
              </motion.div>
            </aside>
          </div>

          {/* ── NEWSLETTER ── */}
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
            transition={{ duration:0.6, delay:0.15 }}
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