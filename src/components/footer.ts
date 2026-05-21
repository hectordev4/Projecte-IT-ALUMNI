import '../../styles/footer.css';

export function setupFooter(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'main-footer';

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
          <a href="#sobre">Sobre nosaltres</a>
          <a href="#funcionalitats">Funcionalitats</a>
          <a href="#ajuda">Centre d'ajuda</a>
          <a href="#contacte">Contacta'ns</a>
          <a href="#faqs">FAQs</a>
          <a href="#oportunitats">Oportunitats laborals</a>
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
          <span>© 2024 Brand, Inc. • Privadesa • Termes d'ús</span>
          <span>• Mapa del lloc</span>
        </div>

        <div class="footer-social-icons">
          <a href="#" aria-label="Facebook" class="social-icon"><img src="/icons/LogoFacebook.png" alt="Facebook"></img></a>
          <a href="#" aria-label="LinkedIn" class="social-icon"><img src="/icons/LogoLinkedin.png" alt="LinkedIn"></img></a>
          <a href="#" aria-label="YouTube" class="social-icon"><img src="/icons/LogoYoutube.png" alt="YouTube"></img></a>
        </div>
      </div>

    </div>
  `;

  return footer;
}