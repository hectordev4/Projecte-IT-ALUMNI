import type { User } from '../types/user';

/**
 * Core HTTP Data Fetch Engine
 * Responsibilities: Request orchestration, HTTP status checking, and fail-safe parsing.
 */
export async function fetchAlumniData(jsonPath: string = '/data/users.json'): Promise<User[]> {
  await new Promise(resolve => setTimeout(resolve, 200)); // Network simulation lag

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    
    const rawData = await response.json();
    if (Array.isArray(rawData)) return rawData as User[];
    
    if (rawData && typeof rawData === 'object') {
      const nestedArray = rawData.users || rawData.data || Object.values(rawData).find(Array.isArray);
      if (nestedArray) return nestedArray as User[];
    }
    throw new Error("Data format invalid");
  } catch (error) {
    console.error("Critical Failure in Base API Layer:", error);
    throw error;
  }
}