
var app=angular.module('touterbee');
app.controller('SocialconfighomeCtrl',['$scope','SocialConfigHome','$upload','$alert','$compile','fileReader','growl','$linkedIn','$facebook','$rootScope',function($scope,SocialConfigHome,$upload,$alert,$compile,fileReader,growl,$linkedIn,$facebook,$rootScope){
	var i=0;
	$scope.touterConfig={};
	$scope.file={};
	//introJs().start();
	$scope.touterConfig.freezeText='Configure your website'; //text for freeze button
	// $scope.touterConfig.steps=[{'stepNo':1,'name':'Configure Website','iconUrl':'glyphicon-pencil','active':'active'},{'stepNo':2,'name':'Channel Selection','iconUrl':'glyphicon-saved','active':''},{'stepNo':3,'name':'Broadcast type selection','iconUrl':'glyphicon-saved','active':''},{'stepNo':4,'name':'Save configuration','iconUrl':'glyphicon-saved','active':''}];
	$scope.touterConfig.steps=[{'stepNo':1,'name':'Configure Website','iconUrl':'glyphicon-pencil','active':'active'},{'stepNo':2,'name':'Save configuration','iconUrl':'glyphicon-saved','active':''}];
	$scope.touterConfig.valid=true;
	//$scope.touterConfig.selectedDomainId={domainUrl:'www.example.com'};
	//$scope.updateLoginStatus($scope.updateApiMe);
	$scope.touterConfig.button = { //button style while toggle
		"toggle": false,
		"checkbox": {
		"left": false,
		"middle": true,
		"right": false
	},
		"radio": "left",
		"freezeIcon":"fa-unlock"
	};
	/* scope variable for steps tour*/
	$scope.IntroOptions = {
		steps:[
		{
			element: document.querySelector('#step1'),
			intro: "Select a broad cast type."
		},
		{
			element: document.querySelectorAll('#step2')[0],
			intro: "Please use this window to select the event to perform the action",
			position: 'left'
		}/*,
		{
		element: '#step3',
		intro: 'Click any one of element to perform the action',
		position: 'left'
		},
		{
		element: '#step4',
		intro: "Another step.",
		position: 'bottom'
		},
		{
		element: '#step5',
		intro: 'Get it, use it.'
		}*/
		],
		showStepNumbers: false,
		showBullets: false,
		exitOnOverlayClick: true,
		exitOnEsc:true,
		nextLabel: '<strong>NEXT!</strong>',
		prevLabel: '<span style="color:green">Previous</span>',
		skipLabel: 'Exit',
		doneLabel: 'Thanks'
	};
    /* End of scope variable for steps tour*/
	$scope.formData={};
	$scope.myFormData = {};
	$scope.touterConfig.loading = true;
	$scope.touterConfig.addEleIcon='fa-plus';
	//tooltip for add element button
	$scope.touterConfig.addEleTooltip={
		'title':'selecting element to get the value',
	};
	//seeting a watch to get the role mappindid for bing the existing domains.
	$rootScope.$watch('userinfo',function(){
		$scope.urmId=$rootScope.userinfo.ActiveUserData.roleMappingId.$oid;
		 SocialConfigHome.fnLoadDomains($scope); //call the service function to load the domain list
	});
	
	$scope.touterConfig.featureList={};
	$scope.hideLoading=function(){
		$scope.touterConfig.loading=false;
	};
	//initialising the scope variables.
	$scope.touterConfig.addEvent=true;
	$scope.touterConfig.freezeIcon='fa-unlock';
	$scope.touterConfig.selectedEvent='click';
	$scope.touterConfig.clickEventLabel='Not selected any event!';
	$scope.touterConfig.confWebsiteClass='flipInX animated';
	var domElement=[];                //deleteing all the elements from the the selected array.
	var domElementvalue=[];
	//function to config the website step-1
	$scope.FnWebsiteConfig=function(){
		$scope.touterConfig.confWebsiteClass='fadeOut';
		$scope.FnShowHideNavigation(1);
		SocialConfigHome.fnLoadChannels($scope);

	};

	//function to show hide the navigation the website step-1
	$scope.FnShowHideNavigation=function(index){

		var i;
		for(i=0;i<$scope.touterConfig.steps.length;i++){
			
			if(angular.equals(i,index)){
				$scope.touterConfig.steps[i].active='active';
				
			}
			else{
				
				$scope.touterConfig.steps[i].active='';
			}
		}
		
		if(angular.equals(index,0)){  
			$scope.touterConfig.websiteConfigContainer=false;
			$scope.touterConfig.selectedFeatureAction=false;
			$scope.touterConfig.selectFeatureContainer=false;
			$scope.touterConfig.loadIframeContainer=false;
			
		}
		else if(angular.equals(index,1)){
		$scope.touterConfig.websiteConfigContainer=true;
			$scope.touterConfig.selectFeatureContainer=true;
			if(!angular.equals($scope.touterConfig.featureId,'')&& $scope.configForm.$valid){
				$scope.touterConfig.loadIframeContainer=true;
			}else{
				$scope.touterConfig.loadIframeContainer=false;
			}
		}

	};
	$scope.touterConfig.featureId='';
	//function to selecting specific feature
	$scope.fnSelectFeature=function(index,id,src,channelName){
		$scope.touterConfig.loadIframeContainer=true;
		//$scope.FnShowHideNavigation(2);
		$scope.touterConfig.featureId=id;
		$scope.touterConfig.featureTypesList=$scope.touterConfig.featureList[id].broadcastTypes;
		//console.log($scope.touterConfig.featureTypesList);
		$scope.touterConfig.featureImg=src;
		$scope.touterConfig.channelName=channelName;
		//added for getting active icon-------------------------------
		
		var i;
		for(var key in $scope.touterConfig.featureList){ //for indicating the selected channel
			if(angular.equals(key,id)){
				$scope.touterConfig.featureList[key].active='b-b b-b-2x b-success';
				
			}
			else{
				$scope.touterConfig.featureList[key].active='';
			}
		}
		//.end ective icon--------------------------------------------
		
		$scope.schema="";	
	};


	$scope.fnSelectFeatureType=function(e){

		//$scope.FnShowHideNavigation(3);
		//console.log($scope.touterConfig.selectedFeatureType);
		if(!angular.equals($scope.touterConfig.selectedFeatureType,undefined) && !angular.equals($scope.touterConfig.selectedFeatureType,'')){
			SocialConfigHome.fnLoadBroadcastTypeTemplate($scope);
		}
		else{
			$scope.schema='';
		}
	};
	//loading the features....
	//calling the service to load the channels.


	//deleting events function
	$scope.fnDeleteEvent=function(){
		$scope.touterConfig.valid=true;
		domElement=[];                //deleteing all the elements from the the selected array.
		domElementvalue=[];
		$scope.touterConfig.deleteEventElem=false; //hiding the delete event icon
		$scope.touterConfig.clickEventLabel='Not selected any event!';
		$scope.touterConfig.eventListContainer=false;
		$scope.formData='';
	};

	//Here "addEventListener" is for standards-compliant web browsers and "attachEvent" is for IE Browsers.
	var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
	var eventer = window[eventMethod];
		//Now...
		//if 
		//"attachEvent", then we need to select "onmessage" as the event.
		// if 
		//"addEventListener", then we need to select "message" as the event

		var messageEvent = eventMethod === "attachEvent" ? "onmessage" : "message";

		// Listen to message from child IFrame window
		eventer(messageEvent, function (e) {
			
			if(angular.equals(e.origin,'http://'+$scope.touterConfig.selectedDomainId.domainUrl)){
				$scope.touterConfig.currentPage=e.data.currentPage; //setting the currentPage which is loaded inside iframe
				$scope.touterConfig.elementId='';
				if(!angular.equals(e.data.message,'loadJSsuccess')) // checking the post message from child window 
				{
					//domElementvalue=e.data; //variable to store the element whose value to be taken at the time of event trigger
					if(angular.equals(domElement.length,0)){ //checking the consition that domElement Array have length is zero.
						//binding click element to the selected dom element
						if(!angular.equals(e.data.id,undefined) && !angular.equals(e.data.id,'')){ //checking for id attribute exists or not
							$scope.touterConfig.valid=false;
							domElement=e.data;
							$scope.touterConfig.clickEventLabel='You have selected the element to trigger';
							$scope.touterConfig.deleteEventElem=true;
							$scope.touterConfig.eventListContainer=true;
							$scope.$apply();
							$scope.touterConfig.elementId=e.data.id;
							$scope.touterConfig.currentPage=e.data.currentPage;
							//domElement='if(window.location.href==\"'+e.data.currentPage+'\"){document.getElementById(\"'+e.data.id+'\").addEventListener(\"'+$scope.selectedEvent+'\",function(){';
							//domElement=domElement+'alert(\"helloooo\");});}';
						}
						else{
							$alert({title: 'Not possible!', content: 'Please select a element which have a "id" attribute.', placement: 'top-right', type: 'info', show: true,animation: 'am-fade-and-slide-top',duration:5});
							$scope.touterConfig.valid=true;
							domElement='';
							$scope.touterConfig.clickEventLabel='Not selected any event!';
							$scope.touterConfig.deleteEventElem=false;
							$scope.touterConfig.eventListContainer=false;
							$scope.$apply();

						}

					}
					
				}
				
				var contentDiv=document.getElementById('contentEditDiv'); //accesing the element to get the scope
				//$compile(contentDiv)($scope);
				if(angular.equals(e.data.type,'text') || angular.equals(e.data.type,'textarea')) {
						
							if(!angular.equals(e.data.id,undefined)){		//checking the value of the selected element id is defined or not.
								$scope.addHtmlAtCaret('&nbsp;<span draggable="true" contenteditable="false" class="btn m-v-xs btn-xs btn-default"> #'+e.data.id+'</span>&nbsp;'); //adding the selected id attribute for tracing.
								
							}

				}
				else{
					if(!angular.equals(e.data.message,"loadJSsuccess")){ //checking the event triggered at loading page or not
						$alert({title: 'Not possible!', content: 'Please select any input text field to get the element value.', placement: 'top-right', type: 'info', show: true,animation: 'am-fade-and-slide-top',duration:5});
					}
				}
			}
			// Do whatever you want to do with the data got from IFrame in Parent form.
		}, false);    
		var receiver;
		window.onload = function() { //onload event
			//$scope.touterConfig.iframe.contentWindow.postMessage('unfreeze', '');
			
		};

		$scope.$watch('touterConfig.selectedDomainId',function(){
			//if(!angular.equals($scope.touterConfig.selectedDomainId.domainUrl,'www.example.com')){
				//console.log($scope.touterConfig.selectedDomainId.domainUrl);
				$scope.touterConfig.iframe.contentWindow.postMessage('unfreeze', 'http://'+$scope.touterConfig.selectedDomainId.domainUrl);
			//}
		});

		// Get the window displayed in the iframe.
		receiver = $scope.touterConfig.iframe;//document.getElementById('receiver').contentWindow;
		// Get a reference to the 'Send Message' button.

		// A function to handle sending messages to the iframe window.
		$scope.sendMessageToIFrame=function(e) {
			if(!angular.equals(i%2,0)){
				// Prevent any default browser behaviour.
				e.preventDefault();
				$scope.touterConfig.freezeIcon='fa-unlock';
				$scope.touterConfig.freezeText='Configure your website';
				// Send a message with the text 'freeze' to the new window.
				$scope.touterConfig.iframe.contentWindow.postMessage('unfreeze', 'http://'+$scope.touterConfig.selectedDomainId.domainUrl);
			}
			else{
				// Prevent any default browser behaviour.
				e.preventDefault();
				$scope.touterConfig.freezeIcon='fa-lock';
				$scope.touterConfig.freezeText='Actual stage';
				$scope.touterConfig.TBFrame=true;
				// Send a message with the text 'unfreeze' to the new window.
				$scope.touterConfig.iframe.contentWindow.postMessage('freeze', 'http://'+$scope.touterConfig.selectedDomainId.domainUrl);
			}
			i++;
		};

	$scope.configImg={};
	//function to submit the configuration details.
	$scope.FnSaveSocialConfigDetails=function(){
		
		SocialConfigHome.FnSaveSocialConfigDetails($scope); //function to save the configuration
	};

	//function to add the specific selected node into a current cursor position.
	$scope.addHtmlAtCaret = function (html) {
		
	document.getElementById('contentEditDiv').focus(); //to focus the content editable div
	var sel, range;
	if (window.getSelection) {
	// IE9 and non-IE
	sel = window.getSelection();

	if (sel.getRangeAt && sel.rangeCount) {
		range = sel.getRangeAt(0);
		range.deleteContents();

	// Range.createContextualFragment() would be useful here but is
	// non-standard and not supported in all browsers (IE9, for one)
	var el = document.createElement("div");
	el.innerHTML = html;
	$compile(el)($scope);

	var frag = document.createDocumentFragment(), node, lastNode;
	while ( (node = el.firstChild) ) {
		lastNode = frag.appendChild(node);
	}
	range.insertNode(frag);
	//$scope.field.schema.name= document.getElementById('contentEditDiv').innerHTML;  //updating the model value from content editable div

	// Preserve the selection
	if (lastNode) {
		range = range.cloneRange();
		range.setStartAfter(lastNode);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
	}
	}
	} else if (document.selection && document.selection.type !== "Control") {
		// IE < 9
		document.selection.createRange().pasteHTML(html);
	}
	//console.log(document.getElementById('contentEditDiv').innerHTML);
		//pushing the updated content to the scope object
		$scope.formData.content= document.getElementById('contentEditDiv').innerHTML;

	};

	$scope.loadExistingConfigDetails=function(){
		//alert('in');
	};

	//function used for image preview.
	$scope.getFile = function () {
       
	fileReader.readAsDataUrl($scope.file, $scope)
							.then(function(result) {
							$scope.touterConfig.imageSrc = result;
						});
	};

	//loading the channel list from corresponding result
	$scope.fnLoadChannelsCallBack=function(result){
		$scope.touterConfig.featureList=result;
		
	}; 

	//callback of loading the broadcasttype template.
	$scope.fnLoadBroadcastTypeTemplateCallBack=function(result){
		console.log(result);
		if(!angular.equals(result,'error')){
			$scope.schema=result.schema.broadcastTypeTemplate.schema; //broadcast template initialise to scope schema object to load using form builder.
			if(!angular.equals(result.formData,undefined)){
				$scope.formData=result.formData;
			}
				//console.log(result);	
		}
	};
	//function to load the fb permission popup
	//$scope.fnfbPermissionAccess = function () {
	/**
	* Calling FB.login with required permissions specified
	* https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
	*/
	/*$scope.touterConfig.tempSelElemId='submit';
		ezfb.login(function (res) {
		/**
		* no manual $scope.$apply, I got that handled
		*/
		/*if (res.authResponse) {
		$scope.updateLoginStatus($scope.updateApiMe);
		}
		}, {scope: 'public_profile, email,user_likes,publish_actions,user_photos,status_update'});
	};*/

	$scope.fnfbPermissionAccess=function(){
		$facebook.login().then(function() {
			refresh();
		});
	};

	function refresh() {
		$facebook.api("/me").then( 
		function(response) {
			/*$scope.loginCredential={};
			$scope.signinform.$setPristine();
			$scope.loginCredential.id=response.id;
			$scope.socialData=response;
			$scope.socialData.mediaName="facebook";
			$scope.from_where="facebook";
			LoginService.fnloginService($scope);*/
		},
		function(err) {
			$scope.welcomeMsg = "Please log in";
			console.log("err");

		});
	}
	//function to get the access for our app from the user
	$scope.fnLnPermissionAccess = function() {
		$scope.touterConfig.tempSelElemId='username';
		$linkedIn.authorize().then(function(arg){
			$linkedIn.isAuthorized().then(function(status){
				if(angular.equals(status,true)){
					$scope.getLinkedInData();
				}
			});
		});
		
	};
	$scope.getLinkedInData= function(){
		$linkedIn.profile("~",["id","firstName","lastName","pictureUrl","publicProfileUrl","email-address","location","headline","phoneNumbers","network"],{scope:"r_fullprofile+r_emailaddress+rw_nus"}).then( 
		function(response) {
		console.log(response.values[0]);
			/*$scope.loginCredential={};
		$scope.signinform.$setPristine();
		$scope.loginCredential.id=response.id;
		$scope.socialData=response;
		$scope.socialData.mediaName="linkedIn";
		$scope.from_where="linkedIn";
		LoginService.fnloginService($scope);*/
		});
	};

	//function to select new feature type by clearing existing details
	$scope.fnSelectNew=function(){
		$scope.schema='';
		$scope.touterConfig.selectedFeatureType='';
	};


	//setting the watch functionality for changing the event status scope variable.
	$scope.$watch('touterConfig.elementId',function(){
		//cehcking for the broadcasttype and elementId has been selected or not
		if(!angular.equals($scope.touterConfig.selectedFeatureType,undefined)&&!angular.equals($scope.touterConfig.elementId,'')){
			SocialConfigHome.fnLoadBroadcastTypeTemplate($scope); //calling the service function to load existing element based config data
		}
	
	});



}]);


