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
export async function getJobsPageData(
  activeFilter: string = 'Popular',
  searchQuery: string = ''
): Promise<JobsDataFilteredPayload> {
  // 1. Dispatch generic base fetch to retrieve the multi-domain JSON asset
  const data = await fetchLocalData<JobsPageDataPayload>('/data/jobs.json');

  const allJobs = data.jobs || [];
  const allCompanies = data.companies || [];
  const allRecruiters = data.recruiters || [];

  const cleanQuery = searchQuery.toLowerCase().trim();

  // 2. Loose-match global search evaluation across fields
  const filteredJobs = allJobs.filter((job) => {
    if (!cleanQuery) return true;

    const matchesTitle = job.title.toLowerCase().includes(cleanQuery);
    const matchesCompany = job.companyName.toLowerCase().includes(cleanQuery);
    const matchesStack = job.techStackTags.some((tag) =>
      tag.toLowerCase().includes(cleanQuery)
    );

    return matchesTitle || matchesCompany || matchesStack;
  });

  // 3. Handle specific filter tab logic permutations down the road if needed
  let sortedJobs = filteredJobs;
  if (activeFilter === 'Recent') {
    // In a real database environment you would sort via explicit timestamp numbers.
    // For local mock listings, we retain the asset sequence or reverse it for chronological mock updates.
    sortedJobs = [...filteredJobs].reverse();
  }

  // 4. Return clean segmented collections mapped explicitly to payload definitions
  return {
    mainJobs: sortedJobs,
    associatedCompanies: allCompanies,
    activeRecruiters: allRecruiters
  };
}