'use client';

import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { useEffect } from 'react';
import { trackEvent } from '../lib/gameBridge';

interface RotateHintProps {
  isVisible: boolean;
}

export default function RotateHint({ isVisible }: RotateHintProps) {
  // Track when the orientation prompt is shown
  useEffect(() => {
    if (isVisible) {
      trackEvent('orientation_prompt');
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
      aria-live="assertive"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative max-w-sm w-full"
      >
        <div className="paper-card p-8 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <RotateCcw className="h-8 w-8 text-white" />
          </motion.div>
          
          <h2 className="text-2xl font-heading font-semibold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Rotate Your Device
          </h2>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            For the best experience playing Word Rivers, please rotate your device to landscape mode.
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                className="w-2 h-2 bg-indigo-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}