angular.module('ZendeskTicketViewer').controller('TicketController', function($scope, $http, TicketFactory, $routeParams) {
	$scope.tickets = false;
	$scope.status = false;
	$scope.users = false;

	TicketFactory.getTicket($routeParams.id)
		.then((response) => {
			$scope.ticket = response.data.ticket;
		}, (error) => {
			$scope.status = 'Unable to load ticket data: ' + error.statusText;
		});

});