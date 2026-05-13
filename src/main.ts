import './style.css'
import { setupHome } from './pages/Home'
import { setupNavbar } from './components/Navbar'

const app = document.querySelector<HTMLDivElement>('app')!;

// Add the navbar to the top of the app
app.prepend(setupNavbar());

// Use a simple conditional check (Type Guard)
const appElement = document.getElementById('app');

if (appElement) {
  // Clear any existing content safely
  appElement.innerHTML = ''; 
  // Append the new structure
  appElement.appendChild(setupHome());
} else {
  // Helpful developer warning if the HTML isn't set up right
  console.error('Target element #app was not found in the DOM.');
}