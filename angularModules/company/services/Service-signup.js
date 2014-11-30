/***************************************************************************
 *  Created by : Akshath kumar M.
 * Created Date : 18-11-2014
 * Description : This service is used for interacting server side for company signup.
******************************************************************************/
var app=angular.module('baabtra');
app.service('signup',['$http','SbConfig', function($http,SbConfig) {
	 //service fuction for username validation
	this.fnCheckEmailExists=function($scope,emailId){
    
     var result;
      $http({
           url: SbConfig.BWS+'FnCheckEmailExists/',
           data: JSON.stringify(emailId),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                        
                result=angular.fromJson(JSON.parse(data));

                $scope.fnCheckEmailExistsCallBack(result);
                
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnCheckEmailExistsCallBack(result);

             });  
      return result;

    };

    this.fnCheckCompanyNameExists=function($scope,company){ //service function to check company already registered or not
    
     var result;
      $http({
           url: SbConfig.BWS+'FnCheckCompanyNameExists/',
           data: JSON.stringify(company),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                        
                result=angular.fromJson(JSON.parse(data));

                $scope.fnCheckCompanyNameExistsCallBack(result);
                
              }).
              error(function(data, status, headers, config) {
                result='error';
                $scope.fnCheckEmailExistsCallBack(result);

             });  
      return result;

    };

    this.fnCompanySignup=function($scope){ //service for company signup.
      var result;
      $http({
           url: SbConfig.BWS+'FnCompanySignup/',
           data: JSON.stringify({'companyName': $scope.companyName,'userName':$scope.email,'password':$scope.password}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                        
                $scope.fnCompanySignupCallBack(data);
                
              }).
              error(function(data, status, headers, config) {
                result='error';
                //$scope.fnCompanySignupCallBack(result);

             });  
      return result;
    };

}]);