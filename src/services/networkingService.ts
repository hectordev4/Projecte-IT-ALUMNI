import { fetchAlumniData } from './api';
import type { User } from '../types/user';

export interface NetworkingDataPayload {
  mainProfiles: User[];
  suggestions: User[];
  recentActivities: { userName: string; text: string; rawDateString: string }[];
}

/**
 * Custom helper parser to convert your unique "YY-MM-DD,HH:MM:SS" string 
 * into a valid JavaScript Date object for correct chronological sorting.
 */
function parseCustomTimestamp(dateStr: string): Date {
  if (!dateStr) return new Date(0);
  
  // Transforms "26-05-23,14:30:00" -> "2026-05-23T14:30:00"
  // Assuming 20XX century for your modern platform application stack
  const standardFormat = `20${dateStr.replace(',', 'T')}`;
  const parsed = Date.parse(standardFormat);
  
  return isNaN(parsed) ? new Date(0) : new Date(parsed);
}

/**
 * Networking Domain Service — Aligned to your exact Type Contract
 */
export async function getNetworkingPageData(activeFilter: string = 'Popular'): Promise<NetworkingDataPayload> {
  const allUsers = await fetchAlumniData();
  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

  // 1. Compile Global Chronological Timeline Logs 
  // FIXED: Accessing .activities as a single object, using .activity and .timeStamp
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
    .sort((a, b) => {
      return parseCustomTimestamp(b.rawDateString).getTime() - parseCustomTimestamp(a.rawDateString).getTime();
    });

  // 2. Filter Main Profile Feed / Grid Block
  let mainProfilesResult: User[] = [];

  if (activeFilter === 'Most Connected') {
    // FIXED: Using your guaranteed .connections numerical metric property natively
    mainProfilesResult = [...allUsers].sort((a, b) => b.connections - a.connections);
  } 
  else if (activeFilter === 'Recent Activity') {
    // FIXED: Sorting single-object activity timestamps chronologically
    mainProfilesResult = [...allUsers]
      .filter(user => user.activities && user.activities.timeStamp)
      .sort((a, b) => {
        return parseCustomTimestamp(b.activities.timeStamp).getTime() - parseCustomTimestamp(a.activities.timeStamp).getTime();
      });
  } 
  else {
    // Default fallback ("Popular"): Show clean shuffle variation
    mainProfilesResult = shuffle(allUsers);
  }

  // 3. Suggestions Sidebar Array Layer
  // Appends users with the highest connection values down the list column
  const sortedByPopularity = [...allUsers].sort((a, b) => b.connections - a.connections);
  const suggestionsResult = sortedByPopularity.slice(0, 2);

  return {
    mainProfiles: mainProfilesResult,
    suggestions: suggestionsResult,
    recentActivities: flattenedActivities
  };
}