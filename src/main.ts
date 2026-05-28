import '../styles/style.css';
import { PageManager } from './managers/pageManager';

// 1. Fire up the manager engine targeting your root div wrapper
const pageManager = new PageManager('app');

// 2. Let the manager handle the split-second routing and splash decisions
pageManager.initialize().catch(err => {
  console.error("Application boot failure:", err);
});