/**
 * Represents a single structured log of a member's recent platform actions.
 */
export interface UserActivity {
  activity: string;
  timeStamp: string;
}

export interface User {
  id: number | string;
  name: string;
  job: string;
  location: string;
  role: string;
  activities: UserActivity;
  overallActivity: number;
  connections: number;
}

export interface UsersPageDataPayload {
  users: User[];
}