import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {  PlayCircle } from 'lucide-react';

const Hero = () => {
  const [videoModal, setVideoModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Images des programmes pour le slider
  const sliderImages = [
    "/achat3.jpeg", // Sama Achat Groupé 3 - Louly Sindiane
    "/ac1.jpeg",    // Image programme 1
    "/ac2.jpeg",    // Image programme 2
    "/ac3.jpeg",    // Image programme 3
    "/ac4.jpeg",     // Image programme 6
  ];

  // Effet pour changer automatiquement les slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // Change toutes les 5 secondes
    
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  // Gestion du modal vidéo
  useEffect(() => {
    if (videoModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [videoModal]);

  return (
    <div className="relative h-screen min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Slider d'Images */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        
        {/* Images du slider avec transitions */}
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Logo */}
      

      {/* Indicateurs de Slide */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide 
                ? 'bg-yellow-400' 
                : 'bg-yellow-400/40 hover:bg-yellow-400/60'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 text-center text-white px-4 max-w-5xl">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading text-yellow-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          TABAKH SA REEW
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-gray-100 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Rejoignez nos programmes d'achat groupé de terrains et participez à 
          la création d'espaces de vie écologiques et solidaires.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {/* <Link 
            to="/programmes" 
            className="btn-primary px-8 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-medium transition-all shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            Découvrir nos programmes
          </Link> */}
          <button 
            onClick={() => setVideoModal(true)}
            className="flex items-center justify-center gap-2 text-white font-medium hover:text-yellow-300 transition-colors w-full sm:w-auto"
          >
            <PlayCircle className="h-6 w-6" />
            <span>Visionner présentation concept</span>
          </button>
        </motion.div>

       
      </div>

      {/* Video Modal */}
      {videoModal && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button 
            onClick={() => setVideoModal(false)}
            className="absolute top-4 right-4 text-white hover:text-yellow-300 transition-colors z-50"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-full h-full">
            <video 
              className="w-full h-full object-contain"
              src="/presentation-biba.mp4"
              title="Concept SCI BIBA IMMO"
              autoPlay
              muted
              controls
              playsInline
            ></video>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;