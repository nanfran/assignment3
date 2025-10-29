/*
File: main.js
File: index.html
GUI Assignment: Creating A Dynamic Multiplication Table 
Nancy Vi, UMass Lowell Computer Science, Nancy_Vi@student.uml.edu
Copyright (c) 2025 by Nancy. All rights reserved.

Description: This is the js file for assignment 3, it contains the behavior of the page that 
handles the form subission, input validation (ensures input values are valid, whole, within 
-50 to 50, and the maximums are greater than or equal to the minimums).
Updated by NV on October 29, 2025 at 11:59 PM

*/

//Initializing constants/elements
const MIN_BOUND = -50;
const MAX_BOUND = 50;

const tableForm = document.getElementById('table-form');
const tableContainer = document.getElementById('table-container');
const errorDiv = document.getElementById('error-message');


// Listens for when the 'submit' button is pressed
tableForm.addEventListener('submit', function(event) {
    event.preventDefault();
    generateTable();
});


// Displays the error message as needed and clears the table area
function displayError(message) {
    errorDiv.textContent = message;
    errorDiv.classList.remove('hidden');
}

// Clear the error message
function clearError() {
    errorDiv.textContent = '';
    errorDiv.classList.add('hidden');
}

// Validate the table inputs
function generateTable() {
    clearError();

    const inputIds = ['min_col', 'max_col', 'min_row', 'max_row'];
    const [minCol, maxCol, minRow, maxRow] = inputIds.map(id => parseFloat(document.getElementById(id).value));
    
    const isInvalid = (val) => isNaN(val);
    const isNotWhole = (val) => val !== Math.floor(val);
    
    /* Validation tests for the user inputs. It'll check whether the user inputs are valid numbers (not symbols, empty. etc.),
    the values are whole numbers, range is in between -50 to 50, and the maximums are greater than or equal to the minimums.
    */
    if (isInvalid(minCol) || isInvalid(maxCol) || isInvalid(minRow) || isInvalid(maxRow)) {
         return displayError("Please enter four valid whole numbers for all fields.");
    }
    
    if (isNotWhole(minCol) || isNotWhole(maxCol) || isNotWhole(minRow) || isNotWhole(maxRow)) {
        return displayError("All values must be whole numbers.");
    }

    if (minCol < MIN_BOUND || maxCol > MAX_BOUND || minRow < MIN_BOUND || maxRow > MAX_BOUND) {
        return displayError("Numbers must be between -50 and 50.");
    }

    if (minCol > maxCol) {
        return displayError("Maximum Column Value must be greater than or equal to the Minimum Column Value.");
    }

    if (minRow > maxRow) {
        return displayError("Maximum Row Value must be greater than or equal to the Minimum Row Value.");
    }

    const [validMinCol, validMaxCol, validMinRow, validMaxRow] = [minCol, maxCol, minRow, maxRow];

    // Generate dynamic table
    const table = document.createElement('table');
    table.className = 'multi_table';
    const thead = table.createTHead();
    const tbody = table.createTBody();
    const headerRow = thead.insertRow();
    
    const corner = document.createElement('th');
    corner.textContent = '';
    headerRow.appendChild(corner);

    // Create horizontal headers
    for (let i = validMinCol; i <= validMaxCol; i++) {
        const th = document.createElement('th');
        th.textContent = i;
        headerRow.appendChild(th);
    }

    // Create rows
    for (let i = validMinRow; i <= validMaxRow; i++) {
        const row = tbody.insertRow();

        const headerCell = document.createElement('th');
        headerCell.textContent = i;
        row.appendChild(headerCell);

        for (let j = validMinCol; j <= validMaxCol; j++) {
            const cell = row.insertCell();
            cell.textContent = i * j;
        }
    }

    tableContainer.innerHTML = ''; 
    tableContainer.appendChild(table);
}