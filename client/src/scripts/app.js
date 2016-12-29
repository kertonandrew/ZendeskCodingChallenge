angular.module('ZendeskTicketViewer', ['ngRoute']).
config(($routeProvider) => {
	$routeProvider.
	when('/', {
		templateUrl: '/views/main.html',
		controller: 'MainController'
	}).
	otherwise({
		redirectTo: '/views/main.html'
	});
});