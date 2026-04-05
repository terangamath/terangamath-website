import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function FloatingSoutenir() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-[9998] flex flex-col items-end gap-2">

      {/* ── Dropdown ── */}
      {open && (
        <div
          className="bg-white rounded-2xl shadow-2xl border overflow-hidden mb-1 animate-[fadeUp_0.2s_ease-out]"
          style={{ borderColor: '#e2ddd5', minWidth: '220px' }}
        >
          <p className="px-5 pt-4 pb-2 font-body text-[11px] font-bold uppercase tracking-widest"
            style={{ color: '#1a5c38' }}>
            {t('donation.choose', 'Choisir un moyen')}
          </p>

          {/* HelloAsso */}
          <a
            href="https://www.helloasso.com/associations/terangamath/formulaires/1"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#edf7f0' }}>
              <svg className="w-4.5 h-4.5" style={{ color: '#1a5c38' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
              </svg>
            </div>
            <div>
              <p className="font-body text-[13.5px] font-semibold" style={{ color: '#1a3a2a' }}>
                {t('donation.card', 'Carte bancaire')}
              </p>
              <p className="font-body text-[11px] text-gray-400">HelloAsso</p>
            </div>
          </a>

          <div className="h-px mx-5" style={{ backgroundColor: '#ece7df' }} />

          {/* Wave */}
          <a
            href="https://pay.wave.com/m/M_sn_CDkPRkG5JhnS"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: '#eef6ff' }}>
              <svg className="w-4.5 h-4.5" style={{ color: '#1b7ced' }} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
              </svg>
            </div>
            <div>
              <p className="font-body text-[13.5px] font-semibold" style={{ color: '#1a3a2a' }}>
                {t('donation.mobile', 'Mobile Money')}
              </p>
              <p className="font-body text-[11px] text-gray-400">Wave</p>
            </div>
          </a>
        </div>
      )}

      {/* ── Main button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2 font-body font-semibold text-[15px] text-white px-5 py-3 rounded-full shadow-lg transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
        style={{ backgroundColor: '#1a5c38' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {t('nav.support')}
      </button>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}