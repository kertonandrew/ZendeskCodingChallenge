angular.module('ZendeskTicketViewer').controller('MainController', function($scope, $http, TicketFactory) {

	$scope.tickets;
	$scope.status;

	let getTickets = () => {
		TicketFactory.getTickets()
			.then(function(response) {
				$scope.tickets = response.data.tickets;
			}, function(error) {
				$scope.status = 'Unable to load ticket data: ' + error.message;
			});
	};

	getTickets();
});