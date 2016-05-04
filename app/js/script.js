'use strict';
/**
 * Déclaration de l'application routeApp
 */
var routeApp = angular.module('routeApp', [
    // Dépendances du "module"
    'ngRoute',
    'routeAppControllers'
]);

/**
 * Configuration du module principal : routeApp
 */
routeApp.config(['$routeProvider',
    function($routeProvider) { 
        
        // Système de routage
        $routeProvider
        .when('/home', {
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
		.when('/', {
            templateUrl: 'home.html',
            controller: 'homeCtrl'
        })
        .when('/Gest-Charges', {
            templateUrl: 'Gest-Charges/GestCharges.html',
            controller: 'GestChargesCtrl'
          }).
		  when ('/Gest-Delib', {
		   templateUrl: 'Gest-Delib/GestDelib.html',
            controller: 'GestDelibCtrl'
			}).
			when ('/Gest-Filiere', {
			templateUrl: 'Gest-Filiere/GestFiliere.html',
            controller: 'GestFiliereCtrl'
			}).
			when ('/Gest-Scolarite', {
			templateUrl: 'Gest-Scolarite/GestScolar.html',
            controller: 'GestScolarCtrl'
			}).
		
		otherwise({
            redirectTo: '/home'
        });
    }
]);



/**
 * Définition des contrôleurs
 */
var routeAppControllers = angular.module('routeAppControllers', []);


// Contrôleur de la page d'accueil
routeAppControllers.controller('homeCtrl', ['$scope',
    function($scope){
        $scope.message = "Bienvenue sur la page d'accueil";
    }
]);

routeAppControllers.controller('GestChargesCtrl', ['$scope',
    function($scope){
        $scope.message = "Gestion de charge";
    }
]);

routeAppControllers.controller('GestDelibCtrl', ['$scope',
    function($scope){
        $scope.message = "Gestion de délibération";
    }
]);

routeAppControllers.controller('GestFiliereCtrl', ['$scope',
    function($scope){
        $scope.message = "Gestion de filiére";
    }
]);

routeAppControllers.controller('GestScolarCtrl', ['$scope',
    function($scope){
        $scope.message = "Gestion de scolarité";
    }
]);