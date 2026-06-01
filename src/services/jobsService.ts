import { fetchLocalData } from './api';
import type { JobsPageDataPayload, JobItem } from '../types/job';
import type { CompanyUser } from '../types/companyUser';
import type { User } from '../types/user';

export interface JobsDataFilteredPayload {
  mainJobs: JobItem[];
  associatedCompanies: CompanyUser[];
  activeRecruiters: User[];
}

export async function getJobsPageData(
  sortBy: string = 'Recent',
  searchQuery: string = '',
  techStack: string = 'All',
  location: string = 'All'
): Promise<JobsDataFilteredPayload> {
  const data = await fetchLocalData<JobsPageDataPayload>('/data/jobs.json');
  const allJobs = data.jobs || [];
  const allCompanies = data.companies || [];
  const allRecruiters = data.recruiters || [];

  const cleanQuery = searchQuery.toLowerCase().trim();

  const filteredJobs = allJobs.filter((job) => {
    
    const matchesSearch = !cleanQuery || 
      job.title.toLowerCase().includes(cleanQuery) ||
      job.companyName.toLowerCase().includes(cleanQuery) ||
      job.techStackTags.some((tag) => tag.toLowerCase().includes(cleanQuery));

    const matchesTech = techStack === 'All' || job.techStackTags.includes(techStack);

    const matchesLoc = location === 'All' || job.location.includes(location);

    return matchesSearch && matchesTech && matchesLoc;
  });

  let sortedJobs = [...filteredJobs];
  if (sortBy === 'Older') {
  } else {
    sortedJobs.reverse(); 
  }

  return {
    mainJobs: sortedJobs,
    associatedCompanies: allCompanies,
    activeRecruiters: allRecruiters
  };
}