angular.module('aluguel', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'ngMaterial', 'ngMdIcons', 'contabil']);

angular.module('aluguel').config(function($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $locationProvider) {

    /* Add New States Above */
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
    .state('home', {
    url: '/',
    //templateUrl: 'index.html'
    });

    //$mdIconProvider

});

angular.module('aluguel')
.directive('focusMe', function($timeout, $parse) {
  return {
    //scope: true,   // optionally create a child scope
    link: function(scope, element, attrs) {
      var model = $parse(attrs.focusMe);
      scope.$watch(model, function(value) {
        //console.log('value=',value);
        if(value === true) { 
          $timeout(function() {
            element[0].focus(); 
          });
        }
      });
      // to address @blesh's comment, set attribute value to 'false'
      // on blur event:
      // element.bind('blur', function() {
      //    //console.log('blur');
      //    scope.$apply(model.assign(scope, false));
      // });
    }
  };
});


angular.module('aluguel').run(function($rootScope) {

    $rootScope.safeApply = function(fn) {
        var phase = $rootScope.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

});
