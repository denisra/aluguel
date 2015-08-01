angular.module('create', ['ui.bootstrap','ui.utils','ui.router','ngAnimate', 'firebase']);

angular.module('create').config(function($stateProvider) {

    $stateProvider.state('create', {
			//parent: 'contabil',
			url: '/contabil/create',
			controller: 'CreateCtrl',
			templateUrl: 'contabil/partial/create/create.html'
    });
    /* Add New States Above */

});

