function hello() // Simple test/greeting function
{
    console.log("Hello World"); // Prints to the browser console
}

// An example of changing the logic exec

function saveTask() { // Runs when the Save button is clicked
    console.log("Saving Task");

    // get the values from the form
    const title  = $("#txtTitle").val();       // Grabs the task title input
    const desc   = $("#txtDescription").val(); // Grabs the description input
    const color  = $("#selColor").val();       // Grabs the selected color
    const date   = $("#selDate").val();        // Grabs the selected due date
    const status = $("#selStatus").val();      // Grabs the selected status
    const budget = $("#numBudget").val();      // Grabs the budget number input

    // create a new task object
    const task = new Task(title, desc, color, date, status, budget); // Creates a Task instance with the form values
    console.log(task);         // Logs the new task object to the console
    displayTask(task);         // Sends the task to be rendered on screen
}

function displayTask(task) { // Builds and injects the task card into the page
    let syntax = `
    <div class="task" style="border-color:${task.color}"> <!-- Task card, border color from user selection -->
      <div class="info">
        <h4>${task.title}</h4>  <!-- Task title -->
        <p>${task.desc}</p>     <!-- Task description -->
      </div>
      <label class="status">${task.status}</label>  <!-- Displays current status badge -->
      <div class="date-budget">
        <label>Due: ${task.date}</label>       <!-- Due date label -->
        <label>Budget: $${task.budget}</label> <!-- Budget label -->
      </div>
    </div>`;

    // Inject the new HTML into the DOM Tree
    $(".list").append(syntax); // Appends the task card to the list container
}

// define the URL of the server
const API = "https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks" // Base API endpoint for all task requests

function loadTasks() { // Fetches all existing tasks from the server on page load
    $.ajax({
        type: "GET",   // HTTP method - READ
        url: API,      // Points to the tasks endpoint
        success: function(data) {          // Runs if the request succeeds
            console.log("Data received", data); // Logs the returned task data
        },
        error: function(error) {           // Runs if the request fails
            console.log("Error", error);   // Logs the error details
        }
    })
}

function init() // Entry point — runs after the page fully loads
{
    hello();                           // Calls the greeting test function
    console.log("Hello this is the DOM");
    // hook events
    $("#btnSave").click(saveTask);     // Binds the Save button to the saveTask function
    // Load data from the server
    loadTasks();                       // Fetches tasks from the API on startup
}

// Forces logic to run after HTML and CSS have fully loaded
window.onload = init; // Assigns init as the callback for when the page is ready