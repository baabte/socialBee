
/***************************************************************************
 * Created by : Akshath kumar M.
 * Created Date : 18-11-2014
 * Description : This controller is used for signup page for specific company.
******************************************************************************/
var app=angular.module('baabtra');
app.controller('SignupCtrl',['$scope','signup','SbConfig','$alert','$rootScope','$location','localStorageService','$popover', function($scope,signup,SbConfig,$alert,$rootScope,$location,localStorageService,$popover) {  //here signup refer to signup service
	
  $scope.btnSignupText='Signup'; //Setting the button value as 'signup'
	//function for company signup
	$scope.fnCompanySignup=function(){
    $scope.progress=true;
      $scope.btnSignupText='Inprogress...'; //While login to show the inprogress status as value of button.
      signup.fnCompanySignup($scope);
	};

	//function for user name validation
	$scope.fnCheckEmailExists = function (email){
     var userEmail={};
     userEmail.eMail=email; //Email of specific company.
     if(email!==undefined){   //checking for email field is empty or not
        signup.fnCheckEmailExists($scope,userEmail); //call the service function present inside signup service.
      }
	};
 
  //function for user name validation
  $scope.fnCheckCompanyNameExists = function (companyName){
     var company={};
     company.companyName=companyName; //Email of specific company.
     if(companyName!==undefined){   //checking for email field is empty or not
        signup.fnCheckCompanyNameExists($scope,company); //call the service function present inside signup service.
      }
  };

  $scope.emailMsg='Not a valid email';          //error message for invalid email validation
  $scope.emailRMsg='This is required field';    //error message for required field validator
  $scope.emailEMsg='This Email Already exists'; //error message for email already exists validation 
  $scope.existingEmail='';                       //setting the existsing email id to a scope variable      
	$scope.companyNameEMsg='This company name already registered!'; //error message for invalid company name validation
  $scope.existingCompanyName=''; 

  //callback function for fnCheckEmailExists
	$scope.fnCheckEmailExistsCallBack=function(result){

    if(result.userCheck===1){   //if the email id already registered
       $scope.existingEmail=$scope.email; //setting the existing email id to scope variable for validation.
      }
      if(result.userCheck===0){ //if not matching existing registered email
      
     }
    
  };

  //callback function for fnCheckCompanyNameExists
  $scope.fnCheckCompanyNameExistsCallBack=function(result){
    
    if(result.userCheck===1){   //if the company name already registered
       $scope.existingCompanyName=$scope.companyName; //setting the existing company name to scope variable for validation.
      }
      if(result.userCheck===0){ //if not matching existing registered company name
      
     }
    
  };

  $scope.emailPattern = (function() {
     $scope.regexpEmail =/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
     return {
       test: function(value) {
         if( $scope.requireEmail === false ) {return true;}
         else {return $scope.regexpEmail.test(value);}
       }};
  })();

   //callback function for company signup
  $scope.fnCompanySignupCallBack=function(data){
  
  localStorageService.add('loginInfo',JSON.parse(data));//setting the localstorage value with response from the webservice called.
  $scope.logged=angular.fromJson(JSON.parse(data));
    if($scope.logged.result==='true') {
      $scope.progress=false;  //setting button enable
      $scope.btnSignupText='Signup'; //re setting the value of nutton to signup
      $rootScope.loginCheck=1;//if login is ok ,changin the variable in rootscope.
      localStorageService.set('loginLsCheck',1);//if login is ok ,changin the variable in localstorage.
      $location.path('/home');//routing to home after success login by user
      $scope.login_or_not='login Success'; 
      //$scope.loginLoading=false;
      //$scope.buttonShow=true;
    }
    else
    {
      $scope.progress=false; //setting button enable
      $scope.btnSignupText='Signup'; //re setting the value of nutton to signup
      localStorageService.set('loginLsCheck',2);//If the user not authenticated keep the value of variable in localstorage to 2
      $location.path('/');
      $scope.login_or_not='The Username or Password is incorrect.';
      //$scope.loginLoading=false;
      //$scope.buttonShow=true;
    }
  };

}]);