import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  FileText, 
  Check, 
  AlertCircle,
  Upload,
  Camera,
  ArrowRight,
  ArrowLeft,
  Star,
  Shield,
  Home,
  Users,
  Target,
  Award,
  Sparkles,
  Zap
} from 'lucide-react';

const ModernSubscribePage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    lieuNaissance: "",
    typeDocument: "cni",
    numeroDocument: "",
    dateDelivrance: "",
    lieuDelivrance: "",
    dateExpiration: "",
    adresseType: "senegal",
    adresse: "",
    commune: "",
    departement: "",
    region: "",
    pays: "",
    telephone: "",
    email: "",
    profession: "",
    enActivite: "oui",
    contratTravail: "cdi",
    expirationContrat: "",
    adhesionModele: false,
    joinDocument: false,
    photoReconnaissance: false,
    projetType: "AG3", // Type de projet (AG1, AG2, AG3, AG4)
    numeroParcelle: "125", // Numéro de parcelle
    localiteSite: "LLY" // Sigle de la localité (ex: LLY pour Louly)
  });
  
  // État des erreurs
  const [errors, setErrors] = useState({});
  
  // État pour les fichiers
  const [files, setFiles] = useState({
    identite: null,
    photo: null
  });

  const steps = [
    {
      id: 0,
      title: "Informations personnelles",
      subtitle: "Parlez-nous de vous",
      icon: User,
      color: "from-yellow-500 to-amber-600"
    },
    {
      id: 1,
      title: "Adresse & Contact",
      subtitle: "Où vous joindre",
      icon: MapPin,
      color: "from-yellow-600 to-amber-700"
    },
    {
      id: 2,
      title: "Activité professionnelle",
      subtitle: "Votre situation professionnelle",
      icon: FileText,
      color: "from-amber-500 to-yellow-600"
    },
    {
      id: 3,
      title: "Documents & Paiement",
      subtitle: "Finalisation de votre adhésion",
      icon: Check,
      color: "from-amber-600 to-yellow-500"
    }
  ];

  // Gestion des changements dans le formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  // Gestion des fichiers
  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      setFiles({
        ...files,
        [fileType]: file
      });
      
      if (fileType === 'identite') {
        setFormData({
          ...formData,
          joinDocument: true
        });
      } else if (fileType === 'photo') {
        setFormData({
          ...formData,
          photoReconnaissance: true
        });
      }
    }
  };

  // Validation par étape
  const validateStep = (stepId: number) => {
    const newErrors = {};
    
    switch (stepId) {
      case 0:
        if (!formData.nom.trim()) newErrors.nom = "Nom requis";
        if (!formData.prenom.trim()) newErrors.prenom = "Prénom requis";
        if (!formData.dateNaissance.trim()) newErrors.dateNaissance = "Date de naissance requise";
        if (!formData.lieuNaissance.trim()) newErrors.lieuNaissance = "Lieu de naissance requis";
        if (!formData.numeroDocument.trim()) newErrors.numeroDocument = "Numéro de document requis";
        break;
      case 1:
        if (!formData.telephone.trim()) newErrors.telephone = "Téléphone requis";
        if (!formData.email.trim()) newErrors.email = "Email requis";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalide";
        break;
      case 3:
        if (!formData.adhesionModele) newErrors.adhesionModele = "Adhésion requise";
        if (!formData.joinDocument) newErrors.joinDocument = "Document requis";
        if (!formData.photoReconnaissance) newErrors.photoReconnaissance = "Photo requise";
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Navigation
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  // Génération du PDF
  const generatePDF = (data, id) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const currentDate = new Date().toLocaleDateString();
    
    // En-tête avec logo et informations de l'entreprise
    doc.setFillColor(245, 158, 11); // amber-500
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('BIBA IMMO INGENIERING', 105, 15, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text('Achat Groupé & Habitat Durable', 105, 25, { align: 'center' });
    doc.text('TABAKH SA REEW', 105, 32, { align: 'center' });
    
    // Titre du document
    doc.setTextColor(245, 158, 11); // amber-500
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('ATTESTATION D\'ADHÉSION', 105, 55, { align: 'center' });
    
    // Informations d'identification
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Référence:', 20, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(id, 55, 70);
    
    doc.setFont('helvetica', 'bold');
    doc.text('Date:', 140, 70);
    doc.setFont('helvetica', 'normal');
    doc.text(currentDate, 155, 70);
    
    // Séparateur
    doc.setDrawColor(245, 158, 11); // amber-500
    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);
    
    // Introduction
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.text('Ce document atteste que la personne identifiée ci-dessous a adhéré au modèle économique Sama Achat Groupé de BIBA IMMO INGENIERING.', 20, 85, { maxWidth: 170 });
    
    // Informations personnelles
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11); // amber-500
    doc.text('INFORMATIONS PERSONNELLES', 20, 100);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Nom:', 20, 110);
    doc.text('Prénom:', 20, 120);
    doc.text('Né(e) le:', 20, 130);
    doc.text('À:', 20, 140);
    doc.text('Document d\'identité:', 20, 150);
    doc.text('Numéro:', 20, 160);
    
    doc.setFont('helvetica', 'normal');
    doc.text(data.nom.toUpperCase(), 80, 110);
    doc.text(data.prenom, 80, 120);
    doc.text(data.dateNaissance, 80, 130);
    doc.text(data.lieuNaissance, 80, 140);
    doc.text({
      'cni': 'Carte Nationale d\'Identité',
      'passeport': 'Passeport',
      'permis': 'Permis de conduire',
      'titre': 'Titre de séjour'
    }[data.typeDocument] || data.typeDocument, 80, 150);
    doc.text(data.numeroDocument, 80, 160);
    
    // Coordonnées
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(245, 158, 11); // amber-500
    doc.text('COORDONNÉES', 20, 175);
    
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Adresse:', 20, 185);
    doc.text('Téléphone:', 20, 195);
    doc.text('Email:', 20, 205);
    
    doc.setFont('helvetica', 'normal');
    doc.text(data.adresse, 80, 185);
    doc.text(data.telephone, 80, 195);
    doc.text(data.email, 80, 205);
    
    // Signature et cachet
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.1);
    doc.rect(20, 220, 75, 40);
    doc.text('Signature du membre', 57.5, 265, { align: 'center' });
    
    // Case pour le cachet BIBA IMMO avec signature
    doc.rect(115, 220, 75, 40);
    
    // Ajout de l'image de signature
    doc.addImage('/signature.png', 'PNG', 125, 225, 55, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text('Cachet BIBA IMMO', 152.5, 265, { align: 'center' });
    
    // Pied de page
    doc.setFillColor(245, 158, 11, 0.1); // amber-500 avec opacité
    doc.rect(0, 275, pageWidth, 20, 'F');
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text('BIBA IMMO INGENIERING - Achat Groupé & Habitat Durable - Document officiel', 105, 282, { align: 'center' });
    doc.text('Ce document doit être conservé précieusement et présenté lors de vos démarches.', 105, 288, { align: 'center' });
    
    // Enregistrement du PDF
    doc.save(`BIBA-IMMO-Adhesion-${id}.pdf`);
  };

  // Soumission
  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 2000);
    }
  };

  // Composant d'effet de particules
  const ParticleEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({length: 20}).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-white opacity-20 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );

  // Rendu du contenu par étape
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-amber-600 rounded-full mb-4 shadow-2xl"
              >
                <User className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-amber-600">
                Informations Personnelles
              </h2>
              <p className="text-gray-600 mt-2">Commençons par faire connaissance</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-blue-500" />
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 ${errors.nom ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-500'} rounded-2xl focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl transform focus:scale-105`}
                  placeholder="Votre nom de famille"
                />
                {errors.nom && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.nom}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileFocus={{ scale: 1.02 }}>
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-cyan-500" />
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 ${errors.prenom ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-cyan-500'} rounded-2xl focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl transform focus:scale-105`}
                  placeholder="Votre prénom"
                />
                {errors.prenom && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.prenom}
                  </motion.p>
                )}
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 ${errors.dateNaissance ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-500'} rounded-2xl focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl`}
                />
                {errors.dateNaissance && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.dateNaissance}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-cyan-500" />
                  Lieu de naissance
                </label>
                <input
                  type="text"
                  name="lieuNaissance"
                  value={formData.lieuNaissance}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 ${errors.lieuNaissance ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-cyan-500'} rounded-2xl focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl transform focus:scale-105`}
                  placeholder="Ville de naissance"
                />
                {errors.lieuNaissance && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.lieuNaissance}
                  </motion.p>
                )}
              </motion.div>
            </div>
            
            <motion.div 
              className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <label className="block text-gray-700 font-medium mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-600" />
                Type de document d'identité
              </label>
              <select
                name="typeDocument"
                value={formData.typeDocument}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-blue-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg bg-white"
              >
                <option value="cni">Carte Nationale d'Identité</option>
                <option value="passeport">Passeport</option>
                <option value="permis">Permis de conduire</option>
                <option value="titre">Titre de séjour</option>
              </select>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-gray-700 font-medium mb-3 flex items-center">
                <Zap className="h-4 w-4 mr-2 text-yellow-500" />
                Numéro de document
              </label>
              <input
                type="text"
                name="numeroDocument"
                value={formData.numeroDocument}
                onChange={handleChange}
                className={`w-full px-6 py-4 border-2 ${errors.numeroDocument ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-yellow-500'} rounded-2xl focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl transform focus:scale-105`}
                placeholder="Numéro du document"
              />
              {errors.numeroDocument && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-red-500 text-sm flex items-center"
                >
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.numeroDocument}
                </motion.p>
              )}
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-gray-700 font-medium mb-3">Date de délivrance</label>
                <input
                  type="date"
                  name="dateDelivrance"
                  value={formData.dateDelivrance}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                />
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-gray-700 font-medium mb-3">Date d'expiration</label>
                <input
                  type="date"
                  name="dateExpiration"
                  value={formData.dateExpiration}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                />
              </motion.div>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-amber-600 rounded-full mb-4 shadow-2xl"
              >
                <MapPin className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-amber-600">
                Adresse & Contact
              </h2>
              <p className="text-gray-600 mt-2">Comment vous joindre</p>
            </div>

            <motion.div 
              className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-medium text-green-800 mb-4 flex items-center">
                <Home className="h-5 w-5 mr-2" />
                Type de domiciliation
              </h3>
              <div className="flex space-x-8">
                <motion.label 
                  className="flex items-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="radio"
                    name="adresseType"
                    value="senegal"
                    checked={formData.adresseType === 'senegal'}
                    onChange={handleChange}
                    className="h-6 w-6 text-green-600"
                  />
                  <span className="ml-3 text-green-700 font-medium text-lg">🇸🇳 Sénégal</span>
                </motion.label>
                <motion.label 
                  className="flex items-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="radio"
                    name="adresseType"
                    value="etranger"
                    checked={formData.adresseType === 'etranger'}
                    onChange={handleChange}
                    className="h-6 w-6 text-green-600"
                  />
                  <span className="ml-3 text-green-700 font-medium text-lg">🌍 Étranger</span>
                </motion.label>
              </div>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-gray-700 font-medium mb-3 flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-green-500" />
                Adresse complète
              </label>
              <textarea
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                rows="4"
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl resize-none"
                placeholder="Votre adresse complète..."
              />
            </motion.div>
            
            {formData.adresseType === 'etranger' && (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-gray-700 font-medium mb-3">Commune/Ville</label>
                  <input
                    type="text"
                    name="commune"
                    value={formData.commune}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                    placeholder="Commune ou ville"
                  />
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-gray-700 font-medium mb-3">Département/État</label>
                  <input
                    type="text"
                    name="departement"
                    value={formData.departement}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                    placeholder="Département ou état"
                  />
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-gray-700 font-medium mb-3">Région</label>
                  <input
                    type="text"
                    name="region"
                    value={formData.region}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                    placeholder="Région"
                  />
                </motion.div>
                
                <motion.div whileHover={{ scale: 1.02 }}>
                  <label className="block text-gray-700 font-medium mb-3">Pays</label>
                  <input
                    type="text"
                    name="pays"
                    value={formData.pays}
                    onChange={handleChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                    placeholder="Pays de résidence"
                  />
                </motion.div>
              </motion.div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-green-500" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={formData.telephone}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 ${errors.telephone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-green-500'} rounded-2xl focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl transform focus:scale-105`}
                  placeholder="+221 77 123 45 67"
                />
                {errors.telephone && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.telephone}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }}>
                <label className="block text-gray-700 font-medium mb-3 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-emerald-500" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-6 py-4 border-2 ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-emerald-500'} rounded-2xl focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl transform focus:scale-105`}
                  placeholder="votre@email.com"
                />
                {errors.email && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.email}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-amber-600 rounded-full mb-4 shadow-2xl"
              >
                <FileText className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-amber-600">
                Activité Professionnelle
              </h2>
              <p className="text-gray-600 mt-2">Votre situation professionnelle</p>
            </div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <label className="block text-gray-700 font-medium mb-3 flex items-center">
                <FileText className="h-4 w-4 mr-2 text-orange-500" />
                Profession
              </label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:border-orange-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl transform focus:scale-105"
                placeholder="Votre profession actuelle"
              />
            </motion.div>
            
            <motion.div 
              className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-lg"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="font-medium text-orange-800 mb-4 flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Êtes-vous actuellement en activité ?
              </h3>
              <div className="flex space-x-8">
                <motion.label 
                  className="flex items-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="radio"
                    name="enActivite"
                    value="oui"
                    checked={formData.enActivite === 'oui'}
                    onChange={handleChange}
                    className="h-6 w-6 text-orange-600"
                  />
                  <span className="ml-3 text-orange-700 font-medium text-lg">✅ Oui</span>
                </motion.label>
                <motion.label 
                  className="flex items-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <input
                    type="radio"
                    name="enActivite"
                    value="non"
                    checked={formData.enActivite === 'non'}
                    onChange={handleChange}
                    className="h-6 w-6 text-orange-600"
                  />
                  <span className="ml-3 text-orange-700 font-medium text-lg">❌ Non</span>
                </motion.label>
              </div>
            </motion.div>
            
            {formData.enActivite === 'oui' && (
              <motion.div 
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-medium text-green-800 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Type de contrat
                </h3>
                <div className="space-y-4">
                  <div className="flex space-x-8">
                    <motion.label 
                      className="flex items-center cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="radio"
                        name="contratTravail"
                        value="cdi"
                        checked={formData.contratTravail === 'cdi'}
                        onChange={handleChange}
                        className="h-6 w-6 text-green-600"
                      />
                      <span className="ml-3 text-green-700 font-medium text-lg">🔒 CDI</span>
                    </motion.label>
                    <motion.label 
                      className="flex items-center cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <input
                        type="radio"
                        name="contratTravail"
                        value="cdd"
                        checked={formData.contratTravail === 'cdd'}
                        onChange={handleChange}
                        className="h-6 w-6 text-green-600"
                      />
                      <span className="ml-3 text-green-700 font-medium text-lg">⏰ CDD</span>
                    </motion.label>
                  </div>
                  
                  {formData.contratTravail === 'cdd' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-green-700 font-medium mb-3">Date d'expiration du contrat</label>
                      <input
                        type="date"
                        name="expirationContrat"
                        value={formData.expirationContrat}
                        onChange={handleChange}
                        className="w-full px-6 py-4 border-2 border-green-200 rounded-2xl focus:border-green-500 focus:outline-none transition-all duration-300 shadow-lg focus:shadow-xl"
                      />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-20 h-20 bg-amber-600 rounded-full mb-4 shadow-2xl"
              >
                <Check className="h-10 w-10 text-white" />
              </motion.div>
              <h2 className="text-3xl font-bold text-amber-600">
                Finalisation
              </h2>
              <p className="text-gray-600 mt-2">Dernière étape avant de rejoindre le programme !</p>
            </div>
            
            <div className="space-y-6">
              <motion.div 
                className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="adhesionModele"
                    checked={formData.adhesionModele}
                    onChange={handleChange}
                    className="h-6 w-6 mt-1 text-purple-600 rounded-lg"
                  />
                  <div className="ml-4">
                    <span className="text-purple-800 font-medium text-lg flex items-center">
                      <Star className="h-5 w-5 mr-2" />
                      J'adhère au modèle économique Sama Achat Groupé
                    </span>
                    <p className="text-purple-700 text-sm mt-1">BIBA IMMO INGENIERING</p>
                  </div>
                </label>
                {errors.adhesionModele && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.adhesionModele}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="joinDocument"
                    checked={formData.joinDocument}
                    onChange={handleChange}
                    className="h-6 w-6 mt-1 text-blue-600 rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <span className="text-blue-800 font-medium flex items-center">
                      <FileText className="h-5 w-5 mr-2" />
                      Document d'identité
                    </span>
                    <p className="text-blue-700 text-sm mt-1">Recto/verso en format PDF bien clair</p>
                    
                    <motion.div 
                      className="mt-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-blue-300 border-dashed rounded-2xl cursor-pointer bg-blue-25 hover:bg-blue-100 transition-all duration-300 shadow-lg">
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="w-8 h-8 mb-3 text-blue-500" />
                          <p className="text-sm text-blue-600 font-medium">
                            {files.identite ? `✅ ${files.identite.name}` : "📄 Télécharger votre document"}
                          </p>
                          <p className="text-xs text-blue-500 mt-1">PDF, max 5MB</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => handleFileChange(e, 'identite')}
                          accept=".pdf"
                        />
                      </label>
                    </motion.div>
                  </div>
                </label>
                {errors.joinDocument && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.joinDocument}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.div 
                className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    name="photoReconnaissance"
                    checked={formData.photoReconnaissance}
                    onChange={handleChange}
                    className="h-6 w-6 mt-1 text-green-600 rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <span className="text-green-800 font-medium flex items-center">
                      <Camera className="h-5 w-5 mr-2" />
                      Photo de reconnaissance
                    </span>
                    <p className="text-green-700 text-sm mt-1">Pour la sécurité de votre propriété</p>
                    
                    <motion.div 
                      className="mt-4"
                      whileHover={{ scale: 1.02 }}
                    >
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-green-300 border-dashed rounded-2xl cursor-pointer bg-green-25 hover:bg-green-100 transition-all duration-300 shadow-lg">
                        <div className="flex flex-col items-center justify-center">
                          <Camera className="w-8 h-8 mb-3 text-green-500" />
                          <p className="text-sm text-green-600 font-medium">
                            {files.photo ? `✅ ${files.photo.name}` : "📸 Télécharger votre photo"}
                          </p>
                          <p className="text-xs text-green-500 mt-1">JPG, PNG, max 5MB</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          onChange={(e) => handleFileChange(e, 'photo')}
                          accept="image/*"
                        />
                      </label>
                    </motion.div>
                  </div>
                </label>
                {errors.photoReconnaissance && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 text-red-500 text-sm flex items-center"
                  >
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.photoReconnaissance}
                  </motion.p>
                )}
              </motion.div>
              
              <motion.div 
                className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium text-amber-800 flex items-center">
                    <Target className="h-5 w-5 mr-2" />
                    Projet Sama Achat Groupé
                  </h3>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-amber-800 font-medium mb-2 flex items-center">
                      <Home className="h-4 w-4 mr-2" />
                      Projet sélectionné
                    </label>
                    <select
                      name="projetType"
                      value={formData.projetType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-all duration-300 shadow-md bg-white"
                    >
                      <option value="AG1">Sama Achat Groupé 1 - Mont Roland (complet)</option>
                      <option value="AG2">Sama Achat Groupé 2 - Mont Roland (complet)</option>
                      <option value="AG3">Sama Achat Groupé 3 - Louly (Mbour)</option>
                      <option value="AG4">Sama Achat Groupé 4 - Thieo (Noto Diobasse)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-amber-800 font-medium mb-2 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Numéro de parcelle souhaité
                    </label>
                    <input
                      type="text"
                      name="numeroParcelle"
                      value={formData.numeroParcelle}
                      onChange={handleChange}
                      placeholder="Ex: 125"
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-all duration-300 shadow-md"
                    />
                    <p className="text-sm text-gray-500 mt-1">Le numéro de parcelle sera confirmé selon disponibilité</p>
                  </div>
                  
                  <div>
                    <label className="block text-amber-800 font-medium mb-2 flex items-center">
                      <Target className="h-4 w-4 mr-2" />
                      Localité du site
                    </label>
                    <select
                      name="localiteSite"
                      value={formData.localiteSite}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:border-amber-500 focus:outline-none transition-all duration-300 shadow-md bg-white"
                    >
                      <option value="MTR">Mont Roland (MTR)</option>
                      <option value="LLY">Louly - Mbour (LLY)</option>
                      <option value="THO">Thieo - Noto Diobasse (THO)</option>
                    </select>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-lg"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="font-medium text-amber-800 mb-6 flex items-center text-lg">
                  <FileText className="h-6 w-6 mr-2" />
                  Articles du modèle économique
                </h3>
                
                <div className="space-y-4 text-gray-700">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <p className="font-semibold text-amber-700">Article 1</p>
                    <p>Le membre « Sama Achat Agroupé » ne peut pas acheter plus de 2 (deux) parcelles dans un programme.</p>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <p className="font-semibold text-amber-700">Article 2</p>
                    <p>Les programmes de constructions futures sont conçus par le bailleur « SCI BIBA IMMO » pour l'uniformisation et le respect des normes légalement établies.</p>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <p className="font-semibold text-amber-700">Article 3</p>
                    <p>Le bailleur dispose du droit de péremption en cas de revente du bien.</p>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <p className="font-semibold text-amber-700">Article 4</p>
                    <p>Le membre ne peut en aucun cas revendre le bien tant qu'il ne s'est pas acquitté de toute ses obligations financières et légales.</p>
                  </div>
                  
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    <p className="font-semibold text-amber-700">Article 5</p>
                    <p>Le membre « Sama Achat Groupé » s'engage à respecter ses obligations de paiements périodiques, à date échue, sous peine de pénalité de 10% de l'échéance non honorée.</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (submitSuccess) {
    // Générer l'ID unique
    const uniqueId = `${formData.projetType}-${formData.numeroParcelle}-${formData.localiteSite}`;
    
    return (
      <div className="min-h-screen bg-amber-600 flex items-center justify-center p-4 relative overflow-hidden">
        <ParticleEffect />
        <motion.div 
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center relative z-10"
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 150 }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <Check className="h-12 w-12 text-white" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-amber-600 mb-4">
              Félicitations !
            </h2>
            <p className="text-gray-600 mb-4 text-lg">
              Votre demande d'adhésion au programme Sama Achat Groupé a été envoyée avec succès ! 
              Notre équipe vous contactera prochainement.
            </p>
            
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <p className="text-gray-700 mb-2">Votre identifiant unique :</p>
              <p className="text-2xl font-bold text-amber-700 tracking-wider">{uniqueId}</p>
              <p className="text-sm text-gray-500 mt-2">Conservez cet identifiant pour toutes vos démarches futures</p>
            </div>
            
            <div className="mb-6">
              <button 
                onClick={() => generatePDF(formData, uniqueId)}
                className="flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-medium shadow-lg transition-all"
              >
                <FileText className="h-5 w-5 mr-2" />
                Télécharger le récapitulatif PDF
              </button>
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: "0 20px 25px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSubmitSuccess(false);
              setCurrentStep(0);
              setCompletedSteps(new Set());
            }}
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Retour à l'accueil
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50 relative overflow-hidden">
      <ParticleEffect />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header avec logo de progression */}
          <div className="text-center mb-12">
            <motion.h1 
              className="text-5xl font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mb-2"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
            >
              ✨ BIBA IMMO INGENIERING ✨
            </motion.h1>
            <motion.p 
              className="text-gray-600 text-xl"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Formulaire d'adhésion
            </motion.p>
          </div>

          {/* Indicateur de progression */}
          <div className="mb-12">
            <div className="flex justify-between items-center">
              {steps.map((step, index) => {
                const isActive = currentStep === index;
                const isCompleted = completedSteps.has(index);
                const StepIcon = step.icon;
                
                return (
                  <div key={step.id} className="flex flex-col items-center flex-1">
                    <motion.div
                      className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                        isActive 
                          ? `bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-lg` 
                          : isCompleted 
                            ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-md' 
                            : 'bg-gray-200 text-gray-500 shadow-sm'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      animate={{ 
                        boxShadow: isActive 
                          ? "0 8px 16px rgba(0,0,0,0.2)" 
                          : isCompleted 
                            ? "0 4px 12px rgba(0,0,0,0.15)" 
                            : "0 5px 15px rgba(0,0,0,0.1)"
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {isCompleted ? (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Check className="h-10 w-10" />
                        </motion.div>
                      ) : (
                        <StepIcon className="h-10 w-10" />
                      )}
                    </motion.div>
                    <h3 className={`font-bold text-sm text-center ${isActive ? 'text-gray-800' : 'text-gray-500'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs text-center mt-1 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                      {step.subtitle}
                    </p>
                    
                    {index < steps.length - 1 && (
                      <motion.div 
                        className={`hidden md:block w-full h-2 mt-8 rounded-full transition-all duration-500 ${
                          completedSteps.has(index) 
                            ? 'bg-gradient-to-r from-yellow-500 to-amber-600 shadow-lg' 
                            : 'bg-gray-200'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: completedSteps.has(index) ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* Barre de progression continue pour mobile */}
            <div className="md:hidden mt-8">
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <motion.div 
                  className="bg-gradient-to-r from-yellow-500 to-amber-600 h-3 rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                />
              </div>
              <p className="text-center mt-2 text-sm text-gray-600">
                Étape {currentStep + 1} sur {steps.length}
              </p>
            </div>
          </div>

          {/* Contenu principal */}
          <motion.div 
            className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-8 md:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  {renderStepContent()}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Boutons de navigation */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 md:px-12 py-8 flex justify-between items-center">
              <motion.button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center px-8 py-4 rounded-2xl font-bold transition-all ${
                  currentStep === 0 
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                    : 'bg-gray-300 text-gray-700 hover:bg-gray-400 shadow-lg hover:shadow-xl'
                }`}
                whileHover={currentStep !== 0 ? { scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" } : {}}
                whileTap={currentStep !== 0 ? { scale: 0.95 } : {}}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Précédent
              </motion.button>

              {currentStep === steps.length - 1 ? (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`flex items-center px-10 py-4 rounded-2xl font-bold transition-all ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 shadow-xl hover:shadow-2xl'
                  } text-white text-lg`}
                  whileHover={!isSubmitting ? { scale: 1.05, boxShadow: "0 15px 35px rgba(0,0,0,0.3)" } : {}}
                  whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <motion.svg 
                        className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </motion.svg>
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Confirmer mon adhésion
                      <Check className="h-6 w-6 ml-2" />
                    </>
                  )}
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-10 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl transition-all text-lg"
                  whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(0,0,0,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Suivant
                  <ArrowRight className="h-6 w-6 ml-2" />
                </motion.button>
              )}
            </div>
          </motion.div>

          {/* Informations de contact */}
          <motion.div 
            className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              💬 Besoin d'aide ?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Notre équipe est disponible pour vous accompagner dans votre démarche 🤝
            </p>
            
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <motion.div 
                className="flex items-center justify-center bg-blue-50 rounded-2xl p-4"
                whileHover={{ scale: 1.05 }}
              >
                <Phone className="h-6 w-6 text-blue-600 mr-3" />
                <span className="text-gray-700 font-medium">📞 +221 77 123 45 67</span>
              </motion.div>
              <motion.div 
                className="flex items-center justify-center bg-purple-50 rounded-2xl p-4"
                whileHover={{ scale: 1.05 }}
              >
                <Mail className="h-6 w-6 text-purple-600 mr-3" />
                <span className="text-gray-700 font-medium">✉️ contact@bibaimmo.com</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ModernSubscribePage;