angular.module('contabil').controller('ContabilCtrl', ['$scope', '$firebaseObject', '$firebaseArray', '$state', '$rootScope', '$mdDialog', 'recordService', 
	function($scope, $firebaseObject, $firebaseArray, $state, $rootScope, $mdDialog, recordService){

	$scope.mycontent = [];

	$rootScope.showSearch = recordService.getState();
	console.log('contabil state: ', recordService.getState());

	var ref = new Firebase("https://alugueis.firebaseio.com/contabil");

	var loadData = function() {
		recordService.loadData()
		.then( function(data){
			$scope.mycontent = data;
			$scope.total_amounts = recordService.get_totals(data);
		});
	};

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
	  	recordService.deleteRecord(record);
	  	recordService.loadData();
	  }, function () {
	  	console.log('Cancelado!');
	  });
	};

	loadData();
}]);