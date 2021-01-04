$(document).ready( function () {
    validateSearch();
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
                    row += '<td>' + title + '</td>';
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

function showEditForm (id) {
    $("#editForm").show()
    $("#main").hide()
}

function validateSearch() {
    $("#line").html("")
    let $search = $("#searchTerm").val()
    let $category = $("#categorySelect").val()
    $("#searchBtn").on("click", function () {
        console.log($search, $category)
        if ($category == "default" || $search == "") {
            $("#line").html(`<div class="alert alert-danger" role="alert">
            Incorrect search inputs. You must select a category AND enter a search term.
          </div>`)
        }
        // else {}
    })
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
        });
    }
}