import type { User } from '../types/user';
import '../../styles/components/card.css';

export type CardVariant = 'mobile' | 'desktop' | 'invisible';

export interface CardOptions {
  buttonText?: string;
  onClick?: (user: User) => void;
}

export function createCard(variant: CardVariant, user: User, options: CardOptions = {}): HTMLElement {
  const cardElement = document.createElement('div');

  // --- 1. INVISIBLE UTILITY VARIANT ---
  if (variant === 'invisible') {
    cardElement.className = 'alumni-card-invisible';
    return cardElement;
  }

  // --- 2. MOBILE COMPONENT VARIANT (Entire object is clickable) ---
  if (variant === 'mobile') {
    cardElement.className = 'alumni-profile-card';
    cardElement.setAttribute('role', 'button');
    cardElement.setAttribute('tabindex', '0');
    cardElement.setAttribute('aria-label', `Veure el perfil de ${user.name}`);
    
    cardElement.innerHTML = `
      <div class="profile-card-details">
        <h3>${user.name}</h3>
        <span class="profile-class-tag">${user.connections} connexions</span>
        <p class="profile-job-title">${user.job}</p>
      </div>
      <div class="profile-avatar-block"></div>
    `;

    // Interactive Trigger Setup (Handles touch taps and keyboard Space/Enter events)
    const handleMobileClick = (e: Event) => {
      if (options.onClick) {
        options.onClick(user);
      } else {
        console.log(`Mobile card object clicked for: ${user.name}`);
      }
    };

    cardElement.addEventListener('click', handleMobileClick);
    cardElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleMobileClick(e);
      }
    });

    return cardElement;
  }

  // --- 3. DESKTOP COMPONENT VARIANT ---
  cardElement.className = 'desktop-member-card';
  const actionLabel = options.buttonText || 'Message';

  cardElement.innerHTML = `
    <h3>${user.name}</h3>
    <p class="member-role">${user.job}</p>
    <span class="member-location">${user.location}</span>
    <button class="member-action-btn btn-gradient-style">${actionLabel}</button>
  `;

  const actionBtn = cardElement.querySelector('.member-action-btn');
  if (actionBtn) {
    actionBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (options.onClick) {
        options.onClick(user);
      } else {
        console.log(`Desktop action "${actionLabel}" fired for: ${user.name}`);
      }
    });
  }

  return cardElement;
}