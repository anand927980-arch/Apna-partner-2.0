import React, { useState, useEffect } from 'react';
import {
  X,
  MapPin,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Languages,
  Heart,
  Star,
  ShieldAlert,
  Ban,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RELATIONSHIP_GOALS_META } from '../../data/districts';

export const ProfileDetailModal: React.FC = () => {
  const {
    isDetailModalOpen,
    closeDetailModal,
    activeDetailProfile,
    handleSwipe,
    openReportModal,
    openBlockModal,
  } = useApp();

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  useEffect(() => {
    setActivePhotoIdx(0);
  }, [activeDetailProfile?.id]);

  if (!isDetailModalOpen || !activeDetailProfile) return null;

  const profile = activeDetailProfile;
  const allPhotos = [profile.photoURL, ...(profile.additionalPhotos || [])];

  const goalMeta = RELATIONSHIP_GOALS_META.find(g => g.id === profile.relationshipGoal);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx(prev => (prev + 1) % allPhotos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActivePhotoIdx(prev => (prev - 1 + allPhotos.length) % allPhotos.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg h-full sm:h-auto sm:max-h-[92vh] bg-white dark:bg-stone-900 rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 flex flex-col overflow-hidden">
        {/* Floating Top Close Button */}
        <button
          onClick={closeDetailModal}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-md transition-all shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Photo Gallery with Carousel */}
          <div className="relative w-full h-96 sm:h-[420px] bg-stone-950 select-none">
            <img
              src={allPhotos[activePhotoIdx]}
              alt={profile.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Photo Segment Indicators */}
            {allPhotos.length > 1 && (
              <div className="absolute top-3 inset-x-4 flex gap-1.5 z-10">
                {allPhotos.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-all ${
                      i === activePhotoIdx ? 'bg-white shadow-xs' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Prev/Next Click Areas */}
            {allPhotos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-xs"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-xs"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Bottom Gradient with Name & Age */}
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  {profile.name}, {profile.age}
                </h2>
                {profile.isVerified && (
                  <span title="Verified Profile">
                    <CheckCircle className="w-6 h-6 text-sky-400 fill-sky-400/20" />
                  </span>
                )}
                {profile.isPremium && (
                  <span className="p-1 rounded-full bg-amber-500 text-stone-950" title="Premium Member">
                    <Sparkles className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-sm text-stone-200 mt-1 font-semibold">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  {profile.district}
                  {profile.subDistrict ? ` • ${profile.subDistrict}` : ''}
                </span>
                {profile.district === 'Chatra' && (
                  <span className="ml-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-600 text-white">
                    Focus District ⭐
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Profile Details Body */}
          <div className="p-5 sm:p-6 space-y-6">
            {/* Relationship Goal Highlight */}
            {goalMeta && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200/60 dark:border-rose-800/60 flex items-center gap-3">
                <span className="text-2xl">{goalMeta.emoji}</span>
                <div>
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-300 block">
                    Looking for: {goalMeta.label}
                  </span>
                  <span className="text-[11px] text-stone-600 dark:text-stone-400">
                    {goalMeta.description}
                  </span>
                </div>
              </div>
            )}

            {/* About / Bio */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2">
                About Me
              </h4>
              <p className="text-sm sm:text-base leading-relaxed text-stone-800 dark:text-stone-200 font-normal">
                {profile.bio}
              </p>
            </div>

            {/* Interests Chips */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5">
                Passions & Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200/60 dark:border-stone-700/60"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {profile.profession && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-800">
                  <Briefcase className="w-5 h-5 text-rose-500 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Profession</span>
                    <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                      {profile.profession}
                    </span>
                  </div>
                </div>
              )}

              {profile.education && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-800">
                  <GraduationCap className="w-5 h-5 text-rose-500 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Education</span>
                    <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                      {profile.education}
                    </span>
                  </div>
                </div>
              )}

              {profile.languages && profile.languages.length > 0 && (
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/50 dark:border-stone-800 sm:col-span-2">
                  <Languages className="w-5 h-5 text-rose-500 shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 block">Languages Spoken</span>
                    <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                      {profile.languages.join(', ')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Safety & Action Controls */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-stone-500">
              <button
                onClick={() => openReportModal(profile)}
                className="flex items-center gap-1.5 font-semibold text-rose-600 dark:text-rose-400 hover:underline p-2"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>Report Profile</span>
              </button>

              <button
                onClick={() => openBlockModal(profile)}
                className="flex items-center gap-1.5 font-semibold text-stone-500 hover:text-stone-800 dark:hover:text-stone-300 p-2"
              >
                <Ban className="w-4 h-4" />
                <span>Block User</span>
              </button>
            </div>
          </div>
        </div>

        {/* Fixed Action Floating Bar */}
        <div className="absolute bottom-0 inset-x-0 p-4 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-t border-stone-100 dark:border-stone-800 flex items-center justify-center gap-4">
          <button
            onClick={() => {
              handleSwipe(profile.id, 'pass');
              closeDetailModal();
            }}
            className="flex-1 py-3 px-4 rounded-2xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-bold text-sm hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
          >
            <X className="w-4 h-4 text-stone-400" />
            <span>Pass</span>
          </button>

          <button
            onClick={() => {
              handleSwipe(profile.id, 'superlike');
              closeDetailModal();
            }}
            className="p-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/20"
            title="Super Like"
          >
            <Star className="w-5 h-5 fill-white" />
          </button>

          <button
            onClick={() => {
              handleSwipe(profile.id, 'like');
              closeDetailModal();
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm shadow-md shadow-rose-500/20 flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Like Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};
