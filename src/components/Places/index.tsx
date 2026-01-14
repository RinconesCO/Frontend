import PlaceCard from './PlaceCard';

// Example data for places (English keys)
export const placesData = [
  {
    id: 1,
    name: 'Parque de la 93',
    zone: 'Zona Rosa',
    description: 'Ideal outdoor space for fashion shoots, cafes and modern architecture. Great for casual urban looks.',
    imageUrl: 'https://images.pexels.com/photos/3264723/pexels-photo-3264723.jpeg?auto=compress&cs=tinysrgb&w=800',
    hours: 'Open 24/7',
    features: ['Outdoor', 'Urban', 'Cafes'],
    bestHour: 'Golden hour (5-7pm)'
  },
  {
    id: 2,
    name: 'La Candelaria',
    zone: 'Historic Center',
    description: 'Colorful streets and historic facades perfect for urban contrasts and vintage aesthetics.',
    imageUrl: 'https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg?auto=compress&cs=tinysrgb&w=800',
    hours: '8am - 6pm recommended',
    features: ['Historic', 'Colorful', 'Art'],
    bestHour: 'Mornings (9-11am)'
  },
  {
    id: 3,
    name: 'Usaquén',
    zone: 'North',
    description: 'Neighborhood with plazas and markets bringing a bohemian aesthetic. Great for Sunday market shoots.',
    imageUrl: 'https://images.pexels.com/photos/3214119/pexels-photo-3214119.jpeg?auto=compress&cs=tinysrgb&w=800',
    hours: 'Sunday market',
    features: ['Bohemian', 'Markets', 'Plazas'],
    bestHour: 'Sundays (10am-2pm)'
  },
  {
    id: 4,
    name: 'Monserrate',
    zone: 'Eastern Hills',
    description: 'Panoramic city views for dramatic shots with the Bogota skyline in the background.',
    imageUrl: 'https://images.pexels.com/photos/3214121/pexels-photo-3214121.jpeg?auto=compress&cs=tinysrgb&w=800',
    hours: '8am - 5pm',
    features: ['Panoramic', 'Natural', 'Iconic'],
    bestHour: 'Sunset (4-6pm)'
  },
  {
    id: 5,
    name: 'Quinta Camacho',
    zone: 'Chapinero',
    description: 'English architecture and tree-lined streets perfect for elegant and sophisticated sessions.',
    imageUrl: 'https://images.pexels.com/photos/3214113/pexels-photo-3214113.jpeg?auto=compress&cs=tinysrgb&w=800',
    hours: 'Open 24/7',
    features: ['Elegant', 'Architecture', 'Quiet'],
    bestHour: 'Afternoons (2-5pm)'
  },
  {
    id: 6,
    name: 'Centro Internacional',
    zone: 'Center',
    description: 'Skyscrapers and modern architecture for a contemporary urban and corporate aesthetic.',
    imageUrl: 'https://images.pexels.com/photos/3214125/pexels-photo-3214125.jpeg?auto=compress&cs=tinysrgb&w=800',
    hours: 'Best on weekdays',
    features: ['Modern', 'Urban', 'Corporate'],
    bestHour: 'Midday (12-2pm)'
  }
];

export default PlaceCard;
