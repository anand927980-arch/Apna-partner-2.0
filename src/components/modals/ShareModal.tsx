import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Share2, Copy, Check, MessageCircle, Send, Globe, QrCode } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ShareModal: React.FC = () => {
  const { isShareModalOpen, setIsShareModalOpen, language } = useApp();
  const [copied, setCopied] = useState(false);

  if (!isShareModalOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-55gnqbappzlqvmaf7sryev-833503103613.asia-east1.run.app';

  const shareText = language === 'khortha'
    ? `झारखंड के आपन पार्टनर डेटिंग ऐप पर जुड़ल जा! चतरा अउर पूरा झारखंड ले लड़का-लड़की संगे कनेक्ट होवा: ${currentUrl}`
    : language === 'nagpuri'
    ? `झारखंड कर आपन पार्टनर डेटिंग ऐप में जुड़ू! चतरा और झारखंड कर सब संगी मन संगे मैच करू: ${currentUrl}`
    : `झारखंड का अपना डेटिंग ऐप 'Apna Partner' - चतरा और सभी जिलों के सच्चे जीवनसाथी व दोस्त खोजें! अभी रजिस्टर करें: ${currentUrl}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const handleTelegram = () => {
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(currentUrl);
    window.open(`https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Apna Partner - Jharkhand Dating App',
          text: shareText,
          url: currentUrl,
        });
      } catch (e) {
        // User cancelled or not supported
      }
    } else {
      handleCopy();
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={() => setIsShareModalOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-rose-500/25">
              <Share2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-black text-stone-900 dark:text-stone-100">
              शेयर करें & इनवाइट करें
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              अपने दोस्तों को लिंक भेजें ताकि वे सीधे रजिस्टर और मैच कर सकें
            </p>
          </div>

          {/* Direct Share Options */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {/* WhatsApp */}
            <button
              onClick={handleWhatsApp}
              className="p-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp पर भेजें</span>
            </button>

            {/* Telegram / Others */}
            <button
              onClick={handleTelegram}
              className="p-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-500/20 transition-all hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" />
              <span>Telegram पर भेजें</span>
            </button>
          </div>

          {/* Link Box with Copy Button */}
          <div className="mb-4">
            <label className="text-[11px] font-bold uppercase text-stone-400 block mb-1.5 px-1">
              डायरेक्ट ऐप लिंक (Website Link):
            </label>
            <div className="flex items-center gap-2 p-2 bg-stone-100 dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
              <Globe className="w-4 h-4 text-stone-400 ml-2 shrink-0" />
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="bg-transparent text-xs font-mono text-stone-800 dark:text-stone-200 w-full focus:outline-none truncate"
              />
              <button
                onClick={handleCopy}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 flex items-center gap-1 transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>कॉपी हो गया!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Native Mobile Share if supported */}
          {typeof navigator !== 'undefined' && 'share' in navigator && (
            <button
              onClick={handleNativeShare}
              className="w-full py-3 rounded-2xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-200 font-bold text-xs hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-rose-500" />
              <span>अन्य ऐप्स के जरिए शेयर करें (Instagram / SMS)</span>
            </button>
          )}

          {/* Note */}
          <div className="mt-4 p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-800 dark:text-amber-300 text-center">
            💡 कोई भी व्यक्ति बिना किसी ऐप डाउनलोड किए सीधे अपने Chrome या Safari ब्राउज़र में इस लिंक से रजिस्टर कर सकता है!
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
