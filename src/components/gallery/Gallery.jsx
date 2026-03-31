import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import img1 from '../../assets/gallery/OMF_math_Senegal-1-768x576.jpeg';
import img2 from '../../assets/gallery/ofm-2025-Laureat-1024x1024.jpg';
import img3 from '../../assets/gallery/Instagram-post-13.png';
import img4 from '../../assets/gallery/Instagram-post-27.png';
import img5 from '../../assets/gallery/Instagram-post-26.png';
import img6 from '../../assets/gallery/Instagram-post-25.png';
import img7 from '../../assets/gallery/Instagram-post-24.png';

// ── PHOTOS DATA ───────────────────────────────────────────────────────────────
const PHOTOS = [
  // Olympiades
  { id: 1,  cat: 'olympiades', src: img1,         alt: 'Équipe Sénégal OFM 2025',                   label: 'OFM 2025' },
  { id: 2,  cat: 'olympiades', src: img2,          alt: 'Lauréats OFM 2025',                         label: 'Lauréats OFM 2025' },
  { id: 3,  cat: 'olympiades', src: img3,                   alt: 'Préparation olympiades',                    label: 'Préparation 2025' },
  { id: 4,  cat: 'olympiades', src: img4,                   alt: 'Préparation olympique POFM',                label: 'Stage POFM' },
  { id: 5,  cat: 'olympiades', src: img5,                   alt: 'Partenariat Animath',                       label: 'Animath' },
  { id: 6,  cat: 'olympiades', src: img6,                   alt: 'ADAM-Maths Djibouti',                       label: 'ADAM-Maths' },
  { id: 7,  cat: 'olympiades', src: img7,                   alt: 'ForceN partenaire',                         label: 'ForceN' },
  
];

const CATS = [
  { val: 'all',           label: 'Tout' },
  { val: 'olympiades',    label: 'Olympiades' },
  { val: 'vulgarisation', label: 'Vulgarisation' },
  { val: 'evenements',    label: 'Événements' },
];

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
function Lightbox({ photos, index, onClose, onPrev, onNext }) {
  const photo = photos[index];

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(5,15,10,0.94)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      {/* Close */}
      <button onClick={onClose}
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all z-10">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 font-body text-white/50 text-sm">
        {index + 1} / {photos.length}
      </div>

      {/* Prev */}
      <button onClick={e => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      {/* Image */}
      <motion.div
        key={photo.id}
        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25 }}
        className="relative max-w-5xl max-h-[80vh] mx-16 flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <img
          src={photo.src} alt={photo.alt}
          className="max-w-full max-h-[72vh] rounded-xl shadow-2xl object-contain"
        />
        <div className="mt-4 text-center">
          <p className="font-display text-white font-semibold text-base">{photo.label}</p>
          <p className="font-body text-white/50 text-sm mt-1 capitalize">{photo.cat}</p>
        </div>
      </motion.div>

      {/* Next */}
      <button onClick={e => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 w-11 h-11 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
        </svg>
      </button>
    </motion.div>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function Galerie() {
  const { t } = useTranslation();
  const [activecat, setActivecat] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const filtered = activecat === 'all' ? PHOTOS : PHOTOS.filter(p => p.cat === activecat);

  const openLightbox = (idx) => { setLightboxIndex(idx); document.body.style.overflow = 'hidden'; };
  const closeLightbox = useCallback(() => { setLightboxIndex(null); document.body.style.overflow = ''; }, []);
  const prevPhoto = useCallback(() => setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);
  const nextPhoto = useCallback(() => setLightboxIndex(i => (i + 1) % filtered.length), [filtered.length]);

  // Reset lightbox if filtered changes
  useEffect(() => { setLightboxIndex(null); }, [activecat]);

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
        .photo-card img { transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94); }
        .photo-card:hover img { transform: scale(1.06); }
        .photo-card .overlay { opacity: 0; transition: opacity 0.3s ease; }
        .photo-card:hover .overlay { opacity: 1; }
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

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-14 md:py-18">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
            TerangaMath
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Galerie
          </motion.h1>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.22 }}
            className="font-body text-white/70 text-base max-w-xl leading-relaxed">
            Retour en images sur nos actions, événements et moments forts.
          </motion.p>
        </div>
      </section>

      {/* ── GALLERY SECTION ── */}
      <section className="texture-bg w-full flex-1 py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">

          {/* Filters */}
          <motion.div initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="flex flex-wrap items-center gap-3 mb-10">
            {CATS.map(cat => (
              <button key={cat.val} onClick={() => setActivecat(cat.val)}
                className="font-body px-5 py-2.5 rounded-xl font-semibold text-[14px] transition-all shadow-sm"
                style={activecat === cat.val
                  ? { backgroundColor: '#1a5c38', color: '#fff' }
                  : { backgroundColor: '#fff', color: '#374151', border: '1.5px solid #e2ddd5' }
                }>
                {cat.label}
                <span className="ml-2 text-[12px] opacity-60">
                  {cat.val === 'all' ? PHOTOS.length : PHOTOS.filter(p => p.cat === cat.val).length}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Masonry Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activecat}
              initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }}
              exit={{ opacity:0 }} transition={{ duration:0.3 }}
              className="columns-2 sm:columns-3 lg:columns-4 gap-4"
              style={{ columnGap: '1rem' }}
            >
              {filtered.map((photo, idx) => (
                <motion.div
                  key={photo.id}
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:0.5, delay: idx * 0.04 }}
                  className="photo-card relative mb-4 break-inside-avoid rounded-xl overflow-hidden cursor-pointer bg-gray-100 shadow-md"
                  style={{ display: 'inline-block', width: '100%' }}
                  onClick={() => openLightbox(idx)}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="overlay absolute inset-0 flex flex-col justify-end p-4"
                    style={{ background: 'linear-gradient(to top, rgba(10,40,22,0.85) 0%, transparent 60%)' }}>
                    <p className="font-display text-white text-sm font-semibold leading-snug">{photo.label}</p>
                    <span className="font-body text-white/60 text-[11px] capitalize mt-0.5">{photo.cat}</span>
                  </div>
                  {/* Zoom icon */}
                  <div className="overlay absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0zm-2-2v4m-2-2h4"/>
                    </svg>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-gray-400 text-base">Aucune photo dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full py-14 md:py-16"
        style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 100%)' }}>
        <div className="mx-auto max-w-4xl px-6 lg:px-10 text-center">
          <motion.h2 initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.6 }}
            className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
            Vous souhaitez participer à l'aventure ?
          </motion.h2>
          <motion.p initial={{ opacity:0, y:10 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:0.1 }}
            className="font-body text-white/70 text-base mb-7 max-w-lg mx-auto leading-relaxed">
            Rejoignez TerangaMath et contribuez à la promotion des mathématiques au Sénégal.
          </motion.p>
          <motion.div initial={{ opacity:0, y:8 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ duration:0.5, delay:0.2 }}
            className="flex flex-wrap justify-center gap-4">
            <a href="/contact"
              className="font-body px-7 py-3 rounded-xl font-semibold text-[15px] text-white border-2 border-white/40 hover:border-white/70 transition-all">
              Nous contacter
            </a>
            <a href="https://www.helloasso.com/associations/terangamath/formulaires/1"
              className="font-body px-7 py-3 rounded-xl font-semibold text-[15px] text-gray-800 hover:bg-white transition-all"
              style={{ backgroundColor: '#e8e2d4' }}>
              Faire un don
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />

      {/* ── LIGHTBOX ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            photos={filtered}
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prevPhoto}
            onNext={nextPhoto}
          />
        )}
      </AnimatePresence>
    </div>
  );
}