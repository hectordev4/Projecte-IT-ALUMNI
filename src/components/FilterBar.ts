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
  let debounceTimeoutId: number | null = null; // FIX: Controls the keystroke broadcast throttle window

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

  // 1. Text Input Field Listener with Debounce Protection
  inputField.addEventListener('input', (e) => {
    currentSearchQuery = (e.target as HTMLInputElement).value.trim();

    // Clear the pending timer on every key strike
    if (debounceTimeoutId !== null) {
      window.clearTimeout(debounceTimeoutId);
    }

    // Only broadcast up to PageManager once user pauses typing for 300ms
    debounceTimeoutId = window.setTimeout(() => {
      dispatchStateUpdate();
    }, 300);
  });

  // 2. Tab Navigation Buttons Listeners (Instant execution, no debounce needed)
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('active')) return;

      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      currentFilter = button.getAttribute('data-filter') || '';
      
      // Instantly cancel any pending search timers so the tab switch carries the absolute latest query string values
      if (debounceTimeoutId !== null) {
        window.clearTimeout(debounceTimeoutId);
      }
      
      dispatchStateUpdate();
    });
  });

  return wrapper;
}