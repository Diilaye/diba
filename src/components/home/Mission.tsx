import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { Users, Leaf, TrendingUp, MessageSquare } from 'lucide-react';
import Section from '../ui/Section';

const Mission = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { ref: statsRef, inView: statsInView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Statistiques impressionnantes

  // Statistiques impressionnantes
  const stats = [
    { number: "10+", label: "nombre de visiteurs" },
    { number: "5000+", label: "membres de la communauté" },
    { number: "15+", label: "Projets réalisés" },
    { number: "300+", label: "Hectares développés" }
  ];

  // Principes fondateurs développés
  const principles = [
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Mutualisation des ressources",
      description: "En unissant nos forces, nous permettons à chacun d'accéder à des terrains de qualité à des coûts réduits, tout en bénéficiant d'infrastructures modernes."
    },
    {
      icon: <Leaf className="h-6 w-6 text-white" />,
      title: "Développement durable",
      description: "Chaque projet est conçu dans le respect total de l'environnement, avec des solutions écologiques pour l'eau, l'énergie et la gestion des déchets."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      title: "Innovation sociale",
      description: "Nous repensons la façon dont les communautés se forment et interagissent, en favorisant l'entraide, le partage et la propriété collective des espaces communs."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: "Gouvernance participative",
      description: "Nos membres sont impliqués dans les décisions importantes concernant leur communauté, assurant que chaque voix est entendue et respectée."
    }
  ];

  return (
    <Section id="mission" className="py-20 overflow-hidden">
      {/* En-tête de section avec animation */}
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="relative">
          {/* Élément décoratif */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-yellow-400/5 rounded-full blur-3xl"></div>

          <motion.div
            className="text-center max-w-3xl mx-auto mb-20 relative z-10"
            initial={{ opacity: 0, y: 30 }}
            animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-3">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">NOTRE ESSENCE</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
              BIBA IMMO INGENIERING
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Depuis plus de 10 ans, nous révolutionnons le secteur immobilier avec notre approche
              innovante d'achat groupé et notre vision d'un habitat plus humain, plus vert et plus solidaire.
              <span className="font-semibold text-yellow-700"> TABAKH SA REEW</span> est notre engagement pour un Sénégal où chacun peut s'épanouir dans un espace qui lui ressemble.
            </p>
          </motion.div>

          {/* Organigramme de l'entreprise */}
          <motion.h3
            className="text-2xl font-bold text-center mb-8 text-gray-800"
            initial={{ opacity: 0 }}
            animate={sectionInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            Notre Structure Organisationnelle
          </motion.h3>
          
          <div className="relative mb-20 overflow-x-auto py-8">
            <div className="max-w-5xl mx-auto">
              {/* Organigramme professionnel */}
              <div className="org-chart">
                {/* Niveau 1: Gérante */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-md w-64 text-center z-10 relative"
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">Gérante</h3>
                    <p className="text-gray-500 text-sm"></p>
                    {/* Ligne verticale vers le bas */}
                    <div className="absolute bottom-0 left-1/2 w-px h-36 bg-gray-300 transform translate-y-full -translate-x-1/2"></div>
                  </motion.div>
                </div>
                
                {/* Ligne horizontale sous la Gérante */}
                {/* <div className="relative h-px bg-gray-300 mx-auto w-3/4 mb-8"> */}
                  {/* Ligne verticale vers la gauche */}
                  {/* <div className="absolute left-0 top-0 w-1/4 h-px bg-gray-300"></div> */}
                {/* </div> */}
                
                {/* Niveau 2: Directeur Général */}
                <div className="flex mb-16 relative">
                  {/* Ligne verticale descendante à gauche */}
                  {/* <div className="absolute left-[12.5%] top-[-8px] w-px h-8 bg-gray-300"></div> */}
                  
                  {/* Directeur Général */}
                  <motion.div
                    className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-md w-64 text-center z-10 relative ml-[12.5%] -translate-x-1/2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-amber-600"></div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">Direction Général</h3>
                    <p className="text-gray-500 text-sm">Opérations</p>
                    {/* Ligne horizontale vers la droite */}
                    <div className="absolute right-0 top-1/2 w-[calc(29vw-12.5%-20.5rem)] h-px bg-gray-300 transform translate-x-full"></div>
                  </motion.div>
                </div>
                
                {/* Trait horizontal qui va de la Direction Générale vers la ligne verticale de la Gérante */}
                <div className="absolute left-[calc(12.5%+32rem)] top-[172px] w-[calc(50%-12.5%-32rem)] h-px bg-gray-300"></div>
                {/* Trait vertical qui rejoint la ligne verticale de la Gérante */}
                {/* <div className="absolute left-1/2 top-[172px] w-px h-[28px] bg-gray-300"></div> */}
                
                {/* Ligne horizontale sous le Directeur Général */}
                <div className="relative h-px bg-gray-300 mx-auto w-3/4 mb-8 -mt-8"></div>
                
                {/* Niveau 3: Les 4 directions principales */}
                <div className="flex justify-center gap-4 flex-wrap">
                  {/* Direction Technique */}
                  <motion.div
                    className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-md w-48 text-center z-10 relative mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500"></div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">Division Technique</h3>
                    <p className="text-gray-500 text-sm">Développement</p>
                  </motion.div>
                  
                  {/* Direction Commerciale */}
                  <motion.div
                    className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-md w-48 text-center z-10 relative mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-amber-500"></div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">Division Commerciale</h3>
                    <p className="text-gray-500 text-sm">Ventes</p>
                  </motion.div>
                  
                  {/* Direction Informatique */}
                  <motion.div
                    className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-md w-48 text-center z-10 relative mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-purple-500"></div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">Division Informatique</h3>
                    <p className="text-gray-500 text-sm">et Digitale</p>
                  </motion.div>
                  
                  {/* Direction Administrative et Juridique */}
                  <motion.div
                    className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-md w-48 text-center z-10 relative mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-red-500"></div>
                    <h3 className="text-gray-800 font-bold text-lg mb-1">Division Administrative</h3>
                    <p className="text-gray-500 text-sm">et Juridique</p>
                  </motion.div>
                </div>
                
                {/* Style CSS pour les lignes de connexion */}
                <style jsx>{`
                  .org-chart {
                    position: relative;
                  }
                  .org-chart::before {
                    content: '';
                    position: absolute;
                    top: 120px;
                    left: 50%;
                    width: 1px;
                    height: 20px;
                    background-color: #d1d5db;
                  }
                `}</style>
              </div>
            </div>
          </div>

          {/* Statistiques impressionnantes */}
          <div 
            ref={statsRef} 
            className="bg-gradient-to-r from-yellow-600 to-amber-700 rounded-2xl py-12 px-6 my-20 shadow-xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h4 className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</h4>
                  <p className="text-yellow-100">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Principes fondateurs développés */}
          <motion.h3
            className="text-2xl font-bold text-center mb-12 text-gray-800"
            initial={{ opacity: 0 }}
            animate={statsInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            Nos principes fondateurs
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                className="flex gap-5 items-start"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={statsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
              >
                <div className="min-w-[48px] h-12 w-12 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center shadow-md">
                  {principle.icon}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{principle.title}</h4>
                  <p className="text-gray-600">{principle.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Section Photo de la Directrice */}
          <motion.div
            className="mt-16 mb-20 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-full h-full bg-yellow-400 rounded-lg"></div>
                  <img 
                    src="/aby.jpeg" 
                    alt="Directrice de BIBA IMMO" 
                    className="w-[400px] h-[400px] rounded-lg object-cover relative z-10 shadow-md"
                    width="400"
                    height="400"
                  />
                </div>
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
                  Notre Gérante
                </h3>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Sous la direction visionnaire de Mme Aby DIBA, BIBA IMMO INGENIERING s'est imposée comme un leader dans le secteur immobilier au Sénégal. Avec plus de 15 ans d'expérience dans le développement immobilier et l'urbanisme durable, elle a transformé notre approche de l'habitat collectif.
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  "Notre mission est de créer des espaces de vie qui respectent à la fois l'humain et l'environnement, tout en rendant la propriété accessible au plus grand nombre grâce à notre modèle d'achat groupé innovant."
                </p>
                <p className="text-gray-600 italic">— Aby DIBA, Gérante</p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={statsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            <a 
              href="/vision-future" 
              className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:from-yellow-600 hover:to-amber-700"
            >
              Découvrir notre vision complète
            </a>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Mission;