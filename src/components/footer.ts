export function setupFooter(): HTMLElement {
  const container = document.createElement('footer');
  container.className = 'main-footer';

  container.innerHTML = `
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
            <img src="Welcome.png" alt="ALUMNI" class="footer-logo-img">
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
    `;

    return container;
}