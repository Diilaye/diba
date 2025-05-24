import { useState, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate, useLocation } from 'react-router-dom';
import Section from '../components/ui/Section';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [matricule, setMatricule] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState<any>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed' | null>(null);
  const [accessGranted, setAccessGranted] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Liste de matricules par défaut pour faciliter la connexion
  const defaultMatricules = [
    'AG3-125-LLY',
    'AG1002DKCAM',
    'BX7-421-KMP'
  ];

  // Fonction pour rechercher un utilisateur par matricule
  const searchUser = async () => {
    if (!matricule.trim()) {
      setError('Veuillez entrer un matricule');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Simulation d'une requête API (à remplacer par votre appel API réel)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Vérifier si le matricule correspond à un format valide
      const isValidMatricule = /^[A-Z]{2}\d{1,4}[A-Z]{2,6}$|^[A-Z]{2}\d{1}-\d{3}-[A-Z]{3}$/.test(matricule);
      
      if (isValidMatricule) {
        // Simuler des données utilisateur (à remplacer par les données réelles de l'API)
        const userData = {
          nom: 'DIOP',
          prenom: 'Mamadou',
          matricule: matricule,
          dateNaissance: '15/04/1985',
          adresse: 'Dakar, Sénégal',
          telephone: '+221 77 123 45 67',
          email: 'mamadou.diop@example.com',
          statut: 'Client',
          documents: [
            { type: 'Contrat', date: '12/03/2023', lien: '#' },
            { type: 'Reçu de paiement', date: '01/05/2023', lien: '#' },
            { type: 'Plan de la propriété', date: '15/02/2023', lien: '#' }
          ]
        };
        
        setUserInfo(userData);
      } else {
        setError('Matricule non trouvé ou format invalide');
        setUserInfo(null);
      }
    } catch (err) {
      console.error('Erreur lors de la recherche:', err);
      setError('Une erreur est survenue lors de la recherche');
    } finally {
      setIsLoading(false);
    }
  };

  // Initialiser la caméra
  const startCamera = async () => {
    setShowCamera(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Erreur d\'accès à la caméra:', err);
      setError('Impossible d\'accéder à la caméra. Veuillez vérifier les permissions.');
      setShowCamera(false);
    }
  };
  
  // Arrêter la caméra
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    setShowCamera(false);
  };
  
  // Capturer une image
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const context = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageData = canvas.toDataURL('image/png');
      setCapturedImage(imageData);
      
      // Arrêter la caméra après la capture
      stopCamera();
      
      // Lancer la vérification faciale
      verifyFacialRecognition(imageData);
    }
  };
  
  // Fonction pour vérifier la reconnaissance faciale
  const verifyFacialRecognition = async (imageData: string) => {
    setIsLoading(true);
    setVerificationStatus('pending');
    
    try {
      // Simulation d'une requête API de reconnaissance faciale
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simuler un résultat positif (à remplacer par votre logique réelle)
      const success = true; // Mettre à true pour simuler une vérification réussie
      
      if (success) {
        setVerificationStatus('success');
        setAccessGranted(true);
        
        // Stocker l'état de connexion dans le localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userMatricule', matricule);
        
        // Rediriger après un court délai
        setTimeout(() => {
          // Rediriger vers la page demandée ou vers mon-dossier par défaut
          const from = location.state?.from?.pathname || '/mon-dossier';
          navigate(from);
        }, 1500);
      } else {
        setVerificationStatus('failed');
      }
    } catch (err) {
      console.error('Erreur lors de la vérification faciale:', err);
      setVerificationStatus('failed');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Réinitialiser l'état
  const resetState = () => {
    setMatricule('');
    setUserInfo(null);
    setCapturedImage(null);
    setVerificationStatus(null);
    setAccessGranted(false);
    setError('');
  };
  
  const handleDefaultMatriculeClick = (defaultMatricule: string) => {
    setMatricule(defaultMatricule);
  };

  return (
    <>
      <Helmet>
        <title>Connexion | SCI BIBA IMMO INGENIERING</title>
        <meta name="description" content="Connectez-vous à votre espace client SCI BIBA IMMO INGENIERING." />
      </Helmet>

      <div className="pt-24">
        <Section className="py-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-primary-800 mb-6 text-center">Connexion</h1>
            <p className="text-xl text-gray-600 mb-8 text-center">
              Accédez à votre espace client
            </p>

            <div className="bg-white rounded-xl shadow-soft p-8">
              {/* Étape 1: Recherche par matricule */}
              {!userInfo && (
                <div>
                  {error && (
                    <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6">
                      {error}
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label htmlFor="matricule" className="block text-gray-700 mb-2">
                      Matricule
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="matricule"
                        value={matricule}
                        onChange={(e) => setMatricule(e.target.value)}
                        placeholder="Ex: AG3-125-LLY"
                        className="flex-1 px-4 py-3 rounded-l-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={searchUser}
                        disabled={isLoading}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-r-lg transition duration-200"
                      >
                        {isLoading ? "Recherche..." : "Rechercher"}
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <p className="text-gray-600 mb-4">Matricules de démonstration :</p>
                    <div className="space-y-2">
                      {defaultMatricules.map((defaultMatricule) => (
                        <button
                          key={defaultMatricule}
                          onClick={() => handleDefaultMatriculeClick(defaultMatricule)}
                          className="block w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                        >
                          {defaultMatricule}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Étape 2: Affichage des informations utilisateur et vérification faciale */}
              {userInfo && !accessGranted && (
                <div>
                  <button 
                    onClick={resetState}
                    className="mb-6 text-gray-600 hover:text-gray-800"
                  >
                    ← Retour
                  </button>
                  
                  <div className="bg-amber-50 p-4 rounded-lg mb-6">
                    <h3 className="text-amber-800 font-semibold mb-2">
                      Informations trouvées
                    </h3>
                    <p className="text-gray-700 mb-1"><strong>Nom:</strong> {userInfo.nom}</p>
                    <p className="text-gray-700 mb-1"><strong>Prénom:</strong> {userInfo.prenom}</p>
                    <p className="text-gray-700 mb-1"><strong>Matricule:</strong> {userInfo.matricule}</p>
                    <p className="text-gray-700"><strong>Date de naissance:</strong> {userInfo.dateNaissance}</p>
                  </div>
                  
                  {!showCamera && !capturedImage && (
                    <div className="text-center">
                      <p className="text-gray-700 mb-4">Veuillez procéder à la vérification d'identité par reconnaissance faciale</p>
                      <button
                        onClick={startCamera}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 mx-auto"
                      >
                        Activer la caméra
                      </button>
                    </div>
                  )}
                  
                  {showCamera && (
                    <div className="text-center">
                      <div className="relative mb-4 rounded-lg overflow-hidden border-2 border-amber-400">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          muted
                          className="w-full h-auto"
                        />
                        <button
                          onClick={stopCamera}
                          className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full"
                        >
                          X
                        </button>
                      </div>
                      <button
                        onClick={captureImage}
                        className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 mx-auto"
                      >
                        Capturer
                      </button>
                    </div>
                  )}
                  
                  {capturedImage && (
                    <div className="text-center">
                      <div className="mb-4 rounded-lg overflow-hidden border-2 border-amber-400">
                        <img src={capturedImage} alt="Captured" className="w-full h-auto" />
                      </div>
                      
                      {verificationStatus === 'pending' && (
                        <div className="text-center text-amber-700">
                          Vérification en cours...
                        </div>
                      )}
                      
                      {verificationStatus === 'failed' && (
                        <div>
                          <div className="text-center text-red-700 mb-4">
                            La vérification a échoué
                          </div>
                          <button
                            onClick={() => {
                              setCapturedImage(null);
                              setVerificationStatus(null);
                              startCamera();
                            }}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                          >
                            Réessayer
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              {/* Étape 3: Accès accordé */}
              {accessGranted && (
                <div className="text-center">
                  <div className="bg-green-50 p-6 rounded-lg mb-6 text-center">
                    <div className="text-green-600 text-4xl mb-4">✓</div>
                    <h3 className="text-green-800 font-semibold mb-2">Vérification réussie</h3>
                    <p className="text-gray-700 mb-4">Votre identité a été confirmée</p>
                    <p className="text-gray-700">Redirection vers votre espace personnel...</p>
                  </div>
                </div>
              )}
              
              {/* Canvas caché pour la capture d'image */}
              <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
          </div>
        </Section>
      </div>
    </>
  );
};

export default LoginPage;
