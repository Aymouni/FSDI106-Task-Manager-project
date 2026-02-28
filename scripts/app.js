function hello()
{
    console.log("Hello World");
}

// An example of changing the logic exec

function init ()
{
    hello();
    console.log("Hello this is the DOM");
}

//Force to my logic to run the html and css first - and when they finish the logic
// will be executed
window.onload = init;