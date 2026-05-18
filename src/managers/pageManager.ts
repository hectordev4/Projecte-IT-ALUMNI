import { setupWelcome } from '../pages/Welcome';
import { setupHome } from '../pages/Home';


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
    // Check if on mobile (screen width less than 768px / 48rem)
    const isMobile = window.innerWidth < 768;
    // Check if they already went through the splash screen this session
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash') === 'true';

    if (isMobile && !hasSeenSplash) {
      this.switchPage('welcome');
    } else {
      this.switchPage('home');
    }
  }

  public switchPage(route: PageRoute): void {
    this.appContainer.innerHTML = '';

    // Handle Navbar Visibility: Hide it completely on the standalone welcome screen
    const navbar = document.querySelector('.main-navbar') as HTMLElement;
    if (navbar) {
      navbar.style.display = route === 'welcome' ? 'none' : '';
    }

    switch (route) {
      case 'welcome':
        // Render ONLY the mobile splash container
        this.appContainer.appendChild(setupWelcome());
        
        // Attach the session locker to the button click
        document.getElementById('enter-app-btn')?.addEventListener('click', () => {
          sessionStorage.setItem('hasSeenSplash', 'true');
          this.switchPage('home');
        });
        break;

      case 'home':
        // On desktop, this shows the whole landing page. 
        // On mobile, since hasSeenSplash is true, we can show a modified home dashboard or the laptop view without the splash setup.
        this.appContainer.appendChild(setupHome());
        break;

      case 'networking':
        this.appContainer.innerHTML = `<div class="view-desktop" style="padding:5rem;"><h2>Xarxa</h2></div>`;
        break;

      case 'jobs':
        this.appContainer.innerHTML = `<div class="view-desktop" style="padding:5rem;"><h2>Feina</h2></div>`;
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