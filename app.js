

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
        'contenteditable'
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
     /* .config(function($popoverProvider) {
            angular.extend($popoverProvider.defaults, {
              animation: 'am-flip-x',
              trigger: 'focus',
              placement: 'top'
            });

          });*/
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
  .directive('iframe', function() {
        return function(scope, elm, attrs) {
            //var gistId = scope.gistId;
            //console.log(scope);
            var iframe = document.createElement('iframe');
            iframe.setAttribute('class', 'embed-responsive-item');
            iframe.setAttribute('id', 'IFrameWindow');
            iframe.setAttribute('ng-disabled', 'true');
            iframe.src="http://localhost:9000/#/";
            iframe.setAttribute('iframe-onload','hideLoading()');
            elm[0].appendChild(iframe);
            
            scope.iframe=iframe;
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
  .directive("ngFileSelect",function(){  //

  return {
    link: function($scope,el){
      
      el.bind("change", function(e){
      
        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      });
      
    }
    
  };
  
  
});

}());