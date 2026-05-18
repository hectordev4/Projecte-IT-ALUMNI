import { setupHome } from '../pages/Home';
// import { setupNetworking } from '../pages/Networking';
// import { setupJobs } from '../pages/Jobs';


// Define the type and export it
export type PageRoute = 'home' | 'networking' | 'jobs';

export class PageManager {
  private appContainer: HTMLElement;

  constructor(appContainerId: string) {
    const container = document.getElementById(appContainerId);
    if (!container) {
      throw new Error(`PageManager: Element with id "${appContainerId}" not found.`);
    }
    this.appContainer = container;
  }

  /**
   * Switches the visible page view and syncs the Navbar
   */
  public switchPage(route: PageRoute): void {
    // 1. Find the content wrapper inside #app if it exists, otherwise use #app directly
    // This leaves the Navbar intact if it's prepended to #app
    let contentViewport = document.querySelector('.home-page-wrapper') as HTMLElement;
    
    if (!contentViewport) {
      contentViewport = this.appContainer;
    }

    // 2. Clear out only the view area
    contentViewport.innerHTML = '';

    // 3. Render the requested component inside the active viewport block
    switch (route) {
      case 'home':
        contentViewport.appendChild(setupHome());
        break;
      case 'networking':
        contentViewport.innerHTML = `
          <div class="view-desktop" style="padding:5rem; text-align:center;">
            <h2>Networking Hub coming soon!</h2>
          </div>`;
        break;
      case 'jobs':
        contentViewport.innerHTML = `
          <div class="view-desktop" style="padding:5rem; text-align:center;">
            <h2>Job Board coming soon!</h2>
          </div>`;
        break;
    }

    // 4. Update visual active state links
    this.updateNavbarActiveState(route);
  }

  private updateNavbarActiveState(route: PageRoute): void {
    const navLinks = document.querySelectorAll('.nav-links li');
    if (!navLinks.length) return;

    navLinks.forEach(link => link.classList.remove('active'));

    const routeMap: Record<PageRoute, number> = {
      home: 0,
      networking: 1,
      jobs: 2
    };

    const activeIndex = routeMap[route];
    if (navLinks[activeIndex]) {
      navLinks[activeIndex].classList.add('active');
    }
  }
}