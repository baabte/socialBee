var app=angular.module('baabtra');
app.controller('SocialconfigurehomeCtrl',['$scope','$modal','SocialconfigHome',function($scope, $modal,SocialconfigHome){
	var i=0;
	$scope.freezeText='Freeze'; //text for freeze button
	$scope.steps=[{'name':'Configure Website','iconUrl':'glyphicon-pencil','active':'active'}];

	$scope.button = { //button style while toggle
		"toggle": false,
		"checkbox": {
		"left": false,
		"middle": true,
		"right": false
	},
		"radio": "left",
		"freezeIcon":"fa-unlock"
	};
	$scope.loading = true;
	//popup modal
	$scope.modal = {
		"title": "Title"	
	};


	$scope.fnloadIframe=function(){
		$modal({scope: $scope, template: 'angularModules/company/partials/Partial-IFrame.html',placement:'center', show: true});
	};
	$scope.hideLoading=function(){
		$scope.loading=false;
	};
	//initialising the scope variables.
	$scope.addEvent=true;
	$scope.freezeIcon='fa-unlock';
	$scope.selectedEvent='click';
	$scope.clickEventLabel='Not selected any event!';
	$scope.confWebsiteClass='flipInX animated';
	var domElement=[];                //deleteing all the elements from the the selected array.
	var domElementvalue=[];
	//function to config the website step-1
	$scope.FnWebsiteConfig=function(){
		$scope.confWebsiteClass='fadeOut';
		$scope.websiteConfigContainer=true; //hiding the existing container
		$scope.selectFeatureContainer=true;
		$scope.steps.push({'name':'Select Feature','iconUrl':'glyphicon-saved','active':'active'});
	};

	//function to show hide the navigation the website step-1
	$scope.FnShowHideNavigation=function(index){
		
		$scope.steps.splice(parseInt(index)+1,parseInt($scope.steps.length));
		$scope.steps[index].active='active';
		//$scope.steps[index].active='';
		if(index===0){
			$scope.websiteConfigContainer=false;
			$scope.selectedFeatureAction=false;
			$scope.selectFeatureContainer=false;
			$scope.loadIframeContainer=false;
		}
		else if(index===1){
			$scope.websiteConfigContainer=true;
			$scope.selectFeatureContainer=true;
			$scope.loadIframeContainer=false;
			$scope.selectedFeatureAction=false;
		}
		else if(index===2){
			$scope.selectedFeatureAction=true;
			$scope.selectFeatureContainer=false;
			$scope.websiteConfigContainer=true;
			$scope.loadIframeContainer=false;
		}
		else{
			$scope.loadIframeContainer=true;
			$scope.selectedFeatureAction=false;
			$scope.selectFeatureContainer=false;
			$scope.websiteConfigContainer=true;
		}
	};

	//function to selecting specific feature
	$scope.fnSelectFeature=function(){
		
		$scope.selectedFeatureAction=true;
		$scope.selectFeatureContainer=false;
		$scope.steps.push({'name':'Select Feture type','iconUrl':'glyphicon-saved','active':'active'});
	};

	$scope.fnSelectFeatureType=function(){
		
		$scope.loadIframeContainer=true;
		$scope.selectedFeatureAction=false;
		$scope.steps.push({'name':'Save configuration','iconUrl':'glyphicon-saved','active':'active'});
	};
	//loading the features....

	$scope.featureList={ "features" : [ 
							{ "iconUrl"  : "images/facebook_large.ico","id": 1},
							{ "iconUrl"  : "images/in_large.ico" ,"id": 2}
						]
					};    

	//deleting events function
	$scope.fnDeleteEvent=function(){

		domElement=[];                //deleteing all the elements from the the selected array.
		domElementvalue=[];
		$scope.deleteEventElem=false; //hiding the delete event icon
		$scope.clickEventLabel='Not selected any event!';
		$scope.eventListContainer=false;

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
	            if(e.data!=="loadJSsuccess") // checking the post message from child window 
				{
					//domElementvalue=e.data.value; //variable to store the element whose value to be taken at the time of event trigger
					
					if(domElement.length===0){ //checking the consition that domElement Array have length is zero.
						
						$scope.clickEventLabel='You have selected one event!';
						$scope.deleteEventElem=true;
						$scope.eventListContainer=true;
						//$scope.eventsList=['click','change','blur','keyup','keydown','focus'];
						$scope.eventsList=[{'value':'click','label':'click'},{'value':'change','label':'change'},{'value':'blur','label':'blur'},{'value':'kydown','label':'keydown'},{'value':'keyup','label':'keyup'},{'value':'focus','label':'focus'}];
						$scope.$apply();
						//binding click element to the selected dom element
						
						if(e.data.id!==undefined || e.data.id!==''){ //checking for id attribute exists or not
							$scope.elementId=e.data.id;
							$scope.currentPage=e.data.currentPage;
							//domElement='if(window.location.href==\"'+e.data.currentPage+'\"){document.getElementById(\"'+e.data.id+'\").addEventListener(\"'+$scope.selectedEvent+'\",function(){';
							//domElement=domElement+'alert(\"helloooo\");});}';
						}

					}
					console.log(domElement);
				}
               
             }
			// Do whatever you want to do with the data got from IFrame in Parent form.
		}, false);    
		var receiver;
		window.onload = function() { //onload event
			$scope.iframe.contentWindow.postMessage('unfreeze', 'http://localhost:9000/#/');
			
		};
		// Get the window displayed in the iframe.
		receiver = $scope.iframe;//document.getElementById('receiver').contentWindow;
		// Get a reference to the 'Send Message' button.
		//var btn = document.getElementById('send'); 

		// A function to handle sending messages.
		$scope.sendMessage=function(e) {
			if(i%2!==0){
				// Prevent any default browser behaviour.
				e.preventDefault();
				$scope.freezeIcon='fa-unlock';
				$scope.freezeText='Freeze';
				// Send a message with the text 'freeze' to the new window.
				$scope.iframe.contentWindow.postMessage('unfreeze', 'http://localhost:9000/#/');
			}
			else{
				// Prevent any default browser behaviour.
				e.preventDefault();
				$scope.freezeIcon='fa-lock';
				$scope.freezeText='Unfreeze';
				$scope.TBFrame=true;
				// Send a message with the text 'unfreeze' to the new window.
				$scope.iframe.contentWindow.postMessage('freeze', 'http://localhost:9000/#/');
			}
			i++;
		};
	//function to submit the configuration details.
	$scope.FnSaveSocialConfigDetails=function(){
		SocialconfigHome.FnSaveSocialConfigDetails($scope);
	};


}]);