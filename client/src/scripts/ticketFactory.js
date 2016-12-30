angular.module('ZendeskTicketViewer').factory('TicketFactory', ($http) => {

	var TicketFactory = {};

	TicketFactory.getTickets = () => {
		return $http.get('/api/tickets');
	};

	return TicketFactory;

});