

(function() {

    'use strict';

    /**
     * @ngdoc overview
     * @name app
     * @description
     * # app
     *
     * Main module of the application.
     */
    angular
      .module('baabtra', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngSanitize',
        'ngTouch',
        'ngStorage',
        'ui.router',
        'ui.utils',
        'mgcrea.ngStrap',
        'pascalprecht.translate',
        'oc.lazyLoad',
        'ui.load',
        'ui.jp',
        'angular-loading-bar',
        'LocalStorageModule',
        'xtForm',
        'textAngular',
        'ngQuill',
        'angularFileUpload',
        'contenteditable',
        'schemaForm',
        'fg',
        'angular-growl'
      ])
      .config( ['$stateProvider',
          function ( $stateProvider) {

            $stateProvider.state('signup', {
                url: '/signup',
                controller: 'SignupCtrl',
                templateUrl: 'angularModules/company/partials/Partial-signup.html'
              });
      }])
      .config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
    
        $stateProvider
    
        // route to show our basic form (/form)
        .state('page.profileCompletion', {
                url: '/profileCompletion',
                controller:'ProfilecompletionCtrl',
                templateUrl: 'angularModules/company/partials/Partial-profileCompletion.html'
        })
        
        // nested states 
        // each of these sections will have their own view
        // url will be nested (/form/profile)
        .state('page.profileCompletion.basic', {
            url: '/basic',
            templateUrl: 'angularModules/company/partials/Partial-form-basicInfo.html'
        })
        
        // url will be /form/interests
        .state('page.profileCompletion.contact', {
            url: '/contact',
            templateUrl: 'angularModules/company/partials/Partial-form-contactDetails.html'
        })
        
        // url will be /form/payment
        .state('page.profileCompletion.social', {
            url: '/social',
            templateUrl: 'angularModules/company/partials/Partial-form-socialDetails.html'
        });
       
        // catch all route
        // send users to the form page 
        //$urlRouterProvider.otherwise('/profileCompletion/basic');
      }])
      
      .config( ['$stateProvider',
          function ( $stateProvider) {

            $stateProvider.state('page.SocialConfigureHome', {
                url: '/SocialconfigHome',
                controller:'SocialconfigurehomeCtrl',
                templateUrl: 'angularModules/company/partials/Partial-SocialConfigureHome.html'
            });
      }])

.directive('iframeOnload', [function(){
return {
    scope: {
        callBack: '&iframeOnload'
    },
    link: function(scope, element, attrs){
        element.on('load', function(){
            return scope.callBack();
        });
    }
};
}])
  .directive('iframe', function() { /* Directive to load the iframe dynamically.*/
        return function(scope, elm, attrs) {
            var iframe = document.createElement('iframe');
            iframe.setAttribute('class', 'embed-responsive-item');
            iframe.setAttribute('id', 'IFrameWindow');
            iframe.setAttribute('ng-disabled', 'true');
            iframe.src="http://localhost:9000/#/";
            iframe.setAttribute('iframe-onload','hideLoading()');
            elm[0].appendChild(iframe);
            
            scope.touterConfig.iframe=iframe;
        };
      })
    .directive('tagClose', function() {
    return {
        restrict: 'E',
        replace: true,
        template: function(tElement, tAttrs) {
            //var isClickable = angular.isDefined(tAttrs.isClickable) && eval(tAttrs.isClickable) === true ? true : false;

            //var clickAttr = isClickable ? 'ng-click="onHandleClick()"' : '';

            return '<i ng-click="onHandleClick()" class="fa fa-close pull-right"></i>';
            
        },
        transclude: true,
        link: function(scope, element, attrs) {
            scope.onHandleClick = function() {
            
              console.log(element.parent());
                element.parent().remove();
             
            };
        }
    };
  })
  .directive("ngFileSelect",['fileReader','$alert',function(fileReader,$alert){  //directive for file onload preview

  return {
    //scope:true,
    link: function($scope,el,ctrls){
      //console.log(ctrls);
      el.bind("change", function(e){
        var file = (e.srcElement || e.target).files[0];
        $scope.getFile(file);
      });
      $scope.getFile = function (file) {
       
        fileReader.readAsDataUrl(file, $scope)
                      .then(function(result) {
                          var extArr=file.name.split('.');
                          var ext=extArr[extArr.length-1].toUpperCase();
                          
                          if(ext==='JPG'||ext==='JPEG'||ext==='PNG'||ext==='TIF'||ext==='GIF'){
                              $scope.$parent.$parent.$parent.$parent.fileObj.image=file; /*updating the parent scope object to get the selected file control*/
                              //console.log($scope.$parent.$parent.$parent.$parent.fileObj.image);
                              $scope.imageSrc = result;
                            }
                            else
                            {
                              //delete $scope.$parent.$parent.$parent.$parent.formData.image;
                              $alert({title: 'Failed!', content: 'Please select a image file', placement: 'top-right', type: 'warning', show: true,animation: 'am-fade-and-slide-top',duration:2});
                              return false;
                          }
                          
                      });
    };
    }
    
  };
  
  
}]);

}());