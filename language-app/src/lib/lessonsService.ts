import { db } from "./firebase";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { ILesson } from "@/models/ILesson";

export const getAllLessons = async (): Promise<ILesson[]> => {
    const q = query(collection(db, "lessons"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data() } as ILesson));
};

export const getLessonById = async (id: string): Promise<ILesson | null> => {
    const docRef = doc(db, "lessons", id);
    const snapshot = await getDoc(docRef);
    return snapshot.exists() ? ({ id: snapshot.id, ...snapshot.data()} as ILesson) : null;
};