// src/lib/types.ts
export type Word = {
    es: string;
    en: string;
  };
  
  export type Lesson = {
    id: string;
    title: string;
    description: string;
    words: Word[];
  };
  