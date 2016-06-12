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
			return parseFloat(a.loadTime) - parseFloat(b.loadTime);

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

	getResourcesWithHttpNetworkPhaseTimes : function(parsedHarJson) {
		var log = parsedHarJson.log;
		var entries = log.entries;

		var numberOfResources = 0;
		var networkPhasesTimings = {
			"blocked"	: 0,
			"dns" 		: 0,
			"connect" : 0,
			"send" 		: 0,
			"wait"		: 0,
			"receive"	: 0,
			"ssl"			: 0
		}

		for(x in entries) {

			numberOfResources = numberOfResources + 1;

			var entry = entries[x];

			var timings = entry.timings;

			for (var property in timings) {
				if (timings.hasOwnProperty(property)) {
					if(timings[property] != -1) {

					//Edit: DON'T create an object with timings for each resource
					//don't care which resources they are, just the
					//	the average of all of them together
						switch(property){
							case "blocked":
								networkPhasesTimings.blocked += timings[property];
								break;
							case "dns":
								networkPhasesTimings.dns += timings[property];
								break;
							case "connect":
								networkPhasesTimings.connect += timings[property];
								break;
							case "send":
								networkPhasesTimings.send += timings[property];
								break;
							case "wait":
								networkPhasesTimings.wait += timings[property];
								break;
							case "receive":
								networkPhasesTimings.receive += timings[property];
								break;
							case "ssl":
								networkPhasesTimings.ssl += timings[property];
								break;
							default:
								break;
						}
					}
				}
			}

			//compute averages
			//Dont' I have a function that tells me the number of entries?
			//or just use numberOfResources


		}
		for(timing in networkPhasesTimings) {
			if (networkPhasesTimings.hasOwnProperty(timing)) {
				networkPhasesTimings[timing] = (networkPhasesTimings[timing] / numberOfResources).toPrecision(5);
				networkPhasesTimings[timing] = parseFloat(networkPhasesTimings[timing]);
			 }
		}

		return networkPhasesTimings;
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
