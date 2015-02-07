var app=angular.module('baabtra');
app.service('domainVerification',['bbConfig','$http','$sce',function(bbConfig,$http,$sce) {
	//service function to load the domains
	this.fnLoadDomains=function($scope){
		 $http({ 
            method: 'post',
            url: bbConfig.BWS+'FnLoadDomainList/',
            data:{'urmId':$scope.rm_id},
            contentType:'application/json; charset=UTF-8',
           }).
              success(function(data, status, headers, config) { //success respond from server
                $scope.domainObj.domainList=angular.fromJson(JSON.parse(data));

              }).
              error(function(data, status, headers, config) {
             });
	};
 

}]);