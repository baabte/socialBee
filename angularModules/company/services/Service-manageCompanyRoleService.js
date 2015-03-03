angular.module('touterbee').service('manageCompanyRoleService',['$http','bbConfig','$rootScope',function manageCompanyRoleService($http,bbConfig,$rootScope) {

    this.addUserRole=function ($scope){ // functon that call web service to add a comapny role
      var roles;
    if(angular.equals($rootScope.userinfo. ActiveUserData.roleMappingObj.fkRoleId,1)){
      roles={"role":1,"roleName":$scope.roleName,"roleDescription":$scope.RoleDesc,"crmId":$scope.crmId,"urmId":$scope.urmId};
    }
    else{
      roles={"role":2,"roleName":$scope.roleName,"roleDescription":$scope.RoleDesc,"companyId":$scope.companyId,"crmId":$scope.crmId,"urmId":$scope.urmId};
    }

    $http({
      url: bbConfig.BWS+'ManageCompanyRole/',
      data: JSON.stringify({"roles":roles}),
      method: "POST",
      withCredentials: false,
      contentType:"application/json",
      dataType:"json",
    }).
    success(function(data, status, headers, config) {
      $scope.fnAddNewRollCallBack(data);
    }).
    error(function(data, status, headers, config) {

    });  

    }; 

this.RetrieveUserRole=function ($scope){ // sending a parameter only for test
    var userdata;
    if(angular.equals($rootScope.userinfo. ActiveUserData.roleMappingObj.fkRoleId,1)){
      userdata={"usertype":1};
    }
    else{
      userdata={"usertype":2,"companyId":$scope.companyId};
    }
         $http({
            url: bbConfig.BWS+'ViewManageCompanyRole/',
            data: JSON.stringify({"userdata":userdata}), //it will filter roles under a comapany
            method: "POST",
            withCredentials: false,
            contentType:"application/json",
            dataType:"json",
       }).
         success(function(data, status, headers, config) {

        $scope.fnRertrivecompanyRoleCallBack(data);                     
        }).
        error(function(data, status, headers, config) {

        }); 
};

this.DeleteCompanyRole=function($scope,RollData)
    {

  
        $http({
           url: bbConfig.BWS+'DeleteCompanyRole/',
           data: JSON.stringify(RollData), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
           }).
             success(function(data, status, headers, config) {
                 $scope.fnDeleteRoleCallBack(data);   
             }).
              error(function(data, status, headers, config) {

             }); 

};

this.UpdateUserRole=function($scope)
{
      
      var roleData={"_id":$scope.roleData._id.$oid,"role":$scope.role,"data":$scope.data};
      // console.log(roleData);
        $http({
           url: bbConfig.BWS+'UpdateCompanyRole/',
           data: JSON.stringify(roleData), //it will filter roles under a comapany
           method: "POST",
           withCredentials: false,
           contentType:"application/json",
           dataType:"json",
           }).
             success(function(data, status, headers, config) {
                  $scope.fnEditUserRoleCallBack(data);
             }).
              error(function(data, status, headers, config) {
                
             }); 
};

 }]);
