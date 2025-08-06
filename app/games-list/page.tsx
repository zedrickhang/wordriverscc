import { Metadata } from 'next';
import { games } from '../lib/games';
import GamesListClient from './GamesListClient';

export const runtime = "edge";

export const metadata: Metadata = {
  title: 'All Games - Complete Collection of Free Online Games | Word Rivers',
  description: 'Discover our complete collection of free online games including word puzzles, brain training, casual games, and more. Play instantly in your browser without downloads.',
  keywords: [
    'free online games',
    'browser games',
    'word games',
    'puzzle games',
    'brain training games',
    'casual games',
    'no download games',
    'HTML5 games',
    'mobile games',
    'word puzzles',
    'crossword',
    'anagrams',
    'word search',
    'logic games',
    'quiz games',
    'block puzzle',
    'pin master',
    'toca games',
    'educational games',
    'family games'
  ].join(', '),
  openGraph: {
    title: 'All Games - Complete Collection of Free Online Games',
    description: 'Discover our complete collection of free online games including word puzzles, brain training, casual games, and more. Play instantly in your browser without downloads.',
    type: 'website',
    url: 'https://wordrivers.com/games-list',
    images: [
      {
        url: '/og-word-rivers.png',
        width: 1200,
        height: 630,
        alt: 'Word Rivers - Free Online Games Collection'
      }
    ],
    siteName: 'Word Rivers'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Games - Complete Collection of Free Online Games',
    description: 'Discover our complete collection of free online games including word puzzles, brain training, casual games, and more.',
    images: ['/og-word-rivers.png']
  },
  alternates: {
    canonical: 'https://wordrivers.com/games-list'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default function GamesListPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-purple-50">
      {/* SEO Content */}
      <div className="sr-only">
        <h1>Complete Collection of Free Online Games</h1>
        <p>
          Welcome to our comprehensive games library featuring {games.length} amazing free online games. 
          Our collection includes word games like Word Rivers, crossword puzzles, and anagrams; 
          brain training games such as Quiz Master and Logic Blast Explorer; 
          puzzle games including Pin Master and Block Blast 2048; 
          and casual games like Live Star Doll and Toca Avatar Hospital. 
          All games are free to play, require no downloads, and work perfectly in your browser on desktop and mobile devices.
        </p>
        <p>
          Whether you're looking for educational games to improve your vocabulary, 
          challenging puzzles to train your brain, or relaxing casual games for entertainment, 
          our curated selection has something for everyone. Each game is carefully selected 
          for quality, fun factor, and accessibility across all devices.
        </p>
      </div>
      
      <GamesListClient games={games} />
    </div>
  );
}

// Generate static params for better SEO
export async function generateStaticParams() {
  return [];
}