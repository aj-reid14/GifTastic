let topics = ["animals", "insects", "cars", "colors"];
let API_Key = "ty0kxw0Ygk6F1hpxthRk0qLTJfikt2D7";
let search;
let queryURL;

$(document).ready(function()
{
    for (let i = 0; i < topics.length; i++) 
    {
        // Create a new button
        let newTopicButton = $("<button>");

        // Assign a class, value (the topic being searched), and text for the button
        newTopicButton.addClass("topic-button");
        newTopicButton.val(topics[i]);
        newTopicButton.text(topics[i].charAt(0).toUpperCase() + topics[i].substring(1));

        // Add the button to appropriate div
        $("#button-row").append(newTopicButton);
    }

   ConfigureButtons();

})

// Button Logic is done here
function ConfigureButtons()
{
    $(".topic-button").click(function () 
    {
        // 'search' will be used to send the Giphy API request, it must be set 
        // to the topic being searched, which is in the button's 'value' attribute
        search = $(this).val();
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + API_Key + "&limit=10";

        console.log(queryURL);

        $.ajax({
            URL: queryURL,
            method: "GET"
        }).then(function (response) 
        {
            console.log(response);            
        })
    })
}