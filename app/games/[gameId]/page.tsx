import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { games } from '../../lib/games';
import GameIframe from '../../components/GameIframe';
import Link from 'next/link';

export const runtime = "edge";

interface GamePageProps {
  params: {
    gameId: string;
  };
}

export async function generateMetadata({ params }: GamePageProps): Promise<Metadata> {
  const game = games.find(g => g.id === params.gameId);
  
  if (!game) {
    return {
      title: 'Game Not Found | Word Rivers',
      description: 'The requested game could not be found.',
    };
  }

  return {
    title: `${game.title} - Play Free Online | Word Rivers`,
    description: `${game.description} Play ${game.title} for free online. Enjoy this amazing ${game.title.toLowerCase()} game with no downloads required. Start playing ${game.title} now!`,
    keywords: `${game.title}, ${game.title.toLowerCase()}, free online games, browser games, ${game.title} game, play ${game.title}, ${game.title} online, word games, puzzle games, brain games`,
    openGraph: {
      title: `${game.title} - Play Free Online`,
      description: game.description,
      images: [game.imageUrl],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.title} - Play Free Online`,
      description: game.description,
      images: [game.imageUrl],
    },
  };
}

export async function generateStaticParams() {
  return games.map((game) => ({
    gameId: game.id,
  }));
}

export default function GamePage({ params }: GamePageProps) {
  const game = games.find(g => g.id === params.gameId);

  if (!game) {
    notFound();
  }

  const relatedGames = games.filter(g => g.id !== game.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              Word Rivers
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
                All Games
              </Link>
              <Link href="/#word-games" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Word Games
              </Link>
              <Link href="/#puzzle-games" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Puzzle Games
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Game Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-indigo-600 transition-colors">
                Home
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium">{game.title}</span>
            </li>
          </ol>
        </nav>

        {/* Game Title and Description */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Play {game.title} Free Online
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {game.description} Experience the best {game.title.toLowerCase()} gameplay right in your browser. 
            No downloads required - start playing {game.title} instantly!
          </p>
          
          {/* Game Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
              Free Online Game
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Browser Game
            </span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              No Download
            </span>
            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              {game.title}
            </span>
          </div>
        </div>

        {/* Game Container */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="aspect-video w-full">
            <GameIframe 
              src={game.embedUrl} 
              title={`Play ${game.title} - Free Online Game`}
              className="w-full h-full"
            />
          </div>
        </div>

        {/* Game Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About {game.title}
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                {game.title} is an exciting online game that you can play for free right in your browser. 
                This {game.title.toLowerCase()} game offers hours of entertainment without requiring any downloads or installations.
              </p>
              <p>
                Whether you're looking for a quick gaming session or want to dive deep into {game.title}, 
                this game provides the perfect balance of challenge and fun. Play {game.title} anytime, anywhere!
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              How to Play {game.title}
            </h2>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <p>Click the play button to start {game.title}</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <p>Follow the on-screen instructions in {game.title}</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <p>Enjoy playing {game.title} and have fun!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Games */}
        {relatedGames.length > 0 && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              More Games Like {game.title}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedGames.map((relatedGame) => (
                <Link
                  key={relatedGame.id}
                  href={`/games/${relatedGame.id}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <div className="text-4xl">🎮</div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      {relatedGame.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {relatedGame.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center text-indigo-600 text-sm font-medium group-hover:text-indigo-700">
                        Play Now
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* SEO Content */}
        <section className="bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Play {game.title} Online?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Free {game.title} Game
              </h3>
              <p className="text-gray-600 mb-4">
                Play {game.title} completely free without any hidden costs. This {game.title.toLowerCase()} game 
                is available 24/7 and doesn't require any registration or payment to enjoy.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Instant {game.title} Access
              </h3>
              <p className="text-gray-600 mb-4">
                Start playing {game.title} immediately in your web browser. No downloads, no installations - 
                just click and play {game.title} right away!
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Cross-Platform {game.title}
              </h3>
              <p className="text-gray-600 mb-4">
                Enjoy {game.title} on any device - desktop, tablet, or mobile. This {game.title.toLowerCase()} game 
                works perfectly across all platforms and screen sizes.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Safe {game.title} Gaming
              </h3>
              <p className="text-gray-600 mb-4">
                Play {game.title} in a secure environment. Our platform ensures safe gaming with no malware 
                or unwanted downloads when you play {game.title}.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Word Rivers</h3>
              <p className="text-gray-300">
                Your destination for free online games. Play {game.title} and discover hundreds of other amazing games.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/" className="hover:text-white transition-colors">All Games</Link></li>
                <li><Link href="/#word-games" className="hover:text-white transition-colors">Word Games</Link></li>
                <li><Link href="/#puzzle-games" className="hover:text-white transition-colors">Puzzle Games</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Popular Games</h3>
              <ul className="space-y-2 text-gray-300">
                {games.slice(0, 3).map((popularGame) => (
                  <li key={popularGame.id}>
                    <Link href={`/games/${popularGame.id}`} className="hover:text-white transition-colors">
                      {popularGame.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Word Rivers. All rights reserved. Play {game.title} and more free online games.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}