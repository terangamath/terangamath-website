import { useTranslation } from 'react-i18next';

export default function FloatingSoutenir() {
  const { t } = useTranslation();

  return (
    <a
      href="https://www.helloasso.com/associations/terangamath/formulaires/1"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[9998] flex items-center gap-2 font-body font-semibold text-[15px] text-white px-5 py-3 rounded-full shadow-lg transition-all hover:opacity-90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
      style={{ backgroundColor: '#1a5c38' }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {t('nav.support')}
    </a>
  );
}