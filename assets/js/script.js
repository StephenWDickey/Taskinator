// Taskinator

// we will create an array of objects so data can be stored in localStorage
var tasks = [];


// adds reference to main element
var pageContentEl = document.querySelector("#page-content");

// this will make our tasks have a counter
var taskIdCounter = 0;

// we are assigning the element with id task-form to this variable 'formEl'
var formEl = document.querySelector("#task-form");

// we create DOM element object for <ul>, referencing its id for specificity
var tasksToDoEl = document.querySelector ("#tasks-to-do");

var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");



/////////////////////////////////////////////////////////////////////////

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

    var isEdit = formEl.hasAttribute("data-task-id");

    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
        // package data as object
        var taskDataObj = {
            status: "to do",
            name: taskNameInput,
            type: taskTypeInput
        };
    }
    
    

    // send object as an argument to other function
    createTaskEl(taskDataObj);


};

/////////////////////////////////////////////////////////////////////

// this function will focus on adding data to new list item element
var createTaskEl = function (taskDataObj) {
    
    /* these expressions create a div with task name and type, add task name
    and type to a <li> element, then add that <li> element to a <ul> element */
    
    // create li element, give it a class name
    var listItemEl = document.createElement ("li");
    listItemEl.className = "task-item";

    // adds task id as custom attribute, applies counter
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info
    var taskInfoEl = document.createElement("div");
    // give div a class name
    taskInfoEl.className = "task-info";
    
    // give div header info and task type info
    // we use .innerHTML because we are adding more html elements
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class = 'task-type'>" + taskDataObj.type + "</span>";
    
    // adds task info div to <li> element
    listItemEl.appendChild(taskInfoEl);
    
    // creates buttons based on task id counter
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // adds list item to <ul> element
    tasksToDoEl.appendChild(listItemEl);

    // these expressions assign an id to taskDataObj
    taskDataObj.id = taskIdCounter;
    // push adds content in parentheses to the array
    tasks.push(taskDataObj);

    // increases counter by 1 for each task
    taskIdCounter++;
};



///////////////////////////////////////////////////////////////////

var createTaskActions = function(taskId) {

    // creates division to hold buttons/actions within tasks
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // creates edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    // adds edit button
    actionContainerEl.appendChild(editButtonEl);

    // creates delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    // adds delete button
    actionContainerEl.appendChild(deleteButtonEl);

    // creates dropdown element
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    // adds dropdown element 
    actionContainerEl.appendChild(statusSelectEl);

    // creates array for options
    var statusChoices = ["To Do", "In Progress", "Completed"];

    // for loop will make create option elements dynamically for each task
    for (var i=0; i < statusChoices.length; i++) {
        // creates option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
        // options are appended to dropdown element
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;
};

/////////////////////////////////////////////////////////////

var completeEditTask = function(taskName, taskType, taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    };

    alert("Task updated.");

    formEl.removeAttribute("data-task-id");

    formEl.querySelector("#save-task").textContent = "Add Task";

};


//////////////////////////////////////////////////////////

// adds new function for when button is clicked
var taskButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".edit-btn")) {
        // get element's task id
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

///////////////////////////////////////////////////////////////

var taskStatusChangeHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    var statusValue = event.target.value.toLowerCase();

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if(statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
    // update tasks in tasks array
    for (var i=0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].status = statusValue;
        }
    };
};


///////////////////////////////////////////////////////////

var editTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    formEl.setAttribute("data-task-id", taskId);
    formEl.querySelector("#save-task").textContent = "Save Task";

};

////////////////////////////////////////////////////////////

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

    // creates new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    };

    // reassign tasks array to be same as updatedTaskArr
    tasks = updatedTaskArr;
};





////////////////////////////////////////////////////////////////////

// we are passing two arguments to the addEventListener function
// first function is listening for a 'submit' to the form
// second function is the one we created, taskFormHandler
formEl.addEventListener("submit", taskFormHandler);

//////////////////////////////////////////////////////////////

// event listener for <main> if button is clicked
pageContentEl.addEventListener("click", taskButtonHandler);



////////////////////////////////////////////////////////////////

pageContentEl.addEventListener("change", taskStatusChangeHandler);
