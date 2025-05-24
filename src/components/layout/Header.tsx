import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, MapPin, Mail } from 'lucide-react';

// Logo SVG component
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
    {/* <text x="126" y="70" fontFamily="Arial" fontSize="8" fill={color}>INGENIERING</text> */}
    <text x="55" y="83" fontFamily="Arial" fontSize="12" fontWeight="bold" fill={color}>TABAKH SA REEW</text>
  </svg>
);

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Programmes', path: '/programmes' },
    { name: 'Adhérer concept achat groupé', path: '/adherer' },
    // { name: 'Souscrire sama achat groupe', path: '/souscrire' },
    { name: 'Vision Future', path: '/vision-future' },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className={`w-full transition-all duration-300 py-2 z-50 ${
        scrolled ? 'hidden' : 'block bg-black/80 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-xs text-white/90">
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center">
                <Phone className="h-3 w-3 mr-1 text-yellow-400" />
                <span>33 6 77 123 45 67</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-3 w-3 mr-1 text-yellow-400" />
                <span>contact@bibaimmo.com</span>
              </div>
            </div>
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1 text-yellow-400" />
              <span>Dakar, Sénégal</span>
            </div>
          </div>
        </div>
      </div>
    
      {/* Main Header */}
      <header 
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white shadow-lg py-2' 
            : 'bg-black/30 backdrop-blur-sm py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center" aria-label="BIBA IMMO">
              <BibaImmoLogo 
                className="h-12 w-auto"
                color={scrolled ? "#D4AF37" : "#FFFFFF"} 
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center">
              <div className="flex mr-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) => `
                      relative px-4 py-2 mx-1 font-medium text-sm tracking-wide transition-all overflow-hidden
                      ${scrolled 
                        ? isActive
                          ? 'text-yellow-600 font-semibold'
                          : 'text-gray-700 hover:text-yellow-600'
                        : isActive
                          ? 'text-yellow-400 font-semibold'
                          : 'text-white hover:text-yellow-400'
                      }
                      ${isActive ? 'after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-yellow-400' : ''}
                    `}
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>
              <NavLink
                to="/mon-dossier"
                className={`
                  px-6 py-2 rounded-full font-medium text-sm transition-all
                  ${scrolled 
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white shadow-md hover:shadow-lg hover:from-yellow-600 hover:to-amber-700'
                    : 'bg-white/10 backdrop-blur-sm text-white border border-white/30 hover:bg-white/20'
                  }
                `}
              >
                Mon Dossier
              </NavLink>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md focus:outline-none"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className={`h-6 w-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              ) : (
                <Menu className={`h-6 w-6 ${scrolled ? 'text-gray-900' : 'text-white'}`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden ${isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 pointer-events-none'} 
          absolute top-full left-0 w-full bg-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="px-4 py-5 space-y-0">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `
                  block px-4 py-3 border-b border-gray-100 font-medium text-sm
                  ${isActive 
                    ? 'text-yellow-600 bg-yellow-50' 
                    : 'text-gray-700 hover:text-yellow-600'
                  }
                `}
                onClick={closeMenu}
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 pb-2 px-4">
              <NavLink
                to="/mon-dossier"
                className="block w-full py-3 text-center font-medium text-sm text-white bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full shadow-md hover:shadow-lg hover:from-yellow-600 hover:to-amber-700"
                onClick={closeMenu}
              >
                Mon Dossier
              </NavLink>
            </div>
            
            {/* Mobile Contact Info */}
            <div className="mt-4 px-4 py-3 bg-gray-50 rounded-lg space-y-2">
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-yellow-600" />
                <span>+221 77 123 45 67</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-yellow-600" />
                <span>contact@bibaimmo.com</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-yellow-600" />
                <span>Dakar, Sénégal</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;