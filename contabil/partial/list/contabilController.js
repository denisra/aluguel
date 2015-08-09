angular.module('contabil').controller('ContabilCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$state', '$rootScope', '$mdDialog', 
	function($scope, $firebaseObject, $firebaseArray, $state, $rootScope, $mdDialog){

	//var tmp;
	$scope.mycontent = [];

	$rootScope.showSearch = ($state.current.name === 'contabil');
	console.log('contabil state: ', $state.current.name);

	var ref = new Firebase("https://alugueis.firebaseio.com/contabil");



	function get_totals(data) {
		var tmp = [];
		_.map(data, function(obj) {tmp.push(obj);});
		//console.log('tmp: ', tmp);
		var t_due = 0;
		var t_received = 0;		
		for (var i in tmp) {
			t_due = t_due + parseFloat(tmp[i].total_due);
			t_received = t_received + parseFloat(tmp[i].total_received);
		}
		//console.log(t_due);
		var total = {total_due: t_due, total_received: t_received};
		return total;
	}


	function loadData () {
		var data = $firebaseArray(ref);
		data.$loaded()
		.then (function (data) {
			console.log('data loaded: ', data);
			$scope.mycontent = data;
			//console.log('scope data: ', $scope.mycontent);
			$scope.total_amounts = get_totals(data);
			console.log('total amounts: ', $scope.total_amounts);
		});
	}

	

	$scope.toggleSearch = false;
	$scope.custom = {name: 'bold', start_date:'grey', end_date:'grey', due_date:'grey', total_due:'grey', total_received: 'grey'};
  $scope.sortable = ['name', 'start_date', 'end_date', 'due_date', 'total_due', 'total_received'];
  $scope.thumbs = '';
  $scope.count = 5;
  $scope.filters = 'search';



	$scope.headers = [
		{
      name:'Nome',
      field:'name'
    },{
      name: 'Data de chegada', 
      field: 'start_date'
    },{
      name:'Data de saida', 
      field: 'end_date'
    },{
      name: 'Data de vencimento', 
      field: 'due_date'
    },{
      name: 'Valor total', 
      field: 'total_due'
    },{
      name: 'Total recebido', 
      field: 'total_received'
    }
  ];

  //$scope.content = ref.

	// $scope.content = [{name: 'Denis Afonso', start_date: '01-07-2015', end_date: '15-07-2015', total_due: '2500', total_received: '500', due_date: '15-06-2015'},
	// 	{name: 'Mona Afonso', start_date: '25-11-2015', end_date: '01-12-2015', total_due: '2100', total_received: '1000', due_date: '01-10-2015'}, 
	// 	{name: 'Mara Afonso', start_date: '25-11-2015', end_date: '01-12-2015', total_due: '2100', total_received: '1000', due_date: '01-10-2015'}, 
	// 	{name: 'Domingos Fernandes', start_date: '25-11-2015', end_date: '01-12-2015', total_due: '2100', total_received: '1000', due_date: '01-10-2015'}, 
	// 	{name: 'Pippa Afonso', start_date: '25-11-2015', end_date: '01-12-2015', total_due: '2100', total_received: '1000', due_date: '01-10-2015'},
	// 	{name: 'Debora Afonso', start_date: '25-11-2015', end_date: '01-12-2015', total_due: '2100', total_received: '1000', due_date: '01-10-2015'},
	// 	{name: 'Eoin Wilde', start_date: '25-11-2015', end_date: '01-12-2015', total_due: '2100', total_received: '1000', due_date: '01-10-2015'},
	// 	{name: 'Jimmy Wilde', start_date: '25-11-2015', end_date: '01-12-2015', total_due: '2100', total_received: '1000', due_date: '01-10-2015'},
	// 	{name: 'Julie Wilde', start_date: '25-11-2015', end_date: '01-12-2015', total_due: '2100', total_received: '1000', due_date: '01-10-2015'},
	// 	{name: 'Mama Brusqueta', start_date: '25-11-2015', end_date: '01-12-2015', total_due: '2100', total_received: '1000', due_date: '01-10-2015'}];

	var onComplete = function(error) {
	  if (error) {
	    console.log('Synchronization failed');
	  } else {
	    console.log('Synchronization succeeded');
	  }
	};

	function delRecord (record) {
		console.log('delete record: ', record.$id);
		 ref.child(record.$id).remove(function(error){
	     if (error) {
	     	console.log("Error:", error);
	  	} else {
	     	console.log("Removed successfully!");
	     	loadData();
	   	}
	   });
	}



	$scope.deleteRecord = function (record) {
	  $mdDialog.show(
	    $mdDialog.confirm()
	      .parent(angular.element(document.body))
	      .title('Confirmar')
	      .content('Deseja realmente deletar o contato de ' + record.name + ' ?')
	      .ariaLabel('Confirm Dialog')
	      .ok('Sim')
	      .cancel('Cancelar')
	  ).then( function () {
	  	console.log('Confirmado! ');
	  	delRecord (record);
	  }, function () {
	  	console.log('Cancelado!');
	  });
	};


	loadData();


 //  ref.on("value", function(snap) {
 //  	var tmp = [];
 //  	_.map(snap.val(), function(obj) {tmp.push(obj);});
	// 	//$scope.mycontent = tmp;
	// 	//$scope.$apply();
	// 	$scope.total_amounts = get_totals(tmp);
	// }, function (errorObject) {
	// 		console.log("The read failed: " + errorObject.code);
	// });
}]);