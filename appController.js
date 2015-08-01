angular.module('aluguel')
.controller('appController', ['$scope', '$mdSidenav', '$log', '$state', '$rootScope', function($scope, $mdSidenav, $log, $state, $rootScope){
	$scope.test = 'Test';
	
	$rootScope.showSearch = ($state.current.name === 'contabil');
	console.log('contabil state: ', $state.current.name);

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