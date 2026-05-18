import './style.css';
import { PageManager } from './managers/pageManager';
import { setupNavbar } from './components/Navbar';

const pageManager = new PageManager('app');
const appElement = document.getElementById('app');

if (appElement) {
  // 1. Inject the Navbar at the very top level first
  appElement.prepend(setupNavbar(pageManager));
  
  // 2. Let the manager decide whether to show 'welcome' or 'home'
  pageManager.initialize();
}