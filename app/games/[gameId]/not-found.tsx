import Link from 'next/link';

export default function GameNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        <div className="mb-8">
          <div className="text-6xl mb-4">🎮</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Game Not Found
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Sorry, the game you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
          >
            Browse All Games
          </Link>
          
          <div className="text-sm text-gray-500">
            <p>Or try one of these popular games:</p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Link
              href="/games/word-rivers"
              className="text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Word Rivers
            </Link>
            <Link
              href="/games/word-search"
              className="text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Word Search
            </Link>
            <Link
              href="/games/crossword"
              className="text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Daily Crossword
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}