import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/logo/tm.png';

function getNavLinks(t) {
  return [
    {
      label: t('nav.about'),
      to: '/about',
      children: [
        { label: t('nav.mega.about.who'), to: '/about' },
        { label: t('nav.mega.about.documents'), to: '/documents' },
      ]
    },
    {
      label: t('nav.mega.actions.title'),
      to: '/actions',
      children: [
        { label: t('nav.mega.actions.vulgarisation'), to: '/actions#vulgarisation' },
        { label: t('nav.mega.actions.olympiades'), to: '/actions#olympiades' },
      ]
    },
    {
      label: t('nav.mega.actualite.title'),
      to: '#',
      children: [
        { label: t('nav.mega.actualite.presse'), to: '/actualite/presse' },
        { label: t('nav.mega.actualite.blog'), to: '/actualite/blog' },
        { label: t('nav.mega.actualite.evenement'), to: '/events' },
      ]
    },
    {
      label: t('nav.mega.galerie.title'),
      to: '/gallery',
    },
    {
      label: t('nav.mega.partenaires.title'),
      to: '/partners',
      // children: [
      //   { label: t('nav.mega.partenaires.devenir'), to: '/partners#devenir' },
      //   { label: t('nav.mega.partenaires.associations'), to: '/partners#associations' },
      //   { label: t('nav.mega.partenaires.entreprises'), to: '/partners#entreprises' },
      //   { label: t('nav.mega.partenaires.institutionnels'), to: '/partners#institutionnels' },
      //   { label: t('nav.mega.partenaires.academiques'), to: '/partners#academiques' },
      // ]
    },
    { label: t('nav.adhesions'), to: 'https://www.helloasso.com/associations/terangamath/adhesions/adhesion-terangamath-2026-2027' },
    { label: t('nav.contact'), to: '/contact' },
  ];
}

function NavItem({ label, to, children, isActive }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!children) {
    return (
      <Link
        to={to}
        className="relative font-body font-medium text-[15px] px-4 py-2 rounded-lg transition-colors"
        style={{
          color: isActive ? '#1a5c38' : '#374151',
          backgroundColor: isActive ? 'rgba(26,92,56,0.07)' : 'transparent',
        }}
        onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#111827'; }}
        onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#374151'; }}
      >
        {label}
        {isActive && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: '#1a5c38' }} />
        )}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        className="relative flex items-center gap-1 font-body font-medium text-[15px] px-4 py-2 rounded-lg transition-colors"
        style={{
          color: isActive ? '#1a5c38' : '#374151',
          backgroundColor: isActive ? 'rgba(26,92,56,0.07)' : 'transparent',
        }}
        onClick={() => setOpen(o => !o)}
      >
        {label}
        <svg
          className="w-3.5 h-3.5 transition-transform"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
        {isActive && (
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ backgroundColor: '#1a5c38' }} />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-50"
          >
            {children.map(({ label: l, to: childTo }) => (
              <Link
                key={l}
                to={childTo}
                className="block px-4 py-2 text-[14px] font-body font-medium text-gray-600 hover:text-[#1a5c38] hover:bg-[rgba(26,92,56,0.06)] transition-colors"
              >
                {l}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileOpenSection, setMobileOpenSection] = useState(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const navLinks = getNavLinks(t);

  const isActive = (to) => {
    if (to === '/' || to === '#') return false;
    return location.pathname.startsWith(to.split('#')[0]) && to.split('#')[0] !== '/';
  };

  const handleLangChange = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    localStorage.setItem('lang', lang);
  };

  const LangSelect = ({ className }) => (
    <div className="relative">
      <select value={i18n.language} onChange={handleLangChange} className={className}>
        <option value="fr">Français</option>
        <option value="en">English</option>
      </select>
      <svg className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  );

  return (
    <header className="sticky top-0 z-[9999] bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <nav className="flex w-full max-w-7xl mx-auto items-center justify-between px-6 lg:px-10 py-4">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logo}
            alt="TerangaMath"
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ label, to, children }) => (
            <NavItem key={to} label={label} to={to} children={children} isActive={isActive(to)} />
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden lg:flex items-center gap-3">
          <LangSelect className="font-body appearance-none cursor-pointer pl-8 pr-7 py-2.5 rounded-lg font-medium text-[15px] text-gray-700 bg-gray-50 border border-gray-200 hover:border-gray-300 transition-colors focus:outline-none" />
        </div>

        {/* Mobile burger */}
        <button className="lg:hidden p-2 text-gray-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {mobileMenuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            }
          </svg>
        </button>

      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1 max-h-[75vh] overflow-y-auto">
              {navLinks.map(({ label, to, children: subLinks }) => {
                const hasSub = !!subLinks;
                return (
                  <div key={to}>
                    <div className="flex items-center">
                      <Link
                        to={to}
                        onClick={() => { if (!hasSub) setMobileMenuOpen(false); }}
                        className="flex-1 flex items-center gap-2 py-2.5 px-3 font-body font-medium rounded-lg transition-colors"
                        style={{
                          color: isActive(to) ? '#1a5c38' : '#374151',
                          backgroundColor: isActive(to) ? 'rgba(26,92,56,0.07)' : 'transparent',
                        }}
                      >
                        {isActive(to) && (
                          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: '#1a5c38' }} />
                        )}
                        {label}
                      </Link>
                      {hasSub && (
                        <button className="p-2 text-gray-400" onClick={() => setMobileOpenSection(mobileOpenSection === to ? null : to)}>
                          <svg
                            className="w-4 h-4 transition-transform"
                            style={{ transform: mobileOpenSection === to ? 'rotate(180deg)' : 'rotate(0deg)' }}
                            fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      )}
                    </div>

                    <AnimatePresence>
                      {hasSub && mobileOpenSection === to && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-4 ml-3 border-l-2 border-[rgba(26,92,56,0.2)] mt-0.5 mb-1">
                            {subLinks.map(({ label: childLabel, to: childTo }) => (
                              <Link
                                key={childTo}
                                to={childTo}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block py-2 px-3 text-[14px] font-body font-medium text-gray-500 hover:text-[#1a5c38] transition-colors"
                              >
                                {childLabel}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {/* Mobile lang */}
              <div className="pt-3 mt-1 border-t border-gray-100">
                <LangSelect className="font-body w-full appearance-none cursor-pointer pl-8 pr-7 py-2.5 rounded-lg font-medium text-[14px] text-gray-700 bg-gray-50 border border-gray-200 focus:outline-none" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}