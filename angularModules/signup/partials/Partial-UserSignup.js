
/***************************************************************************
 * Created by : Akshath kumar M.
 * Created Date : 18-11-2014
 * Description : This controller is used for signup page for specific company.
******************************************************************************/
var app=angular.module('baabtra');
app.controller('UsersignupCtrl',['$scope','UserSignup','bbConfig','$alert','$rootScope','$location','localStorageService','$popover','$state','$modal', function($scope,UserSignup,SbConfig,$alert,$rootScope,$location,localStorageService,$popover,$state,$modal) {  //here signup refer to signup service
	
  $scope.btnSignupText='Signup'; //Setting the button value as 'signup'
  $scope.signupDetails={};
	//function for company signup
	$scope.fnCompanySignup=function(){
    $scope.progress=true;
      $scope.btnSignupText='Inprogress...'; //While login to show the inprogress status as value of button.
      $scope.from_where="direct";
      UserSignup.fnUserSignup($scope);
	};

	//function for user name validation
	$scope.fnCheckEmailExists = function (email){
     var userEmail={};
     userEmail.eMail=email; //Email of specific company.
     if(email!==undefined){   //checking for email field is empty or not
        UserSignup.fnCheckEmailExists($scope,userEmail); //call the service function present inside signup service.
      }
	};
 
  //function for user name validation
  $scope.fnCheckCompanyNameExists = function (companyName){
     var company={};
     company.companyName=companyName; //Email of specific company.
     if(companyName!==undefined){   //checking for email field is empty or not
        UserSignup.fnCheckCompanyNameExists($scope,company); //call the service function present inside signup service.
      }
  };

  $scope.emailMsg='Not a valid email';          //error message for invalid email validation
  $scope.emailRMsg='This is required field';    //error message for required field validator
  $scope.emailEMsg='This Email Already registered'; //error message for email already exists validation 
  $scope.existingEmail='';                       //setting the existsing email id to a scope variable      
	$scope.companyNameEMsg='This company name already registered!'; //error message for invalid company name validation
  $scope.existingCompanyName=''; 

  //callback function for fnCheckEmailExists
	$scope.fnCheckEmailExistsCallBack=function(result){

    if(result.userCheck===1){   //if the email id already registered
       $scope.existingEmail=$scope.signupDetails.email; //setting the existing email id to scope variable for validation.
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
  $scope.fnUserSignupCallBack=function(data){
   $scope.logData=angular.fromJson(JSON.parse(data));
    if($scope.logData.add_fb){
      if($scope.logData.add_fb=="facebook"){
        $scope.progress=false;
        $scope.btnSignupText='Signup'; //While login to show the inprogress status as value of button.
        $scope.socialSiteName="facebook";
      $modal({ scope: $scope,
              template: 'angularModules/login/partials/Partial-addSocialInfo.html',
              placement:'center',
              show: true}); 
      }

    }else{


        if($scope.logData.result==='true') {
          $scope.progress=false;
          $scope.btnSignupText='Signup'; //While login to show the inprogress status as value of button.
          var logdata=$scope.logData.ActiveUserDataId.$oid.concat($scope.logData.userLoginId);
          localStorageService.add('logDatas',logdata);
          $rootScope.userinfo=$scope.logData;//if login is ok put it in the login info variable.
          $rootScope.loggedIn=true;//if login is ok ,changin the variable in rootscope.
          $state.go('home.main');//routing to home after success login by user
          $scope.login_or_not='login Success'; 
         
        }
        else
          {
            $scope.progress=false;
            $scope.btnSignupText='Signup'; //While login to show the inprogress status as value of button.
            $scope.loginCredential={};
            $scope.signinform.$setPristine();
            $scope.Error_msg=true; 
            $scope.login_error="incorrect Username or Password";   
            $scope.login_frequency++;  
          }
      }
  };

}]);