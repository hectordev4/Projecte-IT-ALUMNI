import './style.css';
import { setupHome } from './pages/Home';
import { setupFooter } from './components/footer';

// Use a simple conditional check (Type Guard)
const appElement = document.getElementById('app');

if (appElement) {
  // Clear any existing content safely
  appElement.innerHTML = ''; 
  // Append the new structure
  appElement.appendChild(setupHome());
  appElement.appendChild(setupFooter());
} else {
  // Helpful developer warning if the HTML isn't set up right
  console.error('Target element #app was not found in the DOM.');
}