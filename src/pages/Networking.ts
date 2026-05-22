import { createCard } from '../components/Card';
import { createFilterBar } from '../components/FilterBar';
import { createMobileHeader } from '../components/MobileHeader';
import { fetchAlumniData } from '../services/api';
import type { User } from '../types/user';
import '../../styles/networking.css';

export function setupNetworkingPage(): HTMLElement {
  const container = document.createElement('section');
  container.className = 'networking-page-wrapper';

  // Completely streamlined template wrapper shells!
  container.innerHTML = `
    <main>
      <div class="view-mobile networking-mobile-container">
        <div id="mobile-header-mount"></div>
        <div id="mobile-filter-mount"></div>
        <div class="mobile-profile-feed" id="mobile-cards-target">
          <p class="feed-status-msg">Carregant perfils...</p>
        </div>
      </div>

      <div class="view-desktop networking-desktop-container">
        <div id="desktop-filter-mount"></div>

        <section class="popular-profiles-grid" id="desktop-grid-target">
          <p class="feed-status-msg">Carregant llista de populars...</p>
        </section>

        <div class="desktop-split-layout">
          <div class="activity-timeline-section">
            <h2 class="section-block-title">Recent Activity</h2>
            <ul class="timeline-list">
              <li><strong>Jane Smith</strong> started following John Doe</li>
              <li><strong>David Brown</strong> and John Doe connected</li>
              <li><strong>John Doe</strong> shared "Top 10 Product Management Tips" article</li>
            </ul>
          </div>

          <div class="suggestions-sidebar-section">
            <h2 class="section-block-title">Suggestions for You</h2>
            <div class="suggestion-stack" id="desktop-suggestions-target">
              <p class="feed-status-msg">Carregant suggeriments...</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  `;

  // --- MOUNT ELEMENT ANCHORS ---
  const mobileHeaderMount = container.querySelector('#mobile-header-mount') as HTMLElement;
  const mobileFilterMount = container.querySelector('#mobile-filter-mount') as HTMLElement;
  const desktopFilterMount = container.querySelector('#desktop-filter-mount') as HTMLElement;
  
  const mobileFeed = container.querySelector('#mobile-cards-target') as HTMLElement;
  const desktopGrid = container.querySelector('#desktop-grid-target') as HTMLElement;
  const desktopSuggestions = container.querySelector('#desktop-suggestions-target') as HTMLElement;

  // 1. Mount Mobile Header Component Instance
  if (mobileHeaderMount) {
    const mobileHeader = createMobileHeader({
      title: 'Networking',
      onBackClick: () => console.log('Navigating backward to welcome view...')
    });
    mobileHeaderMount.appendChild(mobileHeader);
  }

  // Shared Filter Event Callbacks
  const handleSearch = (query: string) => console.log(`Filtering data queries on text match: ${query}`);
  const handleFilterChange = (filter: string) => console.log(`Shifting view state target collection to: ${filter}`);

  // 2. Mount Mobile Filter Instance
  if (mobileFilterMount) {
    const mobileFilterBar = createFilterBar({
      filters: ['Recent Activity', 'Popular', 'Most Connected'],
      activeFilter: 'Popular',
      placeholderText: 'Search alumni...',
      onSearch: handleSearch,
      onFilterChange: handleFilterChange
    });
    mobileFilterMount.appendChild(mobileFilterBar);
  }

  // 3. Mount Desktop Filter Instance
  if (desktopFilterMount) {
    const desktopFilterBar = createFilterBar({
      filters: ['Recent Activity', 'Popular', 'Most Connected'],
      activeFilter: 'Popular',
      placeholderText: 'Search alumni...',
      onSearch: handleSearch,
      onFilterChange: handleFilterChange
    });
    desktopFilterMount.appendChild(desktopFilterBar);
  }

  // 4. Run Async Request Pipeline Loop Data Injectors
  fetchAlumniData('/data/users.json')
    .then((users: User[]) => {
      if (mobileFeed) mobileFeed.innerHTML = '';
      if (desktopGrid) desktopGrid.innerHTML = '';
      if (desktopSuggestions) desktopSuggestions.innerHTML = '';

      // Render Mobile Items
      if (mobileFeed) {
        users.slice(0, 3).forEach(user => {
          mobileFeed.appendChild(createCard('mobile', user, { onClick: () => {} }));
        });
      }

      // Render Desktop Grid Items
      if (desktopGrid) {
        users.slice(0, 4).forEach(user => {
          desktopGrid.appendChild(createCard('desktop', user, { buttonText: 'Message', onClick: () => {} }));
        });
      }

      // Render Sidebar Suggestions
      if (desktopSuggestions) {
        users.slice(4, 6).forEach(user => {
          desktopSuggestions.appendChild(createCard('desktop', user, { buttonText: 'Connect', onClick: () => {} }));
        });
      }
    })
    .catch((error) => {
      console.error("View Pipeline Rendering Interrupted: ", error);
    });

  return container;
}