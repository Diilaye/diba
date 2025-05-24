import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  Calendar, 
  Filter, 
  Search,
  ArrowRight, 
  ChevronDown, 
  X, 
  Star, 
  Check,
  Leaf,
  Sun,
  Droplets,
  Wifi,
  Users,
  Home,
  Map,
  School,
  HeartPulse,
  Store
} from 'lucide-react';

// Données des programmes BIBA IMMO INGENIERING
const programsData = [
  {
    id: '3',
    link: '/programmes/3',
    title: 'Sama Achat Groupé 3 - Louly Sindiane',
    subtitle: 'Communauté durable et innovante',
    location: {
      city: 'Louly Sindiane, Mbour',
      region: 'Thiès',
      country: 'Sénégal',
      coordinates: '14.4167° N, 16.9667° W',
      distanceFromCity: 'Sortie péage Mbour, à 200m de la route'
    },
    price: {
      base: 17992968,
      monthly: 327979,
      initialDeposit: 2250000,
      financing: true,
      pricePer: 'parcelle de 200m²'
    },
    availability: {
      status: 'Phase 1 Active',
      totalPlots: 253,
      remainingPlots: 224,
      percentSold: 11
    },
    timing: {
      launchDate: 'Janvier 2024',
      currentPhase: 'Phase 1 sur 2',
      completionDate: 'Juin 2026',
      nextMilestone: 'Installation énergie solaire: Août 2025'
    },
    community: {
      currentMembers: 29,
      targetMembers: 253,
      membersSatisfaction: 4.8,
      reviewCount: 32,
      demographics: 'Diaspora (45%), Familles (35%), Investisseurs (20%)'
    },
    specifications: {
      totalArea: '50,6 hectares',
      plotSizes: ['200m²'],
      commonAreas: '15 hectares (30% de la superficie totale)',
      terrainType: 'Terrain plat, bien viabilisé, proche des commodités'
    },
    features: [
      { name: 'École préscolaire/élémentaire', icon: <School />, available: true },
      { name: 'Énergie solaire autonome', icon: <Sun />, available: true },
      { name: 'Supermarché + boulangerie', icon: <Store />, available: true },
      { name: 'Forage autonome', icon: <Droplets />, available: true }
    ],
    shortDescription: "Programme d'économie sociale-solidaire destiné aux diasporas et compatriotes à faible revenu. Lutte contre la spéculation foncière avec des prix défiant toute concurrence.",
    coverImage: 'https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg',
    images: [
      'https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    tags: ['Achat Groupé', 'Diaspora', 'Abordable', 'Social-Solidaire'],
    highlighted: true
  },
  {
    id: 'sama-achat-groupe-1-rufisque',
    link: '',
    title: 'Sama Achat Groupé 1 - Rufisque',
    subtitle: 'Premier programme pilote - COMPLET',
    location: {
      city: 'Rufisque Banlieue',
      region: 'Dakar',
      country: 'Sénégal',
      coordinates: '14.7167° N, 17.2667° W',
      distanceFromCity: '25 km de Dakar centre'
    },
    price: {
      base: 15500000,
      monthly: 280000,
      initialDeposit: 1950000,
      financing: true,
      pricePer: 'parcelle de 180m²'
    },
    availability: {
      status: 'Complet - Soldé',
      totalPlots: 180,
      remainingPlots: 0,
      percentSold: 100
    },
    timing: {
      launchDate: 'Mars 2023',
      currentPhase: 'Phase 2 sur 2 - Finalisée',
      completionDate: 'Juin 2025',
      nextMilestone: 'Livraison premières constructions: En cours'
    },
    community: {
      currentMembers: 180,
      targetMembers: 180,
      membersSatisfaction: 4.9,
      reviewCount: 89,
      demographics: 'Jeunes actifs (55%), Familles (30%), Diaspora (15%)'
    },
    specifications: {
      totalArea: '32,4 hectares',
      plotSizes: ['180m²'],
      commonAreas: '8 hectares (25% de la superficie totale)',
      terrainType: 'Terrain légèrement vallonné, bien drainé'
    },
    features: [
      { name: 'Centre de santé', icon: <HeartPulse />, available: true },
      { name: 'Mosquée communautaire', icon: <Home />, available: true },
      { name: 'Aire de jeux enfants', icon: <Users />, available: true },
      { name: 'Transport organisé', icon: <Map />, available: true }
    ],
    shortDescription: "Premier programme BIBA IMMO avec 100% de réussite ! Modèle éprouvé d'inclusion sociale et d'économie solidaire en proche banlieue de Dakar. Programme COMPLET.",
    coverImage: 'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg',
    images: [
      'https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg',
      'https://images.pexels.com/photos/2290422/pexels-photo-2290422.jpeg'
    ],
    tags: ['Achat Groupé', 'Pilote', 'COMPLET', 'Éprouvé'],
    highlighted: false
  },
  {
    id: 'sama-achat-groupe-2-thies-nord',
    link: '',
    title: 'Sama Achat Groupé 2 - Thiès Nord',
    subtitle: 'Expansion vers l\'intérieur - COMPLET',
    location: {
      city: 'Thiès Nord, Route de Saint-Louis',
      region: 'Thiès',
      country: 'Sénégal',
      coordinates: '14.8000° N, 16.9200° W',
      distanceFromCity: '10 km du centre de Thiès'
    },
    price: {
      base: 16800000,
      monthly: 305000,
      initialDeposit: 2100000,
      financing: true,
      pricePer: 'parcelle de 220m²'
    },
    availability: {
      status: 'Complet - Soldé',
      totalPlots: 195,
      remainingPlots: 0,
      percentSold: 100
    },
    timing: {
      launchDate: 'Septembre 2023',
      currentPhase: 'Phase 1 sur 2 - Finalisée',
      completionDate: 'Mars 2026',
      nextMilestone: 'Viabilisation en cours'
    },
    community: {
      currentMembers: 195,
      targetMembers: 195,
      membersSatisfaction: 4.7,
      reviewCount: 28,
      demographics: 'Fonctionnaires (40%), Diaspora (35%), Commerçants (25%)'
    },
    specifications: {
      totalArea: '42,9 hectares',
      plotSizes: ['220m²'],
      commonAreas: '12 hectares (28% de la superficie totale)',
      terrainType: 'Terrain plat, sol argileux, bonne exposition'
    },
    features: [
      { name: 'Coopérative agricole', icon: <Leaf />, available: true },
      { name: 'Atelier formation', icon: <School />, available: true },
      { name: 'Pharmacie de garde', icon: <HeartPulse />, available: true },
      { name: 'Énergie mixte', icon: <Sun />, available: true }
    ],
    shortDescription: "Deuxième programme centré sur la formation professionnelle et l'agriculture urbaine. Programme COMPLET avec 100% de souscription réussie.",
    coverImage: 'https://images.pexels.com/photos/4108270/pexels-photo-4108270.jpeg',
    images: [
      'https://images.pexels.com/photos/4108270/pexels-photo-4108270.jpeg',
      'https://images.pexels.com/photos/462331/pexels-photo-462331.jpeg'
    ],
    tags: ['Achat Groupé', 'Formation', 'COMPLET', 'Collectif'],
    highlighted: false
  },
 
];

// Options de filtrage BIBA IMMO INGENIERING
const filterOptions = {
  regions: ['Toutes', 'Dakar', 'Thiès', 'Casamance', 'Kaolack', 'Saint-Louis'],
  priceRanges: [
    { label: 'Tous les prix', min: 0, max: Infinity },
    { label: 'Moins de 15M FCFA', min: 0, max: 15000000 },
    { label: '15M - 17M FCFA', min: 15000000, max: 17000000 },
    { label: '17M - 20M FCFA', min: 17000000, max: 20000000 },
    { label: 'Plus de 20M FCFA', min: 20000000, max: Infinity }
  ],
  tags: ['Achat Groupé', 'Diaspora', 'Social-Solidaire', 'Abordable', 'Pilote', 'Formation', 'Agriculture', 'Collectif', 'Commercial', 'Artisanat', 'À venir', 'Tradition', 'Bio', 'Authentique', 'Patrimoine', 'Fleuve', 'Culturel', 'COMPLET'],
  availability: ['Toutes', 'Phase 1 Active', 'Disponible', 'Dernières parcelles', 'Places limitées', 'Liste d\'attente', 'Bientôt disponible', 'Complet - Soldé']
};

// Composant de carte pour un programme
const ProgramCard = ({ program, variant = 'default' }) => {
  const isHighlighted = variant === 'highlighted';
  
  return (
    <div
      className={`block group transition-all duration-300 cursor-pointer ${
        isHighlighted 
          ? 'bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transform hover:-translate-y-1'
          : 'bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg'
      }`}
    >
      <div className="relative">
        <div className={`aspect-w-16 aspect-h-9 overflow-hidden ${isHighlighted ? 'aspect-h-8' : ''}`}>
          <img 
            src={program.coverImage} 
            alt={program.title} 
            className="w-full h-48 object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Étiquette de disponibilité */}
        <div className="absolute top-3 right-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
            program.availability.status === 'Complet - Soldé'
              ? 'bg-gray-500 text-white'
              : program.availability.remainingPlots < 20 
                ? 'bg-red-500 text-white' 
                : program.availability.status === 'Bientôt disponible'
                  ? 'bg-blue-500 text-white'
                  : 'bg-green-500 text-white'
          }`}>
            {program.availability.status}
          </span>
        </div>
        
        {/* Progression */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <div className="flex justify-between text-white text-xs">
            <span>{program.availability.percentSold}% souscrit</span>
          </div>
          <div className="h-1.5 bg-white/30 rounded-full mt-1">
            <div 
              className="h-full bg-yellow-500 rounded-full"
              style={{ width: `${program.availability.percentSold}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className={`p-4 ${isHighlighted ? 'p-6' : ''}`}>
        <div className="flex flex-wrap gap-1 mb-2">
          {program.tags.slice(0, isHighlighted ? 4 : 2).map((tag, idx) => (
            <span key={idx} className="text-xs px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className={`font-bold text-gray-900 mb-1 ${isHighlighted ? 'text-xl' : 'text-lg'}`}>
          {program.title}
        </h3>
        <p className="text-sm text-yellow-600 mb-2">{program.subtitle}</p>
        
        <div className="flex items-center text-gray-500 text-sm mb-3">
          <MapPin className="h-3.5 w-3.5 mr-1" />
          <span>{program.location.city}, {program.location.country}</span>
        </div>
        
        {isHighlighted && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {program.shortDescription}
          </p>
        )}
        
        <div className={`grid grid-cols-2 gap-2 mb-4 ${isHighlighted ? 'grid-cols-4' : ''}`}>
          {program.features.slice(0, 4).map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center mb-1">
                {React.cloneElement(feature.icon, { className: 'h-4 w-4 text-yellow-600' })}
              </div>
              <span className="text-xs text-center text-gray-600 line-clamp-1">{feature.name}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-end border-t border-gray-100 pt-4">
          <div>
            <p className="text-xs text-gray-500">À partir de</p>
            <p className={`font-bold text-yellow-600 ${isHighlighted ? 'text-xl' : 'text-lg'}`}>
              {(program.price.base / 1000000).toFixed(1)}M FCFA
            </p>
          </div>
         <a href={`/programme/${program.id}`}>
          <div className="flex items-center text-yellow-600 font-medium">
            <span className="mr-1">Détails</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
          </a>
        </div>
      </div>
    </div>
  );
};

// Composant de carte pour programme en vedette
const FeaturedProgram = ({ program }) => {
  return (
    <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl mb-12">
      <img 
        src={program.coverImage} 
        alt={program.title} 
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
      
      <div className="relative h-full flex flex-col justify-end p-8 z-10 text-white">
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {program.tags.map((tag, idx) => (
              <span key={idx} className="text-xs px-3 py-1 bg-yellow-500/90 text-white rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <h2 className="text-4xl font-bold mb-2">{program.title}</h2>
          <p className="text-xl text-yellow-300 mb-4">{program.subtitle}</p>
          
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 mr-2 text-yellow-300" />
            <span>{program.location.city}, {program.location.country}</span>
          </div>
          
          <p className="text-gray-200 max-w-2xl mb-6">
            {program.shortDescription}
          </p>
          
          <div className="flex flex-wrap gap-6 mb-8">
            <div>
              <p className="text-yellow-300 text-sm">Prix à partir de</p>
              <p className="text-3xl font-bold">{(program.price.base / 1000000).toFixed(1)}M FCFA</p>
            </div>
            <div>
              <p className="text-yellow-300 text-sm">Disponibilité</p>
              <p className="text-xl font-medium">
                {program.availability.remainingPlots === 0 
                  ? 'Programme complet' 
                  : `${program.availability.remainingPlots} parcelles restantes`}
              </p>
            </div>
            <div>
              <p className="text-yellow-300 text-sm">Complétion</p>
              <p className="text-xl font-medium">{program.timing.completionDate}</p>
            </div>
          </div>
        </div>
        <a href={`/programmes/${program.id}`}>
        <button className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-medium rounded-full hover:from-yellow-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-xl">
          Découvrir ce programme
        </button>
        </a>
      </div>
    </div>
  );
};

// Composant de filtres
const ProgramFilters = ({ filters, setFilters, isFilterOpen, setIsFilterOpen }) => {
  const handleToggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      region: 'Toutes',
      price: filterOptions.priceRanges[0],
      tags: [],
      availability: 'Toutes',
      search: ''
    });
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <button 
          onClick={handleToggleFilter}
          className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
        >
          <Filter className="h-5 w-5 mr-2 text-gray-700" />
          <span className="font-medium text-gray-700">Filtres</span>
          <ChevronDown className={`h-5 w-5 ml-2 text-gray-700 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
        </button>
        
        <div className="relative mt-2 sm:mt-0">
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Rechercher par nom ou lieu"
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </div>
      </div>
      
      {/* Filtres visibles lors de l'expansion */}
      <div className={`transition-all duration-300 overflow-hidden ${
        isFilterOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Filtre par région */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Région</label>
              <select 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={filters.region}
                onChange={(e) => handleFilterChange('region', e.target.value)}
              >
                {filterOptions.regions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
            
            {/* Filtre par prix */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <select 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={filters.price.label}
                onChange={(e) => {
                  const selectedPrice = filterOptions.priceRanges.find(p => p.label === e.target.value);
                  handleFilterChange('price', selectedPrice);
                }}
              >
                {filterOptions.priceRanges.map(price => (
                  <option key={price.label} value={price.label}>{price.label}</option>
                ))}
              </select>
            </div>
            
            {/* Filtre par disponibilité */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Disponibilité</label>
              <select 
                className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                value={filters.availability}
                onChange={(e) => handleFilterChange('availability', e.target.value)}
              >
                {filterOptions.availability.map(availability => (
                  <option key={availability} value={availability}>{availability}</option>
                ))}
              </select>
            </div>
            
            {/* Filtre par tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Caractéristiques</label>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto p-1">
                {filterOptions.tags.slice(0, 8).map(tag => (
                  <button
                    key={tag}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      filters.tags.includes(tag)
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => {
                      if (filters.tags.includes(tag)) {
                        handleFilterChange('tags', filters.tags.filter(t => t !== tag));
                      } else {
                        handleFilterChange('tags', [...filters.tags, tag]);
                      }
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6">
            <button 
              onClick={handleResetFilters}
              className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Effacer les filtres
            </button>
          </div>
        </div>
      </div>
      
      {/* Affichage des filtres actifs */}
      {(filters.region !== 'Toutes' || 
        filters.price.label !== 'Tous les prix' || 
        filters.availability !== 'Toutes' || 
        filters.tags.length > 0 ||
        filters.search) && (
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <span className="text-sm text-gray-600">Filtres actifs:</span>
          
          {filters.region !== 'Toutes' && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
              Région: {filters.region}
              <button 
                onClick={() => handleFilterChange('region', 'Toutes')}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.price.label !== 'Tous les prix' && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
              Prix: {filters.price.label}
              <button 
                onClick={() => handleFilterChange('price', filterOptions.priceRanges[0])}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.availability !== 'Toutes' && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
              Disponibilité: {filters.availability}
              <button 
                onClick={() => handleFilterChange('availability', 'Toutes')}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          
          {filters.tags.map(tag => (
            <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
              {tag}
              <button 
                onClick={() => handleFilterChange('tags', filters.tags.filter(t => t !== tag))}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
          
          {filters.search && (
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm flex items-center">
              Recherche: {filters.search}
              <button 
                onClick={() => handleFilterChange('search', '')}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

// Composant principal pour la page de listage des programmes
const ProgramsListing = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    region: 'Toutes',
    price: filterOptions.priceRanges[0],
    tags: [],
    availability: 'Toutes',
    search: ''
  });
  const [sortOption, setSortOption] = useState('popular');
  const [programs, setPrograms] = useState(programsData);
  const [filteredPrograms, setFilteredPrograms] = useState(programsData);
  const [featuredProgram, setFeaturedProgram] = useState(programsData[0]);
  
  const scrollRef = useRef(null);
  
  // Appliquer les filtres
  useEffect(() => {
    let result = [...programs];
    
    // Filtre par région
    if (filters.region !== 'Toutes') {
      result = result.filter(program => program.location.region === filters.region);
    }
    
    // Filtre par prix
    result = result.filter(program => 
      program.price.base >= filters.price.min && program.price.base <= filters.price.max
    );
    
    // Filtre par disponibilité
    if (filters.availability !== 'Toutes') {
      result = result.filter(program => program.availability.status === filters.availability);
    }
    
    // Filtre par tags
    if (filters.tags.length > 0) {
      result = result.filter(program => 
        filters.tags.some(tag => program.tags.includes(tag))
      );
    }
    
    // Filtre par recherche
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(program => 
        program.title.toLowerCase().includes(searchLower) || 
        program.location.city.toLowerCase().includes(searchLower) ||
        program.subtitle.toLowerCase().includes(searchLower)
      );
    }
    
    // Tri
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price.base - b.price.base);
    } else if (sortOption === 'price-desc') {
      result.sort((a, b) => b.price.base - a.price.base);
    } else if (sortOption === 'availability') {
      result.sort((a, b) => b.availability.remainingPlots - a.availability.remainingPlots);
    } else if (sortOption === 'popular') {
      result.sort((a, b) => b.community.membersSatisfaction - a.community.membersSatisfaction);
    }
    
    setFilteredPrograms(result);
    
    // Si au moins un filtre est actif, scroll jusqu'aux résultats
    const hasActiveFilters = filters.region !== 'Toutes' || 
                            filters.price.label !== 'Tous les prix' || 
                            filters.availability !== 'Toutes' || 
                            filters.tags.length > 0 ||
                            filters.search;
                              
    if (hasActiveFilters && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [filters, sortOption, programs]);
  
  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="container mx-auto px-4">
        {/* En-tête */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Programmes BIBA IMMO INGENIERING</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos programmes d'achat groupé "Sama Achat Groupé" à travers le Sénégal. 
            Une approche d'économie sociale-solidaire qui a déjà fait ses preuves avec 2 programmes COMPLETS !
          </p>
          <div className="mt-4 flex justify-center items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-gray-600">Programmes complets</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">Disponibles</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">À venir</span>
            </div>
          </div>
        </div>
        
        {/* Programme mis en avant */}
        <FeaturedProgram program={featuredProgram} />
        
        {/* Filtres */}
        <ProgramFilters 
          filters={filters} 
          setFilters={setFilters} 
          isFilterOpen={isFilterOpen} 
          setIsFilterOpen={setIsFilterOpen} 
        />
        
        {/* Options de tri et compteur de résultats */}
        {/* <div ref={scrollRef} className="flex flex-wrap justify-between items-center mb-6">
          <p className="text-gray-600">
            {filteredPrograms.length} programme{filteredPrograms.length > 1 ? 's' : ''} trouvé{filteredPrograms.length > 1 ? 's' : ''}
          </p>
          
          <div className="flex items-center">
            <span className="text-gray-700 mr-2">Trier par:</span>
            <select 
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="popular">Satisfaction membres</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
              <option value="availability">Disponibilité</option>
            </select>
          </div>
        </div> */}
        
        {/* Liste des programmes */}
        {filteredPrograms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <ProgramCard program={program} variant={program.highlighted ? 'highlighted' : 'default'} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="inline-block p-6 bg-yellow-50 rounded-full mb-6">
              <Search className="h-12 w-12 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun programme ne correspond à vos critères</h3>
            <p className="text-gray-600 mb-6">Essayez de modifier vos filtres pour trouver le programme qui vous convient.</p>
            <button 
              onClick={() => setFilters({
                region: 'Toutes',
                price: filterOptions.priceRanges[0],
                tags: [],
                availability: 'Toutes',
                search: ''
              })}
              className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors"
            >
              <X className="h-4 w-4 mr-2" />
              Réinitialiser les filtres
            </button>
          </div>
        )}
        
        {/* Appel à l'action */}
        <div className="bg-gradient-to-r from-yellow-500 to-amber-600 rounded-2xl p-8 mt-16 text-white text-center shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Vous ne trouvez pas le programme qui vous convient ?</h2>
          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Contactez-nous pour discuter de vos besoins spécifiques ou pour être informé des nouveaux programmes "Sama Achat Groupé" à venir.
          </p>
          <button className="inline-block px-8 py-4 bg-white text-yellow-600 font-bold rounded-full shadow-lg hover:shadow-xl transition-all">
            Nous contacter
          </button>
        </div>
        
        {/* Section FAQ */}
        <div className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Questions fréquentes sur Sama Achat Groupé</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                <Check className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                Qu'est-ce que le modèle "Sama Achat Groupé" ?
              </h3>
              <p className="text-gray-700">
                C'est un modèle économique d'achat groupé de terrains qui s'inscrit dans la prévention des litiges juridiques 
                et la lutte contre la spéculation foncière, basé sur l'économie sociale-solidaire.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                <Check className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                Qui peut adhérer aux programmes ?
              </h3>
              <p className="text-gray-700">
                Le programme s'adresse à tout public, mais surtout aux actifs du secteur informel exclus des circuits bancaires 
                et à la diaspora. Il vise l'inclusion via le logement et la mixité sociale.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                <Check className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                Combien de parcelles puis-je acheter ?
              </h3>
              <p className="text-gray-700">
                Selon le règlement, chaque membre ne peut acheter plus de 2 parcelles dans un programme pour favoriser 
                l'accès au plus grand nombre et lutter contre l'accaparement.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-start">
                <Check className="h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-1" />
                Comment fonctionne le financement ?
              </h3>
              <p className="text-gray-700">
                Nous proposons des plans de paiement flexibles avec un apport initial puis des échéances mensuelles sur 48 à 120 mois. 
                Le financement se fait hors circuit bancaire traditionnel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsListing;