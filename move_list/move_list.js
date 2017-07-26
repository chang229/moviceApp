(function(angular){
	var moveListApp = angular.module("moveListApp",["ngRoute","httpJsonp"]);
	moveListApp.config(["$routeProvider",function($routeProvider){
		$routeProvider.when("/:project/:page?",{
			templateUrl:"./move_list/move_list.html",
			controller:"moveListCtrl"
		})
	}]);
	moveListApp.controller("moveListCtrl",["$scope","$route","$routeParams","urlJsonp",function($scope,$route,$routeParams,urlJsonp){
		$scope.loading = true;
		// 每页显示多少条
		$scope.pageCount = 20;
		// 从哪一条开始
		$scope.pageStar = ($routeParams.page - 1) * 20 + 1 || 0;
		// 页码
		$scope.page = ($routeParams.page || 1) - 0;
		urlJsonp.jsonp({
			url:"http://api.douban.com/v2/movie/" + $routeParams.project,
			data:{start:$scope.pageStar,count:$scope.pageCount,q:$routeParams.q},
			success:function(data){
				$scope.data = data.subjects;
				$scope.total = data.total;
				$scope.totalPage = Math.ceil($scope.total / $scope.pageCount);
				$scope.loading = false;
				$scope.$apply();
			}
		});
		$scope.newPage = function(nowpage){
			if(nowpage <= 0 || nowpage > $scope.totalPage){
				return false;
			};
			$route.updateParams({page:nowpage});
			$scope.loading = true;
		}
	}])
})(angular)