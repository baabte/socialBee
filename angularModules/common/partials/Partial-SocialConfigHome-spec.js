describe('SocialconfighomeCtrl', function() {

	beforeEach(module('touterbee'));

	var scope,ctrl;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('SocialconfighomeCtrl', {$scope: scope});
    }));	

	it('should ...', inject(function() {

		//expect(1).toEqual(1);
		
	}));

});