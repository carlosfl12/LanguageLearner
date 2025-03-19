"use client";

import { motion } from "framer-motion"
import { IExercise } from "@/models/ILesson";
import { useState } from "react";

export const MultipleChoiceExercise = ({
    exercise,
    onComplete
}: {
    exercise: IExercise;
    onComplete: (success: boolean) => void;
}) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
    const [showFeedback, setShowFeedback] = useState(false);

    const handleAnswer = (answer: string) => {
        setSelectedAnswer(answer);
        setShowFeedback(true);

        setTimeout(() => {
            onComplete(answer === exercise.correctAnswer);
            setShowFeedback(false)
            setSelectedAnswer(null);
        }, 2000)
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">{exercise.question}</h3>

            <div className="grid gap-3">
                {exercise.options?.map((option, index) => (
                    <motion.button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    whileHover={{ scale: 1.02}}
                    whileTap={{ scale: 0.98}}
                    className={`p-4 text-left rounded-lg border transition-colors
                        ${selectedAnswer === option ? option === exercise.correctAnswer
                          ? "bg-green-100 border-green-400"
                          : "bg-red-100 border-red-400"
                          : "bg-gray-50 border-gray-200 hover:bg-blue50"  
                    }${showFeedback && option === exercise.correctAnswer ? "ring-2 ring-blue-500": ""}`}
                    disabled = {showFeedback}>
                        {option}
                    </motion.button>
                ))}
            </div>
            {showFeedback && (
                <motion.div
                initial={{ opacity: 0}}
                animate={{ opacity: 1}}
                className={`mt-4 p-3 rounded-lg ${
                    selectedAnswer === exercise.correctAnswer
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}>
                    {selectedAnswer === exercise.correctAnswer
                    ? "¡Correcto! 🎉"
                    : `Respuesta correcta: ${exercise.correctAnswer}`}
                </motion.div>
            )};
        </div>
    );
};