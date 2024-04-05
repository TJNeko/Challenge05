// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));


// Todo: create a function to generate a unique task id
function generateTaskId() {
    nextId++;
    localStorage.setItem('nextId', nextId);
    return nextId;
}
const taskId = generateTaskId();
console.log(taskId);
// Todo: create a function to create a task card
function createTaskCard(task) {
    
    //create div with task details
    let card = $('<div>').addClass('card bg-light mb-3 draggable').attr('id', 'task-' + task.id);
    let cardBody = $('<div>').addClass('card-body');
    cardBody.append($('<h5>').addClass('card-title').text(task.name));
    cardBody.append($('<p>').addClass('card-text').text(task.description));
    cardBody.append($('<p>').addClass('card-text').text(task.date));

    let deleteButton = $('<button>').addClass('btn btn-danger delete-btn').text('Delete');
    cardBody.append(deleteButton);
    card.append(cardBody);

    card.draggable({
        revert: true
    });
    return card;

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {


}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    console.log(event);
// get the input values
    let name = $('#taskName').val();
    let date = $('#date').val();
    let description = $('#description').val();

// Create task object
    let task = {
        id: generateTaskId(),
        name: name,
        date: date,
        description: description,
        status: 'to-do'
};

// save to local storage
    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));

// create task card
    let lane = $('#todo-cards');
    lane.append(createTaskCard(task));
// reset form
    $('#taskName').val('');
    $('#date').val('');
    $('#description').val('');
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    let taskId = $(this).closest('.card').attr('id').split('-')[1];
    let taskIndex = taskList.findIndex(task => task.id === parseInt(taskId));
    
    if (taskIndex !== -1) {
        taskList.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        $(this).closest('.card').remove();
    } else {
        console.error(`Task with ID ${taskId} not found.`);
    }
}




// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    $(document).on('click', '.delete-btn', handleDeleteTask);

    const submitBtn = $('#submit');
    submitBtn.on('click', handleAddTask)
    
    
    $( "#date" ).datepicker({
         changeDay: true,
         changeMonth: true,
         changeYear: true,
    });
    
    // prepare drop stuff here
    
    
    
});
