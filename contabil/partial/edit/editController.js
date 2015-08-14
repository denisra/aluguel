angular.module('edit').controller('EditCtrl',function($scope, $firebaseArray, $rootScope, $state, $stateParams, recordService){

	var recordId = $stateParams.recordId;

	$rootScope.showSearch = recordService.getState();
	console.log('contabil state: ', recordService.getState());

	function convertDate (record) {
		_.mapObject(record, function(val, key) {
			if (key.indexOf('date') > 0) {
				var d = new Date(record[key]);
				record[key] = d;
				console.log('date obj: ', record[key]);
			}
		$scope.record = record;
		});
	}

	function getRecord () {
		recordService.loadData()
		.then( function(data){
			console.log('param : ', recordId);
			var record = _.find(data, function(obj) { return obj.$id === recordId;});
			console.log('record : ', record);
			convertDate(record);
		});
	}

	$scope.updateRecord = function (record) {
		console.log('update record: ', record);
		recordService.updateRecord(record)
		.then(function (res) {
			console.log(res);
			recordService.showToast('Contato atualizado com sucesso!');
			//$scope.record = null;
		}, function (error) {
			console.log(error);
		});
	};


	getRecord();
});