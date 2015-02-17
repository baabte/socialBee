angular.module('touterbee').directive('myIframe', function(){ /*Directive to load the iframe window */
    var linkFn = function(scope, element, attrs) { 
          element.find('iframe').bind('load', function (event) {
          //event.target.contentWindow.scrollTo(0,400);
          var iframe=event.target;
          scope.iframeObj=iframe;
          //event.target.contentWindow.postMessage('unfreeze', 'http://localhost:9000/#/');
          document.getElementById("loader").style.display = "none"; //hiding the loader
          iframe.contentWindow.onbeforeunload = function() {
            document.getElementById("loader").style.display = "block"; //showing the loader
          };
          //including css inside iframe document
          var cssLink = document.createElement("link");
          cssLink.href = "bower_components/template/dist/customstyles.css";
          cssLink .rel = "stylesheet";  
          cssLink .type = "text/css";  
          iframe.document.body.appendChild(cssLink);
        });
          //scope.touterConfig.iframe=angular.element(element.find('iframe'));
         // console.log(iframe[0]);

    };
    return {
      restrict: 'EA',
      //require: ["^?form",'ngModel'],
      scope: {
        src:'&src',
        height: '@height',
        width: '@width',
        scrolling: '@scrolling',
        iframeObj:'='
      },
      template: '<iframe  class="frame" height="{{height}}" width="{{width}}" frameborder="0" border="0" marginwidth="0" marginheight="0" scrolling="{{scrolling}}" src="{{src()}}"></iframe><div id="loader"><div id="d1"></div><div id="d2"></div><div id="d3"></div>	<div id="d4"></div>	<div id="d5"></div>	</div>',
      link : linkFn
    };
  });