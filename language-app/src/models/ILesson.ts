export interface IVocabularyItem {
    word: string;
    translation: string;
    example: string;
    audioURL?: string;
}

export interface IExercise {
    type: "flashcard" | "multiple choice" | "drag-drop";
    question: string;
    options?: string[];
    correctAnswer: string;
}

export interface ILesson {
    id: string;
    language: "english" | "spanish";
    level: "A1" | "A2" | "B1";
    title: string;
    duration: number;
    content : {
        vocabulary: IVocabularyItem[];
        grammar: string;
        exercise: IExercise[];
    };
}