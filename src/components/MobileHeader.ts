import '../../styles/components/mobile-header.css';

interface MobileHeaderOptions {
  title: string;
  onBackClick?: () => void;
  onActionClick?: () => void;
}

export function createMobileHeader(options: MobileHeaderOptions): HTMLElement {
  const header = document.createElement('header');
  header.className = 'component-mobile-header';

  header.innerHTML = `
    <button class="back-arrow-btn" aria-label="Go back" style="${options.onBackClick ? '' : 'visibility: hidden; pointer-events: none;'}">←</button>
    
    <h1 class="sub-header-title">${options.title}</h1>
    
    <div class="sub-header-actions">
      <button class="icon-utility-btn" aria-label="View analytics">📊</button>
      <div class="header-avatar-placeholder">
        <img src="/img/boy.png" alt="Profile" class="header-avatar-img" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
      </div>
    </div>
  `;

  
  const backBtn = header.querySelector('.back-arrow-btn') as HTMLButtonElement;
  backBtn.addEventListener('click', () => {
    if (options.onBackClick) {
      options.onBackClick();
    } else {
      window.history.back();
    }
  });

  const actionBtn = header.querySelector('.icon-utility-btn') as HTMLButtonElement;
  actionBtn.addEventListener('click', () => {
    if (options.onActionClick) {
      options.onActionClick();
    }
  });

  return header;
}