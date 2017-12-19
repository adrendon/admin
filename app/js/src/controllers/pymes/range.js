(function(angular, appName){
	'use strict';

	var app = angular.module(window.appName);
	var controller = function ($scope, $rootScope, firebaseService) {
        $rootScope.$broadcast("sesion");
        $scope.options = {
            language: 'es',
            allowedContent: true,
            entities: false
        };
        $scope.save = function(form){
            if(form.$valid){
                firebaseService.pushRange($scope.range).then(function(res){
                    alert('Se guardo con exito');
                    $scope.range = [];
                }, function(err){
                    alert('Mk algo paso! ' + err);
                    console.log(err);
                });
            } else {
                return false;
            }
        }
        $scope.getRange = firebaseService.getRange();
        $scope.edit = function(item){
            $scope.range = item;
            $scope.isUpdate = true;
        };
        $scope.updateItem = function(form){
            if(form.$valid){
                firebaseService.updateRange($scope.range).then(function(res){
                    alert('Se actualizo con exito');
                    $scope.range = [];
                }, function(err){
                    alert('Mk algo paso! ');
                    console.log(err);
                });
                $scope.isUpdate = false;
                $scope.range = [];
            } else {
                return false;
            }
        };
        $scope.delete = function(id){
            firebaseService.removeRange(id);
        };

    };
    controller.$inject = ['$scope', '$rootScope', 'firebaseService'];
    app.controller('range.controller', controller);
    
})(window.angular, window.appName);