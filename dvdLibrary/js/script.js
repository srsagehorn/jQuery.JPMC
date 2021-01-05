$(document).ready( function () {
    $("#edit").hide();
    $("#movieInfo").hide()
    loadDvds();
})

function loadDvds() {
    clearTable();
    var contentRows = $('#contentRows');
    
    $.ajax({
        type: 'GET',
        url: 'https://tsg-dvds.herokuapp.com/dvds/',
        success: function(dvdArray) {
            $.each(dvdArray, function(index, dvd){
                var title = dvd.title;
                var date = dvd.releaseYear
                var director = dvd.director;
                var rating = dvd.rating;
                var id = dvd.id;
                
                var row = '<tr>';
                    row += '<td class = "editDelete" onclick = "showMovie(' + id + ')">' + title + '</td>';
                    row += '<td>' + date + '</td>';
                    row += '<td>' + director + '</td>';
                    row += '<td>' + rating + '</td>';
                    row += '<td><button class = "editDelete" type="button" onclick="showEditForm(' + id + ')">Edit</button>|<button class = "editDelete" type="button" onclick="deleteDvd(' + id + ')">Delete</button></td>';
                    row += '</tr>';
                
                    contentRows.append(row);
            })
        },
        error: function() {
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
        }
    }); 
}

function showEditForm(id) {
    $("#edit").show()
    $("#main").hide()
    $("#updateButton").text("Update")
    $.ajax({
        type: 'GET',
        url: 'https://tsg-dvds.herokuapp.com/dvd/' + id,
        success: function(dvd) {
            $("#titleEdit").append(dvd.title);
            $("#editTitle").val(dvd.title);
            $("#editYear").val(dvd.releaseYear);
            $("#editDirector").val(dvd.director);
            $("#editRating").val(dvd.rating);
            $("#editNotes").val(dvd.notes);
            $("#updateButton").attr("onclick", "update(" + id + ")")
        }
    });
}

function showCreator() {
    $("#edit").show()
    $("#main").hide()
    $("#titleEdit").text("Create a new DVD entry: ")
    $("#editTitle").val("")
    $("#editYear").val("")
    $("#editDirector").val("")
    $("#editRating").val("")
    $("#editNotes").val("")
    $("#updateButton").text("Create")
    $("#updateButton").attr("onclick", "create()")
}

function hideEditForm() {
    $(".line").html("")
    $("#edit").hide()
    $("#main").show()
}

function validateSearch() {
    $(".line").html("")
    let $search = $("#searchTerm").val()
    let $category = $("#categorySelect").val()
    console.log($search, $category)
    if ($category === "default" || $search === "") {
        $(".line").html(`<div class="alert alert-danger" role="alert">
        Incorrect search inputs. You must select a category AND enter a search term.
        </div>`)
    }
        // else {}
}

function clearTable() {
    $("#contentRows").html("")
}

function deleteDvd(dvdId) {
    var sure = confirm ("Are you sure you would like to delete this DVD?")
    if (sure == true) {
        $.ajax({
            type: 'DELETE',
            url: 'https://tsg-dvds.herokuapp.com/dvd/' + dvdId,
            success: function() {
                loadDvds();
            }
        })
    }
}

function validate() {
    $(".line").html("")
    let $title = $("#editTitle").val()
    let $year = $("#editYear").val()
    let $dir = $("#editDirector").val()
    let $rate = $("#editRating").val()
    let errors = 0
    console.log($year.length)
    if ($title == "" || $year == "" || $rate == "" || $dir == "") {
        $(".line").html(`<div class="alert alert-danger" role="alert">
            Incorrect search inputs. You cannot leave anything blank (Except notes)
          </div>`)
          errors++
    }
    if ( isNaN($year)|| $year.length != 4) {
        $(".line").html(`<div class="alert alert-danger" role="alert">
            The release date must be a four digit number
          </div>`)
          errors++
    }

    if (errors == 0) {
        return true
    }
    else { return false }
}

function update(id) {
    if (validate()) {
        $.ajax({
            type: 'PUT',
            url: 'https://tsg-dvds.herokuapp.com/dvd/' + id,
            data: JSON.stringify({
                title: $('#editTitle').val(),
                releaseYear: $('#editYear').val(),
                director: $('#editDirector').val(),
                rating: $('#editRating').val(),
                notes: $('#editNotes').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function () {
                loadDvds()
                hideEditForm()
            },
            error: function () {
                console.log("Error updating database")
            }
        })
    }
}

function create() {
    if (validate()) {
        $.ajax({
            type: 'POST',
            url: 'https://tsg-dvds.herokuapp.com/dvd/',
            data: JSON.stringify({
                title: $('#editTitle').val(),
                releaseYear: $('#editYear').val(),
                director: $('#editDirector').val(),
                rating: $('#editRating').val(),
                notes: $('#editNotes').val()
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            success: function () {
                loadDvds()
                hideEditForm()
            },
            error: function () {
                console.log("Error updating database")
            }
        })
    }
}

function showMovie(id) {
    $("#movieInfo").show()
    $("#main").hide()
    $.ajax({
        type: 'GET',
        url: 'https://tsg-dvds.herokuapp.com/dvd/' + id,
        success: function(dvd) {
            $("#titleMovie").append(dvd.title);
            $("#movieTitle").text(dvd.title);
            $("#movieYear").text(dvd.releaseYear);
            $("#movieDirector").text(dvd.director);
            $("#movieRating").text(dvd.rating);
            $("#movieNotes").text(dvd.notes);
            $("#updateButton").attr("onclick", "update(" + id + ")")
        }
    });
}

function hideMovieInfo () {
    $("#movieInfo").hide()
    $("#main").show()
}