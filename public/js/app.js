var observeApp = angular.module('observeApp', ['ngRoute', 'ngMaterial', 'appRoutes', 'MainCtrl', 'harReportCtrl', 'harReportService', 'chart.js'])


.controller("BarCtrl", function ($scope, harReportService) {



  $scope.getSlowestLoadingResources = function() {
    $scope.chartName = "Slowest Loading Resources (ms)";

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
    // $scope.labelsAndUrlsToShow = $scope.labelsAndUrls;
    $scope.labelsAndUrlsButtonMessage = "See Full Urls";
    $scope.toggleState = "abb";
    $scope.labelsAndUrlsToShow = $scope.abbLabelsAndUrls;
    $scope.showNetworkPhases = false;

  };

  $scope.getFastestLoadingResources = function() {
    $scope.chartName = "Fastest Loading Resources (ms)";

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
    // $scope.labelsAndUrlsToShow = $scope.labelsAndUrls;
    $scope.labelsAndUrlsButtonMessage = "See Full Urls";
    $scope.toggleState = "abb";
    $scope.labelsAndUrlsToShow = $scope.abbLabelsAndUrls;
    $scope.showNetworkPhases = false;

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

  };


  $scope.toggleNetworkTimings = function () {

    if($scope.networkPhasesTimings == "total") {
      $scope.networkPhasesTimings = "average";
      $scope.networkTimingsButtonMessage = "See Average Network Phases Timings";
      $scope.getAverageHttpPhasesLoadTimes();

    } else {

      $scope.networkPhasesTimings = "total";
      $scope.networkTimingsButtonMessage = "See Total Network Phases Timings";
      $scope.getTotalHttpPhasesLoadTimes();
    }


  };

  $scope.getAverageHttpPhasesLoadTimes = function() {
    $scope.chartName = "Average time (ms) for HTTP Request Network Phases";

    var labels = [];
    var series = [];
    var data = [];
    var labelsAndUrls = [];

    var parsedHarJson = harReportService.getParsedHar();
    var avgNetworkPhasesLoadTimes = harReportService.getResourcesWithHttpNetworkPhaseTimes(parsedHarJson, true);

    for(var x in avgNetworkPhasesLoadTimes){
      if(avgNetworkPhasesLoadTimes.hasOwnProperty(x)) {
        labels.push(x);
        data.push(avgNetworkPhasesLoadTimes[x]);

      }
    }

    $scope.networkPhasesTimings = "average";
    $scope.networkTimingsButtonMessage = "See Total Network Phases Timings"
    $scope.labels = labels;
    $scope.data = [];
    $scope.data.push(data);
    $scope.series = "Network Phases";
    $scope.labelsAndUrls = [];
    createAbbreviatedUrls();
    $scope.abbLabelsAndUrls = [];
    $scope.labelsAndUrlsToShow = [];
    $scope.toggleState = "";
    $scope.showNetworkPhases = true;
  };

  $scope.getTotalHttpPhasesLoadTimes = function() {
    $scope.chartName = "Total time (ms) for HTTP Request Network Phases";

    var labels = [];
    var series = [];
    var data = [];
    var labelsAndUrls = [];

    var parsedHarJson = harReportService.getParsedHar();
    var totalNetworkPhasesLoadTimes = harReportService.getResourcesWithHttpNetworkPhaseTimes(parsedHarJson, false);

    for(x in totalNetworkPhasesLoadTimes){
      if(totalNetworkPhasesLoadTimes.hasOwnProperty(x)) {
        labels.push(x);
        data.push(totalNetworkPhasesLoadTimes[x]);
      }
    }

    $scope.networkPhasesTimings = "total";
    $scope.networkTimingsButtonMessage = "See Average Network Phases Timings"
    $scope.labels = labels;
    $scope.data = [];
    $scope.data.push(data);
    $scope.series = "Network Phases";
    $scope.labelsAndUrls = [];
    createAbbreviatedUrls();
    $scope.abbLabelsAndUrls = [];
    $scope.labelsAndUrlsToShow = [];
    $scope.toggleState = "";
    $scope.showNetworkPhases = true;
  };




  $scope.getFastestLoadingResources();

})

.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

;
