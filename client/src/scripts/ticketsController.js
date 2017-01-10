angular.module('ZendeskTicketViewer').controller('TicketsController', function($scope, $http, TicketFactory, $location) {
	$scope.tickets = false;
	$scope.status = false;
	$scope.users;

	TicketFactory.getTickets()
		.then((response) => {
			$scope.tickets = response.data.tickets;
			$scope.users = response.data.users;
		}, (error) => {
			$scope.status = 'Unable to load tickets data: ' + error.statusText;
		});

	$scope.gotoTicket = function(ticket) {
		$location.path("/tickets/" + ticket.id);
	}

	$scope.findUser = function(id) {
		var result;
		angular.forEach($scope.users, function(obj, iter) {
			if (obj.id == id) {
				console.log(obj.name);
				result = obj.name;
			}
		})
		return result;
	}

});