
export async function fetchLocalData<T>(jsonPath: string): Promise<T> {
  await new Promise(resolve => setTimeout(resolve, 200)); 

  try {
    const response = await fetch(jsonPath);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} at target destination [${jsonPath}]`);
    }
    
    const rawData = await response.json();
    
    if (!rawData) {
      throw new Error(`Invalid payload or empty data structure returned from: ${jsonPath}`);
    }

    return rawData as T;
  } catch (error) {
    console.error(`Critical Failure in Base API Layer [Path: ${jsonPath}]:`, error);
    throw error;
  }
}