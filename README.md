#Javascript Single Page App

##Features

* Simple
* SPA (Single Page App)
* Incorporated Bootstrap
* RWD (Responsive Web Design)
* Pushed to Heroku (http://gp-ga-spa.herokuapp.com/)
* Query string parameters (/?q=planet   will return Rise of the Planet of the Apes)
* Push state (search for "planet" then "top gun" then click back -- will hit server again for "planet")
* Use slim instead of ERb
* Use Handlebars.js as templating engine

##Overview

Use Javascript to create a single page app that searches and displays movie info.

Using the API from http://www.omdbapi.com/, construct a single-page app that will have a search input, movie search results, and movie detail display.

This assignment is similar to what we introduce to students, and it reflects a real-life scenario in class.

##Requirements

- Use JavaScript to solve this problem. If you would like, you can use a JavaScript library like jQuery or an MVC such as Backbone, Angular, or Ember.
- Submit us a github link to the project with proper commit messages.

##Bonus

- Use vanilla JavaScript -- if you don't need a library, show us!
- Use a templating language of your choice for displaying results (i.e. Handlebars, Underscore, etc.)
- Though a backend is not required for this challenge, incorporating Rails for additional features of this app would impress us.
- Use routing on your app, and possibly even HTML5 pushState
- Make it spiffy! Use Bootstrap or Foundation, or design your own front-end.

##Note on OMDB:

*The OMDB Api is a nice API to use, however some of the images from the movie results are not hotlinkable outside of localhost. Don't worry about this for now.*

##Areas of Opportunity

* Have state save actual results so don't need to hit API again
* Clean it down to vanilla JS
* Bonus: Add trip.js
* Bonus: Incorporate Netflix / Hulu / Google Play links
