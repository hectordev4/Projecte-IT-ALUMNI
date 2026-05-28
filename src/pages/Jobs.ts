import { createCard } from '../components/Card';
import { PageManager } from '../managers/pageManager';
import type { JobsPageDataPayload } from '../types/job';
import '../../styles/jobs.css';

/**
 * Generates and manages the responsive Job Portal view workspace.
 * Listens to the elevated global filter bar events to refresh data without re-rendering the inputs.
 * @param pageManager - The centralized routing engine instance.
 */
export function setupJobs(pageManager: PageManager): HTMLElement {
  const container = document.createElement('section');
  container.className = 'jobs-page-wrapper';

  // Core layout shells matching standard framework configuration tokens cleanly
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

  // --------------------------------------------------------------------------
  // CENTRALIZED REAL-TIME WORKSPACE DATA RENDERING ENGINE
  // --------------------------------------------------------------------------
  const loadJobsPageDataContent = (activeFilter: string, searchQuery: string) => {
    if (mobileFeed) mobileFeed.innerHTML = '<p class="jobs-feed-status-msg">Carregant ofertes...</p>';
    if (workspaceTarget) workspaceTarget.innerHTML = '<p class="jobs-feed-status-msg">Carregant ofertes...</p>';

    // Fetch live payload directly from your mock or backend endpoint configuration
    fetch('/data/fakedata.json')
      .then((res) => {
        if (!res.ok) throw new Error("Could not retrieve job portal listings dataset");
        return res.json();
      })
      .then((data: JobsPageDataPayload) => {
        
        // Comprehensive filter logic tracking titles, companies, and individual tech stack tags
        const filteredJobs = (data.jobs || []).filter(job => {
          const searchLower = searchQuery.toLowerCase();
          const matchesTitle = job.title.toLowerCase().includes(searchLower);
          const matchesCompany = job.companyName.toLowerCase().includes(searchLower);
          const matchesStack = job.techStackTags.some(tag => tag.toLowerCase().includes(searchLower));
          
          return matchesTitle || matchesCompany || matchesStack;
        });

        // Evaluate whether any recruiters are present to determine structural grid spacing
        const hasRecruiters = data.recruiters && data.recruiters.length > 0;

        // --- 1. HANDLE MOBILE RENDERING LAYER ---
        if (mobileFeed) {
          mobileFeed.innerHTML = '';
          if (filteredJobs.length === 0) {
            mobileFeed.innerHTML = '<p class="jobs-feed-empty-alert">No s\'han trobat ofertes coincidents.</p>';
          } else {
            filteredJobs.forEach(job => {
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
              
              // Direct external website link or routing fallback sequence if recruiter doesn't exist
              jobCard.addEventListener('click', () => {
                if (job.applicationUrl) {
                  window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
                } else {
                  console.log(`[Router] Internal submission context fallback via manager:`, pageManager);
                  pageManager.switchPage('profile'); 
                }
              });

              mobileFeed.appendChild(jobCard);
            });
          }
        }

        // --- 2. HANDLE DESKTOP RENDERING WORKSPACE ---
        if (!workspaceTarget) return;
        workspaceTarget.innerHTML = '';

        // Conditional full-width styling applied dynamically when recruiters do not exist
        workspaceTarget.innerHTML = `
          <div class="desktop-jobs-split-layout ${!hasRecruiters ? 'no-sidebar-active' : ''}">
            <div class="jobs-board-timeline-section">
              <h2 class="jobs-section-block-title">Ofertes de feina disponibles (${filteredJobs.length})</h2>
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

        if (filteredJobs.length === 0) {
          if (jobsGridTarget) jobsGridTarget.innerHTML = '<p class="jobs-feed-empty-alert">No s\'han trobat ofertes de feina per a aquesta cerca.</p>';
        } else {
          filteredJobs.forEach(job => {
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

            // Action button interception processing links or execution sequences safely
            rowCard.querySelector('.job-apply-action-btn')?.addEventListener('click', (e) => {
              e.stopPropagation();
              if (job.applicationUrl) {
                window.open(job.applicationUrl, '_blank', 'noopener,noreferrer');
              } else {
                console.log(`[Router] Processing internal application trigger request for listing context ID: ${job.id}`);
              }
            });

            if (jobsGridTarget) jobsGridTarget.appendChild(rowCard);
          });
        }

        // Reuse standard user factory layouts safely if recruiters array is available
        if (hasRecruiters && recruitersTarget) {
          data.recruiters!.forEach(recruiter => {
            recruitersTarget.appendChild(createCard('desktop', recruiter, { 
              buttonText: 'Contacta', 
              onClick: () => console.log(`[Router Stub] Recruiter messaging session for profile ${recruiter.id} via manager:`, pageManager) 
            }));
          });
        }

      })
      .catch((err) => {
        console.error("Critical Jobs Workspace Render Error:", err);
        if (workspaceTarget) workspaceTarget.innerHTML = '<p class="jobs-feed-error-msg">Error en carregar les dades de contractació.</p>';
        if (mobileFeed) mobileFeed.innerHTML = '<p class="jobs-feed-error-msg">Error en carregar dades.</p>';
      });
  };

  // --------------------------------------------------------------------------
  // GLOBAL EVENT ROUTER INTERCEPTOR LISTENERS & CLEANUP
  // --------------------------------------------------------------------------
  const onGlobalFilterUpdate = (e: Event) => {
    const { filter, query } = (e as CustomEvent).detail;
    loadJobsPageDataContent(filter, query);
  };

  window.addEventListener('workspaceFilterSync', onGlobalFilterUpdate);

  // LIFECYCLE MANAGEMENT: Unbinds listeners immediately when swapping view contexts completely
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

  if (container.parentElement) {
    unmountObserver.observe(container.parentElement, { childList: true });
  } else {
    window.addEventListener('load', () => {
      if (container.parentElement) unmountObserver.observe(container.parentElement, { childList: true });
    }, { once: true });
  }

  // Initial load invocation sequence
  loadJobsPageDataContent('Popular', '');

  return container;
}