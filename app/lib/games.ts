export interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  embedUrl: string;
}
export const runtime = "edge";
export const games: Game[] = [
  {
    id: 'word-rivers',
    title: 'Word Rivers',
    description: 'Swim through rivers of letters to form words and relax your mind.',
    imageUrl: '/og-word-rivers.svg',
    embedUrl: '/b/1.html',
  },
  {
    id: 'pin-master',
    title: 'Pin Master: Screw Puzzle Quest',
    description: 'Challenge your brain with intricate screw puzzle mechanics.',
    imageUrl: '/pin-master.svg',
    embedUrl: '/b/2.html',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Test your knowledge with challenging quiz questions.',
    imageUrl: '/quiz-master.svg',
    embedUrl: '/b/3.html',
  },
  {
    id: 'block-blast-2048',
    title: 'Block Blast 2048',
    description: 'Combine blocks and reach the ultimate 2048 goal.',
    imageUrl: '/block-blast-2048.jpg',
    embedUrl: '/b/4.html',
  },
  {
    id: 'live-star-doll',
    title: 'Live Star Doll Dress Up',
    description: 'Create stunning outfits and style your virtual doll.',
    imageUrl: '/live-star-doll.jpg',
    embedUrl: '/b/5.html',
  },
  {
    id: 'logic-blast-explorer',
    title: 'Logic Blast Explorer',
    description: 'Explore challenging logic puzzles and brain teasers.',
    imageUrl: '/logic-blast-explorer.svg',
    embedUrl: '/b/6.html',
  },
  {
    id: 'toca-avatar-hospital',
    title: 'Toca Avatar My Hospital',
    description: 'Manage your own hospital and take care of patients.',
    imageUrl: '/toca-avatar-hospital.svg',
    embedUrl: '/b/7.html',
  },
  {
    id: 'guess-the-italian-brainrot-animals',
    title: 'Game Title:Guess The Italian Brainrot Animals',
    description: 'Get ready for a wild and hilarious ride with Guess the Italian Brainrot Animals',
    imageUrl: '/guess-the-italian-brainrot-animals.jpg',
    embedUrl: '/b/8.html',
  },
  
    
];