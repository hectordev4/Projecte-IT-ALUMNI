import './style.css';
import { setupNetworking } from './pages/Networking';

// Use a simple conditional check (Type Guard)
const appElement = document.getElementById('app');

if (appElement) {
  // Clear any existing content safely
  appElement.innerHTML = ''; 
  // Append the new structure
  appElement.appendChild(setupNetworking());
} else {
  // Helpful developer warning if the HTML isn't set up right
  console.error('Target element #app was not found in the DOM.');
}