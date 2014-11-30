var app=angular.module('baabtra');
app.service('profileCompletion',['$http','SbConfig',function($http,SbConfig) {

	//service function for sector loading
	this.FnGetSectors=function($scope){
  
		var result;
		$http({
				url: SbConfig.BWS+'FnLoadCompanySectors/',
				method: 'POST',
				withCredentials: false,
				contentType:'application/json',
				ataType:'json',
			}).
			success(function(data, status, headers, config) {
             
				$scope.sectorlist=angular.fromJson(JSON.parse(data));
               
			}).
		error(function(data, status, headers, config) {
			result='error';
			$scope.fnGetSectorsCallBack(result);
		});  
      return result;
	};
//service function for country state district loading
this.FnGetCountryStateDistrict=function($scope){
     
     var result;
      $http({
           url: SbConfig.BWS+'FnLoadCountryStateDistrict/',
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             
                $scope.CSDlist=angular.fromJson(JSON.parse(data));
              }).
              error(function(data, status, headers, config) {
                
                result='error';
                $scope.fnGetCountryStateDistrictCallBack(result);
                
             });  
      return result;
 

   };
   //service function for country state district loading
this.FnUpdateCompanySignupDetails=function($scope){
    //console.log($scope.formData,'companyId:'+$scope.companyId,'urmid'+$scope.userRoleMappingId);
     var result;
      $http({
           url: SbConfig.BWS+'FnUpdateCompanySignupDetails/',
           method: 'POST',
           data: JSON.stringify({'companyId':$scope.companyId,'urmId':$scope.userRoleMappingId,'data':$scope.formData}),
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
             console.log(angular.fromJson(JSON.parse(data)));
              $scope.FnUpdateCompanySignupDetailsCallBack(angular.fromJson(JSON.parse(data)));
              }).
              error(function(data, status, headers, config) {
                
                result='error';
                //$scope.fnGetCountryStateDistrictCallBack(result);
                
             });  
      return result;
 

   };

}]);