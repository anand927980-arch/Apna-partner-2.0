import { AppLanguage } from '../types';

export interface Translations {
  appName: string;
  tagline: string;
  taglineSub: string;
  nav: {
    discover: string;
    likes: string;
    matches: string;
    profile: string;
    admin: string;
    settings: string;
  };
  discover: {
    noMoreProfiles: string;
    noMoreDesc: string;
    resetFilters: string;
    like: string;
    pass: string;
    superlike: string;
    undo: string;
    boost: string;
    filters: string;
    distanceAway: string;
    verifiedMember: string;
    voiceBio: string;
    playVoice: string;
    pauseVoice: string;
    about: string;
    interests: string;
    location: string;
    goal: string;
  };
  chat: {
    sayHello: string;
    placeholder: string;
    send: string;
    recording: string;
    tapToReveal: string;
    photoSent: string;
    voiceNote: string;
    icebreakers: string;
    online: string;
    offline: string;
    safetyWarning: string;
    block: string;
    report: string;
  };
  profile: {
    editProfile: string;
    verification: string;
    verifiedBadge: string;
    getVerified: string;
    verifiedDescription: string;
    goldMember: string;
    upgradeGold: string;
    safetyCenter: string;
    logout: string;
  };
  settings: {
    title: string;
    language: string;
    incognito: string;
    incognitoDesc: string;
    soundEffects: string;
    darkMode: string;
    deleteAccount: string;
    terms: string;
    privacy: string;
  };
  verification: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    takeSelfie: string;
    verifying: string;
    success: string;
    submit: string;
  };
  icebreakersList: string[];
}

