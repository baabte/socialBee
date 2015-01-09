
var app=angular.module('baabtra');
app.service('SocialconfigHome',['$http','SbConfig','$alert','$upload','$compile','$timeout',function($http,SbConfig,$alert,$upload,$compile,$timeout) {

	  this.FnSaveSocialConfigDetails=function($scope){
      var result;
      var featureImg;
      var socilaConfigData={};
      socilaConfigData.urmId=123;
      socilaConfigData.websiteId=321;
      socilaConfigData.feature='fb';
      socilaConfigData.fieldObj=$scope.formData;
      if(!angular.equals($scope.formData.image,undefined)){
         featureImg= $scope.formData.image;
         delete socilaConfigData.fieldObj.image; //deleting the image property from the formdata object
      }
      //adding all the required fields into the custom json object
      
       console.log($scope.formData);
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
           data: JSON.stringify({channelId:$scope.touterConfig.featureId,broadcastTypeId:$scope.touterConfig.selectedFeatureType}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                        
                result=angular.fromJson(JSON.parse(data));
                $scope.fnLoadBroadcastTypeTemplateCallBack(result[0].broadcastTypes[0].broadcastTypeTemplate.schema);
              }). error(function(data, status, headers, config) {
                result='error';
                //$scope.featureList=[];
                $scope.fnLoadBroadcastTypeTemplateCallBack(result);

             });  

     return result;
    };
}]);