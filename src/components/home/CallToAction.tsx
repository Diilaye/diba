import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MapPin, Star } from 'lucide-react';

const CallToAction = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-br from-yellow-700 to-amber-900 overflow-hidden">
      {/* Overlay et éléments décoratifs simples */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full opacity-20 blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500 rounded-full opacity-20 blur-3xl translate-y-1/3 -translate-x-1/3"></div>
      </div>
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className="max-w-5xl mx-auto">
          {/* En-tête */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="text-3xl md:text-4xl font-bold mb-4 text-white"
            >
              Prêt à rejoindre notre communauté ?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-yellow-100 mb-8 max-w-2xl mx-auto"
            >
              En quelques étapes, transformez votre rêve immobilier en réalité 
              et rejoignez une communauté partageant vos valeurs.
            </motion.p>
          </div>
          
          {/* Statistiques clés */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white/10 rounded-lg p-5 flex items-center justify-center flex-col">
              <Users className="h-8 w-8 text-yellow-400 mb-2" />
              <span className="text-2xl font-bold text-white mb-1">850+</span>
              <span className="text-yellow-100 text-sm">Familles propriétaires</span>
            </div>
            <div className="bg-white/10 rounded-lg p-5 flex items-center justify-center flex-col">
              <Star className="h-8 w-8 text-yellow-400 mb-2" />
              <span className="text-2xl font-bold text-white mb-1">12</span>
              <span className="text-yellow-100 text-sm">Projets communautaires</span>
            </div>
            <div className="bg-white/10 rounded-lg p-5 flex items-center justify-center flex-col">
              <MapPin className="h-8 w-8 text-yellow-400 mb-2" />
              <span className="text-2xl font-bold text-white mb-1">1250</span>
              <span className="text-yellow-100 text-sm">Hectares développés</span>
            </div>
          </motion.div>
          
          {/* Boutons d'action */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              to="/adherer"
              className="w-full sm:w-auto px-6 py-3 bg-white text-yellow-700 font-bold rounded-lg shadow-md hover:bg-yellow-50 transition-colors text-center"
            >
              Commencer mon adhésion
            </Link>
            
            <Link
              to="/programmes"
              className="w-full sm:w-auto px-6 py-3 bg-yellow-600 text-white font-bold rounded-lg shadow-md hover:bg-yellow-700 transition-colors text-center flex items-center justify-center"
            >
              Explorer les programmes
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;