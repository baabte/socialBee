
/***************************************************************************
 * Created by : Akshath kumar M.
 * Created Date : 18-11-2014
 * Description : This controller is used profile registration form.
******************************************************************************/
var app=angular.module('baabtra');
app.controller('ProfilecompletionCtrl',['$scope','profileCompletion','localStorageService','$alert','$location',function($scope,profileCompletion,localStorageService,$alert,$location){
	var loginInfo=localStorageService.get('loginInfo'); //initialising the local storage values into a variable
    //$scope.valid=$scope.
    // we will store all of our form data in this object
    $scope.formData = {};
    $scope.selection={};
    profileCompletion.FnGetSectors($scope); //call the service for loading company sectors
    profileCompletion.FnGetCountryStateDistrict($scope);
    // function to process the form
    $scope.FnUpdateSignupDetails = function() {
       if(localStorageService.get('loginInfo').length!==0){ //checking for data in local storage
            $scope.companyId='546d7d9c94b1a992e9ff3faa';//loginInfo.fkCompanyId; //gets the user login name
            $scope.userRoleMappingId=loginInfo.roleMappingId.$oid;
        }
        if($scope.formData.phone===undefined){
            $scope.formData.phone='';
        }
        if($scope.formData.facebook===undefined){
            $scope.formData.facebook='';
        }
        if($scope.formData.gplus===undefined){
            $scope.formData.gplus='';
        }
        if($scope.formData.twitter===undefined){
            $scope.formData.twitter='';
        }
        if($scope.formData.linkedin===undefined){
            $scope.formData.linkedin='';
        }
        if($scope.formData.website===undefined){
            $scope.formData.website='';
        }
        $scope.formData.fksectorId=$scope.selection.sectors._id.$oid;
        $scope.formData.fkcountryId=$scope.selection.country._id.$oid;
        $scope.formData.fkstateId=$scope.selection.state.sId.$oid;
        $scope.formData.fkdistrictId=$scope.selection.district.dId.$oid;
        profileCompletion.FnUpdateCompanySignupDetails($scope);
    };

    //funtion to check url pattern
    $scope.urlPattern = (function() {
    $scope.regexpUrl =/(http(s)?:\\)?([\w-]+\.)+[\w-]+[.com|.in|.org]+(\[\?%&=]*)?/;
		return {
			test: function(value) {
			if( $scope.requireUrl === false ) {return true;}
			else {return $scope.regexpUrl.test(value);}
		}
    };
    })();
    
	//function to check number pattern
	$scope.NumberPattern = (function() {
    $scope.regexpNum =/^[0-9]+$/;
    return {
        test: function(value) {
            if( $scope.requireNum === false ){ 
              return true;}
            else {
              return $scope.regexpNum.test(value);}
        }
    };
	})();
	
    //callback for loading sectors
    $scope.fnGetSectorsCallBack=function(result){
		//if(result==='error'){
		//	$scope.notifications('Error in loading Sectors','warning');
		//}
	};
    $scope.FnUpdateCompanySignupDetailsCallBack=function(result){
        console.log(result);
        if(result.result==='success'){
          $alert({title: 'Success!', content: 'Thank you for completing your profile.', placement: 'top', type: 'info', show: true,animation: 'am-fade-and-slide-top',duration:2});
          $location.path('/');
        }
    };

}]);