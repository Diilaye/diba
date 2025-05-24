import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Section from '../components/ui/Section';
import { Sprout, Users, Building, Sun } from 'lucide-react';

// Style personnalisé à ajouter au fichier CSS global
const customStyles = `
  /* Animations personnalisées */
  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0px); }
  }
  
  .float-animation {
    animation: float 6s ease-in-out infinite;
  }
  
  /* Style pour les cartes */
  .vision-card {
    border-radius: 12px;
    background: white;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
    overflow: hidden;
  }
  
  .vision-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #7a9e42;
  }
  
  /* Gradient pour le titre */
  .gradient-text {
    background: linear-gradient(to right, #BB6506, #94b95a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
  }
  
  /* Style pour les boutons */
  .btn-primary-custom {
    background: linear-gradient(135deg, #7a9e42, #BB6506);
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(94, 125, 49, 0.3);
  }
  
  .btn-primary-custom:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(94, 125, 49, 0.4);
  }
  
  .btn-outline-custom {
    background: transparent;
    color: #5e7d31;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    border: 2px solid #7a9e42;
    transition: all 0.3s ease;
  }
  
  .btn-outline-custom:hover {
    background: rgba(122, 158, 66, 0.1);
    transform: translateY(-2px);
  }
  
  /* Effet subtil de fond */
  .bg-pattern {
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%237a9e42' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
    background-attachment: fixed;
  }
`;

const VisionPage = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false, // Changé à false pour réactiver l'animation lors du scroll
  });

  const visionPoints = [
    {
      icon: <Sprout className="h-10 w-10 text-yellow-600" />,
      title: "Développement Durable",
      description: "Nous concevons des espaces de vie respectueux de l'environnement, intégrant des solutions écologiques innovantes pour les générations futures."
    },
    {
      icon: <Users className="h-10 w-10 text-yellow-600" />,
      title: "Communauté Solidaire",
      description: "Nous créons des communautés où l'entraide et le partage sont au cœur des relations entre résidents, favorisant un environnement social épanouissant."
    },
    {
      icon: <Building className="h-10 w-10 text-yellow-600" />,
      title: "Infrastructure Moderne",
      description: "Nos programmes intègrent des équipements et services essentiels pour une vie quotidienne confortable, adaptés aux besoins contemporains."
    },
    {
      icon: <Sun className="h-10 w-10 text-yellow-600" />,
      title: "Énergie Renouvelable",
      description: "L'utilisation d'énergies propres est privilégiée pour réduire notre impact environnemental et créer des habitats autonomes et responsables."
    }
  ];

  // Animation variants pour différents éléments
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Notre Vision | SCI BIBA IMMO INGENIERING</title>
        <meta name="description" content="Découvrez notre vision pour l'avenir de l'habitat communautaire et du développement durable." />
        <style>{customStyles}</style>
      </Helmet>

      <div className="pt-24 bg-pattern">
        <Section className="py-20">
          <div ref={ref} className="max-w-5xl mx-auto px-4">
            <motion.div 
              className="text-center mb-20"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <h1 className="text-5xl font-bold gradient-tex text-black mb-6 font-heading tracking-tight">
                Notre Vision Future
              </h1>
              <div className="w-20 h-1 bg-yellow-500 mx-auto mb-8 rounded-full"></div>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Nous imaginons et construisons les communautés de demain, où développement 
                durable et bien-être social se rencontrent harmonieusement pour créer un avenir meilleur.
              </p>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20"
              variants={staggerContainer}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {visionPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  className="vision-card p-6"
                  variants={fadeInUp}
                >
                  <div className="flex items-start gap-5">
                    <div className="p-4 bg-primary-950 rounded-full float-animation">
                      {point.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                        {point.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">{point.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              className="rounded-2xl p-10 text-center overflow-hidden relative"
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeInUp}
              style={{
                background: "linear-gradient(135deg, #f5f8ed 0%, #e6efd1 100%)",
                boxShadow: "0 20px 40px -10px rgba(122, 158, 66, 0.2)"
              }}
            >
              {/* Cercles décoratifs */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-primary-100 -mt-20 -mr-20 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-primary-200 -mb-10 -ml-10 opacity-40"></div>
              
              <h2 className="text-3xl font-bold text-primary-800 mb-5 relative z-10">
                Rejoignez-nous dans cette aventure
              </h2>
              <p className="text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed relative z-10">
                Ensemble, construisons un avenir où chaque famille peut accéder à 
                la propriété tout en participant à un projet de société durable et solidaire.
                Votre foyer de demain commence aujourd'hui.
              </p>
              <div className="inline-flex gap-5 relative z-10">
                <a href="/programmes" className="btn-primary-custom">
                  Découvrir nos programmes
                </a>
                <a href="/adherer" className="btn-outline-custom">
                  Comment adhérer
                </a>
              </div>
            </motion.div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default VisionPage;