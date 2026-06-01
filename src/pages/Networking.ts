import { createCard } from '../components/Card';
import { getNetworkingPageData } from '../services/networkingService';
import { PageManager } from '../managers/pageManager';
import '../../styles/networking.css';

/**
 * Generates and manages the responsive Networking page view workspace.
 * Listens to the elevated global filter bar events to refresh data without re-rendering the inputs.
 * @param pageManager - The centralized routing engine instance.
 */
export function setupNetworking(pageManager: PageManager): HTMLElement {
  const container = document.createElement('section');
  container.className = 'networking-page-wrapper';

  // Core layout shells matching the layout tokens and styles cleanly
  container.innerHTML = `
    <main style="width: 100%;">
      <div class="view-mobile networking-mobile-container">
        <div class="mobile-profile-feed" id="mobile-cards-target"></div>
      </div>

      <div class="view-desktop networking-desktop-container">
        <div id="desktop-main-workspace-target"></div>
      </div>
    </main>
  `;

  const mobileFeed = container.querySelector('#mobile-cards-target') as HTMLElement;
  const workspaceTarget = container.querySelector('#desktop-main-workspace-target') as HTMLElement;

  // --------------------------------------------------------------------------
  // CENTRALIZED REAL-TIME WORKSPACE DATA RENDERING ENGINE
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
                mobileFeed.appendChild(createCard('mobile', user, { 
                  onClick: () => console.log(`[Router Stub] Clicked mobile profile ${user.id} via manager:`, pageManager) 
                }));
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
            if (suggestionsTarget) {
              suggestionsTarget.appendChild(createCard('desktop', user, { 
                buttonText: 'Connect', 
                onClick: () => console.log(`[Router Stub] Desktop connect request for ${user.id} via manager:`, pageManager) 
              }));
            }
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
              if (gridTarget) {
                gridTarget.appendChild(createCard('desktop', user, { 
                  buttonText: 'Message', 
                  onClick: () => console.log(`[Router Stub] Desktop message window for ${user.id} via manager:`, pageManager) 
                }));
              }
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
            if (suggestionsTarget) {
              suggestionsTarget.appendChild(createCard('desktop', user, { 
                buttonText: 'Connect', 
                onClick: () => console.log(`[Router Stub] Sidebar connect request for ${user.id} via manager:`, pageManager) 
              }));
            }
          });
        }
      })
      .catch((err) => {
        console.error("Critical Render Error:", err);
        if (workspaceTarget) workspaceTarget.innerHTML = '<p class="feed-error-msg">Error en carregar les dades.</p>';
      });
  };

  // --------------------------------------------------------------------------
  // GLOBAL EVENT ROUTER INTERCEPTOR LISTENERS
  // --------------------------------------------------------------------------
  
  // Custom tracking callback triggered by our elevated global FilterBar component
  const onGlobalFilterUpdate = (e: Event) => {
    const { filter, query } = (e as CustomEvent).detail;
    loadPageDataContent(filter, query);
  };

  // Attach listener to catch the decoupled broadcast updates globally
  window.addEventListener('workspaceFilterSync', onGlobalFilterUpdate);

  // LIFECYCLE MANAGEMENT: Cleans up the listener when PageManager tears down this view canvas
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

  // Begin observing parent container context tracking changes
  if (container.parentElement) {
    unmountObserver.observe(container.parentElement, { childList: true });
  } else {
    // Fallback strategy if parent node assignment is delayed during microtask initialization loops
    window.addEventListener('load', () => {
      if (container.parentElement) unmountObserver.observe(container.parentElement, { childList: true });
    }, { once: true });
  }

  // Fallback initial load evaluation profile query (defaults to Popular tab)
  loadPageDataContent('Popular', '');

  return container;
}