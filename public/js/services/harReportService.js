angular.module('harReportService', [])

.service('harReportService', ['$http', function($http) {

	var harJson = "";
	var parsedHar = {};


	//find 5 slowest resources



	return {

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
