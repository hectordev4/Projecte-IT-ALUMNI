/**
 * Represents a single structured log of a member's recent platform actions.
 */
export interface UserActivity {
  activity: string;
  timeStamp: string;
}

/**
 * Baseline contract definition for platform professional member profiles.
 */
export interface User {
  id: number | string; // Accommodates both legacy number IDs and your new mock string IDs cleanly
  name: string;
  job: string;
  location: string;
  role: string;
  activities: UserActivity;
  overallActivity: number;
  connections: number;
}

/**
 * Root wrapper schema representing the incoming user payload database stream container.
 * This explicitly structures your users.json file to eliminate implicit 'any' lookups.
 */
export interface UsersPageDataPayload {
  users: User[];
}