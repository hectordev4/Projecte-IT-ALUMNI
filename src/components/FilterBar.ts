import '../../styles/components/filter-bar.css';

interface FilterBarOptions {
  filters: string[];
  activeFilter: string;
  placeholderText?: string;
  onSearch: (query: string) => void;
  onFilterChange: (selectedFilter: string) => void;
}

export function createFilterBar(options: FilterBarOptions): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = 'global-filter-component';

  wrapper.innerHTML = `
    <div class="component-search-wrapper">
      <span class="search-lens">🔍</span>
      <input type="text" placeholder="${options.placeholderText || 'Search...'}" class="search-input-field">
    </div>

    <nav class="component-filter-tabs">
      <span class="filter-label-text">Filters:</span>
      <div class="tabs-scroll-container">
        ${options.filters.map(filter => `
          <button class="filter-tab-btn ${filter === options.activeFilter ? 'active' : ''}" data-filter="${filter}">
            ${filter}
          </button>
        `).join('')}
      </div>
    </nav>
  `;

  // --- EVENT LISTENERS LOGIC ---
  const input = wrapper.querySelector('.search-input-field') as HTMLInputElement;
  input.addEventListener('input', (e) => {
    options.onSearch((e.target as HTMLInputElement).value);
  });

  const tabButtons = wrapper.querySelectorAll('.filter-tab-btn');
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const selected = button.getAttribute('data-filter') || '';
      options.onFilterChange(selected);
    });
  });

  return wrapper;
}