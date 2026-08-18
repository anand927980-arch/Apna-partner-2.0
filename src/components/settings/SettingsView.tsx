import React, { useState } from 'react';
import {
  SlidersHorizontal,
  Lock,
  Shield,
  LogOut,
  ChevronRight,
  Moon,
  Sun,
  Database,
  Crown,
  MapPin,
  Sparkles,
  CheckCircle,
  Languages,
  Volume2,
  VolumeX,
  UserX,
  Plus,
  Trash2,
  ShieldCheck,
  AlertTriangle,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppLanguage } from '../../types';
import { sounds } from '../../utils/soundEffects';

export const SettingsView: React.FC = () => {
  const {
    isDarkMode,
    toggleDarkMode,
    openAuthModal,
    setIsFilterModalOpen,
    setIsPremiumModalOpen,
    setIsVerificationModalOpen,
    setIsShareModalOpen,
    openLegalModal,
    setIsFirebaseGuideOpen,
    resetAllDemoData,
    logout,
    deleteAccount,
    currentUser,
    blockedUsers,
    unblockUser,
    language,
    setLanguage,
    soundEnabled,
    toggleSounds,
    blockPhoneNumber,
    unblockPhoneNumber,
    t,
  } = useApp();

  const [showActiveStatus, setShowActiveStatus] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const [newBlockedPhone, setNewBlockedPhone] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const languagesList: { code: AppLanguage; label: string; desc: string }[] = [
    { code: 'hi', label: 'हिंदी', desc: 'Hindi' },
    { code: 'khortha', label: 'खोरठा', desc: 'Khortha (झारखंड)' },
    { code: 'nagpuri', label: 'नागपुरी', desc: 'Nagpuri / Sadri' },
    { code: 'en', label: 'English', desc: 'Standard English' },
  ];

  const handleAddBlockedPhone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlockedPhone.trim()) return;
    blockPhoneNumber(newBlockedPhone);
    setNewBlockedPhone('');
  };

  const handleDeleteAccount = async () => {
    try {
      setIsDeleting(true);
      await deleteAccount();
      setDeleteSuccess(true);
      setShowDeleteConfirm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-24 text-stone-900 dark:text-stone-100">
      <div className="mb-6">
        <h2 className="text-2xl font-black tracking-tight">{t.settings.title}</h2>
        <p className="text-xs text-stone-500 dark:text-stone-400">
          {t.taglineSub}
        </p>
      </div>

      <div className="space-y-6">
        {/* Premium Banner */}
        <div
          onClick={() => setIsPremiumModalOpen(true)}
          className="p-4 rounded-3xl bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 text-white shadow-lg cursor-pointer flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Crown className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black">
                {currentUser?.isPremium ? 'Apna Partner Gold VIP Active' : t.profile.upgradeGold}
              </h4>
              <p className="text-xs text-white/80">
                {currentUser?.isPremium ? 'Manage your VIP perks' : 'Get 5x more matches in Chatra & Jharkhand'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80" />
        </div>

        {/* Invite & Share Banner */}
        <div
          onClick={() => setIsShareModalOpen(true)}
          className="p-4 rounded-3xl bg-emerald-500 text-white shadow-lg cursor-pointer flex items-center justify-between hover:bg-emerald-600 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-black">
                दोस्तों को शेयर करें (WhatsApp / Telegram)
              </h4>
              <p className="text-xs text-white/90">
                अपने जिले व आसपास के दोस्तों को इनवाइट करें
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-white/80" />
        </div>

        {/* Multi-Language Selector */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 px-1 flex items-center gap-1.5">
            <Languages className="w-4 h-4 text-rose-500" />
            <span>{t.settings.language}</span>
          </h3>
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-3 grid grid-cols-2 gap-2 shadow-xs">
            {languagesList.map(lang => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  language === lang.code
                    ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/20'
                    : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800/40 text-stone-700 dark:text-stone-300'
                }`}
              >
                <span className="text-sm font-black block">{lang.label}</span>
                <span className="text-[11px] text-stone-400">{lang.desc}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Discovery & Location Settings */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 px-1">
            Discovery & Matching
          </h3>
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800/60 overflow-hidden shadow-xs">
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/40 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold block">{t.discover.location}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Currently: Chatra & Jharkhand districts
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400" />
            </button>

            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/40 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                  <SlidersHorizontal className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold block">{t.discover.filters}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Adjust age range and relationship preferences
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Incognito Mode: Block Contacts */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 px-1 flex items-center gap-1.5">
            <UserX className="w-4 h-4 text-rose-500" />
            <span>{t.settings.incognito}</span>
          </h3>
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-4 shadow-xs">
            <p className="text-xs text-stone-500 dark:text-stone-400 mb-3">
              {t.settings.incognitoDesc}
            </p>

            <form onSubmit={handleAddBlockedPhone} className="flex gap-2 mb-3">
              <input
                type="tel"
                placeholder="Enter 10-digit Phone Number"
                value={newBlockedPhone}
                onChange={e => setNewBlockedPhone(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 border border-transparent focus:border-rose-500 text-xs text-stone-900 dark:text-stone-100 focus:outline-none"
              />
              <button
                type="submit"
                disabled={!newBlockedPhone.trim()}
                className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs disabled:opacity-40 flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Hide</span>
              </button>
            </form>

            {currentUser?.blockedPhoneNumbers && currentUser.blockedPhoneNumbers.length > 0 ? (
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {currentUser.blockedPhoneNumbers.map((phone, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 rounded-xl bg-stone-50 dark:bg-stone-800 text-xs font-semibold"
                  >
                    <span className="font-mono text-stone-700 dark:text-stone-300">+91 {phone}</span>
                    <button
                      onClick={() => unblockPhoneNumber(phone)}
                      className="text-stone-400 hover:text-rose-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-[11px] text-stone-400 italic">No numbers blocked yet.</p>
            )}
          </div>
        </div>

        {/* Privacy & Trust */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 px-1">
            Privacy & Trust (18+)
          </h3>
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800/60 overflow-hidden shadow-xs">
            {/* Selfie verification shortcut */}
            <button
              onClick={() => setIsVerificationModalOpen(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/40 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold block">{t.profile.verification}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {currentUser?.isVerified ? 'Profile Blue Verified' : 'Get Verified Checkmark Badge'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400" />
            </button>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  <Lock className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold block">Show Online Activity</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Let matches know when you are currently online
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowActiveStatus(!showActiveStatus)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  showActiveStatus ? 'bg-rose-600 justify-end' : 'bg-stone-300 dark:bg-stone-700 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  <CheckCircle className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold block">Read Receipts</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Show blue checkmarks when messages are seen
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReadReceipts(!readReceipts)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  readReceipts ? 'bg-rose-600 justify-end' : 'bg-stone-300 dark:bg-stone-700 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <button
              onClick={() => openLegalModal('guidelines')}
              className="w-full p-4 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/40 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                  <Shield className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold block">Community Safety & Guidelines</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Safe dating practices and anti-harassment rules
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Appearance & Sound Settings */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-2 px-1">
            Appearance & Audio
          </h3>
          <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 divide-y divide-stone-100 dark:divide-stone-800/60 overflow-hidden shadow-xs">
            {/* Sounds Toggle */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
                  {soundEnabled ? <Volume2 className="w-4.5 h-4.5" /> : <VolumeX className="w-4.5 h-4.5" />}
                </div>
                <div>
                  <span className="text-sm font-extrabold block">{t.settings.soundEffects}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Swipe chimes, matches, and chat pops
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  toggleSounds();
                  if (!soundEnabled) sounds.playLike();
                }}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  soundEnabled ? 'bg-rose-600 justify-end' : 'bg-stone-300 dark:bg-stone-700 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            {/* Dark Theme */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {isDarkMode ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
                </div>
                <div>
                  <span className="text-sm font-extrabold block">{t.settings.darkMode}</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    Toggle eye-friendly dark appearance
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleDarkMode}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  isDarkMode ? 'bg-rose-600 justify-end' : 'bg-stone-300 dark:bg-stone-700 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
              </button>
            </div>

            <button
              onClick={() => setIsFirebaseGuideOpen(true)}
              className="w-full p-4 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-800/40 text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400">
                  <Database className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-sm font-extrabold block">Firebase & Cloud Architecture</span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    View schema, Firestore collections, and security rules
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-stone-400" />
            </button>
          </div>
        </div>

        {/* Data & Account Actions */}
        <div className="space-y-3 pt-2">
          {/* Login / Switch Account Button */}
          <button
            onClick={openAuthModal}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs transition-all shadow-md shadow-rose-500/20 flex items-center justify-center gap-2"
          >
            <Lock className="w-4 h-4" />
            <span>लॉगिन करें / मोबाइल नंबर से अकाउंट खोलें</span>
          </button>

          <button
            onClick={resetAllDemoData}
            className="w-full py-3.5 px-4 rounded-2xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-bold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Reset Demo Data & Reshuffle Jharkhand Profiles</span>
          </button>

          <button
            onClick={logout}
            className="w-full py-3.5 px-4 rounded-2xl bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700 font-bold text-xs hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            <span>{t.profile.logout} (लॉगआउट)</span>
          </button>

          {deleteSuccess && (
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center">
              ✓ आपका खाता सफलतापूर्वक हटा दिया गया है। (Account Deleted)
            </div>
          )}

          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-full py-3 text-center text-xs text-rose-600 hover:text-rose-700 font-bold transition-colors border border-rose-200 dark:border-rose-900/60 rounded-2xl bg-rose-50/50 dark:bg-rose-950/30 flex items-center justify-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>{t.settings.deleteAccount} (खाता हमेशा के लिए मिटाएं)</span>
            </button>
          ) : (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 text-center space-y-2.5">
              <div className="flex items-center justify-center gap-1.5 text-rose-600 font-black text-xs">
                <AlertTriangle className="w-4 h-4" />
                <span>क्या आप सचमुच अपना खाता हमेशा के लिए मिटाना चाहते हैं?</span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                आपकी प्रोफ़ाइल, फ़ोटो, चैट्स और मैचेस का सारा डेटा हमेशा के लिए हटा दिया जाएगा।
              </p>
              <div className="flex gap-2 justify-center pt-1">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 rounded-xl border border-stone-300 dark:border-stone-700 text-xs font-bold text-stone-700 dark:text-stone-300"
                >
                  रद्द करें (Cancel)
                </button>
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm disabled:opacity-50"
                >
                  {isDeleting ? 'हटाया जा रहा है...' : 'हाँ, खाता मिटाएं (Delete)'}
                </button>
              </div>
            </div>
          )}

          <p className="text-center text-[11px] text-stone-400 mt-4">
            Apna Partner v1.2.0 • Made with ❤️ for Jharkhand & Chatra
          </p>
        </div>
      </div>
    </div>
  );
};
