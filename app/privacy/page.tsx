import { Metadata } from 'next';
import Link from 'next/link';

export const runtime = "edge";

export const metadata: Metadata = {
  title: 'Privacy Policy | Word Rivers',
  description: 'Learn about how Word Rivers protects your privacy and handles your data.',
  keywords: 'privacy policy, data protection, user privacy, Word Rivers',
};

export default function PrivacyPage() {
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
              <Link href="/about" className="text-gray-600 hover:text-indigo-600 transition-colors">
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Welcome to Word Rivers. We are committed to protecting your privacy and ensuring you have a positive experience on our website. This privacy policy outlines how we collect, use, and protect your information when you use our gaming platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
              <div className="text-gray-700 leading-relaxed">
                <h3 className="text-lg font-medium mb-2">Automatically Collected Information</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Browser type and version</li>
                  <li>Operating system</li>
                  <li>IP address (anonymized)</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website</li>
                </ul>
                
                <h3 className="text-lg font-medium mb-2">Game Data</h3>
                <ul className="list-disc pl-6 mb-4">
                  <li>Game scores and progress (stored locally on your device)</li>
                  <li>Game preferences and settings</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                <li>To provide and maintain our gaming services</li>
                <li>To improve our website and games</li>
                <li>To analyze usage patterns and optimize user experience</li>
                <li>To ensure the security and integrity of our platform</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Storage and Security</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Most of your game data is stored locally on your device using browser storage technologies. We do not store personal information on our servers unless explicitly provided by you. We implement appropriate security measures to protect against unauthorized access, alteration, disclosure, or destruction of your information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our website may use third-party analytics services to help us understand how our site is used. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We use cookies and similar tracking technologies to enhance your gaming experience, remember your preferences, and analyze site traffic. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our games are suitable for all ages. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 leading-relaxed">
                <li>Access the information we have about you</li>
                <li>Correct any inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of certain data collection practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you have any questions about this privacy policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  Email: privacy@wordrivers.com<br />
                  Or visit our <Link href="/contact" className="text-indigo-600 hover:text-indigo-700">Contact Us</Link> page.
                </p>
              </div>
            </section>
          </div>
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