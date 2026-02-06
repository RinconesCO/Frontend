import OutfitCard from '../components/Outfits/OutfitCard';
import { outfitsData } from '../components/Outfits';

type PageName = 'login' | 'home' | 'outfits' | 'places' | 'brands';

export default function OutfitsPage({ openPage }: { openPage: (p: PageName) => void }) {
  return (
    <section className="min-h-[70vh] max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold mb-2">Outfits</h2>
          <p className="text-gray-600">Descubre los mejores looks urbanos de Colombia</p>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-900 font-medium" onClick={() => openPage('home')}>← Volver</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfitsData.map((outfit) => (
          <OutfitCard
            key={outfit.id}
            id={outfit.id}
            imageUrl={outfit.imageUrl}
            title={outfit.title}
            description={outfit.description}
            tags={outfit.tags}
          />
        ))}
      </div>
    </section>
  );
}
