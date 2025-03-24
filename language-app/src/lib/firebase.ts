import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, updateDoc } from "firebase/firestore";
import { collection, doc, getDoc, getDocs, addDoc, setDoc } from "firebase/firestore";
import { Lesson } from "./types";



const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const getLessonById = async (id: string): Promise<Lesson | null> => {
    const docRef = doc(collection(db, "lessons"), id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return null;
    return { id: docSnap.id, ...docSnap.data() } as Lesson;
}


export const getLessons = async () => {
    const snapshot = await getDocs(collection(db, 'lessons'));
    const lessons = snapshot.docs.map((doc) => { 
        const data = doc.data();
        return {
            id: doc.id,
            title: data.title || "Untitled",
            description: data.description || "No description",
            words: data.words || [],
        };
    });
    return lessons
};

export const addLesson = async (lesson: Omit<Lesson, 'id'>) => {
    await addDoc(collection(db, 'lessons'), lesson);
};

export const createLessonWithNumericId = async (lesson:  Omit<Lesson, "id">) => {
    const counterRef = doc(db, "counters", "lessons");
    const counterSnap = await getDoc(counterRef);

    let newId = 1;
    if (counterSnap.exists()) {
        const data = counterSnap.data();
        newId = (data.currentId || 0) + 1;
        await updateDoc(counterRef, { currentId: newId});
    }
    else {
        await setDoc(counterRef, { currentId: 1});
    }

    const lessonRef = doc(db, 'lessons', String(newId));
    await setDoc(lessonRef, lesson);
    return newId
};