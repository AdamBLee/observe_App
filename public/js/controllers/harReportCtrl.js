angular.module('harReportCtrl', ['harReportService', 'chart.js'])

.controller('harReportController', function($scope, harReportService) {

	//How to get access to the JSON from other controller?

	var harString = harReportService.getHarJson();
	var parsedHar = harReportService.getParsedHar();

	var getPrimaryPageLoadtime = function() {
		// var log = parsedHar.log;
		// var pages = log.pages;
		// var page = pages[0];
		// var pageTimings = page.pageTimings;
		// var loadTime = pageTimings.onLoad;
		//
		// return Math.round(loadTime);

	}();

	$scope.highlights = [
		{
				"name": "Primary Page Load Time",
				"value": getPrimaryPageLoadtime + " ms"
		},
		{
				"name": "Pages",
				"value": "50ish"
		},
		{
				"name": "Request Times",
				"value": "1000ms"
		}
	]


	$scope.test = function () {

		var x = "x";
		var y = "y";

	}


	var data = {
		 labels : ["January","February","March","April","May","June","July"],
		 datasets : [
			 {
				 fillColor : "rgba(220,220,220,0.5)",
				 strokeColor : "rgba(220,220,220,1)",
				 pointColor : "rgba(220,220,220,1)",
				 pointStrokeColor : "#fff",
				 data : [65,59,90,81,56,55,40]
			 },
			 {
				 fillColor : "rgba(151,187,205,0.5)",
				 strokeColor : "rgba(151,187,205,1)",
				 pointColor : "rgba(151,187,205,1)",
				 pointStrokeColor : "#fff",
				 data : [28,48,40,19,96,27,100]
			 }
		 ]
	 }

	 $scope.myChart = data;



});
