(function (angular, appName) {
    'use strict';

    var app = angular.module(window.appName);
    var controller = function ($scope, $firebaseAuth, $location, $rootScope, $mdSidenav, $mdToast) {

        $scope.auth = $firebaseAuth();
        $scope.auth.$onAuthStateChanged(function (firebaseUser) {
            $rootScope.user = firebaseUser;
            $scope.user = firebaseUser;
            if(!firebaseUser){
                $scope.sesion = false;
                $location.path('/login');
            } else {
                $scope.sesion = true;
                $location.path('/inicio'); //TODO, ir a la ruta anterior para que no redireccione siempre al inicio
            }
        });
        $scope.logOff = function(){
            firebase.auth().signOut();
        };
        $scope.$on('sesion', function (event, args) {
            if(!$scope.sesion){
                $location.path('/login');
            }
        });
        $scope.$on('loadingShow', function (event, args) {
            $scope.cargando = true;
        });
        $scope.$on('loadingHide', function (event, args) {
            $scope.cargando = false;
        });
        $scope.toggleSidenav = function (menu) {
            $mdSidenav(menu).toggle();
        };
        $scope.section = [];
        $scope.section.expand = true;

    };
    controller.$inject = ['$scope', '$firebaseAuth', '$location', '$rootScope', '$mdSidenav', '$mdToast'];
    app.controller('bancolombia.controller', controller);

})(window.angular, window.appName);