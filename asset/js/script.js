const tareaNueva = document.getElementById('ingreso');
const btnAgregar = document.getElementById('agregar');
const listaDeId = document.getElementById('id');
const listaDeTareas = document.getElementById('tarea');
const listaDeCompletado = document.getElementById('completado');
const totalSpan = document.getElementById('total');
const realizadasSpan = document.getElementById('realizadas');

let tareasIngresadas = [
    { id: '001', tarea: 'Sacara pasear al perro', completado: false },
    { id: '002', tarea: 'Ir al gym', completado: false },
    { id: '003', tarea: 'Almuerzo familiar', completado: false }
];

function actualizarLista() {
    listaDeId.innerHTML = '';
    listaDeTareas.innerHTML = '';
    listaDeCompletado.innerHTML = '';

    tareasIngresadas.forEach((tarea, index) => {
        const liId = document.createElement('li');
        liId.textContent = tarea.id;
        listaDeId.appendChild(liId);

        const liTarea = document.createElement('li');
        liTarea.textContent = tarea.tarea;
        listaDeTareas.appendChild(liTarea);

        const liCompletado = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = tarea.completado;
        checkbox.addEventListener('change', () => {
            tarea.completado = checkbox.checked;
            actualizarContadores(); 
        });
        liCompletado.appendChild(checkbox);

        const iconoEliminar = document.createElement('span');
        iconoEliminar.textContent = '🗑️';
        iconoEliminar.style.cursor = 'pointer';
        iconoEliminar.addEventListener('click', () => {
            tareasIngresadas.splice(index, 1);
            actualizarLista();
            actualizarContadores();
        });
        liCompletado.appendChild(iconoEliminar);

        listaDeCompletado.appendChild(liCompletado);
    });

    actualizarContadores();
}

function actualizarContadores() {
    const total = tareasIngresadas.length;
    const realizadas = tareasIngresadas.filter(tarea => tarea.completado).length;
    totalSpan.textContent = total;
    realizadasSpan.textContent = realizadas;
}

function agregarTarea() {
    const nuevaTarea = tareaNueva.value.trim();
    if (nuevaTarea !== '') {
        let idTarea = tareasIngresadas.length + 1;
        if (idTarea < 100) {
            idTarea = ('00' + idTarea).slice(-3);
        }
        
        tareasIngresadas.push({ id: idTarea, tarea: nuevaTarea, completado: false });
        tareaNueva.value = '';
        actualizarLista();
        actualizarContadores();
    } else {
        alert('No has agreado una tarea. Escribela y vuelve a dar "click".');
    }
}

tareaNueva.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        btnAgregar.click();
    }
});

btnAgregar.addEventListener('click', agregarTarea);

actualizarLista();
