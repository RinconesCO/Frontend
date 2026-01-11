import LugarCard from './LugarCard';

// Datos de ejemplo para lugares
export const lugaresData = [
  {
    id: 1,
    nombre: 'Parque de la 93',
    zona: 'Zona Rosa',
    descripcion: 'Espacio ideal para sesiones al aire libre, cafés y arquitectura moderna. Perfecto para looks casuales y urbanos.',
    imageUrl: 'https://images.pexels.com/photos/3264723/pexels-photo-3264723.jpeg?auto=compress&cs=tinysrgb&w=800',
    horario: 'Abierto 24/7',
    caracteristicas: ['Aire libre', 'Urbano', 'Cafés'],
    mejorHora: 'Golden hour (5-7pm)'
  },
  {
    id: 2,
    nombre: 'La Candelaria',
    zona: 'Centro Histórico',
    descripcion: 'Calles coloridas y fachadas históricas perfectas para contrastes urbanos y estética vintage.',
    imageUrl: 'https://images.pexels.com/photos/2929906/pexels-photo-2929906.jpeg?auto=compress&cs=tinysrgb&w=800',
    horario: '8am - 6pm recomendado',
    caracteristicas: ['Histórico', 'Colorido', 'Arte'],
    mejorHora: 'Mañanas (9-11am)'
  },
  {
    id: 3,
    nombre: 'Usaquén',
    zona: 'Norte',
    descripcion: 'Barrio con plazas y mercados que aportan estética bohemia. Ideal para domingos de mercado.',
    imageUrl: 'https://images.pexels.com/photos/3214119/pexels-photo-3214119.jpeg?auto=compress&cs=tinysrgb&w=800',
    horario: 'Mercado dominical',
    caracteristicas: ['Bohemio', 'Mercados', 'Plazas'],
    mejorHora: 'Domingos (10am-2pm)'
  },
  {
    id: 4,
    nombre: 'Monserrate',
    zona: 'Cerros Orientales',
    descripcion: 'Vistas panorámicas de la ciudad para tomas dramáticas con el skyline bogotano de fondo.',
    imageUrl: 'https://images.pexels.com/photos/3214121/pexels-photo-3214121.jpeg?auto=compress&cs=tinysrgb&w=800',
    horario: '8am - 5pm',
    caracteristicas: ['Panorámico', 'Natural', 'Icónico'],
    mejorHora: 'Atardecer (4-6pm)'
  },
  {
    id: 5,
    nombre: 'Quinta Camacho',
    zona: 'Chapinero',
    descripcion: 'Arquitectura inglesa y calles arboladas perfectas para sesiones elegantes y sofisticadas.',
    imageUrl: 'https://images.pexels.com/photos/3214113/pexels-photo-3214113.jpeg?auto=compress&cs=tinysrgb&w=800',
    horario: 'Abierto 24/7',
    caracteristicas: ['Elegante', 'Arquitectura', 'Tranquilo'],
    mejorHora: 'Tardes (2-5pm)'
  },
  {
    id: 6,
    nombre: 'Centro Internacional',
    zona: 'Centro',
    descripcion: 'Rascacielos y arquitectura moderna para un aesthetic urbano y corporativo contemporáneo.',
    imageUrl: 'https://images.pexels.com/photos/3214125/pexels-photo-3214125.jpeg?auto=compress&cs=tinysrgb&w=800',
    horario: 'Mejores días laborales',
    caracteristicas: ['Moderno', 'Urbano', 'Corporativo'],
    mejorHora: 'Mediodía (12-2pm)'
  }
];

export default LugarCard;
