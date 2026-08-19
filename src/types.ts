export type Gender = 'woman' | 'man' | 'other';
export type LookingFor = 'man' | 'woman' | 'everyone';
export type RelationshipGoal = 'long_term' | 'short_term' | 'marriage' | 'friendship' | 'figuring_out';
export type UserRole = 'user' | 'admin';
export type AppLanguage = 'en' | 'hi' | 'khortha' | 'nagpuri';
export type VerificationStatus = 'unverified' | 'pending' | 'verified';

export interface UserProfile {
  id: string;
  uid: string;
  name: string;
  dateOfBirth: string; // YYYY-MM-DD
  age: number;
  gender: Gender;
  lookingFor: LookingFor;
  district: string;
  subDistrict?: string; // Block / locality (e.g. Itkhori, Tandwa, Hunterganj, Chatra town)
  bio: string;
  interests: string[];
  education?: string;
  profession?: string;
  languages: string[];
  relationshipGoal: RelationshipGoal;
  photoURL: string;
  additionalPhotos: string[];
  heightCm?: number;
  isVerified: boolean;
  verificationStatus?: VerificationStatus;
  verificationSelfieURL?: string;
  audioBioURL?: string;
  dietPreference?: 'vegetarian' | 'non_vegetarian' | 'eggetarian' | 'vegan';
  blockedPhoneNumbers?: string[];
  // Privacy-Safe Location Fields (Stored securely on Firestore, exact lat/lon never exposed on public cards)
  latitude?: number;
  longitude?: number;
  geohash?: string;
  locationUpdatedAt?: string;
  locationSharingEnabled?: boolean;
  searchRadiusKm?: number; // 1 | 5 | 10 | 25 | 50 (default: 10)
  isPremium: boolean;
  isOnline?: boolean;
  lastActive: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  isBanned: boolean;
  isSuspended: boolean;
  warningMessage?: string;
  role: UserRole;
  demoProfile?: boolean;
}

export interface JharkhandDistrict {
  id: string;
  name: string;
  isChatra: boolean;
  tag?: string;
  popularAreas: string[];
  headquarter: string;
}

export type SwipeDirection = 'left' | 'right' | 'up';
export type SwipeType = 'pass' | 'like' | 'superlike';

export interface SwipeRecord {
  id: string;
  fromUserId: string;
  toUserId: string;
  type: SwipeType;
  timestamp: string;
}

export interface MatchRecord {
  id: string;
  userIds: [string, string];
  users: {
    [userId: string]: {
      name: string;
      photoURL: string;
      age: number;
      district: string;
      isVerified?: boolean;
    };
  };
  matchedAt: string;
  lastMessage?: string;
  lastMessageTimestamp?: string;
  lastMessageSenderId?: string;
  unreadCounts: {
    [userId: string]: number;
  };
}

export interface ChatMessage {
  id: string;
  matchId: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  isDeleted?: boolean;
  mediaURL?: string;
  mediaType?: 'image' | 'audio';
  audioDurationSeconds?: number;
  isBlurred?: boolean;
}

export type ReportCategory =
  | 'fake_profile'
  | 'harassment'
  | 'spam'
  | 'scam_fraud'
  | 'abusive_language'
  | 'inappropriate_content'
  | 'underage'
  | 'threatening'
  | 'other';

export interface UserReport {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reportedUserName: string;
  category: ReportCategory;
  description: string;
  chatMessageContext?: string;
  status: 'pending' | 'reviewed' | 'action_taken' | 'dismissed';
  createdAt: string;
  resolvedAt?: string;
  adminActionTaken?: 'warned' | 'suspended' | 'banned' | 'dismissed';
  adminNotes?: string;
}

export interface UserBlock {
  id: string;
  blockerId: string;
  blockedUserId: string;
  blockedUserName: string;
  blockedUserPhoto: string;
  createdAt: string;
}

export interface PremiumPlan {
  id: 'weekly' | 'monthly' | 'quarterly';
  title: string;
  durationLabel: string;
  priceINR: number;
  originalPriceINR?: number;
  badge?: string;
  features: string[];
  popular?: boolean;
}

export interface DiscoveryFilterPreferences {
  district: string; // 'All' or specific district e.g. 'Chatra'
  minAge: number;
  maxAge: number;
  genderPreference: LookingFor;
  relationshipGoals: RelationshipGoal[];
  verifiedOnly: boolean;
}

export interface AdminStatistics {
  totalUsers: number;
  activeToday: number;
  totalMatches: number;
  chatraUsers: number;
  pendingReports: number;
  premiumSubscribers: number;
}

export interface NearbyUserCard {
  profile: UserProfile;
  distanceKm: number;
  distanceCategory: '<1km' | '1-5km' | '5-10km' | '>10km';
  distanceLabel: string;
  categoryLabel: string;
  mutualInterests: string[];
  rankingScore: number;
  isEstimatedLocation: boolean;
}

export type NearbyRadiusOption = 1 | 5 | 10 | 25 | 50;

export interface UserLocationCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
  updatedAt: string;
}

