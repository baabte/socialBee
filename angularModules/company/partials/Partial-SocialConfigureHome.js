var app=angular.module('baabtra');
app.controller('SocialconfigurehomeCtrl',['$scope','$modal','SocialconfigHome','$upload','$alert','$compile','fileReader',function($scope, $modal,SocialconfigHome,$upload,$alert,$compile,fileReader){
	var i=0;
	$scope.freezeText='Freeze'; //text for freeze button
	$scope.steps=[{'stepNo':1,'name':'Configure Website','iconUrl':'glyphicon-pencil','active':'active'},{'stepNo':2,'name':'Feature Selection','iconUrl':'glyphicon-saved','active':''},{'stepNo':3,'name':'Feture type selection','iconUrl':'glyphicon-saved','active':''},{'stepNo':4,'name':'Save configuration','iconUrl':'glyphicon-saved','active':''}];

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
	$scope.addEleIcon='fa-plus';
	//tooltip for add element button
	$scope.addEleTooltip={
		'title':'selecting element to get the value',
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
		$scope.steps[0].active='';
		$scope.steps[1].active='active';
		$scope.websiteConfigContainer=true; //hiding the existing container
		$scope.selectFeatureContainer=true;

		//$scope.steps.push({'name':'Select Feature','iconUrl':'glyphicon-saved','active':'active'});
		
	};

	//function to show hide the navigation the website step-1
	$scope.FnShowHideNavigation=function(index){
		
		//$scope.steps.splice(parseInt(index)+1,parseInt($scope.steps.length));
		if(index!==0){
			$scope.steps[index-1].active='';
		}

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
		
		$scope.steps[1].active='';
		$scope.steps[2].active='active';

		$scope.selectedFeatureAction=true;
		$scope.selectFeatureContainer=false;
		//$scope.steps.push({'name':'Select Feture type','iconUrl':'glyphicon-saved','active':'active'});
		
	};

	$scope.fnSelectFeatureType=function(){
		$scope.steps[2].active='';
		$scope.steps[3].active='active';
		$scope.loadIframeContainer=true;
		$scope.selectedFeatureAction=false;
		//$scope.steps.push({'name':'Save configuration','iconUrl':'glyphicon-saved','active':'active'});
		
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
					//domElementvalue=e.data; //variable to store the element whose value to be taken at the time of event trigger
					
					if(domElement.length===0){ //checking the consition that domElement Array have length is zero.
						domElement=e.data;
						$scope.clickEventLabel='You have selected one event for the specific element!';
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
					
				}
				
				var contentDiv=document.getElementById('contentEditDiv');
				if(e.data.type==='text' || e.data.type==='textarea') {
					if($scope.message!==undefined){ //checking for value is defined or not
					
						//console.log(contentDiv.textContent.length);
						//var contentDiv=document.getElementById('contentEditDiv').firstChild.lastChild.children[1].firstChild.contentWindow.document.body.firstChild.lastChild;
						//contentDiv.focus();
						//$scope.message = $scope.message + ' #'+e.data.id;
						//contentDiv.setAttribute('tabindex','0');
						
							if(e.data.id!==undefined){						//checking the value of the selected element id is defined or not. 
								$scope.addHtmlAtCaret('&nbsp;<span contenteditable="false" class="btn m-v-xs btn-xs btn-default"> #'+e.data.id+'</span>&nbsp;'); //adding the selected id attribute for tracing.
								
							}

							//contentDiv.innerHTML= contentDiv.innerHTML+ '<span style="color: rgb(0, 138, 0);"> #'+e.data.id+'</span>';

							//$scope.pasteHtmlAtCaret(' #'+e.data.id);
							//htmlObj=$scope.message + ' #'+e.data.id;
					}
				}
				else{
					if(e.data!=="loadJSsuccess"){ //checking the event triggered at loading page or not
						$alert({title: 'Not possible!', content: 'Please select any input text field to get the element value.', placement: 'top-right', type: 'info', show: true,animation: 'am-fade-and-slide-top',duration:5});
					}
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

		//$scope.$chan('message', function() { alert('in'); }, true);

		// A function to handle sending messages.
		$scope.sendMessageToIFrame=function(e) {
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


	$scope.addHtmlAtCaret = function (html) {
        document.getElementById('contentEditDiv').focus();
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
                $scope.message= document.getElementById('contentEditDiv').innerHTML; 
                
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
        //$scope.apply();
    };
	$scope.deleteTag=function(){
		console.log('in');
	};

	$scope.loadExistingConfigDetails=function(){
		//alert('in');
	};
	
	$scope.getFile = function () {
       
        fileReader.readAsDataUrl($scope.file, $scope)
                      .then(function(result) {
                          $scope.imageSrc = result;
                      });
    };
}]);