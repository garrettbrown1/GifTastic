//Create Array of Characters// 

var gotArray = ["Daenerys Targaryen","Jon Snow", "Gregor Clegane", "Cersei Lannister", "Tyrion Lannister", "Arya Stark", "Sansa Stark", "Khal Drogo", "Joffrey Baratheon", "Eddard Stark", "Sandor Clegane", "Petyr Baelish", "Ramsay Bolton", "Margaery Tyrell", "Jaime Lannister", "Bronn", "Lord Varys", "Tyene Sand",];

//Create buttons for characters by Looping and generating for each character
$(document).ready(function () {

    // Empty all buttons before user clicks the button
    renderButton();
    function renderButton() {
        $("#got-buttons").empty();
    }

    // For loop to run through the Array
    for (var i = 0; i < gotArray.length; i++) {

        // In this case, the "this" keyword refers to the button that was clicked

        var newButton = $("<button>");
        newButton.addClass("itembutton");
        newButton.addClass("btn btn-primary");
        newButton.text(gotArray[i]);
        newButton.attr("data-name", gotArray[i]);
        $("#got-buttons").append(newButton);

    }

})


$("#addbutton").on("click", function (event) {

    event.preventDefault();
    var addedData = $("#userinput").val().trim();
    if (addedData != "") {
        gotArray.push(addedData);
        renderButton();
        $("#userinput").val(" ");
    }

});

$(document).on("click", ".itembutton", displayInfo);

//API Key (stopped here 9/1/2018)
function displayInfo() {
    var itemName = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?&q=" + itemName + "&api_key=IYyyPOnKYWeVsn3IOfO0DDINIeRzaE4C&limit=10";
    $("#mainimages").empty();

    //Preforming Ajax Call
    $.ajax({
        url: queryURL,
        method: "Get",
    }).then(function (response) {
        console.log(response);

        var results = response.data;

        // For Loop through API call

        for (var i = 0; i < results.length; i++) {

            var dataImage = $("<img>");
            dataImage.attr("src", results[i].images.fixed_height_still.url);
            dataImage.attr("data-still", results[i].images.fixed_height_still.url);
            dataImage.attr("data-animate", results[i].images.fixed_height.url);
            dataImage.addClass("gif");
            dataImage.attr("data-state", "still");

            // Added Ratings

            var newItemdiv = $('<div class="newItem">');
            var gifRating = results[i].rating;
            var divRating = $("<p>").text("Rating: " + gifRating);

            newItemdiv.append(divRating);
            newItemdiv.append(dataImage);

            $("#mainimages").prepend(newItemdiv);

        }
    });

}

$("#mainimages").on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }

    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

