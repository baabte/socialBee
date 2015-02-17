var app=angular.module('touterbee');
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
      socialConfigData.urmId=$scope.urmId;
      socialConfigData.websiteId=$scope.touterConfig.selectedDomainId._id.$oid;
      socialConfigData.feature='fb';
      socialConfigData.elementId=$scope.touterConfig.elementId;
      socialConfigData.currentPage=$scope.touterConfig.currentPage;
      socialConfigData.channelId=$scope.touterConfig.featureId;
      socialConfigData.broadcastTypeId=$scope.touterConfig.selectedFeatureType.btId.$oid;
      socialConfigData.fieldObj=$scope.formData;
      socialConfigData.fieldObj.featureFunction='fn_'+$scope.touterConfig.channelName+'_'+$scope.touterConfig.selectedFeatureType.name;
  if(!angular.equals($scope.configFileObj,null)||!angular.equals($scope.configFileObj,undefined)){ //checking for image file exists or not
      //adding all the required fields into the custom json object
       $upload.upload({
           url: bbConfig.BWS+'FnSaveSocialConfigDetails/',
           file: $scope.configFileObj,
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
    }
    else{ // exicutes when there will not be any file exists
      $http({
           url: bbConfig.BWS+'FnSaveSocialConfigDetails/',
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
                $alert({title: 'Failed!', content: 'Some error found while saving the config details.', placement: 'top-right', type: 'info', show: true,animation: 'am-fade-and-slide-top',duration:2});
             });  

    }
     return result;
   };


    this.fnLoadChannels=function($scope){
      var result;
     $http({
           url: bbConfig.BWS+'FnLoadChannels/',
           data: JSON.stringify({domainId:$scope.touterConfig.selectedDomainId._id.$oid}),
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


    this.fnLoadBroadcastTypeTemplate=function($scope){ //service to load the broadcast template for specific broadcast type
      var result;

      var inputObj={channelId:$scope.touterConfig.featureId,broadcastTypeId:$scope.touterConfig.selectedFeatureType.btId.$oid,urmId:$scope.urmId,domainId:$scope.touterConfig.selectedDomainId._id.$oid,currentPage:$scope.touterConfig.currentPage,elementId:$scope.touterConfig.elementId};
      $http({
           url: bbConfig.BWS+'fnLoadBroadcastTypeTemplate/',
           data: JSON.stringify(inputObj),
           method: 'POST',
           withCredentials: false,
           contentType:'application/json',
           dataType:'json',
           }).
              success(function(data, status, headers, config) { //success response from server
                result=angular.fromJson(JSON.parse(data));
                var outcomeObj={};                        //outcome object which contain the formData and schema
                outcomeObj.formData=result.formData;
                for(var key in result.schema){            //looping through template objects
                  if(angular.equals(result.schema[key].btId.$oid,$scope.touterConfig.selectedFeatureType.btId.$oid)){ //comparing the current selected broadcastTypeId with loaded btId
                    outcomeObj.schema=result.schema[key];
                    $scope.fnLoadBroadcastTypeTemplateCallBack(outcomeObj);
                  }
                }
               
              }). error(function(data, status, headers, config) {
                result='error';
                //$scope.featureList=[];
                $scope.fnLoadBroadcastTypeTemplateCallBack(result);

             });  

     return result;
    };
}]);