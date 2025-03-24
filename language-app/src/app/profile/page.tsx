'use client';
import { useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Navbar } from '@/components/Navbar';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [xp, setXp] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setXp(data.xp || 0);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Cargando perfil...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10 text-red-500">No estás logueado.</p>;
  }

  return (
    <div className="w-full bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
        <h1 className="text-3xl font-bold text-purple-600 mb-4">Perfil del Usuario</h1>
        <p className="text-lg text-gray-800 mb-2">
          <span className="font-semibold">Nombre:</span> {user.displayName || 'No disponible'}
        </p>
        <p className="text-lg text-gray-800 mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p className="text-lg text-purple-700 mt-4">
          <span className="font-bold">Experiencia (XP):</span> {xp} XP ✨
        </p>
      </div>
    </div>
  );
}
