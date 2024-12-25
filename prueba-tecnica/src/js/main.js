const tableRows = document.querySelectorAll('tbody tr:not(:last-child)');
const modal = document.querySelector('.uploadModal');
const dragndropContainer = document.querySelector('.uploadModalBody__dragAndDrop');
const progressContainer = document.querySelector('.uploadModalBody__progress');
const prograssBar = document.querySelector('.progress__bar');
const body = document.querySelector('body');

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

const openModal = () => modal.classList.remove('hidden');

const closeModal = () => {
    modal.classList.add('hidden');
    resetUpload();
};

const changeUpload = () => {
    dragndropContainer.classList.add('hidden');
    progressContainer.classList.remove('hidden');
    setTimeout(() => {
        prograssBar.style.width = '100%';
        setTimeout(() => {
            progressContainer.classList.add('uploadModalBody__progress--success');
            setTimeout(() => {
                closeModal();
            }, 2000);
        }, 3000);
    }, 150);

};

const resetUpload = () => {
    progressContainer.classList.add('hidden');
    dragndropContainer.classList.remove('hidden');
    progressContainer.classList.remove('uploadModalBody__progress--success');
    prograssBar.style.width = '0%';
};


const openFullScreen = () => {
    body.classList.add('tableFullScreen');
};

const closeFullScreen = () => {
    body.classList.remove('tableFullScreen');
};