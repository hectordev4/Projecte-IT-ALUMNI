export function setupHome(): HTMLElement {
  const container = document.createElement('section');
  container.className = 'home-page-wrapper';

  container.innerHTML = `
    <!-- MOBILE VIEW (Matches Welcome.png) -->
    <div class="view-mobile">
      <div class="home-content">
        <img src="Welcome.png" alt="IT-ALUMNI Logo" class="home-logo">
        <p class="home-tagline">
          Connectant i empoderant a la nostra comunitat global d’alumnes
        </p>
      </div>
      <button class="cta-button">Uneix-te</button>
    </div>

    <!-- DESKTOP VIEW (Matches Laptop.jpg) -->
    <div class="view-desktop">
      <div class="hero-section">
        <h1 class="hero-title">Benvingut, Alumni</h1>
        <p class="hero-subtitle">La comunitat que et manté connectat amb el teu futur.</p>
        <div class="hero-actions">
          <button class="cta-primary">Uneix-te</button>
          <button class="cta-secondary">Saber-ne més</button>
        </div>
        <img src="Laptop.jpg" alt="Alumni Group" class="hero-banner">
      </div>
      <!-- Add your features-grid here if needed -->
    </div>
  `;

  return container;
}