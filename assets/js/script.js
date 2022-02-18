// Taskinator

// we are assigning the element with id task-form to this variable 'formEl'
var formEl = document.querySelector("#task-form");

// we create DOM element object for <ul>, referencing its id for specificity
var tasksToDoEl = document.querySelector ("#tasks-to-do");

/* We will make a function called createTaskHandler that will:
assign <li> as a DOM element object, 
give the <li> a class name so its styling will come through,
dictate the text within the <li>,
attach the <li> as a child element to the <ul> */


// we put 'event' as a parameter so we can stop the browser's default action
var createTaskHandler = function (event) {
    // this will prevent default action of browser refreshing page on submit
    event.preventDefault();

    var listItemEl = document.createElement ("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
};


// we are passing two arguments to the addEventListener function
// first function is listening for a 'submit' to the form
// second function is the one we created, createTaskHandler
formEl.addEventListener("submit", createTaskHandler);
