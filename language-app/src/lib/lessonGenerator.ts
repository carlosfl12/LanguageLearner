import { Lesson } from "./types"

export const generateLessons = (): Lesson[] => {
  return [
    { id: "1",
      title: "Basic Greetings",
      description : "Aprende saludos básicos en inglés.",
      words : [
        { en: "Hello", es: "Hola"},
        { en: "Good morning", es: "Buenos días"},
        { en: "Good night", es: "Buenas noches"}
      ]
    }, 
    {
      id: '2',
      title: 'Food Vocabulary',
      description: 'Aprende vocabulario de comida en inglés.',
      words: [
        { es: 'Pan', en: 'Bread' },
        { es: 'Leche', en: 'Milk' },
        { es: 'Agua', en: 'Water' },
      ]
    },
  ]
}