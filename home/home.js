(function(angular){
	var homeApp = angular.module("homeApp",["ngRoute","httpJsonp"]);
	homeApp.config(["$routeProvider",function($routeProvider){
		$routeProvider.when("/home_page",{
			templateUrl:"./home/home.html",
			controller:"homeCtrl"
		}).otherwise({
			redirectTo:"/home_page"
		});
	}]);
	homeApp.controller("homeCtrl",["$scope","urlJsonp",function($scope,urlJsonp){
		$scope.count = 5;
		$scope.begin = 0;
		$scope.soon = 10;
		$scope.loading = true;
		urlJsonp.jsonp({
			url:"http://api.douban.com/v2/movie/in_theaters",
			data:{start:$scope.begin,count:$scope.count},
			success:function(data){
				$scope.theaters = data.subjects;
				$scope.loading = false;
				$scope.$apply();
			}
		});
		urlJsonp.jsonp({
			url:"http://api.douban.com/v2/movie/coming_soon",
			data:{start:$scope.begin,count:$scope.soon},
			success:function(data){
				$scope.coming = data.subjects;
				$scope.loading = false;
				$scope.$apply();
			}
		});
	}])
})(angular)