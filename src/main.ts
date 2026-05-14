import './style.css'
import { setupHome } from './pages/Home'
import { setupNavbar } from './components/Navbar'

const appElement = document.getElementById('app');

if (appElement) {
  appElement.innerHTML = ''; 
  
  appElement.appendChild(setupHome());
  
  appElement.prepend(setupNavbar());
  
} else {
  console.error('Target element #app was not found in the DOM.');
}