import { useAuth } from '@/context/AuthContext';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';

export const LoginForm = () => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const { loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>; // Mientras verifica la autenticación
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <button 
        onClick={() => signInWithGoogle()}
        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 w-full"
      >
        Continuar con Google
      </button>
    </div>
  );
};