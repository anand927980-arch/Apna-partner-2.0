import React from 'react';
import {
  Edit3,
  Sparkles,
  MapPin,
  CheckCircle,
  Settings,
  ShieldCheck,
  Heart,
  MessageCircle,
  Crown,
  Database,
  Camera,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { RELATIONSHIP_GOALS_META } from '../../data/districts';

export const ProfileView: React.FC = () => {
  const {
    currentUser,
    setIsProfileEditOpen,
    setIsPremiumModalOpen,
    setIsVerificationModalOpen,
    setActiveTab,
    matches,
    likedByProfiles,
    setIsFirebaseGuideOpen,
    t,
  } = useApp();

  if (!currentUser) return null;

  const goalMeta = RELATIONSHIP_GOALS_META.find(g => g.id === currentUser.relationshipGoal);

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-24 text-stone-900 dark:text-stone-100">
      {/* Header Profile Summary Card */}
      <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xl mb-6">
        {/* Cover Graphic / Background */}
        <div className="h-32 bg-gradient-to-r from-rose-500 via-pink-500 to-amber-400 relative">
          <button
            onClick={() => setActiveTab('settings')}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 backdrop-blur-xs transition-colors"
            title="Settings"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Avatar & Primary Info */}
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between -mt-16 mb-4 gap-3">
            <div className="relative w-28 h-28 rounded-3xl ring-4 ring-white dark:ring-stone-900 overflow-hidden bg-stone-900 shadow-lg shrink-0">
              <img
                src={currentUser.photoURL}
                alt={currentUser.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {currentUser.isOnline && (
                <span className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full" />
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsProfileEditOpen(true)}
                className="py-2.5 px-4 rounded-2xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-300 font-bold text-xs border border-rose-200/60 dark:border-rose-800 flex items-center gap-1.5 hover:bg-rose-100 transition-colors shadow-xs"
              >
                <Edit3 className="w-4 h-4" />
                <span>{t.profile.editProfile}</span>
              </button>

              <button
                onClick={() => setIsPremiumModalOpen(true)}
                className="py-2.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 hover:opacity-95 transition-opacity"
              >
                <Crown className="w-4 h-4" />
                <span>{currentUser.isPremium ? t.profile.goldMember : t.profile.upgradeGold}</span>
              </button>
            </div>
          </div>

          {/* Name & Badges */}
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black tracking-tight">
                {currentUser.name}, {currentUser.age}
              </h2>
              {currentUser.isVerified ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{t.profile.verifiedBadge}</span>
                </span>
              ) : (
                <button
                  onClick={() => setIsVerificationModalOpen(true)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 hover:bg-blue-100"
                >
                  <Camera className="w-3 h-3" />
                  <span>{t.profile.getVerified}</span>
                </button>
              )}
              {currentUser.isPremium && (
                <span className="p-1 rounded-full bg-amber-500 text-stone-950" title="Gold VIP Member">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              )}
            </div>

            <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mt-1 font-semibold">
              <MapPin className="w-4 h-4 text-rose-500" />
              <span>
                {currentUser.district}
                {currentUser.subDistrict ? ` • ${currentUser.subDistrict}` : ''}
              </span>
              {currentUser.district === 'Chatra' && (
                <span className="ml-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                  Chatra ⭐
                </span>
              )}
            </div>
          </div>

          {/* Bio snippet */}
          {currentUser.bio && (
            <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 mt-3 leading-relaxed">
              {currentUser.bio}
            </p>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 text-center">
            <button
              onClick={() => setActiveTab('matches')}
              className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 transition-colors"
            >
              <div className="flex items-center justify-center gap-1 text-rose-600 dark:text-rose-400 mb-0.5">
                <MessageCircle className="w-4 h-4" />
                <span className="font-black text-sm">{matches.length}</span>
              </div>
              <span className="text-[10px] text-stone-400 uppercase font-bold">{t.nav.matches}</span>
            </button>

            <button
              onClick={() => setActiveTab('likes')}
              className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-stone-100 transition-colors"
            >
              <div className="flex items-center justify-center gap-1 text-rose-600 dark:text-rose-400 mb-0.5">
                <Heart className="w-4 h-4 fill-rose-500" />
                <span className="font-black text-sm">{likedByProfiles.length}</span>
              </div>
              <span className="text-[10px] text-stone-400 uppercase font-bold">{t.nav.likes}</span>
            </button>

            <button
              onClick={() => setIsVerificationModalOpen(true)}
              className="p-2.5 rounded-2xl bg-stone-50 dark:bg-stone-800/50 hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center justify-center gap-1 text-blue-600 dark:text-blue-400 mb-0.5">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-black text-sm">{currentUser.isVerified ? '100%' : 'Verify'}</span>
              </div>
              <span className="text-[10px] text-stone-400 uppercase font-bold">{t.profile.verification}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Details List */}
      <div className="space-y-4">
        {/* Blue Verified Banner if Unverified */}
        {!currentUser.isVerified && (
          <div className="p-4 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-blue-600 text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black text-blue-900 dark:text-blue-200">
                  {t.profile.getVerified}
                </h4>
                <p className="text-[11px] text-blue-700 dark:text-blue-400">
                  {t.profile.verifiedDescription}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsVerificationModalOpen(true)}
              className="py-2 px-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs"
            >
              Start
            </button>
          </div>
        )}

        {/* Relationship Goal */}
        {goalMeta && (
          <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{goalMeta.emoji}</span>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  {t.discover.goal}
                </h4>
                <p className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                  {goalMeta.label}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsProfileEditOpen(true)}
              className="text-xs font-bold text-rose-600 hover:underline"
            >
              Change
            </button>
          </div>
        )}

        {/* Interests */}
        <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
              {t.discover.interests} ({currentUser.interests.length})
            </h4>
            <button
              onClick={() => setIsProfileEditOpen(true)}
              className="text-xs font-bold text-rose-600 hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {currentUser.interests.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Additional Photos Gallery */}
        {currentUser.additionalPhotos && currentUser.additionalPhotos.length > 0 && (
          <div className="p-5 rounded-3xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Gallery Photos ({currentUser.additionalPhotos.length + 1})
              </h4>
              <button
                onClick={() => setIsProfileEditOpen(true)}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                Manage
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <img
                src={currentUser.photoURL}
                alt="Main"
                className="aspect-square rounded-2xl object-cover ring-2 ring-rose-500"
                referrerPolicy="no-referrer"
              />
              {currentUser.additionalPhotos.map((photo, i) => (
                <img
                  key={i}
                  src={photo}
                  alt={`Gallery ${i}`}
                  className="aspect-square rounded-2xl object-cover border border-stone-200 dark:border-stone-800"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
          </div>
        )}

        {/* Firebase Live Backend Integration CTA */}
        <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-500 text-stone-950 font-bold">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-900 dark:text-amber-200">
                Connect Live Firebase
              </h4>
              <p className="text-[11px] text-amber-700 dark:text-amber-400">
                Setup Firestore database, Authentication, and Storage rules
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFirebaseGuideOpen(true)}
            className="py-2 px-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs"
          >
            Guide
          </button>
        </div>
      </div>
    </div>
  );
};