export const TRANSLATIONS: Record<AppLanguage, Translations> = {
  hi: {
    appName: 'अपना पार्टनर',
    tagline: 'अपनों से मिलने का नया तरीका ❤️',
    taglineSub: 'झारखंड और चतरा का सबसे सुरक्षित डेटिंग मंच',
    nav: {
      discover: 'खोजें',
      likes: 'पसंद',
      matches: 'जोड़ियाँ',
      profile: 'प्रोफाइल',
      admin: 'प्रशासक',
      settings: 'सेटिंग्स',
    },
    discover: {
      noMoreProfiles: 'फिलहाल सभी प्रोफाइल देख चुके हैं',
      noMoreDesc: 'अपने फिल्टर बदलकर देखें या कुछ देर बाद दोबारा आएं।',
      resetFilters: 'फिल्टर रीसेट करें',
      like: 'पसंद करें',
      pass: 'छोड़ें',
      superlike: 'सुपर लाइक',
      undo: 'वापस लाएं',
      boost: 'बूस्ट',
      filters: 'फिल्टर',
      distanceAway: 'दूरी',
      verifiedMember: 'प्रमाणित सदस्य',
      voiceBio: 'आवाज परिचय',
      playVoice: 'आवाज सुनें',
      pauseVoice: 'रोकें',
      about: 'मेरे बारे में',
      interests: 'रुचियां और शौक',
      location: 'स्थान',
      goal: 'तलाश',
    },
    chat: {
      sayHello: 'जोहार / नमस्ते कहें ❤️',
      placeholder: 'संदेश लिखें...',
      send: 'भेजें',
      recording: 'रिकॉर्डिंग हो रही है...',
      tapToReveal: 'फोटो देखने के लिए टैप करें (सुरक्षित पूर्वावलोकन)',
      photoSent: 'फोटो भेजी गई',
      voiceNote: 'आवाज संदेश',
      icebreakers: 'बातचीत शुरू करने के सवाल',
      online: 'ऑनलाइन',
      offline: 'सक्रिय थे',
      safetyWarning: 'सुरक्षा नियम: अपनी निजी बैंक जानकारी या ओटीपी कभी साझा न करें।',
      block: 'ब्लॉक करें',
      report: 'रिपोर्ट करें',
    },
    profile: {
      editProfile: 'प्रोफाइल संपादित करें',
      verification: 'सेल्फी प्रमाणीकरण',
      verifiedBadge: 'ब्लू टिक प्रमाणित',
      getVerified: 'ब्लू टिक प्राप्त करें',
      verifiedDescription: 'असली प्रोफाइल साबित करने के लिए एक त्वरित सेल्फी लें।',
      goldMember: 'गोल्ड वीआईपी सदस्य',
      upgradeGold: 'गोल्ड में अपग्रेड करें',
      safetyCenter: 'सुरक्षा केंद्र',
      logout: 'लॉग आउट करें',
    },
    settings: {
      title: 'सेटिंग्स और गोपनीयता',
      language: 'ऐप की भाषा',
      incognito: 'कॉन्टैक्ट ब्लॉक (गुप्त मोड)',
      incognitoDesc: 'उन फोन नंबरों को अपनी प्रोफाइल से छिपाएं।',
      soundEffects: 'ध्वनि प्रभाव (साउंड्स)',
      darkMode: 'डार्क मोड',
      deleteAccount: 'अकाउंट हटाएं',
      terms: 'नियम और शर्तें',
      privacy: 'गोपनीयता नीति',
    },
    verification: {
      title: 'त्वरित सेल्फी प्रमाणीकरण',
      subtitle: 'अपना असली चेहरा प्रमाणित करें और तुरंत ब्लू टिक पाएं',
      step1: 'दिखाए गए हाथ के इशारे की तरह पोज बनाएं (✌️ 2 उंगलियां ऊपर)',
      step2: 'कैमरे की ओर देखें और सेल्फी खींचें',
      takeSelfie: 'सेल्फी लें',
      verifying: 'सत्यापन हो रहा है...',
      success: 'बधाई हो! आपकी प्रोफाइल अब ब्लू टिक प्रमाणित है।',
      submit: 'प्रमाणीकरण पूरा करें',
    },
    icebreakersList: [
      'जोहार! चतरा में आपकी सबसे पसंदीदा चाय की दुकान कौन सी है? ☕',
      'पतरातू घाटी की लॉन्ग ड्राइव या मैथन डैम की पिकनिक? 🚗',
      'नेतरहाट का सनसेट देखना पसंद है या हजारीबाग लेक की सैर? 🌅',
      'छुट्टी के दिन घर पर आराम या दोस्तों के साथ बाहर निकलना? ✨',
      'झारखंड का आपका सबसे पसंदीदा व्यंजन क्या है? 🍲',
    ],
  },

  khortha: {
    appName: 'अपना पार्टनर',
    tagline: 'अपन मनपसंद साथी पावा ❤️',
    taglineSub: 'झारखंड आर चतरा केर खांटी डेटिंग ऐप',
    nav: {
      discover: 'खोजा',
      likes: 'पसंद',
      matches: 'जोड़ी',
      profile: 'प्रोफाइल',
      admin: 'एडमिन',
      settings: 'सेटिंग',
    },
    discover: {
      noMoreProfiles: 'एखनी सब प्रोफाइल देख लेलहा',
      noMoreDesc: 'अपन फिल्टर बदल के देखा या तनिक देरी बाद आबा।',
      resetFilters: 'फिल्टर रीसेट करा',
      like: 'पसंद करा',
      pass: 'छोड़ा',
      superlike: 'सुपर लाइक',
      undo: 'घूरा',
      boost: 'बूस्ट',
      filters: 'फिल्टर',
      distanceAway: 'दूरी',
      verifiedMember: 'पक्का सदस्य',
      voiceBio: 'आवाज परिचय',
      playVoice: 'आवाज सुना',
      pauseVoice: 'रोका',
      about: 'हमर बारे में',
      interests: 'शौक आर पसंद',
      location: 'ठिकाना',
      goal: 'इरादा',
    },
    chat: {
      sayHello: 'जोहार कहा ❤️',
      placeholder: 'बात लिखा...',
      send: 'भेजा',
      recording: 'आवाज रिकॉर्ड हो रहल हे...',
      tapToReveal: 'फोटो देखे लेल छुवा',
      photoSent: 'फोटो भेजल गेल',
      voiceNote: 'आवाज संदेश',
      icebreakers: 'गपशप शुरू करेक सवाल',
      online: 'ऑनलाइन',
      offline: 'एखनी दूर हथी',
      safetyWarning: 'सावधान: ककरो बैंक खाता या रुपिया पईसा केर बात ना करा।',
      block: 'ब्लॉक करा',
      report: 'शिकायत करा',
    },
    profile: {
      editProfile: 'प्रोफाइल सुधारा',
      verification: 'सेल्फी से जांच',
      verifiedBadge: 'ब्लू टिक पास',
      getVerified: 'ब्लू टिक लेवा',
      verifiedDescription: 'अपन असली फोटो देखा के ब्लू टिक पावा।',
      goldMember: 'गोल्ड वीआईपी',
      upgradeGold: 'गोल्ड अपग्रेड करा',
      safetyCenter: 'सुरक्षा केंद्र',
      logout: 'बाहर निकला',
    },
    settings: {
      title: 'सेटिंग आर सुरक्षा',
      language: 'भाषा चुना',
      incognito: 'नंबर छिपावा (गुप्त मोड)',
      incognitoDesc: 'जान-पहचान वाला नंबर से अपन प्रोफाइल छिपावा।',
      soundEffects: 'आवाज आवाज (साउंड)',
      darkMode: 'डार्क मोड',
      deleteAccount: 'खाता मिटावा',
      terms: 'नियम कानून',
      privacy: 'गोपनीयता',
    },
    verification: {
      title: 'तुरते सेल्फी जांच',
      subtitle: 'अपन असली चेहरा देखा के ब्लू टिक पावा',
      step1: 'दू गो अंगुली उठा के पोज बनावा (✌️)',
      step2: 'कैमरा बाटे देख के फोटो खींचा',
      takeSelfie: 'फोटो खींचा',
      verifying: 'जांच हो रहल हे...',
      success: 'बधाई! तोहार प्रोफाइल ब्लू टिक प्रमाणित भेल।',
      submit: 'पूरा करा',
    },
    icebreakersList: [
      'जोहार संगी! चतरा म सबसे बढ़िया समोसा-चाय कहाँ मिले हे? ☕',
      'पतरातू घाटी घूमेक मन हे की नेतरहाट के पहाड़? 🚗',
      'संडे के दिन सुतेक मन हे की बहार घुमेक? ✨',
      'तोहार मनपसंद गाना कौन टा लगे? 🎶',
    ],
  },

  nagpuri: {
    appName: 'अपना पार्टनर',
    tagline: 'अपन जोड़ीदार खोजा ❤️',
    taglineSub: 'छोटानागपुर आर चतरा केर आपन संगम',
    nav: {
      discover: 'खोजा',
      likes: 'पसंद',
      matches: 'जोड़ी',
      profile: 'प्रोफाइल',
      admin: 'एडमिन',
      settings: 'सेटिंग',
    },
    discover: {
      noMoreProfiles: 'एखन सब प्रोफाइल देख लेली',
      noMoreDesc: 'तनी फिल्टर बदल के देखा चाहे फेर आबा।',
      resetFilters: 'फिल्टर फेर करा',
      like: 'पसंद करा',
      pass: 'छोड़ा',
      superlike: 'सुपर लाइक',
      undo: 'फेर लाबा',
      boost: 'बूस्ट',
      filters: 'फिल्टर',
      distanceAway: 'दूरी',
      verifiedMember: 'जांचल सदस्य',
      voiceBio: 'आवाज बायो',
      playVoice: 'आवाज सुना',
      pauseVoice: 'रोका',
      about: 'मोरे बारे में',
      interests: 'पसंद आर शौक',
      location: 'गाँव/सहर',
      goal: 'इरादा',
    },
    chat: {
      sayHello: 'जोहार बोलू ❤️',
      placeholder: 'संदेश लिखा...',
      send: 'भेजू',
      recording: 'आवाज रिकॉर्ड होवेला...',
      tapToReveal: 'फोटो देखेक लेल छुआ',
      photoSent: 'फोटो पठाल गेल',
      voiceNote: 'आवाज संदेश',
      icebreakers: 'गपशप करेक बात',
      online: 'हाजिर हई',
      offline: 'दूर हई',
      safetyWarning: 'सावधान: अपन पिन नंबर या गुप्त बात ककरो ना बताबू।',
      block: 'ब्लॉक करू',
      report: 'शिकायत करू',
    },
    profile: {
      editProfile: 'प्रोफाइल बदला',
      verification: 'सेल्फी जांच',
      verifiedBadge: 'ब्लू टिक',
      getVerified: 'ब्लू टिक लेबू',
      verifiedDescription: 'अपन असली चेहरा देखा के ब्लू टिक कमावा।',
      goldMember: 'गोल्ड वीआईपी',
      upgradeGold: 'गोल्ड मे जावा',
      safetyCenter: 'सुरक्षा',
      logout: 'बाहर निकला',
    },
    settings: {
      title: 'सेटिंग आर सुरक्षा',
      language: 'भाखा',
      incognito: 'नंबर छिपावा',
      incognitoDesc: 'चिन्हल-जानल नंबर से अपन आईडी छिपावा।',
      soundEffects: 'आवाज (साउंड)',
      darkMode: 'डार्क मोड',
      deleteAccount: 'अकाउंट हटावा',
      terms: 'नियम',
      privacy: 'गोपनीयता',
    },
    verification: {
      title: 'सेल्फी से जांच',
      subtitle: 'असली चेहरा साबित करा आर ब्लू टिक पावा',
      step1: 'दू उंगली ऊपर कर के पोज बनाबू (✌️)',
      step2: 'कैमरा मे देख के फोटो लेबू',
      takeSelfie: 'फोटो खींचा',
      verifying: 'जांच होवत हे...',
      success: 'बधाई! तोहार प्रोफाइल अब ब्लू टिक वाला भेल।',
      submit: 'जमा करा',
    },
    icebreakersList: [
      'जोहार! चतरा चौक में गरमा गरम चाय आर गपशप? ☕',
      'पतरातू घाटी के मोड़ कि दशम फॉल के पानी? 🚗',
      'सरहुल आर करमा पूजा में नाचेक कइसन लागेला? 🌸',
    ],
  },

  en: {
    appName: 'Apna Partner',
    tagline: 'Connect with genuine souls ❤️',
    taglineSub: "Jharkhand & Chatra's Safe Verified Dating Community",
    nav: {
      discover: 'Discover',
      likes: 'Likes',
      matches: 'Matches',
      profile: 'Profile',
      admin: 'Admin',
      settings: 'Settings',
    },
    discover: {
      noMoreProfiles: 'You have seen all nearby profiles',
      noMoreDesc: 'Adjust your distance or age filters to meet more members in Jharkhand.',
      resetFilters: 'Reset Filters',
      like: 'Like',
      pass: 'Pass',
      superlike: 'Super Like',
      undo: 'Undo',
      boost: 'Boost',
      filters: 'Filters',
      distanceAway: 'away',
      verifiedMember: 'Verified Member',
      voiceBio: 'Voice Bio',
      playVoice: 'Listen Voice',
      pauseVoice: 'Pause',
      about: 'About Me',
      interests: 'Interests & Passions',
      location: 'Location',
      goal: 'Looking For',
    },
    chat: {
      sayHello: 'Say Johar / Hello ❤️',
      placeholder: 'Type a message...',
      send: 'Send',
      recording: 'Recording audio memo...',
      tapToReveal: 'Tap to view photo (Safety Preview)',
      photoSent: 'Photo shared',
      voiceNote: 'Voice Note',
      icebreakers: 'Jharkhand Icebreakers',
      online: 'Online',
      offline: 'Last seen recently',
      safetyWarning: 'Safety Reminder: Never send money or share bank OTPs with anyone.',
      block: 'Block User',
      report: 'Report Profile',
    },
    profile: {
      editProfile: 'Edit Profile',
      verification: 'Selfie Verification',
      verifiedBadge: 'Blue Verified',
      getVerified: 'Get Blue Verified Badge',
      verifiedDescription: 'Take a quick pose selfie to prove authenticity.',
      goldMember: 'Gold VIP Member',
      upgradeGold: 'Upgrade to Gold VIP',
      safetyCenter: 'Safety Center',
      logout: 'Sign Out',
    },
    settings: {
      title: 'Settings & Privacy',
      language: 'App Language',
      incognito: 'Block Contacts (Incognito Mode)',
      incognitoDesc: 'Hide your profile from specific phone numbers.',
      soundEffects: 'Haptic Sound Effects',
      darkMode: 'Dark Mode',
      deleteAccount: 'Delete Account',
      terms: 'Terms of Service',
      privacy: 'Privacy Policy',
    },
    verification: {
      title: 'Quick Selfie Verification',
      subtitle: 'Prove authenticity to earn the Blue Verified badge',
      step1: 'Pose with peace gesture (✌️ 2 fingers up)',
      step2: 'Look directly at camera and snap photo',
      takeSelfie: 'Snap Verification Selfie',
      verifying: 'Verifying authenticity...',
      success: 'Congratulations! Your profile is now Blue Badge Verified.',
      submit: 'Submit Verification',
    },
    icebreakersList: [
      'Johar! What is your all-time favorite chai & adda spot in Chatra? ☕',
      'Weekend getaway: Long scenic drive to Patratu Valley or Maithon Dam? 🚗',
      'Netarhat sunrise or scenic waterfalls picnic? 🌅',
      'Sunday mood: Cozy reading at home or stepping out with friends? ✨',
      'What is your favorite local Jharkhand dish? 🍲',
    ],
  },
};
