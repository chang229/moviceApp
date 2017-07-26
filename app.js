(function (angular) {
    var moveApp = angular.module("moveApp",["homeApp","detail","moveListApp"]);
    moveApp.controller("moveCtrl",["$scope","$location",function($scope,$location){
    	$scope.loca = $location;
    	$scope.prom = {promurl:"/home_page"};
    	$scope.$watch("loca.url()",function(now,old){
    		switch (now){
    			case "/home_page":
    				$scope.prom = {promurl:"/home_page"};
    				break;
    			case "/in_theaters":
    				$scope.prom = {promurl:"/in_theaters"};
    				break;
    			case "/coming_soon":
    				$scope.prom = {promurl:"/coming_soon"};
    				break;
    			case "/top250":
    				$scope.prom = {promurl:"/top250"};
    				break;
    		}
    	})
    }])
})(angular);