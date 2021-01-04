$(document).ready(function () {

    const cities = ["main", "akron", "minneapolis", "louisville"];
    // Page Load
    // Only the content in the Main section should display when the page is loaded.
    $("#akronInfoDiv").hide()
    $("#minneapolisInfoDiv").hide()
    $("#louisvilleInfoDiv").hide()

    // Navigation Button Behavior
    // When the Akron button is clicked, only the content in the Akron section should display; the weather information for Akron should be hidden initially.

    // When the Minneapolis button is clicked, only the content in the Minneapolis section should display; the weather information for Minneapolis should be hidden initially.

    // When the Louisville button is clicked, only the content in the Louisville section should display; the weather information for Louisville should be hidden initially.
    for (var i = 1 ; i < cities.length ; i++)  {
        let city = cities[i]
        $("#" + city + "Button").on("click", function () {
            console.log(city)
            $("#" + cities[0] + "InfoDiv").hide()
            $("#" + cities[1] + "InfoDiv").hide()
            $("#" + cities[2] + "InfoDiv").hide()
            $("#" + cities[3] + "InfoDiv").hide()
            $("#" + city + "InfoDiv").show()
            if(city != "main") {
                $("#" + city + "Weather").hide()
            }
        })
    }

    // Show/Hide Weather Behavior
    // When the Show/Hide Weather button is clicked, the page should display the associated weather information if it was hidden or hide the associated weather information if it was showing. It should default to hidden.

    for (var i = 0 ; i < cities.length ; i++)  {
        let city = cities[i]
        $("#" + city + "WeatherButton").on("click", function () {
            if($("#" + city + "Weather").is(':hidden')) {
                $("#" + city + "Weather").show()
                $("#" + city + "WeatherButton").text("Hide Weather")
            }
            else {
                $("#" + city + "Weather").hide()
                $("#" + city + "WeatherButton").text("Show Weather")
            }
        })
    }

    // Table Row Behavior
    // The background color of any table row should change to “WhiteSmoke” when the mouse pointer is hovering over the row.
    // The background color of the row should return to white when the mouse pointer is no longer hovering over the row.
    // This applies to all rows in all tables except the first (header) row in a given table. The first (header) row in any table should not change appearance when the mouse pointer hovers over it.
    $("tr").not(":first").hover (
        function() {
            $(this).css({"background-color" : "whitesmoke"})
        }, function () {
            $(this).css({"background-color" : "white"})
        }
    ) 
        
});