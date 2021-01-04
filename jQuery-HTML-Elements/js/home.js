$(document).ready(function () {
    // Center all H1 elements.
    $("h1").css({"text-align" : "center"})
    // Center all H2 elements.
    $("h2").css({"text-align" : "center"})
    // Replace the class that is on the element containing the text "Team Up!" with the class page-header.
    $("h1").removeClass("myBannerHeading")
    $("h1").addClass("page-header")
    // Change the text of "The Squad" to "Yellow Team".
    $("#yellowHeading").text("Yellow Team")
    // Change the background color for each team list to match the name of the team.
    $("#orangeHeading").css({"background-color" : "orange"})
    $("#yellowHeading").css({"background-color" : "yellow"})
    $("#blueHeading").css({"background-color" : "blue"})
    $("#redHeading").css({"background-color" : "red"})
    // Add Joseph Banks and Simon Jones to the Yellow Team list.
    $("#yellowTeamList").html("<li>Joseph Banks</li><li>Simon Jones</li>")
    // Hide the element containing the text "Hide Me!!!"
    $("#oops").hide()
    // Remove the element containing the text "Bogus Contact Info" from the footer.
    $("#footerPlaceholder").remove()
    // Add a paragraph element containing your name and email to the footer. The text must be in Courier font and be 24 pixels in height.
    $("footer").html("<p>Shannon Sagehorn </br> srsagehorn@gmail.com</p>")
    $("footer").css({"text-align" : "center", "font-family" : "Courier New, monospace", "font-size" : "24px"})
    
    
    
});