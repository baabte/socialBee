

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
        'xtForm'
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
  .directive('gist', function() {
        return function(scope, elm, attrs) {
            //var gistId = scope.gistId;
            //console.log(scope);
            var iframe = document.createElement('iframe');
            //iframe.setAttribute('width', '100%');
            //iframe.setAttribute('frameborder', '0');
            //iframe.id = "gist-" + gistId;
            iframe.setAttribute('class', 'embed-responsive-item');
            iframe.src="http://dev.baabtra.com";
            //iframe.class="embed-responsive-item";
            elm[0].appendChild(iframe);
            
                   scope.iframe=iframe;
               
            //var iframeHtml = '<html><head><base target="_parent"><style>table{font-size:12px;}</style></head><body onload="parent.document.getElementById(\'' + iframe.id + '\').style.height=document.body.scrollHeight + \'px\'"><scr' + 'ipt type="text/javascript" src="https://gist.github.com/' + gistId + '.js"></sc'+'ript></body></html>';
            //scope.val=iframe.contentWindow;
            //var doc = iframe.document;
            //if (iframe.contentDocument) doc = iframe.contentDocument;
            //else if (iframe.contentWindow) doc = iframe.contentWindow.document;
            //iframe.val=iframe.contentWindow;
            //doc.open();
            //doc.writeln(iframeHtml);
            //doc.close();

        };
      });
}());