$(document)
	.ready(function() {
		$('#search-btn').click(function() {
			searchForMovie();
		});
	})
	.keypress(function(e) {
    if(e.which == 13) {
      searchForMovie();
    }
	})
;

function searchForMovie() {
	$('#search-box').focus();
	var btn = $('#search-btn')
	btn.button('loading');
	$.get("http://www.omdbapi.com/?t=" + $('#search-box').val()).done(function(data) {
    setTimeout(function() {
    	btn.button('reset')
    }, 500);
    $('#results, #error-alert').hide();
		window.parsed = JSON.parse(data);
		if (parsed.Response == "True") {
			loadResults(parsed);
			$('#results').show();
		} else {
			setErrorMessage(parsed.Error);
			$('#error-alert').show();
		}
	})
}

function loadResults(parsed) {
	$('#title-year-rating').text(parsed.Title + " (" + parsed.Year + ") [" + parsed.Rated + "]");
	$('.poster').attr('src', parsed.Poster);
	$('.imdbID').attr('href', "http://www.imdb.com/title/" + parsed.imdbID);
	$('#plot').text(parsed.Plot);
	$('#awards').text(parsed.Awards);
	$('#mc-rating').text(parsed.Metascore);
	$('#imdbRating').text(parsed.imdbRating);
	$('#imdbVotes').text(parsed.imdbVotes);
	$('#genre').text(parsed.Genre);
	$('#runtime').text(parsed.Runtime);
	$('#language').text(parsed.Language);
	$('#country').text(parsed.Country);
	$('#actors').text(parsed.Actors);
	$('#director').text(parsed.Director);
	$('#writer').text(parsed.Writer);
}

function setErrorMessage(message) {
	var imdbNoTextMessage = "Object reference not set to an instance of an object."
	if (message = imdbNoTextMessage) {
		message = "Forgetting something? :)"
	}
	$('#error-message').text(message);
}
