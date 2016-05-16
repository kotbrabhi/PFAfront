app
.controller('settingsCont',function($scope,$http,settingFactory){

	$scope.tmpEdit=[];
	$scope.isEditable=[];
	$scope.addVisible=false;
	$scope.isLightboxVisible=false;	
	$scope.activeObj={};//used for delete
	$scope.masks={};
	//$scope.masks.prof=false;

	settingFactory.getList().then(function(arrItems){
         $scope.items = arrItems;
         $scope.isEditable.push(false);
       });

	$scope.add=function(){
		$scope.addVisible=true;
	}

	$scope.reset=function(){
		$scope.user=angular.copy($scope.master);
	}

	$scope.valider=function(){
		var obj={"nom":$scope.user.nNom,"prenom":$scope.user.nPrenom,"tel":$scope.user.nTel,"grade":$scope.user.nGrade};
		$scope.items.push(obj);
		$scope.isEditable.push(false);
		$scope.reset();
	}
	
	$scope.editer=function(obj,id){
		$scope.isEditable[id]=true;
		var tmp={};
		angular.copy(obj,tmp);
		$scope.tmpEdit[id]=tmp;
	}
	
	$scope.confirm=function(id,obj){
		$scope.isEditable[id]=false;
		angular.copy($scope.tmpEdit[id],obj);
	}

	$scope.annuler=function(id){
		$scope.isEditable[id]=false;
	}

	$scope.hideAdd=function(){
		$scope.addVisible=false;
	}

	$scope.delete=function(obj){
		$scope.isLightboxVisible=true;	
		$scope.activeObj=obj;
		$scope.lightboxContentSwitch="delete";
	}

	$scope.confirmDelete=function(obj){
		$scope.items.splice($scope.items.indexOf(obj),1);
		$scope.hideLightbox();
	}

	$scope.hideLightbox=function(){
		$scope.isLightboxVisible=false;
	}

	$scope.settings=function(obj){
		$scope.isLightboxVisible=true;
		$scope.lightboxContentSwitch="settings";	
		$scope.activeObj=obj;

		$scope.masks.prof=(obj.mask&1)==1?true:false;
		$scope.masks.filliere=(obj.mask&2)==2?true:false;
		$scope.masks.departement=(obj.mask&4)==4?true:false;
		$scope.masks.admin=(obj.mask&8)==8?true:false;
	}

});