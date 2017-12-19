(function(angular, appName) {
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
                firebaseService.pushProduct($scope.product).then(function(res){
                    alert('Se guardo con exito');
                    $scope.product = [];
                }, function(err){
                    alert('Mk algo paso! ' + err);
                    console.log(err);
                });
            } else {
                return false;
            }
        }
        $scope.getProducts = firebaseService.getProducts();
        $scope.getSector = firebaseService.getSector();
        $scope.getRange = firebaseService.getRange();
        $scope.edit = function(item){
            $scope.product = item;
            $scope.isUpdate = true;
        };
        $scope.updateItem = function(form){
            if(form.$valid){
                firebaseService.updateProduct($scope.product).then(function(res){
                    alert('Se actualizo con exito');
                    $scope.product = [];
                }, function(err){
                    alert('Mk algo paso! ');
                    console.log(err);
                });
                $scope.isUpdate = false;
                $scope.product = [];
            } else {
                return false;
            }
        };
        $scope.delete = function(id){
            firebaseService.removeProduct(id);
        };

    };
    controller.$inject = ['$scope', '$rootScope', 'firebaseService'];
    app.controller('product.controller', controller);

})(window.angular, window.appName);