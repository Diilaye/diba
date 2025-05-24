import React, { useState, useRef, useEffect } from 'react';
import {
  UserCircle as User,
  Search,
  Camera,
  XCircle as X,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Loader,
  FileText
} from 'lucide-react';

// Définition du type pour les informations utilisateur
type UserInfo = {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  adresse: string;
  telephone: string;
  email: string;
  projet: string;
  parcelle: string;
  localite: string;
  statut: string;
  photoUrl: string;
};

const MatriculeSearch: React.FC = () => {
  // États pour la recherche par matricule et la reconnaissance faciale
  const [matricule, setMatricule] = useState('');
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'failed' | null>(null);
  const [accessGranted, setAccessGranted] = useState(false);
  
  // Référence pour la vidéo
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  // Fonction pour rechercher un utilisateur par matricule
  const searchByMatricule = async () => {
    if (!matricule.trim()) {
      setError('Veuillez entrer un matricule');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setUserInfo(null);
    
    try {
      // Simulation d'une requête API - à remplacer par votre appel API réel
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Exemple de données fictives - à remplacer par les données réelles de votre API
      if (matricule === 'AG3-125-LLY' || matricule === 'AG1002DKCAM') {
        const userData: UserInfo = {
          id: '12345',
          matricule: matricule,
          nom: 'DIBA',
          prenom: 'Aby',
          adresse: 'Dakar, Sénégal',
          telephone: '+221 77 123 45 67',
          email: 'aby.diba@example.com',
          projet: 'Achat Groupé 3',
          parcelle: '125',
          localite: 'Louly',
          statut: 'Actif',
          photoUrl: '/aby.jpeg'
        };
        
        setUserInfo(userData);
        setIsLoading(false);
        // Demander la vérification par reconnaissance faciale
        setShowCamera(true);
      } else {
        setError('Matricule non trouvé. Veuillez vérifier et réessayer.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError('Une erreur est survenue. Veuillez réessayer.');
      setIsLoading(false);
    }
  };
  
  // Fonction pour démarrer la caméra
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (err) {
      console.error('Erreur lors de l\'accès à la caméra:', err);
      setError('Impossible d\'accéder à la caméra. Veuillez vérifier vos permissions.');
      setShowCamera(false);
    }
  };
  
  // Fonction pour arrêter la caméra
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };
  
  // Fonction pour capturer une image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
        
        // Arrêter la caméra après la capture
        stopCamera();
        
        // Simuler la vérification de reconnaissance faciale
        verifyFacialRecognition(imageDataUrl);
      }
    }
  };
  
  // Fonction pour vérifier la reconnaissance faciale
  const verifyFacialRecognition = async (imageData: string) => {
    setIsLoading(true);
    
    try {
      // Simulation d'une requête API de reconnaissance faciale
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler un résultat positif (à remplacer par votre logique réelle)
      const success = true; // Mettre à true pour simuler une vérification réussie
      
      if (success) {
        setVerificationStatus('success');
        setAccessGranted(true);
      } else {
        setVerificationStatus('failed');
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Erreur lors de la vérification faciale:', err);
      setVerificationStatus('failed');
      setIsLoading(false);
    }
  };
  
  // Effet pour démarrer la caméra lorsque showCamera devient true
  useEffect(() => {
    if (showCamera) {
      startCamera();
    }
  }, [showCamera]);
  
  // Effet pour nettoyer la caméra lors du démontage du composant
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  // Réinitialiser l'état
  const resetState = () => {
    setMatricule('');
    setUserInfo(null);
    setCapturedImage(null);
    setVerificationStatus(null);
    setAccessGranted(false);
    setError('');
  };
  
  return (
    <div className="space-y-4">
      {!accessGranted ? (
        <div className="space-y-4">
          {!userInfo ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Votre matricule (si déjà membre)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  placeholder="Ex: AG3-125-LLY"
                  value={matricule}
                  onChange={(e) => setMatricule(e.target.value)}
                />
              </div>
              <button 
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center"
                onClick={searchByMatricule}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    Recherche en cours...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Rechercher mon dossier
                  </>
                )}
              </button>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  <div className="flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                    {error}
                  </div>
                </div>
              )}
              <p className="text-sm text-gray-500">Pas encore membre ? <a href="/adherer" className="text-yellow-600">Cliquez ici</a></p>
            </>
          ) : (
            <>
              {/* Informations utilisateur trouvées */}
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 mb-4">
                <h3 className="font-medium text-amber-800 mb-2 flex items-center">
                  <User className="w-5 h-5 mr-2 text-amber-600" />
                  Informations trouvées
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-600">Matricule:</div>
                  <div className="font-medium">{userInfo.matricule}</div>
                  <div className="text-gray-600">Nom:</div>
                  <div className="font-medium">{userInfo.nom}</div>
                  <div className="text-gray-600">Prénom:</div>
                  <div className="font-medium">{userInfo.prenom}</div>
                  <div className="text-gray-600">Projet:</div>
                  <div className="font-medium">{userInfo.projet}</div>
                </div>
              </div>
              
              {/* Section de reconnaissance faciale */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                  <Camera className="w-5 h-5 mr-2 text-amber-600" />
                  Vérification d'identité
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Pour accéder à votre dossier, veuillez confirmer votre identité par reconnaissance faciale.
                </p>
                
                {showCamera && (
                  <div className="relative mb-4 bg-black rounded-lg overflow-hidden">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      className="w-full h-64 object-cover"
                    />
                    <button 
                      onClick={captureImage}
                      className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white text-gray-800 px-4 py-2 rounded-full flex items-center shadow-lg"
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Capturer
                    </button>
                    <button 
                      onClick={stopCamera}
                      className="absolute top-3 right-3 bg-white/80 p-2 rounded-full text-gray-800 hover:bg-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                )}
                
                {capturedImage && (
                  <div className="mb-4">
                    <div className="relative">
                      <img 
                        src={capturedImage} 
                        alt="Captured" 
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    </div>
                  </div>
                )}
                
                {verificationStatus === 'success' && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Identité vérifiée avec succès!
                  </div>
                )}
                
                {verificationStatus === 'failed' && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2 text-red-500" />
                    La vérification a échoué. Veuillez réessayer.
                  </div>
                )}
                
                {!showCamera && !capturedImage && (
                  <button 
                    onClick={() => setShowCamera(true)}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Démarrer la vérification
                  </button>
                )}
                
                {verificationStatus === 'failed' && (
                  <button 
                    onClick={() => {
                      setCapturedImage(null);
                      setVerificationStatus(null);
                      setShowCamera(true);
                    }}
                    className="w-full mt-3 py-2 border border-amber-600 text-amber-600 font-medium rounded-lg hover:bg-amber-50 transition-all"
                  >
                    Réessayer
                  </button>
                )}
              </div>
              
              <button 
                onClick={resetState}
                className="text-sm text-amber-600 hover:text-amber-700 flex items-center"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Retour à la recherche
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 mb-4">
            <div className="flex items-center mb-2">
              <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
              <h3 className="font-bold text-lg">Accès autorisé</h3>
            </div>
            <p className="text-sm">Bienvenue, {userInfo?.prenom} {userInfo?.nom}. Vous avez maintenant accès à votre dossier.</p>
          </div>
          
          <div className="bg-white p-5 rounded-lg border border-gray-200 mb-4">
            <h3 className="font-bold text-lg text-gray-800 mb-4">Détails de votre dossier</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm text-gray-500">Informations personnelles</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                    <div className="text-gray-600">Nom complet:</div>
                    <div className="font-medium">{userInfo?.prenom} {userInfo?.nom}</div>
                    <div className="text-gray-600">Email:</div>
                    <div className="font-medium">{userInfo?.email}</div>
                    <div className="text-gray-600">Téléphone:</div>
                    <div className="font-medium">{userInfo?.telephone}</div>
                    <div className="text-gray-600">Adresse:</div>
                    <div className="font-medium">{userInfo?.adresse}</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm text-gray-500">Détails du projet</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                    <div className="text-gray-600">Projet:</div>
                    <div className="font-medium">{userInfo?.projet}</div>
                    <div className="text-gray-600">Matricule:</div>
                    <div className="font-medium">{userInfo?.matricule}</div>
                    <div className="text-gray-600">Parcelle:</div>
                    <div className="font-medium">{userInfo?.parcelle}</div>
                    <div className="text-gray-600">Localité:</div>
                    <div className="font-medium">{userInfo?.localite}</div>
                    <div className="text-gray-600">Statut:</div>
                    <div className="font-medium"><span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">{userInfo?.statut}</span></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-sm text-gray-500">Documents disponibles</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="w-5 h-5 text-amber-600 mr-3" />
                  <div>
                    <div className="font-medium">Contrat d'adhésion</div>
                    <div className="text-xs text-gray-500">PDF - 245 KB</div>
                  </div>
                </a>
                <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="w-5 h-5 text-amber-600 mr-3" />
                  <div>
                    <div className="font-medium">Plan de parcelle</div>
                    <div className="text-xs text-gray-500">PDF - 1.2 MB</div>
                  </div>
                </a>
                <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="w-5 h-5 text-amber-600 mr-3" />
                  <div>
                    <div className="font-medium">Échéancier de paiement</div>
                    <div className="text-xs text-gray-500">PDF - 156 KB</div>
                  </div>
                </a>
                <a href="#" className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <FileText className="w-5 h-5 text-amber-600 mr-3" />
                  <div>
                    <div className="font-medium">Attestation d'adhésion</div>
                    <div className="text-xs text-gray-500">PDF - 189 KB</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
          
          <button 
            onClick={resetState}
            className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default MatriculeSearch;
