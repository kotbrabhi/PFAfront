'use strict';

/**
 * @ngdoc overview
 * @name frontpfaApp
 * @description
 * # frontpfaApp
 *
 * Main module of the application.
 */
 
 var app = angular.module('frontpfaApp',[]);

/*var app = angular
  .module('frontpfaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });*/
  
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
