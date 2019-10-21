let topics = ["Animals", "Insects", "Cars", "Colors"];

$(document).ready(function()
{

    for (let i = 0; i < topics.length; i++)
    {        
        let newTopicButton = $("<button>");
        newTopicButton.text(topics[i]);
        $("#button-row").append(newTopicButton);
    }

})