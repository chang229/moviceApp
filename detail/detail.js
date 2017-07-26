(function(angular){
	var detail = angular.module("detail",["ngRoute","httpJsonp"]);
	detail.config(["$routeProvider",function($routeProvider){
		$routeProvider.when("/details/:id?",{
			templateUrl:"./detail/detail.html",
			controller:"detailCtrl"
		})
	}]);
	detail.controller("detailCtrl",["$scope","$routeParams","urlJsonp",function($scope,$routeParams,urlJsonp){
		$scope.loading = true;
		urlJsonp.jsonp({
			url:"http://api.douban.com/v2/movie/subject/" + $routeParams.id,
			success:function(data){
				$scope.data = data;
				$scope.loading = false;
				$scope.$apply();
			}
		})
	}])
})(angular)