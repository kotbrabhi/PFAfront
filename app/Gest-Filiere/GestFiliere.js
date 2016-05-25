app.controller('GestFiliereCtrl',function($scope){
    $scope.test = [
        {
            a : 'Oooo' ,
            b : 'aaaa' ,
            c : 'Iiii' ,
            d : 'bbbbb'
        },
         {
            a : 'hhhhhhh' ,
            b : 'kkkkkkk' ,
            c : 'ttttttt',
            d : 'eeeeeee'
        }
    ] 
    
    $scope.profs = [
        {
            nom : 'JBerrich'
        },
         {
            nom : 'TBouchentouf' 
        }
    ] 
    $scope.a={};
    $scope.select = function(a,name){
        if($scope.table==name)$scope.table="";
        else $scope.table = name;
    }
    
    $scope.delete=function(i){//wheck click on confirmer(after delete), it delete the active prof
        alert(i);
		$scope.test.splice($scope.test.indexOf($scope.table),1);

	}
});