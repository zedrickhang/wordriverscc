'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Grid, List, Star, Clock, Gamepad2, ArrowLeft, SortAsc, SortDesc } from 'lucide-react';
import Link from 'next/link';
import GameCard from '../components/GameCard';
import { Game } from '../lib/games';

interface GamesListClientProps {
  games: Game[];
}

type SortOption = 'name' | 'category' | 'rating';
type ViewMode = 'grid' | 'list';

const categories = [
  { id: 'all', name: 'All Games', count: 0 },
  { id: 'word', name: 'Word Games', count: 0 },
  { id: 'puzzle', name: 'Puzzle Games', count: 0 },
  { id: 'brain', name: 'Brain Training', count: 0 },
  { id: 'casual', name: 'Casual Games', count: 0 },
];

export default function GamesListClient({ games }: GamesListClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Category mapping
  const categoryMap: Record<string, string[]> = {
    'word': ['word-rivers', 'word-search', 'crossword', 'anagrams'],
    'puzzle': ['pin-master', 'block-blast-2048', 'logic-blast-explorer'],
    'brain': ['quiz-master', 'logic-blast-explorer', 'pin-master'],
    'casual': ['live-star-doll', 'toca-avatar-hospital'],
  };

  // Update category counts
  const categoriesWithCounts = useMemo(() => {
    const counts = [...categories];
    counts[0].count = games.length; // All games
    
    Object.entries(categoryMap).forEach(([categoryId, gameIds]) => {
      const categoryIndex = counts.findIndex(cat => cat.id === categoryId);
      if (categoryIndex !== -1) {
        counts[categoryIndex].count = gameIds.length;
      }
    });
    
    return counts;
  }, [games]);

  // Filter and sort games
  const filteredAndSortedGames = useMemo(() => {
    let filtered = games;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        game.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      const categoryGames = categoryMap[selectedCategory] || [];
      filtered = filtered.filter(game => categoryGames.includes(game.id));
    }

    // Sort games
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'name':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'category':
          // Find category for each game
          const getCategoryName = (gameId: string) => {
            for (const [catId, gameIds] of Object.entries(categoryMap)) {
              if (gameIds.includes(gameId)) {
                return categoriesWithCounts.find(cat => cat.id === catId)?.name || 'Other';
              }
            }
            return 'Other';
          };
          comparison = getCategoryName(a.id).localeCompare(getCategoryName(b.id));
          break;
        case 'rating':
          // Simulate rating based on game popularity (you can replace with actual ratings)
          const getRating = (gameId: string) => {
            const ratings: Record<string, number> = {
              'word-rivers': 4.8,
              'quiz-master': 4.7,
              'block-blast-2048': 4.6,
              'pin-master': 4.5,
              'word-search': 4.4,
              'crossword': 4.3,
              'logic-blast-explorer': 4.2,
              'anagrams': 4.1,
              'live-star-doll': 4.0,
              'toca-avatar-hospital': 3.9,
            };
            return ratings[gameId] || 4.0;
          };
          comparison = getRating(b.id) - getRating(a.id); // Higher rating first
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [games, searchTerm, selectedCategory, sortBy, sortOrder, categoryMap, categoriesWithCounts]);

  const toggleSort = (option: SortOption) => {
    if (sortBy === option) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(option);
      setSortOrder('asc');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <Link href="/" className="hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">All Games</span>
          </div>

          {/* Title and Stats */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                All Games
              </h1>
              <p className="text-gray-600">
                Discover our complete collection of {games.length} free online games
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search games..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center justify-center space-x-2 px-4 py-3 bg-white/50 border border-white/30 rounded-xl hover:bg-white/70 transition-all"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/30">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                {categoriesWithCounts.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Options */}
            <div className="bg-white/60 backdrop-blur-md rounded-xl p-6 border border-white/30">
              <h3 className="font-semibold text-gray-900 mb-4">Sort By</h3>
              <div className="space-y-2">
                {[
                  { key: 'name' as SortOption, label: 'Name' },
                  { key: 'category' as SortOption, label: 'Category' },
                  { key: 'rating' as SortOption, label: 'Rating' },
                ].map((option) => (
                  <button
                    key={option.key}
                    onClick={() => toggleSort(option.key)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all ${
                      sortBy === option.key
                        ? 'bg-indigo-100 text-indigo-700 border border-indigo-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{option.label}</span>
                    {sortBy === option.key && (
                      sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Games Grid/List */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredAndSortedGames.length} of {games.length} games
                {searchTerm && ` for "${searchTerm}"`}
                {selectedCategory !== 'all' && ` in ${categoriesWithCounts.find(cat => cat.id === selectedCategory)?.name}`}
              </p>
            </div>

            {/* Games Display */}
            <AnimatePresence mode="wait">
              {filteredAndSortedGames.length > 0 ? (
                <motion.div
                  key={`${viewMode}-${selectedCategory}-${searchTerm}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-4'
                  }
                >
                  {filteredAndSortedGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className={viewMode === 'list' ? 'w-full' : ''}
                    >
                      <GameCard game={game} viewMode={viewMode} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Gamepad2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No games found</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm 
                      ? `No games match "${searchTerm}". Try a different search term.`
                      : 'No games in this category. Try selecting a different category.'
                    }
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Show All Games
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SEO Footer Content */}
      <div className="bg-white/60 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Word Games</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Challenge your vocabulary with our collection of word games including Word Rivers, 
                crossword puzzles, word search, and anagrams. Perfect for improving language skills 
                and mental agility.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Puzzle Games</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Exercise your problem-solving skills with engaging puzzle games like Pin Master, 
                Block Blast 2048, and Logic Blast Explorer. Great for developing logical thinking 
                and spatial awareness.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Casual Games</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Relax and have fun with our casual games including Live Star Doll and 
                Toca Avatar Hospital. Perfect for unwinding and creative expression.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}