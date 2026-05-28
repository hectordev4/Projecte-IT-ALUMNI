import { createCard } from '../components/Card';
import { PageManager } from '../managers/pageManager';
import { getJobsPageData } from '../services/jobsService';
import { createFilterBar } from '../components/FilterBar';
import type { JobItem } from '../types/job';
import type { CompanyUser } from '../types/companyUser';
import type { User } from '../types/user';
import '../../styles/jobs.css';

/**
 * Manages the Jobs portal workspace.
 * Listens to global filter events and re-renders the feed dynamically.
 */
export function setupJobs(pageManager: PageManager): HTMLElement {
  const container = document.createElement('section');
  container.className = 'jobs-page-wrapper';

  // Core layout shell
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
  // CENTRALIZED DATA RENDERING ENGINE
  // --------------------------------------------------------------------------
  const loadJobsPageDataContent = (searchQuery: string, techStack: string, location: string, sortBy: string) => {
    if (mobileFeed) mobileFeed.innerHTML = '<p class="jobs-feed-status-msg">Carregant ofertes...</p>';
    if (workspaceTarget) workspaceTarget.innerHTML = '<p class="jobs-feed-status-msg">Carregant ofertes...</p>';

    fetch('/data/fakedata.json')
      .then((res) => res.json())
      .then((data: JobsPageDataPayload) => {
        
        // 1. Filter Logic
        let filteredJobs = (data.jobs || []).filter(job => {
          const searchLower = searchQuery.toLowerCase();
          const matchesSearch = job.title.toLowerCase().includes(searchLower) || 
                                job.companyName.toLowerCase().includes(searchLower) ||
                                job.techStackTags.some(tag => tag.toLowerCase().includes(searchLower));
          
          const matchesTech = techStack === 'All' || job.techStackTags.includes(techStack);
          const matchesLoc = location === 'All' || job.location === location;
          
          return matchesSearch && matchesTech && matchesLoc;
        });

        // 2. Sorting Logic
        if (sortBy === 'Older') filteredJobs.reverse();

        const hasRecruiters = data.recruiters && data.recruiters.length > 0;

        // --- Render Mobile Feed ---
        if (mobileFeed) {
          mobileFeed.innerHTML = filteredJobs.length === 0 ? '<p class="jobs-feed-empty-alert">No s\'han trobat ofertes coincidents.</p>' : '';
          filteredJobs.forEach(job => {
            const jobCard = document.createElement('div');
            jobCard.className = 'mobile-job-item-card';
            jobCard.innerHTML = `
              <div class="job-card-main-info">
                <h3 class="job-item-title">${job.title}</h3>
                <p class="job-item-company">${job.companyName} — <span>${job.location}</span></p>
                <div class="job-tags-row">
                  <span class="job-badge-tag job-type-accent">${job.jobType}</span>
                  ${job.techStackTags.map(tag => `<span class="job-badge-tag">${tag}</span>`).join('')}
                </div>
              </div>
              <span class="job-item-timestamp">${job.dateString}</span>
            `;
            jobCard.addEventListener('click', () => job.applicationUrl ? window.open(job.applicationUrl, '_blank') : pageManager.switchPage('profile'));
            mobileFeed.appendChild(jobCard);
          });
        }

        // --- Render Desktop Workspace ---
        if (workspaceTarget) {
          workspaceTarget.innerHTML = `
            <div class="desktop-jobs-split-layout ${!hasRecruiters ? 'no-sidebar-active' : ''}">
              <div class="jobs-board-timeline-section">
                <h2 class="jobs-section-block-title">Ofertes (${filteredJobs.length})</h2>
                <div class="desktop-jobs-grid-view" id="desktop-jobs-rows-target"></div>
              </div>
              ${hasRecruiters ? '<div class="jobs-suggestions-sidebar-section" id="sidebar-recruiters-target"></div>' : ''}
            </div>
          `;

          const jobsGridTarget = workspaceTarget.querySelector('#desktop-jobs-rows-target') as HTMLElement;
          const recruitersTarget = workspaceTarget.querySelector('#sidebar-recruiters-target') as HTMLElement;

          filteredJobs.forEach(job => {
            const rowCard = document.createElement('div');
            rowCard.className = 'desktop-job-row-card';
            rowCard.innerHTML = `
              <div class="desktop-job-details">
                <h3>${job.title}</h3>
                <p><strong>${job.companyName}</strong> • ${job.location} • ${job.jobType}</p>
                <div class="job-tags-row">${job.techStackTags.map(tag => `<span class="job-badge-tag">${tag}</span>`).join('')}</div>
              </div>
              <button class="job-apply-action-btn">Veure</button>
            `;
            rowCard.querySelector('.job-apply-action-btn')?.addEventListener('click', () => window.open(job.applicationUrl, '_blank'));
            jobsGridTarget.appendChild(rowCard);
          });

          if (hasRecruiters) {
            data.recruiters!.forEach(r => recruitersTarget.appendChild(createCard('desktop', r, { buttonText: 'Contacta' })));
          }
        }
      })
      .catch((err) => console.error("Jobs Render Error:", err));
  };

  // --------------------------------------------------------------------------
  // EVENT LISTENER: Clean, direct, and isolated
  // --------------------------------------------------------------------------
  const onGlobalFilterUpdate = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    if (detail.targetRoute === 'jobs') {
      loadJobsPageDataContent(detail.searchQuery || '', detail.techStack || 'All', detail.location || 'All', detail.sortBy || 'Recent');
    }
  };

  window.addEventListener('workspaceFilterSync', onGlobalFilterUpdate);

  // Cleanup
  const unmountObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node === container) {
          window.removeEventListener('workspaceFilterSync', onGlobalFilterUpdate);
          unmountObserver.disconnect();
        }
      });
    });
  });
  
  if (container.parentElement) unmountObserver.observe(container.parentElement, { childList: true });

  // Initial load
  loadJobsPageDataContent('', 'All', 'All', 'Recent');

  return container;
}