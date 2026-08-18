import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SplashScreen } from './components/common/SplashScreen';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { SwipeDeck } from './components/discover/SwipeDeck';
import { LikesPage } from './components/likes/LikesPage';
import { MatchesPage } from './components/matches/MatchesPage';
import { ProfileView } from './components/profile/ProfileView';
import { SettingsView } from './components/settings/SettingsView';
import { AuthModal } from './components/auth/AuthModal';
import { DiscoveryFilterModal } from './components/discover/DiscoveryFilterModal';
import { ProfileDetailModal } from './components/discover/ProfileDetailModal';
import { ProfileEditModal } from './components/profile/ProfileEditModal';
import { PremiumModal } from './components/premium/PremiumModal';
import { MatchCelebrationModal } from './components/matches/MatchCelebrationModal';
import { ReportModal } from './components/modals/ReportModal';
import { BlockModal } from './components/modals/BlockModal';
import { SafetyGuidelinesModal } from './components/modals/SafetyGuidelinesModal';
import { FirebaseGuideModal } from './components/modals/FirebaseGuideModal';
import { SelfieVerificationModal } from './components/modals/SelfieVerificationModal';
import { ShareModal } from './components/modals/ShareModal';

const MainContent: React.FC = () => {
  const { activeTab, isDarkMode } = useApp();

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''} bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors`}>
      <SplashScreen />

      {/* Top Application Header */}
      <Header />

      {/* Main Tab Views */}
      <main className="pt-2">
        {activeTab === 'discover' && <SwipeDeck />}
        {activeTab === 'likes' && <LikesPage />}
        {activeTab === 'matches' && <MatchesPage />}
        {activeTab === 'profile' && <ProfileView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Mobile-first Bottom Navigation */}
      <BottomNav />

      {/* Global Modals & Dialogs */}
      <AuthModal />
      <DiscoveryFilterModal />
      <ProfileDetailModal />
      <ProfileEditModal />
      <PremiumModal />
      <MatchCelebrationModal />
      <ReportModal />
      <BlockModal />
      <SafetyGuidelinesModal />
      <FirebaseGuideModal />
      <SelfieVerificationModal />
      <ShareModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
