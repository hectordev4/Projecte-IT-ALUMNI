import { fetchAlumniData } from './api';
import type { User } from '../types/user';

export interface NetworkingDataPayload {
  mainProfiles: User[];
  suggestions: User[];
  recentActivities: { userName: string; text: string; rawDateString: string }[];
}

function parseCustomTimestamp(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  const standardFormat = `20${dateStr.replace(',', 'T')}`;
  const parsed = Date.parse(standardFormat);
  return isNaN(parsed) ? new Date(0) : new Date(parsed);
}

/**
 * Networking Domain Service — Handles sorting conditions AND text filter parsing
 */
export async function getNetworkingPageData(
  activeFilter: string = 'Popular',
  searchQuery: string = ''
): Promise<NetworkingDataPayload> {
  const allUsers = await fetchAlumniData();
  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  // 1. Filter out users globally by name if a search query is typed
  let filteredUsers = allUsers;
  if (searchQuery.length > 0) {
    const cleanQuery = searchQuery.toLowerCase();
    filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(cleanQuery));
  }

  // 2. Compile Global Timeline (Unfiltered by search box, keeping historical record whole)
  const flattenedActivities = allUsers
    .reduce((acc, user) => {
      if (user.activities && user.activities.activity) {
        acc.push({
          userName: user.name,
          text: user.activities.activity,
          rawDateString: user.activities.timeStamp
        });
      }
      return acc;
    }, [] as { userName: string; text: string; rawDateString: string }[])
    .sort((a, b) => parseCustomTimestamp(b.rawDateString).getTime() - parseCustomTimestamp(a.rawDateString).getTime());

  // 3. Process Main Profile Workspace based on Active Filter Tab
  let mainProfilesResult: User[] = [];

  if (activeFilter === 'Most Connected') {
    mainProfilesResult = [...filteredUsers].sort((a, b) => b.connections - a.connections);
  } 
  else if (activeFilter === 'Recent Activity') {
    mainProfilesResult = [...filteredUsers]
      .filter(user => user.activities && user.activities.timeStamp)
      .sort((a, b) => parseCustomTimestamp(b.activities.timeStamp).getTime() - parseCustomTimestamp(a.activities.timeStamp).getTime());
  } 
  else {
    // Default fallback ("Popular"): Shuffled results
    mainProfilesResult = shuffle(filteredUsers);
  }

  // 4. Recommendations Sidebar: Keep locked onto highest connection rankings
  const sortedByPopularity = [...allUsers].sort((a, b) => b.connections - a.connections);

  return {
    mainProfiles: mainProfilesResult,
    suggestions: sortedByPopularity.slice(0, 2),
    recentActivities: flattenedActivities
  };
}