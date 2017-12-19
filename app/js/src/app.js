(function (angular) {
    'use strict';

    if (!angular) { throw 'Angular no se encuentra disponible' }

    var config = function ($mdThemingProvider) {
        $mdThemingProvider.theme('default').primaryPalette('indigo');
        if (firebase) {
            var config = {
                apiKey: "AIzaSyCCwPnOw0H-cVXkgD8KiT-UC8A6yV8DJXI",
                authDomain: "bancolombiaadmin.firebaseapp.com",
                databaseURL: "https://bancolombiaadmin.firebaseio.com",
                projectId: "bancolombiaadmin",
                storageBucket: "bancolombiaadmin.appspot.com",
                messagingSenderId: "459432589241"
            };
            firebase.initializeApp(config);
        } else {
            throw 'firebase no esta definido';
        };
    }
    config.$inject = ['$mdThemingProvider'];
    
    window.appName = 'admin-banco';
    var app = angular.module(window.appName, ['ngRoute', 'firebase', 'ngMaterial', 'ckeditor'])
        .config(config);

})(window.angular);
