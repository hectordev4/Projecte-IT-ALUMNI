import '../../styles/navbar.css';


export function setupNavbar(): HTMLElement {
  const nav = document.createElement('nav');
  nav.className = 'main-navbar';
  nav.innerHTML = `
    <div class="nav-container">
      <div class="nav-logo">
        <img src="../../public/icons/logo-letters.png" alt="ALUMNI" class="logo-img">
      </div>
      <ul class="nav-links">
        <li class="active"><a href="#">Inici</a></li>
        <li><a href="#">Xarxa</a></li>
        <li><a href="#">Oportunitats de feina</a></li>
      </ul>
      <div class="nav-actions">
        <button class="btn-outline">📥 Apunta't</button>
        <button class="btn-gradient">👤 Com et veuen?</button>
      </div>
    </div>
  `;
  return nav;
}