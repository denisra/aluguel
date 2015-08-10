angular.module('aluguel')
.controller('appController', ['$scope', '$mdSidenav', '$log', '$state', '$rootScope', 'recordService', function($scope, $mdSidenav, $log, $state, $rootScope, recordService){
	$scope.test = 'Test';
	
	$rootScope.showSearch = recordService.getState();
	console.log('contabil state: ', recordService.getState());

  $scope.close = function () {
    $mdSidenav('left').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  };

	$scope.toggleMenu = function() {
		$mdSidenav('left')
	   .toggle()
	   .then(function(){
	     $log.debug('toggled');
   	});
	};
}]);