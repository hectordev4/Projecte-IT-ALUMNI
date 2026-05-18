import { PageManager } from '../managers/pageManager';

export function setupWelcome(pageManager: PageManager): HTMLElement {
  const container = document.createElement('div');
  container.className = 'view-mobile';

  container.innerHTML = `
    <div class="home-content">
      <img src="Welcome.png" alt="Logo" class="home-logo">
      <p class="home-tagline">
        Connectant i empoderant a la nostra comunitat global d’alumnes
      </p>
    </div>
    <button class="cta-button" id="enter-app-btn">Uneix-te</button>
  `;

  // Grab the button inside this isolated element context
  const enterBtn = container.querySelector('#enter-app-btn');
  
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      // Lock the session so they don't see this screen again on this visit
      sessionStorage.setItem('hasSeenSplash', 'true');
      
      // Redirect cleanly to the main home dashboard view
      pageManager.switchPage('home');
    });
  }

  return container;
}