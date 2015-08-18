angular.module('create')
.controller('CreateCtrl', ['$scope', '$mdDialog', '$rootScope', '$state', '$mdToast', 'recordService', 
	function($scope, $mdDialog, $rootScope, $state, $mdToast, recordService){
	
	$rootScope.showSearch = recordService.getState();
	console.log('contabil state: ', recordService.getState());

	$scope.submitForm = function (record) {
		console.log('record: ', record);
		var tmp = recordService.dateToString(record);
		$scope.record = recordService.stringToDate(record);

		recordService.createRecord(tmp)
		.then(function (res) {
			console.log(res);
			recordService.showToast('Contato criado com sucesso!');
			$scope.record = null;
		}, function (error) {
			console.log(error);
		});
	};


	var contabil_list = [
		{name: 'Denis Afonso', start_date: '2015-05-23', end_date: '2015-06-01', total_due: '2500', total_received: '500', due_date: '2015-05-01'},
		{name: 'Mona Afonso', start_date: '2015-10-05', end_date: '2015-10-12', total_due: '2100', total_received: '1000', due_date: '2015-09-12'}, 
		{name: 'Mara Afonso', start_date: '2015-07-03', end_date: '2015-07-08', total_due: '2100', total_received: '1000', due_date: '2015-06-03'}, 
		{name: 'Domingos Fernandes', start_date: '2015-07-03', end_date: '2015-07-08', total_due: '2100', total_received: '1000', due_date: '2015-06-03'}, 
		{name: 'Pippa Afonso', start_date: '2015-07-03', end_date: '2015-07-08', total_due: '2100', total_received: '1000', due_date: '2015-06-03'},
		{name: 'Debora Afonso', start_date: '2015-07-03', end_date: '2015-07-08', total_due: '2100', total_received: '1000', due_date: '2015-06-03'},
		{name: 'Eoin Wilde', start_date: '2015-07-03', end_date: '2015-07-08', total_due: '2100', total_received: '1000', due_date: '2015-06-03'},
		{name: 'Jimmy Wilde', start_date: '2015-07-03', end_date: '2015-07-08', total_due: '2100', total_received: '1000', due_date: '2015-06-03'},
		{name: 'Julie Wilde', start_date: '2015-07-03', end_date: '2015-07-08', total_due: '2100', total_received: '1000', due_date: '2015-06-03'},
		{name: 'Mama Brusqueta', start_date: '2015-07-03', end_date: '2015-07-08', total_due: '2100', total_received: '1000', due_date: '2015-06-03'}
	];


	$scope.reset = function() {
		contabil_list.forEach(function (contabil) {
			recordService.createRecord(contabil)
			.then(function (res) {
				console.log(res);
				recordService.showToast('Contato criado com sucesso!');
			}, function (error) {
				console.log(error);
			});
		}); 
	};    
}]);