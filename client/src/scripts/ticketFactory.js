angular.module('ZendeskTicketViewer').factory('TicketFactory', ($http) => {

	return {
		//Set timeout
		getTickets: () => {
			return $http.get('/api/tickets');
		},
		getTicket: () => {
			return $http.get('/api/ticket');
		}
	};
});