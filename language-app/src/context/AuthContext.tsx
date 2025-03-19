"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { User, onAuthStateChanged } from 'firebase/auth';

// Tipo para el contexto
type AuthContextType = {
  user: User | null;
  loading: boolean; // Para saber si la autenticación está en proceso
};

// Crear el contexto con valores iniciales
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

// Proveedor del contexto
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Inicialmente en carga

  useEffect(() => {
    // Escuchar cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false); // Finaliza la carga
    });

    return () => unsubscribe(); // Limpiar al desmontar
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext);