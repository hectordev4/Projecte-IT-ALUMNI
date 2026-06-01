import { PageManager } from '../managers/pageManager';

export function setupWelcome(pageManager: PageManager): HTMLElement {
  const container = document.createElement('div');
  container.className = 'view-mobile';

  container.innerHTML = `
    <div class="home-content">
      <img src="/icons/logo-letters.png" alt="Logo" class="home-logo">
      <p class="home-tagline">
        Connectant i empoderant a la nostra comunitat global d’alumnes
      </p>
    </div>
    <button class="cta-button" id="enter-app-btn">Uneix-te</button>
  `;

  const enterBtn = container.querySelector('#enter-app-btn');
  
  if (enterBtn) {
    enterBtn.addEventListener('click', () => {
      sessionStorage.setItem('hasSeenSplash', 'true');
      pageManager.switchPage('home');
    });
  }

  return container;
}