
/***************************************************************************
 *  Created by : Akshath kumar M.
 * Created Date : 18-11-2014
 * Description : This service is used for interacting server side for company signup.
******************************************************************************/
var app=angular.module('baabtra');
app.service('UserSignup',['$http','bbConfig', function($http,bbConfig) {
	 //service fuction for username validation
	this.fnCheckEmailExists=function($scope,emailId){
    
     var result;
      $http({
           url: bbConfig.BWS+'FnCheckEmailExists/',
           data: JSON.stringify({email:$scope.signupDetails.email}),
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
           url: bbConfig.BWS+'FnCheckCompanyNameExists/',
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

    this.fnUserSignup=function($scope){ //service for company signup.
      var result;
      var data_to_send={"socialData":$scope.socialData,"from_where":$scope.from_where,"signupData":$scope.signupDetails};
      $http({
           url: bbConfig.BWS+'FnUserSignup/',
           data: JSON.stringify(data_to_send),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                        
                $scope.fnUserSignupCallBack(data);
                
              }).
              error(function(data, status, headers, config) {
                result='error';
                //$scope.fnCompanySignupCallBack(result);

             });  
      return result;
    };

}]);