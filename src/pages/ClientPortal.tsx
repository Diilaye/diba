
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  CreditCard, 
  FileText, 
  Home, 
  Clock, 
  AlertCircle, 
  Bell, 
  LogOut, 
  ChevronRight, 
  Calendar, 
  Download, 
  Upload, 
  Plus, 
  Search, 
  Moon, 
  Sun,
  CheckCircle,
  Circle,
  Activity,
  DollarSign,
  FileIcon,
  Info,
  Menu,
  X,
  ArrowUpRight,
  MapPin
} from 'lucide-react';

const ClientPortal = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const [programs, setPrograms] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Statistiques rapides pour le dashboard
  const [stats, setStats] = useState({
    totalInvested: '0 FCFA',
    activePrograms: 0,
    nextPayment: { date: '', amount: '0 FCFA' },
    documents: 0
  });

  useEffect(() => {
    // Vérifier le mode sombre dans localStorage
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    
    // Récupérer l'email de l'utilisateur connecté
    const email = localStorage.getItem('userEmail') || 'client@exemple.com';
    setUserEmail(email);

    // Simuler le chargement des données
    setTimeout(() => {
      // Données de démonstration pour les programmes
      setPrograms([
        {
          id: 'prog3',
          name: 'Sama Achat Groupé 3 - Louly Sindiane',
          status: 'En cours',
          progress: 65,
          nextPayment: '15/06/2025',
          location: 'Louly Sindiane, Mbour',
          totalAmount: '17 992 968 FCFA',
          paidAmount: '11 695 429 FCFA',
          remainingAmount: '6 297 539 FCFA',
          image: '/achat3.jpeg'
        },
        {
          id: 'prog2',
          name: 'Sama Achat Groupé 2 - Rufisque',
          status: 'En attente',
          progress: 25,
          nextPayment: '30/05/2025',
          location: 'Rufisque',
          totalAmount: '22 000 000 FCFA',
          paidAmount: '5 500 000 FCFA',
          remainingAmount: '16 500 000 FCFA',
          image: '/api/placeholder/200/120'
        }
      ]);

      // Données de démonstration pour les transactions
      setTransactions([
        {
          id: 'tr1',
          date: '15/04/2025',
          amount: '1 500 000 FCFA',
          description: 'Paiement mensuel - Résidence Les Palmiers',
          status: 'Confirmé',
          method: 'Virement bancaire'
        },
        {
          id: 'tr2',
          date: '15/03/2025',
          amount: '1 500 000 FCFA',
          description: 'Paiement mensuel - Résidence Les Palmiers',
          status: 'Confirmé',
          method: 'Orange Money'
        },
        {
          id: 'tr3',
          date: '15/02/2025',
          amount: '1 100 000 FCFA',
          description: 'Paiement initial - Villa Horizon',
          status: 'Confirmé',
          method: 'Wave'
        }
      ]);
      
      // Données de démonstration pour les notifications
      setNotifications([
        {
          id: 'notif1',
          title: 'Paiement à venir',
          message: 'Rappel : votre prochain paiement pour Résidence Les Palmiers est dû le 15/06/2025',
          date: '17/05/2025',
          read: false,
          type: 'reminder'
        },
        {
          id: 'notif2',
          title: 'Document disponible',
          message: 'Un nouveau document a été ajouté à votre dossier.',
          date: '10/05/2025',
          read: true,
          type: 'document'
        },
        {
          id: 'notif3',
          title: 'Paiement confirmé',
          message: 'Votre paiement de 1 500 000 FCFA a été confirmé.',
          date: '15/04/2025',
          read: true,
          type: 'payment'
        }
      ]);
      
      // Calculer les statistiques
      const totalInvested = programs.reduce((sum, program) => {
        const paidAmount = parseFloat(program.paidAmount.replace(/[^\d]/g, ''));
        return sum + paidAmount;
      }, 0);
      
      const nextPaymentDate = programs.sort((a, b) => {
        const dateA = new Date(a.nextPayment.split('/').reverse().join('-'));
        const dateB = new Date(b.nextPayment.split('/').reverse().join('-'));
        return dateA - dateB;
      })[0];
      
      setStats({
        totalInvested: `${(totalInvested/1000000).toFixed(1)} M FCFA`,
        activePrograms: programs.length,
        nextPayment: { 
          date: nextPaymentDate?.nextPayment || '', 
          amount: '1 500 000 FCFA'
        },
        documents: 0
      });

      setIsLoading(false);
    }, 1500);
  }, []);
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    window.location.href = '/';
  };
  
  const markNotificationAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="text-green-500" size={18} />;
      case 'document':
        return <FileText className="text-blue-500" size={18} />;
      case 'reminder':
        return <AlertCircle className="text-amber-500" size={18} />;
      default:
        return <Bell className="text-gray-500" size={18} />;
    }
  };
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };
  
  // Pagination pour les transactions
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  
  // Rendu du chargement
  const renderLoading = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="absolute inset-0 rounded-full border-4 border-yellow-500 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-300">Chargement de votre espace client...</p>
      </div>
    </div>
  );
  
  // Rendu du menu de navigation
  const renderNavigation = () => {
    const navItems = [
      { id: 'dashboard', label: 'Tableau de bord', icon: <Home size={20} /> },
      { id: 'programs', label: 'Mes programmes', icon: <Building size={20} /> },
      { id: 'transactions', label: 'Transactions', icon: <CreditCard size={20} /> },
      { id: 'documents', label: 'Documents', icon: <FileText size={20} /> }
    ];
    
    return (
      <>
        {/* Menu mobile */}
        <div className="md:hidden flex items-center justify-between mb-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">BIBA IMMO</h2>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="absolute top-0 left-0 w-3/4 h-full bg-white dark:bg-gray-800 shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="p-4 flex flex-col h-full">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Menu</h2>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-gray-600 dark:text-gray-300">
                    <X size={24} />
                  </button>
                </div>
                
                <div className="flex flex-col space-y-2">
                  {navItems.map(item => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center p-4 rounded-xl transition-all ${
                        activeTab === item.id 
                          ? 'bg-yellow-500 text-white font-medium shadow-md' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}
                    >
                      {item.icon}
                      <span className="ml-3">{item.label}</span>
                    </button>
                  ))}
                </div>
                
                <div className="mt-auto p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">{userEmail}</span>
                    <button
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-600 transition-colors flex items-center"
                    >
                      <LogOut size={18} className="mr-2" />
                      <span>Déconnexion</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Desktop navigation */}
        <div className="hidden md:flex flex-col space-y-2 mb-6">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center p-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-yellow-500 text-white font-medium shadow-md' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'
              }`}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </button>
          ))}
        </div>
      </>
    );
  };
  
  // Composant pour les statuts
  const StatusBadge = ({ status }) => {
    const getStatusClass = (status) => {
      switch (status) {
        case 'En cours':
        case 'Confirmé':
          return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
        case 'En attente':
          return 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200';
        case 'Annulé':
          return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
        default:
          return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
      }
    };
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusClass(status)}`}>
        {status === 'Confirmé' || status === 'En cours' ? (
          <CheckCircle size={12} className="mr-1" />
        ) : (
          <Circle size={12} className="mr-1" />
        )}
        {status}
      </span>
    );
  };
  
  // Component for rendering the Building icon since it's not available in lucide-react
  const Building = ({ size = 24, className = "" }) => {
    return (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
      >
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
        <line x1="9" y1="22" x2="9" y2="2"></line>
        <line x1="15" y1="22" x2="15" y2="2"></line>
        <line x1="4" y1="12" x2="9" y2="12"></line>
        <line x1="15" y1="12" x2="20" y2="12"></line>
      </svg>
    );
  };
  
  // Rendu des tabs
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'programs':
        return renderPrograms();
      case 'transactions':
        return renderTransactions();
      case 'documents':
        return renderDocuments();
      default:
        return renderDashboard();
    }
  };

  // Rendu du tableau de bord
  const renderDashboard = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total investi</h3>
            <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900 flex items-center justify-center">
              <DollarSign size={20} className="text-pink-500 dark:text-pink-300" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalInvested}</p>
          <p className="text-xs text-green-600 dark:text-green-400 mt-2 flex items-center">
            <Activity size={12} className="mr-1" />
            Progression constante
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Programmes actifs</h3>
            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <Building size={20} className="text-blue-500 dark:text-blue-300" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.activePrograms}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Programmes en cours</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Prochain paiement</h3>
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
              <Calendar size={20} className="text-amber-500 dark:text-amber-300" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.nextPayment.date}</p>
          <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">{stats.nextPayment.amount}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Documents</h3>
            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
              <FileIcon size={20} className="text-purple-500 dark:text-purple-300" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.documents}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Documents disponibles</p>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Programme en vedette</h2>
            <button 
              onClick={() => setActiveTab('programs')}
              className="text-yellow-500 hover:text-yellow-600 flex items-center text-sm font-medium"
            >
              Voir tous <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Afficher uniquement le programme 3 */}
            <div 
              key={programs[0].id}
              className="flex flex-col border border-yellow-200 dark:border-yellow-900 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <div className="mb-4 rounded-lg overflow-hidden h-48 w-full bg-gray-100 dark:bg-gray-700 flex-shrink-0">
                <img src={programs[0].image} alt={programs[0].name} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-grow">
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{programs[0].name}</h3>
                  <StatusBadge status={programs[0].status} />
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-4">Programme phare de BIBA IMMO situé à la sortie du péage de Mbour, offrant une opportunité d'investissement exceptionnelle.</p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span>Progression du projet</span>
                    <span className="font-medium">{programs[0].progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-500 h-2.5 rounded-full" 
                      style={{ width: `${programs[0].progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center text-sm">
                  <p className="text-gray-500 dark:text-gray-400 mb-2 sm:mb-0 sm:mr-4 flex items-center">
                    <MapPin size={14} className="mr-1" />
                    {programs[0].location}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 flex items-center">
                    <Calendar size={14} className="mr-1" />
                    Prochain paiement: {programs[0].nextPayment}
                  </p>
                </div>
                
                <button 
                  onClick={() => window.location.href = '/programmes/3'}
                  className="mt-4 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-sm flex items-center justify-center transition-colors w-full"
                >
                  Voir les détails du programme
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Dernières transactions</h2>
            <button 
              onClick={() => setActiveTab('transactions')}
              className="text-yellow-500 hover:text-yellow-600 flex items-center text-sm font-medium"
            >
              Voir toutes <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            {transactions.slice(0, 3).map((transaction) => (
              <div 
                key={transaction.id}
                className="flex items-center justify-between p-3 border border-gray-100 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                    <DollarSign size={16} className="text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{transaction.description.split(' - ')[0]}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{transaction.amount}</p>
                  <StatusBadge status={transaction.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Notifications 
              {unreadNotificationsCount > 0 && (
                <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-red-500 text-white">
                  {unreadNotificationsCount}
                </span>
              )}
            </h2>
            <button className="text-yellow-500 hover:text-yellow-600 text-sm font-medium">
              Marquer tout comme lu
            </button>
          </div>
          
          <div className="space-y-3">
            {notifications.slice(0, 4).map((notification) => (
              <div 
                key={notification.id}
                className={`p-3 border rounded-lg transition-colors ${
                  notification.read 
                    ? 'border-gray-100 dark:border-gray-700' 
                    : 'border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20'
                }`}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{notification.title}</p>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{notification.date}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{notification.message}</p>
                  </div>
                </div>
                
                {!notification.read && (
                  <div className="mt-2 text-right">
                    <button 
                      onClick={() => markNotificationAsRead(notification.id)}
                      className="text-xs text-yellow-500 hover:text-yellow-600"
                    >
                      Marquer comme lu
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
  
  // Rendu des programmes
  const renderPrograms = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Mes Programmes</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Les programmes immobiliers auxquels vous êtes abonné
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/programmes'}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-sm flex items-center transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Découvrir plus
        </button>
      </motion.div>
      
      {programs.length > 0 ? (
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {programs.map((program) => (
            <div 
              key={program.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={program.image} 
                  alt={program.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <StatusBadge status={program.status} />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{program.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 flex items-center">
                  <MapPin size={16} className="mr-1" />
                  {program.location}
                </p>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <span>Progression du projet</span>
                    <span className="font-medium">{program.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-yellow-500 h-2.5 rounded-full" 
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Montant total</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{program.totalAmount}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-750 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Montant payé</p>
                    <p className="font-semibold text-green-600 dark:text-green-400">{program.paidAmount}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar size={14} className="mr-1" />
                    <span>Prochain paiement: <span className="font-medium text-gray-700 dark:text-gray-300">{program.nextPayment}</span></span>
                  </div>
                  
                  <button className="text-yellow-500 hover:text-yellow-600 flex items-center font-medium">
                    Voir détails <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Building size={24} className="text-gray-400 dark:text-gray-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun programme actif</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Vous n'avez pas encore de programme immobilier en cours.
          </p>
          <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors">
            Découvrir nos programmes
          </button>
        </motion.div>
      )}
    </motion.div>
  );
  
  // Rendu des transactions
  const renderTransactions = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Historique des transactions</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Consultez l'historique complet de vos paiements
          </p>
        </div>
        
        <button 
          onClick={() => window.location.href = '/mon-dossier/paiement'}
          className="mt-4 sm:mt-0 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-sm flex items-center transition-colors"
        >
          <CreditCard size={18} className="mr-2" />
          Nouveau paiement
        </button>
      </motion.div>
      
      <motion.div 
        variants={itemVariants}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
      >
        <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between">
          <div className="relative w-full sm:w-64 mb-4 sm:mb-0">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input 
              type="text" 
              className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full pl-10 p-2.5" 
              placeholder="Rechercher une transaction"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <select className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5">
              <option value="">Tous les statuts</option>
              <option value="confirmed">Confirmé</option>
              <option value="pending">En attente</option>
              <option value="cancelled">Annulé</option>
            </select>
            
            <select className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block p-2.5">
              <option value="">Toutes les périodes</option>
              <option value="month">Ce mois</option>
              <option value="quarter">Ce trimestre</option>
              <option value="year">Cette année</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 text-xs text-gray-700 dark:text-gray-300 uppercase">
              <tr>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Description</th>
                <th className="px-6 py-3 text-left">Méthode</th>
                <th className="px-6 py-3 text-right">Montant</th>
                <th className="px-6 py-3 text-right">Statut</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {currentTransactions.map((transaction) => (
                <tr 
                  key={transaction.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {transaction.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {transaction.method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <StatusBadge status={transaction.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-yellow-500 hover:text-yellow-600">
                      Détails
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Affichage de <span className="font-medium">{indexOfFirstTransaction + 1}</span> à <span className="font-medium">{Math.min(indexOfLastTransaction, transactions.length)}</span> sur <span className="font-medium">{transactions.length}</span> transactions
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`p-2 rounded-md ${
                  currentPage === 1 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === page 
                      ? 'bg-yellow-500 text-white' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button 
                onClick={() => setCurrentPage(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className={`p-2 rounded-md ${
                  currentPage === totalPages 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
  
  // Rendu des documents
  const renderDocuments = () => (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Documents</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Gérez vos documents importants liés à vos programmes immobiliers
          </p>
        </div>
        
        <button className="mt-4 sm:mt-0 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-sm flex items-center transition-colors">
          <Upload size={18} className="mr-2" />
          Télécharger un document
        </button>
      </motion.div>
      
      <motion.div variants={itemVariants} className="bg-white dark:bg-gray-800 rounded-xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText size={24} className="text-gray-400 dark:text-gray-500" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Aucun document disponible</h3>
        <p className="text-gray-500 dark:text-gray-400 mb-6">
          Vous n'avez pas encore de documents associés à vos programmes.
        </p>
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-650">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload size={32} className="mb-3 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium">Cliquez pour télécharger</span> ou glissez-déposez
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PDF, PNG, JPG (MAX. 10MB)
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
  
  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <style>
        {`
          .dark {
            color-scheme: dark;
          }
          
          @keyframes pulse-ring {
            0% {
              transform: scale(0.8);
            }
            50% {
              transform: scale(1);
            }
            100% {
              transform: scale(0.8);
            }
          }
          
          .animate-pulse-ring {
            animation: pulse-ring 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
          }
          
          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          
          .dark ::-webkit-scrollbar-track {
            background: #1f2937;
          }
          
          ::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          
          .dark ::-webkit-scrollbar-thumb {
            background: #4b5563;
          }
          
          .dark ::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
        `}
      </style>
    
      <div className="bg-gray-50 dark:bg-gray-900 py-6 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Topbar */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-yellow-500">BIBA IMMO</h1>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="relative p-2 text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors">
                  <Bell size={22} />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold rounded-full bg-red-500 text-white">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
              </div>
              
              <button 
                onClick={toggleDarkMode}
                className="p-2 text-gray-500 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-500 transition-colors"
              >
                {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
              </button>
              
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                  <User size={18} className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {userEmail.split('@')[0]}
                  </p>
                  <button
                    onClick={handleLogout}
                    className="text-xs text-red-500 hover:text-red-600 transition-colors"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar */}
            <div className="md:w-64 flex-shrink-0">
              {renderNavigation()}
            </div>
            
            {/* Main content */}
            <div className="flex-grow">
              {isLoading ? renderLoading() : renderTabContent()}
            </div>
          </div>
          
          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© 2025 BIBA IMMO INGENIERING. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPortal;