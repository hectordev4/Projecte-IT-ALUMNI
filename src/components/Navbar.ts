import '../../styles/navbar.css';

import type  { PageRoute } from '../managers/pageManager';
import { PageManager } from '../managers/pageManager';

export function setupNavbar(pageManager: PageManager): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'main-navbar';
  
  nav.innerHTML = `
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
  `;

  // Attach event listeners to the links
  const links = nav.querySelectorAll('.nav-item');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Stop native hash jumping
      
      const route = link.getAttribute('data-route') as PageRoute;
      if (route) {
        pageManager.switchPage(route);
      }
    });
  });

  return nav;
}