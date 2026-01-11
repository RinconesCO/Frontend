import React from 'react';

interface OutfitCardProps {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  tags?: string[];
}

const OutfitCard: React.FC<OutfitCardProps> = ({ id, imageUrl, title, description, tags }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative overflow-hidden group">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-3">{description}</p>
        
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-red-50 text-red-600 text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OutfitCard;
