export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  password2: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
}


const DEFAULT_API = 'http://127.0.0.1:8000';
const API_BASE_RAW = (import.meta as any).env?.VITE_API_URL ?? DEFAULT_API;
const API_BASE = API_BASE_RAW.replace(/\/+$/, '');

async function request(path: string, body: unknown) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path}`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      credentials: 'include',
    });
  } catch (err: any) {
    throw new Error(err?.message || 'Network error');
  }

  let data: any = null;
  try {
    data = await res.json();
  } catch (_) {
    try {
      data = await res.text();
    } catch (_) {
      data = null;
    }
  }
  function translateError(data: any, status: number) {
    if (!data) return `Error ${status}`;

    if (typeof data === 'string') {
      const s = data.toLowerCase();
      if (s.includes('invalid') && s.includes('credentials')) return 'Email o contraseña incorrectos.';
      if (s.includes('already') && s.includes('registered')) return 'El usuario ya está registrado.';
      if (s.includes('already') && s.includes('exists')) return 'El usuario ya existe.';
      return data;
    }

    if (typeof data === 'object') {
      if (data.message) return translateError(data.message, status);

      const parts: string[] = [];
      const pushField = (key: string, label?: string) => {
        if (data[key]) {
          if (Array.isArray(data[key])) parts.push((label ? label + ': ' : '') + data[key].join(' '));
          else parts.push((label ? label + ': ' : '') + String(data[key]));
        }
      };

      pushField('username', 'Usuario');
      pushField('email', 'Email');
      pushField('password', 'Contraseña');
      pushField('password2', 'Confirmación de contraseña');
      pushField('first_name', 'Nombre');
      pushField('last_name', 'Apellido');
      pushField('phone', 'Teléfono');
      pushField('non_field_errors');

      const combined = parts.join(' ').toLowerCase();
      if (combined.includes('already') || combined.includes('exist') || combined.includes('ya existe') || combined.includes('already registered')) {
        return 'El usuario ya existe o el email ya está registrado.';
      }

      if (combined.includes('password') && (combined.includes('weak') || combined.includes('too') || combined.includes('short') || combined.includes('common') || combined.includes('demasiado'))) {
        return 'La contraseña es demasiado débil. Usa una combinación de letras, números y símbolos.';
      }

      if (combined.includes('match') || combined.includes('mismatch') || combined.includes('no coincide') || combined.includes('coinciden')) {
        return 'Las contraseñas no coinciden.';
      }

      // Fallback: return joined messages (already in readable form)
      return parts.join(' ') || `Error ${status}`;
    }

    return `Error ${status}`;
  }

  if (!res.ok) {
    const translated = translateError(data, res.status);
    throw new Error(translated);
  }

  return data;
}

export const authService = {
  login: (payload: LoginPayload) => request('/api/auth/login/', payload),
  register: (payload: RegisterPayload) => request('/api/auth/register/', payload),
};

export default authService;
