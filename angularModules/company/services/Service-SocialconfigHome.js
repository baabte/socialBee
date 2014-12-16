
var app=angular.module('baabtra');
app.service('SocialconfigHome',['$http','SbConfig','$alert',function($http,SbConfig,$alert) {
//service function for sector loading
	this.FnSaveSocialConfigDetails=function($scope){
  
		var result;
		
		$http({
				url: SbConfig.BWS+'FnSaveSocialConfigDetails/',
				method: 'POST',
				data: JSON.stringify({'urmId':123,'websiteId':321,'value':$scope.message,'elementId':$scope.elementId,'event':$scope.selectedEvent,'feature':'fb','currentPage':$scope.currentPage}),
				withCredentials: false,
				contentType:'application/json',
				ataType:'json',
			}).
			success(function(data, status, headers, config) {
				if(angular.fromJson(JSON.parse(data))==='Insert'||angular.fromJson(JSON.parse(data))==='Update'){
					$alert({title: 'Success!', content: 'Successfully Saved!.', placement: 'top-right', type: 'info', show: true,animation: 'am-fade-and-slide-top',duration:2});
				}
				else{
					$alert({title: 'failure!', content: 'Some errors while saving!.', placement: 'top-right', type: 'info', show: true,animation: 'am-fade-and-slide-top',duration:2});
				}

			}).
		error(function(data, status, headers, config) {
			result='error';
			$scope.fnGetSectorsCallBack(result);
		}); 
		return result;
	};
	
}]);