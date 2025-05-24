import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  Building,
  Smartphone, 
  Check, 
  Upload, 
  ArrowLeft, 
  ChevronRight, 
  Loader, 
  X,
  RefreshCw,
  Info,
  Calendar,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const PaymentPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [upcomingPayments, setUpcomingPayments] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [paymentStep, setPaymentStep] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [transactionProof, setTransactionProof] = useState(null);
  const [transactionProofPreview, setTransactionProofPreview] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      // Données de démonstration pour les méthodes de paiement
      setPaymentMethods([
        {
          id: 'paypal',
          type: 'paypal',
          label: 'PayPal',
          icon: 'paypal',
          color: '#0070BA',
          requiresProof: true,
          instructions: 'Effectuez le paiement via votre compte PayPal puis téléchargez une capture d\'écran de la confirmation.'
        },
        {
          id: 'virement',
          type: 'virement',
          label: 'Virement bancaire',
          icon: 'bank',
          requiresProof: true,
          instructions: 'Effectuez un virement vers notre compte bancaire puis téléchargez une preuve de paiement.'
        },
        {
          id: 'wave',
          type: 'wave',
          label: 'Wave',
          icon: 'wave',
          color: '#1DACE3',
          requiresProof: true,
          phoneNumber: '+221 77 123 45 67',
          instructions: 'Envoyez le montant au numéro indiqué puis téléchargez une capture d\'écran de la confirmation.'
        },
        {
          id: 'orange',
          type: 'orange',
          label: 'Orange Money',
          icon: 'mobile',
          color: '#FF6600',
          requiresProof: true,
          phoneNumber: '+221 77 987 65 43',
          instructions: 'Envoyez le montant au numéro indiqué puis téléchargez une capture d\'écran de la confirmation.'
        }
      ]);

      // Données de démonstration pour les paiements à venir
      setUpcomingPayments([
        {
          id: 'pay1',
          programId: 'prog1',
          programName: 'Résidence Les Palmiers',
          amount: '1 500 000 FCFA',
          dueDate: '15/06/2025',
          status: 'pending',
          imageSrc: '/api/placeholder/120/80'
        },
        {
          id: 'pay2',
          programId: 'prog2',
          programName: 'Villa Horizon',
          amount: '1 100 000 FCFA',
          dueDate: '30/05/2025',
          status: 'pending',
          imageSrc: '/api/placeholder/120/80'
        }
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  const handlePaymentMethodSelect = (id) => {
    setSelectedPaymentMethod(id);
  };

  const handlePaymentSelect = (id) => {
    setSelectedPayment(id);
  };

  const handleContinue = () => {
    if (paymentStep === 1 && selectedPayment) {
      setPaymentStep(2);
    } else if (paymentStep === 2 && selectedPaymentMethod) {
      setPaymentStep(3);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTransactionProof(file);
      
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onloadend = () => {
        setTransactionProofPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessPayment = () => {
    // Vérifier si une preuve est requise pour la méthode de paiement sélectionnée
    const selectedMethod = paymentMethods.find(m => m.id === selectedPaymentMethod);
    
    if (selectedMethod?.requiresProof && !transactionProof) {
      alert('Veuillez télécharger une preuve de paiement pour cette méthode.');
      return;
    }
    
    setProcessing(true);
    
    // Simuler un traitement de paiement
    setTimeout(() => {
      setProcessing(false);
      setShowConfetti(true);
      
      setTimeout(() => {
        setPaymentSuccess(true);
      
        // Mettre à jour la liste des paiements
        setUpcomingPayments(prev => 
          prev.map(payment => 
            payment.id === selectedPayment 
              ? {...payment, status: 'paid'} 
              : payment
          )
        );
      }, 500);
    }, 2000);
  };

  const handleNewPayment = () => {
    setPaymentStep(1);
    setSelectedPayment('');
    setSelectedPaymentMethod('');
    setPaymentSuccess(false);
    setTransactionProof(null);
    setTransactionProofPreview(null);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'À payer';
      case 'paid':
        return 'Payé';
      case 'late':
        return 'En retard';
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderIcon = (iconName, color) => {
    switch (iconName) {
      case 'paypal':
        return (
          <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill={color || '#0070BA'}>
              <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.59 3.025-2.566 6.082-8.091 6.082h-2.19a1.89 1.89 0 0 0-1.987 1.7l-.916 5.8h6.283c.524 0 .968-.382 1.05-.9l.443-2.816.337-2.133.063-.4c.077-.494.524-.864 1.05-.864h.661c4.298 0 7.665-1.746 8.647-6.797.321-1.656.138-3.004-.702-3.9v.002c-.009-.008-.018-.015-.028-.023-.134-.108-.28-.22-.433-.317l-.003-.003z"/>
            </svg>
          </div>
        );
      case 'bank':
        return (
          <div className="p-2 rounded-full bg-gray-100">
            <Building className="h-6 w-6 text-gray-600" />
          </div>
        );
      case 'wave':
        return (
          <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill={color || '#1DACE3'}>
              <path d="M23.954 8.125a.84.84 0 0 0-.247-.586 12.551 12.551 0 0 0-6.318-3.65.84.84 0 0 0-.23-.033H6.84a.84.84 0 0 0-.23.033 12.551 12.551 0 0 0-6.318 3.65.84.84 0 0 0-.247.586c0 .21.084.41.233.557a12.454 12.454 0 0 0 6.318 3.636.84.84 0 0 0 .244.037h10.318a.84.84 0 0 0 .244-.037 12.454 12.454 0 0 0 6.318-3.636.84.84 0 0 0 .233-.557z"/>
              <path d="M23.954 15.875a.84.84 0 0 0-.247-.586 12.551 12.551 0 0 0-6.318-3.65.84.84 0 0 0-.23-.033H6.84a.84.84 0 0 0-.23.033 12.551 12.551 0 0 0-6.318 3.65.84.84 0 0 0-.247.586c0 .21.084.41.233.557a12.454 12.454 0 0 0 6.318 3.636.84.84 0 0 0 .244.037h10.318a.84.84 0 0 0 .244-.037 12.454 12.454 0 0 0 6.318-3.636.84.84 0 0 0 .233-.557z"/>
            </svg>
          </div>
        );
      case 'mobile':
        return (
          <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
            <Smartphone className="h-6 w-6" color={color || '#FF6600'} />
          </div>
        );
      default:
        return null;
    }
  };

  // Composant de confettis
  const Confetti = () => {
    if (!showConfetti) return null;
    
    const confettiElements = [];
    const colors = ['#FFC700', '#FF0058', '#2E7DAF', '#17B978'];
    
    for (let i = 0; i < 150; i++) {
      const left = Math.random() * 100;
      const width = Math.random() * 10 + 5;
      const height = Math.random() * 10 + 5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const animationDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 0.5;
      
      confettiElements.push(
        <div
          key={i}
          className="fixed"
          style={{
            left: `${left}%`,
            top: '-20px',
            width: `${width}px`,
            height: `${height}px`,
            backgroundColor: color,
            borderRadius: '2px',
            transformOrigin: 'center',
            animation: `confetti ${animationDuration}s ease-in-out ${delay}s forwards`,
            opacity: 0,
            zIndex: 9999
          }}
        />
      );
    }
    
    return (
      <div className="confetti-container">
        <style>
          {`
            @keyframes confetti {
              0% {
                transform: translateY(0) rotateZ(0);
                opacity: 1;
              }
              100% {
                transform: translateY(1000px) rotateZ(720deg);
                opacity: 0;
              }
            }
          `}
        </style>
        {confettiElements}
      </div>
    );
  };

  // Étapes du processus de paiement
  const steps = [
    { id: 1, label: 'Sélection' },
    { id: 2, label: 'Méthode' },
    { id: 3, label: 'Confirmation' }
  ];

  const StepIndicator = () => {
    if (paymentSuccess) return null;
    
    return (
      <div className="flex justify-center items-center mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div 
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                paymentStep >= step.id 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {paymentStep > step.id ? (
                <Check size={20} />
              ) : (
                <span className="text-sm font-bold">{step.id}</span>
              )}
            </div>
            
            <div className="flex flex-col items-center mx-2">
              <span className={`text-xs font-medium ${paymentStep >= step.id ? 'text-yellow-500' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            
            {index < steps.length - 1 && (
              <div 
                className={`w-16 h-1 mx-1 rounded transition-all duration-300 ${
                  paymentStep > step.id ? 'bg-yellow-500' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderPaymentStep = () => {
    if (paymentSuccess) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className="relative">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative overflow-hidden">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <CheckCircle size={40} className="text-green-600 z-10 relative" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="absolute inset-0 bg-green-200 rounded-full"
                style={{ transform: "scale(0.85)" }}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0, duration: 0.5 }}
                className="absolute inset-0 bg-green-100 rounded-full"
              />
            </div>
          </div>
          
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-semibold text-gray-900 mb-2"
          >
            Paiement effectué avec succès
          </motion.h3>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-600 mb-6"
          >
            Votre paiement a été traité et confirmé. Un reçu a été envoyé à votre adresse email.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-6 bg-gray-50 rounded-xl mb-8"
          >
            <div className="flex justify-between mb-3">
              <span className="text-gray-500">Numéro de transaction</span>
              <span className="font-medium">BIBA-{Math.floor(Math.random() * 10000)}-{new Date().getFullYear()}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-gray-500">Date</span>
              <span className="font-medium">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Statut</span>
              <span className="inline-flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
                <CheckCircle size={14} className="mr-1" />
                Confirmé
              </span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4"
          >
            <div
              onClick={handleNewPayment}
              className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl transition shadow-lg hover:shadow-xl flex items-center justify-center cursor-pointer"
            >
              <RefreshCw size={18} className="mr-2" />
              Effectuer un autre paiement
            </div>
            <div
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-xl transition shadow-sm hover:shadow flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft size={18} className="mr-2" />
              Retour au dossier
            </div>
          </motion.div>
        </motion.div>
      );
    }

    switch (paymentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Sélectionnez un paiement à effectuer</h3>
            
            <div className="space-y-4 mb-8">
              <AnimatePresence>
                {upcomingPayments.map((payment, index) => (
                  <motion.div 
                    key={payment.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => handlePaymentSelect(payment.id)}
                    className={`relative overflow-hidden border rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                      selectedPayment === payment.id 
                        ? 'border-yellow-500 bg-yellow-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-4">
                        <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                          <img src={payment.imageSrc} alt={payment.programName} className="w-full h-full object-cover" />
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <p className="font-bold text-gray-900 mb-1">{payment.programName}</p>
                            <div className="flex items-center text-sm text-gray-600">
                              <Calendar size={14} className="mr-1" />
                              <p>Échéance: <span className="font-medium">{payment.dueDate}</span></p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-yellow-600">{payment.amount}</p>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${getStatusClass(payment.status)}`}>
                              {getStatusLabel(payment.status)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {selectedPayment === payment.id && (
                        <div className="absolute top-0 right-0 mt-3 mr-3">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleContinue}
              className={`w-full py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer ${
                selectedPayment 
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white hover:shadow-xl' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span className="mr-2">Continuer</span>
              <ChevronRight size={20} />
            </motion.div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Choisissez votre méthode de paiement</h3>
            
            <div className="space-y-4 mb-8">
              <AnimatePresence>
                {paymentMethods.map((method, index) => (
                  <motion.div 
                    key={method.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                    className={`relative border rounded-xl p-5 cursor-pointer transition-all duration-300 ${
                      selectedPaymentMethod === method.id 
                        ? 'border-yellow-500 bg-yellow-50 shadow-md' 
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center">
                      {renderIcon(method.icon, method.color)}
                      
                      <div className="ml-4">
                        <p className="font-bold text-gray-900">{method.label}</p>
                        {method.requiresProof && (
                          <div className="flex items-center text-xs text-gray-600 mt-1">
                            <Info size={12} className="mr-1" />
                            <p>Preuve de paiement requise</p>
                          </div>
                        )}
                        {method.phoneNumber && (
                          <p className="text-sm font-medium text-gray-800 mt-1">{method.phoneNumber}</p>
                        )}
                      </div>
                      
                      {selectedPaymentMethod === method.id && (
                        <div className="absolute top-0 right-0 mt-4 mr-4">
                          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {method.instructions && selectedPaymentMethod === method.id && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 pt-3 border-t border-gray-200"
                      >
                        <p className="text-sm text-gray-600">
                          {method.instructions}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex space-x-4"
            >
              <div
                onClick={() => setPaymentStep(1)}
                className="w-1/3 py-3.5 px-4 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-xl transition shadow-sm hover:shadow flex items-center justify-center cursor-pointer"
              >
                <ArrowLeft size={18} className="mr-2" />
                Retour
              </div>
              <div
                onClick={handleContinue}
                className={`w-2/3 py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer ${
                  selectedPaymentMethod 
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white hover:shadow-xl' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span className="mr-2">Continuer</span>
                <ChevronRight size={20} />
              </div>
            </motion.div>
          </motion.div>
        );

      case 3:
        const selectedPaymentData = upcomingPayments.find(p => p.id === selectedPayment);
        const selectedMethodData = paymentMethods.find(m => m.id === selectedPaymentMethod);
        
        return (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Confirmer votre paiement</h3>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 rounded-xl p-6 mb-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-20 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 mr-4">
                  <img src={selectedPaymentData?.imageSrc} alt={selectedPaymentData?.programName} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">{selectedPaymentData?.programName}</h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar size={14} className="mr-1" />
                    <p>Échéance: {selectedPaymentData?.dueDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Montant:</span>
                  <span className="font-bold text-yellow-600 text-lg">{selectedPaymentData?.amount}</span>
                </div>
                
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600">Méthode de paiement:</span>
                  <div className="flex items-center">
                    {renderIcon(selectedMethodData?.icon, selectedMethodData?.color)}
                    <span className="ml-2 font-medium">{selectedMethodData?.label}</span>
                  </div>
                </div>
                
                {selectedMethodData?.phoneNumber && (
                  <div className="flex justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-600">Numéro à utiliser:</span>
                    <span className="font-medium">{selectedMethodData.phoneNumber}</span>
                  </div>
                )}
                
                <div className="py-3">
                  <div className="flex items-center mb-2">
                    <Info size={18} className="text-gray-500 mr-2" />
                    <h4 className="font-medium text-gray-900">Instructions de paiement</h4>
                  </div>
                  {selectedMethodData?.instructions && (
                    <p className="text-sm text-gray-600 ml-8">
                      {selectedMethodData.instructions}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                <Upload size={18} className="mr-2 text-gray-600" />
                Preuve de paiement
              </h4>
              
              {transactionProofPreview ? (
                <div className="mb-4">
                  <div className="relative w-full h-64 bg-gray-100 rounded-xl overflow-hidden mb-3">
                    <img 
                      src={transactionProofPreview} 
                      alt="Preuve de paiement" 
                      className="w-full h-full object-contain"
                    />
                    <div 
                      onClick={() => {
                        setTransactionProof(null);
                        setTransactionProofPreview(null);
                      }}
                      className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition cursor-pointer"
                    >
                      <X size={16} className="text-gray-600" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 flex items-center">
                    <CheckCircle size={16} className="text-green-500 mr-2" />
                    {transactionProof?.name || "Document téléchargé"}
                  </p>
                </div>
              ) : (
                <div className="mb-4">
                  <label 
                    htmlFor="transaction-proof" 
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex flex-col items-center justify-center p-6 text-center">
                      <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <Upload size={24} className="text-gray-400" />
                      </div>
                      <p className="font-medium text-gray-700 mb-2">Cliquez pour télécharger une preuve</p>
                      <p className="text-sm text-gray-500 max-w-xs">
                        Formats supportés: JPG, PNG, PDF (max. 10 MB)
                      </p>
                    </div>
                    <input 
                      id="transaction-proof" 
                      type="file" 
                      accept="image/*,application/pdf" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex space-x-4"
            >
              <div
                onClick={() => setPaymentStep(2)}
                className="w-1/3 py-3.5 px-4 bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 rounded-xl transition shadow-sm hover:shadow flex items-center justify-center cursor-pointer"
              >
                <ArrowLeft size={18} className="mr-2" />
                Retour
              </div>
              <div
                onClick={handleProcessPayment}
                className={`w-2/3 py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg cursor-pointer ${
                  processing 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : !transactionProof 
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                      : 'bg-yellow-500 hover:bg-yellow-600 text-white hover:shadow-xl'
                }`}
              >
                {processing ? (
                  <>
                    <Loader size={20} className="animate-spin mr-2" />
                    Traitement en cours...
                  </>
                ) : (
                  <>
                    <span>Confirmer et payer</span>
                    <Check size={20} className="ml-2" />
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-16 pb-20 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-3xl mx-auto px-4">
        <Confetti />
        
        <div className="flex items-center mb-8">
          <div
            onClick={() => window.history.back()}
            className="flex items-center text-yellow-600 hover:text-yellow-700 font-medium transition cursor-pointer"
          >
            <ArrowLeft size={18} className="mr-2" />
            Retour au dossier
          </div>
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Effectuer un paiement</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Réglez vos échéances pour vos programmes immobiliers en toute sécurité.
          </p>
        </div>

        <StepIndicator />

        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="flex flex-col items-center justify-center h-64">
              <div className="w-16 h-16 mb-6 relative">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
                <div className="absolute inset-0 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin"></div>
              </div>
              <p className="text-lg text-gray-600">Chargement des informations de paiement...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 relative overflow-hidden">
            {/* Cercles décoratifs en arrière-plan */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-yellow-100 opacity-50"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-blue-100 opacity-50"></div>
            
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {renderPaymentStep()}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            Besoin d'aide? Contactez notre service client au <span className="font-medium text-gray-600">+221 78 123 45 67</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;