import React from 'react';
import { X, ShieldCheck, HeartHandshake, EyeOff, MapPin, PhoneCall } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SafetyGuidelinesModal: React.FC = () => {
  const { isLegalModalOpen, legalModalType, closeLegalModal } = useApp();

  if (!isLegalModalOpen || legalModalType !== 'guidelines') return null;

  const safetyTips = [
    {
      icon: ShieldCheck,
      title: 'Strictly 18+ Dating Only',
      description:
        'Apna Partner is exclusively for consenting adults aged 18 and older. Any minors or suspicious profiles are permanently banned immediately.',
    },
    {
      icon: EyeOff,
      title: 'Protect Your Personal Info',
      description:
        'Never publicly share financial details, bank accounts, UPI PINs, Aadhaar numbers, or your exact home address in chat.',
    },
    {
      icon: MapPin,
      title: 'Meet in Populated Public Places',
      description:
        'For first dates in Chatra (e.g. Kauleshwari foothills, town cafes) or Ranchi (e.g. Morabadi, Nucleus Mall), always meet in well-lit public spots.',
    },
    {
      icon: HeartHandshake,
      title: 'Mutual Respect & Consent',
      description:
        'Always respect boundaries. Non-consensual sharing of photos or harassment will result in legal escalation and immediate platform ban.',
    },
    {
      icon: PhoneCall,
      title: 'Tell a Friend or Family Member',
      description:
        'Inform a close friend where you are going and keep your mobile charged with location sharing active when meeting someone new.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 max-h-[90vh] overflow-y-auto">
        <button
          onClick={closeLegalModal}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-xl font-black">Community Safety Rules</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Safe, respectful & trusted dating in Jharkhand
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {safetyTips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-800/50 border border-stone-200/60 dark:border-stone-800 flex items-start gap-3.5"
              >
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-stone-900 dark:text-stone-100">
                    {tip.title}
                  </h4>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    {tip.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-500">Jharkhand Helpline: 1090 / 112</span>
          <button
            onClick={closeLegalModal}
            className="py-2.5 px-5 rounded-2xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 font-bold text-xs hover:opacity-90"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
