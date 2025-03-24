import { Navbar } from '@/components/Navbar';
import { getLessons } from '@/lib/firebase';
import { Lesson } from '@/lib/types';
import Link from 'next/link';

export default async function LessonsPage() {
  const lessons: Lesson[] = await getLessons();

  return (
    <div className='w-full bg-gray-600 p-4 shadow-lg'>
      <Navbar/>
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">📚 Available Lessons</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => {
            const xp = (lesson.words?.length || 0) * 10;
            const progress = Math.floor(Math.random() * 100); // Simulación de progreso

            return (
              <Link href={`/lessons/${lesson.id}`} key={lesson.id}>
                <div className="bg-white rounded-2xl shadow-lg p-5 hover:shadow-xl transition cursor-pointer border border-gray-100">
                  <h2 className="text-xl font-semibold mb-1">🧠 {lesson.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">{lesson.description}</p>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{progress}% completed</p>
                  </div>

                  {/* XP */}
                  <p className="text-sm font-medium text-purple-700">⭐ {xp} XP</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
