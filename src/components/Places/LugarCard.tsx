import React from 'react';
import { MapPin, Camera, Clock } from 'lucide-react';

interface LugarCardProps {
  id: number;
  nombre: string;
  zona: string;
  descripcion: string;
  imageUrl: string;
  horario?: string;
  caracteristicas: string[];
  mejorHora?: string;
}

const LugarCard: React.FC<LugarCardProps> = ({ 
  nombre, 
  zona, 
  descripcion, 
  imageUrl, 
  horario, 
  caracteristicas,
  mejorHora
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden group">
        <img 
          src={imageUrl} 
          alt={nombre} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
          {zona}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-bold text-xl text-white mb-1">{nombre}</h3>
        </div>
      </div>
      
      <div className="p-5">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{descripcion}</p>
        
        <div className="space-y-2 mb-4">
          {mejorHora && (
            <div className="flex items-center text-xs text-gray-500">
              <Camera className="w-4 h-4 mr-2 text-red-500" />
              <span>Mejor hora: <span className="font-medium text-gray-700">{mejorHora}</span></span>
            </div>
          )}
          
          {horario && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-2 text-red-500" />
              <span>{horario}</span>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2">
          {caracteristicas.map((caracteristica, index) => (
            <span 
              key={index} 
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
            >
              {caracteristica}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LugarCard;
