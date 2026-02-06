import PlaceCard from '../components/Places/PlaceCard';
import { placesData } from '../components/Places';

type PageName = 'login' | 'home' | 'outfits' | 'places' | 'brands';

export default function PlacesPage({ openPage }: { openPage: (p: PageName) => void }) {
  return (
    <section className="min-h-[70vh] max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold mb-2">Places</h2>
          <p className="text-gray-600">Top spots in Colombia for your fashion photoshoots</p>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-900 font-medium" onClick={() => openPage('home')}>← Volver</button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {placesData.map((place) => (
          <PlaceCard
            key={place.id}
            id={place.id}
            name={place.name}
            zone={place.zone}
            description={place.description}
            imageUrl={place.imageUrl}
            hours={place.hours}
            features={place.features}
            bestHour={place.bestHour}
          />
        ))}
      </div>
    </section>
  );
}
