import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Calendar,
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
  Award,
  Home,
  School,
  HeartPulse,
  Store,
  Check,
  ChevronDown
  
} from 'lucide-react';
import MatriculeSearch from './MatriculeSearch';

const ProgramDetail = () => {
  // État des composants
  const [activeImage, setActiveImage] = useState(0);
  const [interested, setInterested] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [availablePlots, setAvailablePlots] = useState(224);
  const [formData, setFormData] = useState({
    nom: '',
    telephone: '',
    email: '',
    parcelles: '1'
  });

  // Données des images
  const images = [
    { url: '/ac1.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac2.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac3.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac4.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac5.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac6.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac7.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac8.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac9.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac10.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac11.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac12.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    { url: '/ac13.jpeg', caption: 'Vue principale du site de Louly Sindiane' },
    ];
  
  // Vidéo de présentation
  const presentationVideo = '/achat3.mp4';

  // Points forts du programme
  const highlights = [
    { icon: <HeartPulse className="w-5 h-5" />, title: "Emplacement stratégique", description: "Sortie péage Mbour, accès direct route" },
    { icon: <Award className="w-5 h-5" />, title: "Aménagement complet", description: "Voiries, réseaux, éclairage public" },
    { icon: <School className="w-5 h-5" />, title: "Services intégrés", description: "École, supermarché, boulangerie" },
    { icon: <Sun className="w-5 h-5" />, title: "Énergie renouvelable", description: "Autonomie énergétique du site" }
  ];

  // Types de logements
  const logements = [
    {
      id: 'f4-eco',
      name: 'Villa F4 Économique',
      icon: '🏡',
      price: '42 804 000',
      features: ['3 chambres + salon RDC', '2 salles de bain + terrasse', 'Cuisine moderne équipée', '145 m² habitables'],
      financing: 'Financement: 120 mois, apport 25%',
      popular: false,
      featured: true
    },
    {
      id: 'f4-gold',
      name: 'Villa F4 Gold',
      icon: '✨',
      price: '61 992 000',
      features: ['R+1 avec terrasse aménagée', '5 salles de bain + bar américain', 'Chambre domestique + cuisine africaine', '210 m² habitables'],
      financing: 'Financement: 120 mois, apport 30%',
      popular: true,
      featured: false
    },
    {
      id: 'f5-prestige',
      name: 'Résidence F5 Prestige',
      icon: '🏰',
      price: '72 324 000',
      features: ['4 chambres + bureau domicile', '6 salles de bain', 'Piscine + mobilier complet', '245 m² sur terrain 400 m²'],
      financing: 'Financement: 120 mois, apport 25%',
      popular: false,
      featured: false
    },
    {
      id: 'f6-prestige',
      name: 'Résidence F6 Prestige',
      icon: '👑',
      price: '122 672 000',
      features: ['5 chambres spacieuses', '7 salles de bain', 'Piscine + terrain 400 m²', '340 m² habitables - Villa de luxe'],
      financing: 'Financement: 120 mois, apport 35%',
      popular: false,
      featured: false
    }
  ];

  // Aménagements
  const amenities = [
    { name: 'École préscolaire et élémentaire', icon: '🏫', status: 'En construction', statusColor: 'bg-blue-100 text-blue-800' },
    { name: 'Supermarché avec boulangerie', icon: '🏪', status: 'Prévu Phase 2', statusColor: 'bg-yellow-100 text-yellow-800' },
    { name: 'Éclairage public LED', icon: '💡', status: 'Disponible', statusColor: 'bg-green-100 text-green-800' },
    { name: 'Forage et château d\'eau', icon: '💧', status: 'Opérationnel', statusColor: 'bg-green-100 text-green-800' },
    { name: 'Centrale solaire autonome', icon: '⚡', status: 'Installation 2025', statusColor: 'bg-blue-100 text-blue-800' },
    { name: 'Sécurité 24h/24', icon: '🛡️', status: 'Opérationnelle', statusColor: 'bg-green-100 text-green-800' }
  ];

  // Témoignages
  const testimonials = [
    {
      name: 'Moussa Diallo',
      role: 'Membre depuis 2023',
      quote: 'Excellent programme avec un suivi professionnel. La transparence dans les démarches et la qualité des aménagements dépassent mes attentes.',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg',
      rating: 5
    },
    {
      name: 'Aïssatou Sow',
      role: 'Diaspora - France',
      quote: 'Parfait pour la diaspora ! Le système de paiement flexible et le suivi à distance facilitent l\'investissement depuis l\'étranger.',
      avatar: 'https://images.pexels.com/photos/3770254/pexels-photo-3770254.jpeg',
      rating: 5
    },
    {
      name: 'Famille Ndiaye',
      role: 'Nouveaux membres 2024',
      quote: 'Un investissement qui a du sens pour l\'avenir de nos enfants. L\'approche communautaire nous plaît beaucoup.',
      avatar: 'https://images.pexels.com/photos/935977/pexels-photo-935977.jpeg',
      rating: 4
    }
  ];

  // Timeline
  const timeline = [
    { date: 'Janvier 2023', title: 'Lancement du programme', description: 'Acquisition des terres et premières souscriptions', completed: true },
    { date: 'Juin 2023', title: 'Phase 1 - Acquisition parcelles', description: 'Délimitation et viabilisation du site', completed: true },
    { date: '2024 - En cours', title: 'Aménagement infrastructure', description: 'Installation voiries, réseaux et équipements communautaires', current: true },
    { date: 'Août 2025', title: 'Installation énergie solaire', description: 'Mise en place de la centrale autonome', completed: false },
    { date: 'Décembre 2025', title: 'Phase 2 - Construction logements', description: 'Début des constructions selon plans approuvés', completed: false },
    { date: '2026', title: 'Livraison & Installation', description: 'Finalisation et installation des premiers résidents', completed: false }
  ];

  // FAQ
  const faq = [
    {
      question: 'Qui peut adhérer au programme Sama Achat Groupé ?',
      answer: 'Le programme s\'adresse à tous, particulièrement aux actifs du secteur informel exclus des circuits bancaires et à la diaspora. Il vise l\'inclusion sociale et lutte contre la spéculation foncière.'
    },
    {
      question: 'Combien de parcelles puis-je acheter ?',
      answer: 'Selon l\'Article 1 du règlement, chaque membre ne peut acheter plus de 2 parcelles dans un programme pour favoriser l\'accès au plus grand nombre.'
    },
    {
      question: 'Que se passe-t-il si je rate des échéances ?',
      answer: 'Des pénalités de 10% s\'appliquent. Après 3 échéances manquées successives sans justificatif, le membre peut être retiré du projet avec remboursement déduction faite des pénalités et 20% de l\'apport.'
    },
    {
      question: 'Les prix évoluent-ils pendant le programme ?',
      answer: 'Oui, selon l\'Article 8, les prix sont majorés de 5% à chaque phase de réservation (durée 30 jours calendaires). Nous sommes actuellement en Phase 1.'
    },
    {
      question: 'Puis-je revendre ma parcelle ou mon logement ?',
      answer: 'La revente n\'est possible qu\'après avoir honoré toutes les obligations financières et légales. BIBA IMMO dispose d\'un droit de préemption en cas de revente.'
    }
  ];

  // Process steps
  const processSteps = [
    { step: 1, title: 'Prise de contact', description: 'Réservez une consultation personnalisée par téléphone ou en personne' },
    { step: 2, title: 'Présentation détaillée', description: 'Découvrez tous les aspects du projet et visitez le site' },
    { step: 3, title: 'Réservation initiale', description: 'Versement de l\'apport pour bloquer votre parcelle' },
    { step: 4, title: 'Souscription définitive', description: 'Finalisation du dossier et choix du plan de financement' },
    { step: 5, title: 'Intégration communautaire', description: 'Bienvenue dans la famille BIBA IMMO et démarrage du projet' }
  ];

  // Documents
  const documents = [
    { name: 'Brochure détaillée', type: 'PDF', size: '4.2 MB', icon: <FileText className="w-5 h-5" /> },
    { name: 'Plan du site', type: 'PDF', size: '2.8 MB', icon: <Layers className="w-5 h-5" /> },
    { name: 'Plans logements', type: 'PDF', size: '5.1 MB', icon: <Home className="w-5 h-5" /> },
    { name: 'Contrat d\'adhésion', type: 'PDF', size: '1.3 MB', icon: <FileText className="w-5 h-5" /> }
  ];

  // Contact options
  const contactOptions = [
    { method: 'WhatsApp', value: '+221 77 123 45 67', icon: <MessageCircle className="w-5 h-5" /> },
    { method: 'Rendez-vous', value: 'En personne ou visioconférence', icon: <Calendar className="w-5 h-5" /> },
    { method: 'Visite du site', value: 'Tous les samedis à 10h', icon: <MapPin className="w-5 h-5" /> }
  ];

  // Effets et fonctions
  useEffect(() => {
    // Simulation de mise à jour de disponibilité
    const interval = setInterval(() => {
      if (Math.random() < 0.1 && availablePlots > 200) {
        setAvailablePlots(prev => prev - 1);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [availablePlots]);

  // Fonctions de gestion du formulaire
  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmitForm = () => {
    // Logique de soumission du formulaire
    console.log('Formulaire soumis:', formData);
    setInterested(true);
  };

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const showInterest = () => {
    // Logique pour montrer l'intérêt
    console.log('Intérêt manifesté');
    setInterested(true);
  };

  const percentageAvailable = (availablePlots / 253) * 100;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Actions flottantes mobiles */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 sm:hidden">
        <button 
          onClick={showInterest}
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

      {/* Header Sticky */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-900 truncate md:hidden">Sama Achat Groupé - Louly Sindiane</h1>
              <div className="hidden md:block">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  availablePlots < 20 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                  {availablePlots} parcelles disponibles
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="hidden md:block text-right">
                <p className="text-sm text-gray-500">À partir de</p>
                <p className="text-xl font-bold text-yellow-600">17 992 968 FCFA</p>
              </div>
              <button className="hidden md:flex items-center gap-1 px-2 py-2 rounded-md text-gray-700 hover:bg-gray-100">
                <Share2 className="h-5 w-5" />
                <span className="text-sm">Partager</span>
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

      <div className="container mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Colonne principale */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-1 hidden md:block">SAMA ACHAT GROUPÉ</h1>
              <p className="text-xl text-yellow-600 mb-4 hidden md:block">Programme 3 - Communauté durable et innovante</p>
              
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2 text-yellow-600" />
                <span>Louly Sindiane, Mbour • Sortie péage, à 200m de la route</span>
              </div>

              
              
              {/* Galerie d'images */}
              <div className="mb-6">

              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg mt-2">
                  <img 
                    src={images[activeImage].url} 
                    alt={images[activeImage].caption} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 text-white backdrop-blur-sm">
                    <p className="text-sm">{images[activeImage].caption}</p>
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  {images.map((image, index) => (
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
                
                
              </div>

              {/* Vidéo de présentation */}
              <div className="mb-6">
                <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-lg mb-2">
                  <video 
                    src={presentationVideo} 
                    controls 
                    poster={images[0].url}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 text-white backdrop-blur-sm">
                    <p className="text-sm">Vidéo de présentation du programme Sama Achat Groupé 3 - Louly Sindiane</p>
                  </div>
                </div>
              </div>

              {/* Tags et statut */}
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Phase 1 Active
                  </span>
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Titre en voie de BAIL
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="font-medium mr-1">4.8</span>
                  <span className="text-sm text-gray-500">(32 avis)</span>
                </div>
              </div>
            </div>

            {/* Points forts */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <CheckCircle className="h-6 w-6 mr-2 text-yellow-600" />
                Points forts du programme
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg">
                    <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center mr-3 text-yellow-600">
                      {highlight.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{highlight.title}</h3>
                      <p className="text-gray-600 text-sm">{highlight.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Description détaillée */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">À propos du programme</h2>
              <div className="text-gray-700 space-y-4">
                <p>
                  Le programme Sama Achat Groupé à Louly Sindiane représente l'aboutissement de notre vision d'un habitat harmonieusement intégré dans la prévention des litiges juridiques et la lutte contre la spéculation foncière. Ce projet s'inscrit dans l'économie sociale-solidaire au service des diasporas et compatriotes à faible revenu.
                </p>
                <p>
                  Notre modèle économique s'appuie sur la sociologie sénégalaise et l'entraide sociale pour encourager l'ancrage territorial. Il promeut l'aménagement de sites ciblés permettant de soutenir l'économie locale et favorise l'inclusion via le logement et la mixité sociale.
                </p>
                <p>
                  Avec {availablePlots} parcelles encore disponibles sur 253, rejoignez une communauté qui partage les valeurs de solidarité et de développement durable. Les prix appliqués défient toute concurrence tout en maintenant la qualité et la sécurité juridique.
                </p>
              </div>
            </div>

            {/* Caractéristiques du site */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Layers className="h-6 w-6 mr-2 text-yellow-600" />
                Caractéristiques du site
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <MapPin className="h-5 w-5 mr-2 text-yellow-600" />
                    Terrain et superficie
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Parcelles disponibles:</span>
                      <span className="font-medium">{availablePlots}/253</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Surface parcelle:</span>
                      <span className="font-medium">200 m²</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="font-medium">16m × 12,5m</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type de titre:</span>
                      <span className="font-medium">BAIL en cours</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-5">
                  <h3 className="font-semibold text-gray-900 flex items-center mb-4">
                    <Award className="h-5 w-5 mr-2 text-yellow-600" />
                    Infrastructure
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Voirie:</span>
                      <span className="font-medium">Aménagée</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Électricité:</span>
                      <span className="font-medium">Réseau + Solaire</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Eau:</span>
                      <span className="font-medium">Forage autonome</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Télécommunication:</span>
                      <span className="font-medium">Fiber optique</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Types de logements */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Home className="h-6 w-6 mr-2 text-yellow-600" />
                Types de logements disponibles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {logements.map((logement) => (
                  <div 
                    key={logement.id} 
                    className={`rounded-lg p-6 transition-transform hover:scale-105 ${
                      logement.popular 
                        ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-400'
                        : logement.featured
                        ? 'border-2 border-yellow-500 bg-white'
                        : 'bg-white border border-gray-200'
                    }`}
                  >
                    {logement.popular && (
                      <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                        POPULAIRE
                      </div>
                    )}
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-2">{logement.icon}</span>
                      <h3 className="text-lg font-bold">{logement.name}</h3>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-4">{logement.price} F.CFA</div>
                    <ul className="space-y-2 mb-4">
                      {logement.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm font-medium text-gray-700">{logement.financing}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Aménagements */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-6 w-6 mr-2 text-yellow-600" />
                Aménagements et infrastructures
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                        <span className="text-lg">{amenity.icon}</span>
                      </div>
                      <h3 className="font-medium text-gray-900 text-sm">{amenity.name}</h3>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${amenity.statusColor}`}>
                      {amenity.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Témoignages */}
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-amber-900 mb-6">Ce que disent nos membres</h3>
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
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-500' : 'text-gray-300'}`} 
                          fill={i < testimonial.rating ? "currentColor" : "none"} 
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic text-sm">{testimonial.quote}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-6 w-6 mr-2 text-yellow-600" />
                Calendrier du projet
              </h2>
              <div className="relative ml-6 pl-8">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-yellow-200"></div>
                {timeline.map((item, index) => (
                  <div key={index} className="relative mb-8">
                    <div className={`absolute -left-6 w-3 h-3 rounded-full ${
                      item.completed ? 'bg-green-500' : item.current ? 'bg-yellow-500' : 'bg-gray-300'
                    } border-4 border-white ${item.current ? 'ring-4 ring-yellow-200' : ''}`}></div>
                    <div className="bg-gray-50 rounded-lg p-4 ml-4">
                      <div className="text-sm text-gray-500 mb-1">{item.date}</div>
                      <h4 className={`font-bold ${item.completed || item.current ? 'text-gray-900' : 'text-gray-500'}`}>
                        {item.title}
                        {item.current && (
                          <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                            Actuel
                          </span>
                        )}
                      </h4>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <MessageCircle className="h-6 w-6 mr-2 text-yellow-600" />
                Questions fréquentes
              </h2>
              <div className="space-y-3">
                {faq.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 hover:bg-gray-50"
                      onClick={() => toggleFAQ(index)}
                    >
                      {item.question}
                      <ChevronDown 
                        className={`w-5 h-5 transition-transform ${openFAQ === index ? 'transform rotate-180' : ''}`} 
                      />
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-300 ${
                        openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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

            {/* Documents */}
            <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <FileText className="h-6 w-6 mr-2 text-yellow-600" />
                Documents à télécharger
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {documents.map((doc, index) => (
                  <a 
                    key={index}
                    href="#"
                    className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg bg-yellow-100 flex items-center justify-center mr-3 text-yellow-600">
                      {doc.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm">{doc.name}</h3>
                      <p className="text-xs text-gray-500">{doc.type} • {doc.size}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Processus d'achat */}
            <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Comment rejoindre ce programme ?</h3>
              <p className="text-yellow-100 mb-6">Un processus simple et transparent en 5 étapes</p>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {processSteps.map((step) => (
                  <div key={step.step} className="text-center">
                    <div className="w-8 h-8 rounded-full bg-white text-yellow-600 font-bold flex items-center justify-center mx-auto mb-3">
                      {step.step}
                    </div>
                    <h4 className="font-semibold mb-2 text-sm">{step.title}</h4>
                    <p className="text-yellow-100 text-xs">{step.description}</p>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <a 
                  href="#contact" 
                  className="inline-block px-8 py-3 bg-white text-yellow-600 font-medium rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  Commencer le processus
                </a>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div id="contact" className="sticky top-24 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white p-6">
                <h2 className="text-xl font-bold mb-1">Réservez votre parcelle</h2>
                <p className="opacity-90">Quelques parcelles encore disponibles</p>
              </div>
              <div className="p-6">
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-1">Prix à partir de</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">17 992 968</span>
                    <span className="text-gray-600 ml-1">FCFA</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">pour une parcelle de 200 m²</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Disponibilité</span>
                    <span className="font-medium text-gray-900">{availablePlots}/253 parcelles</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-yellow-500 to-amber-600 transition-all duration-500"
                      style={{ width: `${percentageAvailable}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {Math.round(percentageAvailable)}% des parcelles sont encore disponibles
                  </p>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-3 text-yellow-600" />
                    <div>
                      <p className="font-medium">Apport initial de seulement</p>
                      <p className="text-sm text-gray-500">2 250 000 FCFA</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-yellow-600" />
                    <div>
                      <p className="font-medium">Plan de paiement flexible</p>
                      <p className="text-sm text-gray-500">327 979 FCFA/mois (€500)</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Award className="h-5 w-5 mr-3 text-yellow-600" />
                    <div>
                      <p className="font-medium">Documentation fournie</p>
                      <p className="text-sm text-gray-500">Régularisation foncière complète</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <MatriculeSearch />
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-gray-900 font-medium mb-3">Autres moyens de contact</h3>
                  <div className="space-y-3">
                    {contactOptions.map((option, index) => (
                      <a
                        key={index}
                        href="#"
                        className="flex items-center text-gray-700 hover:text-yellow-600 transition-colors"
                      >
                        <div className="text-yellow-600 mr-3">
                          {option.icon}
                        </div>
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
      </div>
    </div>
  );
};

export default ProgramDetail;