var app=angular.module('baabtra');
app.service('SocialConfigHome',['$http','bbConfig','$alert','$upload','$compile','$timeout','$filter',function($http,bbConfig,$alert,$upload,$compile,$timeout,$filter) {

  //service function to load the domains
  this.fnLoadDomains=function($scope){
     $http({ 
            method: 'post',
            url: bbConfig.BWS+'FnLoadDomainForConfig/',
            data:{'urmId':$scope.urmId},
            contentType:'application/json; charset=UTF-8',
           }).
              success(function(data, status, headers, config) { //success respond from server
               $scope.touterConfig.domainList=angular.fromJson(JSON.parse(data));
              }).
              error(function(data, status, headers, config) {
             });
  };
  //service function to save the social config details
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
      }
      socialConfigData.fieldObj=$scope.formData;
      console.log(featureImg);
      //adding all the required fields into the custom json object
       $upload.upload({
           url: bbConfig.BWS+'FnSaveSocialConfigDetails/',
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
        //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      });



     return result;
   };


    this.fnLoadChannels=function($scope){
      var result;
     $http({
           url: bbConfig.BWS+'FnLoadChannels/',
           data: JSON.stringify({domainId:$scope.touterConfig.selectedDomainId}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                        
                result=angular.fromJson(JSON.parse(data));
                if(!angular.equals(result,undefined)){
                  $scope.fnLoadChannelsCallBack(result[0].channelObj);
                }
              
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
           url: bbConfig.BWS+'fnLoadBroadcastTypeTemplate/',
           data: JSON.stringify({channelId:$scope.touterConfig.featureId,broadcastTypeId:$scope.touterConfig.selectedFeatureType,urmId:$scope.urmId,domainId:$scope.touterConfig.selectedDomainId,currentPage:'http://localhost:9000/#/',elementId:$scope.touterConfig.tempSelElemId}),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) {
                        
                result=angular.fromJson(JSON.parse(data));
                 
                 var ss={};
                 ss.results=result.schema;
                 console.log(ss);
                 var single_object = $filter('filter')(ss.results, function (d) {return btId.$oid === $scope.touterConfig.selectedFeatureType;});
                console.log(single_object);
                //$scope.fnLoadBroadcastTypeTemplateCallBack(result);
              }). error(function(data, status, headers, config) {
                result='error';
                //$scope.featureList=[];
                $scope.fnLoadBroadcastTypeTemplateCallBack(result);

             });  

     return result;
    };
}]);