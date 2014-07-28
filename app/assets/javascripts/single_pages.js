$(document).ready(function() {
	var queryParam = getParameterByName("q");
	if (queryParam != null) {
		searchForMovie(queryParam);
		var queryObj = { query: queryParam }
		history.replaceState(queryObj, "", "?q="+queryParam)
	}
	
	$('#search-btn').click(function() {
		var query = $('#search-box').val();
		searchAndPushState(query);
	});


	window.addEventListener("popstate", function(e) {
		var state = e.state;
		if (state.query == undefined) {
		} else {
			searchForMovie(state.query);
			$('#search-box').val(state.query);
		}
	});
});

$(document).keypress(function(e) {
  if(e.which == 13) {
		var query = $('#search-box').val();
		searchAndPushState(query);
  }
});


function searchAndPushState(query) {
	searchForMovie(query);
	var queryObj = { query: query }
	history.pushState(queryObj, "", "?q="+query)
}

function searchForMovie(query) {
  $('#results, #error-alert').hide();
	$('#search-box').focus();
	var btn = $('#search-btn')
	btn.button('loading');
	$.get("http://www.omdbapi.com/?t=" + query).done(function(data) {
    btn.button('reset')
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

function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
