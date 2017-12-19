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
                firebaseService.pushSector($scope.sector).then(function(res){
                    alert('Se guardo con exito');
                    $scope.sector = [];
                }, function(err){
                    alert('Mk algo paso! ' + err);
                    console.log(err);
                });
            } else {
                return false;
            }
        }
        $scope.getSector = firebaseService.getSector();
        $scope.edit = function(item){
            $scope.sector = item;
            $scope.isUpdate = true;
        };
        $scope.updateItem = function(form){
            if(form.$valid){
                firebaseService.updateSector($scope.sector).then(function(res){
                    alert('Se actualizo con exito');
                    $scope.sector = [];
                }, function(err){
                    alert('Mk algo paso! ');
                    console.log(err);
                });
                $scope.isUpdate = false;
                $scope.sector = [];
            } else {
                return false;
            }
        };
        $scope.delete = function(id){
            firebaseService.removeSector(id);
        };

    };
    controller.$inject = ['$scope', '$rootScope','firebaseService'];
    app.controller('sector.controller', controller);
    
})(window.angular, window.appName);