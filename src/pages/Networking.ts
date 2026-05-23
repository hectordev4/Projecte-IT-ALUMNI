import { createCard } from '../components/Card';
import { createFilterBar } from '../components/FilterBar';
import { createMobileHeader } from '../components/MobileHeader';
import { getNetworkingPageData } from '../services/networkingService';
import '../../styles/networking.css';

export function setupNetworking(): HTMLElement {
  const container = document.createElement('section');
  container.className = 'networking-page-wrapper';

  container.innerHTML = `
    <main>
      <div class="view-mobile networking-mobile-container">
        <div id="mobile-header-mount"></div>
        <div id="mobile-filter-mount"></div>
        <div class="mobile-profile-feed" id="mobile-cards-target"></div>
      </div>

      <div class="view-desktop networking-desktop-container">
        <div id="desktop-filter-mount"></div>
        <div id="desktop-main-workspace-target"></div>
      </div>
    </main>
  `;

  const mobileHeaderMount = container.querySelector('#mobile-header-mount') as HTMLElement;
  const mobileFilterMount = container.querySelector('#mobile-filter-mount') as HTMLElement;
  const desktopFilterMount = container.querySelector('#desktop-filter-mount') as HTMLElement;
  
  const mobileFeed = container.querySelector('#mobile-cards-target') as HTMLElement;
  const workspaceTarget = container.querySelector('#desktop-main-workspace-target') as HTMLElement;

  if (mobileHeaderMount) mobileHeaderMount.appendChild(createMobileHeader({ title: 'Networking' }));

  // --------------------------------------------------------------------------
  // CENTRALIZED REAL-TIME WORKSPACE LAYOUT SWITCH ENGINE
  // --------------------------------------------------------------------------
  const loadPageDataContent = (activeFilter: string, searchQuery: string) => {
    if (mobileFeed) mobileFeed.innerHTML = '<p class="feed-status-msg">Carregant dades...</p>';
    if (workspaceTarget) workspaceTarget.innerHTML = '<p class="feed-status-msg">Carregant dades...</p>';

    getNetworkingPageData(activeFilter, searchQuery)
      .then((data) => {
        
        // --- 1. HANDLE MOBILE RENDERING LAYER ---
        if (mobileFeed) {
          mobileFeed.innerHTML = '';
          if (activeFilter === 'Recent Activity') {
            if (data.recentActivities.length === 0) {
              mobileFeed.innerHTML = '<p class="feed-empty-alert">No hi ha activitats recents.</p>';
            } else {
              data.recentActivities.forEach(act => {
                const logItem = document.createElement('div');
                logItem.className = 'mobile-activity-log-card';
                logItem.innerHTML = `
                  <div class="log-indicator-dot"></div>
                  <p><strong>${act.userName}</strong> ${act.text}</p>
                  <span class="log-timestamp">${act.rawDateString}</span>
                `;
                mobileFeed.appendChild(logItem);
              });
            }
          } else {
            if (data.mainProfiles.length === 0) {
              mobileFeed.innerHTML = '<p class="feed-empty-alert">No s\'han trobat usuaris.</p>';
            } else {
              data.mainProfiles.slice(0, 3).forEach(user => {
                mobileFeed.appendChild(createCard('mobile', user, { onClick: () => {} }));
              });
            }
          }
        }

        // --- 2. HANDLE DESKTOP RENDERING WORKSPACE ---
        if (!workspaceTarget) return;
        workspaceTarget.innerHTML = '';

        if (activeFilter === 'Recent Activity') {
          // MODE A: FULL COLUMN ACTIVITY LOG FEED SHEET
          workspaceTarget.innerHTML = `
            <div class="desktop-split-layout activity-log-mode-active">
              <div class="activity-timeline-section expanded-full-log">
                <h2 class="section-block-title">Recent Activity Log Feed</h2>
                <ul class="timeline-list custom-large-timeline" id="full-log-list-target"></ul>
              </div>
              <div class="suggestions-sidebar-section">
                <h2 class="section-block-title">Suggestions for You</h2>
                <div class="suggestion-stack" id="sidebar-suggestions-target"></div>
              </div>
            </div>
          `;

          const fullLogTarget = workspaceTarget.querySelector('#full-log-list-target') as HTMLElement;
          const suggestionsTarget = workspaceTarget.querySelector('#sidebar-suggestions-target') as HTMLElement;

          if (data.recentActivities.length === 0) {
            if (fullLogTarget) fullLogTarget.innerHTML = '<li class="timeline-log-row">No s\'han trobat activitats per a aquesta cerca.</li>';
          } else {
            data.recentActivities.forEach(act => {
              const li = document.createElement('li');
              li.className = 'timeline-log-row';
              li.innerHTML = `
                <div class="timeline-meta"><strong>${act.userName}</strong> ${act.text}</div>
                <span class="timeline-time-tag">${act.rawDateString}</span>
              `;
              if (fullLogTarget) fullLogTarget.appendChild(li);
            });
          }

          data.suggestions.forEach(user => {
            if (suggestionsTarget) suggestionsTarget.appendChild(createCard('desktop', user, { buttonText: 'Connect', onClick: () => {} }));
          });

        } else {
          // MODE B: STANDARD HIGHLIGHT EXPLORER GRID VIEW (Popular & Most Connected)
          workspaceTarget.innerHTML = `
            <section class="popular-profiles-grid" id="desktop-grid-target"></section>
            <div class="desktop-split-layout">
              <div class="activity-timeline-section">
                <h2 class="section-block-title">Recent Activity Preview</h2>
                <ul class="timeline-list" id="sidebar-preview-log-target"></ul>
              </div>
              <div class="suggestions-sidebar-section">
                <h2 class="section-block-title">Suggestions for You</h2>
                <div class="suggestion-stack" id="sidebar-suggestions-target"></div>
              </div>
            </div>
          `;

          const gridTarget = workspaceTarget.querySelector('#desktop-grid-target') as HTMLElement;
          const previewLogTarget = workspaceTarget.querySelector('#sidebar-preview-log-target') as HTMLElement;
          const suggestionsTarget = workspaceTarget.querySelector('#sidebar-suggestions-target') as HTMLElement;

          if (data.mainProfiles.length === 0) {
            if (gridTarget) gridTarget.innerHTML = '<p class="feed-empty-alert">No s\'han trobat profiles.</p>';
          } else {
            data.mainProfiles.slice(0, 4).forEach(user => {
              if (gridTarget) gridTarget.appendChild(createCard('desktop', user, { buttonText: 'Message', onClick: () => {} }));
            });
          }

          if (data.recentActivities.length === 0) {
            if (previewLogTarget) previewLogTarget.innerHTML = '<li>Sense activitats recents.</li>';
          } else {
            data.recentActivities.slice(0, 4).forEach(act => {
              const li = document.createElement('li');
              li.innerHTML = `<strong>${act.userName}</strong> ${act.text}`;
              if (previewLogTarget) previewLogTarget.appendChild(li);
            });
          }

          data.suggestions.forEach(user => {
            if (suggestionsTarget) suggestionsTarget.appendChild(createCard('desktop', user, { buttonText: 'Connect', onClick: () => {} }));
          });
        }
      })
      .catch((err) => {
        console.error("Critical Render Error:", err);
        if (workspaceTarget) workspaceTarget.innerHTML = '<p class="feed-error-msg">Error en carregar les dades.</p>';
      });
  };

  // --------------------------------------------------------------------------
  // INJECT CONTROL BAR INSTANCES
  // --------------------------------------------------------------------------
  const networkFiltersList = ['Recent Activity', 'Popular', 'Most Connected'];
  const defaultInitialFilter = 'Popular';

  const filterBarConfig = {
    filters: networkFiltersList,
    activeFilter: defaultInitialFilter,
    placeholderText: 'Search alumni by name...',
    onControlsChange: (filter: string, query: string) => loadPageDataContent(filter, query)
  };

  if (desktopFilterMount) desktopFilterMount.appendChild(createFilterBar(filterBarConfig));
  if (mobileFilterMount) mobileFilterMount.appendChild(createFilterBar(filterBarConfig));

  // Run immediately to load initial page state
  loadPageDataContent(defaultInitialFilter, '');

  return container;
}