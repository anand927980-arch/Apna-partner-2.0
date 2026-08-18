import React, { useState, useEffect } from 'react';
import {
  X,
  Upload,
  Plus,
  Trash2,
  MapPin,
  Sparkles,
  Check,
  CheckCircle,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import {
  JHARKHAND_DISTRICTS,
  AVAILABLE_INTERESTS,
  AVAILABLE_LANGUAGES,
  RELATIONSHIP_GOALS_META,
} from '../../data/districts';
import { Gender, LookingFor, RelationshipGoal } from '../../types';

export const ProfileEditModal: React.FC = () => {
  const { isProfileEditOpen, setIsProfileEditOpen, currentUser, saveUserProfile } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [dob, setDob] = useState(currentUser?.dateOfBirth || '2000-01-01');
  const [gender, setGender] = useState<Gender>(currentUser?.gender || 'man');
  const [lookingFor, setLookingFor] = useState<LookingFor>(currentUser?.lookingFor || 'woman');
  const [district, setDistrict] = useState(currentUser?.district || 'Chatra');
  const [subDistrict, setSubDistrict] = useState(currentUser?.subDistrict || 'Chatra Town');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [education, setEducation] = useState(currentUser?.education || '');
  const [profession, setProfession] = useState(currentUser?.profession || '');
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || '');
  const [additionalPhotos, setAdditionalPhotos] = useState<string[]>(
    currentUser?.additionalPhotos || []
  );
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    currentUser?.interests || ['☕ Chai & Adda', '📸 Photography']
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    currentUser?.languages || ['Hindi', 'Khortha']
  );
  const [relationshipGoal, setRelationshipGoal] = useState<RelationshipGoal>(
    currentUser?.relationshipGoal || 'long_term'
  );
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Sync state whenever currentUser changes or modal is reopened
  useEffect(() => {
    if (currentUser && isProfileEditOpen) {
      setName(currentUser.name || '');
      setDob(currentUser.dateOfBirth || '2000-01-01');
      setGender(currentUser.gender || 'man');
      setLookingFor(currentUser.lookingFor || 'woman');
      setDistrict(currentUser.district || 'Chatra');
      setSubDistrict(currentUser.subDistrict || 'Chatra Town');
      setBio(currentUser.bio || '');
      setEducation(currentUser.education || '');
      setProfession(currentUser.profession || '');
      setPhotoURL(currentUser.photoURL || '');
      setAdditionalPhotos(currentUser.additionalPhotos || []);
      setSelectedInterests(currentUser.interests || ['☕ Chai & Adda', '📸 Photography']);
      setSelectedLanguages(currentUser.languages || ['Hindi', 'Khortha']);
      setRelationshipGoal(currentUser.relationshipGoal || 'long_term');
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [currentUser, isProfileEditOpen]);

  // Unconditional Hooks Finished - Now Safe for Early Return
  if (!isProfileEditOpen || !currentUser) return null;

  const calculateAge = (birthDateString: string): number => {
    const birthDate = new Date(birthDateString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const currentAge = calculateAge(dob);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      if (selectedInterests.length < 8) {
        setSelectedInterests([...selectedInterests, interest]);
      }
    }
  };

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
      }
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, isPrimary: boolean) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isPrimary) {
          setPhotoURL(reader.result as string);
        } else {
          setAdditionalPhotos([...additionalPhotos, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (currentAge < 18) {
      setErrorMsg('Underage restriction: You must be 18 years or older.');
      return;
    }
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!photoURL) {
      setErrorMsg('Please provide a profile photo.');
      return;
    }

    try {
      setIsSaving(true);
      await saveUserProfile(
        {
          name: name.trim(),
          dateOfBirth: dob,
          age: currentAge,
          gender,
          lookingFor,
          district,
          subDistrict,
          bio: bio.trim(),
          education: education.trim(),
          profession: profession.trim(),
          photoURL,
          additionalPhotos,
          interests: selectedInterests,
          languages: selectedLanguages,
          relationshipGoal,
        },
        photoURL
      );

      setSuccessMsg('Profile updated successfully in Firebase! ✨');
      setTimeout(() => {
        setIsProfileEditOpen(false);
      }, 800);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white dark:bg-stone-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-rose-100 dark:border-stone-800 text-stone-900 dark:text-stone-100 max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 dark:border-stone-800">
          <div>
            <h3 className="text-xl font-black">Edit Your Dating Profile</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Keep your details fresh and authentic
            </p>
          </div>
          <button
            onClick={() => setIsProfileEditOpen(false)}
            className="p-2 text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="mt-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 mt-4">
          {/* Profile Photos */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
              Profile Photos (Primary & Additional)
            </label>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {/* Primary Photo */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-rose-500 bg-stone-100 dark:bg-stone-800 group shadow-md">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt="Primary"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-stone-400 p-2 text-center">
                    <ImageIcon className="w-6 h-6 mb-1 text-rose-500" />
                    <span className="text-[10px] font-bold">Main Photo</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-2">
                  <label className="cursor-pointer bg-white text-stone-900 rounded-full p-2 hover:scale-110 transition-transform">
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleFileUpload(e, true)}
                      className="hidden"
                    />
                  </label>
                  <span className="text-[10px] text-white font-bold mt-1">Change</span>
                </div>
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider">
                  Main
                </span>
              </div>

              {/* Additional Photos */}
              {additionalPhotos.map((url, idx) => (
                <div
                  key={idx}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 group"
                >
                  <img
                    src={url}
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setAdditionalPhotos(additionalPhotos.filter((_, i) => i !== idx))}
                      className="p-1.5 rounded-full bg-rose-600 text-white hover:bg-rose-700"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Photo Slot */}
              {additionalPhotos.length < 5 && (
                <label className="aspect-[3/4] rounded-2xl border-2 border-dashed border-stone-300 dark:border-stone-700 hover:border-rose-500 dark:hover:border-rose-400 bg-stone-50 dark:bg-stone-800/40 flex flex-col items-center justify-center text-stone-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer transition-all">
                  <Plus className="w-6 h-6 mb-1" />
                  <span className="text-[11px] font-bold">Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => handleFileUpload(e, false)}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            {/* Sample Presets */}
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
              <span className="text-[11px] text-stone-400 font-semibold shrink-0">Sample Photos:</span>
              {sampleAvatars.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPhotoURL(url)}
                  className="w-8 h-8 rounded-full overflow-hidden border-2 border-stone-300 dark:border-stone-700 shrink-0 hover:border-rose-500"
                >
                  <img src={url} alt="Preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                Date of Birth (18+ Mandatory)
              </label>
              <input
                type="date"
                value={dob}
                onChange={e => setDob(e.target.value)}
                required
                max={new Date().toISOString().split('T')[0]}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
              <span className="text-[11px] text-stone-500 dark:text-stone-400 mt-1 block">
                Calculated Age: <strong className="text-rose-600">{currentAge} years</strong>
              </span>
            </div>
          </div>

          {/* Gender and Preference */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                I am a
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['man', 'woman', 'other'] as Gender[]).map(g => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGender(g)}
                    className={`py-2.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                      gender === g
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                Looking to meet
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['woman', 'man', 'everyone'] as LookingFor[]).map(l => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLookingFor(l)}
                    className={`py-2.5 rounded-xl text-xs font-bold capitalize border transition-all ${
                      lookingFor === l
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Jharkhand Location */}
          <div className="p-4 rounded-3xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span className="text-xs font-black uppercase tracking-wider text-rose-900 dark:text-rose-200">
                Jharkhand Location & Local Area
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                  District
                </label>
                <select
                  value={district}
                  onChange={e => setDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-bold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                >
                  {JHARKHAND_DISTRICTS.map(d => (
                    <option key={d.id} value={d.name}>
                      {d.name} {d.isChatra ? '⭐ (Chatra Focus)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-600 dark:text-stone-400 mb-1">
                  Block / Town / Locality
                </label>
                <input
                  type="text"
                  value={subDistrict}
                  onChange={e => setSubDistrict(e.target.value)}
                  placeholder="e.g. Hunterganj, Tandwa, Itkhori, Morabadi"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-xs font-bold focus:ring-2 focus:ring-rose-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Relationship Goal */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
              Looking for
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {Object.entries(RELATIONSHIP_GOALS_META).map(([key, meta]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setRelationshipGoal(key as RelationshipGoal)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    relationshipGoal === key
                      ? 'border-rose-600 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200'
                      : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800/40 text-stone-700 dark:text-stone-300'
                  }`}
                >
                  <span className="text-lg block mb-1">{meta.emoji}</span>
                  <span className="text-xs font-black block">{meta.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
              About Me (Bio)
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              placeholder="Tell others what you love doing, your favorite spots in Jharkhand, or what makes you smile..."
              className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-xs leading-relaxed font-medium focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
          </div>

          {/* Interests Chips */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300">
                Passions & Interests ({selectedInterests.length}/8)
              </label>
              <span className="text-[11px] text-stone-400">Select up to 8</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_INTERESTS.map(interest => {
                const isSelected = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Profession & Education */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                Job Title / Profession
              </label>
              <input
                type="text"
                value={profession}
                onChange={e => setProfession(e.target.value)}
                placeholder="e.g. Software Engineer / Teacher"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-1">
                Education
              </label>
              <input
                type="text"
                value={education}
                onChange={e => setEducation(e.target.value)}
                placeholder="e.g. B.Tech / MBA / Graduate"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 text-sm font-semibold focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Languages Spoken */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-300 mb-2">
              Languages Spoken
            </label>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_LANGUAGES.map(lang => {
                const isSelected = selectedLanguages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                      isSelected
                        ? 'bg-rose-600 text-white border-rose-600'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Save Button */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsProfileEditOpen(false)}
              className="flex-1 py-3 rounded-2xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 font-bold text-xs hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-xs shadow-md shadow-rose-500/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <Check className="w-4 h-4" />
              <span>{isSaving ? 'Uploading to Cloud...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
