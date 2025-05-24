import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Twitter, 
  ChevronRight, 
  Send, 
  Clock,
  ExternalLink
} from 'lucide-react';

// Composant Logo SVG
const BibaImmoLogo = ({ className, color = "#D4AF37" }) => (
  <svg 
    className={className} 
    viewBox="0 0 300 85" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Silhouette de maison */}
    <path d="M35 45L100 15L165 45L165 20L145 20L145 35L100 5L35 45Z" fill={color}/>
    
    {/* Fenêtres */}
    <rect x="85" y="30" width="10" height="10" fill={color}/>
    <rect x="105" y="30" width="10" height="10" fill={color}/>
    <rect x="85" y="45" width="10" height="10" fill={color}/>
    <rect x="105" y="45" width="10" height="10" fill={color}/>
    
    {/* Texte */}
    <text x="35" y="70" fontFamily="Arial" fontSize="24" fontWeight="bold" fill={color}>BIBA IMMO</text>
    <text x="126" y="70" fontFamily="Arial" fontSize="8" fill={color}>INGENIERING</text>
    <text x="55" y="83" fontFamily="Arial" fontSize="12" fontWeight="bold" fill={color}>TABAKH SA REEW</text>
  </svg>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e) => {
    e.preventDefault();
    // Logique d'inscription à la newsletter
    alert(`Inscription à la newsletter avec l'email: ${email}`);
    setEmail('');
  };
  
  const currentYear = new Date().getFullYear();
  
  // Programmes actuels (normalement viendraient d'une API ou du contexte)
  const programmes = [
    { id: '3', name: 'Sama Achat Groupé 3 - Loulu Sindiane' , link: '/programmes/3' },
    { id: '1', name: 'Sama Achat Groupé 1 - Rufisque' , link: '' },
    { id: '2', name: 'Sama Achat Groupé 2 - Rufisque' , link: '' },
    { id: '4', name: 'Sama Achat Groupé 4 - Kaolack' , link: '' },
  ];
  
  return (
    <footer className="relative overflow-hidden">
      {/* Élément de design en arrière-plan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1800px] h-full">
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl"></div>
      </div>
      
      {/* Bannière newsletter */}
      {/* <div className="relative bg-gradient-to-r from-yellow-700 to-amber-800 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Restez informé</h3>
              <p className="text-yellow-100">
                Recevez en avant-première nos actualités, offres spéciales et nouveaux programmes immobiliers.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input 
                  type="email" 
                  placeholder="Votre adresse email" 
                  className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button 
                type="submit"
                className="px-6 py-3 bg-white text-yellow-700 font-medium rounded-lg hover:bg-yellow-50 transition-colors shadow-md"
              >
                S'abonner
              </button>
            </form>
          </div>
        </div>
      </div> */}
      
      {/* Contenu principal du footer */}
      <div className="relative bg-gray-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            {/* Logo et informations de l'entreprise */}
            <div className="lg:col-span-4">
              <Link to="/" className="inline-block mb-6">
                <BibaImmoLogo className="h-16 w-auto" color="#D4AF37" />
              </Link>
              <p className="text-gray-400 mb-6">
                Spécialiste de l'achat groupé de terrains, nous créons des communautés harmonieuses 
                et écologiques pour un avenir durable et solidaire.
              </p>
              <div className="flex space-x-1">
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-yellow-600 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-yellow-600 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-yellow-600 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-yellow-600 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
              </div>
            </div>
            
            {/* Liens rapides */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-lg mb-4 text-white flex items-center">
                <span className="w-8 h-0.5 bg-yellow-500 mr-3"></span>
                Navigation
              </h4>
              <nav className="flex flex-col space-y-3">
                {[
                  { name: 'Accueil', path: '/' },
                  { name: 'Nos Programmes', path: '/programmes' },
                  { name: 'Comment Adhérer', path: '/adherer' },
                  { name: 'Comment Souscrire', path: '/souscrire' },
                  { name: 'Vision Future', path: '/vision-future' },
                  { name: 'Mon Dossier', path: '/mon-dossier' }
                ].map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Programmes */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-lg mb-4 text-white flex items-center">
                <span className="w-8 h-0.5 bg-yellow-500 mr-3"></span>
                Programmes
              </h4>
              <nav className="flex flex-col space-y-3">
                {programmes.map((program) => (
                  <Link 
                    key={program.id} 
                    to={program.link} 
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{program.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Informations légales */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-lg mb-4 text-white flex items-center">
                <span className="w-8 h-0.5 bg-yellow-500 mr-3"></span>
                Informations
              </h4>
              <nav className="flex flex-col space-y-3">
                {[
                  { name: 'À propos de nous', path: '/a-propos' },
                  { name: 'Conditions d\'utilisation', path: '/conditions-dutilisation' },
                  { name: 'Politique de confidentialité', path: '/politique-de-confidentialite' },
                  { name: 'FAQ', path: '/faq' },
                  { name: 'Blog', path: '/blog' }
                ].map((link) => (
                  <Link 
                    key={link.path} 
                    to={link.path} 
                    className="text-gray-400 hover:text-yellow-400 transition-colors flex items-center group"
                  >
                    <ChevronRight className="h-4 w-4 mr-2 text-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Contact */}
            <div className="lg:col-span-2">
              <h4 className="font-bold text-lg mb-4 text-white flex items-center">
                <span className="w-8 h-0.5 bg-yellow-500 mr-3"></span>
                Contact
              </h4>
              <div className="space-y-4">
                <div className="flex items-start group">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-yellow-500 mt-0.5 mr-3 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-300 block">Adresse</span>
                    <span className="text-gray-400">
                       Dakar, Sénégal
                    </span>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-yellow-500 mt-0.5 mr-3 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-300 block">Téléphone</span>
                    <a href="tel:+221771234567" className="text-gray-400 hover:text-yellow-400 transition-colors">
                      +221 77 123 45 67
                    </a>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-yellow-500 mt-0.5 mr-3 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-300 block">Email</span>
                    <a href="mailto:contact@bibaimmo.com" className="text-gray-400 hover:text-yellow-400 transition-colors">
                      contact@bi.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start group">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-yellow-500 mt-0.5 mr-3 group-hover:bg-yellow-600 group-hover:text-white transition-colors">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-gray-300 block">Horaires</span>
                    <span className="text-gray-400">
                      5/7 jours, 9h - 18h
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Séparateur */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-12"></div>
          
          {/* Pied de page avec copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm">
              © {currentYear} BIBA IMMO INGENIERING. Tous droits réservés.
            </p>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;