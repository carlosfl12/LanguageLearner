"use client";

import { motion } from "framer-motion";

export const GrammarSection = ({ content } : { content: string}) => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20}}
        animate={{ opacity: 1, y: 0}}
        className="bg-white p-6 rounded-xl shadow-md"
        >
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Gramática</h2>
            <div
            className="prose max-w-none text-gray-700"
            dangerouslySetInnerHTML={{__html: content}}
            />
        </motion.div>
    );
};