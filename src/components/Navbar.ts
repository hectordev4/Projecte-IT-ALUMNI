import { PageManager } from '../managers/pageManager';
import type { PageRoute } from '../managers/pageManager';
import '../../styles/components/navbar.css';


export function setupNavbar(pageManager: PageManager): HTMLElement {
  // Use a neutral outer wrapper so the mobile elements aren't hidden by desktop CSS targets
  const wrapper = document.createElement('div');
  wrapper.className = 'navbar-wrapper-shell';
  
  wrapper.innerHTML = `
    <nav class="main-navbar">
      <div class="nav-container">
        <div class="nav-logo">
          <img src="/icons/logo-letters.png" alt="ALUMNI" class="logo-img">
        </div>
        <ul class="nav-links">
          <li class="nav-item" data-route="home"><a href="#home">Inici</a></li>
          <li class="nav-item" data-route="networking"><a href="#networking">Xarxa</a></li>
          <li class="nav-item" data-route="jobs"><a href="#jobs">Oportunitats de feina</a></li>
        </ul>
        <div class="nav-actions">
          <button class="btn-outline">📥 Apunta't</button>
          <button class="btn-gradient">👤 Com et veuen?</button>
        </div>
      </div>
    </nav>

    <nav class="mobile-bottom-navbar">
      <div class="mobile-nav-item" data-route="home">
        <img src="/icons/Home.svg" alt="Home" class="nav-img">
        <span>Home</span>
      </div>
      
      <div class="mobile-nav-item" data-route="networking">
        <img src="/icons/Networking.svg" alt="Networking" class="nav-img">
        <span>Networking</span>
      </div>
      
      <div class="mobile-nav-item" data-route="jobs">
        <img src="/icons/Jobs.svg" alt="Job Portal" class="nav-img">
        <span>Job Portal</span>
      </div>
      
      <div class="mobile-nav-item" data-route="profile">
        <img src="/icons/Profile.svg" alt="Profile" class="nav-img">
        <span>Profile</span>
      </div>
    </nav>
  `;

  // Query both desktop item triggers and mobile bottom bar elements together
const targets = wrapper.querySelectorAll('.nav-item, .mobile-nav-item');
  
  targets.forEach(target => {
    target.addEventListener('click', (e) => {
      e.preventDefault(); 
      
      const routeStr = target.getAttribute('data-route');
      
      // Keep profile click safe since it's un-routed
      if (routeStr === 'profile') {
        console.warn("Profile view is currently mock-only.");
        // FIXED: Added the missing 'A' to updateNavbarActiveState
        pageManager.updateNavbarActiveState('profile');
        return;
      }
      
      if (routeStr) {
        pageManager.switchPage(routeStr as PageRoute);
      }
    });
  });

  return wrapper;
}