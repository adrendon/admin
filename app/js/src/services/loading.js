(function(angular, appName){
	'use strict';
  	var app = angular.module(window.appName);
	var service = function($rootScope, $q){
		var numLoadings = 0;

        return {
            request: function (config) {
                numLoadings++;
                $rootScope.$broadcast("loadingShow");
                return config || $q.when(config)
            },
            response: function (response) {
                if ((--numLoadings) === 0) {
                    $rootScope.$broadcast("loadingHide");
                }
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (!(--numLoadings)) {
                    $rootScope.$broadcast("loadingHide");
                }
                return $q.reject(response);
            }
        };
	}
	service.$inject = ["$rootScope", "$q"];
	app.service("loading", service);
})(window.angular, window.appName);
