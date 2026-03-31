import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

// ── DOCUMENTS DATA ────────────────────────────────────────────────────────────
// Remplacez les URLs '#' par les vrais liens vers vos fichiers PDF
const CATEGORIES = [
  {
    id: 'association',
    title: "L'association",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    documents: [
      {
        label: "Statuts de l'association",
        detail: 'En vigueur depuis 2024',
        url: '#',
      },
      {
        label: "Règlement intérieur",
        url: '#',
      },
      {
        label: "Récépissé de déclaration",
        url: '#',
      },
      {
        label: "Assemblée générale constitutive",
        detail: 'Procès-verbal',
        url: '#',
      },
    ],
  },
  {
    id: 'conseil',
    title: "Le Conseil d'administration",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    documents: [
      {
        label: "Composition du Conseil d'administration",
        detail: 'Depuis 2024',
        url: '#',
      },
      {
        label: "Compte rendu — CA du 15 janvier 2025",
        url: '#',
      },
      {
        label: "Compte rendu — CA du 10 septembre 2024",
        url: '#',
      },
    ],
  },
  {
    id: 'bureau',
    title: 'Le Bureau',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    documents: [
      {
        label: 'Composition du Bureau',
        detail: 'Depuis janvier 2025',
        url: '#',
      },
      {
        label: "Compte rendu — Réunion du bureau du 5 mars 2025",
        url: '#',
      },
    ],
  },
];

// ── PDF ICON ──────────────────────────────────────────────────────────────────
function PdfIcon() {
  return (
    <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none">
      <path d="M7 2h8l6 6v12a2 2 0 01-2 2H7a2 2 0 01-2-2V4a2 2 0 012-2z" fill="#e74c3c" opacity="0.12" stroke="#e74c3c" strokeWidth="1.5" />
      <path d="M15 2v6h6" stroke="#e74c3c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="7.5" y="17.5" fontSize="6" fontWeight="700" fill="#e74c3c" fontFamily="sans-serif">PDF</text>
    </svg>
  );
}

// ── DOCUMENT ROW ──────────────────────────────────────────────────────────────
function DocumentRow({ doc, index }) {
  return (
    <motion.a
      href={doc.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className="group flex items-center gap-4 px-5 py-4 rounded-xl bg-white hover:shadow-md transition-all duration-200"
      style={{ border: '1.5px solid #ece7df' }}
    >
      <PdfIcon />
      <div className="flex-1 min-w-0">
        <p className="font-body text-[14px] font-semibold truncate" style={{ color: '#1a3a2a' }}>
          {doc.label}
        </p>
        {doc.detail && (
          <p className="font-body text-[12px] text-gray-400 mt-0.5">{doc.detail}</p>
        )}
      </div>
      <svg
        className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
        style={{ color: '#1a5c38' }}
        fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    </motion.a>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function DocumentsOfficiels() {
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

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-14 md:py-20">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }}
            className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
            TerangaMath
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}
            className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
            Documents officiels
          </motion.h1>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.22 }}
            className="font-body text-white/70 text-base max-w-xl leading-relaxed">
            Retrouvez ici l'ensemble des documents officiels de l'association : statuts, comptes rendus et compositions des instances.
          </motion.p>
        </div>
      </section>

      {/* ── DOCUMENTS SECTIONS ── */}
      <section className="texture-bg w-full flex-1 py-14 md:py-20">
        <div className="mx-auto max-w-4xl px-6 lg:px-10 flex flex-col gap-14">

          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: ci * 0.1 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: '#1a5c38' }}>
                  {cat.icon}
                </div>
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold" style={{ color: '#1a3a2a' }}>
                    {cat.title}
                  </h2>
                </div>
              </div>
              <div className="w-10 h-0.5 mb-5 ml-[52px]" style={{ backgroundColor: '#1a5c38', opacity: 0.3 }} />

              {/* Document list */}
              <div className="flex flex-col gap-2.5 ml-0 sm:ml-[52px]">
                {cat.documents.map((doc, di) => (
                  <DocumentRow key={di} doc={doc} index={di} />
                ))}
              </div>
            </motion.div>
          ))}

        </div>
      </section>

      <Footer />
    </div>
  );
}