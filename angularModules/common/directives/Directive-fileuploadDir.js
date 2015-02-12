angular.module('baabtra').directive('fileuploadDir',['$parse', function ($parse) {
	return {
		restrict: 'A',
      link: function postLink(scope, element, attrs) {

        var model = $parse(attrs.fileuploadDir);
            var modelSetter = model.assign;
            
            element.bind('change', function(){
              console.log( element[0].files[0]);
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
      });
     }
	};
}]);
