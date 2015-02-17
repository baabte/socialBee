angular.module('touterbee').directive('iframe', ['bbConfig',function(bbConfig) { /* Directive to load the iframe dynamically.*/
             
  return {
    restrict: 'A',
     scope: {
           iframeObj:'=',
           domainUrl:'='
                  },
      link: function(scope, elm, attrs) {
                  var iframe = document.createElement('iframe');
                  iframe.setAttribute('class', 'embed-responsive-item');
                  iframe.setAttribute('id', 'IFrameWindow');
                  iframe.setAttribute('ng-disabled', 'true');
                  elm[0].appendChild(iframe);
                  scope.iframeObj=iframe;
                  scope.$watch('domainUrl',function(){
                    var tarea = scope.domainUrl;
                    if(!angular.equals(scope.domainUrl,undefined)){
                      if (angular.equals(tarea.indexOf("http://"),0) || angular.equals(tarea.indexOf("https://"),0)) {
                        iframe.src=scope.domainUrl;
                      }else{
                        iframe.src='http://'+scope.domainUrl;
                      }
                    }else{
                      iframe.src='http://www.example.com';
                    }
                  });
                  
      }
  };
}]);


