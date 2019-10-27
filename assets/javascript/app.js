let topics = ["animals", "insects", "cars", "colors"];
let API_Key = "YQR0rXVKfpOTFjG8Ys7aiHbGlKxYVa40";
let search;
let queryURL;
let state_still = "still";
let state_animated = "animated";

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
        $("#button-area").append(newTopicButton);
    }

    // Setup Click Events for Buttons
    ConfigureButtons();

    // Setup Click Events for GIFs
    ConfigureGIFS();

});



// Button Logic is done here
function ConfigureButtons()
{
    // Topic Buttons
    $(document.body).on("click", ".topic-button", function () 
    {
        // 'search' will be used to send the Giphy API request, it must be set 
        // to the topic being searched, which is in the button's 'value' attribute
        search = $(this).val();
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + API_Key + "&limit=10";

        // Create & Send the API Request, & Display GIFs
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response)
        {
            DisplayGIFS(response);
        })
    })

    // Input Button (for creating new buttons)
    $("#input-button").click(function()
    {
        // Create & initialize a new button element, and add value to topic array
        let newTopicButton = $("<button>");
        let newTopic = ($("#input-box").val().trim()).toLowerCase();
        topics.push(newTopic);

        newTopicButton.addClass("topic-button");
        newTopicButton.val(newTopic);
        newTopicButton.text(newTopic.charAt(0).toUpperCase() + newTopic.substring(1));
        $("#button-area").append(newTopicButton);

        // Clear input box after a new button is created
        $("#input-box").val("");
    })
}

// GIF-Clicking Logic is done here
function ConfigureGIFS()
{
    $(document.body).on("click", ".gif", function()
    {
        // Save required attributes to a variable
        let state = $(this).attr("state");
        let stillGIF = $(this).attr("gif-still");
        let animatedGIF = $(this).attr("gif-animated");

        // Depending on the current GIF state, update the GIF & new state accordingly
        switch (state) {
            case "still":
                $(this).attr("src", animatedGIF);
                $(this).attr("state", state_animated);
                break;

            case "animated":
                $(this).attr("src", stillGIF);
                $(this).attr("state", state_still);
                break;
        }
    })
}

// Display the 10 'Giphy' results from API Request
function DisplayGIFS(giphyResponse)
{
    // Clear any GIFs/messages in display area
    $("#gif-area").html("");

    // If the request returned no results, display a message
    if (giphyResponse.data.length === 0) 
    {
        let emptyMSG = $("<h1>").text("No GIFs found!");
        $("#gif-area").append(emptyMSG);
    }
    else 
    {
        // - Loop through the results of the request
        // - Create a new <img> for each GIF
        // - Initialize each GIF with proper attributes and add to display
        // * Each GIF should initially load into 'still' state
        for (let i = 0; i < giphyResponse.data.length; i++) {
            let gifStill = giphyResponse.data[i].images.fixed_height_still.url;
            let gifAnimated = giphyResponse.data[i].images.fixed_height.url;

            let newGIf = $("<img>");
            newGIf.addClass("gif");
            newGIf.attr("src", gifStill);
            newGIf.attr("gif-still", gifStill);
            newGIf.attr("gif-animated", gifAnimated);
            newGIf.attr("state", state_still);

            $("#gif-area").append(newGIf);
        }
    }
}