import { Menu, User, Circle } from 'lucide-react';
import { useState, useEffect } from 'react';
import OutfitCard from './components/Outfits/OutfitCard';
import { outfitsData } from './components/Outfits';
import BrandCard from './components/Brands/BrandCard';
import { brandsData } from './components/Brands';
import PlaceCard from './components/Places/PlaceCard';
import { placesData } from './components/Places';
import fashionModelImg from './Sources/fashion-model-bogota.jpg';
import oldImg from './Sources/Old.jpg';
import imgInicio from './Sources/imgInicio.jpg';
import LoginComponent from './login/login-component';


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState<'home' | 'outfits' | 'places' | 'brands' | 'login'>('home');
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);

  const openPage = (p: 'login' | 'home' | 'outfits' | 'places' | 'brands') => {
    setMenuOpen(false);
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bogospots_username');
      if (saved) setCurrentUsername(saved);
    } catch (_) {}

    const handler = (e: any) => {
      try {
        const u = e?.detail?.username;
        if (u) setCurrentUsername(String(u));
      } catch (_) {}
    };

    window.addEventListener('bogospots:login', handler as EventListener);
    window.addEventListener('bogospots:logout', () => setCurrentUsername(null));
    return () => {
      window.removeEventListener('bogospots:login', handler as EventListener);
      window.removeEventListener('bogospots:logout', () => setCurrentUsername(null));
    };
  }, []);

  const renderPage = () => {
    if (page === 'home') {
      return (
        <>
          <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight display-font">
                  Bogotá<br />
                  La capital<br />
                  de la moda 
                </h2>

                <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                  Descrubre las mejores ubicaciones para sesiones de fotos de moda en Bogotá. 
                  Desde barrios vibrantes hasta paisajes urbanos icónicos, encuentra el escenario perfecto para tu próxima sesión.
                </p>

                

                <div className="pt-8 space-y-2 text-xs text-gray-400 leading-relaxed">
                  <p className="uppercase tracking-wider">
                    MODA • CALIDAD • MADE IN BOGOTA • ESTILO •
                    UNICO • RARO • DIFERENTE • EXPRESION PERSONAL • FOTOGRAFIA
                  </p>
                  <p className="uppercase tracking-wider">
                    MODA • CALIDAD • MADE IN BOGOTA • ESTILO •
                    UNICO • RARO • DIFERENTE • EXPRESION PERSONAL • FOTOGRAFIA
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="relative bg-gradient-to-br from-red-400 to-red-900 rounded-3xl overflow-hidden shadow-none aspect-[3/4] flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img
                    src={fashionModelImg}
                    alt="Fashion model"
                    className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                  />
                </div>

                <div className="absolute -right-4 top-1/4 bg-gray-50 rounded-2xl p-8 transform hover:scale-105 transition">
                  <p className="mt-3 text-4xl md:text-5xl font-medium text-gray-900 display-font"> ¡QUE CHIMBA! </p>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="rounded-2xl overflow-hidden">
                <img src={fashionModelImg} alt="Sustainable" className="w-full h-56 object-cover" />
              </div>

              <div className="rounded-2xl overflow-hidden">
                <img src={imgInicio} alt="Premium Quality" className="w-full h-56 object-cover" />
              </div>

              <div className="rounded-2xl overflow-hidden">
                <img src={fashionModelImg} alt="Timeless Design" className="w-full h-56 object-cover" />
              </div>
            </div>
          </section>
        </>
      );
    }

    if (page === 'outfits') {
      return (
        <section className="min-h-[70vh] max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">Outfits</h2>
              <p className="text-gray-600">Descubre los mejores looks urbanos de Bogotá</p>
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

    if (page === 'places') {
      return (
        <section className="min-h-[70vh] max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">Places</h2>
              <p className="text-gray-600">Top spots in Bogotá for your fashion photoshoots</p>
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

    if (page === 'brands') {
      return (
        <section className="min-h-[70vh] max-w-7xl mx-auto px-6 py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">Brands</h2>
              <p className="text-gray-600">Local brands that shape Bogota's fashion scene</p>
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

    if (page === 'login') {
  return (
    <section className="min-h-[70vh] flex items-center justify-center">
      <LoginComponent />
    </section>
  );
}

    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <button onClick={() => openPage('home')} className="text-2xl font-bold tracking-tight">BogoSpots</button>

            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => openPage('outfits')} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                Outfits
              </button>
              <button onClick={() => openPage('places')} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                Places
              </button>
              <button onClick={() => openPage('brands')} className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                Brands
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {currentUsername && (
              <button className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full transition">
                <User className="w-4 h-4" />
                <span className="font-medium">{currentUsername}</span>
              </button>
            )}

            <button title="Sign in" onClick={() => openPage('login')} className="p-2 rounded-full border border-gray-300 hover:border-gray-400 transition">
              <User className="w-5 h-5" />
            </button>
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3">
            <button onClick={() => openPage('outfits')} className="block text-sm font-medium text-gray-700 text-left w-full">Outfits</button>
            <button onClick={() => openPage('places')} className="block text-sm font-medium text-gray-700 text-left w-full">Places</button>
            <button onClick={() => openPage('brands')} className="block text-sm font-medium text-gray-700 text-left w-full">Brands</button>
            {currentUsername && (
              <div className="w-full px-6 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="truncate">{currentUsername}</span>
              </div>
            )}
          </div>
        )}
      </header>

      <main className="pt-20">
        {renderPage()}
      </main>

        
        <footer className="mt-20">
          <div className="w-full h-48 md:h-64 relative overflow-hidden">
            <img 
              src={oldImg} 
              alt="Old" 
              className="absolute inset-0 w-full h-full object-cover object-[center_40%]" 
            />
            <div className="absolute inset-0 bg-gray-900/60"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="display-font w-full text-center text-white text-5xl md:text-7xl leading-none px-6">
                Estilo real, nacido en Bogotá.
              </p>
            </div>
          </div>
        </footer>
    </div>
  );
}

export default App;
