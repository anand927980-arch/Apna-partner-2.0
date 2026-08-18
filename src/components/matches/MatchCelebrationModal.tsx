import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Heart, Sparkles, X, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';

export const MatchCelebrationModal: React.FC = () => {
  const {
    isMatchModalOpen,
    closeMatchModal,
    recentMatchedProfile,
    currentUser,
    matches,
    setActiveChatMatchId,
    setActiveTab,
  } = useApp();

  useEffect(() => {
    if (isMatchModalOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#FF3366', '#FF5E3A', '#FFD700', '#38BDF8'],
        });
      } catch (e) {}
    }
  }, [isMatchModalOpen]);

  if (!isMatchModalOpen || !recentMatchedProfile || !currentUser) return null;

  // Find match ID for chat navigation
  const matchRecord = matches.find(m => m.userIds.includes(recentMatchedProfile.id));

  const handleStartChat = () => {
    if (matchRecord) {
      setActiveChatMatchId(matchRecord.id);
      setActiveTab('matches');
    }
    closeMatchModal();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.4 }}
          className="relative w-full max-w-sm bg-gradient-to-b from-stone-900 via-stone-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-500/30 text-center overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={closeMatchModal}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-white bg-black/40 backdrop-blur-xs"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Glowing Animated Headline */}
          <div className="mb-6">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-flex items-center justify-center p-2 rounded-full bg-rose-500/20 text-rose-400 mb-2"
            >
              <Heart className="w-8 h-8 fill-rose-500" />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md">
              It's a Match!
            </h2>
            <p className="text-xs text-rose-300 font-medium mt-1">
              You and {recentMatchedProfile.name} liked each other
            </p>
          </div>

          {/* Intersecting Dual Portrait Circles */}
          <div className="relative flex items-center justify-center my-8">
            {/* User 1 (Current) */}
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: -15, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-28 h-28 rounded-full ring-4 ring-rose-500 shadow-xl overflow-hidden z-10"
            >
              <img
                src={currentUser.photoURL}
                alt={currentUser.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* User 2 (Matched) */}
            <motion.div
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 15, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-28 h-28 rounded-full ring-4 ring-pink-500 shadow-xl overflow-hidden"
            >
              <img
                src={recentMatchedProfile.photoURL}
                alt={recentMatchedProfile.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Center Heart Emblem */}
            <div className="absolute z-20 w-10 h-10 rounded-full bg-white text-rose-600 flex items-center justify-center shadow-lg transform -translate-y-1">
              <Heart className="w-5 h-5 fill-rose-600 animate-pulse" />
            </div>
          </div>

          {/* Location Badge */}
          <div className="flex items-center justify-center gap-1.5 text-xs text-stone-300 mb-6 font-semibold">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>
              Connected in {recentMatchedProfile.district}, Jharkhand
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-2.5">
            <button
              onClick={handleStartChat}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center gap-2 transition-all transform hover:scale-102"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Say Hello to {recentMatchedProfile.name}</span>
            </button>

            <button
              onClick={closeMatchModal}
              className="w-full py-3 px-4 rounded-2xl border border-stone-700 text-stone-300 font-semibold text-xs hover:bg-stone-800 transition-colors"
            >
              Keep Swiping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
