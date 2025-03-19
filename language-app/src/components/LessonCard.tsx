import Link from "next/link";
import React from "react";
import { Lesson } from "@/lib/lessonsData";
import XPProgressBar from "./XPProgressBar";

type Props = { lesson: Lesson; unlocked: boolean};

export default function LessonCard({ lesson, unlocked }: Props) {
    const canAccess = lesson.completed || unlocked;

    return (
        <div 
        className={`p-4 rounded-2xl shadow-md flex flex-col items-start gap-2 border transition-transform ${canAccess ? "bg-white hover:scale-105" : "bg-gray-300 cursor-not-allowed opacity-60"}`}>
            <h2 className="text-xl font-bold">{lesson.title}</h2>
            <p className="text-sm text-gray-500">Level {lesson.level}</p>

            <XPProgressBar xp={lesson.xp} goal={50} />
            <button
            disabled={!canAccess}
            className={`mt-2 px-3 py-1 rounded text-black ${canAccess ? 'bg-blue 500 hover:bg-blue-600' : 'bg-gray-500'}`}
            >
                {lesson.completed ? 'Review' : canAccess ? 'Start' : 'Locked 🔒'}
            </button>
        </div>
    )
}