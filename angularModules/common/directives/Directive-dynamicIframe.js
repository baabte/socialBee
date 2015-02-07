angular.module('baabtra').directive('iframe', ['bbConfig',function(bbConfig) { /* Directive to load the iframe dynamically.*/
              return function(scope, elm, attrs) {
                  var iframe = document.createElement('iframe');
                  iframe.setAttribute('class', 'embed-responsive-item');
                  iframe.setAttribute('id', 'IFrameWindow');
                  iframe.setAttribute('ng-disabled', 'true');
                  iframe.src=bbConfig.selectedDomain;
                  iframe.setAttribute('iframe-onload','hideLoading()');
                  elm[0].appendChild(iframe);
                  
                  scope.touterConfig.iframe=iframe;
              };
            }]);