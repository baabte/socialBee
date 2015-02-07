var app=angular.module('baabtra');
app.controller('DomainVerificationCtrl',['$scope','domainVerification','$rootScope','$modal','$sce',function($scope,domainVerification,$rootScope,$modal,$sce){
	$scope.domainObj={};
	//calling the service to load the domains
	//$modal({title: 'My Title', contentTemplate: 'angularModules/company/partials/Partial-iframe.html', show: true});
	$rootScope.$watch('userinfo',function(){
		$scope.urmId=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		domainVerification.fnLoadDomains($scope);
	});
	//$scope.urmId=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
	var modal=$modal({scope: $scope, contentTemplate: 'angularModules/company/partials/Partial-iframe.html',show: false,animation:'am-fade-and-slide-top'});
	//function to domain verification
	$scope.fnVerifyDomain=function(domainId,domainUrl){
		$scope.domainSrc= domainUrl+'/tbverify/TBDomainVerification.html';
		modal.$promise.then(modal.show); 
	};
	        
	//to set the src for iframe
 	$scope.getSrc = function() {
 		return $sce.trustAsResourceUrl($scope.domainSrc);
	};

	// Here "addEventListener" is for standards-compliant web browsers and "attachEvent" is for IE Browsers.
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
		// Now...
		// if 
		//    "attachEvent", then we need to select "onmessage" as the event. 
		// if 
		//    "addEventListener", then we need to select "message" as the event

		var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

		// Listen to message from child IFrame window
		eventer(messageEvent, function (e) {
			
			if(e.origin==="http://localhost:9000"){
				if(e.data==="verified") // checking the post message from child window 
				{
					for (item in $scope.domainObj.domainList){
						if(angular.equals($scope.domainObj.domainList[item].domainUrl,e.origin)){
							$scope.domainObj.domainList[item].status=1;
						}
					}
				}
					
				}
				
			
			
			// Do whatever you want to do with the data got from IFrame in Parent form.
		}, false); 


}]);