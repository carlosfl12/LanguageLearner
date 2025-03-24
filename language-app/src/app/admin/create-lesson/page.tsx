'use client';

import { useState } from 'react';
import { addLesson, createLessonWithNumericId } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const CreateLessonPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [words, setWords] = useState([{ es: '', en: '' }]);
  const router = useRouter();

  const handleAddWord = () => {
    setWords([...words, { es: '', en: '' }]);
  };

  const handleChangeWord = (index: number, field: 'es' | 'en', value: string) => {
    const updatedWords = [...words];
    updatedWords[index][field] = value;
    setWords(updatedWords);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createLessonWithNumericId({ title, description, words });
    router.push('/lessons');
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📘 Create New Lesson</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
          required
        />
        <div>
          <h2 className="font-semibold mb-2">Words:</h2>
          {words.map((word, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Español"
                value={word.es}
                onChange={(e) => handleChangeWord(index, 'es', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-1"
                required
              />
              <input
                type="text"
                placeholder="English"
                value={word.en}
                onChange={(e) => handleChangeWord(index, 'en', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-3 py-1"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddWord}
            className="text-sm text-purple-600 hover:underline"
          >
            ➕ Add Word
          </button>
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          💾 Save Lesson
        </button>
      </form>
    </div>
  );
};

export default CreateLessonPage;
