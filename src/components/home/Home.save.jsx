import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import HeroSection3D from './HeroSection3D';
import atelier from '../../assets/others/atelier.avif';
import team from '../../assets/others/OMF_math_Senegal-1.avif';
import instapost from '../../assets/others/Instagram-post-16.avif';
import conference from '../../assets/others/sans-titre-6911-scaled.avif';
import hero1 from '../../assets/others/composite-image-of-maths.avif';
import hero2 from '../../assets/others/sans-titre-6950-scaled.avif'


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isButtonOverDarkSection, setIsButtonOverDarkSection] = useState(false);
  const darkSectionRef = useRef(null);
  const footerRef = useRef(null);

  const photos = [
    { 
      image: hero2,
      caption: 'International Math Olympiad Training'
    },
    { 
      image: instapost,
      caption: 'Math Sprint Competition'
    },
    { 
      image: hero1,
      caption: 'Workshop at Teranga Summer Camp'
    },
    { 
      image: conference,
      caption: 'Moroccan Tournament of Young Mathematicians'
    },
    { 
      image: atelier,
      caption: 'Activities at Teranga Competition'
    },
    { 
      image: team,
      caption: 'Teranga&Math team at UM6P'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const buttonBottomPosition = window.innerHeight - 24;
      let isOverDark = false;

      if (darkSectionRef.current) {
        const rect = darkSectionRef.current.getBoundingClientRect();
        if (rect.top < buttonBottomPosition && rect.bottom > buttonBottomPosition) {
          isOverDark = true;
        }
      }

      if (footerRef.current) {
        const rect = footerRef.current.getBoundingClientRect();
        if (rect.top < buttonBottomPosition && rect.bottom > buttonBottomPosition) {
          isOverDark = true;
        }
      }

      setIsButtonOverDarkSection(isOverDark);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex w-full flex-col bg-white">
      <header className="sticky top-0 z-[9999] flex w-full flex-col items-center justify-center transition-all duration-150 bg-white border-b border-gray-200">
        <nav className="flex w-full max-w-7xl items-center justify-between px-6 lg:px-8 py-6">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <img 
                src={logo} 
                alt="Teranga & Math Logo"
                className="h-12 w-auto"
              />
            </a>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            <div className="relative flex gap-x-6">
              <Link to="/" className="flex items-center font-semibold text-base text-gray-600 transition-colors hover:text-gray-900 px-2 py-1">
                Home
              </Link>
              <Link to="/" className="flex items-center font-semibold text-base text-gray-600 transition-colors hover:text-gray-900 px-2 py-1">
                A Propos
              </Link>
              <Link to="/" className="flex items-center font-semibold text-base text-gray-600 transition-colors hover:text-gray-900 px-2 py-1">
               Events
              </Link>
              <Link to="/" className="flex items-center font-semibold text-base text-gray-600 transition-colors hover:text-gray-900 px-2 py-1">
               Gallery
              </Link>
              <Link to="/" className="flex items-center font-semibold text-base text-gray-600 transition-colors hover:text-gray-900 px-2 py-1">
               Blog
              </Link>
              <Link to="/" className="flex items-center font-semibold text-base text-gray-600 transition-colors hover:text-gray-900 px-2 py-1">
               Contact
              </Link>
            </div>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden w-full border-t border-gray-200"
            >
              <div className="px-6 py-6 space-y-2">
                <a href="#" className="block rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Home
                </a>
                <a href="#" className="block rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    A Propos
                </a>
                <a href="#" className="block rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Events
                </a>
                <a href="#" className="block rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Gallery
                </a>
                <a href="#" className="block rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Blog
                </a>
                <a href="#" className="block rounded-lg py-2 px-3 text-base font-semibold text-gray-900 hover:bg-gray-50">
                    Contact
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION 3D - WITH THREE.JS */}
      <HeroSection3D />

      {/* Section avec défilement horizontal infini */}
      <section className="flex w-full justify-center pb-16 overflow-hidden">
        <div className="w-full">
          <div className="relative h-[350px] sm:h-[400px]">
            {/* Dégradés sur les côtés */}
            <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
            
            {/* Conteneur de défilement */}
            <div className="flex gap-6 sm:gap-8">
              {/* Premier ensemble d'images */}
              <motion.div
                className="flex gap-6 sm:gap-8 flex-shrink-0"
                animate={{
                  x: [0, -100 * photos.length - (photos.length * 2)]
                }}
                transition={{
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear"
                  }
                }}
              >
                {[...photos, ...photos].map((photo, index) => (
                  <motion.div
                    key={`set1-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      y: -10,
                      transition: { type: "spring", stiffness: 300, damping: 20 }
                    }}
                    className="relative w-64 sm:w-80 h-72 sm:h-96 flex-shrink-0 bg-white rounded-xl overflow-hidden border-4 sm:border-8 border-white shadow-xl group cursor-pointer"
                  >
                    <img 
                      src={photo.image} 
                      alt={photo.caption}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      draggable="false"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 sm:p-6">
                      <p className="text-white font-semibold text-sm sm:text-base leading-tight">
                        {photo.caption}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Qui sommes-nous */}
      <section ref={darkSectionRef} className="w-full py-20 md:py-32 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: '#00843e' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" style={{ backgroundColor: '#00843e' }} />
        </div>

        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-sm mb-6"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00843e' }} />
                <span className="text-sm font-medium text-gray-200">À propos</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]"
              >
                Qui sommes-nous
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-20 h-1 mb-8 origin-left"
                style={{ backgroundColor: '#00843e' }}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl"
              >
                TerangaMath est une association engagée dans la promotion des mathématiques et de la culture scientifique auprès des jeunes au Sénégal. Elle agit à travers des actions de vulgarisation scientifique et d'accompagnement aux olympiades de mathématiques, dans une approche inclusive, équitable et ancrée dans les réalités locales.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="lg:col-span-5 relative"
            >
              <motion.div
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 0,
                  transition: { type: "spring", stiffness: 300, damping: 20 }
                }}
                className="relative bg-white p-4 sm:p-6 rounded-2xl shadow-2xl"
              >
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-lg">
                  <img 
                    src={atelier}
                    alt="TerangaMath en action"
                    className="w-full h-full object-cover"
                  />
                  
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute inset-0"
                    style={{ backgroundColor: 'rgba(0, 132, 62, 0.3)' }}
                  />
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-slate-600 font-medium text-sm sm:text-base">
                    Notre équipe en action
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-2xl"
                style={{ backgroundColor: 'rgba(0, 132, 62, 0.1)' }}
              />
              <motion.div
                animate={{
                  y: [0, 15, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-6 -left-6 w-32 h-32 rounded-full blur-2xl"
                style={{ backgroundColor: 'rgba(0, 132, 62, 0.1)' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Nos actions - Vulgarisation scientifique */}
      <section className="w-full py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 shadow-sm mb-6"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00843e' }} />
                <span className="text-sm font-medium text-gray-700">Nos actions</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]"
              >
                Vulgarisation scientifique
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-20 h-1 origin-left mb-8"
                style={{ backgroundColor: '#00843e' }}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              >
                TerangaMath développe des activités visant à rendre les mathématiques plus accessibles et compréhensibles, à travers des ateliers, des expositions et des actions pédagogiques adaptées aux élèves et au grand public. Ces actions visent à lutter contre l'autocensure, en donnant aux jeunes les outils et la confiance nécessaires pour s'engager dans les disciplines scientifiques. À terme, l'objectif est d'implanter une cellule TerangaMath active dans chaque région du Sénégal, afin de rapprocher durablement les mathématiques des élèves, notamment en banlieue et en zones rurales.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
              >
                <img 
                  src={hero1}
                  alt="Vulgarisation scientifique TerangaMath"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Nos actions - Olympiades de mathématiques */}
      <section className="w-full py-16 md:py-20 bg-gray-50 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative order-2 lg:order-1"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
              >
                <img 
                  src={instapost}
                  alt="Olympiades de mathématiques"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7 order-1 lg:order-2"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm mb-6"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00843e' }} />
                <span className="text-sm font-medium text-gray-700">Nos actions</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]"
              >
                Olympiades de mathématiques
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-20 h-1 origin-left mb-8"
                style={{ backgroundColor: '#00843e' }}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              >
                TerangaMath accompagne les élèves dans la préparation aux olympiades nationales et internationales, telles que les Olympiades Francophones de Mathématiques (OFM) et l'European Girls' Mathematical Olympiad (EGMO). Cette préparation s'appuie sur des stages et entraînements hebdomadaires, accessibles à des élèves motivés, dans une approche inclusive. L'objectif est de faire rayonner le Sénégal sur la scène internationale, tout en suscitant l'intérêt et la curiosité des jeunes pour les mathématiques et les parcours scientifiques.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Inclusion et égalité de genre */}
      <section className="w-full py-16 md:py-20 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 shadow-sm mb-6"
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00843e' }} />
                <span className="text-sm font-medium text-gray-700">Nos actions</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]"
              >
                Inclusion et égalité de genre
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-20 h-1 origin-left mb-8"
                style={{ backgroundColor: '#00843e' }}
              />

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-lg sm:text-xl text-gray-700 leading-relaxed"
              >
                Cette initiative est conçue à la fois comme une opportunité éducative concrète et comme un levier fort pour promouvoir l'inclusion. TerangaMath accorde une attention particulière à la participation des filles, ainsi que des élèves issus de la banlieue et des zones rurales, afin de réduire les inégalités d'accès, déconstruire les stéréotypes et favoriser une plus grande diversité dans les parcours scientifiques.
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:col-span-5 relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl"
              >
                <img 
                  src={team}
                  alt="Inclusion et égalité de genre"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={footerRef} className="w-full bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl" style={{ backgroundColor: '#00843e' }} />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full blur-3xl" style={{ backgroundColor: '#00843e' }} />
        </div>

        <div className="relative z-10">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src="https://terangamath.org/wp-content/uploads/2024/12/Untitled-design-33.png" 
                    alt="Teranga & Math Logo"
                    className="h-10 w-auto mb-4"
                  />
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">
                    Promouvoir les mathématiques et la culture scientifique auprès des jeunes au Sénégal.
                  </p>
                  <div className="flex items-center gap-4">
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      aria-label="Facebook"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      aria-label="Twitter"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    <a 
                      href="#" 
                      className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                      aria-label="LinkedIn"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                  </div>
                </motion.div>
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h3 className="text-white font-bold text-lg mb-4">Navigation</h3>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Accueil
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Qui sommes-nous
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Nos programmes
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Nos divisions
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Partenaires
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h3 className="text-white font-bold text-lg mb-4">Nos actions</h3>
                  <ul className="space-y-3">
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Vulgarisation scientifique
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Olympiades de mathématiques
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Inclusion et égalité de genre
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                        Formations
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#00843e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-400 text-sm">
                        Dakar, Sénégal
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#00843e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <a href="mailto:contact@terangamath.org" className="text-gray-400 hover:text-white transition-colors text-sm">
                        contact@terangamath.org
                      </a>
                    </li>
                    <li className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: '#00843e' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      <a href="tel:+221123456789" className="text-gray-400 hover:text-white transition-colors text-sm">
                        +221 12 345 67 89
                      </a>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10">
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm text-center md:text-left">
                  © {new Date().getFullYear()} TerangaMath. Tous droits réservés.
                </p>
                <div className="flex items-center gap-6">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Mentions légales
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Politique de confidentialité
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Donate Button */}
      <motion.a
        href="https://www.helloasso.com/associations/terangamath/formulaires/1"
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ 
          opacity: 1, 
          scale: 1, 
          y: 0,
          backgroundColor: isButtonOverDarkSection ? '#ffffff' : '#0f172a',
          color: isButtonOverDarkSection ? '#0f172a' : '#ffffff'
        }}
        transition={{ 
          delay: 1.5, 
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 15,
          backgroundColor: { duration: 0.3 },
          color: { duration: 0.3 }
        }}
        whileHover={{ 
          scale: 1.1,
          boxShadow: isButtonOverDarkSection 
            ? "0 20px 40px -10px rgba(255, 255, 255, 0.4)"
            : "0 20px 40px -10px rgba(0, 0, 0, 0.6)"
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 999999
        }}
        className="flex items-center gap-2 px-5 py-3 sm:px-6 sm:py-4 rounded-full font-bold text-sm sm:text-base lg:text-lg shadow-2xl touch-manipulation overflow-hidden group"
      >
        <motion.div
          className="absolute inset-0 bg-white/20"
          animate={{
            x: ['-200%', '200%']
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            repeatDelay: 1
          }}
        />
        
        <motion.svg 
          className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 relative z-10" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          animate={{
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </motion.svg>
        
        <span className="relative z-10 whitespace-nowrap">Faire un don</span>
        
        <motion.div
          className="absolute inset-0 rounded-full border-2"
          style={{
            borderColor: isButtonOverDarkSection ? '#0f172a' : '#94a3b8'
          }}
          animate={{
            scale: [1, 1.3, 1.3],
            opacity: [0.7, 0, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut"
          }}
        />
      </motion.a>
    </div>
  );
}