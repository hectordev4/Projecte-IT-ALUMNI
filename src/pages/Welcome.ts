export function setupWelcome(): HTMLElement {
  const container = document.createElement('section');
  container.className = 'welcome-page-wrapper';

  container.innerHTML = `
    <main>
        <div class="view-mobile">
            <div class="home-content">
                <img src="/icons/logo-letters.png" alt="IT-ALUMNI Logo" class="home-logo">
                <p class="home-tagline">
                Connectant i empoderant a la nostra comunitat global d’alumnes
                </p>
            </div>
            <button class="cta-button">Uneix-te</button>
        </div>
    </main>
    `;

  return container;
}