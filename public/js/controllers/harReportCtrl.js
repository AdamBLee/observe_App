angular.module('harReportCtrl', ['harReportService', 'chart.js'])

.controller('harReportController', function($scope, harReportService) {

	//How to get access to the JSON from other controller?

	var harString = harReportService.getHarJson();
	var parsedHar = harReportService.getParsedHar();

	var getPrimaryPageLoadtime = function() {
		var log = parsedHar.log;
		var pages = log.pages;
		var page = pages[0];
		var pageTimings = page.pageTimings;
		var loadTime = pageTimings.onLoad;

		return Math.round(loadTime);

	}();


	var largestResource = harReportService.findLargestResourceRequested(parsedHar);
	var resourcesWithLoadTimes = harReportService.findResourcesWithLoadTime(parsedHar);



	$scope.highlights = [
		{
				"name": "Primary URL",
				"value": harReportService.getPrimaryUrlRequested(parsedHar)
		},
		{
				"name": "Date Requested",
				"value": convertISO8601toDate(   harReportService.getDateUrlRequested(parsedHar))
		},
		{
				"name": "Primary Page Load Time",
				"value": getPrimaryPageLoadtime + " ms"
		},
		{
				"name": "Largest Resource Requested",
				"value": largestResource.name,
				"extra": largestResource.value + " bytes"
		},
		{
				"name": "Total Http Requests",
				"value": harReportService.findNumberOfHttpRequests(parsedHar)
		}
	];

		$scope.primaryUrlRequested = harReportService.getPrimaryUrlRequested(parsedHar);


		function convertISO8601toDate(dtstr) {

		  // replace anything but numbers by spaces
		  dtstr = dtstr.replace(/\D/g," ");

		  // trim any hanging white space
		  dtstr = dtstr.replace(/\s+$/,"");

		  // split on space
		  var dtcomps = dtstr.split(" ");

		  // not all ISO 8601 dates can convert, as is
		  // unless month and date specified, invalid
		  if (dtcomps.length < 3) return "invalid date";
		  // if time not provided, set to zero
		  if (dtcomps.length < 4) {
		    dtcomps[3] = 0;
		    dtcomps[4] = 0;
		    dtcomps[5] = 0;
		  }

		  // modify month between 1 based ISO 8601 and zero based Date
		  dtcomps[1]--;

		  var convdt = new Date(Date.UTC(dtcomps[0],dtcomps[1],dtcomps[2],dtcomps[3],dtcomps[4],dtcomps[5]));

		  return convdt.toUTCString();
		}


});
