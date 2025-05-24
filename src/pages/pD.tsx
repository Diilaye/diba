import React,{ useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  Download, 
  Star, 
  Share2, 
  Heart,
  Phone,
  MessageCircle,
  FileText,
  Layers,
  Ruler,
  Droplets,
  Sun,
  Leaf,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  Award,
  Home,
  School,
  HeartPulse,
  Store,
  Wifi
} from 'lucide-react';

// Exemple de données détaillées pour un programme
const programData = {
  id: 'kolda-eco-village',
  title: 'Kolda Eco-Village',
  subtitle: 'Communauté agricole durable et innovante',
  coverImage: 'https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg',
  status: 'En cours de développement - Phase 2',
  location: {
    city: 'Région de Kolda',
    region: 'Casamance',
    country: 'Sénégal',
    coordinates: '12.8838° N, 14.9412° W',
    distanceFromCity: '12 km du centre-ville de Kolda'
  },
  price: {
    base: 1500000,
    monthly: 25000,
    initialDeposit: 300000,
    financing: true,
    pricePer: 'parcelle de 500m²'
  },
  availability: {
    status: 'Disponible',
    totalPlots: 150,
    remainingPlots: 42,
    percentSold: 72
  },
  timing: {
    launchDate: 'Janvier 2023',
    currentPhase: 'Phase 2 sur 4',
    completionDate: 'Décembre 2025',
    nextMilestone: 'Début des installations solaires: Août 2025'
  },
  community: {
    currentMembers: 78,
    targetMembers: 150,
    membersSatisfaction: 4.8,
    reviewCount: 32,
    demographics: 'Familles (60%), Agriculteurs (25%), Retraités (15%)'
  },
  specifications: {
    totalArea: '250 hectares',
    plotSizes: ['500m²', '750m²', '1000m²'],
    commonAreas: '75 hectares (30% de la superficie totale)',
    terrainType: 'Mixte: forêt (40%), savane (30%), terres arables (30%)',
    waterAccess: 'Rivière, puits et système de récupération d\'eau de pluie',
    soilQuality: 'Fertile, idéal pour l\'agriculture durable'
  },
  amenities: [
    { name: 'Agriculture collective', icon: <Leaf />, status: 'Disponible' },
    { name: 'Énergie solaire', icon: <Sun />, status: 'En cours d\'installation' },
    { name: 'Maisons écologiques', icon: <Home />, status: 'Plans disponibles' },
    { name: 'Système hydrique', icon: <Droplets />, status: 'Opérationnel' },
    { name: 'École communautaire', icon: <School />, status: 'Ouverture 2025' },
    { name: 'Centre de santé', icon: <HeartPulse />, status: 'En construction' },
    { name: 'Épicerie solidaire', icon: <Store />, status: 'Opérationnelle' },
    { name: 'Internet haut débit', icon: <Wifi />, status: 'Disponible' },
    { name: 'Sécurité communautaire', icon: <ShieldCheck />, status: 'En place' }
  ],
  highlights: [
    'Agriculture régénérative et permaculture',
    'Autonomie énergétique complète (solaire)',
    'Construction avec matériaux locaux durables',
    'Système hydrique en circuit fermé',
    'Gouvernance participative',
    'Formation et éducation intégrées',
    'Préservation de la biodiversité locale'
  ],
  sustainabilityFeatures: [
    'Zéro déchet - compostage et recyclage intégrés',
    'Empreinte carbone positive grâce à la reforestation',
    'Collecte et utilisation des eaux de pluie',
    'Toilettes sèches et traitement naturel des eaux',
    'Production alimentaire biologique locale'
  ],
  financialBenefits: [
    'Économies sur les factures d\'énergie et d\'eau',
    'Valorisation estimée à 8-12% par an',
    'Revenus potentiels via les projets agricoles communautaires',
    'Options de financement flexibles sur 5 ans',
    'Programme de référencement avec bonus'
  ],
  images: [
    {
      url: 'https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg',
      caption: 'Vue aérienne du site en développement'
    },
    {
      url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      caption: 'Modèle de maison écologique'
    },
    {
      url: 'https://images.pexels.com/photos/462331/pexels-photo-462331.jpeg',
      caption: 'Cultures agricoles en permaculture'
    },
    {
      url: 'https://images.pexels.com/photos/158316/kinzig-fischer-bach-black-forest-water-158316.jpeg',
      caption: 'Système de gestion des eaux'
    },
    {
      url: 'https://images.pexels.com/photos/9875441/pexels-photo-9875441.jpeg',
      caption: 'Installation de panneaux solaires'
    },
    {
      url: 'https://images.pexels.com/photos/2866079/pexels-photo-2866079.jpeg',
      caption: 'Espaces communautaires'
    }
  ],
  testimonials: [
    {
      name: 'Moussa Diallo',
      role: 'Agriculteur et résident depuis 2023',
      quote: 'Rejoindre Kolda Eco-Village a transformé ma vie. J\'ai non seulement un terrain fertile, mais aussi une communauté solidaire qui partage mes valeurs. Ma production agricole a doublé grâce aux techniques de permaculture.',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      rating: 5
    },
    {
      name: 'Aïssatou Sow',
      role: 'Enseignante et membre du conseil',
      quote: 'Ce qui me plaît le plus ici, c\'est l\'approche holistique. Nous ne construisons pas seulement des maisons, nous créons un mode de vie durable et une communauté résiliente pour nos enfants.',
      avatar: 'https://images.pexels.com/photos/3770254/pexels-photo-3770254.jpeg',
      rating: 5
    },
    {
      name: 'Ibrahima & Fatou Ndiaye',
      role: 'Jeune couple installé en 2024',
      quote: 'Nous cherchions un investissement qui ait du sens et qui nous permettrait de construire progressivement notre avenir. Avec le plan de financement flexible, nous avons pu rejoindre la communauté sans attendre.',
      avatar: 'https://images.pexels.com/photos/935977/pexels-photo-935977.jpeg',
      rating: 4
    }
  ],
  milestones: [
    {
      date: 'Janvier 2023',
      title: 'Lancement du projet',
      description: 'Acquisition des terres et premières souscriptions'
    },
    {
      date: 'Juin 2023',
      title: 'Phase 1 complétée',
      description: 'Délimitation des parcelles et accès à l\'eau'
    },
    {
      date: 'Décembre 2023',
      title: 'Premières installations',
      description: 'Arrivée des premiers résidents et cultures initiales'
    },
    {
      date: 'Mai 2024',
      title: 'Infrastructure communautaire',
      description: 'Construction de l\'épicerie et des premiers espaces communs'
    },
    {
      date: 'Août 2025',
      title: 'Énergie solaire',
      description: 'Installation du réseau électrique autonome'
    },
    {
      date: 'Décembre 2025',
      title: 'Achèvement prévu',
      description: 'Finalisation de toutes les infrastructures prévues'
    }
  ],
  faq: [
    {
      question: 'Comment fonctionne le processus d\'adhésion ?',
      answer: 'L\'adhésion se fait en 3 étapes: souscription avec versement initial, sélection de votre parcelle, puis finalisation du paiement ou mise en place du plan de financement. Vous devenez alors membre à part entière de la communauté.'
    },
    {
      question: 'Puis-je construire immédiatement sur ma parcelle ?',
      answer: 'Dès le versement initial, vous pouvez commencer les préparatifs. La construction effective peut démarrer une fois 50% du montant réglé. Nous proposons des modèles de maisons écologiques adaptées au site.'
    },
    {
      question: 'Comment fonctionne la gouvernance communautaire ?',
      answer: 'Chaque membre dispose d\'une voix dans l\'association des propriétaires. Les décisions importantes sont prises collectivement lors des assemblées trimestrielles. Des comités thématiques (agriculture, énergie, etc.) coordonnent les projets spécifiques.'
    },
    {
      question: 'Y a-t-il des frais mensuels ou annuels ?',
      answer: 'Une contribution mensuelle de 25,000 FCFA par parcelle couvre l\'entretien des espaces communs, la sécurité et les projets communautaires. Ce montant est révisé annuellement par vote.'
    },
    {
      question: 'Quelles sont les options de financement disponibles ?',
      answer: 'Nous proposons des plans de paiement flexibles sur 3 à 5 ans après un versement initial de 20%. Nous travaillons également avec plusieurs banques partenaires qui offrent des prêts à taux préférentiels pour nos membres.'
    }
  ],
  process: [
    {
      step: 1,
      title: 'Prise de contact',
      description: 'Réservez une consultation personnalisée par téléphone ou en personne'
    },
    {
      step: 2,
      title: 'Présentation détaillée',
      description: 'Découvrez tous les aspects du projet et visitez virtuellement le site'
    },
    {
      step: 3,
      title: 'Réservation initiale',
      description: 'Versement de 5% pour bloquer votre parcelle pendant 30 jours'
    },
    {
      step: 4,
      title: 'Souscription définitive',
      description: 'Versement initial de 20% et choix du plan de financement'
    },
    {
      step: 5,
      title: 'Intégration communautaire',
      description: 'Bienvenue dans la famille BIBA IMMO et présentation aux autres membres'
    }
  ],
  resources: [
    {
      title: 'Brochure détaillée',
      type: 'PDF',
      size: '4.2 MB',
      icon: <FileText />
    },
    {
      title: 'Plan du site',
      type: 'PDF',
      size: '2.8 MB',
      icon: <Layers />
    },
    {
      title: 'Modèles de maisons',
      type: 'PDF',
      size: '5.1 MB',
      icon: <Home />
    },
    {
      title: 'Contrat type',
      type: 'PDF',
      size: '1.3 MB',
      icon: <FileText />
    }
  ],
  contactOptions: [
    {
      method: 'WhatsApp',
      value: '+221 77 123 45 67',
      action: 'Réponse en moins de 2h',
      icon: <MessageCircle />
    },
    {
      method: 'Téléphone',
      value: '+221 77 123 45 67',
      action: 'Appeler maintenant',
      icon: <Phone />
    },
    {
      method: 'Rendez-vous',
      value: 'En personne ou visioconférence',
      action: 'Réserver un créneau',
      icon: <Calendar />
    },
    {
      method: 'Visite du site',
      value: 'Tous les samedis à 10h',
      action: 'Réserver une place',
      icon: <MapPin />
    }
  ]
};

