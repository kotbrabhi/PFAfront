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
    'routeAppControllers',
    'ui.bootstrap.contextMenu'
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
            controller: 'gestionFilierController'
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



routeAppControllers.controller('GestScolarCtrl', ['$scope',
    function($scope){
        $scope.message = "Gestion de scolarité";
    }
]);




/* global angular */
var serverip = 'localhost:8081'


app.service('eModuleService',function($http){
    this.cree = function(req){
               return $http({
                     method: 'POST',
                     url: 'http://'+serverip+'/gestionfiliere/eModules/creeEmodule',
                     data : req
                })
    }
    
    this.delete = function(req){
        return $http({
                    method: 'POST',
                    url: 'http://'+serverip+'/gestionfiliere/eModules/deleteEmodule',
                    data : req
                })
    }
    
    this.share = function(req){
        return $http({
                    method: 'POST',
                    url: 'http://'+serverip+'/gestionfiliere/eModules/shareEmodule',
                    data : req
                })
    }
    
    this.edite = function(req){
        return $http({
                    method: 'POST',
                    url: 'http://'+serverip+'/gestionfiliere/eModules/remplireEmodule',
                    data : req
                })
    }
    
    this.load = function(req){
                 return $http({
                        method: 'POST',
                        url: 'http://'+serverip+'/gestionfiliere/eModules/getEmodule',
                        data : req
                    })
              }
});

app.service('profService',function($http){
    this.getProfs = function(req){
            return $http({
                        method: 'POST',
                        url: 'http://'+serverip+'/gestionfiliere/profs/getProf',
                        data : req
                    })
    }
});



app.service('eModulesList',function(eModuleService){
    var items = []
    var selectedItemIndex =  -1;
    var load = function(){
               return eModuleService.load({fields : '',
                                    populate : [{path : 'createdBy',select : 'nom'},{path : 'updatedBy',select : 'nom'}]})
                      .then(function successCallback(response){
                               items = response.data.data;
                            },
                            function errorCallback(response) {
                                
                            }
                      );
            };
    var getItems = function(){
        return items;
    }
    
    var getSelectedItemIndex = function(){
        return selectedItemIndex;
    }
    
    var setSelectedItemIndex = function(index){
        selectedItemIndex = index;
    }
    
    return {
        load : load,
        getItems : getItems,
        getSelectedItemIndex : getSelectedItemIndex,
        setSelectedItemIndex : setSelectedItemIndex
    }
    
});

app.service('profsList',function(profService){
    var items = [{id : '57681b7372cd1ba3a09ad5d7',nom : "Oussama"},{id : '57681b7b72cd1ba3a09ad5d8',nom : "Kotb"}]
    var load = function(){
            return profService.getProfs({})
                    .then(function successCallback(response){
                                 this.items = response.data.data;
                            },
                            function errorCallback(response) {
                                
                            }
                      );

                
            }
    var getItems = function(){
        return items;
    }
    
    return {
        load : load,
        getItems : getItems
    }
});

