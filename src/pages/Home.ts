import '../../styles/home.css';
import '../../styles/components/testimonialCard.css'; // <-- FIX: Brings in the missing avatar & gold star styles!

import { createTestimonialCard } from '../components/TestimonialCard';

/**
 * Generates and wires up the isolated Home page view component.
 */
export function setupHome() {
  const container = document.createElement('section');
  container.className = 'home-page-wrapper';

  container.innerHTML = `
    <main>
        <div class="view-mobile dashboard-container">
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
                
                <div class="testimonials-grid" id="desktop-testimonials-target"></div>

                <div class="carousel-controls">
                    <button class="control-btn" id="carousel-prev" type="button">‹</button>
                    <button class="control-btn" id="carousel-next" type="button">›</button>
                </div>
            </section>
        </div>
    </main>
  `;

  // 1. Mount the 3 modular testimonial components into the grid target
  const testimonialsTarget = container.querySelector('#desktop-testimonials-target');
  if (testimonialsTarget) {
    for (let i = 0; i < 3; i++) {
      testimonialsTarget.appendChild(createTestimonialCard(i));
    }
  }

  return container;
}