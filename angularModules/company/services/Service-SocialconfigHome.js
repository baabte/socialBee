
var app=angular.module('baabtra');
app.service('SocialconfigHome',['$http','SbConfig','$alert','$upload',function($http,SbConfig,$alert,$upload) {
//service function for sector loading
	/*this.FnSaveSocialConfigDetails=function($scope){
  
		var result;
		//alert('in');
		$http({
				url: SbConfig.BWS+'FnSaveSocialConfigDetails/',
				method: 'POST',
				data: JSON.stringify({'urmId':123,'websiteId':321,'value':$scope.message,'elementId':$scope.elementId,'event':$scope.selectedEvent,'feature':'fb','currentPage':$scope.currentPage}),
				file: $scope.myFiles,
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
	};*/

	  this.FnSaveSocialConfigDetails=function($scope){
      var result;
      var featureImg=$scope.myFiles[0];
      var extArr=featureImg.name.split('.');
      var ext=extArr[extArr.length-1].toUpperCase();
      var socilaConfigData={};
      socilaConfigData.urmId=123;
      socilaConfigData.websiteId=321;
      socilaConfigData.value=$scope.message;
      socilaConfigData.elementId=$scope.elementId;
      socilaConfigData.event=$scope.selectedEvent;
      socilaConfigData.feature='fb';
      socilaConfigData.currentPage=$scope.currentPage;
      
      // console.log(companyRegData);
      if(ext!=='JPG'&&ext!=='JPEG'&&ext!=='PNG'&&ext!=='TIF'&&ext!=='GIF'){
        result='fileErr';
        $alert({title: 'Failed!', content: 'Please choose the image file!.', placement: 'top-right', type: 'info', show: true,animation: 'am-fade-and-slide-top',duration:2});
        return 0;
      }
       $upload.upload({
           url: SbConfig.BWS+'FnSaveSocialConfigDetails/',
           file: featureImg,
           data: socilaConfigData,
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
      
           }).
       success(function( data, status, headers, config) {
                result='success';
                $alert({title: 'Success!', content: 'Successfully Saved the config details!.', placement: 'top-right', type: 'info', show: true,animation: 'am-fade-and-slide-top',duration:2});
              }).
       error(function(data, status, headers, config) {
                result='error';    
                $alert({title: 'Failed!', content: 'Some error found while uploading the config details.', placement: 'top-right', type: 'info', show: true,animation: 'am-fade-and-slide-top',duration:2});
             }).
       progress(function(evt) {
        console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      });


     return result;
   };


    this.fnLoadChannels=function($scope){
      var result;
      
     $http({
           url: SbConfig.BWS+'FnLoadChannels/',
           data: JSON.stringify({urmId:123,websiteId:111}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                        
                result=angular.fromJson(JSON.parse(data));
                
                $scope.fnLoadChannelsCallBack(result);
                //$scope.featureList=result;
                console.log($scope.featureList);
              }).
              error(function(data, status, headers, config) {
                result='error';
                //$scope.featureList=[];
                $scope.fnLoadChannelsCallBack(result);

             });  

     return result;

    };


    this.fnLoadBroadcastTypeTemplate=function($scope){
        var result;
      
     $http({
           url: SbConfig.BWS+'fnLoadBroadcastTypeTemplate/',
           data: JSON.stringify({channelId:$scope.featureId,broadcastTypeId:$scope.selectedFeatureType}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                        
                result=angular.fromJson(JSON.parse(data));
                console.log(result[0].broadcastTypes);
                //$scope.fnLoadChannelsCallBack(result);
                //$scope.form=result[0].broadcastTypes[0].broadcastTypeTemplate;
                $scope.schema=result[0].broadcastTypes[0].broadcastTypeTemplate.schema;
               // $scope.myFormData=result[0].broadcastTypes[0].broadcastTypeTemplate.schema;
                //console.log($scope.myFormData);
              }).
              error(function(data, status, headers, config) {
                result='error';
                //$scope.featureList=[];
                //$scope.fnLoadChannelsCallBack(result);

             });  

     return result;
    };
}]);