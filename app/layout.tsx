import type { Metadata } from 'next';
import './styles/globals.css';

export const metadata: Metadata = {
  title: 'Play Word Rivers Online – Free HTML5 Word Puzzle',
  description: 'Swim through rivers of letters to form words and relax your mind. Play instantly—no download needed!',
  keywords: 'word game, word puzzle, free online game, word rivers, vocabulary game',
  openGraph: {
    title: 'Play Word Rivers Online – Free HTML5 Word Puzzle',
    description: 'Swim through rivers of letters to form words and relax your mind. Play instantly—no download needed!',
    images: ['/og-word-rivers.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Play Word Rivers Online – Free HTML5 Word Puzzle',
    description: 'Swim through rivers of letters to form words and relax your mind. Play instantly—no download needed!',
    images: ['/og-word-rivers.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Schema.org markup for VideoGame */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'VideoGame',
              name: 'Word Rivers',
              description: 'Swim through rivers of letters to form words and relax your mind.',
              genre: ['Word', 'Puzzle'],
              gamePlatform: ['Web Browser', 'Mobile Browser'],
              applicationCategory: 'Game',
              operatingSystem: ['Windows', 'macOS', 'iOS', 'Android'],
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
              },
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}