// Composant pour les boutons d'action flottants
const FloatingActions = ({ onShowInterest  }) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 sm:hidden">
      <button 
        onClick={onShowInterest}
        className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors"
      >
        <Heart className="h-6 w-6" />
      </button>
      <a 
        href="tel:+221771234567"
        className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center shadow-lg hover:bg-yellow-600 transition-colors"
      >
        <Phone className="h-6 w-6" />
      </a>
    </div>
  );
};

// Composant pour l'en-tête avec statut et actions rapides
const ProgramHeader = ({ program }) => {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900 truncate md:hidden">{program.title}</h1>
            <div className="hidden md:block">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                program.availability.remainingPlots < 20 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}>
                {program.availability.remainingPlots} parcelles disponibles
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm text-gray-500">À partir de</p>
              <p className="text-xl font-bold text-yellow-600">{program.price.base.toLocaleString()} FCFA</p>
            </div>
            <button className="hidden md:flex items-center gap-1 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <Share2 className="h-5 w-5" />
              <span className="text-sm">Partager</span>
            </button>
            <button className="hidden md:flex items-center gap-1 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Sauvegarder</span>
            </button>
            <a 
              href="#contact" 
              className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-medium px-6 py-2 rounded-full shadow-sm transition-all"
            >
              Je suis intéressé
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant de galerie d'images
const ImageGallery = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="relative">
      {/* Image principale */}
      <div className="aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg">
        <img 
          src={images[activeImage].url} 
          alt={images[activeImage].caption} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Miniatures */}
      <div className="grid grid-cols-6 gap-2 mt-2">
        {images.slice(0, 6).map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImage(index)}
            className={`aspect-square overflow-hidden rounded-md border-2 transition-all ${
              activeImage === index ? 'border-yellow-500 opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
            }`}
          >
            <img 
              src={image.url} 
              alt={`Miniature ${index + 1}`} 
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
      
      {/* Légende */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 text-white backdrop-blur-sm rounded-b-lg">
        <p className="text-sm">{images[activeImage].caption}</p>
      </div>
    </div>
  );
};

