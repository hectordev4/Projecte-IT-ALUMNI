// 1. Core Component Infrastructure Imports
import { setupNavbar } from '../components/Navbar';
import { createFilterBar } from '../components/FilterBar';
import { setupFooter } from '../components/Footer';
import { createMobileHeader } from '../components/MobileHeader';

// 2. Restored Page View Factory Imports
import { setupHome } from '../pages/Home';
import { setupNetworking } from '../pages/Networking';
import { setupJobs } from '../pages/Jobs'; // Fully integrated and unlocked!

export type PageRoute = 'home' | 'networking' | 'jobs' | 'profile';

export class PageManager {
  private appRootId: string;
  private viewport!: HTMLElement;
  private filterMount!: HTMLElement;
  private mobileHeaderMount!: HTMLElement | null; // Track mount location safely
  private currentActiveRoute: PageRoute = 'home';

  constructor(appRootId: string) {
    this.appRootId = appRootId;
  }

  /**
   * Complete, encapsulated application boot sequence
   */
  public async initialize(): Promise<void> {
    console.log(`[Boot Sequence] Running setup inside wrapper: #${this.appRootId}`);

    this.viewport = document.getElementById('viewport-root') as HTMLElement;
    this.filterMount = document.getElementById('global-filter-mount') as HTMLElement;
    this.mobileHeaderMount = document.getElementById('mobile-header-mount'); // Track mobile header mount point
    const navbarMount = document.getElementById('navbar-mount') as HTMLElement;
    const footerMount = document.getElementById('footer-mount') as HTMLElement;

    if (!this.viewport) {
      throw new Error("Critical Boot Error: #viewport-root target element missing in index.html.");
    }

    await this.handleSplashLifecycle();

    if (navbarMount) {
      navbarMount.appendChild(setupNavbar(this));
    }
    
    // Inject the global structural footer here
    if (footerMount) {
      footerMount.appendChild(setupFooter(this));
    }

    // Filter Bar is now natively initialized and context-swapped directly inside the page routing engine
    this.switchPage('home');
  }

  private async handleSplashLifecycle(): Promise<void> {
    const splash = document.getElementById('mobile-splash-screen');
    if (splash) {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      splash.classList.add('fade-out');
      await new Promise(resolve => setTimeout(resolve, 400));
      splash.remove();
    }
  }

  /**
   * Restored routing engine appending the actual page components to the DOM
   */
  public switchPage(route: PageRoute): void {
    this.currentActiveRoute = route;
    if (this.viewport) this.viewport.innerHTML = ''; 

    this.evaluateFilterVisibility(route);
    this.updateMobileHeaderState(route); // Refresh header parameters on each route switch

    switch (route) {
      case 'home':
        this.viewport.appendChild(setupHome(this));
        break;
        
      case 'networking':
        this.viewport.appendChild(setupNetworking(this));
        break;
        
      case 'jobs':
        this.viewport.appendChild(setupJobs(this));
        break;
        
      case 'profile':
        // Clean, simple Typography placeholder you requested
        this.viewport.innerHTML = `
          <div style="padding: 3rem 1.25rem; text-align: center; font-family: var(--sans);">
            <h2 style="color: var(--text-h); margin-bottom: 0.5rem;">Pàgina en Construcció</h2>
            <p style="color: var(--text);">Aquest perfil d'usuari estarà actiu en el següent sprint.</p>
          </div>
        `;
        break;

      default:
        console.warn(`Unmapped route destination configuration hit: ${route}`);
    }

    this.updateNavbarActiveState(route);
  }

  /**
   * Dynamic updater ensuring the active Mobile Header context matches current route selections
   */
  private updateMobileHeaderState(route: PageRoute): void {
    if (!this.mobileHeaderMount) return;
    
    // Clear the active header container tracking element
    this.mobileHeaderMount.innerHTML = '';

    let headerTitle = 'XALUMNI';
    let backAction: (() => void) | undefined = undefined;

    // Determine the dynamic header naming translations 
    switch (route) {
      case 'home':
        headerTitle = 'Inici';
        break;
      case 'networking':
        headerTitle = 'Xarxa';
        backAction = () => this.switchPage('home'); // Safe escape routing fallback step
        break;
      case 'jobs':
        headerTitle = 'Feina';
        backAction = () => this.switchPage('home');
        break;
      case 'profile':
        headerTitle = 'Perfil';
        backAction = () => window.history.back(); // Native fallback trace route back step safely
        break;
    }

    // Append a freshly initialized mobile header instance configured for this route context
    const dynamicHeader = createMobileHeader({
      title: headerTitle,
      onBackClick: backAction
    });

    this.mobileHeaderMount.appendChild(dynamicHeader);
  }

  /**
   * Dynamically evaluates, generates, and mutates the configuration of the FilterBar 
   * based on the explicit structural demands of the active view.
   */
  private evaluateFilterVisibility(route: PageRoute): void {
    if (!this.filterMount) return;
    
    const strictlyRequiresFilters: PageRoute[] = ['networking', 'jobs'];
    
    // Guard Clause: If the route does not utilize filters, clear the container structure entirely
    if (!strictlyRequiresFilters.includes(route)) {
      this.filterMount.style.display = 'none';
      this.filterMount.innerHTML = ''; 
      return;
    }

    this.filterMount.style.display = 'block';
    this.filterMount.innerHTML = ''; // Safely tear down previous view controls to avoid layout memory leak trace

    if (route === 'networking') {
      const filterBarConfig = {
        mode: 'networking' as const, // Locks the discriminated type union parameter
        placeholderText: 'Cerca professionals...',
        filters: ['Popular', 'Most Connected', 'Recent Activity'],
        activeFilter: 'Popular',
        onControlsChange: (filter: string, query: string) => {
          this.dispatchFilterUpdateToActivePage({ filter, query });
        }
      };
      this.filterMount.appendChild(createFilterBar(filterBarConfig));
    } 
    else if (route === 'jobs') {
      const techStacks = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'C++', 'Vue.js', 'Solidity', 'Go'];
      const locations = ['Barcelona (Híbrid)', 'Barcelona (Presencial)', 'Remot (Espanya)', 'Remot (Global)', 'Girona (Presencial)', 'Mataró (Híbrid)'];

      const filterBarConfig = {
        mode: 'jobs' as const,
        placeholderText: 'Cerca ofertes, empreses o stacks...',
        techStacks,
        locations,
        onJobsFilterChange: (controls: { searchQuery: string; techStack: string; location: string; sortBy: string }) => {
          this.dispatchFilterUpdateToActivePage(controls);
        }
      };
      this.filterMount.appendChild(createFilterBar(filterBarConfig));
    }
  }

  /**
   * Universal Event Payload Broadcaster
   * Packages downstream structural input values and fires them into window memory trace safely.
   */
  private dispatchFilterUpdateToActivePage(controlsPayload: any): void {
    const strictlyRequiresFilters: PageRoute[] = ['networking', 'jobs'];
    if (!strictlyRequiresFilters.includes(this.currentActiveRoute)) return;

    const communicationEvent = new CustomEvent('workspaceFilterSync', {
      detail: { 
        ...controlsPayload,
        targetRoute: this.currentActiveRoute 
      }
    });
    window.dispatchEvent(communicationEvent);
  }

  public updateNavbarActiveState(route: PageRoute): void {
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(el => el.classList.remove('active'));
    document.querySelectorAll(`[data-route="${route}"]`).forEach(el => el.classList.add('active'));
  }
}