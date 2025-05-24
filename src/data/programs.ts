export interface Program {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  location: string;
  price: number;
  currency: string;
  area: string;
  features: string[];
  images: string[];
  status: 'available' | 'limited' | 'sold_out';
  availableLots: number;
  totalLots: number;
}

export const programs: Program[] = [
  {
    id: 1,
    title: "Programme Harmonie",
    description: "Le programme Harmonie est situé dans une zone verdoyante à proximité d'Abidjan. Ce projet flagship combine l'accessibilité à la capitale économique avec un cadre naturel préservé. Les parcelles sont disposées autour d'un espace central communautaire comprenant une école, une serre, une épicerie sociale et une mosquée. Chaque terrain bénéficie d'un accès facile aux voies de circulation et aux espaces verts. Le programme intègre des principes de développement durable avec des infrastructures pour la collecte des eaux pluviales et l'utilisation d'énergies renouvelables.",
    shortDescription: "Un équilibre parfait entre proximité urbaine et environnement naturel préservé.",
    location: "Bingerville, à 15km d'Abidjan",
    price: 12500000,
    currency: "FCFA",
    area: "500 m²",
    features: [
      "Proximité avec la capitale économique",
      "Écosystème complet avec école, serre, épicerie et mosquée",
      "Infrastructures écologiques",
      "Titre foncier sécurisé",
      "Plan d'urbanisme moderne"
    ],
    images: [
      "https://images.pexels.com/photos/8078513/pexels-photo-8078513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7031595/pexels-photo-7031595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7031406/pexels-photo-7031406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7599735/pexels-photo-7599735.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    status: "available",
    availableLots: 65,
    totalLots: 120
  },
  {
    id: 2,
    title: "Programme Oasis",
    description: "Le programme Oasis offre une opportunité unique d'acquisition foncière dans un cadre idyllique en bordure d'un plan d'eau. Ce projet met l'accent sur la préservation de l'environnement avec une importante superficie dédiée aux espaces verts et à l'agriculture communautaire. Les parcelles sont organisées de manière à favoriser l'interaction sociale tout en préservant l'intimité de chaque propriétaire. Le programme intègre des solutions innovantes pour la gestion de l'eau et de l'énergie, faisant de ce lieu un modèle d'éco-habitat.",
    shortDescription: "Un havre de paix au bord de l'eau pour vivre en symbiose avec la nature.",
    location: "Jacqueville, région côtière",
    price: 15750000,
    currency: "FCFA",
    area: "600 m²",
    features: [
      "Vue imprenable sur plan d'eau",
      "Espaces communautaires généreux",
      "Agriculture biologique intégrée",
      "Infrastructures de loisirs nautiques",
      "Architecture bioclimatique recommandée"
    ],
    images: [
      "https://images.pexels.com/photos/7031407/pexels-photo-7031407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7534160/pexels-photo-7534160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7031588/pexels-photo-7031588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7242744/pexels-photo-7242744.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    status: "limited",
    availableLots: 23,
    totalLots: 85
  },
  {
    id: 3,
    title: "Programme Horizon",
    description: "Le programme Horizon est situé sur les hauteurs, offrant une vue panoramique exceptionnelle. Ce projet s'adresse à ceux qui recherchent un cadre de vie exclusif tout en restant fidèles aux valeurs communautaires. Les parcelles, plus spacieuses que dans nos autres programmes, sont disposées pour maximiser les vues et l'ensoleillement. Le programme met l'accent sur l'intégration harmonieuse au paysage, avec des recommandations architecturales spécifiques pour préserver l'esthétique naturelle du site tout en offrant le confort moderne.",
    shortDescription: "Une vue imprenable depuis les hauteurs pour un cadre de vie prestigieux et serein.",
    location: "Région d'Assinie",
    price: 19500000,
    currency: "FCFA",
    area: "750 m²",
    features: [
      "Parcelles plus grandes",
      "Vue panoramique",
      "Microclimat agréable",
      "Sécurité renforcée",
      "Proximité avec zones touristiques"
    ],
    images: [
      "https://images.pexels.com/photos/7031611/pexels-photo-7031611.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7031622/pexels-photo-7031622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7031608/pexels-photo-7031608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    status: "limited",
    availableLots: 18,
    totalLots: 60
  },
  {
    id: 4,
    title: "Programme Équilibre",
    description: "Le programme Équilibre propose une approche innovante de l'habitat communautaire. Situé dans une zone péri-urbaine en plein développement, ce projet associe les avantages de la ville et de la campagne. Les parcelles sont organisées autour de plusieurs pôles communautaires interconnectés, favorisant les échanges entre résidents. Ce programme est particulièrement adapté aux familles cherchant à s'installer durablement, avec des infrastructures éducatives et de loisirs pensées pour le bien-être de tous les âges.",
    shortDescription: "Le juste équilibre entre vie urbaine et rurale, pour un quotidien harmonieux.",
    location: "Périphérie de Yamoussoukro",
    price: 10800000,
    currency: "FCFA",
    area: "550 m²",
    features: [
      "Proximité avec centres administratifs",
      "Infrastructures éducatives complètes",
      "Espaces intergénérationnels",
      "Connexions de transport optimisées",
      "Réseau internet haut débit"
    ],
    images: [
      "https://images.pexels.com/photos/7031604/pexels-photo-7031604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7028393/pexels-photo-7028393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7028382/pexels-photo-7028382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7028387/pexels-photo-7028387.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    status: "available",
    availableLots: 82,
    totalLots: 150
  },
  {
    id: 5,
    title: "Programme Avenir",
    description: "Le programme Avenir est notre vision la plus ambitieuse d'un habitat durable et connecté. Situé dans une zone à fort potentiel de développement, ce projet intègre les technologies les plus avancées en matière de construction écologique et de gestion intelligente des ressources. Les parcelles sont conçues pour accueillir aussi bien des habitations individuelles que des micro-collectifs, offrant une grande flexibilité d'usage. Ce programme pilote préfigure l'habitat de demain, avec une empreinte carbone minimale et une qualité de vie maximale.",
    shortDescription: "La ville du futur: écologique, technologique et profondément humaine.",
    location: "San Pedro, zone en développement",
    price: 9500000,
    currency: "FCFA",
    area: "450 m²",
    features: [
      "Concept d'éco-quartier intégral",
      "Infrastructures intelligentes",
      "Hub d'innovation et de coworking",
      "Mobilité douce privilégiée",
      "Potentiel d'appréciation immobilière élevé"
    ],
    images: [
      "https://images.pexels.com/photos/7028379/pexels-photo-7028379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7031601/pexels-photo-7031601.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7028391/pexels-photo-7028391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/7028378/pexels-photo-7028378.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    ],
    status: "available",
    availableLots: 110,
    totalLots: 200
  }
];