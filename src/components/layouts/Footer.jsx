import React from 'react';
import { useTranslation } from 'react-i18next';

const socialLinks = [
  { label: 'Facebook',   href: 'https://www.facebook.com/p/TerangaMath-61558079787645/?locale=fr_FR', d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  { label: 'Twitter',    href: '#', d: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
  { label: 'Instagram',  href: '#', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  { label: 'LinkedIn',   href: 'https://www.linkedin.com/company/terangamath?trk=public_post_follow-view-profile', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  { label: 'Twitter / X',href: 'https://x.com/TerangaMath', d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
  { label: 'YouTube',    href: '#', d: 'M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z' },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="w-full text-white relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1a5c38 0%, #0f3d22 60%, #0a2a18 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10 pt-12 pb-0">

        <p className="font-display text-xl sm:text-2xl lg:text-3xl font-semibold text-white leading-snug mb-8">
          {t('footer.tagline')}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-10">
          <div className="flex flex-wrap gap-3">

            <a href="/contact"
              className="font-body px-5 py-2.5 rounded-lg font-semibold text-sm text-white transition-colors"
              style={{ backgroundColor: '#0f3d22', border: '1px solid rgba(255,255,255,0.25)' }}
            >
              {t('footer.partner')}
            </a>

            <a href="https://www.helloasso.com/associations/terangamath/formulaires/1"
              className="font-body px-5 py-2.5 rounded-lg font-semibold text-sm text-gray-800 bg-[#e8e2d4] hover:bg-white transition-colors"
            >
              {t('footer.donation')}
            </a>

            <a href="/contact"
              className="font-body px-5 py-2.5 rounded-lg font-semibold text-sm text-gray-800 bg-[#e8e2d4] hover:bg-white transition-colors"
            >
              {t('footer.contact')}
            </a>

          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label}
                className="w-8 h-8 rounded-md flex items-center justify-center transition-colors hover:bg-white/20"
                style={{ backgroundColor: 'rgba(255,255,255,0.12)' }}
              >
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d={s.d} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/15 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1 text-white/70 text-sm font-body">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
            <a href="mailto:contact@terangamath.org" className="hover:text-white transition-colors">
              contact@terangamath.org
            </a>
            <span className="mx-2 opacity-40">|</span>
            <a href="tel:+221551794567" className="hover:text-white transition-colors">
              +33 760 83 32 30
            </a>
          </div>
          <p className="font-body text-xs text-white/50">
            © {new Date().getFullYear()} TerangaMath — {t('footer.rights')}
          </p>
        </div>

      </div>
    </footer>
  );
}