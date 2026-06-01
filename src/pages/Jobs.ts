import { createCard } from '../components/Card';
import { PageManager } from '../managers/pageManager';
import { getJobsPageData } from '../services/jobsService';
import '../../styles/jobs.css';

export function setupJobs(pageManager: PageManager): HTMLElement {
  const container = document.createElement('section');
  container.className = 'jobs-page-wrapper';

  container.innerHTML = `
    <main style="width: 100%;">
      <div class="view-mobile jobs-mobile-container"><div class="mobile-jobs-feed" id="mobile-jobs-target"></div></div>
      <div class="view-desktop jobs-desktop-container"><div id="desktop-jobs-workspace-target"></div></div>
    </main>
  `;

  const mobileFeed = container.querySelector('#mobile-jobs-target') as HTMLElement;
  const workspaceTarget = container.querySelector('#desktop-jobs-workspace-target') as HTMLElement;

  const renderWorkspace = async (search: string, tech: string, loc: string, sort: string) => {
    if (mobileFeed) mobileFeed.innerHTML = '<p class="jobs-feed-status-msg">Carregant ofertes...</p>';
    if (workspaceTarget) workspaceTarget.innerHTML = '<p class="jobs-feed-status-msg">Carregant ofertes...</p>';

    try {
      const data = await getJobsPageData(sort, search, tech, loc);
      const { mainJobs, activeRecruiters } = data;
      const hasRecruiters = activeRecruiters.length > 0;

      if (mobileFeed) {
        mobileFeed.innerHTML = mainJobs.length === 0 ? '<p class="jobs-feed-empty-alert">No s\'han trobat ofertes.</p>' : '';
        mainJobs.forEach(job => {
          const visibleTags = job.techStackTags.slice(0, 3);
          const extraTags = job.techStackTags.length > 3 ? `<span class="job-badge-tag subtle-tag">+${job.techStackTags.length - 3}</span>` : '';

          const card = document.createElement('div');
          card.className = 'mobile-job-item-card grid-card-style';
          card.innerHTML = `
            <div class="job-card-main-info">
              <h3 class="card-title">${job.title}</h3>
              <p class="card-meta"><strong>${job.companyName}</strong> <br> ${job.location}</p>
              <div class="job-tags-row card-tags">
                <span class="job-badge-tag job-type-accent">${job.jobType}</span>
                ${visibleTags.map(t => `<span class="job-badge-tag">${t}</span>`).join('')}
                ${extraTags}
              </div>
            </div>
          `;
          card.addEventListener('click', () => job.applicationUrl ? window.open(job.applicationUrl, '_blank') : pageManager.switchPage('profile'));
          mobileFeed.appendChild(card);
        });
      }

      if (workspaceTarget) {
        workspaceTarget.innerHTML = `
          <div class="desktop-jobs-split-layout ${!hasRecruiters ? 'no-sidebar-active' : ''}">
            <div class="jobs-board-main-section">
              <div class="jobs-header-row">
                <h2 class="jobs-section-block-title">Ofertes de Feina (${mainJobs.length})</h2>
              </div>
              <div class="desktop-jobs-grid-view" id="desktop-jobs-grid-target"></div>
            </div>
            ${hasRecruiters ? '<div class="jobs-suggestions-sidebar-section" id="sidebar-recruiters-target"></div>' : ''}
          </div>
        `;

        const gridTarget = workspaceTarget.querySelector('#desktop-jobs-grid-target') as HTMLElement;
        const recruiters = workspaceTarget.querySelector('#sidebar-recruiters-target') as HTMLElement;

        mainJobs.forEach(job => {
          const visibleTags = job.techStackTags.slice(0, 3);
          const extraTags = job.techStackTags.length > 3 ? `<span class="job-badge-tag subtle-tag">+${job.techStackTags.length - 3}</span>` : '';

          const card = document.createElement('div');
          card.className = 'desktop-job-grid-card';
          card.innerHTML = `
            <div class="card-top-content">
              <h3 class="card-title">${job.title}</h3>
              <p class="card-meta"><strong>${job.companyName}</strong> <br> <span class="meta-dot">${job.location}</span></p>
              <div class="job-tags-row card-tags">
                <span class="job-badge-tag job-type-accent">${job.jobType}</span>
                ${visibleTags.map(t => `<span class="job-badge-tag">${t}</span>`).join('')}
                ${extraTags}
              </div>
            </div>
            <div class="card-bottom-actions">
              <span class="job-date-meta">${job.dateString}</span>
              <button class="job-apply-action-btn">Veure</button>
            </div>
          `;
          card.querySelector('.job-apply-action-btn')?.addEventListener('click', () => window.open(job.applicationUrl, '_blank'));
          gridTarget.appendChild(card);
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

  const onGlobalFilterUpdate = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    if (detail.targetRoute === 'jobs') {
      renderWorkspace(detail.searchQuery, detail.techStack, detail.location, detail.sortBy);
    }
  };

  window.addEventListener('workspaceFilterSync', onGlobalFilterUpdate);

  const unmountObserver = new MutationObserver((mutations) => {
    mutations.forEach((m) => m.removedNodes.forEach((n) => {
      if (n === container) {
        window.removeEventListener('workspaceFilterSync', onGlobalFilterUpdate);
        unmountObserver.disconnect();
      }
    }));
  });
  if (container.parentElement) unmountObserver.observe(container.parentElement, { childList: true });

  renderWorkspace('', 'All', 'All', 'Recent');
  
  return container;
}