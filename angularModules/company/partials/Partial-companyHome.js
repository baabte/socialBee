angular.module('touterbee').controller('CompanyhomeCtrl',['$scope','$state','localStorageService','$location',function ($scope,$state,localStorageService,$location){
  var loginInfo=localStorageService.get('loginInfo');
  if(angular.equals(loginInfo,null)||angular.equals(loginInfo.length,0)){
       $location.path('/'); //setting the location path to login page if local storage contain null value.
    }
    if(localStorageService.get('loginInfo').length!==0){ //checking for data in local storage
      $scope.rm_id=loginInfo.roleMappingId.$oid; //gets the last logged role mapping id from local storage
      if(angular.equals(loginInfo.roleMappingObj[0].fkCompanyId,"")){
        $scope.companyId='';
      }
      else{
        $scope.companyId=loginInfo.roleMappingObj[0].fkCompanyId.$oid;          
      }        
      $scope.roleId=loginInfo.roleMappingObj[0].fkRoleId;
      if(!angular.equals($scope.roleId,1) && !angular.equals($scope.roleId,2)){ //checking for login role id 
          $location.path('/home');
      }      
    }
//console.log($state.current);
    
}]);