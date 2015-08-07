angular.module('edit', ['ui.bootstrap','ui.utils','ui.router','ngAnimate']);

angular.module('edit').config(function($stateProvider) {

    $stateProvider.state('edit', {
			//parent: 'contabil',
			url: '/contabil/edit/:recordId',
			controller: 'EditCtrl',
			templateUrl: 'contabil/partial/create/create.html'
    });
    /* Add New States Above */

});

