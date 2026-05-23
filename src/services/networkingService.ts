import { fetchAlumniData } from './api';
import type { User } from '../types/user';

export interface NetworkingDataPayload {
  popularProfiles: User[];
  suggestions: User[];
  recentActivities: { userName: string; text: string; timestamp: string }[];
}

/**
 * Networking Feature Service
 * Responsibilities: Flattening logs, chronological sorting, and metric filtering.
 */
export async function getNetworkingPageData(activeFilter: string = 'Popular'): Promise<NetworkingDataPayload> {
  // Consume the clean global data fetch engine
  const allUsers = await fetchAlumniData();
  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  // 1. Compile Global Chronological Timeline
  const flattenedActivities = allUsers
    .reduce((acc, user) => {
      if (user.activities && Array.isArray(user.activities)) {
        user.activities.forEach((act: any) => {
          acc.push({ userName: user.name, text: act.text, timestamp: act.timestamp });
        });
      }
      return acc;
    }, [] as { userName: string; text: string; timestamp: string }[])
    .sort((a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp));

  // 2. Main Grid: Keep it random for clean exploration variety
  const gridProfiles = shuffle(allUsers).slice(0, 4);

  // 3. Suggestions Sidebar Logic: Sort by connections if "Popular" or "Most Connected"
  let suggestionProfiles: User[] = [];
  if (activeFilter === 'Popular' || activeFilter === 'Most Connected') {
    suggestionProfiles = [...allUsers]
      .sort((a, b) => (b.connections || 0) - (a.connections || 0))
      .slice(0, 2);
  } else {
    suggestionProfiles = shuffle(allUsers).slice(4, 6);
  }

  return {
    popularProfiles: gridProfiles,
    suggestions: suggestionProfiles,
    recentActivities: flattenedActivities
  };
}