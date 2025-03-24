'use client';
import { Lesson } from '@/lib/types';
import { getLessonById } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/Navbar';
import { auth, db} from "@/lib/firebase"
import { doc, setDoc, getDoc} from "firebase/firestore"
import { onAuthStateChanged, User } from '@firebase/auth';

export default function ExercisePage() {
    const { id } = useParams();
    const [lesson, setLesson] = useState<Lesson | null>(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [user, setUser] = useState<User | null>(null);

    // Detect user auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
        });
        return () => unsubscribe();
    }, []);

    // Get lesson by ID
    useEffect(() => {
        const fetchLesson = async () => {
        const data = await getLessonById(String(id));
        if (data) setLesson(data);
        };
        fetchLesson();
    }, [id]);

    // Save XP
    useEffect(() => {
        const saveProgress = async () => {
            if (user && showResult) {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);
                const prevXP = userSnap.exists() ? userSnap.data().xp || 0 : 0;
                const gainedXP = score * 10;

                await setDoc(
                    userRef,
                    {
                        xp: prevXP + gainedXP,
                    },
                    { merge: true}
                )
            }
        }
        saveProgress();
    }, [showResult, user, score])

    if (!lesson) {
        return <p className="text-center mt-10 text-gray-500">Cargando lección...</p>;
    }

    const currentWord = lesson.words[currentIndex];

    const handleAnswer = (selected: string) => {
        if (selected === currentWord.en) {
        setScore((prev) => prev + 1);
        }

        if (currentIndex + 1 < lesson.words.length) {
        setCurrentIndex((prev) => prev + 1);
        } else {
        setShowResult(true);
        }
    };

    const generateOptions = () => {
        const options = [currentWord.en];
        while (options.length < 4 && lesson.words.length >= 4) {
        const randomWord = lesson.words[Math.floor(Math.random() * lesson.words.length)].en;
        if (!options.includes(randomWord)) {
            options.push(randomWord);
        }
        }
        return options.sort(() => Math.random() - 0.5); // Shuffle
    };

    return (
        <div className="w-full bg-gray-600 p-4 shadow-lg">
                <Navbar/>
            <div className="w-full max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
            <h1 className="text-2xl font-bold mb-4 text-purple-600">{lesson.title} - Ejercicio</h1>

            {!showResult ? (
                <>
                <p className="text-lg mb-4">
                    Traduce: <span className="font-semibold">{currentWord.es}</span>
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {generateOptions().map((option, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(option)}
                        className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-4 py-2 rounded-xl transition"
                    >
                        {option}
                    </button>
                    ))}
                </div>

                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                    className="h-full bg-purple-500 transition-all"
                    style={{
                        width: `${((currentIndex + 1) / lesson.words.length) * 100}%`,
                    }}
                    ></div>
                </div>
                </>
            ) : (
                <div className="text-center">
                <h2 className="text-2xl font-bold mb-4 text-green-600">¡Completado!</h2>
                <p>
                    Puntuación: {score} / {lesson.words.length}
                </p>
                <p className="mt-2 text-purple-600 font-semibold">
                    Ganaste {score * 10} XP 🎉
                </p>
                </div>
            )}
            </div>
        </div>
    );
}
