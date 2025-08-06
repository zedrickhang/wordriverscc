'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, Volume2, VolumeX, Play, Star, Trophy, Zap, Menu, X, Home, Gamepad2, Puzzle, Brain, Sparkles, Grid3X3 } from 'lucide-react';
import GameIframe from './components/GameIframe';
import RotateHint from './components/RotateHint';
import GameCard from './components/GameCard';
import { games } from './lib/games';
import Link from 'next/link';
export const runtime = "edge";
export default function HomePage() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Check device orientation
  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window !== 'undefined') {
        setIsPortrait(window.innerHeight > window.innerWidth);
      }
    };
    
    // Check on mount
    checkOrientation();
    
    // Listen for orientation changes
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    return () => {
      window.removeEventListener('resize', checkOrientation);
      window.removeEventListener('orientationchange', checkOrientation);
    };
  }, []);
  
  // Toggle mute state
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    // In a real implementation, we would send a message to the iframe
    const gameIframe = document.querySelector('iframe');
    if (gameIframe && gameIframe.contentWindow) {
      gameIframe.contentWindow.postMessage(
        { type: 'setMute', value: !isMuted },
        'https://html5.gamedistribution.com'
      );
    }
  };

  // Handle game load
  const handleGameLoad = () => {
    setIsGameLoaded(true);
  };

  // Game categories
  const gameCategories = [
    { id: 'all', name: 'All Games', icon: Home },
    { id: 'word', name: 'Word Games', icon: Gamepad2 },
    { id: 'puzzle', name: 'Puzzle Games', icon: Puzzle },
    { id: 'brain', name: 'Brain Games', icon: Brain },
    { id: 'casual', name: 'Casual Games', icon: Sparkles },
  ];

  // Filter games by category
  const getFilteredGames = () => {
    if (activeCategory === 'all') return games;
    
    const categoryMap: Record<string, string[]> = {
      'word': ['word-rivers', 'word-search', 'crossword', 'anagrams'],
      'puzzle': ['pin-master', 'block-blast-2048', 'logic-blast-explorer'],
      'brain': ['quiz-master', 'logic-blast-explorer', 'pin-master'],
      'casual': ['live-star-doll', 'toca-avatar-hospital'],
    };
    
    const categoryGames = categoryMap[activeCategory];
    if (!categoryGames) return [];
    
    return games.filter(game => categoryGames.includes(game.id));
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-300 via-indigo-200 to-purple-200"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 pt-6 px-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Play className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Word Rivers
              </h1>
              <p className="text-sm text-gray-600">Relaxing Word Puzzles</p>
            </div>
          </motion.div>
          
          <div className="flex items-center space-x-3">
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMute}
              className="p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
              aria-label={isMuted ? "Unmute game" : "Mute game"}
            >
              {isMuted ? (
                <VolumeX className="h-5 w-5 text-indigo-600" />
              ) : (
                <Volume2 className="h-5 w-5 text-indigo-600" />
              )}
            </motion.button>
            
            <motion.button 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleMobileMenu}
              className="md:hidden p-3 bg-white/20 backdrop-blur-md rounded-xl shadow-lg border border-white/30 hover:bg-white/30 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-indigo-600" />
              ) : (
                <Menu className="h-5 w-5 text-indigo-600" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Navigation Bar */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="relative z-10 px-4 py-4"
      >
        <div className="max-w-6xl mx-auto">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center space-x-2 bg-white/20 backdrop-blur-md rounded-2xl p-2 border border-white/30">
            {gameCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'bg-indigo-500 text-white shadow-lg'
                      : 'text-indigo-600 hover:bg-white/30'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{category.name}</span>
                </motion.button>
              );
            })}
            
            {/* All Games Link */}
            <Link href="/games-list">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 text-purple-600 hover:bg-white/30 border-l border-white/30 ml-2 pl-4"
              >
                <Grid3X3 className="w-4 h-4" />
                <span className="font-medium">All Games</span>
              </motion.div>
            </Link>

          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 overflow-hidden"
              >
                <div className="p-4 space-y-2">
                  {gameCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => {
                          setActiveCategory(category.id);
                          setIsMobileMenuOpen(false);
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          activeCategory === category.id
                            ? 'bg-indigo-500 text-white shadow-lg'
                            : 'text-indigo-600 hover:bg-white/30'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                        <span className="font-medium">{category.name}</span>
                      </motion.button>
                    );
                  })}
                  
                  {/* All Games Link */}
                  <Link href="/games-list">
                    <motion.div
                      onClick={() => setIsMobileMenuOpen(false)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 text-purple-600 hover:bg-white/30 border-t border-white/30 mt-2 pt-4"
                    >
                      <Grid3X3 className="w-5 h-5" />
                      <span className="font-medium">All Games</span>
                    </motion.div>
                  </Link>
                 
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* Game Section */}
      <section className="relative w-full h-screen flex items-center justify-center p-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative w-full max-w-6xl mx-auto"
        >
          {/* Game Container with Enhanced Styling */}
          <div className="relative rounded-[32px] overflow-hidden shadow-2xl border border-white/20 bg-white/10 backdrop-blur-sm">
            <GameIframe 
              src="/b/1.html" 
              onLoad={handleGameLoad}
            />
            
            {/* Loading Overlay */}
            <AnimatePresence>
              {!isGameLoaded && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/90 to-purple-600/90 backdrop-blur-sm flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full mx-auto mb-4"
                    />
                    <h3 className="text-xl font-heading mb-2">Loading Word Rivers...</h3>
                    <p className="text-white/80">Preparing your word adventure</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Rotate Device Hint */}
        <RotateHint isVisible={isPortrait} />
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Why Play Word Rivers?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Immerse yourself in a relaxing word puzzle experience designed to challenge your vocabulary while soothing your mind.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="paper-card p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-2xl mb-4">Instant Play</h3>
              <p className="text-gray-600">
                No downloads, no waiting. Jump straight into the word adventure with just one click.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="paper-card p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-2xl mb-4">Challenge Yourself</h3>
              <p className="text-gray-600">
                Beat your high scores, discover longer words, and unlock special achievements.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="paper-card p-8 text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-2xl mb-4">Relaxing Experience</h3>
              <p className="text-gray-600">
                Beautiful visuals and soothing gameplay perfect for unwinding and exercising your mind.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Details Section */}
      <section id="details" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="paper-card p-10 mb-20"
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              About Word Rivers
            </h2>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Info className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-heading text-2xl">Game Description</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  Word Rivers is a relaxing yet challenging word puzzle game where you swim through rivers of letters to form words. 
                  Connect adjacent letters to create words and clear the board. The longer the word, the higher your score!
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-heading text-2xl mb-4">Controls</h3>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span><strong>Mobile:</strong> Tap and drag to connect letters</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span><strong>Desktop:</strong> Click and drag with your mouse</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>Form words with 3 or more letters</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    <span>Special tiles give bonus points</span>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-heading text-2xl mb-4">Tips & Tricks</h3>
                <ul className="text-gray-700 space-y-3">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Look for longer words for higher scores</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Plan your moves to create chain reactions</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Use special tiles strategically</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Challenge yourself to beat your high score</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl mb-4 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {activeCategory === 'all' ? 'All Games' : gameCategories.find(cat => cat.id === activeCategory)?.name}
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              {activeCategory === 'all' 
                ? `Discover our collection of ${getFilteredGames().length} amazing games` 
                : `Explore ${getFilteredGames().length} ${gameCategories.find(cat => cat.id === activeCategory)?.name.toLowerCase()}`
              }
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {getFilteredGames().map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GameCard game={game} />
                </motion.div>
              ))}
            </div>
            
            {getFilteredGames().length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Gamepad2 className="w-12 h-12 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-heading text-gray-600 mb-2">No Games Available</h3>
                <p className="text-gray-500">No games found in this category. Please try another category.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-20 px-4 bg-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl mb-12 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <div className="space-y-6">
            {[
              {
                question: "Can I play Word Rivers on mobile?",
                answer: "Yes! Word Rivers is fully optimized for mobile play. For the best experience, we recommend playing in landscape mode on smaller devices."
              },
              {
                question: "Is Word Rivers free to play?",
                answer: "Absolutely! Word Rivers is completely free to play. No downloads or purchases required - just instant fun right in your browser."
              },
              {
                question: "How do I save my progress?",
                answer: "Your best scores are automatically saved to your device's local storage. As long as you use the same browser and don't clear your cache, your records will be preserved."
              }
            ].map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="paper-card p-8 hover:scale-[1.02] transition-transform duration-300"
              >
                <h3 className="font-heading text-2xl mb-4 text-indigo-600">{faq.question}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="paper-card p-8"
          >
            <h3 className="font-heading text-2xl mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Word Rivers
            </h3>
            <p className="text-gray-600 mb-4">A relaxing word puzzle game for vocabulary enthusiasts.</p>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Word Rivers. All rights reserved.</p>
            <div className="flex items-center gap-4 mt-2">
                {/* About Link */}
                <Link href="/about" rel="nofollow" className="flex items-center gap-1 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    <Info className="w-4 h-4"/>
                    <span className="font-medium">About</span>
                </Link>
                
                {/* Contact Link */}
                <Link href="/contact" rel="nofollow" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                    <span className="font-medium">Contact</span>
                </Link>
            </div>
          </motion.div>
        </div>
      </footer>
    </main>
  );
}