import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Moon,
  Sun,
  Shield,
  Sparkles,
  MapPin,
  Database,
  Languages,
  Volume2,
  VolumeX,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';
import { AppLanguage } from '../../types';

export const Header: React.FC = () => {
  const {
    currentUser,
    filters,
    setIsFilterModalOpen,
    isDarkMode,
    toggleDarkMode,
    setActiveTab,
    activeTab,
    setIsPremiumModalOpen,
    setIsFirebaseGuideOpen,
    setIsShareModalOpen,
    openAuthModal,
    language,
    setLanguage,
    soundEnabled,
    toggleSounds,
  } = useApp();

  const [isLangOpen, setIsLangOpen] = useState(false);

  const langOptions: { code: AppLanguage; label: string; sub: string }[] = [
    { code: 'hi', label: 'हिंदी', sub: 'Hindi' },
    { code: 'khortha', label: 'खोरठा', sub: 'Khortha' },
    { code: 'nagpuri', label: 'नागपुरी', sub: 'Nagpuri' },
    { code: 'en', label: 'English', sub: 'EN' },
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-rose-100/60 dark:border-stone-800 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          onClick={() => setActiveTab('discover')}
          className="focus:outline-none text-left"
          title="Apna Partner Home"
        >
          <BrandLogo size="md" />
        </button>

        {/* Right Action Icons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
              title="Change Language"
            >
              <Languages className="w-3.5 h-3.5 text-rose-500" />
              <span>{langOptions.find(l => l.code === language)?.label || 'हिंदी'}</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 top-11 w-36 bg-white dark:bg-stone-800 rounded-2xl shadow-xl border border-stone-200 dark:border-stone-700 py-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                {langOptions.map(opt => (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLanguage(opt.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between transition-colors ${
                      language === opt.code
                        ? 'bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 font-bold'
                        : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 font-medium'
                    }`}
                  >
                    <span>{opt.label}</span>
                    <span className="text-[10px] opacity-60">{opt.sub}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* District Indicator */}
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/60 hover:bg-rose-100 transition-colors shadow-xs"
            title="Change District Filter"
          >
            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate max-w-[70px] sm:max-w-[110px]">
              {filters.district === 'Chatra' ? 'Chatra ⭐' : filters.district}
            </span>
          </button>

          {/* Filter button for discover */}
          {activeTab === 'discover' && (
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors relative"
              title="Discovery Filters"
            >
              <SlidersHorizontal className="w-4.5 h-4.5" />
            </button>
          )}

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSounds}
            className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title={soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4.5 h-4.5 text-rose-500" />
            ) : (
              <VolumeX className="w-4.5 h-4.5 opacity-50" />
            )}
          </button>

          {/* Share App Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="p-2 rounded-full text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
            title="Share & Invite Friends"
          >
            <Share2 className="w-4.5 h-4.5" />
          </button>

          {/* Premium Badge */}
          <button
            onClick={() => setIsPremiumModalOpen(true)}
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs hover:opacity-95 transition-opacity"
            title="Apna Partner Premium"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>VIP</span>
          </button>

          {/* Firebase Guide Button */}
          <button
            onClick={() => setIsFirebaseGuideOpen(true)}
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-stone-600 dark:text-stone-300 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors border border-stone-200 dark:border-stone-800"
            title="Firebase Setup Guide & Rules"
          >
            <Database className="w-3.5 h-3.5 text-amber-500" />
            <span>Firebase</span>
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5" />}
          </button>

          {/* Admin toggle */}
          <button
            onClick={() => setActiveTab(activeTab === 'admin' ? 'discover' : 'admin')}
            className={`p-2 rounded-full transition-colors ${
              activeTab === 'admin'
                ? 'bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400'
                : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
            }`}
            title="Admin Moderation Portal"
          >
            <Shield className="w-4.5 h-4.5" />
          </button>

          {/* User profile avatar or Login button */}
          {currentUser ? (
            <button
              onClick={() => setActiveTab('profile')}
              className="relative rounded-full ring-2 ring-rose-500/40 p-0.5 hover:ring-rose-500 transition-all focus:outline-none"
              title="Your Profile"
            >
              <img
                src={currentUser.photoURL}
                alt={currentUser.name}
                className="w-7 h-7 rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              {currentUser.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full" />
              )}
            </button>
          ) : (
            <button
              onClick={openAuthModal}
              className="px-3 py-1.5 rounded-full text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-xs"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
