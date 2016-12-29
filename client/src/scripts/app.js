angular.module('ZendeskTicketViewer', [
	'ngRoute'
]).
config(function($routeProvider, $locationProvider) {
	$routeProvider.
	when('/', {
		templateUrl: '/views/main.html',
		controller: 'mainController.js'
	}).
	when('/test', {
		templateUrl: '/views/test.html',
		controller: 'testController.js'
	}).
	otherwise({
		redirectTo: '/views/main.html'
	});
});