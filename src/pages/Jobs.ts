import { createCard } from '../components/Card';
import { PageManager } from '../managers/pageManager';
import { getJobsPageData } from '../services/jobsService';
import '../../styles/jobs.css';

/**
 * Generates and manages the responsive Job Portal view workspace.
 * Listens to the elevated global filter bar events to refresh data without re-rendering the inputs.
 * @param pageManager - The centralized routing engine instance.
 */
export function setupJobs(pageManager: PageManager): HTMLElement {
  const container = document.createElement('section');
  container.className = 'jobs-page-wrapper';

  container.innerHTML = `
    <main style="width: 100%;">
      <div class="view-mobile jobs-mobile-container">
        <div class="mobile-jobs-feed" id="mobile-jobs-target"></div>
      </div>
      <div class="view-desktop jobs-desktop-container">
        <div id="desktop-jobs-workspace-target"></div>
      </div>
    </main>
  `;

  const mobileFeed = container.querySelector('#mobile-jobs-target') as HTMLElement;
  const workspaceTarget = container.querySelector('#desktop-jobs-workspace-target') as HTMLElement;

  // The engine that consumes the data provided by the Service Layer
  const renderWorkspace = async (search: string, tech: string, loc: string, sort: string) => {
    if (mobileFeed) mobileFeed.innerHTML = '<p class="jobs-feed-status-msg">Carregant ofertes...</p>';
    if (workspaceTarget) workspaceTarget.innerHTML = '<p class="jobs-feed-status-msg">Carregant ofertes...</p>';

    try {
      const data = await getJobsPageData(sort, search, tech, loc);
      const { mainJobs, activeRecruiters } = data;
      const hasRecruiters = activeRecruiters.length > 0;

      // --- Mobile Rendering ---
      if (mobileFeed) {
        mobileFeed.innerHTML = mainJobs.length === 0 ? '<p class="jobs-feed-empty-alert">No s\'han trobat ofertes.</p>' : '';
        mainJobs.forEach(job => {
          const card = document.createElement('div');
          card.className = 'mobile-job-item-card';
          card.innerHTML = `
            <div class="job-card-main-info">
              <h3>${job.title}</h3>
              <p>${job.companyName} — <span>${job.location}</span></p>
              <div class="job-tags-row">
                <span class="job-badge-tag job-type-accent">${job.jobType}</span>
                ${job.techStackTags.map(t => `<span class="job-badge-tag">${t}</span>`).join('')}
              </div>
            </div>
          `;
          card.addEventListener('click', () => job.applicationUrl ? window.open(job.applicationUrl, '_blank') : pageManager.switchPage('profile'));
          mobileFeed.appendChild(card);
        });
      }

      // --- Desktop Rendering ---
      if (workspaceTarget) {
        workspaceTarget.innerHTML = `
          <div class="desktop-jobs-split-layout ${!hasRecruiters ? 'no-sidebar-active' : ''}">
            <div class="jobs-board-timeline-section">
              <h2 class="jobs-section-block-title">Ofertes (${mainJobs.length})</h2>
              <div class="desktop-jobs-grid-view" id="desktop-jobs-rows-target"></div>
            </div>
            ${hasRecruiters ? '<div class="jobs-suggestions-sidebar-section" id="sidebar-recruiters-target"></div>' : ''}
          </div>
        `;

        const grid = workspaceTarget.querySelector('#desktop-jobs-rows-target') as HTMLElement;
        const recruiters = workspaceTarget.querySelector('#sidebar-recruiters-target') as HTMLElement;

        mainJobs.forEach(job => {
          const row = document.createElement('div');
          row.className = 'desktop-job-row-card';
          row.innerHTML = `
            <div class="desktop-job-details">
              <h3>${job.title}</h3>
              <p><strong>${job.companyName}</strong> • ${job.location}</p>
              <div class="job-tags-row">${job.techStackTags.map(t => `<span class="job-badge-tag">${t}</span>`).join('')}</div>
            </div>
            <button class="job-apply-action-btn">Veure</button>
          `;
          row.querySelector('.job-apply-action-btn')?.addEventListener('click', () => window.open(job.applicationUrl, '_blank'));
          grid.appendChild(row);
        });

        if (hasRecruiters) {
          activeRecruiters.forEach(r => recruiters.appendChild(createCard('desktop', r, { buttonText: 'Contacta' })));
        }
      }
    } catch (err) {
      console.error("Render Error:", err);
      if (mobileFeed) mobileFeed.innerHTML = '<p class="jobs-feed-error">Error en carregar les dades.</p>';
    }
  };

  // Event listener reacts ONLY to broadcasted filter changes
  const onGlobalFilterUpdate = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    if (detail.targetRoute === 'jobs') {
      renderWorkspace(detail.searchQuery, detail.techStack, detail.location, detail.sortBy);
    }
  };

  window.addEventListener('workspaceFilterSync', onGlobalFilterUpdate);

  // Lifecycle cleanup
  const unmountObserver = new MutationObserver((mutations) => {
    mutations.forEach((m) => m.removedNodes.forEach((n) => {
      if (n === container) {
        window.removeEventListener('workspaceFilterSync', onGlobalFilterUpdate);
        unmountObserver.disconnect();
      }
    }));
  });
  if (container.parentElement) unmountObserver.observe(container.parentElement, { childList: true });

  // Initial load invocation
  renderWorkspace('', 'All', 'All', 'Recent');
  
  return container;
}