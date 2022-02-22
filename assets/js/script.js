// Taskinator

// we are assigning the element with id task-form to this variable 'formEl'
var formEl = document.querySelector("#task-form");

// we create DOM element object for <ul>, referencing its id for specificity
var tasksToDoEl = document.querySelector ("#tasks-to-do");


// this function collects data and sends it to another function
// we put 'event' as a parameter so we can stop the browser's default action
var taskFormHandler = function (event) {
    // this will prevent default action of browser refreshing page on submit
    event.preventDefault();

    /* the below expression is selecting for the <input> element with 
    attribute name = 'task-name'. We add '.value' to the end of our 
    querySelector to retrieve the value that we input for the object */
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // this expression does the same except for task-type value under <select>
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    
    // this expression will ensure inputs are not blank
    if (!taskNameInput || !taskTypeInput) {
        alert("Fields cannot be empty!");
        return false;
    }

    // this expression clears form fields
    formEl.reset();


    // package data as object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send object as an argument to other function
    createTaskEl(taskDataObj);


};

// this function will focus on adding data to new list item element
var createTaskEl = function (taskDataObj) {
    
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
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
    
    // adds task info div to <li> element
    listItemEl.appendChild(taskInfoEl);
     
    // adds list item to <ul> element
    tasksToDoEl.appendChild(listItemEl);
};


// we are passing two arguments to the addEventListener function
// first function is listening for a 'submit' to the form
// second function is the one we created, taskFormHandler
formEl.addEventListener("submit", taskFormHandler);