app.controller('shareModalController',function($scope,eModuleService,profService,eModulesList,profsList){
    $scope.profs = profsList.getItems();
    $scope.share = {
            req : {
                userId : '',
                eModuleId : '',
                sendTo : []
            },
            sharedWith : '',
            init : function(){
                $('.selectpicker').selectpicker('deselectAll');
                $('.selectpicker').selectpicker('refresh')

                $scope.share.req.userId = $scope.profs[0]._id;
                $scope.share.req.eModuleId = eModulesList.getItems()[eModulesList.getSelectedItemIndex()]._id;
                $scope.share.sharedWith = '';
                $scope.share.req.sendTo = [];
                
                
                var req = {userId : $scope.profs[0]._id,
                          searchQuery : {_id : eModulesList.getItems()[eModulesList.getSelectedItemIndex()]._id},
                          responseFields : "sendTo.id",
                          populate : [{path : 'sendTo.id',select : 'nom'}]};
                eModuleService.load(req)
                              .then(function successCallback(response){
                                        if(response.data.code == '200'){
                                            if(response.data.data[0].sendTo.length>0)
                                                $scope.share.sharedWith = "Partagé avec :"
                                            for(var i=0 ; i<response.data.data[0].sendTo.length ; i++){
                                               $scope.share.sharedWith = $scope.share.sharedWith.concat(' '+response.data.data[0].sendTo[i].id.nom+',');
                                            }
                                            $scope.share.sharedWith = $scope.share.sharedWith.slice(0,-1);
                                        }else{
                                        }
                                    },
                                    function errorCallback(response) {
                                    }
                              );
            },
            submit : function(){
                eModuleService.share($scope.share.req)
                              .then(function successCallback(response){
                                        if(response.data.code == '200'){
                                            $('#shareModal').modal('hide');
                                        }else{
                                        }
                                    },
                                    function errorCallback(response) {
                                     }
                             );
                
            },
            annuler : function(){
            }
            
        }
        $scope.$on('init_shareModal',function(){
            $scope.share.init();
        })
});

app.controller('editeModalController',function($scope,$rootScope,eModuleService,profService,eModulesList,profsList){

    $scope.edite = {
            req : {
                userId : '',
                eModuleId : '',
                intitulee : '',
                prerequis : '',
                objectif : '',
                volume_horaire : 
                        {
                            cour :0,
                            td : 0,
                            tp : 0
                        },
                activitees_pratique : [],
                description_programme : '', 
                modalitee_evaluation : '',
                note : '',
            },
            validation : {
                 taken : false,
                 WTaken : false
            },
            init : function(){

              var tmpEModule = eModulesList.getItems()[eModulesList.getSelectedItemIndex()];
              
              $scope.edite.req.userId = profsList.getItems()[0].id;
              $scope.edite.req.eModuleId = tmpEModule._id;
              $scope.edite.req.intitulee = tmpEModule.intitulee;
              $scope.edite.req.prerequis = tmpEModule.prerequis;
              $scope.edite.req.objectif = tmpEModule.objectif;
              $scope.edite.req.volume_horaire = tmpEModule.volume_horaire;
              $scope.edite.req.activitees_pratique = tmpEModule.activitees_pratique;
              $scope.edite.req.description_programme = tmpEModule.description_programme;
              $scope.edite.req.modalitee_evaluation = tmpEModule.modalitee_evaluation;
              $scope.edite.req.note = tmpEModule.note;

              
            },
            addActivite : function(){
                var newActivitee = {
                            libellee : '',
                            objectif : '',
                            travaux_terrain : 0,
                            projet : 0,
                            stage : 0,
                            visite_etude : 0
                        }
                $scope.edite.req.activitees_pratique.push(newActivitee);
            }
            ,
            submit : function(){
                if(!$scope.editeForm.$pristine){
                    $scope.edite.req.lastUpdate = new Date();
                }
                eModuleService.edite($scope.edite.req)
                              .then(function successCallback(response){
                                        if(response.data.code == '200'){
                                            $rootScope.$broadcast('updateTable',{});
                                            $('#editeModal').modal('hide');
                                        }else if(response.data.code == "003"){
                                            $scope.edite.validation.taken = true;
                                            $('#editeModal').scrollTop(0)
                                        }
                                    },
                                    function errorCallback(response) {
                                            
                                     }
                             );
                
            },
            annuler : function(){
            }
            
        }
        $scope.$on('init_editeModal',function(){
            $scope.edite.init();
        })
});

