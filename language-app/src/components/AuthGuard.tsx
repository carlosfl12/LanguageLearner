import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";

export const AuthGuard = ({children} : { children: React.ReactNode}) => {
    const { user, loading} = useAuth();
    const router = useRouter();


    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || user) {
        return <div>Cargando...</div>;
    }

    return<>{children}</>
}