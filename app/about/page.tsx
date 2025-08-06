import { Metadata } from 'next';
import Link from 'next/link';
import { Users, Heart, Gamepad2, Target } from 'lucide-react';

export const runtime = "edge";

export const metadata: Metadata = {
  title: 'About Us | Word Rivers',
  description: 'Learn about the Word Rivers team and our mission to create engaging, educational games for everyone.',
  keywords: 'about us, team, Word Rivers, game developers, mission, vision',
};

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Lead Game Designer',
      description: 'Passionate about creating engaging word puzzles that challenge and delight players.',
      avatar: '👨‍💻'
    },
    {
      name: 'Sarah Johnson',
      role: 'Frontend Developer',
      description: 'Specializes in creating smooth, responsive gaming experiences across all devices.',
      avatar: '👩‍💻'
    },
    {
      name: 'Mike Rodriguez',
      role: 'UX Designer',
      description: 'Focuses on making our games intuitive and accessible for players of all ages.',
      avatar: '🎨'
    },
    {
      name: 'Emma Wilson',
      role: 'Content Creator',
      description: 'Crafts compelling game content and ensures our puzzles are both fun and educational.',
      avatar: '✍️'
    }
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Player-First',
      description: 'Every decision we make is centered around creating the best possible experience for our players.'
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-blue-500" />,
      title: 'Quality Gaming',
      description: 'We believe in creating high-quality games that are both entertaining and intellectually stimulating.'
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: 'Accessibility',
      description: 'Our games are designed to be accessible to everyone, regardless of age, skill level, or background.'
    },
    {
      icon: <Target className="w-8 h-8 text-purple-500" />,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what browser-based games can achieve.'
    }
  ];

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
                Home
              </Link>
              <Link href="/games-list" className="text-gray-600 hover:text-indigo-600 transition-colors">
                All Games
              </Link>
              <Link href="/about" className="text-indigo-600 font-medium">
                About
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Word Rivers
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're a passionate team of game developers, designers, and creators dedicated to bringing you the best free online gaming experience. Our mission is to create engaging, educational, and accessible games that bring joy to players around the world.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              To create high-quality, free-to-play games that challenge minds, spark creativity, and provide endless entertainment. We believe that great games should be accessible to everyone, regardless of their device or budget.
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our diverse team brings together expertise in game design, development, user experience, and content creation to deliver exceptional gaming experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-indigo-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              Word Rivers began as a simple idea: to create word games that are both challenging and relaxing. We noticed that many online games were either too simple or overly complicated, with few options that struck the perfect balance.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our team came together in 2024 with a shared vision of creating browser-based games that anyone could enjoy, anywhere, anytime. We started with Word Rivers, our flagship word puzzle game, and have since expanded our collection to include various puzzle and brain training games.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              What sets us apart is our commitment to quality and accessibility. All our games are:
            </p>
            <ul className="list-disc pl-6 text-gray-700 leading-relaxed mb-4">
              <li>Completely free to play</li>
              <li>No downloads or installations required</li>
              <li>Optimized for all devices and screen sizes</li>
              <li>Designed with accessibility in mind</li>
              <li>Regularly updated with new content and features</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              We're constantly working on new games and features, always listening to our community's feedback to improve and expand our offerings. Thank you for being part of our journey!
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="bg-indigo-600 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Have questions, suggestions, or just want to say hello? We'd love to hear from you!
          </p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-600 mb-4 md:mb-0">
              © 2024 Word Rivers. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-indigo-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}