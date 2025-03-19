"use client";
import { useEffect, useState } from 'react';
import { lessons } from '@/lib/lessonsData';
import { getUserProgress } from '@/lib/firestoreService';
import { useUserStore } from '@/store/useUserStore';
import LessonCard from '@/components/LessonCard';

export default function LessonsPage() {
  const userId = useUserStore((state) => state.userId);
  const [userProgress, setUserProgress] = useState<any>({});

  useEffect(() => {
    if (userId) {
      getUserProgress(userId).then((progress) => {
        if (progress) setUserProgress(progress.lessons);
      });
    }
  }, [userId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Lessons 📚</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => {
          const unlocked = index === 0 || userProgress[lessons[index - 1].id]?.completed;
          const progressXP = userProgress[lesson.id]?.xp || 0;
          const completed = userProgress[lesson.id]?.completed || false;

          return (
            <LessonCard
              key={lesson.id}
              lesson={{ ...lesson, xp: progressXP, completed }}
              unlocked={unlocked}
            />
          );
        })}
      </div>
    </div>
  );
}
