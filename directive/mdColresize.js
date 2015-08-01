angular.module('contabil.mdColresize', []);

angular.module('contabil.mdColresize').filter('startFrom',function (){
  return function (input,start) {
    if (!input || !input.length) { return; }
    start = +start;
    return input.slice(start);
  };
});

angular.module('contabil.mdColresize').directive('mdColresize', ['$timeout', function ($timeout) {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      scope.$evalAsync(function () {
        $timeout(function(){ $(element).colResizable({
          liveDrag: true,
          fixed: true
          
        });},100);
      });
    }
  };
}]);