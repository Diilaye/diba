import { useState, useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Star } from 'lucide-react';
import Section from '../ui/Section';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef(null);
  
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Données des témoignages simplifiées
  const testimonials = [
    {
      name: "Konan Félicité",
      role: "Enseignante à Dakar",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300",
      quote: "Grâce à BIBA IMMO, j'ai pu acquérir un terrain dans un cadre idyllique à un prix abordable. L'achat groupé est une solution révolutionnaire pour nous, les jeunes actifs."
    },
    {
      name: "Mamadou Touré",
      role: "Ingénieur Civil",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      quote: "Le concept d'achat groupé m'a permis de devenir propriétaire sans m'endetter. Le suivi personnalisé et la transparence du processus m'ont particulièrement rassuré."
    },
    {
      name: "Aminata Koné",
      role: "Entrepreneur",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300",
      quote: "J'apprécie la vision communautaire et écologique des projets. Au-delà du simple achat de terrain, c'est un véritable projet de vie que nous construisons ensemble."
    },
    {
      name: "Jean Kouassi",
      role: "Médecin",
      image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300",
      quote: "La qualité du suivi et l'accompagnement personnalisé m'ont convaincu. Mon dossier numérique me permet de suivre facilement l'évolution de mon investissement."
    }
  ];

  // Navigation manuelle
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Défilement automatique
  useEffect(() => {
    if (!inView) return;
    
    const interval = setInterval(() => {
      goToNext();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <Section className="bg-black py-20 overflow-hidden">
      <div 
        ref={ref} 
        className="container mx-auto px-4"
      >
        <div className="max-w-6xl mx-auto relative">
          {/* Titre de section */}
          <div className="mb-20 relative z-10">
            <motion.p 
              className="text-yellow-500 uppercase tracking-widest text-sm font-medium mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
            >
              Ils nous font confiance
            </motion.p>
            <motion.h2 
              className="text-white text-5xl md:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Témoignages
            </motion.h2>
          </div>
        
          {/* Barre de navigation */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center space-x-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`h-1 rounded transition-all duration-300 ${
                    currentIndex === index 
                      ? 'w-10 bg-yellow-400' 
                      : 'w-3 bg-gray-600 hover:bg-gray-500'
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Témoignage ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="flex space-x-3">
              <button 
                onClick={goToPrev}
                className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-full text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                aria-label="Témoignage précédent"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button 
                onClick={goToNext}
                className="w-12 h-12 flex items-center justify-center border border-gray-700 rounded-full text-gray-400 hover:text-white hover:border-gray-500 transition-colors"
                aria-label="Témoignage suivant"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Slider */}
          <div 
            ref={slidesRef}
            className="relative overflow-hidden"
          >
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full flex-shrink-0 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20"
                >
                  {/* Contenu du témoignage */}
                  <div className="order-2 lg:order-1">
                    <div className="mb-10">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="h-6 w-6 fill-current text-yellow-500 mr-1" 
                          />
                        ))}
                      </div>
                    </div>
                    
                    <blockquote className="relative">
                      <div className="absolute -top-12 left-0 text-8xl text-yellow-600 opacity-20">"</div>
                      <p className="text-black text-3xl md:text-4xl font-light leading-tight mb-10 relative">
                        {testimonial.quote}
                      </p>
                    </blockquote>
                    
                    <div>
                      <p className="text-black font-bold text-lg">{testimonial.name}</p>
                      <p className="text-black">{testimonial.role}</p>
                    </div>
                  </div>
                  
                  {/* Image */}
                  <div className="order-1 lg:order-2 lg:flex justify-end">
                    <div className="relative w-full max-w-md h-80 lg:h-auto">
                      {/* Cadre décoratif */}
                      <div className="absolute -top-4 -left-4 right-4 bottom-4 border-2 border-yellow-500 opacity-50"></div>
                      
                      {/* Image */}
                      <div className="absolute inset-0 overflow-hidden">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Stats simplifiées */}
          <div className="mt-24 border-t border-gray-800 pt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <p className="text-yellow-500 text-4xl md:text-5xl font-bold mb-2">97%</p>
              <p className="text-gray-400">de satisfaction client</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <p className="text-yellow-500 text-4xl md:text-5xl font-bold mb-2">850+</p>
              <p className="text-gray-400">propriétaires</p>
            </motion.div>
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <p className="text-yellow-500 text-4xl md:text-5xl font-bold mb-2">12</p>
              <p className="text-gray-400">projets réalisés</p>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Testimonials;