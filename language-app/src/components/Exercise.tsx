'use client';

import { useState } from 'react';
import { Word } from '../lib/types';

interface ExerciseProps {
  words: Word[];
}

const Exercise: React.FC<ExerciseProps> = ({ words }) => {
  const [selectedSpanish, setSelectedSpanish] = useState<string | null>(null);
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);

  const shuffle = (arr: string[]) => [...arr].sort(() => Math.random() - 0.5);

  const spanishWords = shuffle(words.map(word => word.es));
  const englishWords = shuffle(words.map(word => word.en));

  const handleSpanishClick = (word: string) => {
    setSelectedSpanish(word);
  };

  const handleEnglishClick = (word: string) => {
    setSelectedEnglish(word);
  };

  const checkAnswer = () => {
    const correctAnswer = words.find(word => word.es === selectedSpanish && word.en === selectedEnglish);
    if (correctAnswer) {
      setCorrect(true);
      setProgress((prev) => Math.min(prev + 1, words.length)); // Incrementamos progreso
    } else {
      setCorrect(false);
    }
    setDisabled(true);
  };

  const nextRound = () => {
    setSelectedSpanish(null);
    setSelectedEnglish(null);
    setCorrect(null);
    setDisabled(false);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Título */}
      <h2 className="text-2xl font-bold text-center mb-6">📝 Practice Matching</h2>

      {/* Barra de progreso */}
      <div className="mb-6">
        <div className="h-4 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${(progress / words.length) * 100}%` }}
          />
        </div>
        <p className="text-center mt-1 text-sm text-gray-600">{progress} / {words.length} correct matches</p>
      </div>

      {/* Carta principal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Columna Español */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4 text-center text-blue-700">Palabras Españolas</h3>
          <div className="flex flex-col gap-2 items-center">
            {spanishWords.map((word, index) => (
              <button
                key={index}
                onClick={() => handleSpanishClick(word)}
                disabled={disabled}
                className={`w-full px-4 py-2 rounded-lg border text-gray-600
                  ${selectedSpanish === word ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'} 
                  ${disabled && 'opacity-50 cursor-not-allowed'}`}
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        {/* Columna Inglés */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-lg font-semibold mb-4 text-center text-green-700">🇬🇧 English Words</h3>
          <div className="flex flex-col gap-2 items-center text-gray-600">
            {englishWords.map((word, index) => (
              <button
                key={index}
                onClick={() => handleEnglishClick(word)}
                disabled={disabled}
                className={`w-full px-4 py-2 rounded-lg border 
                  ${selectedEnglish === word ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-gray-200'} 
                  ${disabled && 'opacity-50 cursor-not-allowed'}`}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Acción y resultado */}
      <div className="mt-6 text-center">
        {!disabled ? (
          <button
            onClick={checkAnswer}
            className="px-6 py-3 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            ✅ Check Answer
          </button>
        ) : (
          <>
            <p className={`text-lg font-bold mt-4 ${correct ? 'text-green-600' : 'text-red-600'}`}>
              {correct ? '✅ Correct!' : '❌ Incorrect, try again!'}
            </p>
            <button
              onClick={nextRound}
              className="mt-4 px-6 py-3 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
            >
              🔄 Next
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Exercise;
