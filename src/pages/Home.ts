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
                <img src="/img/coworking-space.webp" alt="Alumni Group" class="hero-banner">
            </div>
    <!-- Features Section -->
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
    <!-- Testimonials Section -->
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


        </div><!-- End of Desktop View -->
    </main>
        <!-- Footer Section -->
            <footer class="main-footer">
                <!-- Newsletter Section -->
                <div class="footer-newsletter">
                    <h3>"No et perdis res, subscriu-te!"</h3>
                    <div class="newsletter-input-group">
                    <div class="input-wrapper">
                        <span class="icon">✉</span>
                        <input type="email" placeholder="El teu email">
                    </div>
                    <button class="newsletter-btn">Subscriu-te</button>
                    </div>
                </div>

                <!-- Main Navigation Row -->
                <div class="footer-main-nav">
                    <div class="footer-logo">
                    <img src="/icons/logo-letters.png" alt="ALUMNI" class="footer-logo-img">
                    </div>
                    <nav class="footer-links">
                    <a href="#">Sobre nosaltres</a>
                    <a href="#">Funcionalitats</a>
                    <a href="#">Centre d'ajuda</a>
                    <a href="#">Contacta'ns</a>
                    <a href="#">FAQs</a>
                    <a href="#">Oportunitats laborals</a>
                    </nav>
                </div>

                <hr class="footer-divider">

                <!-- Bottom Utility Bar -->
                <div class="footer-bottom">
                    <div class="language-selector">
                    <select>
                        <option>Català</option>
                        <option>English</option>
                    </select>
                    </div>
                    
                    <div class="footer-legal">
                    <p>© 2024 Brand, Inc. • Privadesa • Termes d'ús</p>
                    <p>• Mapa del lloc</p>
                    </div>

                    <div class="social-icons">
                    <a href="#" class="social-link">FB</a>
                    <a href="#" class="social-link">IN</a>
                    <a href="#" class="social-link">YT</a>
                    </div>
                </div>
            </footer>
  `;

  return container;
}