app.controller('creeModalController',function($scope,$rootScope,eModuleService,profService,eModulesList,profsList){
         $scope.profs = profsList.getItems();
         $scope.cree = {
            req : {
                userId : '',
                intitulee : '',
                sendTo : [],
                populate : []
            },
            validation : {
                 taken : false,
                 WTaken : false
            },
            init : function(){
                $('.selectpicker').selectpicker('deselectAll');
                $('.selectpicker').selectpicker('refresh');
                
                $scope.cree.req.userId = profsList.getItems()[0].id
                $scope.cree.validation.WTaken = false;
                $scope.cree.validation.taken = false;
                $scope.cree.req.intitulee = '';
                $scope.creeEModuleForm.intitulee.$setUntouched();
                $scope.cree.req.sendTo = [];
            }
            ,
            submit : function(){
                eModuleService.cree($scope.cree.req)
                              .then(function successCallback(response){
                                        if(response.data.code == '200'){
                                            $rootScope.$broadcast('updateTable',{});
                                            $('#creeModal').modal('hide');
                                        }else{
                                            $scope.cree.validation.taken = true;
                                        }
                                    },
                                    function errorCallback(response) {
                                     }
                             );
                
            },
            annuler : function(){

            }
        }
        $scope.$on('init_creeModal',function(){
            $scope.cree.init();
        })
        
})

app.controller('deleteModalController',function($scope,$rootScope,eModuleService,profService,eModulesList,profsList){
     $scope.delete = {
            delete : function(){
                var id = eModulesList.getItems()[eModulesList.getSelectedItemIndex()]._id;
                var userId = profsList.getItems()[0].id;
                eModuleService.delete({eModuleId : id,userId : userId})
                               .then(function successCallback(response){
                                        if(response.data.code == '200'){
                                         $rootScope.$broadcast('updateTable',{});
                                        }else{

                                        }
                                    },
                                    function errorCallback(response) {
                                     }
                             );
            }
        }
});

app.controller('eModuleTableController',function($scope,$rootScope,eModuleService,profService,eModulesList,profsList){
        
        
        $scope.eModuleTable = {
            items : '',
            search : '',
            selectedIndex : -1,
            init : function(){  
                $scope.eModuleTable.selectedIndex = -1;
                eModulesList.setSelectedItemIndex(-1);
                $scope.eModuleTable.search = '',
                eModulesList.load().then(function(){
                    $scope.eModuleTable.items = eModulesList.getItems();
                });
            },
            menuOptions : [
                ['Apercu', function($itemScope){
                    alert($itemScope.eModule.intitulee)
                }],
                ['Afficher les détails', function($itemScope){
                    alert($itemScope.eModule.intitulee)
                }],
                null,
                ['Modifier',function($itemScope){
                   $rootScope.$broadcast('init_editeModal',{});
                    $('#editeModal').modal('show');
                }],
                ['Partager...',function($itemScope){
                    $scope.eModuleTable.selectedId = $itemScope.eModule._id;
                    $rootScope.$broadcast('init_shareModal',{});
                    $('#shareModal').modal('show');
                  
                }],
                null,
                ['Supprimer',function($itemScope){
                    $scope.eModuleTable.selectedId = $itemScope.eModule._id;
                    $('#deleteModal').modal('show');
                }]
            ],
            clicked : function(index,id,_intitulee){
                $scope.eModuleTable.selectedIndex = index;
                eModulesList.setSelectedItemIndex(index);
            }
        }
       
        $scope.$on('updateTable',function(){
            $scope.eModuleTable.init();
        })  
        $scope.$on('updateSearch',function(event,search){
            $scope.eModuleTable.search = search;
        })  
})

app.controller('headerController',function($scope,$rootScope,eModuleService,profService,eModulesList,profsList){
        $scope.edite = function(){
            $rootScope.$broadcast('init_editeModal',{});
        }
        $scope.share = function(){
            $rootScope.$broadcast('init_shareModal',{});
        }
        $scope.cree = function(){
            $rootScope.$broadcast('init_creeModal',{});
        }
        $scope.reportChange = function(){
            $rootScope.$broadcast('updateSearch',$scope.search);
        }
});
app.controller('gestionFilierController',function($scope,eModuleService,profService,eModulesList,profsList){
        
        $scope.selectedItemIndex = eModulesList.getSelectedItemIndex;
        $scope.eModulesList = eModulesList.getItems;    
        $    
});

