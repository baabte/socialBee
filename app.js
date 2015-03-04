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
      .module('touterbee', [       
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
        'contenteditable',
        'ngImgCrop',
        'monospaced.qrcode'
      ]).run(function(editableOptions) {
  editableOptions.theme = 'bs3';
});


}());



