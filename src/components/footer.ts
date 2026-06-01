import { PageManager } from '../managers/pageManager';
import '../../styles/components/footer.css';

export function setupFooter(pageManager: PageManager): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'main-footer';

  const currentYear = new Date().getFullYear();

  footer.innerHTML = `
    <div class="footer-container">
      
      <div class="footer-subscribe-section">
        <p class="subscribe-title">"No et perdis res, subscriu-te!"</p>
        <div class="subscribe-form">
          <div class="input-wrapper">
            <span class="mail-icon">✉</span>
            <input type="email" placeholder="El teu email" class="subscribe-input">
          </div>
          <button class="subscribe-btn">Subscriu-te</button>
        </div>
      </div>

      <div class="footer-middle-row">
        <div class="footer-logo">
          <img src="/icons/logo-letters.png" alt="XALUMNI" class="footer-logo-img">
        </div>
        <nav class="footer-nav-links">
          <a href="#" data-footer-anchor="sobre">Sobre nosaltres</a>
          <a href="#" data-footer-anchor="funcionalitats">Funcionalitats</a>
          <a href="#" data-footer-anchor="ajuda">Centre d'ajuda</a>
          <a href="#" data-footer-anchor="contacte">Contacta'ns</a>
          <a href="#" data-footer-anchor="faqs">FAQs</a>
          <a href="#" data-footer-route="jobs">Oportunitats laborals</a>
        </nav>
      </div>

      <hr class="footer-divider">

      <div class="footer-bottom-row">
        <div class="footer-lang-selector">
          <select class="lang-select">
            <option value="ca">Català</option>
            <option value="es">Castellano</option>
            <option value="en">English</option>
          </select>
        </div>
        
        <div class="footer-copyright-meta">
          <span>© ${currentYear} Brand, Inc. • Privadesa • Termes d'ús</span>
          <span>• Mapa del lloc</span>
        </div>

        <div class="footer-social-icons">
          <a href="#" aria-label="Facebook" class="social-icon"><img src="/icons/LogoFacebook.png" alt="Facebook"></a>
          <a href="#" aria-label="LinkedIn" class="social-icon"><img src="/icons/LogoLinkedin.png" alt="LinkedIn"></a>
          <a href="#" aria-label="YouTube" class="social-icon"><img src="/icons/LogoYoutube.png" alt="YouTube"></a>
        </div>
      </div>

    </div>
  `;

  const jobsLink = footer.querySelector('[data-footer-route="jobs"]');
  jobsLink?.addEventListener('click', (e) => {
    e.preventDefault();
    pageManager.switchPage('jobs');
  });

  footer.querySelectorAll('[data-footer-anchor]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetAnchor = (link as HTMLElement).getAttribute('data-footer-anchor');
      console.log(`Static informational link triggered for section: ${targetAnchor}`);
    });
  });

  return footer;
}