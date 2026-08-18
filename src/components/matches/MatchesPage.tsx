import React from 'react';
import { MessageCircle, Heart, MapPin, Sparkles, Flame } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ChatScreen } from '../chat/ChatScreen';

export const MatchesPage: React.FC = () => {
  const {
    matches,
    currentUser,
    activeChatMatchId,
    setActiveChatMatchId,
    setActiveTab,
    allProfiles,
  } = useApp();

  if (activeChatMatchId) {
    return (
      <ChatScreen
        matchId={activeChatMatchId}
        onBack={() => setActiveChatMatchId(null)}
      />
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-24 text-stone-900 dark:text-stone-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight">Your Matches</h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Start a meaningful conversation with mutual connections
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 text-xs font-bold border border-rose-200 dark:border-rose-800">
          {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
        </span>
      </div>

      {matches.length === 0 ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center p-8 mt-12 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 text-center shadow-lg">
          <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 fill-rose-500/20" />
          </div>
          <h3 className="text-lg font-bold">No matches yet ❤️</h3>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs mt-1.5 leading-relaxed">
            When you and someone in Jharkhand like each other, they will appear here and you can start chatting.
          </p>
          <button
            onClick={() => setActiveTab('discover')}
            className="mt-6 py-3 px-6 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-md shadow-rose-500/20 hover:opacity-95 transition-all flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            <span>Start Discovering in Chatra</span>
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Recent Matches Horizontal Story Rail */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Recent Matches</span>
            </h4>

            <div className="flex gap-3.5 overflow-x-auto pb-2 scrollbar-none">
              {matches.map(m => {
                const otherUserId = m.userIds.find(id => id !== currentUser?.id) || '';
                const other = m.users[otherUserId] || allProfiles.find(p => p.id === otherUserId);

                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveChatMatchId(m.id)}
                    className="flex flex-col items-center shrink-0 group focus:outline-none"
                  >
                    <div className="relative w-16 h-16 rounded-full p-0.5 ring-2 ring-rose-500 group-hover:scale-105 transition-transform">
                      <img
                        src={other?.photoURL}
                        alt={other?.name}
                        className="w-full h-full rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full" />
                    </div>
                    <span className="text-xs font-bold mt-1.5 max-w-[68px] truncate">
                      {other?.name}
                    </span>
                    <span className="text-[10px] text-stone-400 truncate max-w-[68px]">
                      {other?.district || 'Jharkhand'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conversations List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-3 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-rose-500" />
              <span>Messages</span>
            </h4>

            <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800/60 overflow-hidden shadow-sm">
              {matches.map(m => {
                const otherUserId = m.userIds.find(id => id !== currentUser?.id) || '';
                const other = m.users[otherUserId] || allProfiles.find(p => p.id === otherUserId);
                const unread = currentUser ? m.unreadCounts?.[currentUser.id] || 0 : 0;

                return (
                  <button
                    key={m.id}
                    onClick={() => setActiveChatMatchId(m.id)}
                    className="w-full p-4 flex items-center gap-3.5 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors text-left"
                  >
                    <div className="relative shrink-0">
                      <img
                        src={other?.photoURL}
                        alt={other?.name}
                        className="w-13 h-13 rounded-full object-cover ring-2 ring-rose-500/20"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-stone-900 rounded-full" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-extrabold text-sm text-stone-900 dark:text-stone-100 truncate">
                            {other?.name}, {other?.age}
                          </h4>
                          {other?.district === 'Chatra' && (
                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                              Chatra ⭐
                            </span>
                          )}
                        </div>

                        {m.lastMessageTimestamp && (
                          <span className="text-[10px] text-stone-400 shrink-0">
                            {new Date(m.lastMessageTimestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <p className={`text-xs truncate ${unread > 0 ? 'font-bold text-stone-900 dark:text-stone-100' : 'text-stone-500 dark:text-stone-400'}`}>
                          {m.lastMessage || 'Say hello to your new match!'}
                        </p>

                        {unread > 0 && (
                          <span className="ml-2 px-1.5 py-0.5 bg-rose-600 text-white text-[10px] font-black rounded-full shrink-0">
                            {unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
