import { useState } from 'react';
import { FiMail, FiLock, FiAtSign, FiUser, FiEye, FiEyeOff, FiPhone, FiPower } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaInstagram } from 'react-icons/fa';
import { useAuth } from '../login/AuthContext';

const backgroundImages = [
  'src/Sources/imgInicio.jpg',
  'src/Sources/fashion-model-bogota.jpg',
  'src/Sources/imgInicio.jpg',
  'src/Sources/fashion-model-bogota.jpg',
  'src/Sources/imgInicio.jpg',
  'src/Sources/fashion-model-bogota.jpg',
  'src/Sources/imgInicio.jpg',
  'src/Sources/fashion-model-bogota.jpg',
];

export default function LoginComponent() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Estados del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (mode === 'login') {
        // Validaciones básicas
        if (!email || !password) {
          throw new Error('Por favor completa todos los campos');
        }

        await login(email, password);
        // Si el login es exitoso, el App.tsx redirigirá automáticamente al perfil
      } else {
        // Validaciones para registro
        if (!username || !firstName || !lastName || !email || !password) {
          throw new Error('Por favor completa todos los campos obligatorios');
        }

        if (password !== confirmPassword) {
          throw new Error('Las contraseñas no coinciden');
        }

        if (password.length < 6) {
          throw new Error('La contraseña debe tener al menos 6 caracteres');
        }

        await register({
          username,
          firstName,
          lastName,
          email,
          phone,
          password,
        });

        setSuccess('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
        setMode('login');

        // Limpiar formulario
        setUsername('');
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setConfirmPassword('');
      }
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark overflow-hidden flex items-center justify-center">

      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 z-0 opacity-60 dark:opacity-20 pointer-events-none">
        <div
          className="grid gap-3 p-3 w-[120%] h-[120%]"
          style={{
            gridTemplateColumns: 'repeat(4, 1fr)',
            transform: 'rotate(-5deg) translate(-5%, -5%)',
          }}
        >
          {backgroundImages.map((img, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl overflow-hidden border border-primary/10"
            >
              <img
                src={img}
                alt="background"
                className="w-full h-full object-cover blur-[0.5px] brightness-50"
              />
            </div>
          ))}
        </div>
      </div>

      {/* CARD */}
      <main className="relative z-10 w-full max-w-sm px-6">
        <div className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-8 rounded-[40px] shadow-2xl transition-all duration-500">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold uppercase text-[#0D1B2A] dark:text-white">
              COLSPOTS
            </h1>

            <h2 className="text-2xl font-bold mt-6 text-[#0D1B2A] dark:text-zinc-100">
              {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </h2>

            <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">
              Descubre los mejores sitios de moda en Colombia.
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-4" onSubmit={handleSubmit}>

            {/* CAMPOS (REGISTRO) */}
            {mode === 'register' && (
              <>
                <div className="relative">
                  <FiPower className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-11 pr-4 py-3 outline-none text-sm text-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
                    required
                  />
                </div>

                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Nombre"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-11 pr-4 py-3 outline-none text-sm text-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
                    required
                  />
                </div>

                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-11 pr-4 py-3 outline-none text-sm text-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
                    required
                  />
                </div>

                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Teléfono (opcional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-11 pr-4 py-3 outline-none text-sm text-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </>
            )}

            {/* EMAIL */}
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                type="email"
                placeholder="hola@bogospots.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-11 pr-4 py-3 outline-none text-sm text-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />

              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-11 pr-11 py-3 outline-none text-sm text-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-primary transition"
              >
                {showPassword ? <FiEye size={18} /> : <FiEyeOff size={18} />}
              </button>
            </div>

            {/* CONFIRMAR PASSWORD */}
            {mode === 'register' && (
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 rounded-lg pl-11 pr-4 py-3 outline-none text-sm text-zinc-700 dark:text-zinc-100 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary/30"
                  required
                />
              </div>
            )}

            {/* OPCIONES LOGIN */}
            {mode === 'login' && (
              <div className="flex justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <label className="flex items-center gap-2">
                  <input type="checkbox" />
                  Recuérdame
                </label>
                <span className="text-primary cursor-pointer">
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
            )}

            {/* MENSAJES */}
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 text-sm text-red-600 dark:text-red-400">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg p-3 text-sm text-emerald-600 dark:text-emerald-400">
                {success}
              </div>
            )}

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition hover:scale-[1.02] active:scale-95 disabled:opacity-60"
            >
              {loading ? 'Procesando...' : (mode === 'login' ? 'Iniciar sesión' : 'Registrarse')}
            </button>

            {/* SOCIAL */}
            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
              <span className="text-xs text-zinc-400">O CONTINUAR CON</span>
              <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
            </div>

            <div className="flex justify-center gap-6">
              <button type="button" className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:scale-105 transition">
                <FcGoogle size={22} />
              </button>

              <button type="button" className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:scale-105 transition">
                <FaInstagram size={22} className="text-pink-500" />
              </button>

              <button type="button" className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:scale-105 transition">
                <FiAtSign size={22} />
              </button>
            </div>
          </form>

          {/* FOOTER */}
          <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            {mode === 'login' ? (
              <>
                ¿No tienes cuenta?{' '}
                <span
                  className="text-primary font-bold cursor-pointer"
                  onClick={() => {
                    setMode('register');
                    setError('');
                    setSuccess('');
                  }}
                >
                  Crear cuenta
                </span>
              </>
            ) : (
              <>
                ¿Ya tienes cuenta?{' '}
                <span
                  className="text-primary font-bold cursor-pointer"
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setSuccess('');
                  }}
                >
                  Iniciar sesión
                </span>
              </>
            )}
          </p>
        </div>
      </main>
    </div>
  );
}