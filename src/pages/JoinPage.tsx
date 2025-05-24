import React ,{ useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  ChevronDown, 
  FileText, 
  User,
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock,
  CreditCard,
  ArrowRight,
  Lock,
  AlertCircle
} from 'lucide-react';

// Page d'adhésion aux programmes d'achat groupé
const JoinPage = () => {
  // État du formulaire
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    programme: '',
    investissement: '',
    acceptTerms: false
  });
  
  // État des erreurs
  const [errors, setErrors] = useState({});
  
  // État de l'étape active (1: Informations, 2: Programme, 3: Confirmation)
  const [activeStep, setActiveStep] = useState(1);
  
  // Référence pour scroller vers le formulaire
  const formRef = useRef(null);
  
  // Observer pour l'animation à l'affichage
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Liste des programmes disponibles
  const programmes = [
    { 
      id: 'kolda-eco-village', 
      name: 'Achat groupe 03 - Thies', 
      description: 'Communauté agricole durable dans une région fertile',
      price: 1500000,
      location: 'Région de Kolda',
      available: 42,
      image: 'https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg',
      tag: 'Populaire'
    },
    { 
      id: 'mbour-ocean-community', 
      name: 'Achat groupe 02 - Mont Roland', 
      description: 'Communauté balnéaire à proximité de l\'océan',
      price: 2200000,
      location: 'Petite Côte, Mbour',
      available: 18,
      image: 'https://images.pexels.com/photos/1705254/pexels-photo-1705254.jpeg',
      tag: 'Premium'
    },
    { 
      id: 'thies-green-valley', 
      name: 'Achat groupe 01 - Mont Roland', 
      description: 'Projet périurbain avec forte composante de reforestation',
      price: 1800000,
      location: 'Périphérie de Thiès',
      available: 108,
      image: 'https://images.pexels.com/photos/4108270/pexels-photo-4108270.jpeg',
      tag: 'Nouveau'
    },
    { 
      id: 'casamance-river-retreat', 
      name: 'Achat groupe 04 - Mbour', 
      description: 'Havre de paix au cœur d\'un écosystème préservé',
      price: 1950000,
      location: 'Bords du fleuve Casamance',
      available: 36,
      image: 'https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg',
      tag: 'Limité'
    }
  ];

  // Options d'investissement
  const investissementOptions = [
    { id: 'economique', name: 'Economique', description: 'Parcelle unique  - Paiement échelonné possible sur 34 mois', price: 1 },
    { id: 'gold', name: 'Gold', description: 'Parcelle double avec emplacement privilégié - Paiement échelonné possible sur 30 mois', price: 1.8 },
    { id: 'prestige', name: 'Prestige', description: 'Parcelle double avec emplacement privilégié - Paiement échelonné possible sur 24 mois', price: 2 }
  ];

  // Avantages de l'adhésion
  const avantages = [
    { 
      title: 'Économies substantielles', 
      description: 'Jusqu\'à 40% d\'économie par rapport à un achat individuel grâce à la puissance du collectif', 
      icon: <CreditCard /> 
    },
    { 
      title: 'Sécurité juridique', 
      description: 'Structure juridique solide (SCI) avec protection des droits de chaque membre', 
      icon: <Lock /> 
    },
    { 
      title: 'Infrastructures de qualité', 
      description: 'Accès à des aménagements communs développés selon les plus hauts standards', 
      icon: <CheckCircle /> 
    },
    { 
      title: 'Accompagnement personnalisé', 
      description: 'Suivi individuel de votre projet par un conseiller dédié', 
      icon: <User /> 
    },
    { 
      title: 'Communauté de valeurs', 
      description: 'Rejoignez des personnes partageant votre vision et vos aspirations', 
      icon: <Users /> 
    },
    { 
      title: 'Impact écologique positif', 
      description: 'Participation à des projets respectueux de l\'environnement et durables', 
      icon: <Leaf /> 
    }
  ];

  // Étapes du processus d'adhésion
  const processSteps = [
    { title: 'Informations personnelles', description: 'Partagez vos coordonnées de contact' },
    { title: 'Choix du programme', description: 'Sélectionnez votre programme et option d\'investissement' },
    { title: 'Confirmation', description: 'Vérifiez et validez votre demande d\'adhésion' }
  ];

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Effacer l'erreur pour ce champ
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Sélection d'un programme
  const selectProgramme = (programmeId) => {
    setFormData({
      ...formData,
      programme: programmeId
    });
    
    if (errors.programme) {
      setErrors({
        ...errors,
        programme: null
      });
    }
  };

  // Sélection d'une option d'investissement
  const selectInvestissement = (investissementId) => {
    setFormData({
      ...formData,
      investissement: investissementId
    });
    
    if (errors.investissement) {
      setErrors({
        ...errors,
        investissement: null
      });
    }
  };

  // Validation du formulaire à chaque étape
  const validateStep = () => {
    const newErrors = {};
    
    if (activeStep === 1) {
      if (!formData.nom.trim()) newErrors.nom = "Veuillez entrer votre nom";
      if (!formData.prenom.trim()) newErrors.prenom = "Veuillez entrer votre prénom";
      if (!formData.email.trim()) newErrors.email = "Veuillez entrer votre email";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";
      if (!formData.telephone.trim()) newErrors.telephone = "Veuillez entrer votre téléphone";
    } else if (activeStep === 2) {
      if (!formData.programme) newErrors.programme = "Veuillez sélectionner un programme";
      if (!formData.investissement) newErrors.investissement = "Veuillez sélectionner une option d'investissement";
    } else if (activeStep === 3) {
      if (!formData.acceptTerms) newErrors.acceptTerms = "Vous devez accepter les conditions générales";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Passage à l'étape suivante
  const nextStep = () => {
    if (validateStep()) {
      setActiveStep(activeStep + 1);
      // Scroll vers le haut du formulaire
      if (formRef.current) {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Retour à l'étape précédente
  const prevStep = () => {
    setActiveStep(activeStep - 1);
    // Scroll vers le haut du formulaire
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      // Simulation d'envoi du formulaire
      alert("Félicitations ! Votre demande d'adhésion a été envoyée avec succès. Un conseiller vous contactera très prochainement.");
      // Réinitialisation du formulaire
      setFormData({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        programme: '',
        investissement: '',
        acceptTerms: false
      });
      setActiveStep(1);
    }
  };

  // Calcul du prix basé sur le programme et l'option d'investissement sélectionnés
  const calculatePrice = () => {
    if (!formData.programme || !formData.investissement) return null;
    
    const programme = programmes.find(p => p.id === formData.programme);
    const investissement = investissementOptions.find(i => i.id === formData.investissement);
    
    if (!programme || !investissement) return null;
    
    return programme.price * investissement.price;
  };

  // Formatage du prix en FCFA
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' FCFA';
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* En-tête de la page */}
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-4 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              REJOIGNEZ-NOUS
            </motion.span>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Adhérer à nos programmes d'achat groupé
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              En quelques étapes simples, rejoignez notre communauté et accédez à une 
              nouvelle façon d'acquérir votre terrain dans un cadre exceptionnel.
            </motion.p>
          </div>
          
          {/* Étapes du processus */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between max-w-3xl mx-auto">
              {processSteps.map((step, index) => (
                <div 
                  key={index} 
                  className={`flex items-center mb-4 md:mb-0 ${index < activeStep - 1 ? 'opacity-50' : ''}`}
                >
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    activeStep > index + 1 
                      ? 'bg-green-500 text-white' 
                      : activeStep === index + 1 
                        ? 'bg-yellow-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {activeStep > index + 1 ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  <div className="ml-3">
                    <p className={`font-medium ${
                      activeStep === index + 1 ? 'text-yellow-700' : 'text-gray-700'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Ligne de connexion entre les étapes (visible sur desktop uniquement) */}
            <div className="hidden md:block max-w-3xl mx-auto mt-4 relative">
              <div className="absolute top-0 left-5 right-5 h-1 bg-gray-200">
                <div 
                  className="absolute top-0 left-0 h-full bg-yellow-500 transition-all duration-500"
                  style={{ width: `${(activeStep - 1) * 50}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {/* Formulaire d'adhésion */}
          <div 
            ref={formRef}
            className="bg-white rounded-2xl shadow-xl p-8 mb-16 relative"
          >
            <form onSubmit={handleSubmit}>
              {/* Étape 1: Informations personnelles */}
              {activeStep === 1 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Vos informations personnelles</h2>
                  <p className="text-gray-600 mb-8">
                    Ces informations nous permettront de vous contacter et de personnaliser votre accompagnement.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="nom">
                        Nom
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="nom"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${errors.nom ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors`}
                          placeholder="Votre nom de famille"
                        />
                      </div>
                      {errors.nom && <p className="mt-1 text-red-500 text-sm">{errors.nom}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="prenom">
                        Prénom
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="prenom"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${errors.prenom ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors`}
                          placeholder="Votre prénom"
                        />
                      </div>
                      {errors.prenom && <p className="mt-1 text-red-500 text-sm">{errors.prenom}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors`}
                          placeholder="votre.email@exemple.com"
                        />
                      </div>
                      {errors.email && <p className="mt-1 text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 font-medium mb-2" htmlFor="telephone">
                        Téléphone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          id="telephone"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleChange}
                          className={`w-full pl-10 pr-4 py-3 border ${errors.telephone ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors`}
                          placeholder="+221 XX XXX XX XX"
                        />
                      </div>
                      {errors.telephone && <p className="mt-1 text-red-500 text-sm">{errors.telephone}</p>}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 transition-colors flex items-center"
                    >
                      Continuer
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Étape 2: Choix du programme */}
              {activeStep === 2 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Choisissez votre programme</h2>
                  <p className="text-gray-600 mb-8">
                    Sélectionnez le programme qui correspond le mieux à vos attentes et à votre budget.
                  </p>
                  
                  {errors.programme && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p>{errors.programme}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    {programmes.map((programme) => (
                      <div 
                        key={programme.id}
                        className={`border-2 rounded-xl overflow-hidden cursor-pointer transition-all ${
                          formData.programme === programme.id 
                            ? 'border-yellow-500 shadow-md' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => selectProgramme(programme.id)}
                      >
                        <div className="relative h-48">
                          <img 
                            src={programme.image} 
                            alt={programme.name} 
                            className="w-full h-full object-cover"
                          />
                          {programme.tag && (
                            <div className="absolute top-3 right-3 px-3 py-1 bg-yellow-500 text-white text-xs font-bold rounded-full">
                              {programme.tag}
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-4">
                            <p className="text-white font-medium">{formatPrice(programme.price)}</p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-gray-900 mb-1">{programme.name}</h3>
                              <p className="text-gray-500 text-sm mb-2">{programme.location}</p>
                            </div>
                            <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 ${
                              formData.programme === programme.id 
                                ? 'border-yellow-500 bg-yellow-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.programme === programme.id && (
                                <CheckCircle className="h-full w-full text-white" />
                              )}
                            </div>
                          </div>
                          <p className="text-gray-700 text-sm mb-3">{programme.description}</p>
                          <p className="text-sm text-yellow-700 font-medium">
                            {programme.available} parcelles disponibles
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-gray-900">Choisissez votre option d'investissement</h3>
                  
                  {errors.investissement && (
                    <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p>{errors.investissement}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {investissementOptions.map((option) => (
                      <div 
                        key={option.id}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          formData.investissement === option.id 
                            ? 'border-yellow-500 bg-yellow-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => selectInvestissement(option.id)}
                      >
                        <div className="flex items-start">
                          <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 mt-1 mr-3 ${
                            formData.investissement === option.id 
                              ? 'border-yellow-500 bg-yellow-500' 
                              : 'border-gray-300'
                          }`}>
                            {formData.investissement === option.id && (
                              <CheckCircle className="h-full w-full text-white" />
                            )}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{option.name}</h4>
                            <p className="text-gray-700">{option.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Retour
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg shadow-md hover:bg-yellow-600 transition-colors flex items-center"
                    >
                      Continuer
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
              
              {/* Étape 3: Confirmation */}
              {activeStep === 3 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-gray-900">Confirmer votre demande d'adhésion</h2>
                  <p className="text-gray-600 mb-8">
                    Veuillez vérifier les informations ci-dessous avant de soumettre votre demande.
                  </p>
                  
                  <div className="bg-gray-50 rounded-xl p-6 mb-8">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Récapitulatif</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-6">
                      <div>
                        <p className="text-sm text-gray-500">Nom complet</p>
                        <p className="font-medium">{formData.prenom} {formData.nom}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{formData.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Téléphone</p>
                        <p className="font-medium">{formData.telephone}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Programme choisi</p>
                        <p className="font-medium">
                          {programmes.find(p => p.id === formData.programme)?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Option d'investissement</p>
                        <p className="font-medium">
                          {investissementOptions.find(i => i.id === formData.investissement)?.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Montant estimé</p>
                        <p className="font-bold text-yellow-700">
                          {calculatePrice() ? formatPrice(calculatePrice()) : 'Non défini'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 text-yellow-800">
                      <div className="flex">
                        <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                        <p className="text-sm">
                          Cette estimation est donnée à titre indicatif. Un conseiller vous contactera
                          pour vous présenter en détail les options de financement adaptées à votre situation.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <label className="flex items-start cursor-pointer">
                      <div className="flex items-center h-6">
                        <input
                          type="checkbox"
                          name="acceptTerms"
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <span className="text-gray-700">
                          J'accepte les <a href="#" className="text-yellow-600 hover:underline">conditions générales</a> et 
                          la <a href="#" className="text-yellow-600 hover:underline">politique de confidentialité</a> de BIBA IMMO
                        </span>
                      </div>
                    </label>
                    {errors.acceptTerms && <p className="mt-1 text-red-500 text-sm">{errors.acceptTerms}</p>}
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 bg-yellow-500 text-white font-bold rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                    >
                      Soumettre ma demande
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
          
          {/* Section Avantages */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Pourquoi adhérer à nos programmes ?</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                L'achat groupé vous offre de nombreux avantages qui font toute la différence dans votre projet immobilier.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {avantages.map((avantage, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mb-4">
                    {React.cloneElement(avantage.icon, { className: 'h-6 w-6' })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{avantage.title}</h3>
                  <p className="text-gray-600">{avantage.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* FAQ */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Questions fréquentes</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Consultez les réponses aux questions les plus courantes concernant le processus d'adhésion.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <FaqItem 
                question="Comment fonctionne le processus d'adhésion ?" 
                answer="Le processus d'adhésion se déroule en trois étapes simples : vous remplissez ce formulaire avec vos informations personnelles, vous choisissez le programme qui vous intéresse, puis un conseiller vous contacte pour finaliser votre inscription et discuter des options de paiement. Une fois votre dossier validé, vous recevez vos identifiants pour accéder à votre espace membre."
              />
              
              <FaqItem 
                question="Quels documents seront nécessaires pour finaliser mon adhésion ?" 
                answer="Pour finaliser votre adhésion, vous devrez fournir une pièce d'identité valide (carte nationale d'identité ou passeport), un justificatif de domicile de moins de 3 mois, et selon votre situation, des justificatifs de revenus. Tous ces documents pourront être téléchargés dans votre espace membre une fois votre pré-inscription confirmée."
              />
              
              <FaqItem 
                question="Quelles sont les modalités de paiement disponibles ?" 
                answer="Nous proposons plusieurs modalités de paiement adaptées à votre situation : paiement comptant avec remise, paiement échelonné sur 3 à 5 ans sans frais, ou financement bancaire via nos partenaires avec des taux préférentiels. Votre conseiller vous présentera les options les plus avantageuses pour votre cas particulier."
              />
              
              <FaqItem 
                question="Puis-je visiter les terrains avant de m'engager ?" 
                answer="Absolument ! Nous organisons régulièrement des visites de sites pour les personnes intéressées. Une fois votre pré-inscription effectuée, votre conseiller vous proposera différentes dates pour participer à une visite guidée. Vous pouvez également visualiser les terrains dans votre espace membre grâce à notre outil de visite virtuelle 3D."
              />
              
              <FaqItem 
                question="Comment sont gérés les espaces communs ?" 
                answer="Les espaces communs sont gérés par l'association des propriétaires, dont vous devenez automatiquement membre lors de votre adhésion. Cette association est responsable de l'entretien, de la sécurité et du développement des infrastructures partagées. Les décisions importantes sont prises collectivement lors des assemblées, selon un principe démocratique où chaque membre dispose d'une voix."
              />
            </div>
          </div>
          
          {/* Témoignages */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-20">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Ils ont rejoint nos programmes</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Découvrez les témoignages de ceux qui ont franchi le pas et qui construisent aujourd'hui leur avenir avec nous.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg" 
                    alt="Konan Félicité" 
                    className="w-14 h-14 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Konan Félicité</h4>
                    <p className="text-gray-600 text-sm">Enseignante, membre depuis 2023</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "L'accompagnement personnalisé a fait toute la différence. Mon conseiller a pris le temps de comprendre mes besoins et m'a guidée vers le programme qui me correspondait parfaitement. Aujourd'hui, je construis ma maison dans un cadre idyllique avec des voisins partageant mes valeurs."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <img 
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                    alt="Mamadou Touré" 
                    className="w-14 h-14 rounded-full object-cover mr-4" 
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">Mamadou Touré</h4>
                    <p className="text-gray-600 text-sm">Ingénieur, membre depuis 2022</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">
                  "Le processus d'adhésion a été d'une simplicité déconcertante. En moins de deux semaines, j'étais officiellement propriétaire dans le programme de Thiès Green Valley. La transparence et le professionnalisme de l'équipe m'ont convaincu que j'avais fait le bon choix pour mon avenir."
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact rapide */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Besoin d'informations supplémentaires ?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Notre équipe est à votre disposition pour répondre à toutes vos questions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:+221771234567" 
                className="px-6 py-3 bg-white border border-yellow-500 text-yellow-600 font-medium rounded-lg hover:bg-yellow-50 transition-colors flex items-center"
              >
                <Phone className="h-5 w-5 mr-2" />
                +221 77 123 45 67
              </a>
              <a 
                href="mailto:contact@bibaimmo.com" 
                className="px-6 py-3 bg-white border border-yellow-500 text-yellow-600 font-medium rounded-lg hover:bg-yellow-50 transition-colors flex items-center"
              >
                <Mail className="h-5 w-5 mr-2" />
                contact@bibaimmo.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Composant FAQ avec accordéon
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="border-b border-gray-200 py-4">
      <button 
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div 
        className={`mt-2 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 pb-2">{answer}</p>
      </div>
    </div>
  );
};

// Composants d'icônes manquants
const Users = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const Leaf = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
    <line x1="4" y1="21" x2="20" y2="21"></line>
  </svg>
);

export default JoinPage;