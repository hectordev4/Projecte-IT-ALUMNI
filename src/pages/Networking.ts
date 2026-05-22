import '../../styles/networking.css';

export function setupNetworking(): HTMLElement {
  const container = document.createElement('section');
  container.className = 'networking-page-wrapper';

  container.innerHTML = `
    <main>
      <div class="view-mobile networking-mobile-container">
        <header class="mobile-sub-header">
          <button class="back-arrow-btn" aria-label="Tornar enrere">←</button>
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

        <div class="mobile-profile-feed">
          <div class="alumni-profile-card">
            <div class="profile-card-details">
              <h3>John Doe</h3>
              <span class="profile-class-tag">Class of 2010</span>
              <p class="profile-job-title">CEO at TechSolutions Inc.</p>
            </div>
            <div class="profile-avatar-block"></div>
          </div>

          <div class="alumni-profile-card">
            <div class="profile-card-details">
              <h3>Sarah Johnson</h3>
              <span class="profile-class-tag">Class of 2015</span>
              <p class="profile-job-title">Marketing Director at GreenWave</p>
            </div>
            <div class="profile-avatar-block"></div>
          </div>

          <div class="alumni-profile-card">
            <div class="profile-card-details">
              <h3>Michael Brown</h3>
              <span class="profile-class-tag">Class of 2008</span>
              <p class="profile-job-title">Founder of EduLearn Academy</p>
            </div>
            <div class="profile-avatar-block"></div>
          </div>

          <div class="alumni-profile-card">
            <div class="profile-card-details">
              <h3>Emily Davis</h3>
              <span class="profile-class-tag">Class of 2012</span>
              <p class="profile-job-title">Research Scientist at BioTech Labs</p>
            </div>
            <div class="profile-avatar-block"></div>
          </div>

          <div class="alumni-profile-card">
            <div class="profile-card-details">
              <h3>James Lee</h3>
              <span class="profile-class-tag">Class of 2005</span>
              <p class="profile-job-title">Managing Partner at Lee & Associates</p>
            </div>
            <div class="profile-avatar-block"></div>
          </div>
        </div>
      </div>

      <div class="view-desktop networking-desktop-container">
        
        <div class="desktop-controls-strip">
          <div class="desktop-search-wrapper">
            <span class="search-lens">🔍</span>
            <input type="text" placeholder="Search alumni..." class="search-input">
          </div>
          <nav class="desktop-filter-tabs">
            <span>Filters:</span>
            <button class="filter-tab-btn">Recent Activity</button>
            <button class="filter-tab-btn active">Popular</button>
            <button class="filter-tab-btn">Most Connected</button>
          </nav>
        </div>

        <section class="popular-profiles-grid">
          <div class="desktop-member-card">
            <h3>Jane Smith</h3>
            <p class="member-role">Co-Founder at ABC Inc</p>
            <span class="member-location">New York, NY</span>
            <button class="member-action-btn">Message</button>
          </div>

          <div class="desktop-member-card">
            <h3>John Doe</h3>
            <p class="member-role">Product Manager at XYZ Corp</p>
            <span class="member-location">San Francisco, CA</span>
            <button class="member-action-btn">Message</button>
          </div>

          <div class="desktop-member-card">
            <h3>Alice Johnson</h3>
            <p class="member-role">Senior Developer at Tech Solutions</p>
            <span class="member-location">Remote</span>
            <button class="member-action-btn">Message</button>
          </div>

          <div class="desktop-member-card">
            <h3>David Brown</h3>
            <p class="member-role">Marketing Specialist at Brand Co</p>
            <span class="member-location">Chicago, IL</span>
            <button class="member-action-btn">Message</button>
          </div>
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
            
            <div class="suggestion-stack">
              <div class="suggested-item-row">
                <div class="suggested-meta">
                  <h3>Jane Smith</h3>
                  <p>Co-Founder at ABC Inc</p>
                  <span>New York, NY</span>
                </div>
                <button class="member-action-btn">Connect</button>
              </div>

              <div class="suggested-item-row">
                <div class="suggested-meta">
                  <h3>John Doe</h3>
                  <p>Product Manager at XYZ Corp</p>
                  <span>San Francisco, CA</span>
                </div>
                <button class="member-action-btn">Connect</button>
              </div>

              <div class="suggested-item-row">
                <div class="suggested-meta">
                  <h3>Alice Johnson</h3>
                  <p>Senior Developer at Tech Solutions</p>
                  <span>Remote</span>
                </div>
                <button class="member-action-btn">Connect</button>
              </div>

              <div class="suggested-item-row">
                <div class="suggested-meta">
                  <h3>David Brown</h3>
                  <p>Marketing Specialist at Brand Co</p>
                  <span>Chicago, IL</span>
                </div>
                <button class="member-action-btn">Connect</button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  `;

  return container;
}