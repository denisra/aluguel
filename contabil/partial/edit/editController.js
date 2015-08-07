angular.module('edit').controller('EditCtrl',function($scope, $firebaseArray, $rootScope, $state, $stateParams){

	var recordId = $stateParams.recordId;

	$rootScope.showSearch = ($state.current.name === 'contabil');
	console.log('contabil state: ', $state.current.name);

	var ref = new Firebase("https://alugueis.firebaseio.com/contabil");

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

	function loadData () {
		var data = $firebaseArray(ref);
		data.$loaded()
		.then (function (data) {
			console.log('param : ', recordId);
			var record = _.find(data, function(obj) { return obj.$id === recordId;});
			console.log('record : ', record);
			convertDate(record);
			//console.log('scope data: ', $scope.mycontent);
			//console.log('total amounts: ', $scope.total_amounts);
		});
	}

	loadData();
});