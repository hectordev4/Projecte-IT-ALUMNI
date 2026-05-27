import '../../styles/components/filter-bar.css';

interface FilterBarOptions {
  filters: string[];
  activeFilter: string;
  placeholderText?: string;
  // Combined handler passing both real-time states back simultaneously
  onControlsChange: (activeFilter: string, searchQuery: string) => void;
}

export function createFilterBar(options: FilterBarOptions): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'global-filter-component';

  // Keep track of internal state variables
  let currentFilter = options.activeFilter;
  let currentSearchQuery = '';

  wrapper.innerHTML = `
    <div class="component-search-wrapper">
      <span class="search-lens">🔍</span>
      <input type="text" placeholder="${options.placeholderText || 'Search...'}" class="search-input-field">
    </div>

    <nav class="component-filter-tabs">
      <span class="filter-label-text">Filters:</span>
      <div class="tabs-scroll-container">
        ${options.filters.map(filter => `
          <button class="filter-tab-btn ${filter === currentFilter ? 'active' : ''}" data-filter="${filter}">
            ${filter}
          </button>
        `).join('')}
      </div>
    </nav>
  `;

  const inputField = wrapper.querySelector('.search-input-field') as HTMLInputElement;
  const tabButtons = wrapper.querySelectorAll('.filter-tab-btn');

  // Helper trigger to announce changed UI states
  const dispatchStateUpdate = () => {
    options.onControlsChange(currentFilter, currentSearchQuery);
  };

  // 1. Text Input Field Listener (Triggers on every keystroke)
  inputField.addEventListener('input', (e) => {
    currentSearchQuery = (e.target as HTMLInputElement).value.trim();
    dispatchStateUpdate();
  });

  // 2. Tab Navigation Buttons Listeners
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('active')) return;

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      currentFilter = button.getAttribute('data-filter') || '';
      dispatchStateUpdate();
    });
  });

  return wrapper;
}