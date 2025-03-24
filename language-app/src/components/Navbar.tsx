"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export const Navbar = () => {
    const { user, loading} = useAuth();

    return (
        <nav className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    LangLearn
                </Link>
                <div className="flex items-center space-x-4">
                    <Link href="/lessons" className="text-gray-600 hover:text-blue-600">
                        Lecciones
                    </Link>
                    {!loading && ( user ? (<Link href="/profile" className="bg-blue-100 text-blue-600 px-4 py-2 rounded-l">
                        {user.displayName || "Mi cuenta"}
                    </Link>) : (
                        <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                            Iniciar Sesión
                        </Link>
                    ) 
                )}
                
                </div>
            </div>
        </nav>
    )
}