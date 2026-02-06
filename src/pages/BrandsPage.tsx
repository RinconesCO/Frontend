import BrandCard from '../components/Brands/BrandCard';
import { brandsData } from '../components/Brands';

type PageName = 'login' | 'home' | 'outfits' | 'places' | 'brands';

export default function BrandsPage({ openPage }: { openPage: (p: PageName) => void }) {
  return (
    <section className="min-h-[70vh] max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold mb-2">Brands</h2>
          <p className="text-gray-600">Local brands that shape Colombia's fashion scene</p>
        </div>
        <button className="text-sm text-gray-600 hover:text-gray-900 font-medium" onClick={() => openPage('home')}>← Volver</button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brandsData.map((brand) => (
          <BrandCard
            key={brand.id}
            id={brand.id}
            name={brand.name}
            category={brand.category}
            description={brand.description}
            location={brand.location}
            featured={brand.featured}
          />
        ))}
      </div>
    </section>
  );
}
