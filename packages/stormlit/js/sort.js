function setupTableFilter(table) {
    const tableId = table.id;
    if (!tableId) return; // Exit if the table doesn't have an ID

    // Select the input field that points to this specific table ID
    const filterInput = document.querySelector(`input[target-table="${tableId}"]`);
    
    if (filterInput) {
        filterInput.addEventListener('input', (event) => {
            // When the user types, call filterTable using the current table and input value
            filterTable(table, event.target.value);
        });
    }
}

/**
 * Filters the table rows based on a search query.
 * @param {HTMLElement} table The table element to filter.
 * @param {string} query The search string.
 */
function filterTable(table, query) {
    const tableBody = table.querySelector('tbody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));
    const lowerCaseQuery = query.toLowerCase().trim();

    rows.forEach(row => {
        // 1. Skip rows containing a sortable header (divider/group rows)
        if (row.querySelector('th.sortable-header')) {
            row.style.display = ''; // Ensure these rows are always visible
            return;
        }

        // 2. Get all text content from the row and check for query match
        const rowText = row.textContent.toLowerCase();

        if (rowText.includes(lowerCaseQuery)) {
            row.style.display = ''; // Show the row
        } else {
            row.style.display = 'none'; // Hide the row
        }
    });
}


/**
 * Attaches event listeners to the headers of a single table element.
 * The sorting state is now managed locally on the table element itself 
 * using 'data-sort-column' and 'data-sort-direction' attributes.
 * * @param {HTMLElement} table The table element to make sortable.
 */
function initializeSortableTable(table) {
    // Ensure table has an initial state attribute if none exists
    if (!table.hasAttribute('data-sort-column')) {
        table.setAttribute('data-sort-column', -1);
        table.setAttribute('data-sort-direction', 'asc');
    }

    const headers = table.querySelectorAll('th.sortable-header');
    headers.forEach(header => {
        // Create a span for the icon and append it to the header text
        const iconSpan = document.createElement('span');
        // We only add 'sort-icon' and layout classes (ml-2), removing any hardcoded color classes.
        iconSpan.classList.add('sort-icon', 'ml-2'); 
        iconSpan.innerHTML = ''; // Initial content is now empty to hide the icon on load
        header.appendChild(iconSpan);

        header.addEventListener('click', () => {
            // Get the index directly from the TH element's position (cellIndex)
            const columnIndex = header.cellIndex;
            const dataType = header.getAttribute('data-type');
            
            // Pass the table element itself to sortTable
            sortTable(table, columnIndex, dataType);
        });
    });
}

/**
 * Sorts the table based on the given column index and data type, 
 * managing state on the table element.
 * * @param {HTMLElement} table The specific table element being sorted.
 * @param {number} columnIndex The index of the column to sort.
 * @param {string} dataType The data type of the column ('string', 'number', 'date').
 */
function sortTable(table, columnIndex, dataType) {
    const tableBody = table.querySelector('tbody');
    
    // Select all rows, then filter out any rows containing a 'th.sortable-header' 
    // to prevent sorting non-data rows (like dividers or group headers) as requested.
    const rows = Array.from(tableBody.querySelectorAll('tr'))
        .filter(row => !row.querySelector('th.sortable-header'));
    
    // --- Local State Management ---
    // Read the current state from the table's attributes
    const currentColumn = parseInt(table.getAttribute('data-sort-column'));
    const currentDirection = table.getAttribute('data-sort-direction');

    // Determine the new direction
    let direction = 'asc';
    if (currentColumn === columnIndex) {
        // Toggle direction if the same column is clicked
        direction = currentDirection === 'asc' ? 'desc' : 'asc';
    }

    // Update the state on the table element
    table.setAttribute('data-sort-column', columnIndex);
    table.setAttribute('data-sort-direction', direction);
    // ----------------------------

    // Sorting logic
    rows.sort((rowA, rowB) => {
        // Safely retrieve the cell elements to prevent 'Cannot read properties of undefined' errors
        const cellAElement = rowA.cells[columnIndex];
        const cellBElement = rowB.cells[columnIndex];

        // Use safe fallbacks if the cell is missing (i.e., row has too few columns)
        // Missing data will be treated as an empty string, preventing a crash.
        let cellA = cellAElement ? cellAElement.textContent.trim() : '';
        let cellB = cellBElement ? cellBElement.textContent.trim() : '';
        
        // Use data-value for accurate sorting if available (e.g., numbers, dates)
        // We also check if the cell element exists before calling getAttribute
        const dataValueA = cellAElement ? cellAElement.getAttribute('data-value') : null;
        const dataValueB = cellBElement ? cellBElement.getAttribute('data-value') : null;

        if (dataValueA !== null) cellA = dataValueA;
        if (dataValueB !== null) cellB = dataValueB;

        let comparison = 0;

        switch (dataType) {
            case 'number':
                // Treat empty string or non-numeric values as 0 for sorting purposes
                const numA = parseFloat(cellA) || 0;
                const numB = parseFloat(cellB) || 0;
                comparison = numA - numB;
                break;
            case 'date':
                // Treat invalid dates (like those from empty strings) as 0
                const timeA = new Date(cellA).getTime() || 0;
                const timeB = new Date(cellB).getTime() || 0;
                comparison = timeA - timeB;
                break;
            case 'string':
            default:
                comparison = cellA.toLowerCase().localeCompare(cellB.toLowerCase());
                break;
        }

        return direction === 'asc' ? comparison : -comparison;
    });

    // Re-render the table body
    rows.forEach(row => tableBody.appendChild(row));

    // Update header styles
    updateHeaderStyles(table, columnIndex, direction);
}

/**
 * Updates the visual indicator (arrow) on the sorted header for a specific table.
 * The appearance of the icon is now controlled solely by CSS classes.
 * * @param {HTMLElement} table The table element.
 * @param {number} columnIndex The index of the column that was sorted.
 * @param {string} direction The new sort direction.
 */
function updateHeaderStyles(table, columnIndex, direction) {
    const headers = table.querySelectorAll('th.sortable-header');
    
    headers.forEach((header, index) => {
        const iconSpan = header.querySelector('.sort-icon');
        if (!iconSpan) return; // Safety check

        // 1. Reset classes on TH and set icon content to be invisible
        header.classList.remove('asc', 'desc'); 
        iconSpan.innerHTML = ''; // Icon content is cleared for unsorted headers

        // 2. Add the new state class to the TH and set the active arrow content
        if (index === columnIndex) {
            // This is the key state class that external CSS should target
            header.classList.add(direction); 
            
            if (direction === 'asc') {
                iconSpan.innerHTML = '&#9650;'; // Up Arrow (▲) for Ascending
            } else {
                iconSpan.innerHTML = '&#9660;'; // Down Arrow (▼) for Descending
            }
        }
    });
}

/**
 * Main initialization function. Finds all tables with the class 'sortable-table' 
 * and makes them sortable.
 */
window.onload = function() {
    // Select all tables with the class 'sortable-table'
    const tables = document.querySelectorAll('.sortable-table');
    
    tables.forEach(table => {
        initializeSortableTable(table);
        setupTableFilter(table);
    });
};
