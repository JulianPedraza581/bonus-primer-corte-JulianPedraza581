document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskList = document.getElementById('taskList');

    // Función para formatear la fecha (mes, día y hora)
    function formatDate(dateString) {
        // Asumir el año actual
        const currentYear = new Date().getFullYear();

        // Separar la fecha y la hora
        const [datePart, timePart] = dateString.split(' ');

        // Formatear la hora para asegurar que tenga dos puntos
        let formattedTime = timePart || ''; // Si no hay hora, se deja vacío
        if (formattedTime.length === 4 && !formattedTime.includes(':')) {
            // Si la hora tiene 4 dígitos y no tiene dos puntos, agregarlos
            formattedTime = formattedTime.slice(0, 2) + ':' + formattedTime.slice(2);
        }

        // Crear una fecha completa en formato ISO (YYYY-MM-HH:MM)
        const isoDateString = `${currentYear}-${datePart.split('/').reverse().join('-')}T${formattedTime}`;
        const date = new Date(isoDateString);

        if (isNaN(date.getTime())) {
            return "Fecha inválida";
        }

        // Opciones para formatear la fecha
        const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false };
        return date.toLocaleDateString('es-ES', options);
    }

    // Función para agregar una nueva tarea
    function addTask(event) {
        event.preventDefault(); // Evita que el formulario se recargue

        const taskText = taskInput.value.trim(); // Obtiene el texto de la tarea
        const taskDateValue = taskDate.value.trim(); // Obtiene la fecha

        if (taskText !== "" && taskDateValue !== "") { // Verifica que ambos campos estén llenos
            // Crear un nuevo elemento <li> para la tarea
            const li = document.createElement('li');

            // Crear un checkbox para marcar la tarea como completada
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.addEventListener('change', function () {
                li.classList.toggle('completed'); // Tachar la tarea cuando se marque
            });

            // Crear un contenedor para el texto y la fecha
            const taskContent = document.createElement('div');
            taskContent.classList.add('task-content');

            // Crear un <span> para el texto de la tarea
            const span = document.createElement('span');
            span.textContent = taskText;

            // Crear un <div> para la fecha formateada
            const dateDiv = document.createElement('div');
            dateDiv.classList.add('task-date');
            dateDiv.textContent = formatDate(taskDateValue);

            // Agregar el texto y la fecha al contenedor
            taskContent.appendChild(span);
            taskContent.appendChild(dateDiv);

            // Crear un botón para eliminar la tarea
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.title = "Eliminar"; // Tooltip
            deleteBtn.textContent = '×'; 
            deleteBtn.addEventListener('click', function () {
                taskList.removeChild(li); 
            });

            // Agregar el checkbox, el contenido y el botón al <li>
            li.appendChild(checkbox);
            li.appendChild(taskContent);
            li.appendChild(deleteBtn);

            // Agregar la tarea a la lista
            taskList.appendChild(li);

            // Limpiar los campos de entrada
            taskInput.value = "";
            taskDate.value = "";
        } else {
            alert("Por favor, ingresa una tarea y una fecha."); // Mensaje de error si falta algún campo
        }
    }

    // Escuchar el evento "submit" del formulario
    taskForm.addEventListener('submit', addTask);
});
