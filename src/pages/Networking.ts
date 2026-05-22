import { createCard } from '../components/Card';
import { fetchAlumniData } from '../services/api';
import type { User } from '../types/user';
import '../../styles/networking.css';

export function setupNetworking(): HTMLElement {
  const container = document.createElement('section');
  container.className = 'networking-page-wrapper';

  container.innerHTML = `
    <main>
      <div class="view-mobile networking-mobile-container">
        <header class="mobile-sub-header">
          <button class="back-arrow-btn" aria-label="Back">←</button>
          <h1 class="sub-header-title">Networking</h1>
          <div class="sub-header-actions">
            <button class="icon-utility-btn">📊</button>
            <div class="header-avatar-placeholder"></div>
          </div>
        </header>

        <div class="mobile-search-wrapper">
          <span class="search-lens">🔍</span>
          <input type="text" placeholder="Search alumni..." class="search-input">
        </div>

        <div class="mobile-profile-feed" id="mobile-cards-target">
          <p class="feed-status-msg">Carregant perfils...</p>
        </div>
      </div>

      <div class="view-desktop networking-desktop-container">
        
        <div class="desktop-controls-strip">
          <div class="desktop-search-wrapper">
            <span class="search-lens">🔍</span>
            <input type="text" placeholder="Search alumni..." class="search-input">
          </div>
          <nav class="desktop-filter-tabs">
            <span class="filter-label-text">Filters:</span>
            <button class="filter-tab-btn">Recent Activity</button>
            <button class="filter-tab-btn active">Popular</button>
            <button class="filter-tab-btn">Most Connected</button>
          </nav>
        </div>

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
              <li><strong>Jane Smith</strong> and David Brown connected</li>
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

  const mobileFeed = container.querySelector('#mobile-cards-target') as HTMLElement;
  const desktopGrid = container.querySelector('#desktop-grid-target') as HTMLElement;
  const desktopSuggestions = container.querySelector('#desktop-suggestions-target') as HTMLElement;

  fetchAlumniData('/data/users.json')
    .then((users: User[]) => {
      if (mobileFeed) mobileFeed.innerHTML = '';
      if (desktopGrid) desktopGrid.innerHTML = '';
      if (desktopSuggestions) desktopSuggestions.innerHTML = '';

      // Loop A: Mobile Feed
      if (mobileFeed) {
        users.slice(0, 3).forEach(user => {
          const card = createCard('mobile', user, { onClick: () => {} });
          mobileFeed.appendChild(card);
        });
      }

      // Loop B: Desktop Main Grid (First 4 members)
      if (desktopGrid) {
        users.slice(0, 4).forEach(user => {
          const card = createCard('desktop', user, { 
            buttonText: 'Message', 
            onClick: () => console.log(`Messaging ${user.name}`) 
          });
          desktopGrid.appendChild(card);
        });
      }

      // Loop C: Desktop Sidebar Suggestions (Users 5 and 6)
      // FIXED: Leverages your factory instance component properties natively!
      if (desktopSuggestions) {
        users.slice(4, 6).forEach(user => {
          const card = createCard('desktop', user, { 
            buttonText: 'Connect', 
            onClick: () => console.log(`Connecting with ${user.name}`) 
          });
          desktopSuggestions.appendChild(card);
        });
      }
    })
    .catch((error) => {
      const fallbackErrorMessage = `<p class="feed-error-msg">No s'ha pogut carregar la informació.</p>`;
      if (mobileFeed) mobileFeed.innerHTML = fallbackErrorMessage;
      if (desktopGrid) desktopGrid.innerHTML = fallbackErrorMessage;
      if (desktopSuggestions) desktopSuggestions.innerHTML = fallbackErrorMessage;
      console.error(error);
    });

  return container;
}