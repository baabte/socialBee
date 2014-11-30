var app=angular.module('baabtra');
app.controller('SocialconfigurehomeCtrl',['$scope',function($scope){
	var i=0;
	$scope.freezeText='Unfreeze';
	$scope.button = {
		"toggle": true,
		"checkbox": {
		"left": false,
		"middle": true,
		"right": false
	},
		"radio": "left",
		"freezeIcon":"fa-unlock"
	};
	$scope.freezeIcon='fa-unlock';
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
			if(e.origin==="http://dev.baabtra.com"){
	            console.log(e.data);
                //messageEle.innerHTML="Message Received: "+e.data;
                //document.addEventListener('click', clickFunc);
             }
			// Do whatever you want to do with the data got from IFrame in Parent form.
		}, false);    
		var receiver;
		window.onload = function() {$scope.iframe.contentWindow.postMessage('unfreeze', 'http://dev.baabtra.com');};
		// Get the window displayed in the iframe.
		 receiver = $scope.iframe;//document.getElementById('receiver').contentWindow;
		console.log($scope.iframe);
		// Get a reference to the 'Send Message' button.
		//var btn = document.getElementById('send'); 

		// A function to handle sending messages.
		$scope.sendMessage=function(e) {
			if(i%2!==0){
				// Prevent any default browser behaviour.
				e.preventDefault();
				$scope.freezeIcon='fa-unlock';
				$scope.freezeText='Unfreeze';
				// Send a message with the text 'freeze' to the new window.
				$scope.iframe.contentWindow.postMessage('unfreeze', 'http://dev.baabtra.com');
			}
			else{

				// Prevent any default browser behaviour.
				e.preventDefault();
				$scope.freezeIcon='fa-lock';
				$scope.freezeText='Freeze';
				console.log($scope.iframe.contentWindow);
				// Send a message with the text 'unfreeze' to the new window.
				$scope.iframe.contentWindow.postMessage('freeze', 'http://dev.baabtra.com');
			}
			i++;
		};
	
		//<![CDATA[
        // window.onload=function(){
        /*function receiveMessage(e){	
         
          if(e.origin==="http://dev.baabtra.com"){
                console.log(e.data);
                //messageEle.innerHTML="Message Received: "+e.data;
                //document.addEventListener('click', clickFunc);
             }
          }
        /*function clickFunc(e) { //fuction which prevent the default behavior of specifc element which we clicked.
              e.preventDefault();
              console.log(e.target);
              window.parent.postMessage(e.target, "*");
              return false; 
        }*/
        //window.addEventListener('message',receiveMessage); //attaching message listener to recieve the message from parent window
        // }
        //]]>
  // Add an event listener that will execute the sendMessage() function
  // when the send button is clicked.
  
//}
}]);