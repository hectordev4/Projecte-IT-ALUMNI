

export function setupNavbar() {
  const nav = document.createElement('nav');
  nav.className = 'navbar';

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Networking', href: '#networking' },
    { name: 'Jobs', href: '#jobs' }
  ];

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'nav-buttons';

  navItems.forEach(item => {
    const btn = document.createElement('button');
    btn.textContent = item.name;
    btn.className = 'nav-btn';
    
    // Simple click handler for demonstration
    btn.onclick = () => {
      console.log(`Navigating to ${item.name}`);
      // Handle routing logic here
    };

    buttonContainer.appendChild(btn);
  });

  nav.appendChild(buttonContainer);
  return nav;
}