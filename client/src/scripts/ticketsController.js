angular.module('ZendeskTicketViewer').controller('TicketsController', function($scope, $http, TicketFactory, $location) {
	$scope.tickets = false;
	$scope.status = false;

	TicketFactory.getTickets()
		.then((response) => {
			$scope.tickets = response.data.tickets;
		}, (error) => {
			$scope.status = 'Unable to load tickets data: ' + error.statusText;
		});

  $scope.gotoTicket = function(ticket) {
    $location.path("/tickets/" + ticket.id);
  }
});