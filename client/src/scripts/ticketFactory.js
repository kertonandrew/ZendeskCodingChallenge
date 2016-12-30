angular.module('ZendeskTicketViewer').factory('TicketFactory', ($http) => {
  var _ticketFactory = {
    getTickets: () => {
      return $http.get('/api/tickets');
    },
    getTicket: id => {
      return $http.get('/api/ticket/?id=' + id);
    }
  };
  return _ticketFactory;
});