
var app=angular.module('baabtra');
app.service('SocialconfigHome',['$http','SbConfig','$alert','$upload','$compile','$timeout',function($http,SbConfig,$alert,$upload,$compile,$timeout) {

	  this.FnSaveSocialConfigDetails=function($scope){
      var result;
      var featureImg;
      var socialConfigData={};
      socialConfigData.urmId=123;
      socialConfigData.websiteId=321;
      socialConfigData.feature='fb';
      socialConfigData.elementId=$scope.touterConfig.elementId;
      socialConfigData.currentPage=$scope.touterConfig.currentPage;
      socialConfigData.channelId=$scope.touterConfig.featureId;
      socialConfigData.broadcastTypeId=$scope.touterConfig.selectedFeatureType;
      if(!angular.equals($scope.fileObj.image,undefined)){
         featureImg= $scope.fileObj.image;
         //delete $scope.formData['image']; //deleting the image property from the formdata object
      }
      socialConfigData.fieldObj=$scope.formData;
      console.log(featureImg);
      //adding all the required fields into the custom json object
       $upload.upload({
           url: SbConfig.BWS+'FnSaveSocialConfigDetails/',
           file: featureImg,
           data: socialConfigData,
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
           data: JSON.stringify({channelId:$scope.touterConfig.featureId,broadcastTypeId:$scope.touterConfig.selectedFeatureType,urmId:'123',websiteId:'321',currentPage:'http://localhost:9000/#/',elementId:'username'}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                        
                result=angular.fromJson(JSON.parse(data));
                
                $scope.fnLoadBroadcastTypeTemplateCallBack(result);
              }). error(function(data, status, headers, config) {
                result='error';
                //$scope.featureList=[];
                $scope.fnLoadBroadcastTypeTemplateCallBack(result);

             });  

     return result;
    };
}]);