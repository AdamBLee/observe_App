angular.module('harReportService', [])

.service('harReportService', ['$http', function($http) {

	var harJson = "";
	var parsedHar = {};


	return {

	findNumberOfHttpRequests : function (parsedHarJson) {
				var log = parsedHarJson.log;
				var entries = log.entries;

				return entries.length;
	},

	getFastestLoadingResources :function(resourcesWithLoadTimes) {

		resourcesWithLoadTimes.sort(function(a,b) {
			return parseFloat(b.loadTime) - parseFloat(a.loadTime);

		});

		return resourcesWithLoadTimes;

	},

	getSlowestLoadingResources : function(resourcesWithLoadTimes) {

		resourcesWithLoadTimes.sort(function(a,b) {
			return parseFloat(a.loadTime) - parseFloat(b.loadTime);

		});

		var toReturn = resourcesWithLoadTimes;
    toReturn.reverse();
		return toReturn;

	},


	findLargestResourceRequested : function (parsedHarJson) {
		var log = parsedHarJson.log;
		var entries = log.entries;

		var largestResource = {"name": "", "value" : 0}

		for(x in entries) {

			var entry = entries[x];
			var response = entry.response;
			var content = response.content;
			var size = content.size;

			var request = entry.request;
			var url = request.url;

			if(entry.response.content.size > largestResource.value) {
					largestResource.name = entry.request.url;
					largestResource.value = entry.response.content.size;
			}

		}

		return largestResource;

	},

	getAverageResourceLoadTime : function(parsedHarJson) {
		var log = parsedHarJson.log;
		var entries = log.entries;

		var numberOfResources = 0;
		var	totalTime = 0;

		for(x in entries) {

			numberOfResources = numberOfResources + 1;

			var entry = entries[x];
			var response = entry.response;
			var content = response.content;
			var size = content.size;

			var request = entry.request;
			var url = request.url;

			var timings = entry.timings;

			for (var property in timings) {
	    	if (timings.hasOwnProperty(property)) {
					if(timings[property] != -1){
							totalTime = totalTime + timings[property];
					}
				}
			}

		}
		var average = (totalTime / numberOfResources).toPrecision(3);

		return average;

	},

	findResourcesWithLoadTime : function(parsedHarJson) {
		var log = parsedHarJson.log;
		var entries = log.entries;

		var loadedResources = [];

		for(x in entries) {

			var entry = entries[x];
			var response = entry.response;

			var request = entry.request;
			var url = request.url;

			var timings = entry.timings;

			var totalResourceLoadTime = 0;

			for (var property in timings) {
	    	if (timings.hasOwnProperty(property)) {
					if(timings[property] != -1){
							totalResourceLoadTime = totalResourceLoadTime + timings[property];
					}
				}
			}

			loadedResources.push({"name": url, "loadTime": totalResourceLoadTime});

		}

		return loadedResources;

	},

	// findFastestResourcesToLoad : function(parsedHarJson) {
	// 	var log = parsedHarJson.log;
	// 	var entries = log.entries;
	//
	// 	for(x in entries) {
	//
	// 		var entry = entries[x];
	// 		var response = entry.response;
	// 		var content = response.content;
	// 		var size = content.size;
	//
	// 		var request = entry.request;
	// 		var url = request.url;
	//
	// 		if(entry.response.content.size > largestResource.value) {
	//
	// 		}
	//
	// 	}
	//
	//
	// },

	setParserHar : function(parsedHarFile) {
		this.parsedHar = parsedHarFile;
		return;
	},

	getParsedHar : function () {
			return this.parsedHar;
	},

	setHarJson : function(harJsonString) {
		this.harJson = harJsonString;
		return;
	},

	getHarJson : function() {
		return this.harJson;
	}

};

}]);
