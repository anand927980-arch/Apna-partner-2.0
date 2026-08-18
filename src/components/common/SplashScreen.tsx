import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onFinish, 600); // Allow fade-out
    }, 2200);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-rose-500 via-rose-600 to-pink-700 text-white overflow-hidden"
        >
          {/* Floating background ambient elements */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 15, -15, 0] }}
              transition={{ repeat: Infinity, duration: 8 }}
              className="absolute top-1/4 left-10 text-white"
            >
              <Heart className="w-16 h-16 fill-white" />
            </motion.div>
            <motion.div
              animate={{ y: [15, -15, 15], rotate: [0, -20, 20, 0] }}
              transition={{ repeat: Infinity, duration: 10 }}
              className="absolute bottom-1/3 right-12 text-white"
            >
              <Heart className="w-20 h-20 fill-white" />
            </motion.div>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute top-1/3 right-1/4 text-amber-200"
            >
              <Sparkles className="w-12 h-12" />
            </motion.div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center z-10">
            {/* Animated Logo Container */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, type: 'spring', bounce: 0.4 }}
              className="mb-6 p-4 rounded-3xl bg-white/15 backdrop-blur-xl border border-white/30 shadow-2xl"
            >
              <BrandLogo size="xl" />
            </motion.div>

            {/* Tagline */}
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2"
            >
              “Apno se milne ka naya tareeka ❤️”
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-md mt-2"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-300" />
              <span>Jharkhand • Chatra District Edition</span>
            </motion.div>
          </div>

          {/* Bottom badge */}
          <div className="z-10 text-center pb-4">
            <p className="text-xs font-medium text-white/80">
              Strictly 18+ Verified • Safe & Respectful Community
            </p>
            <div className="flex justify-center gap-1.5 mt-3">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span className="w-2 h-2 rounded-full bg-white/60" />
              <span className="w-2 h-2 rounded-full bg-white/40" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
