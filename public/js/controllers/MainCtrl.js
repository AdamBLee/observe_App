angular.module('MainCtrl', ['harReportService'])

.controller('MainController', function($scope, $location, $mdToast, harReportService) {

  $scope.loading = false;

  $scope.validate = function() {

      $scope.loading = true;

        try {

					var parsedHarFile = JSON.parse($scope.harFile);

          if(!parsedHarFile.hasOwnProperty('log')) {
              throw e;
          };

          var logObject = parsedHarFile.log;

          if(!logObject.hasOwnProperty('pages')) {
              throw e;
          };
          if(!logObject.hasOwnProperty('entries')) {
              throw e;
          };

				} catch (e) {
          $scope.loading = false;
					console.log('not valid .har JSON');
          showErrorToast();
					return false;
				}

        harReportService.setHarJson($scope.harFile);
        harReportService.setParserHar(parsedHarFile);

        // $rootScope.harFile = $scope.harFile;
        $scope.loading = false;
				$location.path('/harReport');
				return true;
	};

  showErrorToast = function() {
          $mdToast.show({
            hideDelay   : 3000,
            position    : 'bottom right',
            controller  : 'ToastCtrl',
            templateUrl : '../views/error-toast-template.html'
          });
        };

})

.controller('ToastCtrl', function($scope, $mdToast, $mdDialog) {
      $scope.closeToast = function() {
        // if (isDlgOpen) return;
        $mdToast
          .hide()
          .then(function() {
            isDlgOpen = false;
          });
      };
});
