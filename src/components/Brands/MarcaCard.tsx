import React from 'react';
import { Store, Heart } from 'lucide-react';

interface MarcaCardProps {
  id: number;
  nombre: string;
  categoria: string;
  descripcion: string;
  logoUrl?: string;
  ubicacion: string;
  destacado?: boolean;
}

const MarcaCard: React.FC<MarcaCardProps> = ({ 
  nombre, 
  categoria, 
  descripcion, 
  logoUrl, 
  ubicacion, 
  destacado = false 
}) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${destacado ? 'ring-2 ring-red-500' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-md">
            {logoUrl ? (
              <img src={logoUrl} alt={nombre} className="w-full h-full object-cover rounded-xl" />
            ) : (
              <Store className="w-7 h-7 text-white" />
            )}
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900">{nombre}</h3>
            <p className="text-sm text-red-600 font-medium">{categoria}</p>
          </div>
        </div>
        
        {destacado && (
          <button className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition">
            <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
          </button>
        )}
      </div>
      
      <p className="text-sm text-gray-600 leading-relaxed mb-4">{descripcion}</p>
      
      <div className="flex items-center text-xs text-gray-500 pt-3 border-t border-gray-100">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {ubicacion}
      </div>
    </div>
  );
};

export default MarcaCard;
