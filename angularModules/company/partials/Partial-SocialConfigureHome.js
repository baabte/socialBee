var app=angular.module('baabtra');
app.controller('SocialconfigurehomeCtrl',['$scope','$modal','SocialconfigHome','$upload','$alert','$compile','fileReader','growl',function($scope, $modal,SocialconfigHome,$upload,$alert,$compile,fileReader,growl){
	var i=0;
	$scope.touterConfig={};
	$scope.fileObj={};
	$scope.touterConfig.websiteList=[{'1':'dev.baabtra.com'}];
	$scope.touterConfig.freezeText='Configur your website'; //text for freeze button
	$scope.touterConfig.steps=[{'stepNo':1,'name':'Configure Website','iconUrl':'glyphicon-pencil','active':'active'},{'stepNo':2,'name':'Feature Selection','iconUrl':'glyphicon-saved','active':''},{'stepNo':3,'name':'Feture type selection','iconUrl':'glyphicon-saved','active':''},{'stepNo':4,'name':'Save configuration','iconUrl':'glyphicon-saved','active':''}];
	$scope.touterConfig.valid=true;
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

	$scope.formData={};
	$scope.myFormData = {};
	$scope.touterConfig.loading = true;
	$scope.touterConfig.addEleIcon='fa-plus';
	//tooltip for add element button
	$scope.touterConfig.addEleTooltip={
		'title':'selecting element to get the value',
	};

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
		
	};

	//function to show hide the navigation the website step-1
	$scope.FnShowHideNavigation=function(index){

		var i;
		for(i=0;i<$scope.touterConfig.steps.length;i++){
			
			if(i===index){
				$scope.touterConfig.steps[i].active='active';
				
			}
			else{
				
				$scope.touterConfig.steps[i].active='';
			}

			

		}
		
		if(index===0){  
			$scope.touterConfig.websiteConfigContainer=false;
			$scope.touterConfig.selectedFeatureAction=false;
			$scope.touterConfig.selectFeatureContainer=false;
			$scope.touterConfig.loadIframeContainer=false;
			
		}
		else if(index===1){
			$scope.touterConfig.websiteConfigContainer=true;
			$scope.touterConfig.selectFeatureContainer=true;
			$scope.touterConfig.loadIframeContainer=false;
			$scope.touterConfig.selectedFeatureAction=false;
		}
		else if(index===2){
			$scope.touterConfig.selectedFeatureAction=true;
			$scope.touterConfig.selectFeatureContainer=false;
			$scope.touterConfig.websiteConfigContainer=true;
			$scope.touterConfig.loadIframeContainer=false;
		}
		else{
			$scope.touterConfig.loadIframeContainer=true;
			$scope.touterConfig.selectedFeatureAction=false;
			$scope.touterConfig.selectFeatureContainer=false;
			$scope.touterConfig.websiteConfigContainer=true;
		}

	};
	$scope.touterConfig.featureId='';
	//function to selecting specific feature
	$scope.fnSelectFeature=function(index,id,src){
		$scope.FnShowHideNavigation(2);
		$scope.touterConfig.featureId=id;
		$scope.touterConfig.featureTypesList=$scope.touterConfig.featureList[index].broadcastTypes;
		$scope.touterConfig.featureImg=src;
				
	};

	$scope.fnSelectFeatureType=function(){
		$scope.FnShowHideNavigation(3);
		SocialconfigHome.fnLoadBroadcastTypeTemplate($scope);
	};
	//loading the features....

	//calling the service to load the channels.
	SocialconfigHome.fnLoadChannels($scope);


	//deleting events function
	$scope.fnDeleteEvent=function(){
		$scope.touterConfig.valid=true;
		domElement=[];                //deleteing all the elements from the the selected array.
		domElementvalue=[];
		$scope.touterConfig.deleteEventElem=false; //hiding the delete event icon
		$scope.touterConfig.clickEventLabel='Not selected any event!';
		$scope.touterConfig.eventListContainer=false;

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
						//binding click element to the selected dom element
						if(!angular.equals(e.data.id,undefined) && e.data.id!==''){ //checking for id attribute exists or not
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
				if(e.data.type==='text' || e.data.type==='textarea') {
						
							if(e.data.id!==undefined){		//checking the value of the selected element id is defined or not. 
								$scope.addHtmlAtCaret('&nbsp;<span draggable="true" contenteditable="false" class="btn m-v-xs btn-xs btn-default"> #'+e.data.id+'</span>&nbsp;'); //adding the selected id attribute for tracing.
								
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
			$scope.touterConfig.iframe.contentWindow.postMessage('unfreeze', 'http://localhost:9000/#/');
			
		};
		// Get the window displayed in the iframe.
		receiver = $scope.touterConfig.iframe;//document.getElementById('receiver').contentWindow;
		// Get a reference to the 'Send Message' button.

		// A function to handle sending messages to the iframe window.
		$scope.sendMessageToIFrame=function(e) {
			if(i%2!==0){
				// Prevent any default browser behaviour.
				e.preventDefault();
				$scope.touterConfig.freezeIcon='fa-unlock';
				$scope.touterConfig.freezeText='Configure your website';
				// Send a message with the text 'freeze' to the new window.
				$scope.touterConfig.iframe.contentWindow.postMessage('unfreeze', 'http://localhost:9000/#/');
			}
			else{
				// Prevent any default browser behaviour.
				e.preventDefault();
				$scope.touterConfig.freezeIcon='fa-lock';
				$scope.touterConfig.freezeText='Actual stage';
				$scope.touterConfig.TBFrame=true;
				// Send a message with the text 'unfreeze' to the new window.
				$scope.touterConfig.iframe.contentWindow.postMessage('freeze', 'http://localhost:9000/#/');
			}
			i++;
		};

	
	//function to submit the configuration details.
	$scope.FnSaveSocialConfigDetails=function(){
		//console.log($scope.formData);
		SocialconfigHome.FnSaveSocialConfigDetails($scope); //function to save the configuration
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
		if(result!=='error'){

			$scope.schema=result.schema[0].broadcastTypes[0].broadcastTypeTemplate.schema; //broadcast template initialise to scope schema object to load using form builder.
			if(!angular.equals(result.formData,undefined)){
				$scope.formData=result.formData;
			}
				//console.log(result);	
		}
	}; 
	

}]);