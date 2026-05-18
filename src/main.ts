import './style.css';
import { PageManager } from './managers/pageManager';
import { setupNavbar } from './components/Navbar';

// Initialize the central page router targeting your #app div wrapper
const pageManager = new PageManager('app');

// Initialize the structural layout
const appElement = document.getElementById('app');

if (appElement) {
  // 1. Fire up the default homepage state
  pageManager.switchPage('home');
  
  // 2. Inject the functional Navbar safely right above the newly rendered home node
  // The Navbar is built with direct event execution hooks straight into the manager state engine
  appElement.prepend(setupNavbar(pageManager));
} else {
  console.error('Core app viewport context lost: element targeting #app execution stopped.');
}