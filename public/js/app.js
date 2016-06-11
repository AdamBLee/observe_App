var observeApp = angular.module('observeApp', ['ngRoute', 'ngMaterial', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'harReportCtrl', 'harReportService', 'chart.js'])


.controller("BarCtrl", function ($scope, harReportService) {


  $scope.getSlowestLoadingResources = function() {

    $scope.chartName = "Slowest Loading Resources compared to the average";

    $scope.loading = true;

    // $scope.labels = [];
    // $scope.series = [];
    // $scope.data = [];

    labels = [];
    series = [];
    data = [];

    var parsedHarJson = harReportService.getParsedHar();
    var resourcesWithLoadTimes = harReportService.findResourcesWithLoadTime(parsedHarJson);

    var slowestResources = harReportService.getSlowestLoadingResources(resourcesWithLoadTimes);

    for(var i = 0; i < 5; i++) {

      var resource = slowestResources[i];
      labels.push(resource.name);
      data.push(resource.loadTime);
    }

//----TEST------------
      // labels = [];
      var testLabels = [];
      for(var x = 0; x < labels.length; x++) {
        testLabels.push(x+1);
      }

    // labels.push("Average Load Time");
    var avgResourceLoadTime = harReportService.getAverageResourceLoadTime(parsedHarJson);
    var avgFloat = parseInt(avgResourceLoadTime);

    testLabels.push("Avg");
    data.push(avgFloat);
//----TEST------------

    data.reverse();
    testLabels.reverse();
    $scope.labels = testLabels;
    $scope.data = [];
    $scope.data.push(data);
    $scope.series = ['Slowest'];

  };


  $scope.getFastestLoadingResources = function() {
    $scope.chartName = "Fastest Loading Resources compared to the average";

  };

  function getAverageHttpPhasesLoadTimes(numberOfResourcesToShow) {
    $scope.chartName = "Average time (ms) in each of the http request phases";

  };

  $scope.chartName = "test";


  $scope.labels = ['2000', '2007', '2008', '2009', '2010', '2011', '2012'];
  $scope.series = ['Series A', 'Series B'];

  $scope.data = [
    [65, 59, 80, 81, 56, 55, 40],
    [28, 48, 40, 19, 86, 27, 10]
  ];


})


;
