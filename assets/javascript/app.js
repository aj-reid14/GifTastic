let topics = ["animals", "insects", "cars", "colors"];
let API_Key = "ty0kxw0Ygk6F1hpxthRk0qLTJfikt2D7";
let search;
let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + "" + "&api_key=" + API_Key + "&limit=10";

$(document).ready(function()
{
    for (let i = 0; i < topics.length; i++) 
    {
        let newTopicButton = $("<button>");
        newTopicButton.addClass("topic-button");
        newTopicButton.val(topics[i]);
        newTopicButton.text(topics[i].charAt(0).toUpperCase() + topics[i].substring(1));
        $("#button-row").append(newTopicButton);
    }

   ConfigureButtons();

})

function ConfigureButtons()
{
    $(".topic-button").click(function () 
    {
        search = $(this).val();
        queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + API_Key + "&limit=10";

        $.ajax({
            URL: queryURL,
            method: "GET"
        }).then(function (response) 
        {
            console.log(response);
        })
    })
}