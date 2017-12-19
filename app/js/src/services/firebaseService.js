(function (angular, appName) {
	'use strict';
	var app = angular.module(window.appName);
	var service = function ($http, $firebaseArray, $firebaseObject) {
		var factory = {};

		function guid() {
			function s4() {
				return Math.floor((1 + Math.random()) * 0x10000)
					.toString(16)
					.substring(1);
			}
			return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
				s4() + '-' + s4() + s4() + s4();
		}

		factory.pushNeed = function (need) {
			if (need) {
				need.id = guid();
				return $firebaseArray(firebase.database().ref('/Necesito')).$add(need);
			}
			return null;
		};
		factory.getNeed = function () {
			return $firebaseArray(firebase.database().ref('/Necesito'));
		};
		//Need
		factory.removeNeed = function (id) {
			$firebaseObject(firebase.database().ref('/Necesito/' + id)).$remove();
		};
		//Need
		factory.updateNeed = function (need) {
			var update = {
				id: need.id,
				name: need.name,
				for: need.for,
				product: need.product
			};
			var item = $firebaseObject(firebase.database().ref('/Necesito/' + need.$id)).$remove();
			return $firebaseArray(firebase.database().ref('/Necesito')).$add(update);
		};
		factory.pushProduct = function (product) {
			if (product) {
				product.id = guid();
				return $firebaseArray(firebase.database().ref('/Productos')).$add(product);
			}
			return null;
		};
		factory.getProducts = function () {
			return $firebaseArray(firebase.database().ref('/Productos'));
		};
		factory.updateProduct = function (product) {
			var update = {
				id: product.id,
				name: product.name,
				image: product.image,
				body: product.body,
				pageurl: product.pageurl,
				range: product.range,
				sector: product.sector,
				related: product.related
			};
			var item = $firebaseObject(firebase.database().ref('/Productos/' + product.$id)).$remove();
			return $firebaseArray(firebase.database().ref('/Productos')).$add(update);
		};
		factory.removeProduct = function (id) {
			$firebaseObject(firebase.database().ref('/Productos/' + id)).$remove();
		};
		factory.pushRange = function (range) {
			if (range) {
				range.id = guid();
				return $firebaseArray(firebase.database().ref('/Rangos')).$add(range);
			}
			return null;
		};
		factory.getRange = function () {
			return $firebaseArray(firebase.database().ref('/Rangos'));
		};
		factory.updateRange = function (range) {
			var update = {
				id: range.id,
				name: range.name,
				icono: range.icono,
				body: range.body
			};
			var item = $firebaseObject(firebase.database().ref('/Rangos/' + range.$id)).$remove();
			return $firebaseArray(firebase.database().ref('/Rangos')).$add(update);
		};
		factory.removeRange = function (id) {
			$firebaseObject(firebase.database().ref('/Rangos/' + id)).$remove();
		};
		factory.pushSector = function (sector) {
			if (sector) {
				sector.id = guid();
				return $firebaseArray(firebase.database().ref('/Sectores')).$add(sector);
			}
			return null;
		};
		factory.getSector = function () {
			return $firebaseArray(firebase.database().ref('/Sectores'));
		};
		factory.updateSector = function (sector) {
			var update = {
				id: sector.id,
				name: sector.name,
				icono: sector.icono,
				body: sector.body
			};
			var item = $firebaseObject(firebase.database().ref('/Sectores/' + sector.$id)).$remove();
			return $firebaseArray(firebase.database().ref('/Sectores')).$add(update);
		};
		factory.removeSector = function (id) {
			$firebaseObject(firebase.database().ref('/Sectores/' + id)).$remove();
		};

		return factory;
	}

	service.$inject = ["$http", "$firebaseArray", "$firebaseObject"];
	app.service("firebaseService", service);
})(window.angular, window.appName);
