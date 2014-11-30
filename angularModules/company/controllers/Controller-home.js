/***************************************************************************
 * Created by : Akshath kumar M.
 * Created Date : 22-11-2014
 * Description : This controller is used for home page for specific company.
******************************************************************************/
var app=angular.module('baabtra');
app.controller('home',[ '$scope','localStorageService','$location',function ($scope,localStorageService,$location) {
   
    if (localStorageService.get('loginLsCheck')===2||localStorageService.get('loginLsCheck')===null) {
       $location.path('/signin');
	}  
}]);