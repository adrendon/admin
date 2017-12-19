(function(angular, appName){
	'use strict';

	var app = angular.module(window.appName);
	var controller = function ($scope, $mdConstant, firebaseService, $rootScope) {

        $rootScope.$broadcast("sesion");
        $scope.keys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];
        $scope.need = {for: []};
        $scope.customKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA];

        $scope.save = function(form){
            if(form.$valid && $scope.need.for.length != 0){
                var fire = firebaseService.pushNeed($scope.need).then(function(res){
                    alert('Se guardo con exito');
                    $scope.need = {for: []};
                }, function(err){
                    alert('Mk algo paso! ');
                    console.log(err);
                });
            } else {
                return false;
            }
        }
        $scope.getNeed = firebaseService.getNeed();
        $scope.getProducts = firebaseService.getProducts();
        $scope.delete = function(id){
            firebaseService.removeNeed(id);
        };
        $scope.edit = function(need){
            $scope.need = need;
            $scope.isUpdate = true;
        };
        $scope.updateNeed = function(form){
            if(form.$valid && $scope.need.for.length != 0){
                firebaseService.updateNeed($scope.need).then(function(res){
                    alert('Se actualizo con exito');
                    $scope.need = {for: []};
                }, function(err){
                    alert('Mk algo paso! ');
                    console.log(err);
                });
                $scope.isUpdate = false;
                $scope.need = {for: []};
            } else {
                return false;
            }
        };

    };
    controller.$inject = ['$scope', '$mdConstant', 'firebaseService', '$rootScope'];
    app.controller('home.controller', controller);
    
})(window.angular, window.appName);