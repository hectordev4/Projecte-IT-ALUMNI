import { fetchLocalData } from './api';
import type { JobsPageDataPayload, JobItem } from '../types/job';
import type { CompanyUser } from '../types/companyUser';
import type { User } from '../types/user';

export interface JobsDataFilteredPayload {
  mainJobs: JobItem[];
  associatedCompanies: CompanyUser[];
  activeRecruiters: User[];
}

/**
 * Handles fetching, query evaluations, and structural sorting for the Job Portal workspace panel.
 * Separating this from the UI layer allows instant filtering with high-frequency inputs.
 * * @param activeFilter - Target filter tracking (e.g., 'Popular', 'Recent').
 * @param searchQuery - Case-insensitive loose-match evaluation string.
 */
/**
 * Updated Service Layer: Now handles the full 4-parameter matrix from the FilterBar.
 */
export async function getJobsPageData(
  sortBy: string = 'Recent',
  searchQuery: string = '',
  techStack: string = 'All',
  location: string = 'All'
): Promise<JobsDataFilteredPayload> {
  // 1. Fetch data
  const data = await fetchLocalData<JobsPageDataPayload>('/data/jobs.json');

  const allJobs = data.jobs || [];
  const allCompanies = data.companies || [];
  const allRecruiters = data.recruiters || [];

  const cleanQuery = searchQuery.toLowerCase().trim();

  // 2. Comprehensive Filter Evaluation
  const filteredJobs = allJobs.filter((job) => {
    
    // A. Text Search Match (Title, Company, or Tags)
    const matchesSearch = !cleanQuery || 
      job.title.toLowerCase().includes(cleanQuery) ||
      job.companyName.toLowerCase().includes(cleanQuery) ||
      job.techStackTags.some((tag) => tag.toLowerCase().includes(cleanQuery));

    // B. Tech Stack Dropdown Match
    const matchesTech = techStack === 'All' || job.techStackTags.includes(techStack);

    // C. Location Dropdown Match
    // Using .includes() so "Barcelona" will match "Barcelona (Híbrid)" safely
    const matchesLoc = location === 'All' || job.location.includes(location);

    // Job must pass ALL active filters to be shown
    return matchesSearch && matchesTech && matchesLoc;
  });

  // 3. Apply Sorting
  let sortedJobs = [...filteredJobs];
  if (sortBy === 'Older') {
    // If you want Older first, keep original chronological order (assuming JSON is newest first)
    // Or adjust based on how your JSON is actually structured!
  } else {
    // Default to 'Recent' - reverse the array to simulate newest-first
    sortedJobs.reverse(); 
  }

  // 4. Return formatted payload
  return {
    mainJobs: sortedJobs,
    associatedCompanies: allCompanies,
    activeRecruiters: allRecruiters
  };
}