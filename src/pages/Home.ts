export function setupHome(): HTMLElement {
  const container = document.createElement('section');
  container.className = 'home-page-wrapper';

  container.innerHTML = `
    <!-- MOBILE VIEW (Matches Welcome.png) -->
    <main>
        <div class="view-mobile">
            <div class="home-content">
                <img src="Logo+letters" alt="IT-ALUMNI Logo" class="home-logo">
                <p class="home-tagline">
                Connectant i empoderant a la nostra comunitat global d’alumnes
                </p>
            </div>
            <button class="cta-button">Uneix-te</button>
        </div>

    <!-- DESKTOP VIEW (Matches Laptop.jpg) -->
        <div class="view-desktop">
    <!-- Hero Section -->
            <div class="hero-section">
                <h1 class="hero-title">Benvingut, Alumni</h1>
                <p class="hero-subtitle">La comunitat que et manté connectat amb el teu futur.</p>
                <div class="hero-actions">
                <button class="cta-primary">Uneix-te</button>
                <button class="cta-secondary">Saber-ne més</button>
                </div>
                <img src="Laptop.jpg" alt="Alumni Group" class="hero-banner">
            </div>
    <!-- Features Section -->
            <div class="features-grid">
                <div class="feature-item">
                    <img src="icon-networking.png" alt="Networking" class="feature-img">
                    <p>Connecta amb una xarxa global de professionals.</p>
                    <button class="feature-btn">Apunta't ja!</button>
                </div>

                <div class="feature-item">
                    <img src="icon-jobs.png" alt="Jobs" class="feature-img">
                    <p>Accedeix a ofertes de feina exclusives.</p>
                    <button class="feature-btn">Apunta't ja!</button>
                </div>

                <div class="feature-item">
                    <img src="icon-events.png" alt="Events" class="feature-img">
                    <p>Participa en tallers i esdeveniments.</p>
                    <button class="feature-btn">Apunta't ja!</button>
                </div>
            </div>
    <!-- Testimonials Section -->
            <section class="testimonials-section">
                <h6 class="section-title">"T'ensenyem el que opinen els nostres súper-usuaris!"</h6>
                
                <div class="testimonials-grid">
                    <div class="testimonial-card">
                    <div class="card-header">
                        <img src="mikel.png" alt="Mikel" class="avatar">
                        <div class="user-meta">
                        <h3>Mikel</h3>
                        <div class="stars">★★★★★</div>
                        </div>
                    </div>
                    <p>"Gràcies a IT Alumni vaig aconseguir la feina dels meus somnis en el món tech amb el seu increïble programa de mentoria."</p>
                    </div>

                    <div class="testimonial-card">
                    <div class="card-header">
                        <img src="emma.png" alt="Emma" class="avatar">
                        <div class="user-meta">
                        <h3>Emma</h3>
                        <div class="stars">★★★★★</div>
                        </div>
                    </div>
                    <p>“La meva xarxa d'aquesta comunitat ha estat clau: va revolucionar la meva carrera i em va mostrar camins insospitats."</p>
                    </div>

                    <div class="testimonial-card">
                    <div class="card-header">
                        <img src="laia.png" alt="Laia" class="avatar">
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


        </div><!-- End of Desktop View -->
    </main>
  `;

  return container;
}