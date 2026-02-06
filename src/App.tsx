import { useState, useEffect, useRef } from 'react';
import Loader from './components/Loader';
import OutfitsPage from './pages/OutfitsPage';
import PlacesPage from './pages/PlacesPage';
import BrandsPage from './pages/BrandsPage';
import fashionModelImg from './Sources/fashion-model-bogota.jpg';
import oldImg from './Sources/Old.jpg';
import imgInicio from './Sources/imgInicio.jpg';
import spot1 from './Sources/Spot1.jpeg';
import spot2 from './Sources/Spot2.jpeg';
import { AuthProvider, useAuth } from './login/AuthContext';
import LoginComponent from './login/login-component';
import Header from './components/Header';
import CoverflowCarousel from './components/CoverflowCarousel';

function AppContent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState<'home' | 'outfits' | 'places' | 'brands' | 'login' | 'profile'>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);


  const loadingTimer = useRef<number | null>(null);

  // Usar el hook de autenticación
  const { isAuthenticated, user, logout } = useAuth();

  const openPage = (p: 'login' | 'home' | 'outfits' | 'places' | 'brands' | 'profile') => {
    setMenuOpen(false);
    setPage(p);
    // show loader briefly during page transition
    try {
      if (loadingTimer.current) window.clearTimeout(loadingTimer.current);
    } catch (_) { }
    setIsLoading(true);
    loadingTimer.current = window.setTimeout(() => {
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 450);
  };

  useEffect(() => {
    return () => {
      if (loadingTimer.current) window.clearTimeout(loadingTimer.current);
    };
  }, []);

  // Si el usuario se autentica y está en la página de login, redirigir al perfil
  useEffect(() => {
    if (isAuthenticated && page === 'login') {
      openPage('profile');
    }
  }, [isAuthenticated, page]);

  const handleLogout = () => {
    logout();
    openPage('home');
  };


  const renderPage = () => {
    // Si está en la página de perfil, mostrar UserProfile
    if (page === 'profile') {
      if (!isAuthenticated) {
        openPage('login');
        return null;
      }
      return <UserProfile />;
    }

    if (page === 'home') {
      const carouselImages = [fashionModelImg, spot1, spot2, imgInicio, oldImg];

      return (
        <>
          {/* HERO: Bienvenida a Museo Rolo */}
          <section className="w-full h-screen relative flex items-center justify-center overflow-hidden">
            <img
              src={imgInicio}
              alt="Hero background"
              className="absolute inset-0 w-full h-full object-cover object-center scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60"></div>

            <div className="absolute -left-28 -top-20 w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -right-28 -bottom-20 w-96 h-96 bg-yellow-400 rounded-full blur-3xl opacity-20"></div>

            <div className="relative z-10 max-w-4xl text-center px-6">
              <h1 className="text-5xl md:text-[80px] lg:text-[120px] leading-tight text-white font-extrabold display-font drop-shadow-lg">
                BIENVENIDOS A ESTE MUSEO ROLO
              </h1>

              <p className="mt-6 text-lg md:text-2xl text-gray-100 max-w-2xl mx-auto">
                Un espacio donde la moda se encuentra con la ciudad — descubre lugares, outfits y marcas que cuentan historias.
              </p>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button onClick={() => openPage('places')} className="px-6 py-3 border border-white text-white rounded-full font-semibold bg-white/10 hover:bg-white/20 transition">
                  Explorar Lugares
                </button>
                <button onClick={() => openPage('outfits')} className="px-6 py-3 border border-white text-white rounded-full font-semibold bg-white/10 hover:bg-white/20 transition">
                  Ver Outfits
                </button>
              </div>

              <div className="mt-6 text-xs text-gray-200 uppercase tracking-wider">Bogotá • Fotografía • Estilo</div>
            </div>
          </section>

          {/* CARRUSEL tipo coverflow - debajo de la primera sección */}
          <CoverflowCarousel images={carouselImages} />


          {/* SEGUNDA seccion a la derecha */}
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
                    MODA • CALIDAD • MADE IN BOGOTÁ • ESTILO •
                    UNICO • RARO • DIFERENTE • EXPRESION PERSONAL • FOTOGRAFIA
                  </p>
                  <p className="uppercase tracking-wider">
                    MODA • CALIDAD • MADE IN BOGOTÁ • ESTILO •
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

                <div className="absolute -right-6 top-1/3 bg-gray-50 p-3 ">
                  <img
                    src={fashionModelImg}
                    alt="Model"
                    className="w-40 h-56 object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* TERCERA seccion a la izquierda */}
          <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <div className="relative bg-gradient-to-br from-red-400 to-red-900 rounded-3xl overflow-hidden shadow-none aspect-[3/4] flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <img
                    src={spot1}
                    alt="Spot 1"
                    className="w-full h-full object-cover opacity-95"
                  />
                </div>

                <div className="absolute -right-6 top-1/3 bg-gray-50 p-3 ">
                  <img
                    src={spot2}
                    alt="Spot thumbnail"
                    className="w-40 h-56 object-cover shadow-lg"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight display-font">
                  Lugares<br />
                  Chimbas<br />
                  Para tus fotos
                </h2>

                <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                  Bogotá no solo es la capital de Colombia, sino tambien un epicentro de moda y estilo en America Latina.
                  Sus calles vibrantes, arquitectura unica y cultura diversa la convierten en el lugar ideal para sesiones de fotos de moda que capturan la esencia urbana y contemporanea.
                </p>
              </div>
            </div>
          </section>

          {/* CUARTA seccion con una imagen estirada de lado a lado */}
          <section className="w-full relative overflow-hidden">
            <div className="absolute inset-0 w-full h-64 md:h-[420px] lg:h-[560px]">
              <img src={imgInicio} alt="Inicio" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 py-28 md:py-36">
              <h3 className="display-font text-white text-5xl md:text-7xl lg:text-8xl text-center">ciudad unica</h3>
            </div>
          </section>

          {/* QUINTA seccion con tres imagenes en fila */}
          <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
  <div className="flex gap-6 overflow-x-auto scroll-smooth">
    
    <div className="min-w-[280px] md:min-w-[350px] rounded-2xl overflow-hidden flex-shrink-0">
      <img src={fashionModelImg} alt="Sustainable" className="w-full h-56 object-cover" />
    </div>

    <div className="min-w-[280px] md:min-w-[350px] rounded-2xl overflow-hidden flex-shrink-0">
      <img src={imgInicio} alt="Premium Quality" className="w-full h-56 object-cover" />
    </div>

    <div className="min-w-[280px] md:min-w-[350px] rounded-2xl overflow-hidden flex-shrink-0">
      <img src={fashionModelImg} alt="Timeless Design" className="w-full h-56 object-cover" />
    </div>

    <div className="min-w-[280px] md:min-w-[350px] rounded-2xl overflow-hidden flex-shrink-0">
      <img src={imgInicio} alt="Premium Quality" className="w-full h-56 object-cover" />
    </div>

     <div className="min-w-[280px] md:min-w-[350px] rounded-2xl overflow-hidden flex-shrink-0">
      <img src={fashionModelImg} alt="Timeless Design" className="w-full h-56 object-cover" />
    </div>
    
    <div className="min-w-[280px] md:min-w-[350px] rounded-2xl overflow-hidden flex-shrink-0">
      <img src={imgInicio} alt="Premium Quality" className="w-full h-56 object-cover" />
    </div>

     <div className="min-w-[280px] md:min-w-[350px] rounded-2xl overflow-hidden flex-shrink-0">
      <img src={fashionModelImg} alt="Timeless Design" className="w-full h-56 object-cover" />
    </div>

  </div>
</section>

        </>
      );
    }

    if (page === 'outfits') {
      return <OutfitsPage openPage={openPage} />;
    }

    if (page === 'places') {
      return <PlacesPage openPage={openPage} />;
    }

    if (page === 'brands') {
      return <BrandsPage openPage={openPage} />;
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
    <div className="min-h-screen bg-gray-50 overflow-hidden relative z-0">
      {isLoading && <Loader />}

      {/* Fondo de letras chinas - ocultar en perfil */}
      {page !== 'login' && page !== 'profile' && (
        <div className="bg-giant-word display-font" aria-hidden="true">
          太 棒 了
        </div>
      )}

      {/* Header - mostrar siempre excepto cuando esté en la página de perfil autenticado */}
      {!(page === 'profile' && isAuthenticated) && (
        <header className="no-dark fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-12">
              <button onClick={() => openPage('home')} className="text-2xl font-bold tracking-tight display-font">
                BogoSpots
              </button>

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
              <DarkModeToggle />

              {/* Si el usuario está autenticado, mostrar botón de perfil */}
              {isAuthenticated && user ? (
                <>
                  <button
                    onClick={() => openPage('profile')}
                    className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full transition hover:bg-gray-200"
                  >
                    <User className="w-4 h-4" />
                    <span className="font-medium">{user.firstName} {user.lastName}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-full transition hover:bg-red-600"
                    title="Cerrar sesión"
                  >
                    <FiLogOut size={16} />
                  </button>
                </>
              ) : (
                <button
                  title="Sign in"
                  onClick={() => openPage('login')}
                  className="p-2 rounded-full border border-gray-300 hover:border-gray-400 transition"
                >
                  <User className="w-5 h-5" />
                </button>
              )}

              <button
                className="md:hidden p-2"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="no-dark md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3">
              <button onClick={() => openPage('outfits')} className="block text-sm font-medium text-gray-700 text-left w-full">
                Outfits
              </button>
              <button onClick={() => openPage('places')} className="block text-sm font-medium text-gray-700 text-left w-full">
                Places
              </button>
              <button onClick={() => openPage('brands')} className="block text-sm font-medium text-gray-700 text-left w-full">
                Brands
              </button>

              {isAuthenticated && user && (
                <>
                  <button
                    onClick={() => openPage('profile')}
                    className="w-full px-6 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span className="truncate">{user.firstName} {user.lastName}</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-2 bg-red-500 text-white text-sm font-medium rounded-full flex items-center gap-2"
                  >
                    <FiLogOut size={16} />
                    <span>Cerrar sesión</span>
                  </button>
                </>
              )}
            </div>
          )}
        </header>
      )}
      {/*Header*/}
      <Header openPage={openPage} currentUsername={currentUsername} userMenuOpen={userMenuOpen} 
      setUserMenuOpen={setUserMenuOpen} menuOpen={menuOpen} setMenuOpen={setMenuOpen} isLoginPage={page === 'login'} />

      <main className={page !== 'profile' ? "pt-20" : ""}>
        {renderPage()}
      </main>

      {/* Footer - ocultar en perfil */}
      {page !== 'profile' && (
      {page === 'home' && (
        <footer className="mt-20">
          <div className="w-full h-48 md:h-64 relative overflow-hidden">
            <img
              src={oldImg}
              alt="Old"
              className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
            />
           
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="display-font w-full text-center text-white text-5xl md:text-7xl leading-none px-6">
                Estilo real, nacido en Bogotá.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

// Componente principal que envuelve todo con AuthProvider
export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}