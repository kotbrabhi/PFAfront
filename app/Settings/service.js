app
.factory("settingFactory",function($http){
	this.getList = function(){            
        return $http
		({
	        method : "GET",
	        url : "prof.json"
	    }).then(function mySucces(response) {
	        return response.data.data;
	        
		});          
    }
	return this;
});