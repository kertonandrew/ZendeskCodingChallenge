angular.module('ZendeskTicketViewer').controller('MainController', function($scope, $http, TicketFactory) {

	$scope.tickets;
	$scope.status;

	$scope.getTickets = function() {
		$scope.status = 0;
		TicketFactory.getTickets()
			.then((response) => {
				$scope.tickets = response.data.tickets;
			}, (error) => {
				$scope.status = 'Unable to load tickets data: ' + error.statusText;
			});
	};

	$scope.getTickets();
});