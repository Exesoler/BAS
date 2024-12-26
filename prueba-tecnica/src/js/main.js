const tableRows = document.querySelectorAll('tbody tr:not(:last-child)');
const modal = document.querySelector('.uploadModal');
const dragndropContainer = document.querySelector('.uploadModalBody__dragAndDrop');
const progressContainer = document.querySelector('.uploadModalBody__progress');
const prograssBar = document.querySelector('.progress__bar');
const body = document.querySelector('body');

let cantidadRows = 0;

const trData = '<tr><td width="15%"><div class="inputWrapper"><input type="text" placeholder="Cuenta" name="cuenta" id="cuenta" tabindex="1"><div class="inputValue"><p>2.1.03.03.574</p><p><small>Alias de identificación</small></p></div></div></td><td width="25%"><div class="inputWrapper"><input type="text" placeholder="Nombre" name="nombre" id="nombre" tabindex="2"><div class="inputValue"><p>Sueldos a pagar</p></div></div></td><td width="5%"><div class="inputWrapper"><input type="text" placeholder="Subcuenta" name="subcuenta" id="subcuenta" tabindex="3"><div class="inputValue"><p>1</p></div></div></td><td width="25%"><div class="inputWrapper"><input type="text" placeholder="Detalle" name="detalle" id="detalle" tabindex="4"><div class="inputValue"><p>A pagar</p></div></div></td><td width="15%"><div class="inputWrapper"><input type="text" placeholder="$ 000.000.000" name="debe" id="debe" tabindex="5"><div class="inputValue"><p><span>$</span>000.000.000</p></div></div></td><td width="15%"><div class="inputWrapper"><input type="text" placeholder="$ 000.000.000" name="haber" id="haber" tabindex="6"><div class="inputValue"><p><span>$</span>000.000.000</p></div></div></td><div class="checkBoxContainer"></div></tr>';

const trNumber = '<div class="numberCheckbox__item" onclick="checkboxStatus(this);"><p></p><img data-status="unselected" src="/src/assets/checkbox__unselected.svg" alt="checkbox unselected"></div>'

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
                addRow();
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

const clearEditRow = () => {
    document.querySelector('tr.edit').classList.remove('edit');
    document.querySelector('tr:last-child').classList.add('edit');
};

// body.addEventListener('click', (e) => {
//     closeModal();
//     clearEditRow();
//     console.log('click en body');
// });

const addRow = () => {
    for (let index = 0; index < 24; index++) {
        document.querySelector('tbody').insertAdjacentHTML('beforebegin', trData);
    }
    contarRows();
};

const contarRows = () => {
    cantidadRows = (document.querySelectorAll('tbody tr').length)-1;
    for (let index = 0; index < cantidadRows; index++) {
        document.querySelector('.numberCheckbox').insertAdjacentHTML('beforeEnd', trNumber);
        document.querySelectorAll('.numberCheckbox__item p')[index].innerText = index+1;
    }
    document.querySelector('.subtitleContainer .col p small span').innerText = cantidadRows;
};

const checkboxStatus = (e) => {
    console.log(e.hasAttribute('data-header'));
    const img = e.querySelector('img');
    if (img.dataset.status === 'unselected') {
        if (e.hasAttribute('data-header') && img.dataset.status === 'unselected') {
            document.querySelectorAll('.numberCheckbox__item').forEach(item => {
                item.querySelector('img').src = '/src/assets/checkbox__selected.svg';
                item.querySelector('img').dataset.status = 'selected';
                item.classList.add('selected');
            });
        }
        img.src = '/src/assets/checkbox__selected.svg';
        img.dataset.status = 'selected';
        e.classList.add('selected');
    } else {
        if (e.hasAttribute('data-header') && img.dataset.status === 'selected') {
            document.querySelectorAll('.numberCheckbox__item').forEach(item => {
                item.querySelector('img').src = '/src/assets/checkbox__unselected.svg';
                item.querySelector('img').dataset.status = 'unselected';
                item.classList.remove('selected');
            });
        }
        if (e.hasAttribute('data-header') && img.dataset.status === 'partial') {
            document.querySelectorAll('.numberCheckbox__item').forEach(item => {
                item.querySelector('img').src = '/src/assets/checkbox__selected.svg';
                item.querySelector('img').dataset.status = 'selected';
                item.classList.add('selected');
            });
        }
        img.src = '/src/assets/checkbox__unselected.svg';
        img.dataset.status = 'unselected';
        e.classList.remove('selected');
    }
    checkboxAll();
};

const checkboxAll = () => {
    const checkboxHead = document.querySelectorAll('.numberCheckbox__item')[0];
    let status = 0;
    document.querySelectorAll('.numberCheckbox__item').forEach(item => {
        if(item.querySelector('img').dataset.status == 'selected'){
            status++;
        };
    });
    if(status >= 1){
        if((status+1) == document.querySelectorAll('.numberCheckbox__item').length){
            checkboxHead.querySelector('img').src = '/src/assets/checkbox__selected.svg';
            checkboxHead.querySelector('img').dataset.status = 'selected';
            checkboxHead.classList.add('selected');
        }else{
            checkboxHead.querySelector('img').src = '/src/assets/checkbox__partial.svg';
            checkboxHead.querySelector('img').dataset.status = 'partial';
            checkboxHead.classList.add('selected');
        }
    }else{
        checkboxHead.querySelector('img').src = '/src/assets/checkbox__unselected.svg';
        checkboxHead.querySelector('img').dataset.status = 'unselected';
        checkboxHead.classList.remove('selected');
    }
};