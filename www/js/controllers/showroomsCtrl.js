angular.module('imageID.controllers').controller('ShowroomsCtrl', function($scope, $timeout, Restangular, $stateParams, MemoryService, $state) {
    $scope.data = {};

    $scope.$on("$ionicView.enter", function(event, data) {
        $('input').blur();
    });

    $scope.showroomsPromise = Restangular.all('type/showroom').getList().then(function(posts) {
        $scope.data.showrooms = posts;
    }).catch(function(err) {
        $scope.data.showrooms = [];
    });

    $scope.goToLocation = function(s) {
        window.open("http://www.google.com/maps/place/" + s.location.lat + "," + s.location.lng, '_system');
    }
    $scope.call = function(s) {
        window.open("tel:" + s.phone, '_system');
    }
    $scope.email = function(s) {
        window.open("mailto:" + s.email, '_system');
    }
    $scope.openShowroom = function(s) {
        MemoryService.putData("showroom", s);
        $state.go("app.showroom", { "id": s.id });
    }

    $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = group;
        }
    }
    $scope.isGroupShown = function(group) {
        return $scope.shownGroup === group;
    }
	
	$scope.goToDetails = function(sh){
		MemoryService.putData("showroom", sh);
		$state.go("app.showroom", { "id" : sh.id });
	}
});
