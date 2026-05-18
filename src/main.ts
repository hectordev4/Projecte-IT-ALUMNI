import './style.css';
import { PageManager } from './managers/pageManager';

// 1. Fire up the manager engine targeting your root div
const pageManager = new PageManager('app');

// 2. Let the manager handle the split-second routing decisions
pageManager.initialize();