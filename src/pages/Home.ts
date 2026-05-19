

// We pass pageManager dynamically so the mobile dashboard buttons can control routing
export function setupHome(pageManager?: PageManager): HTMLElement {
  const container = document.createElement('section');
  container.className = 'home-page-wrapper';

  container.innerHTML = `
    <main>
        <div class="view-mobile dashboard-container">
            
            <header class="mobile-header">
                <h1 class="header-title">Home</h1>
                <div class="header-actions">
                    <button class="icon-btn" aria-label="Analytics">
                        <svg class="chart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 20V10M12 20V4M6 20v-6"/>
                        </svg>
                    </button>
                    <img src="/img/girl.png" alt="User Avatar" class="user-avatar-img">
                </div>
            </header>

            <div class="search-box-wrapper">
                <span class="search-icon-lens">🔍</span>
                <input type="text" placeholder="Search alumni..." class="search-input-field">
            </div>

            <div class="mobile-dashboard-grid">
                
                <div class="dashboard-card">
                    <div class="card-image-placeholder"></div>
                    <h2 class="card-headline-title">Networking</h2>
                    <p class="card-supporting-description">Connect with professionals in your field.</p>
                    <button class="card-action-outline-btn" id="mob-nav-btn">Explore</button>
                </div>

                <div class="dashboard-card">
                    <div class="card-image-placeholder"></div>
                    <h2 class="card-headline-title">Job Opportunities</h2>
                    <p class="card-supporting-description">Discover openings tailored to your skills.</p>
                    <button class="card-action-outline-btn" id="mob-jobs-btn">Search Jobs</button>
                </div>

            </div>
        </div>

        <div class="view-desktop">
            <div class="hero-section">
                <h1 class="hero-title">Benvingut, Alumni</h1>
                <p class="hero-subtitle">La comunitat que et manté connectat amb el teu futur.</p>
                <div class="hero-actions">
                    <button class="cta-primary">Uneix-te</button>
                    <button class="cta-secondary">Saber-ne més</button>
                </div>
                <img src="/img/coworking-space.webp" alt="Alumni Group" class="hero-banner">
            </div>
            
            <h6 class="section-title">"Què guanyes en formar-ne part?"</h6>
            <div class="features-grid">
                <div class="feature-item">
                    <img src="/icons/icon-hat.png" alt="Share important moments" class="feature-img">
                    <p>Comparteix i no perdis el contacte: Puja els teus moments importants, explica com va tot i queda amb els companys. Una xarxa per estar més a prop.</p>
                    <button class="feature-btn">Apunta't ja!</button>
                </div>

                <div class="feature-item">
                    <img src="/icons/icon-comments.png" alt="Exchange ideas and knowledge" class="feature-img">
                    <p>Participa en discussions: Intercanvia coneixements, punts de vista i opinions sobre temes que t'interessen.</p>
                    <button class="feature-btn">Apunta't ja!</button>
                </div>

                <div class="feature-item">
                    <img src="/icons/icon-add.png" alt="Inter-xarxa" class="feature-img">
                    <p>Xarxa Alumni: Connecta amb companys de promoció, fes noves amistats i crea records per durar tota la vida</p>
                    <button class="feature-btn">Apunta't ja!</button>
                </div>
            </div>
            
            <section class="testimonials-section">
                <h6 class="section-title">"T'ensenyem el que opinen els nostres súper-usuaris!"</h6>
                
                <div class="testimonials-grid">
                    <div class="testimonial-card">
                        <div class="card-header">
                            <img src="/img/girl.png" alt="Mikel" class="avatar">
                            <div class="user-meta">
                                <h3>Mikel</h3>
                                <div class="stars">★★★★★</div>
                            </div>
                        </div>
                        <p>"Gràcies a IT Alumni vaig aconseguir la feina dels meus somnis en el món tech amb el seu increïble programa de mentoria."</p>
                    </div>

                    <div class="testimonial-card">
                        <div class="card-header">
                            <img src="/img/boy.png" alt="Emma" class="avatar">
                            <div class="user-meta">
                                <h3>Emma</h3>
                                <div class="stars">★★★★★</div>
                            </div>
                        </div>
                        <p>“La meva xarxa d'aquesta comunitat ha estat clau: va revolucionar la meva carrera i em va mostrar camins insospitats."</p>
                    </div>

                    <div class="testimonial-card">
                        <div class="card-header">
                            <img src="/img/boy.png" alt="Laia" class="avatar">
                            <div class="user-meta">
                                <h3>Laia</h3>
                                <div class="stars">★★★★★</div>
                            </div>
                        </div>
                        <p>"IT Alumni em va donar les eines i l’autoestima per fer realitat el meu somni d’emprendre."</p>
                    </div>
                </div>

                <div class="carousel-controls">
                    <button class="control-btn">‹</button>
                    <button class="control-btn">›</button>
                </div>
            </section>
        </div>
    </main>
  `;

  // Attach navigation routing triggers directly to the mobile dashboard buttons
  if (pageManager) {
    container.querySelector('#mob-nav-btn')?.addEventListener('click', () => {
      pageManager.switchPage('networking');
    });
    container.querySelector('#mob-jobs-btn')?.addEventListener('click', () => {
      pageManager.switchPage('jobs');
    });
  }

  return container;
}