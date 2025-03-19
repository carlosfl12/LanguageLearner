"use client";
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const FlashcardsSection = ({ }) => {
    const [currentCard, setCurrentCard] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className='flex flex-col items-center'>
            <AnimatePresence mode='wait'>
                <motion.div
                key={currentCard + (isFlipped ? "-flipped" : "")}
                initial={{ rotateY: 0}}
                animate={{ rotateY: isFlipped ? 180 : 0}}
                exit= {{ opacity: 0}}
                transition={{ duration: 0.6}}
                onClick={() => setIsFlipped(!isFlipped)}
                className='w-full max-w-md h-64 bg-white rounded-xl shadow-lg p-6 cursor-pointer'
                style={{ perspective:1000}}></motion.div>
            </AnimatePresence>
        </div>
    )
}