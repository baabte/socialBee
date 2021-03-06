angular.module('touterbee')

//Add scope.icon to individual controls
.directive('indicateVal', function() {
	return {
		restrict: 'A',
		require :["^?form",'ngModel'],
		link: function(scope, elem, attrs, ctrls) {

										
			scope.$watch(function (){return elem.context.required;/* define what to watch*/
}, function() {
					// the array to hold the symbols
					scope.symbolCollection = {
						'required': 'ti-star text-danger',
						'email':'ti-email text-info',
						'phone':'ti-mobile text-info',
						'date' : 'ti-calendar  text-info',
						'facebook': 'ti-facebook text-info',
						'twitter':'ti-twitter-alt text-info',
						'google':'ti-google text-info',
						'linkedin' : 'ti-linkedin  text-info',
						'amount' : 'ti-money text-info',
						'youtube':'ti-youtube text-info'

					};

						$(elem).parent().attr('class', 'input-group m-b col-xs-12');
						scope.icon=$('<span class="input-group-addon"></span>');

						scope.icon.addClass(scope.symbolCollection[attrs.indicateVal]);
						var add=true;

									

						
						if(add && !$(elem).parent().find("span").length){
							$(elem).parent().prepend(scope.icon);
						}


						
					});

				//setting a watch function on the elem.context.required attribute
				scope.$watch(function (){return ctrls[1].$invalid;/* define what to watch*/
				}, function(){

					//if the required attribute is set to true the color will change to red
						if(ctrls[1].$invalid){
							$(elem).parent().find("span").addClass('text-danger');
						}
						else{ //otherwise the color of the existing scope.icon will change to blue
							$(elem).parent().find("span").removeClass('text-danger').addClass('text-success');				
						}

				});
							
			
		}
	};

})

//to set atleast one required field in a group of fields
.directive('validateOneInMany', ['$parse', function($parse) {
	return {
		restrict: 'A',
		require: ["^?form",'ngModel'],
		link: function(scope, elem, attrs, ctrls) {

			//checking for the existence of the "validation-group" attribute and throwing the error
			if(!attrs.validationGroup){
				throw new Error('The "validate-one-in-many" directive needs a "validation-group" attribute to work properly');
			}

			//defining an object to hold the validation groups in a form context
			if(angular.equals(scope.validationGroups, undefined)) {
				scope.validationGroups={};
			}		

		    
			//pushing the elements with the same validation groups into an array in the object with the validation group as the key
			if(angular.equals(scope.validationGroups[attrs.validationGroup], undefined)) {			
			scope.validationGroups[attrs.validationGroup]=[];
			}
			scope.validationGroups[attrs.validationGroup].push(ctrls[1]);
			//.End


			//binding a change event to validate when the text changes
			scope.$watch(function (){return elem.context.value;/* define what to watch*/
},function(){				
			

				//defining a variable to hold the validation group name
				scope.vgName = attrs.validationGroup;
				
					
					//if the current element is valid
					if(!ctrls[1].$error.required) {	

						// if the control is valid setting the other controls in the same validation group to valid
						for (var i = 0; i < scope.validationGroups[scope.vgName].length; i++ ){	

								scope.validationGroups[scope.vgName][i].$setValidity("required", true);
						}
																		
						
					}else{

						var setAllRequired = true;

						// checking whether the value of the element i null, if so validate other controls and set the validity to true if any of the other fields holds a value
						if(angular.equals(elem.context.value.trim(),"") && !ctrls[0].$pristine)	{

							for (var j = 0; j < scope.validationGroups[scope.vgName].length; j++ ){	
								if(!angular.equals($( "input[name='" + scope.validationGroups[scope.vgName][j].$name + "']" ).val().trim(), "")){
									setAllRequired = false;
								}				

							} //.End for (var i = 0; i < scope.validationGroups[scope.vgName].length; i++ )

							// 2nd loop to set the controls valid or invalid in accordance with the setAllRequiredVariable
							for (var k = 0; k < scope.validationGroups[scope.vgName].length; k++ ){
								
								scope.validationGroups[scope.vgName][k].$setValidity("required", !setAllRequired);

							} //.End 2nd loop
								
						}//.End if(angular.equals(elem.context.value.trim(),""))

					}

				//.End if(!ctrl.$invalid)

				//}

			});// .End scope.$watch(function (){return elem.context.value	


		} //.End link
	};//. End return

}]); // .End directive('validateOneInMany'