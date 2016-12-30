angular.module('ZendeskTicketViewer', ['ngRoute']).
config(($routeProvider) => {
	$routeProvider.
	when('/tickets/:id', {
    templateUrl: '/views/ticket.html',
    controller: 'TicketController'
  }).
  when('/tickets/', {
		templateUrl: '/views/tickets.html',
		controller: 'TicketsController'
	}).
	otherwise({
		redirectTo: '/tickets'
	});
});