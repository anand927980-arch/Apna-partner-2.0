/**
 * Geo Utilities for Apna Partner Dating App
 * Provides Haversine distance, standard Geohash calculation,
 * privacy-safe approximate distance formatting, and smart candidate ranking.
 */

import { UserProfile } from '../types';

// Standard Geohash Base32 character map
const BASE32 = '0123456789bcdefghjkmnpqrstuvwxyz';

/**
 * Standard Geohash encoder (precision 4-9)
 */
export function encodeGeohash(latitude: number, longitude: number, precision: number = 7): string {
  let latMin = -90.0;
  let latMax = 90.0;
  let lonMin = -180.0;
  let lonMax = 180.0;

  let hash = '';
  let bit = 0;
  let ch = 0;
  let isEven = true;

  while (hash.length < precision) {
    if (isEven) {
      const mid = (lonMin + lonMax) / 2;
      if (longitude >= mid) {
        ch |= 1 << (4 - bit);
        lonMin = mid;
      } else {
        lonMax = mid;
      }
    } else {
      const mid = (latMin + latMax) / 2;
      if (latitude >= mid) {
        ch |= 1 << (4 - bit);
        latMin = mid;
      } else {
        latMax = mid;
      }
    }

    isEven = !isEven;
    if (bit < 4) {
      bit++;
    } else {
      hash += BASE32[ch];
      bit = 0;
      ch = 0;
    }
  }

  return hash;
}

/**
 * Calculate Great-Circle (Haversine) distance in Kilometers
 */
export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  if (lat1 === lat2 && lon1 === lon2) return 0;

  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  // Round to 1 decimal place
  return Math.round(distance * 10) / 10;
}

export type DistanceCategory = '<1km' | '1-5km' | '5-10km' | '>10km';

/**
 * Privacy-safe distance categorization & localized label formatting
 */
export function getDistanceInfo(distanceKm: number): {
  category: DistanceCategory;
  categoryLabel: string;
  displayLabel: string;
} {
  if (distanceKm < 1) {
    return {
      category: '<1km',
      categoryLabel: 'बहुत पास',
      displayLabel: 'बहुत पास (< 1 km)',
    };
  } else if (distanceKm <= 5) {
    return {
      category: '1-5km',
      categoryLabel: '5 km के अंदर',
      displayLabel: `${distanceKm.toFixed(1)} km दूर (5 km के अंदर)`,
    };
  } else if (distanceKm <= 10) {
    return {
      category: '5-10km',
      categoryLabel: '10 km के अंदर',
      displayLabel: `${distanceKm.toFixed(1)} km दूर (10 km के अंदर)`,
    };
  } else {
    return {
      category: '>10km',
      categoryLabel: '10+ km',
      displayLabel: `${distanceKm.toFixed(1)} km दूर`,
    };
  }
}

/**
 * Approximate default center coordinates for Jharkhand districts & regions.
 * Used for fallback district-based matching and seed data.
 */
export const DISTRICT_COORDINATES: Record<string, { lat: number; lon: number }> = {
  Chatra: { lat: 24.2087, lon: 84.8722 },
  'Itkhori, Chatra': { lat: 24.2982, lon: 85.1558 },
  'Tandwa, Chatra': { lat: 23.8561, lon: 85.0345 },
  'Hunterganj, Chatra': { lat: 24.4751, lon: 84.819 },
  'Simaria, Chatra': { lat: 24.0538, lon: 84.9272 },
  Hazaribagh: { lat: 23.9925, lon: 85.3637 },
  Ranchi: { lat: 23.3441, lon: 85.3096 },
  Gaya: { lat: 24.7955, lon: 85.0002 },
  Dhanbad: { lat: 23.7957, lon: 86.4304 },
  Bokaro: { lat: 23.6693, lon: 86.1511 },
  Giridih: { lat: 24.1856, lon: 86.3072 },
  Koderma: { lat: 24.4674, lon: 85.5939 },
  Latehar: { lat: 23.7431, lon: 84.5029 },
  Ramgarh: { lat: 23.6334, lon: 85.5147 },
  Deoghar: { lat: 24.4826, lon: 86.6977 },
  Jamshedpur: { lat: 22.8046, lon: 86.2029 },
  Palamu: { lat: 24.0416, lon: 84.0722 },
  Garhwa: { lat: 24.1611, lon: 83.8055 },
  Dumka: { lat: 24.2694, lon: 87.25 },
};

