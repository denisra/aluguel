angular.module('create')
.controller('CreateCtrl', ['$scope', '$firebaseObject', '$mdDialog', '$rootScope', '$state', function($scope, $firebaseObject, $mdDialog, $rootScope, $state){
	//$scope.test = 'Test';
	
	$rootScope.showSearch = ($state.current.name === 'contabil');
	console.log('contabil state: ', $state.current.name);

	var ref = new Firebase("https://alugueis.firebaseio.com/contabil");
	//var fb = $firebaseObject(ref);

	var onComplete = function(error) {
	  if (error) {
	    console.log('Synchronization failed');
	  } else {
	    console.log('Synchronization succeeded');

	    $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.body))
	        .title('This is an alert title')
	        .content('You can specify some description text in here.')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Got it!')
	    );
	    $scope.record = null;
	  }
	};

	$scope.submitForm = function (record) {
		console.log('record: ', record);
		//this.record = record;
		var tmp = angular.copy(record);
		for (var key in tmp) {
		//_.mapObject(tmp, function(val, key) {
			//console.log('val, key: ', val, key);
			if (key.indexOf('date') > 0) {
				//console.log('raw date: ', tmp[key], typeof(val));
				var d = new Date(tmp[key]);
				$scope.record[key] = d;
				console.log('new scope before tmp: ', $scope.record);
				//var t = moment(d.toLocaleDateString(), 'MM/DD/YYYY').format('YYYY-MM-DD');
				console.log('to string: ', d.toISOString());
				tmp[key] = d.toISOString();
				console.log('new scope after tmp: ', $scope.record);
			}
		}
		console.log('new record: ', tmp);
		//console.log('new scope: ', $scope.record);
		ref.push(tmp, onComplete);
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
			ref.push(contabil, onComplete);
		}); 
	};    
}]);