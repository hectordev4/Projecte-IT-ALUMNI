/**
 * Core HTTP Data Fetch Engine
 * Responsibilities: Request orchestration, HTTP status checking, fail-safe parsing, and network lag simulation.
 * 
 * Generics (<T>) allow this core engine to cleanly pass any schema structure back 
 * to its calling service layer without hardcoding specific domain structures here.
 */
export async function fetchLocalData<T>(jsonPath: string): Promise<T> {
  // Retain your 200ms network simulation lag
  await new Promise(resolve => setTimeout(resolve, 200)); 

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} at target destination [${jsonPath}]`);
    }
    
    const rawData = await response.json();
    
    // Safety check: Ensure we actually received parseable data back from the stream
    if (!rawData) {
      throw new Error(`Invalid payload or empty data structure returned from: ${jsonPath}`);
    }

    return rawData as T;
  } catch (error) {
    console.error(`Critical Failure in Base API Layer [Path: ${jsonPath}]:`, error);
    throw error;
  }
}