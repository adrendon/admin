(function(angular, appName){
    'use strict';
    var app = angular.module(window.appName);
    function routingConfig($routeProvider, $locationProvider) {
        
        $routeProvider
        .when('/inicio',
        {
            templateUrl : 'views/pymes/need.html',
            controller  : 'home.controller'
        })
        .when('/producto',
        {
            templateUrl : 'views/pymes/product.html',
            controller  : 'product.controller'
        })
        .when('/sector',
        {
            templateUrl : 'views/pymes/sector.html',
            controller  : 'sector.controller'
        })
        .when('/rango',
        {
            templateUrl : 'views/pymes/range.html',
            controller  : 'range.controller'
        })
        .when('/login',
        {
            templateUrl : 'views/login.html',
            controller  : 'login.controller'
        });

        $routeProvider.otherwise({ redirectTo: '/login' });
        //$locationProvider.html5Mode(true);
    }
    routingConfig.$inject = ['$routeProvider', '$locationProvider'];
    app.config(routingConfig);

})(window.angular, window.appName);
