/**
 * Represents the structured timeline activity schema of an individual user.
 * Timestamps follow the strict format: YY-MM-DD,HH:MM:SS
 */
export interface UserActivity {
  activity: string;
  timeStamp: string; // Structured exactly as (YY-MM-DD,HH:MM:SS)
}

/**
 * Core User Profile Interface contract.
 * Used for building dynamic, type-safe layouts across mobile and desktop card views.
 */
export interface User {
  id: number;
  name: string;
  job: string;
  location: string;
  role: 'user'; // Explicit literal constraint since it will be "user" for everyone
  activities: UserActivity;
  overallActivity: number; // Guaranteed to be > 1 if an activity is assigned
  connections: number;     // Randomly distributed tracking metrics
}