angular.module('edit').controller('EditCtrl', ['$scope', '$rootScope', '$state', '$stateParams', 'recordService', function($scope, $rootScope, $state, $stateParams, recordService){

	var recordId = $stateParams.recordId;

	$rootScope.showSearch = recordService.getState();
	console.log('contabil state: ', recordService.getState());

	function getRecord () {
		recordService.loadData()
		.then( function(data){
			console.log('param : ', recordId);
			var record = _.find(data, function(obj) { return obj.$id === recordId;});
			console.log('record : ', record);
			$scope.record = recordService.stringToDate(record);
		});
	}

	$scope.updateRecord = function (record) {
		console.log('update record: ', record);
		var newRecord = recordService.dateToString(record);
		$scope.record = recordService.stringToDate(record);
		recordService.updateRecord(newRecord)
		.then(function (res) {
			console.log(res);
			recordService.showToast('Contato atualizado com sucesso!');
		}, function (error) {
			console.log(error);
		});
	};


	getRecord();
}]);