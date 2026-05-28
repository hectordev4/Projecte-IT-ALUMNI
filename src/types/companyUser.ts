/**
 * Clean independent schema representing a corporate entity or organization 
 * posting vacancies or engaging within the platform workspace.
 */
export interface CompanyUser {
  id: string;
  companyName: string;
  location: string;
  address: string;
  industry: string;
  website: string;
  logoUrl?: string; // Optional field for future branding expansions
}