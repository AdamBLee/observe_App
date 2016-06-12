var observeApp = angular.module('observeApp', ['ngRoute', 'ngMaterial', 'appRoutes', 'MainCtrl', 'NerdCtrl', 'NerdService', 'harReportCtrl', 'harReportService', 'chart.js'])


.controller("BarCtrl", function ($scope, harReportService) {



  $scope.getSlowestLoadingResources = function() {
    $scope.chartName = "Slowest Loading Resources compared to the average";

    var labels = [];
    var series = [];
    var data = [];
    var labelsAndUrls = [];

    var parsedHarJson = harReportService.getParsedHar();
    var resourcesWithLoadTimes = harReportService.findResourcesWithLoadTime(parsedHarJson);

    var slowestResources = harReportService.getSlowestLoadingResources(resourcesWithLoadTimes);

    for(var i = 0; i < 5; i++) {
      var resource = slowestResources[i];
      labels.push(resource.name);
      data.push(resource.loadTime);
      labelsAndUrls.push({"label": i+1, "url": resource.name})
    }

      var testLabels = [];
      for(var x = 0; x < labels.length; x++) {
        testLabels.push(x+1);
      }

    var avgResourceLoadTime = harReportService.getAverageResourceLoadTime(parsedHarJson);
    var avgFloat = parseInt(avgResourceLoadTime);

    testLabels.push("Avg");
    data.push(avgFloat);
    // labelsAndUrls.push({"label": "Avg"})


    data.reverse();
    testLabels.reverse();
    $scope.labels = testLabels;
    $scope.data = [];
    $scope.data.push(data);
    $scope.series = ['Slowest'];
    $scope.labelsAndUrls = labelsAndUrls;
    createAbbreviatedUrls();
    $scope.labelsAndUrlsToShow = $scope.labelsAndUrls;
    $scope.labelsAndUrlsButtonMessage = "See Full Urls";
    $scope.toggleState = "abb";
    $scope.labelsAndUrlsToShow = $scope.abbLabelsAndUrls;

  };

  $scope.getFastestLoadingResources = function() {
    $scope.chartName = "Fastest Loading Resources compared to the average";

    var labels = [];
    var series = [];
    var data = [];
    var labelsAndUrls = [];

    var parsedHarJson = harReportService.getParsedHar();
    var resourcesWithLoadTimes = harReportService.findResourcesWithLoadTime(parsedHarJson);

    var fastestResources = harReportService.getFastestLoadingResources(resourcesWithLoadTimes);

    for(var i = 0; i < 5; i++) {
      var resource = fastestResources[i];
      labels.push(resource.name);
      data.push(resource.loadTime);
      labelsAndUrls.push({"label": i+1, "url": resource.name})
    }

      var testLabels = [];
      for(var x = 0; x < labels.length; x++) {
        testLabels.push(x+1);
      }

    var avgResourceLoadTime = harReportService.getAverageResourceLoadTime(parsedHarJson);
    var avgFloat = parseInt(avgResourceLoadTime);

    testLabels.push("Avg");
    data.push(avgFloat);

    data.reverse();
    testLabels.reverse();
    $scope.labels = testLabels;
    $scope.data = [];
    $scope.data.push(data);
    $scope.series = ['Fastest'];
    $scope.labelsAndUrls = labelsAndUrls;
    createAbbreviatedUrls();
    $scope.labelsAndUrlsToShow = $scope.labelsAndUrls;
    $scope.labelsAndUrlsButtonMessage = "See Full Urls";
    $scope.toggleState = "abb";
    $scope.labelsAndUrlsToShow = $scope.abbLabelsAndUrls;

  };

  function createAbbreviatedUrls() {

    var abbUrls = [];

    for(x in $scope.labelsAndUrls) {

      var url = $scope.labelsAndUrls[x].url;

      var abbUrl = url.substr(0,69);
      if(!abbUrl.length < 70){
        abbUrl = abbUrl + "...";
      }

      var labelAndUrl = {"label": $scope.labelsAndUrls[x].label, "url": abbUrl};

      abbUrls.push(labelAndUrl);

    }

    $scope.abbLabelsAndUrls = abbUrls;

  };

  $scope.toggleFullUrls = function () {

    if($scope.toggleState == "abb") {
        $scope.labelsAndUrlsToShow = $scope.labelsAndUrls;
        $scope.toggleState = "full";
        $scope.labelsAndUrlsButtonMessage = "See Abbreviated Urls";
    } else {
        $scope.labelsAndUrlsToShow = $scope.abbLabelsAndUrls;
        $scope.toggleState = "abb";
        $scope.labelsAndUrlsButtonMessage = "See Full Urls";
    }

  }


  function getAverageHttpPhasesLoadTimes(numberOfResourcesToShow) {
    $scope.chartName = "Average time (ms) in each of the http request phases";

  };


  $scope.getFastestLoadingResources();

  // $scope.chartName = "test";
  //
  //
  // $scope.labels = ['2000', '2007', '2008', '2009', '2010', '2011', '2012'];
  // $scope.series = ['Series A', 'Series B'];
  //
  // $scope.data = [
  //   [65, 59, 80, 81, 56, 55, 40],
  //   [28, 48, 40, 19, 86, 27, 10]
  // ];


})

.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

;
