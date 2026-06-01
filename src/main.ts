import '../styles/style.css';
import { PageManager } from './managers/pageManager';

const pageManager = new PageManager('app');

pageManager.initialize().catch(err => {
  console.error("Application boot failure:", err);
});