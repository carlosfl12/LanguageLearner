"use client"
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { generateLessons } from "@/lib/lessonGenerator";
import { Lesson } from "@/lib/types";
import Exercise from "@/components/Exercise";
import { Navbar } from "@/components/Navbar";
import { getLessonById } from "@/lib/firebase";
import Link from "next/link";

interface LessonPageProps {
    params: { id: string};
}

export default async function LessonPage({ params }: LessonPageProps) {
    const lesson: Lesson | null = await getLessonById(params.id)

    if (!lesson) {
        return <p className="text-center mt-10 text-gray-500">Lección no encontrada</p>;
    }

    return (
        <div className="w-full bg-gray-600 p-4 shadow-lg">
            <Navbar/>
            <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
                <h1 className="text-3xl font-bold text-purple-600 mb-4">{lesson.title}</h1>
                <p className="text-gray-700 mb-6">{lesson.description}</p>

                <Link
                href={`/lessons/${lesson.id}/exercise`}
                className="inline-block bg-purple-600 text-white px-4 pyt-2 rounded-xl hover:bg-purple-700 transition">
                    Iniciar ejercicio.
                </Link>
            </div>
        </div>
    )
}