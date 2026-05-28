import { createCard } from '../components/Card';
import { PageManager } from '../managers/pageManager';
import { getJobsPageData } from '../services/jobsService';
import { createFilterBar } from '../components/FilterBar';
import type { JobItem } from '../types/job';
import type { CompanyUser } from '../types/companyUser';
import type { User } from '../types/user';
import '../../styles/jobs.css';

/**
 * Generates and manages the responsive Job Portal workspace view.
 * Integrates directly with the composite multi-dropdown Filter Bar matrix.
 */
export function setupJobs(pageManager: PageManager): HTMLElement {
  const container = document.createElement('section');
  container.className = 'jobs-page-wrapper';

  // 1. Core structural shells matching layout containers
  container.innerHTML = `
    <!-- Top Filter Header Slot Anchor -->
    <div class="jobs-header-filter-slot"></div>

    <main style="width: 100%; margin-top: 1rem;">
      <div class="view-mobile jobs-mobile-container">
        <div class="mobile-jobs-feed" id="mobile-jobs-target"></div>
      </div>

      <div class="view-desktop jobs-desktop-container">
        <div id="desktop-jobs-workspace-target"></div>
      </div>
    </main>
  `;

  const filterSlot = container.querySelector('.jobs-header-filter-slot') as HTMLElement;
  const mobileFeed = container.querySelector('#mobile-jobs-target') as HTMLElement;
  const workspaceTarget = container.querySelector('#desktop-jobs-workspace-target') as HTMLElement;

  // Static unique filter taxonomies matched from your raw mock dataset
  const techStacks = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'C++', 'Vue.js', 'Solidity', 'Go'];
  const locations = ['Barcelona (Híbrid)', 'Barcelona (Presencial)', 'Remot (Espanya)', 'Remot (Global)', 'Girona (Presencial)', 'Mataró (Híbrid)'];

  // --------------------------------------------------------------------------
  // CENTRALIZED WORKSPACE RENDERING DISPATCHER
  // --------------------------------------------------------------------------
  const renderJobWorkspaceLayout = (
    jobs: JobItem[], 
    companies: CompanyUser[], 
    recruiters: User[]
  ) => {
    const hasRecruiters = recruiters.length > 0;

    // --- A. MOBILE RENDERING MATRIX ---
    if (mobileFeed) {
      mobileFeed.innerHTML = '';
      if (jobs.length === 0) {
        mobileFeed.innerHTML = '<p class="jobs-feed-empty-alert">No s\'han trobat ofertes coincidents.</p>';
      } else {
        jobs.forEach(job => {
          const jobCard = document.createElement('div');
          jobCard.className = 'mobile-job-item-card';
          jobCard.innerHTML = `
            <div class="job-card-main-info">
              <h3 class="job-item-title">${job.title}</h3>
              <p class="job-item-company">${job.companyName} — <span class="job-item-loc">${job.location}</span></p>
              <div class="job-tags-row">
                <span class="job-badge-tag job-type-accent">${job.jobType}</span>
                ${job.techStackTags.map(tag => `<span class="job-badge-tag">${tag}</span>`).join('')}
              </div>
            </div>
            <span class="job-item-timestamp">${job.dateString}</span>
          `;
          
          jobCard.addEventListener('click', () => {
            if (job.applicationUrl) {
              window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
            } else {
              pageManager.switchPage('profile'); 
            }
          });
          mobileFeed.appendChild(jobCard);
        });
      }
    }

    // --- B. DESKTOP RENDERING MATRIX ---
    if (!workspaceTarget) return;
    workspaceTarget.innerHTML = `
      <div class="desktop-jobs-split-layout ${!hasRecruiters ? 'no-sidebar-active' : ''}">
        <div class="jobs-board-timeline-section">
          <h2 class="jobs-section-block-title">Ofertes de feina disponibles (${jobs.length})</h2>
          <div class="desktop-jobs-grid-view" id="desktop-jobs-rows-target"></div>
        </div>

        ${hasRecruiters ? `
          <div class="jobs-suggestions-sidebar-section">
            <h2 class="jobs-section-block-title">Recrutadors destacats</h2>
            <div class="jobs-suggestion-stack" id="sidebar-recruiters-target"></div>
          </div>
        ` : ''}
      </div>
    `;

    const jobsGridTarget = workspaceTarget.querySelector('#desktop-jobs-rows-target') as HTMLElement;
    const recruitersTarget = workspaceTarget.querySelector('#sidebar-recruiters-target') as HTMLElement;

    if (jobs.length === 0) {
      if (jobsGridTarget) jobsGridTarget.innerHTML = '<p class="jobs-feed-empty-alert">No s\'han trobat ofertes de feina per a aquesta cerca.</p>';
    } else {
      jobs.forEach(job => {
        const rowCard = document.createElement('div');
        rowCard.className = 'desktop-job-row-card';
        rowCard.innerHTML = `
          <div class="desktop-job-details">
            <h3>${job.title}</h3>
            <p class="company-meta-line">
              <strong>${job.companyName}</strong> • ${job.location} • <span class="job-type-indicator">${job.jobType}</span> • <span class="time-dim">${job.dateString}</span>
            </p>
            <div class="job-tags-row">
              ${job.techStackTags.map(tag => `<span class="job-badge-tag">${tag}</span>`).join('')}
            </div>
          </div>
          <button class="job-apply-action-btn">${job.applicationUrl ? 'Veure web' : 'Inscriu-me'}</button>
        `;

        rowCard.querySelector('.job-apply-action-btn')?.addEventListener('click', (e) => {
          e.stopPropagation();
          if (job.applicationUrl) {
            window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
          } else {
            console.log(`[Router] Processing internal application trigger for ID: ${job.id}`);
          }
        });

        if (jobsGridTarget) jobsGridTarget.appendChild(rowCard);
      });
    }

    if (hasRecruiters && recruitersTarget) {
      recruiters.forEach(recruiter => {
        recruitersTarget.appendChild(createCard('desktop', recruiter, { 
          buttonText: 'Contacta', 
          onClick: () => console.log(`[Message Stubs] Recruiter connect session for: ${recruiter.id}`) 
        }));
      });
    }
  };

  // --------------------------------------------------------------------------
  // INTEGRATED COMBINED MATRIX CONTROLLER LOGIC FETCH
  // --------------------------------------------------------------------------
  const executeDataFetchPipeline = (search: string, tech: string, loc: string, sort: string) => {
    if (mobileFeed) mobileFeed.innerHTML = '<p class="jobs-feed-status-msg">Carregant ofertes...</p>';
    if (workspaceTarget) workspaceTarget.innerHTML = '<p class="jobs-feed-status-msg">Carregant ofertes...</p>';

    // Query your single jobsService entry module
    getJobsPageData('Popular', search)
      .then((data) => {
        let filteredList = data.mainJobs;

        // Perform composite cross-filters inside our pipeline stream
        if (tech !== 'All') {
          filteredList = filteredList.filter(job => job.techStackTags.includes(tech));
        }
        if (loc !== 'All') {
          filteredList = filteredList.filter(job => job.location.includes(loc));
        }
        if (sort === 'Older') {
          // If sorting order requests oldest entries, flip our array chronology trace
          filteredList = [...filteredList].reverse();
        }

        renderJobWorkspaceLayout(filteredList, data.associatedCompanies, data.activeRecruiters);
      })
      .catch((err) => {
        console.error("Critical Jobs Workspace Pipeline Error:", err);
        if (workspaceTarget) workspaceTarget.innerHTML = '<p class="jobs-feed-error-msg">Error en carregar les dades de contractació.</p>';
        if (mobileFeed) mobileFeed.innerHTML = '<p class="jobs-feed-error-msg">Error en carregar dades.</p>';
      });
  };

  // --------------------------------------------------------------------------
  // COMPONENT INITIALIZATION
  // --------------------------------------------------------------------------
  // Instantiate FilterBar in full standalone 'jobs' mode matrix configuration
  const filterBarComponent = createFilterBar({
    mode: 'jobs',
    placeholderText: 'Cerca ofertes, empreses o stacks...',
    techStacks: techStacks,
    locations: locations,
    onJobsFilterChange: (controls) => {
      // Direct unified execution state receiver callback loop
      executeDataFetchPipeline(
        controls.searchQuery,
        controls.techStack,
        controls.location,
        controls.sortBy
      );
    }
  });

  if (filterSlot) {
    filterSlot.appendChild(filterBarComponent);
  }

  // Initial runtime baseline fetch
  executeDataFetchPipeline('', 'All', 'All', 'Recent');

  return container;
}