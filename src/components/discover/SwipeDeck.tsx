import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import {
  Heart,
  X,
  Star,
  RotateCcw,
  Sparkles,
  Info,
  MapPin,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Volume2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserProfile, SwipeType } from '../../types';

interface SwipeCardProps {
  profile: UserProfile;
  isTop: boolean;
  onSwipe: (type: SwipeType) => void;
  onOpenDetails: () => void;
}

const SwipeCard: React.FC<SwipeCardProps> = ({ profile, isTop, onSwipe, onOpenDetails }) => {
  const { t } = useApp();
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = [profile.photoURL, ...(profile.additionalPhotos || [])];

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-22, 22]);

  // Dynamic stamp opacity
  const likeOpacity = useTransform(x, [20, 140], [0, 1]);
  const nopeOpacity = useTransform(x, [-20, -140], [0, 1]);

  const handleDragEnd = (_: any, info: any) => {
    const threshold = 100;
    const velocity = info.velocity.x;

    if (info.offset.x > threshold || velocity > 400) {
      onSwipe('like');
    } else if (info.offset.x < -threshold || velocity < -400) {
      onSwipe('pass');
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex(prev => (prev + 1) % photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex(prev => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <motion.div
      style={{ x: isTop ? x : 0, rotate: isTop ? rotate : 0 }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ scale: isTop ? 1 : 0.96, y: isTop ? 0 : 8 }}
      transition={{ duration: 0.2 }}
      className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden shadow-2xl bg-stone-900 select-none cursor-grab active:cursor-grabbing border border-stone-800"
    >
      {/* Current Photo */}
      <img
        src={photos[photoIndex]}
        alt={profile.name}
        className="w-full h-full object-cover pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Top Segmented Photo Indicators */}
      {photos.length > 1 && (
        <div className="absolute top-3 inset-x-4 flex gap-1.5 z-20">
          {photos.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i === photoIndex ? 'bg-white shadow-xs' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}

      {/* Left/Right Photo Tap Zones */}
      {photos.length > 1 && (
        <>
          <button
            onClick={prevPhoto}
            className="absolute left-0 top-12 bottom-28 w-1/3 z-10 focus:outline-none flex items-center pl-2 opacity-0 hover:opacity-80 transition-opacity"
          >
            <span className="p-1 rounded-full bg-black/40 text-white">
              <ChevronLeft className="w-5 h-5" />
            </span>
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-0 top-12 bottom-28 w-1/3 z-10 focus:outline-none flex items-center justify-end pr-2 opacity-0 hover:opacity-80 transition-opacity"
          >
            <span className="p-1 rounded-full bg-black/40 text-white">
              <ChevronRight className="w-5 h-5" />
            </span>
          </button>
        </>
      )}

      {/* Dynamic Swiping Stamps */}
      {isTop && (
        <>
          <motion.div
            style={{ opacity: likeOpacity }}
            className="absolute top-8 left-8 z-30 px-4 py-1.5 border-4 border-emerald-500 text-emerald-400 text-2xl font-black rounded-2xl rotate-[-18deg] tracking-wider uppercase bg-black/40 backdrop-blur-xs shadow-lg"
          >
            LIKE ❤️
          </motion.div>

          <motion.div
            style={{ opacity: nopeOpacity }}
            className="absolute top-8 right-8 z-30 px-4 py-1.5 border-4 border-rose-500 text-rose-400 text-2xl font-black rounded-2xl rotate-[18deg] tracking-wider uppercase bg-black/40 backdrop-blur-xs shadow-lg"
          >
            NOPE ✕
          </motion.div>
        </>
      )}

      {/* Bottom Gradient with Profile Info */}
      <div className="absolute inset-x-0 bottom-0 p-5 pt-16 bg-gradient-to-t from-black/95 via-black/60 to-transparent text-white z-20">
        <div className="flex items-end justify-between">
          <div className="flex-1 pr-2">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-extrabold tracking-tight">
                {profile.name}, {profile.age}
              </h3>
              {profile.isVerified && (
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" title="Verified Member" />
              )}
              {profile.isPremium && (
                <span className="p-1 rounded-full bg-amber-500 text-stone-950">
                  <Sparkles className="w-3 h-3" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-stone-200 mt-1 font-semibold">
              <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
              <span>
                {profile.district}
                {profile.subDistrict ? ` • ${profile.subDistrict}` : ''}
              </span>
              {profile.district === 'Chatra' && (
                <span className="ml-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                  Chatra ⭐
                </span>
              )}
            </div>

            {profile.bio && (
              <p className="text-xs text-stone-300 mt-2 line-clamp-2 leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Quick Interest Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {profile.interests.slice(0, 3).map((item, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white/95"
                >
                  {item}
                </span>
              ))}
              {profile.interests.length > 3 && (
                <span className="px-2 py-1 rounded-full bg-white/10 text-[11px] font-semibold text-white/70">
                  +{profile.interests.length - 3}
                </span>
              )}
            </div>
          </div>

          {/* Info Modal Button */}
          <button
            onClick={e => {
              e.stopPropagation();
              onOpenDetails();
            }}
            className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white transition-all shadow-md shrink-0"
            title="View Full Profile & Photos"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export const SwipeDeck: React.FC = () => {
  const {
    discoverProfiles,
    handleSwipe,
    undoLastSwipe,
    swipedHistory,
    openDetailModal,
    setIsFilterModalOpen,
    filters,
    setFilters,
    boostProfile,
    isBoostActive,
    t,
  } = useApp();

  const currentTopProfile = discoverProfiles[0] || null;
  const nextProfile = discoverProfiles[1] || null;

  return (
    <div className="flex flex-col items-center justify-between w-full max-w-md mx-auto h-[calc(100vh-8.5rem)] px-4 py-2">
      {/* Card Deck Area */}
      <div className="relative w-full flex-1 max-h-[580px]">
        <AnimatePresence>
          {currentTopProfile ? (
            <div className="relative w-full h-full">
              {/* Next Card in Stack */}
              {nextProfile && (
                <SwipeCard
                  key={nextProfile.id}
                  profile={nextProfile}
                  isTop={false}
                  onSwipe={() => {}}
                  onOpenDetails={() => openDetailModal(nextProfile)}
                />
              )}

              {/* Active Top Draggable Card */}
              <SwipeCard
                key={currentTopProfile.id}
                profile={currentTopProfile}
                isTop={true}
                onSwipe={type => handleSwipe(currentTopProfile.id, type)}
                onOpenDetails={() => openDetailModal(currentTopProfile)}
              />
            </div>
          ) : (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full h-full rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col items-center justify-center text-center shadow-xl"
            >
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 fill-rose-600/20" />
              </div>

              <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
                {t.discover.noMoreProfiles} ({filters.district === 'Chatra' ? 'Chatra' : filters.district})
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mt-2 leading-relaxed">
                {t.discover.noMoreDesc}
              </p>

              <div className="flex flex-col w-full gap-2.5 mt-6 max-w-xs">
                <button
                  onClick={() => setFilters({ district: 'All' })}
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 hover:opacity-95 transition-opacity"
                >
                  Explore All 24 Jharkhand Districts
                </button>

                <button
                  onClick={() => setIsFilterModalOpen(true)}
                  className="w-full py-3 px-4 rounded-2xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-bold text-xs hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>{t.discover.filters}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Action Controls Bar */}
      <div className="w-full pt-3 pb-1 flex items-center justify-center gap-3.5 z-30">
        {/* Rewind / Undo */}
        <button
          onClick={undoLastSwipe}
          disabled={swipedHistory.length === 0}
          className="p-3.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-amber-500 shadow-md hover:scale-110 active:scale-95 transition-all disabled:opacity-40 disabled:hover:scale-100"
          title={t.discover.undo}
        >
          <RotateCcw className="w-5 h-5" />
        </button>

        {/* Pass (Nope) */}
        <button
          onClick={() => currentTopProfile && handleSwipe(currentTopProfile.id, 'pass')}
          disabled={!currentTopProfile}
          className="p-4 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-rose-600 shadow-lg hover:scale-110 active:scale-95 transition-all disabled:opacity-40"
          title={t.discover.pass}
        >
          <X className="w-7 h-7 stroke-[2.5]" />
        </button>

        {/* Super Like */}
        <button
          onClick={() => currentTopProfile && handleSwipe(currentTopProfile.id, 'superlike')}
          disabled={!currentTopProfile}
          className="p-3.5 rounded-full bg-sky-500 text-white shadow-lg shadow-sky-500/25 hover:scale-110 active:scale-95 transition-all disabled:opacity-40"
          title={t.discover.superlike}
        >
          <Star className="w-5 h-5 fill-white" />
        </button>

        {/* Like */}
        <button
          onClick={() => currentTopProfile && handleSwipe(currentTopProfile.id, 'like')}
          disabled={!currentTopProfile}
          className="p-4 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 text-white shadow-lg shadow-rose-500/30 hover:scale-110 active:scale-95 transition-all disabled:opacity-40"
          title={t.discover.like}
        >
          <Heart className="w-7 h-7 fill-white" />
        </button>

        {/* Boost Profile */}
        <button
          onClick={boostProfile}
          className={`p-3.5 rounded-full border shadow-md hover:scale-110 active:scale-95 transition-all ${
            isBoostActive
              ? 'bg-purple-600 border-purple-600 text-white animate-pulse'
              : 'bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-purple-600'
          }`}
          title={t.discover.boost}
        >
          <Zap className="w-5 h-5 fill-current" />
        </button>
      </div>
    </div>
  );
};
