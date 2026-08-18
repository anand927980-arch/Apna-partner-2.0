import React from 'react';
import { Flame, Heart, MessageCircle, User, Settings } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, matches, likedByProfiles, setActiveChatMatchId, t } = useApp();

  // Count unread match messages
  const unreadMessagesCount = matches.reduce((acc, m) => {
    const unread = Object.values(m.unreadCounts || {}).reduce((a, b) => a + b, 0);
    return acc + unread;
  }, 0);

  const navItems = [
    {
      id: 'discover',
      label: t.nav.discover,
      icon: Flame,
      badge: null,
    },
    {
      id: 'likes',
      label: t.nav.likes,
      icon: Heart,
      badge: likedByProfiles.length > 0 ? likedByProfiles.length : null,
    },
    {
      id: 'matches',
      label: t.nav.matches,
      icon: MessageCircle,
      badge: unreadMessagesCount > 0 ? unreadMessagesCount : null,
    },
    {
      id: 'profile',
      label: t.nav.profile,
      icon: User,
      badge: null,
    },
    {
      id: 'settings',
      label: t.nav.settings,
      icon: Settings,
      badge: null,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-lg border-t border-rose-100 dark:border-stone-800 transition-colors">
      <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveChatMatchId(null); // Reset active chat when switching via bottom nav
                setActiveTab(item.id as any);
              }}
              className={`relative flex flex-col items-center justify-center w-14 py-1 transition-all ${
                isActive
                  ? 'text-rose-600 dark:text-rose-400 font-bold scale-105'
                  : 'text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-6 h-6 transition-transform ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {item.badge !== null && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2 px-1.5 py-0.2 bg-rose-600 text-white text-[10px] font-extrabold rounded-full animate-bounce shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight truncate max-w-[56px] text-center">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:text-rose-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
