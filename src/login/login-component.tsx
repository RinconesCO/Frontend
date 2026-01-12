import { useState, useEffect } from 'react';
import { FiMail, FiLock, FiAtSign, FiUser, FiEye, FiEyeOff, FiPhone, FiPower } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaInstagram } from 'react-icons/fa';
import useAuthForm from './useAuthForm';

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
  const [dark, setDark] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    success,
    handleSubmit,
  } = useAuthForm(mode, { onRegisterSuccess: () => setMode('login') });

  // ✅ DARK MODE REAL (TAILWIND)
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

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
              BOGOSPOTS
            </h1>

            <h2 className="text-2xl font-bold mt-6 text-[#0D1B2A] dark:text-zinc-100">
              {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </h2>

            <p className="text-sm mt-2 text-zinc-500 dark:text-zinc-400">
              Descubre los mejores spots de moda en Bogotá.
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

            {/* BOTÓN */}
            {error && <div className="text-sm text-red-500">{error}</div>}
            {success && <div className="text-sm text-green-600">{success}</div>}

            <button disabled={loading} className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/30 transition hover:scale-[1.02] active:scale-95 disabled:opacity-60">
              {loading ? 'Procesando...' : (mode === 'login' ? 'Iniciar sesión' : 'Registrarse')}
            </button>

            {/* SOCIAL */}
            <div className="flex items-center gap-4 my-6">
              <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
              <span className="text-xs text-zinc-400">O CONTINUAR CON</span>
              <div className="h-px bg-zinc-200 dark:bg-zinc-700 flex-1" />
            </div>

            <div className="flex justify-center gap-6">
              <button className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:scale-105 transition">
                <FcGoogle size={22} />
              </button>

              <button className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:scale-105 transition">
                <FaInstagram size={22} className="text-pink-500" />
              </button>

              <button className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center hover:scale-105 transition">
                <FiAtSign size={22} />
              </button>
            </div>
          </form>

          {/* FOOTER */}
          <p className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            {mode === 'login' ? (
              <>
                ¿No tienes una cuenta?{' '}
                <span
                  className="text-primary font-bold cursor-pointer"
                  onClick={() => setMode('register')}
                >
                  Crear cuenta
                </span>
              </>
            ) : (
              <>
                ¿Ya tienes una cuenta?{' '}
                <span
                  className="text-primary font-bold cursor-pointer"
                  onClick={() => setMode('login')}
                >
                  Iniciar sesión
                </span>
              </>
            )}
          </p>
        </div>
      </main>

      {/* DARK MODE BUTTON */}
      <button
        onClick={() => setDark(!dark)}
        className="fixed bottom-4 right-4 z-20 w-10 h-10 rounded-full bg-white dark:bg-zinc-900 shadow border flex items-center justify-center"
      >
        {dark ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
