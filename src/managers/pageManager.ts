import { setupNavbar } from '../components/Navbar';
import { setupWelcome } from '../pages/Welcome';

/**
 * Valid application routes.
 * 'welcome' represents the standalone mobile-first splash screen.
 * 'home', 'networking', and 'jobs' represent the core layout views.
 */
export type PageRoute = 'welcome' | 'home' | 'networking' | 'jobs';

/**
 * The PageManager class is the centralized routing and structural layout engine
 * of the application. It manages the DOM lifecycles, switches views without reloading,
 * isolates the splash screen, and handles sync states for the shared components.
 */
export class PageManager {
  /** The root DOM node (typically <div id="app">) where everything is mounted */
  private appContainer: HTMLElement;

  /**
   * Initializes the central page manager instance.
   * @param appContainerId - The string ID matching your root HTML entry target wrapper.
   * @throws Error if the target element cannot be resolved in the current DOM.
   */
  constructor(appContainerId: string) {
    const container = document.getElementById(appContainerId);
    if (!container) {
      throw new Error(`PageManager Critical Failure: Element with id "${appContainerId}" not found.`);
    }
    this.appContainer = container;
  }

  /**
   * Evaluates environment constraints (screen dimensions and session parameters)
   * to decide whether to direct a first-time user to the mobile Welcome screen
   * or skip straight to the main Application Landing Page.
   */
  public initialize(): void {
    // Check if the current device is within our mobile breakpoint limit (768px / 48rem)
    const isMobile = window.innerWidth < 768;
    
    // Check if this browser tab session has already cleared the splash gate
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash') === 'true';

    // Route calculation engine routing rule interceptor
    if (isMobile && !hasSeenSplash) {
      this.switchPage('welcome');
    } else {
      this.switchPage('home');
    }
  }

  /**
   * Executes the core view changes. Handles structural mounting differences
   * between the un-nested immersive welcome page and standard nested page views.
   * @param route - The destination PageRoute string token target.
   */
  public switchPage(route: PageRoute): void {
    
    // --- CASE 1: IMMERSIVE STANDALONE MOBILE SPLASH SCREEN ---
    if (route === 'welcome') {
      // Wipe everything clean including old persistent layouts
      this.appContainer.innerHTML = '';
      
      // Inject the isolated welcome page fragment and pass 'this' router instance
      this.appContainer.appendChild(setupWelcome(this));
      return;
    }

    // --- CASE 2: CORE STANDARD SHELL ENVIRONMENT VIEWS ---
    
    // Attempt to locate our global content view frame
    let viewport = document.getElementById('page-viewport');

    // If the structural skeleton shell framework doesn't exist yet, construct it
    if (!viewport) {
      // Clear out the Welcome screen node if coming directly from it
      this.appContainer.innerHTML = '';
      
      // A. Instantiate and prepend the globally responsive main Navbar layout header
      this.appContainer.appendChild(setupNavbar(this));

      // B. Build the explicit inner viewport viewport wrapper panel node
      viewport = document.createElement('main');
      viewport.id = 'page-viewport';
      this.appContainer.appendChild(viewport);

      // C. Inject your own custom footer DOM component seamlessly!
      //this.appContainer.appendChild(setupFooter());
    }

    // Clear out ONLY the inner content space, keeping Navbar and Footer safe from unmounting
    viewport.innerHTML = '';

    // Choose and mount the active page component inside the dedicated main viewport frame
    switch (route) {
      case 'home':
        viewport.innerHTML = `
          <div class="view-desktop" style="padding:5rem; text-align:center;">
            <h2>Home (Proximament)</h2>
            <p style="color: var(--text); margin-top:1rem;">Benvingut!</p>
          </div>`;
        break;
        
      case 'networking':
        viewport.innerHTML = `
          <div class="view-desktop" style="padding:5rem; text-align:center;">
            <h2>Xarxa Hub (Proximament)</h2>
            <p style="color: var(--text); margin-top:1rem;">Estem construint el teu directori professional global.</p>
          </div>`;
        break;
        
      case 'jobs':
        viewport.innerHTML = `
          <div class="view-desktop" style="padding:5rem; text-align:center;">
            <h2>Borsa de Treball IT (Proximament)</h2>
            <p style="color: var(--text); margin-top:1rem;">Ofertes exclusives adaptades al teu perfil tècnic.</p>
          </div>`;
        break;
    }

    // Sync state: Ensure the navbar active text highlights update immediately
    this.updateNavbarActiveState(route);
  }

  /**
   * Scans visible navigational modules, wipes selection classes, and re-attaches
   * pink highlights on active paths. Now accepts 'profile' and updates mobile items.
   * FIXED: Changed visibility access modifier from private to public so Navbar.ts can use it!
   * @param route - The current active PageRoute string or 'profile' placeholder.
   */
  public updateNavbarActiveState(route: PageRoute | 'profile'): void {
    // A. Clear and sync desktop top links
    const desktopLinks = document.querySelectorAll('.nav-links li');
    desktopLinks.forEach(link => link.classList.remove('active'));

    // B. FIXED: Re-added the mobile item selectors to sync mobile view tracking state
    const mobileItems = document.querySelectorAll('.mobile-nav-item');
    mobileItems.forEach(item => item.classList.remove('active'));

    // FIXED: Extended the allowed mapper keys to include the mock 'profile' token block safely
    const routeMap: Record<Exclude<PageRoute | 'profile', 'welcome'>, number> = {
      home: 0,
      networking: 1,
      jobs: 2,
      profile: 3
    };

    if (route !== 'welcome') {
      const activeIndex = routeMap[route];
      
      // Sync desktop selection indicators
      if (desktopLinks[activeIndex]) {
        desktopLinks[activeIndex].classList.add('active');
      }
      
      // Sync mobile selection indicators
      if (mobileItems[activeIndex]) {
        mobileItems[activeIndex].classList.add('active');
      }
    }
  }
}