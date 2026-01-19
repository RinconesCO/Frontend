import { useState, FormEvent } from 'react';
import authService from '../Services/authservice';

type Mode = 'login' | 'register';

interface Options {
  onLoginSuccess?: () => void;
  onRegisterSuccess?: () => void;
}

export function useAuthForm(mode: Mode, options?: Options) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (mode === 'register') {
      if (!username || !email || !password || !confirmPassword || !firstName || !lastName) {
        setError('Por favor completa los campos obligatorios de registro.');
        return;
      }
    } else {
      if (!email || !password) {
        setError('Por favor completa los campos obligatorios.');
        return;
      }
    }

    if (mode === 'register' && password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        const res = await authService.login({ email, password });

        // determine username from response (common shapes)
        const foundUsername = res?.username || res?.user?.username || res?.user?.email || res?.email || email;
        try {
          localStorage.setItem('bogospots_username', String(foundUsername));
        } catch (_) {}

        try {
          window.dispatchEvent(new CustomEvent('bogospots:login', { detail: { username: foundUsername } }));
        } catch (_) {}

        if (options?.onLoginSuccess) {
          options.onLoginSuccess();
        } else {
          window.location.href = '/';
        }
      } else {
        await authService.register({
          username,
          password,
          password2: confirmPassword,
          email,
          first_name: firstName,
          last_name: lastName,
          phone: phone || undefined,
        });
        setSuccess('Registro exitoso. Ya puedes iniciar sesión.');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setUsername('');
        setFirstName('');
        setLastName('');
        setPhone('');
        if (options?.onRegisterSuccess) options.onRegisterSuccess();
      }
    } catch (err: any) {
      setError(err?.message || 'Request error');
    } finally {
      setLoading(false);
    }
  };

  return {
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
  } as const;
}

export default useAuthForm;
