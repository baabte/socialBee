
angular.module('touterbee').controller('CompanyRegistrationCtrl',['$scope','commonService','companyRegistrationService','localStorageService','$location','$alert','$rootScope','$state', function ($scope,commonService,companyRegistrationService,localStorageService,$location,$alert,$rootScope,$state) {
   
        

if(!$rootScope.userinfo){
   commonService.GetUserCredentials($scope);
   $rootScope.hide_when_root_empty=false;
}

if($rootScope.loggedIn===false){
 $state.go('login');
}


// console.log($rootScope.userinfo.ActiveUserData.roleMappingId.$oid);

 var loggedusercrmid=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;



        $scope.companyButtonDisable=false;
        $scope.companyLoading=false;
    $scope.companyLoadStyle={'margin-top': '-3%','margin-left': '2%'};
    




   companyRegistrationService.FnGetSectors($scope);
   companyRegistrationService.FnGetCountryStateDistrict($scope);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//validation

$scope.emailMsg='Not a valid email';          //error message for invalid email validation
$scope.emailEMsg='This Email Already exists'; //error message for email already exists validation 
$scope.existingEmail='';   




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
//funtion for email validation 
$scope.emailPattern = (function() {
    $scope.regexpEmail =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    return {
        test: function(value) {
            if( $scope.requireEmail === false ) {return true;}
            else {return $scope.regexpEmail.test(value);}
        }
    };

})();

//funtion to check password checking
$scope.checkPassword = function () {
    $scope.companyregistrationform.cpassword.$invalid= $scope.company.password !== $scope.company.cpassword;
    //$scope.companyregistrationform.password.$error.dontMatch =$scope.companyregistrationform.$invalid= $scope.company.password !== $scope.company.cpassword;

};

//function for user name validation
$scope.userVal = function (e){
     var userNameId=$scope.company;
     // console.log(userNameId);
    companyRegistrationService.fnUserNameValid($scope,userNameId);
};


////////////////////////////////////////////////////////////////////////////////////////////////////////
  
//function to register the company
   $scope.fnGetCompanyRegisterDetails=function(company,selection){ //function to call the service
      if ($scope.companyregistrationform.$valid) {
      $scope.companyRegData=company;
      $scope.companyRegData.fksectorId=selection.sectors._id.$oid;
      //$scope.companyRegData.fkcountryId=selection.country._id.$oid;
      //$scope.companyRegData.fkstateId=selection.state.sId.$oid;
      //$scope.companyRegData.fkdistrictId=selection.district.dId.$oid;
      $scope.companyRegData.loggedusercrmid=loggedusercrmid;


      console.log($scope.company);
      companyRegistrationService.fnCompanyRegister($scope,$scope.companyRegData);
      $scope.companyButtonDisable=true;
      $scope.companyLoading=true;
      
      }
  };
 

$scope.fnGetSectorsCallBack=function(result){
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
      }

};

$scope.fnGetCountryStateDistrictCallBack=function(result){
   if(result==='error'){
        $scope.notifications('opps!','Error in connecting to server','danger');
      }

};

  $scope.fnUserCheckCallBack=function(result){
    // if(result.userCheck===1){
    //     $scope.companyregistrationform.companyEmail.$error.alreadyUsed =true;
    //     $scope.notifications('UserName already in Use!','fa-warning');
    //   }
    //  if(result.userCheck===0){
    //     $scope.companyregistrationform.companyEmail.$error.alreadyUsed =false;
    //   }
    // if(result==='error'){
    //     $scope.notifications('Error in Username Checking','fa-warning');
    //   }  
     if(result.userCheck===1){   //if the email id already registered
       $scope.existingEmail=$scope.company.eMail; //setting the existing email id to scope variable for validation.
       $scope.notifications('Error!','UserName already in Use!','danger');
      }
      if(result.userCheck===0){ //if not matching existing registered email
      
     }
  };

$scope.fnGetCompanyRegisterDetailsCallBack=function(result){
  if(result==='success'){
        $scope.notifications('Success','Company Registered Successfuly','success');
        $scope.companyButtonDisable=false;
        $scope.companyLoading=false;
        // companyregistrationform..$setPristine();
            
        //$scope.companyregistrationform.reset();
      }
    if(result==='error'){
        $scope.notifications('Error!','Error in Company Registeration','danger');
        $scope.companyButtonDisable=false;
        $scope.companyLoading=false;
        // $scope.companyregistrationform.$invalid;
        //$scope.companyregistrationform.reset();
        $scope.companyButtonDisable=true;
      }  
    if(result==='fileErr'){
        $scope.notifications('Error!','Unsupported Picture Format','danger');
        $scope.companyButtonDisable=false;
        $scope.companyLoading=false;
        // $scope.companyregistrationform.$invalid;
      }    

};

//notification 
$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };
   




}]);