import '../../styles/components/filter-bar.css';

interface BaseFilterOptions {
  placeholderText?: string;
}

interface NetworkingFilterOptions extends BaseFilterOptions {
  mode: 'networking';
  filters: string[];
  activeFilter: string;
  onControlsChange: (activeFilter: string, searchQuery: string) => void;
}

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

type FilterBarOptions = NetworkingFilterOptions | JobsFilterOptions;

export function createFilterBar(options: FilterBarOptions): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = `global-filter-component mode-${options.mode}`;

  let debounceTimeoutId: any = null;

  // --------------------------------------------------------------------------
  // SHARED DOM BASE LAYOUT: Search Input Field ALWAYS Comes First
  // --------------------------------------------------------------------------
  const defaultPlaceholder = options.mode === 'networking' 
    ? 'Cerca professionals...' 
    : 'Cerca ofertes, empreses o stacks...';

  wrapper.innerHTML = `
    <div class="component-search-wrapper">
      <span class="search-lens">🔍</span>
      <input type="text" placeholder="${options.placeholderText || defaultPlaceholder}" class="search-input-field">
    </div>

    <div class="component-sub-filters-container"></div>
  `;

  // Safely grab our shared input field and target content container elements
  const inputField = wrapper.querySelector('.search-input-field') as HTMLInputElement | null;
  const subFiltersContainer = wrapper.querySelector('.component-sub-filters-container') as HTMLElement;

  // --------------------------------------------------------------------------
  // BRANCH A: NETWORKING ADAPTER STATE MANIPULATION
  // --------------------------------------------------------------------------
  if (options.mode === 'networking') {
    let currentFilter = options.activeFilter;
    let currentSearchQuery = '';

    // Inject the flat horizontal navigation tab selector group below the search field slot
    subFiltersContainer.innerHTML = `
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

    const tabButtons = wrapper.querySelectorAll('.filter-tab-btn');
    const triggerUpdate = () => options.onControlsChange(currentFilter, currentSearchQuery);

    if (inputField) {
      inputField.addEventListener('input', (e) => {
        currentSearchQuery = (e.target as HTMLInputElement).value.trim();
        if (debounceTimeoutId !== null) window.clearTimeout(debounceTimeoutId);
        debounceTimeoutId = window.setTimeout(triggerUpdate, 300);
      });
    }

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
  
  // --------------------------------------------------------------------------
  // BRANCH B: JOBS ADAPTER STATE MANIPULATION (Single Consolidated Input Field)
  // --------------------------------------------------------------------------
  else {
    let currentSearchQuery = '';
    let selectedTech = 'All';
    let selectedLocation = 'All';
    let selectedSort = 'Recent';

    // Inject *only* the specific multi-dropdown elements without duplicating the search input container
    subFiltersContainer.innerHTML = `
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
    `;

    const techSelect = wrapper.querySelector('#filter-tech-stack') as HTMLSelectElement | null;
    const locSelect = wrapper.querySelector('#filter-location') as HTMLSelectElement | null;
    const sortSelect = wrapper.querySelector('#filter-sort') as HTMLSelectElement | null;

    const triggerJobsUpdate = () => {
      options.onJobsFilterChange({
        searchQuery: currentSearchQuery,
        techStack: selectedTech,
        location: selectedLocation,
        sortBy: selectedSort
      });
    };

    if (inputField) {
      inputField.addEventListener('input', (e) => {
        currentSearchQuery = (e.target as HTMLInputElement).value.trim();
        if (debounceTimeoutId !== null) window.clearTimeout(debounceTimeoutId);
        debounceTimeoutId = window.setTimeout(triggerJobsUpdate, 300);
      });
    }

    if (techSelect) {
      techSelect.addEventListener('change', (e) => {
        selectedTech = (e.target as HTMLSelectElement).value;
        triggerJobsUpdate();
      });
    }

    if (locSelect) {
      locSelect.addEventListener('change', (e) => {
        selectedLocation = (e.target as HTMLSelectElement).value;
        triggerJobsUpdate();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        selectedSort = (e.target as HTMLSelectElement).value;
        triggerJobsUpdate();
      });
    }
  }

  return wrapper;
}