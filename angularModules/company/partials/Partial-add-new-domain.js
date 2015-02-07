var app=angular.module('baabtra');
app.controller('AddNewDomainCtrl',['$scope','addNewDomain','$rootScope','$modal','$sce','$alert',function($scope,addNewDomain,$rootScope,$modal,$sce,$alert){
	$scope.domainObj={};
	$scope.EMsgDomainExist='This domain already exists.';
	//seeting a watch to get the role mappindid for bing the existing domains.
	$rootScope.$watch('userinfo',function(){
		$scope.urmId=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		addNewDomain.fnLoadDomains($scope);
	});
	//Deactivating the domain
	$scope.fnDeActivateDomain=function(domainId){
		$scope.domainId=domainId;
		addNewDomain.fnDeActivateDomain($scope);
	};
	//Adding new domain
	$scope.fnAddNewDomain=function(){
		$scope.loginLoading = true;
		addNewDomain.fnAddNewDomain($scope);
	};

	  //function for user name validation
	$scope.fnDomainNameExists = function (){
		console.log('in');
		if(!angular.equals($scope.domainUrl,undefined)){   //checking for email field is empty or not
			addNewDomain.fnDomainNameExists($scope); //call the service function present inside signup service.
		}
	};

	//callback of deactivate domains
	$scope.fnDeActivateDomainCallBack=function(result){
		if(!angular.equals(result,undefined)){
			$scope.domainObj.domainList=result;
			$scope.notifications('Success','Deactivated successfully','success');
		}
	};
	//callback of adding new domains
	$scope.fnAddNewDomainCallBack=function(result){
		$scope.loginLoading = false;
		if(!angular.equals(result,undefined)){
			$scope.domainObj.domainList=result;
			$scope.domainUrl='';
			$scope.addNewDomain.$invalid=true;
			$scope.notifications('Success','successfully added new domain','success');// calling notification message function
		}
	};
	  //callback function for fnCheckCompanyNameExists
	$scope.fnDomainNameExistsCallBack=function(result){
console.log(result);
		if(result===1){   //if the company name already registered
			$scope.existingDomainName=$scope.domainUrl; //setting the existing company name to scope variable for validation.
		}

	};
	$scope.errMsgDomain='Please enter a valid url';
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

	//notification 
	$scope.notifications=function(title,message,type){
     // Notify(message, 'top-right', '2000', type, symbol, true); \
     $alert({title: title, content: message , placement: 'top-right',duration:3, type: type});// calling notification message function
    };
}]);