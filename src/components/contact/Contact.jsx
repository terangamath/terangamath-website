import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
        .contact-input {
          font-family: 'DM Sans', sans-serif;
          width: 100%; padding: 12px 16px; border-radius: 10px;
          border: 1.5px solid #e2ddd5; background: #faf8f4;
          font-size: 15px; color: #1a3a2a;
          transition: border-color 0.2s, box-shadow 0.2s; outline: none;
        }
        .contact-input::placeholder { color: #a89f94; }
        .contact-input:focus { border-color: #1a5c38; box-shadow: 0 0 0 3px rgba(26,92,56,0.1); background: #fff; }
        textarea.contact-input { resize: vertical; min-height: 130px; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-14px) rotate(4deg); } }
        @keyframes float-med  { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-10px) rotate(-3deg); } }
        .float-slow { animation: float-slow 7s ease-in-out infinite; }
        .float-med  { animation: float-med  5s ease-in-out infinite; }
      `}</style>

      <Header />

      {/* ── HERO BAND ── */}
      <section className="w-full relative overflow-hidden" style={{ background:'linear-gradient(135deg, #1a5c38 0%, #0f3d22 60%, #0a2a18 100%)', minHeight:'220px' }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
        <span className="float-slow select-none pointer-events-none absolute top-8    left-[8%]   font-display text-5xl font-bold opacity-[0.08] text-white">∑</span>
        <span className="float-med  select-none pointer-events-none absolute top-12   right-[12%] font-display text-4xl font-bold opacity-[0.08] text-white">π</span>
        <span className="float-slow select-none pointer-events-none absolute bottom-6 left-[22%]  font-display text-3xl font-bold opacity-[0.07] text-white">∞</span>
        <span className="float-med  select-none pointer-events-none absolute bottom-8 right-[28%] font-display text-4xl font-bold opacity-[0.07] text-white">√</span>
        <span className="float-slow select-none pointer-events-none absolute top-6    left-[52%]  font-display text-2xl font-bold opacity-[0.06] text-white">∫</span>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 py-14 md:py-20">
          <motion.p initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.5 }} className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-white/60 mb-3">
            {t('contact.hero.tag')}
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }} className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
            {t('contact.hero.title')}
          </motion.h1>
          <motion.p initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.22 }} className="font-body text-white/70 text-base mt-3 max-w-md">
            {t('contact.hero.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="texture-bg w-full flex-1 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">

            {/* ── LEFT: Info panel ── */}
            <motion.div initial={{ opacity:0, x:-24 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.65, delay:0.15 }} className="lg:col-span-2 flex flex-col gap-6">

              {/* Contact info card */}
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-7 flex flex-col gap-7">

                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor:'#edf7f0' }}>
                      <svg className="w-5 h-5" style={{ color:'#1a5c38' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{t('contact.info.address_label')}</p>
                      <p className="font-body text-[15px] text-gray-700 leading-snug" style={{ whiteSpace: 'pre-line' }}>
                        {t('contact.info.address')}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor:'#edf7f0' }}>
                      <svg className="w-5 h-5" style={{ color:'#1a5c38' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{t('contact.info.email_label')}</p>
                      <a href="mailto:contact@terangamath.org" className="font-body text-[15px] transition-colors hover:underline" style={{ color:'#1a5c38' }}>
                        contact@terangamath.org
                      </a>
                    </div>
                  </div>

                  <div className="border-t border-gray-100" />

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor:'#edf7f0' }}>
                      <svg className="w-5 h-5" style={{ color:'#1a5c38' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-body text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">{t('contact.info.phone_label')}</p>
                      <a href="tel:+33xxxxxxxxx" className="font-body text-[15px] text-gray-700 hover:text-gray-900 transition-colors">
                        +33 xxx xx xx xx
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Socials card */}
              <div className="bg-white rounded-2xl shadow-md p-7">
                <p className="font-body text-xs font-semibold uppercase tracking-widest text-gray-400 mb-5">{t('contact.info.follow')}</p>
                <div className="flex flex-wrap gap-3">
                  {[
                    { label:'Facebook',  href:'https://www.facebook.com/p/TerangaMath-61558079787645/?locale=fr_FR', d:'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                    { label:'Instagram', href:'#', d:'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                    { label:'Twitter/X', href:'https://x.com/TerangaMath', d:'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                    { label:'LinkedIn',  href:'https://www.linkedin.com/company/terangamath?trk=public_post_follow-view-profile', d:'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
                    { label:'YouTube',   href:'#', d:'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
                  ].map((s) => (
                    <a key={s.label} href={s.href} aria-label={s.label} title={s.label}
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all hover:scale-110"
                      style={{ backgroundColor:'#edf7f0', color:'#1a5c38' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor='#1a5c38'; e.currentTarget.style.color='#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor='#edf7f0'; e.currentTarget.style.color='#1a5c38'; }}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.d}/></svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* ── MAP — Google Maps embed pointant sur le bon lien ── */}
              <div className="rounded-2xl overflow-hidden shadow-md relative" style={{ height:'200px' }}>
                <iframe
                  title="TerangaMath Localisation"
                  src="https://maps.google.com/maps?q=14.712661,-17.455739&z=17&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {/* Badge label */}
                <a
                  href="https://maps.app.goo.gl/vwAQbQZoDGgWcPg3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-3 left-3 bg-white rounded-lg px-3 py-1.5 shadow text-xs font-body font-medium text-gray-700 flex items-center gap-1.5 hover:shadow-md transition-shadow"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color:'#1a5c38' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  {t('contact.info.map_label')}
                </a>
              </div>

            </motion.div>

            {/* ── RIGHT: Form ── */}
            <motion.div initial={{ opacity:0, x:24 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.65, delay:0.25 }} className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="p-7 sm:p-10">
                  <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2" style={{ color:'#1a3a2a' }}>{t('contact.form.title')}</h2>
                  <p className="font-body text-sm text-gray-500 mb-8">{t('contact.form.subtitle')}</p>

                  {submitted ? (
                    <motion.div initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4 }} className="rounded-xl px-7 py-10 text-center flex flex-col items-center gap-4" style={{ backgroundColor:'#edf7f0' }}>
                      <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor:'#1a5c38' }}>
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <p className="font-display text-xl font-semibold" style={{ color:'#1a3a2a' }}>{t('contact.form.success_title')}</p>
                      <p className="font-body text-sm text-gray-500 max-w-xs">{t('contact.form.success_text')}</p>
                      <button onClick={() => { setSubmitted(false); setFormData({ name:'', email:'', message:'' }); }} className="font-body mt-2 text-sm font-semibold underline underline-offset-2 hover:opacity-70 transition-opacity" style={{ color:'#1a5c38' }}>
                        {t('contact.form.success_again')}
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-sm font-medium text-gray-700">{t('contact.form.name_label')} <span style={{ color:'#1a5c38' }}>*</span></label>
                          <input required type="text" placeholder={t('contact.form.name_placeholder')} value={formData.name} onChange={e => setFormData({...formData, name:e.target.value})} className="contact-input" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="font-body text-sm font-medium text-gray-700">{t('contact.form.email_label')} <span style={{ color:'#1a5c38' }}>*</span></label>
                          <input required type="email" placeholder={t('contact.form.email_placeholder')} value={formData.email} onChange={e => setFormData({...formData, email:e.target.value})} className="contact-input" />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-sm font-medium text-gray-700">{t('contact.form.subject_label')}</label>
                        <div className="relative">
                          <select className="contact-input appearance-none pr-10 cursor-pointer" defaultValue="">
                            <option value="" disabled>{t('contact.form.subject_placeholder')}</option>
                            <option>{t('contact.form.subject_partnership')}</option>
                            <option>{t('contact.form.subject_volunteer')}</option>
                            <option>{t('contact.form.subject_donation')}</option>
                            <option>{t('contact.form.subject_press')}</option>
                            <option>{t('contact.form.subject_general')}</option>
                            <option>{t('contact.form.subject_other')}</option>
                          </select>
                          <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                          </svg>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="font-body text-sm font-medium text-gray-700">{t('contact.form.message_label')} <span style={{ color:'#1a5c38' }}>*</span></label>
                        <textarea required placeholder={t('contact.form.message_placeholder')} value={formData.message} onChange={e => setFormData({...formData, message:e.target.value})} className="contact-input" rows={5} />
                      </div>

                      <div className="flex items-center justify-between gap-4 pt-1">
                        <p className="font-body text-xs text-gray-400 leading-relaxed max-w-[260px]">
                          {t('contact.form.privacy')}{' '}
                          <a href="#" className="underline hover:text-gray-600">{t('contact.form.privacy_link')}</a>.
                        </p>
                        <button type="submit" className="font-body flex-shrink-0 inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold text-[15px] text-white shadow-md hover:shadow-lg transition-all hover:opacity-90 active:scale-95" style={{ backgroundColor:'#1a5c38' }}>
                          {t('contact.form.submit')}
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                          </svg>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Donation strip */}
              <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, delay:0.45 }} className="mt-5 rounded-2xl px-7 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" style={{ background:'linear-gradient(135deg, #1a5c38 0%, #0f3d22 100%)' }}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 bg-white/15">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-display text-white font-semibold text-base leading-snug">{t('contact.donation.title')}</p>
                    <p className="font-body text-white/70 text-sm">{t('contact.donation.subtitle')}</p>
                  </div>
                </div>
                <a href="https://www.helloasso.com/associations/terangamath/formulaires/1" className="font-body flex-shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm text-gray-800 hover:bg-white transition-colors" style={{ backgroundColor:'#e8e2d4' }}>
                  {t('contact.donation.cta')}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                  </svg>
                </a>
              </motion.div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}