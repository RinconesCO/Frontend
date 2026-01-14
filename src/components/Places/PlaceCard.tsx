import React from 'react';
import { MapPin, Camera, Clock } from 'lucide-react';

interface PlaceCardProps {
  id: number;
  name: string;
  zone: string;
  description: string;
  imageUrl: string;
  hours?: string;
  features: string[];
  bestHour?: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  name,
  zone,
  description,
  imageUrl,
  hours,
  features,
  bestHour,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden group">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900">
          {zone}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-bold text-xl text-white mb-1">{name}</h3>
        </div>
      </div>

      <div className="p-5">
        <p className="text-sm text-gray-600 leading-relaxed mb-4">{description}</p>

        <div className="space-y-2 mb-4">
          {bestHour && (
            <div className="flex items-center text-xs text-gray-500">
              <Camera className="w-4 h-4 mr-2 text-red-500" />
              <span>Best hour: <span className="font-medium text-gray-700">{bestHour}</span></span>
            </div>
          )}

          {hours && (
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-4 h-4 mr-2 text-red-500" />
              <span>{hours}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {features.map((feature, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlaceCard;
