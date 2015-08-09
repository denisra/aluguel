angular.module('contabil', ['ui.bootstrap', 'ui.utils', 'ui.router', 'ngAnimate', 'create', 'firebase', 'contabil.mdTable', 'contabil.mdColresize', 'edit']);

angular.module('contabil').config(function($stateProvider, $urlRouterProvider, $locationProvider) {


		$locationProvider.html5Mode(true);
		$urlRouterProvider.otherwise('/contabil');
	  $stateProvider.state('contabil', {
	      url: '/contabil',
	      controller: 'ContabilCtrl',
	      templateUrl: 'contabil/partial/list/contabil.html'
	      //templateUrl: "<h1> Contabil! </h1>"
	  });
    /* Add New States Above */
   // $urlRouterProvider.when('/contabil', '/contabil/');

});

