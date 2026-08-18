import React, { useState, useEffect } from 'react';
import { X, Check, MapPin, Sparkles, Filter } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { JHARKHAND_DISTRICTS, RELATIONSHIP_GOALS_META } from '../../data/districts';
import { LookingFor, RelationshipGoal } from '../../types';

export const DiscoveryFilterModal: React.FC = () => {
  const { isFilterModalOpen, setIsFilterModalOpen, filters, setFilters } = useApp();

  const [localDistrict, setLocalDistrict] = useState<string>(filters.district);
  const [localMinAge, setLocalMinAge] = useState<number>(filters.minAge);
  const [localMaxAge, setLocalMaxAge] = useState<number>(filters.maxAge);
  const [localGender, setLocalGender] = useState<LookingFor>(filters.genderPreference);
  const [localGoals, setLocalGoals] = useState<RelationshipGoal[]>(filters.relationshipGoals);
  const [localVerifiedOnly, setLocalVerifiedOnly] = useState<boolean>(filters.verifiedOnly);

  useEffect(() => {
    if (isFilterModalOpen) {
      setLocalDistrict(filters.district);
      setLocalMinAge(filters.minAge);
      setLocalMaxAge(filters.maxAge);
      setLocalGender(filters.genderPreference);
      setLocalGoals(filters.relationshipGoals);
      setLocalVerifiedOnly(filters.verifiedOnly);
    }
  }, [isFilterModalOpen, filters]);

  if (!isFilterModalOpen) return null;

  const toggleGoal = (goal: RelationshipGoal) => {
    if (localGoals.includes(goal)) {
      if (localGoals.length > 1) {
        setLocalGoals(localGoals.filter(g => g !== goal));
      }
    } else {
      setLocalGoals([...localGoals, goal]);
    }
  };

  const handleApply = () => {
    setFilters({
      district: localDistrict,
      minAge: localMinAge,
      maxAge: localMaxAge,
      genderPreference: localGender,
      relationshipGoals: localGoals,
      verifiedOnly: localVerifiedOnly,
    });
    setIsFilterModalOpen(false);
  };

  const handleResetChatra = () => {
    setLocalDistrict('Chatra');
    setLocalMinAge(18);
    setLocalMaxAge(35);
    setLocalGender('woman');
    setLocalGoals(['long_term', 'marriage', 'short_term', 'friendship', 'figuring_out']);
    setLocalVerifiedOnly(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-rose-100 dark:border-stone-800 text-stone-900 dark:text-stone-100 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400">
              <Filter className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold">Discovery Filters</h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Find your match in Jharkhand
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFilterModalOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="py-4 space-y-6">
          {/* District Selection with Chatra Highlight */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-500" />
                <span>Select District</span>
              </label>
              <button
                type="button"
                onClick={() => setLocalDistrict('Chatra')}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Focus Chatra</span>
              </button>
            </div>

            <select
              value={localDistrict}
              onChange={e => setLocalDistrict(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              <option value="All">All Jharkhand (All 24 Districts)</option>
              <option value="Chatra" className="font-bold text-rose-600">
                ⭐ Chatra (Focus District)
              </option>
              {JHARKHAND_DISTRICTS.filter(d => !d.isChatra).map(d => (
                <option key={d.id} value={d.name}>
                  {d.name} {d.tag ? `(${d.tag})` : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Gender Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
              I am Looking For
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'woman', label: 'Women' },
                { id: 'man', label: 'Men' },
                { id: 'everyone', label: 'Everyone' },
              ].map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setLocalGender(opt.id as LookingFor)}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-bold border transition-all ${
                    localGender === opt.id
                      ? 'bg-rose-500 text-white border-rose-500 shadow-xs'
                      : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Age Range Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Age Range (18+)
              </label>
              <span className="text-xs font-black text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-full">
                {localMinAge} — {localMaxAge} yrs
              </span>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min={18}
                max={50}
                value={localMinAge}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  if (val <= localMaxAge) setLocalMinAge(val);
                }}
                className="w-full accent-rose-600"
              />
              <input
                type="range"
                min={18}
                max={60}
                value={localMaxAge}
                onChange={e => {
                  const val = parseInt(e.target.value);
                  if (val >= localMinAge) setLocalMaxAge(val);
                }}
                className="w-full accent-rose-600"
              />
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Minimum dating age is strictly locked at 18.
            </p>
          </div>

          {/* Relationship Goals */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
              Relationship Goals
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {RELATIONSHIP_GOALS_META.map(goal => {
                const isSelected = localGoals.includes(goal.id);
                return (
                  <button
                    key={goal.id}
                    type="button"
                    onClick={() => toggleGoal(goal.id)}
                    className={`p-3 rounded-2xl text-left border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 text-rose-950 dark:text-rose-200'
                        : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{goal.emoji}</span>
                      <span className="text-xs font-bold">{goal.label}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-rose-600 dark:text-rose-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Verified Only Toggle */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-800">
            <div>
              <span className="text-xs font-bold text-stone-800 dark:text-stone-200 block">
                Verified Profiles Only
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400">
                Show only government/photo-verified members
              </span>
            </div>
            <button
              type="button"
              onClick={() => setLocalVerifiedOnly(!localVerifiedOnly)}
              className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                localVerifiedOnly ? 'bg-rose-600 justify-end' : 'bg-stone-300 dark:bg-stone-700 justify-start'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white shadow-xs" />
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-stone-100 dark:border-stone-800">
          <button
            type="button"
            onClick={handleResetChatra}
            className="flex-1 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
          >
            Reset to Chatra
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};
