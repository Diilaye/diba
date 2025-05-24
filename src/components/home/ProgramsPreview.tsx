import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { 
  ChevronRight, 
  Map, 
  Ruler, 
  Calendar, 
  Users, 
  Star, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Section from '../ui/Section';

// Programmes enrichis avec plus de détails (normalement importés)
const enhancedPrograms = [
  {
    id: 'kolda-eco-village',
    title: 'Kolda Eco-Village',
    subtitle: 'Communauté agricole durable',
    location: 'Région de Kolda, Sénégal',
    price: 1500000,
    availability: 'Disponible maintenant',
    progress: 65, // pourcentage de réalisation
    totalArea: '250 hectares',
    plotSizes: '500 à 1000 m²',
    completionDate: 'Décembre 2025',
    totalMembers: 78,
    rating: 4.8,
    ratingCount: 32,
    highlights: [
      'Agriculture régénérative',
      'Énergie solaire autonome',
      'Accès direct à la rivière',
      'Écosystème préservé'
    ],
    shortDescription: 'Un écovillage intégré dans la nature luxuriante de Kolda, idéal pour ceux qui souhaitent développer des projets agricoles tout en vivant dans une communauté durable.',
    images: [
      'https://images.pexels.com/photos/2138922/pexels-photo-2138922.jpeg',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'
    ],
    tags: ['Agricole', 'Écovillage', 'Solaire', 'Communautaire']
  },
  {
    id: 'mbour-ocean-community',
    title: 'Mbour Ocean Community',
    subtitle: 'Vivre au rythme de l\'océan',
    location: 'Petite Côte, Mbour, Sénégal',
    price: 2200000,
    availability: 'Dernières parcelles',
    progress: 85, // pourcentage de réalisation
    totalArea: '120 hectares',
    plotSizes: '600 à 1200 m²',
    completionDate: 'Juin 2025',
    totalMembers: 120,
    rating: 4.9,
    ratingCount: 45,
    highlights: [
      'Accès à la plage privée',
      'Pêche artisanale responsable',
      'Conservation marine',
      'Énergies renouvelables'
    ],
    shortDescription: 'Une communauté balnéaire unique conçue pour allier le confort moderne au respect de l\'environnement côtier, à seulement 300m de l\'océan Atlantique.',
    images: [
      'https://images.pexels.com/photos/1705254/pexels-photo-1705254.jpeg',
      'https://images.pexels.com/photos/2290422/pexels-photo-2290422.jpeg'
    ],
    tags: ['Balnéaire', 'Premium', 'Conservation', 'Plage']
  },
  {
    id: 'thies-green-valley',
    title: 'Thiès Green Valley',
    subtitle: 'Poumon vert aux portes de la ville',
    location: 'Périphérie de Thiès, Sénégal',
    price: 1800000,
    availability: 'Ouverture des souscriptions',
    progress: 40, // pourcentage de réalisation
    totalArea: '180 hectares',
    plotSizes: '450 à 900 m²',
    completionDate: 'Mars 2026',
    totalMembers: 55,
    rating: 4.7,
    ratingCount: 18,
    highlights: [
      'Proximité urbaine',
      'Reboisement massif',
      'Agriculture périurbaine',
      'Mobilité douce'
    ],
    shortDescription: 'Un projet innovant combinant les avantages de la vie urbaine et rurale, situé à seulement 15 minutes du centre-ville de Thiès, avec une forte composante de reforestation.',
    images: [
      'https://images.pexels.com/photos/4108270/pexels-photo-4108270.jpeg',
      'https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg'
    ],
    tags: ['Périurbain', 'Reforestation', 'Abordable', 'Mobilité']
  },
  {
    id: 'casamance-river-retreat',
    title: 'Casamance River Retreat',
    subtitle: 'Sanctuaire naturel préservé',
    location: 'Bords du fleuve Casamance, Sénégal',
    price: 1950000,
    availability: 'Places limitées',
    progress: 55, // pourcentage de réalisation
    totalArea: '210 hectares',
    plotSizes: '700 à 1500 m²',
    completionDate: 'Novembre 2025',
    totalMembers: 42,
    rating: 4.9,
    ratingCount: 12,
    highlights: [
      'Biodiversité exceptionnelle',
      'Activités fluviales',
      'Écotourisme communautaire',
      'Architecture bioclimatique'
    ],
    shortDescription: 'Un havre de paix où la nature règne en maître, offrant une expérience de vie unique au cœur d\'un des écosystèmes les plus riches du Sénégal, bordant le majestueux fleuve Casamance.',
    images: [
      'https://images.pexels.com/photos/158341/water-drip-liquid-surface-158341.jpeg',
      'https://images.pexels.com/photos/3343623/pexels-photo-3343623.jpeg'
    ],
    tags: ['Fluvial', 'Nature', 'Écotourisme', 'Premium']
  }
];

const ProgramsPreview = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [featuredProgram, setFeaturedProgram] = useState(enhancedPrograms[0]);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Filtrer pour n'afficher que 3 programmes réguliers
  const regularPrograms = enhancedPrograms.filter(p => p.id !== featuredProgram.id).slice(0, 3);

  return (
    <Section className="py-24 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-yellow-50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 rotate-180 w-full h-64 bg-gradient-to-b from-yellow-50 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div ref={ref}>
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-block mb-3">
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                PROJETS INNOVANTS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-600 to-amber-700 bg-clip-text text-transparent">
              Découvrez nos programmes d'achat groupé
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
              Choisissez parmi nos différents programmes, chacun avec ses caractéristiques uniques 
              mais partageant tous la même vision écoresponsable et communautaire. 
              Des opportunités d'investissement qui ont du sens pour vous et pour la planète.
            </p>
          </motion.div>
          
          {/* Programme mis en avant */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
              <div className="grid grid-cols-1 lg:grid-cols-5">
                {/* Image du programme */}
                <div className="lg:col-span-3 relative h-80 lg:h-auto overflow-hidden">
                  <img
                    src={featuredProgram.images[0]}
                    alt={featuredProgram.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-yellow-500 text-white text-sm font-medium rounded-full">
                    Programme Phare
                  </div>
                  
                  {/* Progression du projet */}
                  <div className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm p-3 rounded-lg">
                    <div className="flex justify-between text-white text-sm mb-1">
                      <span>Avancement du projet</span>
                      <span>{featuredProgram.progress}%</span>
                    </div>
                    <div className="h-2 bg-white/30 rounded-full">
                      <div 
                        className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full"
                        style={{ width: `${featuredProgram.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                {/* Détails du programme */}
                <div className="lg:col-span-2 p-6 md:p-8 flex flex-col">
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {featuredProgram.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{featuredProgram.title}</h3>
                    <p className="text-yellow-600 mb-2">{featuredProgram.subtitle}</p>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Map className="h-4 w-4 mr-1" />
                      <span className="text-sm">{featuredProgram.location}</span>
                    </div>
                    <p className="text-gray-600 mb-4">{featuredProgram.shortDescription}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-xs text-gray-500">Surface des parcelles</p>
                      <div className="flex items-center">
                        <Ruler className="h-4 w-4 text-yellow-600 mr-1" />
                        <span className="font-medium">{featuredProgram.plotSizes}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Date d'achèvement</p>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-yellow-600 mr-1" />
                        <span className="font-medium">{featuredProgram.completionDate}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Membres actuels</p>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-yellow-600 mr-1" />
                        <span className="font-medium">{featuredProgram.totalMembers} personnes</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Satisfaction</p>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-600 mr-1" />
                        <span className="font-medium">{featuredProgram.rating}/5</span>
                        <span className="text-xs text-gray-400 ml-1">({featuredProgram.ratingCount} avis)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500">Prix par parcelle à partir de</p>
                      <p className="text-2xl font-bold text-yellow-600">
                        {featuredProgram.price.toLocaleString()} FCFA
                      </p>
                    </div>
                    <Link
                      to={`/programmes/${featuredProgram.id}`}
                      className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-medium shadow-md hover:shadow-lg transition-all hover:from-yellow-600 hover:to-amber-700 flex items-center"
                    >
                      Découvrir <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Points forts mis en avant */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {featuredProgram.highlights.map((highlight, idx) => (
              <div key={idx} className="bg-yellow-50 rounded-xl p-4 flex items-center">
                <CheckCircle className="h-5 w-5 text-yellow-600 mr-3 shrink-0" />
                <span className="text-sm font-medium text-gray-700">{highlight}</span>
              </div>
            ))}
          </motion.div>

          <h3 className="text-xl font-bold text-gray-800 mb-6">Autres programmes disponibles</h3>

          {/* Autres programmes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {regularPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group relative"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                onMouseEnter={() => setHoveredIndex(null)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img
                    src={program.images[0]}
                    alt={program.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                  
                  {/* Badge de disponibilité */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-yellow-700 text-xs font-medium rounded-full">
                    {program.availability}
                  </div>
                  
                  <div className="absolute bottom-3 left-3 right-3">
                    <div className="flex justify-between text-white text-xs">
                      <span>{program.progress}% complété</span>
                    </div>
                    <div className="h-1.5 bg-white/40 rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${program.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {program.tags.slice(0, 2).map((tag, idx) => (
                      <span key={idx} className="text-xxs px-2 py-0.5 bg-yellow-50 text-yellow-700 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{program.title}</h3>
                  <p className="text-sm text-yellow-600 mb-2">{program.subtitle}</p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <Map className="h-3.5 w-3.5 mr-1" />
                    <span>{program.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-end pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500">À partir de</p>
                      <p className="text-lg font-bold text-yellow-600">
                        {program.price.toLocaleString()} FCFA
                      </p>
                    </div>
                    <Link
                      to={`/programmes/${program.id}`}
                      className="flex items-center text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                    >
                      En savoir plus 
                      <ChevronRight className={`h-4 w-4 ml-1 transition-transform duration-300 ${hoveredIndex === index ? 'translate-x-1' : ''}`} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link 
              to="/programmes" 
              className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white font-medium shadow-lg hover:shadow-xl transition-all hover:from-yellow-600 hover:to-amber-700"
            >
              Voir tous nos programmes
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
            <p className="text-gray-500 mt-4">
              Déjà plus de 300 familles ont rejoint nos communautés durables
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default ProgramsPreview;