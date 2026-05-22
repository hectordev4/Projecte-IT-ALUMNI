import type { User } from '../types/user';

/**
 * Robust API Simulation Engine
 * Simulates network latency, handles parsing safely, and guards against object wrappers.
 */
export async function fetchAlumniData(jsonPath: string = '/data/users.json'): Promise<User[]> {
  // Simulating a 400ms network round-trip latency
  await new Promise(resolve => setTimeout(resolve, 400));

  try {
    const response = await fetch(jsonPath);
    
    if (!response.ok) {
      throw new Error(`HTTP Error Status: Server returned code ${response.status}`);
    }
    
    const rawData = await response.json();

    // Guard Clause: Direct array check
    if (Array.isArray(rawData)) {
      return rawData as User[];
    } 
    
    // Fail-safe: Auto-extract array if wrapped inside an object root property
    if (rawData && typeof rawData === 'object') {
      const nestedArray = rawData.users || rawData.data || Object.values(rawData).find(Array.isArray);
      if (nestedArray) {
        return nestedArray as User[];
      }
    }

    throw new Error("Data Error: Expected a JSON array format, but received an unparsed object pattern.");
  } catch (error) {
    console.error("Critical Failure in API Service Data Fetch Pipeline:", error);
    // Propagate up so components can display an elegant fallback error message
    throw error;
  }
}