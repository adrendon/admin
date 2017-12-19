(function(angular, appName){
	'use strict';

	var app = angular.module(window.appName);
	var controller = function ($scope, $location, $firebaseAuth) {
		
		$scope.auth = $firebaseAuth();
		$scope.login = function (form, user) {
			if(form.$valid){
				$scope.auth.$signInWithEmailAndPassword(user.email, user.password)
				.then(function (auth) {
					$location.path('/inicio');
				}).catch(function (error) {
					switch(error.code) {
						case "auth/wrong-password":
							alert('Contraseña incorrecta');
							break;
						case "auth/user-not-found":
							alert("El usuario " + user.email + " no existe.");
							break;
						default:
							console.error("Authentication failed:", error);
					}
				});
			} else {
				return false;
			}
        };

    };
    controller.$inject = ['$scope', '$location', '$firebaseAuth'];
    app.controller('login.controller', controller);
    
})(window.angular, window.appName);