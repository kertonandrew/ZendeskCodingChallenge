# ZendeskCodingChallenge
Zendesk Ticket Viewer - An AngularJS client app and Express.js server for access accessing tickets from the Zendesk API and displaying them in a web browser.

## Getting started
You'll require [Node][4] which includes npm for this install and start up.

1.	Open a terminal and run ```npm install``` from the root of the repo to install app dependencies.
2.	Install Gulp globally if not already installed (```npm install -g gulp```)
3.	Run ```gulp``` to run the default build task.
4.	You'll have to add your account creds to the serverOptions.json for connection authentication.
5.	Run ```node app.js``` to run the server.
6.	You can now navigate to [](http://localhost:8080/) to view the web UI.

If you run the ```gulp watch``` any files in the client app will but build and minify on change.

###Todo:

-	pageify tickets
-	style list
		-	alt colours each ticket?
		-	expand description on click?
-	create time format filter


[1]: https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository
[2]: https://nodejs.org/en/
[3]: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md
[4]: https://nodejs.org/en/download/