/**
 * Get approximate coordinates for a profile based on user's exact coords (if available)
 * or fallback to their district/locality centroid with slight jitter for privacy.
 */
export function getProfileLocation(profile: UserProfile): { lat: number; lon: number; isEstimated: boolean } {
  if (typeof profile.latitude === 'number' && typeof profile.longitude === 'number') {
    return {
      lat: profile.latitude,
      lon: profile.longitude,
      isEstimated: false,
    };
  }

  // Fallback to district centroid
  const key = `${profile.subDistrict || ''}, ${profile.district}`;
  const districtKey = profile.district;
  const coords = DISTRICT_COORDINATES[key] || DISTRICT_COORDINATES[districtKey] || DISTRICT_COORDINATES['Chatra'];

  // Add slight deterministic pseudo-jitter (±0.015 deg ~ 1.5 km) based on user ID so all profiles in same district don't overlap on a single point
  let hash = 0;
  for (let i = 0; i < profile.id.length; i++) {
    hash = (hash << 5) - hash + profile.id.charCodeAt(i);
    hash |= 0;
  }
  const jitterLat = ((Math.abs(hash) % 100) - 50) * 0.0003;
  const jitterLon = ((Math.abs(hash * 31) % 100) - 50) * 0.0003;

  return {
    lat: coords.lat + jitterLat,
    lon: coords.lon + jitterLon,
    isEstimated: true,
  };
}

/**
 * Smart Ranking Algorithm:
 * Calculates ranking score (0 to 100) based on:
 * 1. Distance (closer = higher score, up to 35 pts)
 * 2. Same district bonus (15 pts)
 * 3. Common interests (up to 20 pts)
 * 4. Age preference compatibility (10 pts)
 * 5. Profile completeness (10 pts)
 * 6. Recent activity (10 pts)
 */
export function calculateNearbyRankingScore(
  currentUser: UserProfile | null,
  candidate: UserProfile,
  distanceKm: number,
  maxRadiusKm: number
): { score: number; mutualInterests: string[] } {
  let score = 0;

  // 1. Distance factor (0-35 points)
  if (distanceKm <= maxRadiusKm) {
    const proximityRatio = Math.max(0, 1 - distanceKm / maxRadiusKm);
    score += Math.round(proximityRatio * 35);
  }

  // 2. Same district bonus (15 points)
  if (currentUser && currentUser.district && candidate.district) {
    if (currentUser.district.toLowerCase() === candidate.district.toLowerCase()) {
      score += 15;
    }
  }

  // 3. Common interests (up to 20 points, 5 pts per mutual interest)
  const currentInterests = currentUser?.interests || [];
  const candidateInterests = candidate.interests || [];
  const mutualInterests = currentInterests.filter(i => candidateInterests.includes(i));
  score += Math.min(20, mutualInterests.length * 5);

  // 4. Age preference compatibility (10 points)
  if (currentUser) {
    const ageDiff = Math.abs(currentUser.age - candidate.age);
    if (ageDiff <= 3) score += 10;
    else if (ageDiff <= 6) score += 6;
    else if (ageDiff <= 10) score += 3;
  } else {
    score += 5;
  }

  // 5. Profile completeness (10 points)
  if (candidate.photoURL) score += 3;
  if (candidate.additionalPhotos && candidate.additionalPhotos.length > 0) score += 2;
  if (candidate.bio && candidate.bio.length > 20) score += 2;
  if (candidate.profession || candidate.education) score += 2;
  if (candidate.isVerified) score += 1;

  // 6. Recent activity (10 points)
  if (candidate.isOnline) score += 10;
  else if (candidate.lastActive === 'Just now' || candidate.lastActive.includes('min') || candidate.lastActive.includes('hour')) {
    score += 6;
  } else {
    score += 2;
  }

  return { score, mutualInterests };
}
