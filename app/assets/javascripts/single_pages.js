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
  $('.results, #error-alert').hide();
	$('#search-box').focus();
	var btn = $('#search-btn')
	btn.button('loading');
	$.get("http://www.omdbapi.com/?t=" + query).done(function(data) {
    btn.button('reset')
		window.parsed = JSON.parse(data);
		if (parsed.Response == "True") {
			loadResults(parsed);
			$('.results').show();
		} else {
			setErrorMessage(parsed.Error);
			$('#error-alert').show();
		}
	})
}

function loadResults(parsed) {
	window.theSource = $("#hb-results").html();  
	window.theTemplate = Handlebars.compile(theSource);  
	window.theData = parsed;
	 $(document.body).append(theTemplate(theData));
	if ($('.results').length == 2) {
		$('.results:first').remove();
		$('.results').show();
	}
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
