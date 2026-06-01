import type { User } from './user';
import type { CompanyUser } from './companyUser';

export interface JobItem {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  location: string;
  jobType: string;
  techStackTags: string[];
  dateString: string;
  applicationUrl?: string;
}

export interface JobsPageDataPayload {
  jobs: JobItem[];
  companies: CompanyUser[];
  recruiters?: User[];
}