angular.module('ZendeskTicketViewer').factory('TicketFactory', ($http) => {

	return {
		getTickets: () => {
			return $http.get('/api/tickets');
		},
		getTicket: () => {
			return $http.get('/api/ticket');
		}
	};
});