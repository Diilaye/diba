import React from 'react';

const ProcessFlow: React.FC = () => {
  return (
    <div className="w-full py-12 overflow-hidden">
      <div className="max-w-4xl mx-auto relative">
        {/* Conteneur principal */}
        <div className="relative">
          {/* Boîte Adhésion */}
          <div className="absolute top-8 left-8 w-64 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md z-10">
            <div className="bg-gray-400 py-2 text-center">
              <h3 className="text-white font-semibold">Adhésion</h3>
            </div>
            <div className="p-4 text-center">
              <p>• Modele économique Achat Groupé</p>
              <p>• Charte</p>
            </div>
          </div>

          {/* Boîte Souscription */}
          <div className="absolute top-8 right-8 w-64 bg-white border border-amber-200 rounded-lg overflow-hidden shadow-md z-10">
            <div className="bg-amber-600 py-2 text-center">
              <h3 className="text-white font-semibold">Souscription </h3>
              <span className="text-white font-semibold">sama projet Achat Groupé</span>
            </div>
            <div className="p-4 text-center">
              <p>• Projet AG1</p>
              <p>• Projet AG2</p>
              <p>• Projet AG3</p>
              <p>• Projet AG4</p>
            </div>
          </div>

          {/* Boîte Acquisition */}
          <div className="absolute bottom-8 right-8 w-64 bg-white border border-amber-300 rounded-lg overflow-hidden shadow-md z-10">
            <div className="bg-amber-700 py-2 text-center">
              <h3 className="text-white font-semibold">Acquisition</h3>
            </div>
            <div className="p-4 text-center">
              <p>• Parcelle à usage d'habitation</p>
            </div>
          </div>

          {/* Boîte Construction */}
          <div className="absolute bottom-8 left-8 w-64 bg-white border border-red-200 rounded-lg overflow-hidden shadow-md z-10">
            <div className="bg-red-600 py-2 text-center">
              <h3 className="text-white font-semibold">Construction</h3>
            </div>
            <div className="p-4 text-center">
              <p>• Infrastructures publiques</p>
              <p>• Aménagement & cadre de vie</p>
              <p>• Voiries et réseaux divers</p>
              <p>• Construction logements</p>
            </div>
          </div>

          {/* Flèches */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 500" fill="none">
            {/* Flèche de Souscription vers Acquisition (haut) */}
            <path 
              d="M 180,70 C 300,70 500,-50 620,70" 
              stroke="#ca8a04" 
              strokeWidth="3" 
              strokeLinecap="round"
              markerEnd="url(#arrowhead-amber)"
            />
            
            {/* Flèche de Construction vers Acquisition (droite) */}
            <path 
              d="M 650,150 C 750,200 750,300 650,350" 
              stroke="#b91c1c" 
              strokeWidth="3" 
              strokeLinecap="round"
              markerEnd="url(#arrowhead-red)"
            />
            
            {/* Flèche d'Acquisition vers Adhésion (bas) */}
            <path 
              d="M 620,430 C 500,430 300,550 180,430" 
              stroke="#b45309" 
              strokeWidth="3" 
              strokeLinecap="round"
              markerEnd="url(#arrowhead-amber-dark)"
            />
            
            {/* Flèche d'Adhésion vers Souscription (gauche) 
            <path 
              d="M 150,350 C 50,300 50,200 150,150" 
              stroke="#9ca3af" 
              strokeWidth="3" 
              strokeLinecap="round"
              markerEnd="url(#arrowhead-gray)"
            />
            */}
            
            {/* Définition des marqueurs de flèches */}
            <defs>
              <marker id="arrowhead-amber" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                <polygon points="0 0, 12 4, 0 8" fill="#ca8a04" />
              </marker>
              <marker id="arrowhead-red" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                <polygon points="0 0, 12 4, 0 8" fill="#b91c1c" />
              </marker>
              <marker id="arrowhead-amber-dark" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                <polygon points="0 0, 12 4, 0 8" fill="#b45309" />
              </marker>
              <marker id="arrowhead-gray" markerWidth="12" markerHeight="8" refX="10" refY="4" orient="auto">
                <polygon points="0 0, 12 4, 0 8" fill="#9ca3af" />
              </marker>
            </defs>
          </svg>

          {/* Espace pour le diagramme */}
          <div className="w-full h-[500px]"></div>
        </div>
      </div>
    </div>
  );
};

export default ProcessFlow;
