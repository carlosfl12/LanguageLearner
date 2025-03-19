import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export const getUserProgress = async (userId: string) => {
    const docRef = doc(db, 'progress', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }
    return null;
};

export const saveUserProgress = async (userId: string, progressData: any) => {
    const docRef = doc(db, 'progress', userId);
    await setDoc(docRef, progressData);
};

export const updateLessonXP = async (userId: string, lessonId: string, xp: number) => {
    const docRef = doc(db, 'progress', userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const currentData = docSnap.data();
        currentData.lessons[lessonId] = {completed: true, xp};
        await updateDoc(docRef, { lessons: currentData.lessons});
    }
};