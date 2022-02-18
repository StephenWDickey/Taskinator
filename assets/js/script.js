// Taskinator

// assigning button object representation to a variable
var buttonEl = document.querySelector("#save-task");

// we create DOM element object for <ul>, referencing its id for specificity
var tasksToDoEl = document.querySelector ("#tasks-to-do");

/* We will make a function called createTaskHandler that will:
assign <li> as a DOM element object, 
give the <li> a class name so its styling will come through,
dictate the text within the <li>,
attach the <li> as a child element to the <ul> */

var createTaskHandler = function () {
    var listItemEl = document.createElement ("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};


// we are passing two arguments to the addEventListener function
// first function is listening for a click
// second function is the one we created, createTaskHandler
buttonEl.addEventListener("click", createTaskHandler);
