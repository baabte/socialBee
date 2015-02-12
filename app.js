// $stateProvider.state('UserSignup', {
//         url: 'signup',
//         templateUrl: 'angularModules/signup/partials/Partial-UserSignup.html'
//     });
// $stateProvider.state('SocialConfigHome', {
//         url: 'common',
//         templateUrl: 'angularModules/common/partials/Partial-SocialConfigHome.html'
//     });
// $stateProvider.state('SocialChannelConfigHome', {
//         url: 'common',
//         templateUrl: 'angularModules/common/partials/Partial-SocialChannelConfigHome.html'
//     });
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
        'ui.load',
        'oc.lazyLoad',
        'ui.jp',
        'angular-loading-bar',
        'LocalStorageModule',
        'ui.tree',
        'xtForm',
        'xeditable',
        'angularFileUpload',
        'uiRouterStyles',
        'schemaForm',
        'ui.select',
        'fg',
        'ui.bootstrap.contextMenu',
        'ngFacebook',
        'perfect_scrollbar',
        'googleplus',
        'ngLinkedIn',
        'perfect_scrollbar',
        'ngTagsInput',
        'ngQuill',
        'hierarchical-selector',
        'angularSpectrumColorpicker',       
        'angular-growl',
        'angular-ladda',
        'angular-intro',
        'contenteditable'

      ]).run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});
      

}());

