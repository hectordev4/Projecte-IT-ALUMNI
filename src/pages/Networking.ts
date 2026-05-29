import { createCard } from '../components/Card';
import { getNetworkingPageData } from '../services/networkingService';
import { PageManager } from '../managers/pageManager';
import '../../styles/networking.css';

// Interfaces to ensure TypeScript type safety
interface Activity {
  userName: string;
  text: string;
  rawDateString: string;
}

interface NetworkingData {
  recentActivities: Activity[];
  mainProfiles: any[];
  suggestions: any[];
}

/**
 * Generates and manages the responsive Networking page view workspace.
 */
export function setupNetworking(pageManager: PageManager): HTMLElement {
  const container = document.createElement('section');
  container.className = 'networking-page-wrapper';

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

  const loadPageDataContent = (activeFilter: string, searchQuery: string) => {
    if (mobileFeed) mobileFeed.innerHTML = '<p class="feed-status-msg">Carregant dades...</p>';
    if (workspaceTarget) workspaceTarget.innerHTML = '<p class="feed-status-msg">Carregant dades...</p>';

    getNetworkingPageData(activeFilter, searchQuery)
      .then((data: NetworkingData) => {
        
        // --- 1. HANDLE MOBILE RENDERING ---
        if (mobileFeed) {
          mobileFeed.innerHTML = '';
          if (activeFilter === 'Recent Activity') {
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
          } else {
            data.mainProfiles.slice(0, 3).forEach(user => {
              mobileFeed.appendChild(createCard('mobile', user, {}));
            });
          }
        }

        // --- 2. HANDLE DESKTOP RENDERING ---
        if (!workspaceTarget) return;
        workspaceTarget.innerHTML = '';

        if (activeFilter === 'Recent Activity') {
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

          // Grouping activities chronologically
          const grouped = data.recentActivities.reduce((acc: Record<string, Activity[]>, act) => {
            (acc[act.rawDateString] = acc[act.rawDateString] || []).push(act);
            return acc;
          }, {});

          Object.keys(grouped).forEach(dateKey => {
            const header = document.createElement('li');
            header.className = 'timeline-date-group-header';
            header.innerHTML = `<span>${dateKey}</span>`;
            fullLogTarget.appendChild(header);

            grouped[dateKey].forEach(act => {
              const li = document.createElement('li');
              li.className = 'timeline-log-row';
              li.innerHTML = `
                <div class="timeline-meta"><strong>${act.userName}</strong> ${act.text}</div>
                <span class="timeline-time-tag">${act.rawDateString}</span>
              `;
              fullLogTarget.appendChild(li);
            });
          });

          data.suggestions.forEach(user => {
            if (suggestionsTarget) {
              suggestionsTarget.appendChild(createCard('desktop', user, { buttonText: 'Connect' }));
            }
          });

        } else {
          // Standard Grid View
          
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
        }
      })
      .catch((err) => {
        console.error("Critical Render Error:", err);
      });
  };

  const onGlobalFilterUpdate = (e: Event) => {
    const { filter, query } = (e as CustomEvent).detail;
    loadPageDataContent(filter, query);
  };

  window.addEventListener('workspaceFilterSync', onGlobalFilterUpdate);

  // Lifecycle management
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

  loadPageDataContent('Popular', '');

  return container;
}