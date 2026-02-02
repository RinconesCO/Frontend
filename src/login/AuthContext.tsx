import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    bio?: string;
    instagram?: string;
    profileImage?: string;
    coverImage?: string;
    photos: string[];
    joinedDate: string;
    location?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: Partial<User> & { password: string }) => Promise<void>;
    logout: () => void;
    updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Cargar usuario desde localStorage al iniciar
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        const isLoggedIn = localStorage.getItem('isAuthenticated') === 'true';

        if (storedUser && isLoggedIn) {
            setUser(JSON.parse(storedUser));
            setIsAuthenticated(true);
        }
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // Aquí harías la llamada a tu API real
            // Por ahora, simulamos con localStorage
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const foundUser = users.find((u: any) => u.email === email && u.password === password);

            if (!foundUser) {
                throw new Error('Credenciales inválidas');
            }

            // Eliminar password antes de guardar en el estado
            const { password: _, ...userWithoutPassword } = foundUser;

            setUser(userWithoutPassword);
            setIsAuthenticated(true);
            localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
            localStorage.setItem('isAuthenticated', 'true');
        } catch (error) {
            throw error;
        }
    };

    const register = async (userData: Partial<User> & { password: string }) => {
        try {
            // Crear nuevo usuario
            const newUser: User = {
                id: Date.now().toString(),
                username: userData.username || '',
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                phone: userData.phone,
                bio: '',
                instagram: '',
                profileImage: '',
                coverImage: '',
                photos: [],
                joinedDate: new Date().toISOString(),
                location: 'Bogotá, Colombia'
            };

            // Guardar en "base de datos" (localStorage)
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            users.push({ ...newUser, password: userData.password });
            localStorage.setItem('registeredUsers', JSON.stringify(users));

            // NO auto-login después de registro, el usuario debe iniciar sesión manualmente
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('currentUser');
        localStorage.setItem('isAuthenticated', 'false');
    };

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...userData };
            setUser(updatedUser);
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            // También actualizar en la lista de usuarios registrados
            const users = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const updatedUsers = users.map((u: any) =>
                u.id === user.id ? { ...u, ...userData } : u
            );
            localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}