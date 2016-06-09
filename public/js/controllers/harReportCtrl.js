angular.module('harReportCtrl', ['harReportService'])

.controller('harReportController', function($scope, harReportService) {

	//How to get access to the JSON from other controller?

	var harString = harReportService.getHarJson();
	var parsedHar = harReportService.getParsedHar();

	$scope.highlights = [
		{
				"name": "hey",
				"value": "whats up"
		},
		{
				"name": "heya",
				"value": "whats up bro"
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
