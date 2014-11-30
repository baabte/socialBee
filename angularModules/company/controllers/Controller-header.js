/***************************************************************************
 * Created by : Akshath kumar M.
 * Created Date : 22-11-2014
 * Description : This controller is used for header page.
******************************************************************************/
var app=angular.module('baabtra');
app.controller('header',['$scope','$rootScope','$location','localStorageService', function($scope,$rootScope,$location,localStorageService) {
	
	var loginInfo=localStorageService.get('loginInfo'); //initialising the local storage values into a variable
	if(localStorageService.get('loginInfo').length!==0){ //checking for data in local storage
        $scope.userName=loginInfo.name; //gets the user login name
        $scope.profilePicSrc=loginInfo.profilePic;
        $scope.roleId=loginInfo.roleMappingObj[0].fkRoleId; 

    }
	
	$scope.logout=function(){//function fired when clicked on logout .
		$rootScope.loginCheck=2;//rootscope variable value changes to .
		localStorageService.set('loginLsCheck',2);//changing localstorage value.
		localStorageService.set('loginInfo','{}');//resetting the userinfo before logout 
		$location.path('/signin');//redirecting path into login
	};
}]);