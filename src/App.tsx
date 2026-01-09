import { Menu, User, Circle } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-12">
            <h1 className="text-2xl font-bold tracking-tight">BogoSpots</h1>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#spots" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                Spots
              </a>
              <a href="#outfits" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                Outfits
              </a>
              <a href="#lugares" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                Lugares
              </a>
               <a href="#marcas" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition">
                Marcas
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden md:block px-6 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-gray-800 transition">
              Discover more
            </button>
            <button className="p-2 rounded-full border border-gray-300 hover:border-gray-400 transition">
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
            <a href="#products" className="block text-sm font-medium text-gray-700">Products</a>
            <a href="#about" className="block text-sm font-medium text-gray-700">About</a>
            <a href="#contact" className="block text-sm font-medium text-gray-700">Contact</a>
            <button className="w-full px-6 py-2 bg-black text-white text-sm font-medium rounded-full">
              Discover more
            </button>
          </div>
        )}
      </header>

      <main className="pt-20">
        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                Bogotá<br />
                La capital<br />
                de la moda 
              </h2>

              <p className="text-lg text-gray-600 max-w-md leading-relaxed">
                Descrubre las mejores ubicaciones para sesiones de fotos de moda en Bogotá. 
                Desde barrios vibrantes hasta paisajes urbanos icónicos, encuentra el escenario perfecto para tu próxima sesión.
              </p>

              <div className="pt-4">
                <button className="px-8 py-3 bg-red-600 text-white font-medium rounded-full hover:bg-red-700 transition transform hover:scale-105">
                  Explorar lugares 
                </button>
              </div>

              <div className="pt-8 space-y-2 text-xs text-gray-400 leading-relaxed">
                <p className="uppercase tracking-wider">
                  CRAFTSMANSHIP • QUALITY • MADE IN EUROPE • SUSTAINABLE •
                  ECO-FRIENDLY • TIMELESS • DIRECT TO CONSUMER • FREE SHIPPING
                </p>
                <p className="uppercase tracking-wider">
                  CRAFTSMANSHIP • QUALITY • MADE IN EUROPE • SUSTAINABLE •
                  ECO-FRIENDLY • TIMELESS • DIRECT TO CONSUMER • FREE SHIPPING
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-red-800 to-red-900 rounded-3xl overflow-hidden shadow-2xl aspect-[3/4] flex items-center justify-center">
                <div className="absolute inset-0 bg-black/20"></div>
                <img
                  src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fashion model"
                  className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                />
              </div>

              <div className="absolute -right-4 top-1/4 bg-white rounded-2xl p-6 shadow-xl transform hover:scale-105 transition">
                <div className="w-24 h-24 bg-red-900 rounded-full flex items-center justify-center">
                  <Circle className="w-12 h-12 text-white" fill="currentColor" />
                </div>
                <p className="mt-3 text-xs font-medium text-gray-900">Premium Design</p>
              </div>

              <div className="absolute -right-4 bottom-1/4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 shadow-xl transform hover:scale-105 transition">
                <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-white rounded-full"></div>
                </div>
                <p className="mt-3 text-xs font-medium text-white">Crafted Beauty</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-12 md:py-20">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <Circle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainable</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ethically sourced materials and eco-friendly production processes
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mb-4">
                <Circle className="w-8 h-8 text-white" fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Handcrafted with attention to detail and superior materials
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Circle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Timeless Design</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Classic aesthetics that transcend seasonal trends
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-lg mb-4">Annatar</h4>
              <p className="text-sm text-gray-400 leading-relaxed">
                Redefining elegance through timeless design and sustainable craftsmanship.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Products</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition">Collections</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition">Shipping</a></li>
                <li><a href="#" className="hover:text-white transition">Returns</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2026 Annatar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
