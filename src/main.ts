import './style.css'
import { Home } from './pages/Home'
import { Jobs } from './pages/Jobs'
import { Networking } from './pages/Networking'
import { setupNavbar } from './components/navbar'

const app = document.querySelector<HTMLDivElement>('#app')!;

// Add the navbar to the top of the app
app.prepend(setupNavbar());

app.innerHTML += `
  <main>
    <h1>Welcome to IT-ALUMNI</h1>
    <p>Select a section from the navbar above.</p>
  </main>
`;