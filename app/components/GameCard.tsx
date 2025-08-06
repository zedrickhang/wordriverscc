'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { Game } from '../lib/games';

interface GameCardProps {
  game: Game;
  viewMode?: 'grid' | 'list';
}

export default function GameCard({ game, viewMode = 'grid' }: GameCardProps) {
  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group relative overflow-hidden rounded-xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Link href={`/games/${game.id}`} className="block">
          <div className="flex items-center p-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={game.imageUrl}
                alt={game.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            <div className="ml-4 flex-1">
              <h3 className="font-heading text-lg font-semibold mb-1 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
                {game.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                {game.description}
              </p>
            </div>
            
            <div className="ml-4 flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors duration-300">
                <Play className="w-5 h-5 text-indigo-600 ml-0.5" />
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/games/${game.id}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={game.imageUrl}
            alt={game.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent, transparent)'}}></div>
          
          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{backgroundColor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)'}}>
              <Play className="w-8 h-8 text-indigo-600 ml-1" />
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-heading text-xl font-semibold mb-2 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300">
            {game.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            {game.description}
          </p>
          
          {/* Hover indicator */}
          <div className="mt-4 flex items-center text-indigo-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Play Now</span>
            <motion.div
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              className="ml-2"
            >
              →
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}