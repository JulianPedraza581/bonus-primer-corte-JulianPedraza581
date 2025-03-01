document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskDeadline = document.getElementById('taskDeadline');
    const taskList = document.getElementById('taskList');

    // Función para agregar una nueva tarea
    function addTask(event) {
        event.preventDefault(); // Evita que el formulario se recargue

        const taskText = taskInput.value.trim(); // Obtiene el texto de la tarea
        const taskDateValue = taskDate.value.trim(); // Obtiene la fecha
        const taskDeadlineValue = taskDeadline.value.trim(); // Obtiene el plazo

        if (taskText !== "" && taskDateValue !== "" && taskDeadlineValue !== "") { // Verifica que todos los campos estén llenos
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
            dateDiv.textContent = taskDateValue;

            // Crear un <div> para el plazo
            const deadlineDiv = document.createElement('div');
            deadlineDiv.classList.add('task-deadline');
            deadlineDiv.textContent = taskDeadlineValue;

            // Agregar el texto, la fecha y el plazo al contenedor
            taskContent.appendChild(span);
            taskContent.appendChild(dateDiv);

            // Crear un botón para eliminar la tarea
            const deleteBtn = document.createElement('button');
            deleteBtn.type = 'button';
            deleteBtn.classList.add('deleteBtn');
            deleteBtn.textContent = '×';
            deleteBtn.addEventListener('click', function () {
                taskList.removeChild(li); // Eliminar la tarea de la lista
            });

            // Agregar el checkbox, el contenido, el plazo y el botón al <li>
            li.appendChild(checkbox);
            li.appendChild(taskContent);
            li.appendChild(deadlineDiv); // Plazo a la izquierda del botón de eliminar
            li.appendChild(deleteBtn);

            // Agregar la tarea a la lista
            taskList.appendChild(li);

            // Limpiar los campos de entrada
            taskInput.value = "";
            taskDate.value = "";
            taskDeadline.value = ""; 
        } else {
            alert("Por favor, ingresa una tarea, una fecha y la importancia."); // Mensaje de error si falta algún campo
        }
    }

    // Escuchar el evento "submit" del formulario
    taskForm.addEventListener('submit', addTask);
});
