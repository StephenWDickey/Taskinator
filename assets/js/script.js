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

    /* the below expression is selecting for the <input> element with 
    attribute name = 'task-name'. We add '.value' to the end of our 
    querySelector to retrieve the value that we input for the object */
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // this expression does the same except for task-type value under <select>
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    /* these expressions create a div with task name and type, add task name
    and type to a <li> element, then add that <li> element to a <ul> element */
    
    // create li element, give it a class name
    var listItemEl = document.createElement ("li");
    listItemEl.className = "task-item";
    // create div to hold task info
    var taskInfoEl = document.createElement("div");
    // give div a class name
    taskInfoEl.className = "task-info";
    // give div header info and task type info
    // we use .innerHTML because we are adding more html elements
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class = 'task-type'>" + taskTypeInput + "</span>";
    // adds task info div to <li> element
    listItemEl.appendChild(taskInfoEl);
    // adds list item to <ul> element
    tasksToDoEl.appendChild(listItemEl);

};


// we are passing two arguments to the addEventListener function
// first function is listening for a 'submit' to the form
// second function is the one we created, createTaskHandler
formEl.addEventListener("submit", createTaskHandler);
