import '../../styles/components/filter-bar.css';

// Base options shared across all filter bar states
interface BaseFilterOptions {
  placeholderText?: string;
}

// 1. Networking-Specific Layout Contract (Simple Tab Nav)
interface NetworkingFilterOptions extends BaseFilterOptions {
  mode: 'networking';
  filters: string[];
  activeFilter: string;
  onControlsChange: (activeFilter: string, searchQuery: string) => void;
}

// 2. Jobs-Specific Layout Contract (Advanced Multi-Dropdown Matrix)
interface JobsFilterOptions extends BaseFilterOptions {
  mode: 'jobs';
  techStacks: string[];
  locations: string[];
  onJobsFilterChange: (controls: {
    searchQuery: string;
    techStack: string;
    location: string;
    sortBy: string;
  }) => void;
}

// Unified Union Type
type FilterBarOptions = NetworkingFilterOptions | JobsFilterOptions;

export function createFilterBar(options: FilterBarOptions): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = `global-filter-component mode-${options.mode}`;

  let debounceTimeoutId: number | null = null;

  // --- RENDERING ROUTE A: NETWORKING MODE ---
  if (options.mode === 'networking') {
    let currentFilter = options.activeFilter;
    let currentSearchQuery = '';

    wrapper.innerHTML = `
      <div class="component-search-wrapper">
        <span class="search-lens">🔍</span>
        <input type="text" placeholder="${options.placeholderText || 'Cerca professionals...'}" class="search-input-field">
      </div>
      <nav class="component-filter-tabs">
        <span class="filter-label-text">Filtres:</span>
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

    const triggerUpdate = () => options.onControlsChange(currentFilter, currentSearchQuery);

    inputField.addEventListener('input', (e) => {
      currentSearchQuery = (e.target as HTMLInputElement).value.trim();
      if (debounceTimeoutId !== null) window.clearTimeout(debounceTimeoutId);
      debounceTimeoutId = window.setTimeout(triggerUpdate, 300);
    });

    tabButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (button.classList.contains('active')) return;
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.getAttribute('data-filter') || '';
        if (debounceTimeoutId !== null) window.clearTimeout(debounceTimeoutId);
        triggerUpdate();
      });
    });
  } 
  
  // --- RENDERING ROUTE B: JOBS MODE (Advanced Matrix) ---
  else {
    let currentSearchQuery = '';
    let selectedTech = 'All';
    let selectedLocation = 'All';
    let selectedSort = 'Recent'; // Defaulting to Newest/Recent sorting

    wrapper.innerHTML = `
      <div class="jobs-filter-matrix-grid">
        <!-- Reusable Lens Input Field Area -->
        <div class="component-search-wrapper">
          <span class="search-lens">🔍</span>
          <input type="text" placeholder="${options.placeholderText || 'Cerca ofertes, empreses o tecnologies...'}" class="search-input-field">
        </div>

        <!-- Multi-Dropdown Selector Controls Wrapper -->
        <div class="jobs-dropdown-controls-group">
          <div class="dropdown-select-wrapper">
            <select id="filter-tech-stack" class="jobs-matrix-select">
              <option value="All">Tecnologies (Totes)</option>
              ${options.techStacks.map(tech => `<option value="${tech}">${tech}</option>`).join('')}
            </select>
          </div>

          <div class="dropdown-select-wrapper">
            <select id="filter-location" class="jobs-matrix-select">
              <option value="All">Ubicacions (Totes)</option>
              ${options.locations.map(loc => `<option value="${loc}">${loc}</option>`).join('')}
            </select>
          </div>

          <div class="dropdown-select-wrapper">
            <select id="filter-sort" class="jobs-matrix-select">
              <option value="Recent">Més recents</option>
              <option value="Older">Més antigues</option>
            </select>
          </div>
        </div>
      </div>
    `;

    const inputField = wrapper.querySelector('.search-input-field') as HTMLInputElement;
    const techSelect = wrapper.querySelector('#filter-tech-stack') as HTMLSelectElement;
    const locSelect = wrapper.querySelector('#filter-location') as HTMLSelectElement;
    const sortSelect = wrapper.querySelector('#filter-sort') as HTMLSelectElement;

    const triggerJobsUpdate = () => {
      options.onJobsFilterChange({
        searchQuery: currentSearchQuery,
        techStack: selectedTech,
        location: selectedLocation,
        sortBy: selectedSort
      });
    };

    // Keystroke debounce listeners
    inputField.addEventListener('input', (e) => {
      currentSearchQuery = (e.target as HTMLInputElement).value.trim();
      if (debounceTimeoutId !== null) window.clearTimeout(debounceTimeoutId);
      debounceTimeoutId = window.setTimeout(triggerJobsUpdate, 300);
    });

    // Instant dropdown triggers
    techSelect.addEventListener('change', (e) => {
      selectedTech = (e.target as HTMLSelectElement).value;
      triggerJobsUpdate();
    });

    locSelect.addEventListener('change', (e) => {
      selectedLocation = (e.target as HTMLSelectElement).value;
      triggerJobsUpdate();
    });

    sortSelect.addEventListener('change', (e) => {
      selectedSort = (e.target as HTMLSelectElement).value;
      triggerJobsUpdate();
    });
  }

  return wrapper;
}