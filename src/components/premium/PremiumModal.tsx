import React, { useState } from 'react';
import { X, Sparkles, Check, Crown, Zap, Heart, Eye, RotateCcw, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PremiumPlan } from '../../types';

export const PremiumModal: React.FC = () => {
  const { isPremiumModalOpen, setIsPremiumModalOpen, upgradeToPremium, currentUser } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly' | 'quarterly'>('monthly');

  if (!isPremiumModalOpen) return null;

  const plans: PremiumPlan[] = [
    {
      id: 'weekly',
      title: 'Weekly Pass',
      durationLabel: '1 Week',
      priceINR: 99,
      features: ['See Who Liked You', '1 Profile Boost in Chatra', 'Unlimited Swipes'],
    },
    {
      id: 'monthly',
      title: 'Monthly Gold',
      durationLabel: '1 Month',
      priceINR: 299,
      originalPriceINR: 499,
      badge: 'MOST POPULAR 🔥',
      popular: true,
      features: [
        'See Who Liked You in All Districts',
        '5 Profile Boosts in Chatra',
        'Unlimited Swipes & Rewinds',
        'Chatra Local Spotlight Badge',
        'Read Receipts in Chat',
      ],
    },
    {
      id: 'quarterly',
      title: 'Quarterly VIP',
      durationLabel: '3 Months',
      priceINR: 699,
      originalPriceINR: 1199,
      badge: 'BEST VALUE 💎',
      features: [
        'Everything in Monthly Gold',
        '15 Profile Boosts',
        'Priority Customer Support',
        'VIP Gold Badge on Profile',
        'Maximum Dating Visibility',
      ],
    },
  ];

  const handleSubscribe = () => {
    upgradeToPremium(selectedPlan);
  };

  const perks = [
    { icon: Eye, title: 'See Who Liked You', desc: 'Directly match with people who showed interest' },
    { icon: Zap, title: 'Chatra District Boost', desc: 'Get 5x more views from members in Chatra' },
    { icon: Heart, title: 'Unlimited Right Swipes', desc: 'No daily limits on liking matches' },
    { icon: RotateCcw, title: 'Unlimited Rewinds', desc: 'Undo any accidental left swipes instantly' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => setIsPremiumModalOpen(false)}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-pink-500 text-white flex items-center justify-center mb-3 shadow-lg shadow-amber-500/25">
            <Crown className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 bg-clip-text text-transparent">
            Apna Partner Gold VIP
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            Supercharge your dating experience in Chatra & across Jharkhand
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 gap-2.5 mb-6">
          {perks.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 flex items-start gap-2.5"
              >
                <div className="p-1.5 rounded-lg bg-rose-500 text-white shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {p.title}
                  </h4>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-tight mt-0.5">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing Plan Selector */}
        <div className="space-y-3 mb-6">
          {plans.map(plan => {
            const isSelected = selectedPlan === plan.id;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/30 shadow-md'
                    : 'border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                }`}
              >
                {plan.badge && (
                  <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-gradient-to-r from-amber-500 to-rose-500 text-white shadow-xs">
                    {plan.badge}
                  </span>
                )}

                <div className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-rose-600 bg-rose-600 text-white' : 'border-stone-400'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold">{plan.title}</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {plan.durationLabel} Access
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-1.5 justify-end">
                    {plan.originalPriceINR && (
                      <span className="text-xs line-through text-stone-400">
                        ₹{plan.originalPriceINR}
                      </span>
                    )}
                    <span className="text-lg font-black text-rose-600 dark:text-rose-400">
                      ₹{plan.priceINR}
                    </span>
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">Billed securely</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Payment notice */}
        <div className="mb-6 p-3 rounded-xl bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 text-[11px] flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>
            Payment Gateway Demonstration: Clicking upgrade simulates activating the premium subscription perks and unlocks all features for this account.
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleSubscribe}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-pink-500 hover:opacity-95 text-stone-950 font-black text-sm shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2 transition-all transform hover:scale-101"
        >
          <Sparkles className="w-4 h-4" />
          <span>
            {currentUser?.isPremium ? 'Renew / Update Premium' : 'Upgrade to Premium Now'}
          </span>
        </button>
      </div>
    </div>
  );
};
