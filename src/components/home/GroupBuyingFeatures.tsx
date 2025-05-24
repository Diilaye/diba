import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Calculator,
  FileText,
  Calendar,
  Award,
  Leaf,
  ShieldCheck,
  Home,
  Handshake
} from 'lucide-react';
import Section from '../ui/Section';
import ProcessFlow from '../ui/ProcessFlow';

const GroupBuyingFeatures = () => {
  const [activeTab, setActiveTab] = useState('concept');
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Données sur les avantages de l'achat groupé
  const benefits = [
    {
      icon: <TrendingUp className="h-12 w-12 text-yellow-600" />,
      title: "Économies substantielles",
      description: "Réduisez jusqu'à 40% le coût d'acquisition par rapport à un achat individuel. La mutualisation des frais et notre pouvoir de négociation collectif permettent des tarifs préférentiels exclusifs."
    },
    {
      icon: <Leaf className="h-12 w-12 text-yellow-600" />,
      title: "Impact écologique positif",
      description: "Participez à des projets respectueux de l'environnement avec infrastructures durables intégrées : énergies renouvelables, gestion responsable de l'eau et agriculture régénératrice."
    },
    {
      icon: <Users className="h-12 w-12 text-yellow-600" />,
      title: "Communauté partageant vos valeurs",
      description: "Rejoignez des personnes partageant votre vision et vos valeurs. Nos communautés sont fondées sur l'entraide, la solidarité et le respect mutuel pour un cadre de vie harmonieux."
    },
    {
      icon: <ShieldCheck className="h-12 w-12 text-yellow-600" />,
      title: "Sécurité juridique garantie",
      description: "Bénéficiez d'une structure juridique solide et transparente. Nous assurons la conformité réglementaire et sécurisons chaque étape du processus d'acquisition collective."
    },
    {
      icon: <Home className="h-12 w-12 text-yellow-600" />,
      title: "Infrastructures de qualité",
      description: "Accédez à des aménagements et infrastructures que vous ne pourriez pas développer seul : écoles, centres de santé, espaces communautaires, systèmes d'énergie partagés."
    },
    {
      icon: <Handshake className="h-12 w-12 text-yellow-600" />,
      title: "Gouvernance participative",
      description: "Prenez part aux décisions concernant votre communauté. Notre modèle de gouvernance inclusive garantit que chaque voix compte dans le développement de votre lieu de vie."
    }
  ];

  // Étapes du processus d'achat groupé
  const process = [
    {
      icon: <Users />,
      title: "Adhesion au modele économique achat groupe",
      description: "Réunion des membres partageant les mêmes valeurs et objectifs pour former une communauté cohérente."
    },
    {
      icon: <FileText />,
      title: "Souscription à la charte",
      description: "Mise en place d'une entité légale commune (SCI, coopérative) pour sécuriser le projet."
    },
    {
      icon: <Calculator />,
      title: "Choisir sama projet achat groupé",
      description: "Rassemblement des contributions financières selon un plan transparent et équitable."
    },
    {
      icon: <CheckCircle />,
      title: "Phase aquisition parcelle",
      description: "Achat du terrain ou de la propriété au nom de la structure commune à des conditions avantageuses."
    },
    {
      icon: <Calendar />,
      title: "Phase construction",
      description: "Mise en œuvre des infrastructures et aménagements selon un calendrier établi collectivement."
    },
    // {
    //   icon: <Award />,
    //   title: "Gestion communautaire",
    //   description: "Administration participative des espaces et services partagés pour le bien-être de tous."
    // }
  ];

  // Témoignages de membres existants
  const testimonials = [
    {
      quote: "L'achat groupé m'a permis d'accéder à un terrain que je n'aurais jamais pu acquérir seul, tout en rejoignant une communauté qui partage ma vision d'un mode de vie durable.",
      author: "Amadou N., membre depuis 2022",
      location: "Kolda Eco-Village"
    },
    {
      quote: "La force du collectif a fait toute la différence. Non seulement j'ai économisé près de 35% sur le prix de ma parcelle, mais j'ai aussi gagné des amis et voisins extraordinaires.",
      author: "Fatou S., membre depuis 2023",
      location: "Mbour Ocean Community"
    },
    {
      quote: "Le processus a été transparent de A à Z. Les décisions prises collectivement ont vraiment permis de créer un lieu de vie qui répond aux besoins de tous les membres.",
      author: "Ibrahim et Marie D., membres depuis 2021",
      location: "Thiès Green Valley"
    }
  ];

  return (
    <Section bgColor="bg-white" className="py-24 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-gray-50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-yellow-100 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-yellow-100 rounded-full opacity-20 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div ref={ref} className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-3">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                APPROCHE INNOVANTE
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
              L'achat groupé : un nouveau paradigme immobilier
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Découvrez comment l'achat groupé de terrains révolutionne l'accès à la propriété foncière, 
              combinant avantages économiques, impact écologique positif et création de communautés résilientes.
            </p>
          </motion.div>

          {/* Onglets de navigation */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { id: 'concept', label: 'Le Concept' },
              { id: 'benefits', label: 'Avantages' },
              { id: 'process', label: 'Parcours Souscription' },
              { id: 'stories', label: 'Témoignages' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </motion.div>

          {/* Contenu de l'onglet "Le Concept" */}
          {activeTab === 'concept' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div className="relative">
                <div className="aspect-w-4 aspect-h-3 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="https://images.pexels.com/photos/6647037/pexels-photo-6647037.jpeg" 
                    alt="Communauté d'achat groupé" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-yellow-50 rounded-full -z-10"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-100 rounded-full -z-10"></div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Qu'est-ce que l'achat groupé ?</h3>
                <p className="text-gray-700 mb-4">
                  L'achat groupé de terrains est une approche collaborative qui permet à plusieurs personnes 
                  de se réunir pour acquérir collectivement une surface foncière plus importante que ce qu'elles 
                  pourraient s'offrir individuellement.
                </p>
                <p className="text-gray-700 mb-4">
                  Cette mutualisation des ressources permet non seulement de réduire considérablement les coûts d'acquisition, 
                  mais aussi de partager les frais d'infrastructures, de viabilisation et d'aménagements communs.
                </p>
                <p className="text-gray-700 mb-6">
                  Chez BIBA IMMO, nous avons structuré cette approche en un processus transparent et sécurisé, 
                  permettant à chacun de devenir propriétaire dans des conditions optimales tout en rejoignant 
                  une communauté partageant les mêmes valeurs de solidarité et de respect de l'environnement.
                </p>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                  <p className="text-gray-700 font-medium">
                    L'achat groupé n'est pas seulement une transaction immobilière - c'est un projet de vie 
                    commun qui transforme l'acquisition de terrain en une aventure humaine enrichissante.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Contenu de l'onglet "Avantages" */}
          {activeTab === 'benefits' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                >
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg inline-block">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Contenu de l'onglet "Processus" */}
          {activeTab === 'process' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-16"
            >
              <div className="text-center max-w-3xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Comment fonctionne l'achat groupé ?</h3>
                <p className="text-gray-700">
                  Notre approche structurée en étapes vous guide de la formation de la communauté jusqu'à la réalisation 
                  de votre projet d'habitat collectif, en assurant transparence et sécurité à chaque phase.
                </p>
              </div>
              
              {/* Visualisation du processus cyclique */}
              <ProcessFlow />
              
              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {process.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg border border-yellow-100 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-4">
                        {step.icon}
                      </div>
                      <span className="text-yellow-600 font-bold text-lg">{index + 1}</span>
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h4>
                    <p className="text-gray-600">{step.description}</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center">
                <a href="#contact" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl transition-all group">
                  Démarrer votre projet d'achat groupé
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div> */}
            </motion.div>
          )}

          {/* Contenu de l'onglet "Témoignages" */}
          {activeTab === 'stories' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                >
                  <div className="mb-4">
                    <svg className="h-8 w-8 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>
                  <p className="text-gray-600 italic mb-6">{testimonial.quote}</p>
                  <div>
                    <p className="text-gray-900 font-medium">{testimonial.author}</p>
                    <p className="text-yellow-600 text-sm">{testimonial.location}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

        
          {/* Chiffres clés sur l'achat groupé */}
          <motion.div 
            className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {[
              { value: "Sama achat groupé 1", label: "Nombre de terrains disponibles : 0" , zone : "Mont Roland" , link : "" },
              { value: "Sama achat groupé 2", label: "Nombre de terrains disponibles : 0" , zone : "Mont Roland" , link : "" },
              { value: "Sama achat groupé 3", label: "Nombre de terrains disponibles : 224" , zone : "Louly (Mbour)" , link : "/programmes/3" },
              { value: "Sama achat groupé 4", label: "Nombre de terrains disponibles : 300" , zone : "Thieo (Noto Diobasse)" , link : "/programmes/4" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
              >
                <p className="text-xl md:text-xl font-bold text-yellow-600 mb-2">{stat.value}</p>
                <p className="text-gray-600 font-bold">- {stat.zone} -</p>
                <p className="text-gray-600">{stat.label}</p>
                <a href={stat.link} className="text-yellow-600 hover:underline">Voir le programme</a>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default GroupBuyingFeatures;