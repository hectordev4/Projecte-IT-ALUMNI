import { fetchLocalData } from './api';
import type { User, UsersPageDataPayload } from '../types/user';

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

export async function getNetworkingPageData(
  activeFilter: string = 'Popular',
  searchQuery: string = ''
): Promise<NetworkingDataPayload> {
  const payload = await fetchLocalData<UsersPageDataPayload>('/data/users.json');
  
  const allUsers = payload.users || [];
  
  const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);
  const cleanQuery = searchQuery.toLowerCase().trim();

  let rawActivitiesList = allUsers.reduce((acc, user) => {
    if (user.activities && user.activities.activity) {
      acc.push({
        userName: user.name,
        text: user.activities.activity,
        rawDateString: user.activities.timeStamp
      });
    }
    return acc;
  }, [] as { userName: string; text: string; rawDateString: string }[]);

  if (cleanQuery.length > 0) {
    rawActivitiesList = rawActivitiesList.filter(act => 
      act.userName.toLowerCase().includes(cleanQuery)
    );
  }

  const sortedActivities = rawActivitiesList.sort((a, b) => 
    parseCustomTimestamp(b.rawDateString).getTime() - parseCustomTimestamp(a.rawDateString).getTime()
  );

  let filteredUsers = allUsers;
  if (cleanQuery.length > 0) {
    filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(cleanQuery));
  }

  let mainProfilesResult: User[] = [];
  if (activeFilter === 'Most Connected') {
    mainProfilesResult = [...filteredUsers].sort((a, b) => b.connections - a.connections);
  } else {
    mainProfilesResult = shuffle(filteredUsers);
  }

  const sortedByPopularity = [...allUsers].sort((a, b) => b.connections - a.connections);

  return {
    mainProfiles: mainProfilesResult,
    suggestions: sortedByPopularity.slice(0, 2),
    recentActivities: sortedActivities
  };
}