// Composant pour les avis et témoignages
const Testimonials = ({ testimonials }) => {
  return (
    <div className="bg-yellow-50 rounded-xl p-6 mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Ce que disent nos membres</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="bg-white rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-4">
              <img 
                src={testimonial.avatar} 
                alt={testimonial.name} 
                className="w-12 h-12 rounded-full object-cover mr-3"
              />
              <div>
                <h4 className="font-medium text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`} fill={i < testimonial.rating ? "currentColor" : "none"} />
              ))}
            </div>
            <p className="text-gray-700 italic">{testimonial.quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant pour la timeline de progression
const Timeline = ({ milestones }) => {
  const currentDate = new Date();
  const findCurrentMilestone = () => {
    // Déterminer l'étape actuelle basée sur la date
    const dates = milestones.map(m => new Date(m.date));
    let currentIndex = 0;
    
    for (let i = 0; i < dates.length; i++) {
      if (currentDate >= dates[i]) {
        currentIndex = i;
      } else {
        break;
      }
    }
    
    return currentIndex;
  };

  const currentMilestoneIndex = findCurrentMilestone();

  return (
    <div className="relative mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Calendrier du projet</h3>
      <div className="ml-6 relative border-l-2 border-yellow-200 pl-8 pb-6">
        {milestones.map((milestone, index) => {
          const isPast = index <= currentMilestoneIndex;
          const isCurrent = index === currentMilestoneIndex;
          
          return (
            <div key={index} className="mb-8 relative">
              <div className={`absolute -left-10 w-4 h-4 rounded-full ${
                isPast ? 'bg-yellow-500' : 'bg-gray-300'
              } border-4 ${
                isPast ? 'border-yellow-100' : 'border-gray-100'
              } ${
                isCurrent ? 'ring-4 ring-yellow-200' : ''
              }`}></div>
              <div className="mb-1 text-sm text-gray-500">{milestone.date}</div>
              <h4 className={`font-bold ${isPast ? 'text-gray-900' : 'text-gray-500'}`}>
                {milestone.title}
                {isCurrent && (
                  <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                    Actuel
                  </span>
                )}
              </h4>
              <p className="text-gray-600">{milestone.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Composant pour la FAQ avec accordéon
const FAQ = ({ faq }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Questions fréquentes</h3>
      <div className="space-y-3">
        {faq.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-200 rounded-lg overflow-hidden"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
              onClick={() => toggleQuestion(index)}
            >
              {item.question}
              <svg 
                className={`w-5 h-5 transition-transform ${openIndex === index ? 'transform rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                {item.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Composant pour le processus d'achat en étapes
const Process = ({ process }) => {
  return (
    <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl p-6 mt-8">
      <h3 className="text-xl font-bold mb-6">Comment rejoindre ce programme ?</h3>
      <div className="relative">
        <div className="hidden md:block absolute left-8 top-0 bottom-0 w-1 bg-white/30"></div>
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-5">
          {process.map((step, index) => (
            <div key={index} className="relative">
              <div className="hidden md:flex items-center justify-center absolute left-8 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white text-yellow-600 font-bold top-8">
                {step.step}
              </div>
              <div className="md:ml-12 md:pl-4">
                <div className="flex md:block items-center">
                  <div className="flex items-center justify-center md:hidden mr-4 w-8 h-8 rounded-full bg-white text-yellow-600 font-bold flex-shrink-0">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1">{step.title}</h4>
                    <p className="text-yellow-100 text-sm">{step.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 text-center">
        <a 
          href="#contact" 
          className="inline-block px-8 py-3 bg-white text-yellow-600 font-medium rounded-full shadow-md hover:shadow-lg transition-all"
        >
          Commencer le processus
        </a>
      </div>
    </div>
  );
};

// Composant principal pour la page de détail d'un programme
const ProgramDetail = () => {
  const { id } = useParams();
  const [interested, setInterested] = useState(false);
  const [haveAccess, sethaveAccess] = useState(true);
  const [program, setProgram] = useState(programData);
  
  // Dans une application réelle, vous feriez un appel API en utilisant l'ID
  // pour obtenir les données du programme spécifique
  
  // Simuler le chargement des données du programme
  useEffect(() => {
    window.scrollTo(0, 0);
    // Ici, vous feriez un appel API pour charger les données du programme
    // setProgram(result);
  }, [id]);

  const handleShowInterest = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setInterested(true);
  };

  if (!program) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="bg-gray-50 pb-20">
      {/* Actions flottantes mobiles */}
      <FloatingActions onShowInterest={handleShowInterest} />
      
      {/* En-tête sticky */}
      <ProgramHeader program={program} />
      
      <div className="container mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-1 hidden md:block">{program.title}</h1>
            <p className="text-xl text-yellow-600 mb-4 hidden md:block">{program.subtitle}</p>
            
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="h-5 w-5 mr-2 text-yellow-600" />
              <span>{program.location.city}, {program.location.country} • </span>
              <span className="ml-1 text-gray-500">{program.location.distanceFromCity}</span>
            </div>
            
            {/* Galerie d'images */}
            <ImageGallery images={program.images} />
            
            {/* Tags et statut */}
            <div className="flex flex-wrap items-center justify-between mt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  {program.availability.status}
                </span>
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {program.timing.currentPhase}
                </span>
              </div>
              <div className="flex items-center text-gray-600">
                <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                <span className="font-medium mr-1">{program.community.membersSatisfaction}</span>
                <span className="text-sm text-gray-500">({program.community.reviewCount} avis)</span>
              </div>
            </div>
            
            {/* Points forts */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Points forts du programme</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {program.highlights.map((highlight, index) => (
                  <div 
                    key={index} 
                    className="flex items-start p-3 bg-white rounded-lg border border-gray-100 shadow-sm"
                  >
                    <CheckCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Description détaillée */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">À propos de {program.title}</h2>
              <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6">
                <p className="text-gray-700 mb-4">
                  Kolda Eco-Village représente l'aboutissement de notre vision d'un habitat harmonieusement intégré dans un environnement naturel préservé. Situé dans la région fertile de Casamance, ce projet s'étend sur 250 hectares où cohabitent forêts préservées, terres agricoles régénératives et infrastructures communautaires durables.
                </p>
                <p className="text-gray-700 mb-4">
                  Notre approche place la durabilité et la communauté au centre de toutes nos décisions. Chaque parcelle est conçue pour permettre l'autonomie tout en favorisant les interactions sociales et le partage des ressources. Vous rejoindrez une communauté diversifiée d'agriculteurs, de familles et de retraités partageant les mêmes valeurs d'écologie et de solidarité.
                </p>
                <p className="text-gray-700">
                  Avec 72% des parcelles déjà acquises, une communauté florissante de 78 membres est déjà engagée dans ce projet pionnier. Les infrastructures essentielles sont en place, et chaque mois apporte de nouvelles améliorations, faisant de Kolda Eco-Village un investissement non seulement financier, mais également social et environnemental.
                </p>
              </div>
            </div>
            
            {/* Caractéristiques et spécifications */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Caractéristiques du site</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <Layers className="h-5 w-5 mr-2 text-yellow-600" />
                    Terrain et superficie
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between">
                      <span>Superficie totale:</span>
                      <span className="font-medium">{program.specifications.totalArea}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Tailles des parcelles:</span>
                      <span className="font-medium">{program.specifications.plotSizes.join(', ')}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Espaces communs:</span>
                      <span className="font-medium">{program.specifications.commonAreas}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Type de terrain:</span>
                      <span className="font-medium">{program.specifications.terrainType}</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-5 border border-gray-100 shadow-sm">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <Droplets className="h-5 w-5 mr-2 text-yellow-600" />
                    Ressources naturelles
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex justify-between">
                      <span>Accès à l'eau:</span>
                      <span className="font-medium">{program.specifications.waterAccess}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Qualité du sol:</span>
                      <span className="font-medium">{program.specifications.soilQuality}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Ensoleillement:</span>
                      <span className="font-medium">Excellent (2200h/an)</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Biodiversité:</span>
                      <span className="font-medium">Riche (280 espèces recensées)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Aménagements */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Aménagements et infrastructures</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {program.amenities.map((amenity, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                        {React.cloneElement(amenity.icon, { className: 'h-5 w-5 text-yellow-600' })}
                      </div>
                      <h3 className="font-medium text-gray-900">{amenity.name}</h3>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      amenity.status === 'Disponible' ? 'bg-green-100 text-green-800' :
                      amenity.status === 'En construction' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {amenity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Témoignages */}
            <Testimonials testimonials={program.testimonials} />
            
            {/* Timeline */}
            <Timeline milestones={program.milestones} />
            
            {/* Durabilité */}
            <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Leaf className="h-6 w-6 mr-2 text-green-600" />
                Impact écologique positif
              </h2>
              <p className="text-gray-700 mb-4">
                Notre projet est conçu avec une empreinte carbone positive, contribuant activement à la régénération de l'environnement local tout en offrant un mode de vie durable.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {program.sustainabilityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Avantages financiers */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
                Avantages financiers
              </h2>
              <p className="text-gray-700 mb-4">
                Au-delà d'un lieu de vie exceptionnel, Kolda Eco-Village représente un investissement judicieux avec un potentiel de valorisation important et des bénéfices économiques tangibles.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {program.financialBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* FAQ */}
            <FAQ faq={program.faq} />
            
            {/* Téléchargements */}
            <div className="mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Documents à télécharger</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {program.resources.map((resource, index) => (
                  <a 
                    key={index}
                    href="#"
                    className="flex items-center p-4 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center mr-3">
                      {React.cloneElement(resource.icon, { className: 'h-5 w-5 text-yellow-600' })}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{resource.title}</h3>
                      <p className="text-xs text-gray-500">{resource.type} • {resource.size}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Colonne latérale */}
          <div className="lg:col-span-1">
            {/* Carte de contact et d'action */}
            <div id="contact" className="sticky top-24 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-6">
                <h2 className="text-xl font-bold mb-1">Réservez votre parcelle</h2>
                <p className="opacity-90">Quelques parcelles encore disponibles</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Prix à partir de</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">{program.price.base.toLocaleString()}</span>
                    <span className="text-gray-600 ml-1">FCFA</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">pour une parcelle de {program.price.pricePer}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Disponibilité</span>
                    <span className="font-medium text-gray-900">{program.availability.remainingPlots}/{program.availability.totalPlots} parcelles</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-500 to-amber-600"
                      style={{ width: `${program.availability.percentSold}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {program.availability.percentSold}% des parcelles sont déjà réservées
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-3 text-yellow-600" />
                    <div>
                      <p className="font-medium">Versement initial de seulement 20%</p>
                      <p className="text-sm text-gray-500">{(program.price.base * 0.2).toLocaleString()} FCFA</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-yellow-600" />
                    <div>
                      <p className="font-medium">Plan de paiement flexible</p>
                      <p className="text-sm text-gray-500">Sur 3 à 5 ans selon vos possibilités</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Award className="h-5 w-5 mr-3 text-yellow-600" />
                    <div>
                      <p className="font-medium">Garantie de satisfaction</p>
                      <p className="text-sm text-gray-500">Remboursement à 100% pendant 30 jours</p>
                    </div>
                  </div>
                </div>
                
                {interested ? (
                  <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                      <p className="font-medium">Merci pour votre intérêt !</p>
                      <p className="text-sm">Un conseiller vous contactera dans les prochaines 24 heures pour discuter de votre projet.</p>
                    </div>
                    <form className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Votre Imatriculation</label>
                        <input 
                          type="text" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Ex: AG1002DKCAM"
                        />
                      </div>
                      {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Numéro de téléphone</label>
                        <input 
                          type="tel" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Ex: +221 77 123 45 67"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input 
                          type="email" 
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Ex: amadou@gmail.com"
                        />
                      </div> */}
                      <button 
                        type="submit" 
                        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-md transition-all"
                      >
                        Acceder a mon dossier
                      </button>
                      <br />
                      <p className="text-sm text-gray-500">Si vous êtes pas souscrit <a href='/adherer'>cliquez ici </a></p>
                    </form>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <button 
                      onClick={handleShowInterest}
                      className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-md transition-all"
                    >
                      Je suis intéressé
                    </button>
                    <a 
                      href={`tel:${program.contactOptions[1].value.replace(/\s+/g, '')}`}
                      className="w-full py-3 flex items-center justify-center bg-white border border-yellow-500 text-yellow-600 font-medium rounded-lg hover:bg-yellow-50 transition-colors"
                    >
                      <Phone className="h-5 w-5 mr-2" />
                      Appelez-nous directement
                    </a>
                  </div>
                )}
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-gray-900 font-medium mb-3">Autres moyens de contact</h3>
                  <div className="space-y-3">
                    {program.contactOptions.map((option, index) => (
                      <a
                        key={index}
                        href="#"
                        className="flex items-center text-gray-700 hover:text-yellow-600"
                      >
                        {React.cloneElement(option.icon, { className: 'h-5 w-5 mr-3 text-yellow-600' })}
                        <div>
                          <p className="font-medium">{option.method}</p>
                          <p className="text-sm text-gray-500">{option.value}</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Processus d'achat */}
        <Process process={program.process} />
      </div>
    </div>
  );
};

export default ProgramDetail;