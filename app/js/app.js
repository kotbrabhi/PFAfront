'use strict';

/**
 * @ngdoc overview
 * @name frontpfaApp
 * @description
 * # frontpfaApp
 *
 * Main module of the application.
 */
 
 
 /*
 	Declaration du module angualr  
 */
 
 
 var app = angular.module('pfaApp',[
    // Dépendances du "module"
    'ngRoute',
    'routeAppControllers'
]);
  


app.controller('loginController',function($scope,$http){
		$scope.submit = function(){
			  $http({
				  method : 'POST',
				  url : 'http://10.3.21.104/gestionfilier/prof/login',
				  data : {query : {email: 'z',password : 'i'}}
			  }).then(function(response){
				  
				  alert(JSON.stringify(response.data,null));
				    
				  },function(response){
				  alert(JSON.stringify(response.data,null)+'ss');
				  })
			}	  
});

/**
 * Configuration du module principal : App
 */

app.config(['$routeProvider',
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
			when ('/Settings', {
			templateUrl: 'Settings/Settings.html',
            controller: 'SettingsCtrl'
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


