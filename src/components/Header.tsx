import { Menu, User } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { useEffect, useRef, useState } from 'react';
// Se instaló la dependencia framer-motion para animaciones
import { useMotionValueEvent, motion, useScroll } from "framer-motion";

interface HeaderProps {
  openPage: (page: 'login' | 'home' | 'outfits' | 'places' | 'brands') => void;
  currentUsername: string | null;
  userMenuOpen: boolean;
  setUserMenuOpen: (open: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  isLoginPage: boolean;
}

function Header({ openPage, currentUsername, userMenuOpen, setUserMenuOpen, menuOpen, setMenuOpen, isLoginPage }: HeaderProps) {
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const [hidden, setHidden] = useState(isLoginPage);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  // Oculta o muestra el header basado en la dirección del scroll
  useMotionValueEvent(scrollY, "change", (y: number) => {
    if (!isLoginPage) {
      const difference = y - lastYRef.current;
      if (Math.abs(difference) > 50) {
        setHidden(difference > 0);
        lastYRef.current = y;
      }
    }
  });

  // Efecto que ajusta el estado 'hidden' cuando cambia isLoginPage (se recomienta revisar su implementacion)
  useEffect(() => {
    if (isLoginPage) {
      setHidden(true);
      lastYRef.current = 0;
    } else {
      setHidden(false);
    }
  }, [isLoginPage]);

  const variants = {
    visible: { y: "0%" },
    hidden: { y: "-90%" },
    peeking: { y: "0%", cursor: "pointer" },
  };

  return (
    <motion.div
      animate={hidden ? "hidden" : "visible"}
      initial={isLoginPage ? "hidden" : "visible"}
      whileHover={hidden && !isLoginPage ? "peeking" : undefined}
      onFocusCapture={hidden ? () => setHidden(false) : undefined}
      onMouseEnter={isLoginPage ? () => setHidden(false) : undefined}
      onMouseLeave={isLoginPage ? () => setHidden(true) : undefined}
      variants={variants}
      transition={{ type: "spring", stiffness: 400, damping: 40 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <header className="no-dark bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo y navegación principal */}
          <div className="flex items-center space-x-12">
            <button onClick={() => openPage('home')} className="text-2xl font-bold tracking-tight display-font">BogoSpots</button>

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

          {/* Controles del lado derecho: toggle oscuro, usuario, menú móvil */}
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            {currentUsername && (
              <button className="hidden md:flex items-center gap-3 px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-full transition">
                <User className="w-4 h-4" />
                <span className="font-medium">{currentUsername}</span>
              </button>
            )}

            {/* Menú desplegable de usuario */}
            <div className="relative" ref={userMenuRef}>
              <button
                title="User menu"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="p-2 rounded-full border border-gray-300 hover:border-gray-400 transition"
              >
                <User className="w-5 h-5" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                  {!currentUsername ? (
                    <>
                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          openPage('login');
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        Registrarse
                      </button>

                      <button
                        onClick={() => {
                          setUserMenuOpen(false);
                          openPage('login');
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        Iniciar Sesión
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="px-4 py-3 text-sm text-gray-500">
                        Sesión iniciada como
                        <div className="font-medium text-gray-900 truncate">
                          {currentUsername}
                        </div>
                      </div>

                      <div className="border-t border-gray-100"></div>

                      <button
                        onClick={() => {
                          localStorage.removeItem('bogospots_username');
                          window.dispatchEvent(new Event('bogospots:logout'));
                          setUserMenuOpen(false);
                          openPage('home');
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        Cerrar sesión
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Botón de menú móvil */}
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>

        {/* Menú móvil desplegado */}
        {menuOpen && (
          <div className="no-dark md:hidden bg-white border-t border-gray-200 px-6 py-4 space-y-3">
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
    </motion.div>
  );
}

export default Header;