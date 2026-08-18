import React from 'react';
import { X, Database, Shield, Flame, CheckCircle, Code2, Server } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FirebaseGuideModal: React.FC = () => {
  const { isFirebaseGuideOpen, setIsFirebaseGuideOpen } = useApp();

  if (!isFirebaseGuideOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-xl bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-amber-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setIsFirebaseGuideOpen(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
            <Database className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black">Firebase Architecture & Cloud Schema</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Complete Firestore collections and security rules layout for Apna Partner
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
            <h4 className="font-extrabold text-sm mb-2 text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <Server className="w-4 h-4" />
              <span>1. Firestore Database Collections</span>
            </h4>
            <ul className="space-y-2 text-stone-600 dark:text-stone-300 font-mono">
              <li>• <strong>users/{'{userId}'}</strong>: profile details, district (Chatra), 18+ DOB, interests, photos</li>
              <li>• <strong>swipes/{'{swipeId}'}</strong>: swiperId, targetUserId, type (like/pass/superlike), timestamp</li>
              <li>• <strong>matches/{'{matchId}'}</strong>: userIds array, lastMessage, lastMessageTimestamp, unreadCounts</li>
              <li>• <strong>matches/{'{matchId}'}/messages/{'{msgId}'}</strong>: senderId, text, timestamp, isRead</li>
              <li>• <strong>reports/{'{reportId}'}</strong>: reporterId, reportedUserId, reason, details, status</li>
              <li>• <strong>blockedUsers/{'{blockId}'}</strong>: userId, blockedUserId, timestamp</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
            <h4 className="font-extrabold text-sm mb-2 text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
              <Shield className="w-4 h-4" />
              <span>2. Security Rules (firestore.rules)</span>
            </h4>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              Matches and chat messages are strictly private: only authenticated participants whose <code className="bg-stone-200 dark:bg-stone-700 px-1 rounded">request.auth.uid</code> is included in the match's <code className="bg-stone-200 dark:bg-stone-700 px-1 rounded">userIds</code> list have read/write access.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700">
            <h4 className="font-extrabold text-sm mb-2 text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4" />
              <span>3. Local Persistence State Engine</span>
            </h4>
            <p className="text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
              Currently running in high-performance local persistence mode with interactive mock data covering all 24 Jharkhand districts, seed profiles with Chatra focus, match celebration, and real-time chat.
            </p>
          </div>
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={() => setIsFirebaseGuideOpen(false)}
            className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold text-xs shadow-xs"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
