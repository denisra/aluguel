angular.module('contabil.mdTable', []);

angular.module('contabil.mdTable').directive('mdTable', function() {
	return {
		restrict: 'E',
		//replace: true,
		scope: {
		  headers: '=', 
      content: '=', 
      sortable: '=', 
      filters: '=',
      customClass: '=customClass',
      thumbs:'=', 
      count: '=',
      deleteRecord: '='
		},

    controller: function ($scope,$filter,$window) {
      var orderBy = $filter('orderBy');
      //var dateFilter = $filter('date');
      //var dateFormat = 'dd/mm/yyyy';
      $scope.tablePage = 0;
      $scope.nbOfPages = function () {
        return Math.ceil($scope.content.length / $scope.count);
      };
      $scope.handleSort = function (field) {
        if ($scope.sortable.indexOf(field) > -1) { return true;} else {	return false; }
      };
      $scope.order = function(predicate, reverse) {
          $scope.content = orderBy($scope.content, predicate, reverse);
          $scope.predicate = predicate;
      };
      $scope.order($scope.sortable[0],false);
      $scope.getNumber = function (num) {
				return new Array(num);
      };
      $scope.goToPage = function (page) {
        $scope.tablePage = page;
      };
			// $scope.deleteRecord = function (record) {
			// 	console.log('delete record: ', record);
			// };	
    },

		templateUrl: 'directive/mdTable/mdTable.html',
		//bindToController: true,
		link: function(scope, element, attrs, fn) {
		}
	};
});
