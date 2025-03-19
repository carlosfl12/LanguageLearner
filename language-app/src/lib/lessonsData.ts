export interface Lesson {
    id: string;
    title: string;
    level: number;
    completed: boolean;
    xp: number;
}

export const lessons: Lesson[] = [
    {id: "1", title: "Basics 1", level: 1, completed: true, xp: 50},
    {id: "2", title: "Greetings", level: 2, completed: false, xp: 0},
    {id: "3", title: "Food", level: 3, completed: false, xp: 0}
]