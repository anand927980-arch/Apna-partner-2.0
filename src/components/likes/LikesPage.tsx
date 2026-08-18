import React from 'react';
import { Heart, Sparkles, Lock, MapPin, CheckCircle, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LikesPage: React.FC = () => {
  const {
    likedByProfiles,
    currentUser,
    setIsPremiumModalOpen,
    openDetailModal,
    handleSwipe,
  } = useApp();

  const isPremium = currentUser?.isPremium;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-24 text-stone-900 dark:text-stone-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight flex items-center gap-2">
            <span>Who Liked You</span>
            <span className="text-rose-500">❤️</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            People who swiped right on your profile
          </p>
        </div>

        <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-200 dark:border-rose-800">
          {likedByProfiles.length} Likes
        </span>
      </div>

      {/* Premium Upgrade Banner for Free Users */}
      {!isPremium && (
        <div className="p-5 mb-6 rounded-3xl bg-gradient-to-tr from-stone-900 via-rose-950 to-stone-900 text-white shadow-xl border border-rose-500/30 relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="p-1 rounded-lg bg-amber-500 text-stone-950">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Apna Partner Gold Feature
              </span>
            </div>

            <h3 className="text-xl font-black tracking-tight mb-1">
              Unlock All {likedByProfiles.length} Likes in Chatra & Jharkhand
            </h3>
            <p className="text-xs text-rose-200/90 mb-4 max-w-md">
              Upgrade to Premium to see who already likes you, match instantly with zero waiting, and get 5x more profile visibility!
            </p>

            <button
              onClick={() => setIsPremiumModalOpen(true)}
              className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 text-stone-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:opacity-95 transition-opacity"
            >
              See Who Liked You — From ₹99/week
            </button>
          </div>
        </div>
      )}

      {/* Grid of Liked Profiles */}
      {likedByProfiles.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 mt-12 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 fill-rose-500/20" />
          </div>
          <h3 className="text-lg font-bold">No likes yet</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mt-1.5 leading-relaxed">
            Boost your profile or update your photos to receive likes from members in Chatra and surrounding districts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          {likedByProfiles.map(profile => (
            <div
              key={profile.id}
              onClick={() => (isPremium ? openDetailModal(profile) : setIsPremiumModalOpen(true))}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md bg-stone-900 border border-stone-200 dark:border-stone-800 cursor-pointer"
            >
              <img
                src={profile.photoURL}
                alt={profile.name}
                className={`w-full h-full object-cover transition-transform group-hover:scale-105 ${
                  !isPremium ? 'blur-md filter brightness-90' : ''
                }`}
                referrerPolicy="no-referrer"
              />

              {/* Free User Lock Overlay */}
              {!isPremium ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-black/30 backdrop-blur-xs text-white">
                  <div className="w-9 h-9 rounded-full bg-amber-500/90 text-stone-950 flex items-center justify-center mb-2 shadow-lg">
                    <Lock className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black tracking-tight">
                    {profile.district} • {profile.age} yrs
                  </span>
                  <span className="text-[10px] text-rose-200 font-semibold mt-0.5">
                    Liked you recently
                  </span>
                </div>
              ) : (
                /* Premium Clear View */
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/90 via-black/40 to-transparent text-white">
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-black truncate">
                      {profile.name}, {profile.age}
                    </h4>
                    {profile.isVerified && (
                      <CheckCircle className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20 shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-rose-200 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span className="truncate">{profile.district}</span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleSwipe(profile.id, 'like');
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-[11px] flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Heart className="w-3 h-3 fill-white" />
                      <span>Match</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
