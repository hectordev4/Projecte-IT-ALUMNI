import { setupHome } from '../pages/Home';
import { setupWelcome } from '../pages/Welcome'; // Import the new component

export type PageRoute = 'welcome' | 'home' | 'networking' | 'jobs';

export class PageManager {
  private appContainer: HTMLElement;

  constructor(appContainerId: string) {
    const container = document.getElementById(appContainerId);
    if (!container) {
      throw new Error(`PageManager: Element with id "${appContainerId}" not found.`);
    }
    this.appContainer = container;
  }

  public initialize(): void {
    const isMobile = window.innerWidth < 768;
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash') === 'true';

    if (isMobile && !hasSeenSplash) {
      this.switchPage('welcome');
    } else {
      this.switchPage('home');
    }
  }

  public switchPage(route: PageRoute): void {
    this.appContainer.innerHTML = '';

    // Handle Navbar visibility toggling natively based on target route
    const navbar = document.querySelector('.main-navbar') as HTMLElement;
    if (navbar) {
      navbar.style.display = route === 'welcome' ? 'none' : '';
    }

    switch (route) {
      case 'welcome':
        // Append the extracted modular Welcome node, passing 'this' manager instance
        this.appContainer.appendChild(setupWelcome(this));
        break;

      case 'home':
        this.appContainer.appendChild(setupHome());
        break;

      case 'networking':
        this.appContainer.innerHTML = `
          <div class="view-desktop" style="padding:5rem; text-align:center;">
            <h2>Networking Hub coming soon!</h2>
          </div>`;
        break;

      case 'jobs':
        this.appContainer.innerHTML = `
          <div class="view-desktop" style="padding:5rem; text-align:center;">
            <h2>Job Board coming soon!</h2>
          </div>`;
        break;
    }

    this.updateNavbarActiveState(route);
  }

  private updateNavbarActiveState(route: PageRoute): void {
    const navLinks = document.querySelectorAll('.nav-links li');
    if (!navLinks.length) return;

    navLinks.forEach(link => link.classList.remove('active'));

    const routeMap: Record<Exclude<PageRoute, 'welcome'>, number> = {
      home: 0,
      networking: 1,
      jobs: 2
    };

    if (route !== 'welcome') {
      const activeIndex = routeMap[route];
      if (navLinks[activeIndex]) navLinks[activeIndex].classList.add('active');
    }
  }
}