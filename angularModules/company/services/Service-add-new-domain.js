
var app=angular.module('baabtra');
app.service('addNewDomain',['bbConfig','$http','$sce',function(bbConfig,$http,$sce) {
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
   //deactivating the domain
  this.fnDeActivateDomain=function($scope){
     $http({ 
            method: 'post',
            url: bbConfig.BWS+'FnDeActivateDomain/',
            data:{'domainId':$scope.domainId,'urmId':$scope.rm_id},
            contentType:'application/json; charset=UTF-8',
           }).
              success(function(data, status, headers, config) { //success respond from server
                $scope.fnDeActivateDomainCallBack(angular.fromJson(JSON.parse(data)));

              }).
              error(function(data, status, headers, config) {
             });
  };
  //Adding New domain
  this.fnAddNewDomain=function($scope){
     $http({ 
            method: 'post',
            url: bbConfig.BWS+'FnAddNewDomain/',
            data:{'domainUrl':$scope.domainUrl,'urmId':$scope.rm_id},
            contentType:'application/json; charset=UTF-8',
           }).
              success(function(data, status, headers, config) { //success respond from server
                $scope.fnAddNewDomainCallBack(angular.fromJson(JSON.parse(data)));

              }).
              error(function(data, status, headers, config) {
             });
  };
   //Adding New domain
  this.fnDomainNameExists=function($scope){
     $http({ 
            method: 'post',
            url: bbConfig.BWS+'FnDomainNameExists/',
            data:{'domainUrl':$scope.domainUrl},
            contentType:'application/json; charset=UTF-8',
           }).
              success(function(data, status, headers, config) { //success respond from server
                $scope.fnDomainNameExistsCallBack(angular.fromJson(JSON.parse(data)));

              }).
              error(function(data, status, headers, config) {
             });
  };

}]);