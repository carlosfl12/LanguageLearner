"use client";

import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';

import Image from "next/image";
import { FeatureCard } from "@/components/FeatureCard";
import { Navbar } from "@/components/Navbar";
// import { LessonCard } from "@/components/LessonCard";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen">
        { /* NavBar */}
        <Navbar/>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-100 to-indigo-100 py-20 text-gray-800">
          <div className="container mx-auto text-center">
            <p className="text-xl text-gray-600 mb-8">
              Domina vocabulario, gramática y pronunciación con lecciones adaptativas.
            </p>
            <Link
              href={user ? "/lessons" : "/login"}
              className="bg-blue600 text-white px-8 py-3 rounded-lg text-lg hover:bg-blue-700">
                {user ? "Continuar aprendiendo": "Empieza gratis"}
              </Link>
          </div>
        </section>

        {/* <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Todas las lecciones</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <LessonCard
            level="A1"
            title="Saludos Básicos"
            progress={30}
            language="Inglés"
            />
            <LessonCard
            level="A2"
            title="Familia y Amigos"
            progress={65}
            language="Francés"
            />
          </div>
        </div> */}
        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
            title="Vocabulario Contextual"
            description="APrende palabras con ejemplos reales y flashcards interactivas."
            icon="📖"
            />
            <FeatureCard
            title="Gramática Visual"
            description="Diagramas y ejercicios para entender reglas facilmente."
            icon="📊"/>
            <FeatureCard
            title="Pronunciación AI"
            description="Graba tu voz y recibe feedback instantáneo."
            icon="🎤"/>
          </div>
        </section>
      </main>
  )
}


// return (
//   <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//     <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//       <Image
//         className="dark:invert"
//         src="/next.svg"
//         alt="Next.js logo"
//         width={180}
//         height={38}
//         priority
//       />
//       <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//         <li className="mb-2 tracking-[-.01em]">
//           Get started by editing{" "}
//           <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//             src/app/page.tsx
//           </code>
//           .
//         </li>
//         <li className="tracking-[-.01em]">
//           Save and see your changes instantly.
//         </li>
//       </ol>

//       <div className="flex gap-4 items-center flex-col sm:flex-row">
//         <a
//           className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//           href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             className="dark:invert"
//             src="/vercel.svg"
//             alt="Vercel logomark"
//             width={20}
//             height={20}
//           />
//           Deploy now
//         </a>
//         <a
//           className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//           href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Read our docs
//         </a>
//       </div>
//     </main>
//     <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//       <a
//         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//         href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <Image
//           aria-hidden
//           src="/file.svg"
//           alt="File icon"
//           width={16}
//           height={16}
//         />
//         Learn
//       </a>
//       <a
//         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//         href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <Image
//           aria-hidden
//           src="/window.svg"
//           alt="Window icon"
//           width={16}
//           height={16}
//         />
//         Examples
//       </a>
//       <a
//         className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//         href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//         target="_blank"
//         rel="noopener noreferrer"
//       >
//         <Image
//           aria-hidden
//           src="/globe.svg"
//           alt="Globe icon"
//           width={16}
//           height={16}
//         />
//         Go to nextjs.org →
//       </a>
//     </footer>
//   </div>
// );