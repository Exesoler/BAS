const tableRows = document.querySelectorAll('tbody tr:not(:last-child)');

// when mouse over, change class only on that row
tableRows.forEach(row => {
  row.addEventListener('click', () => {
    tableRows.forEach(row => {
        row.classList.remove('edit');
    });
    row.classList.add('edit');
  });
});

window.onload = function() {
    const input = document.querySelector('.edit input:first-child').focus();
}