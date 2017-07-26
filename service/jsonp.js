(function(angular){
	var httpJsonp = angular.module("httpJsonp",[]);
	httpJsonp.service("urlJsonp",["$window",function($window){
		this.jsonp = function(obj){
			var defaultes = {
				url:"#",
				data:{},
				jsonp:"callback",
				success:function(data){console.log(data)}
			};
			for(var k in obj){
				defaultes[k] = obj[k];
			};
			// 参数处理
			var dump = "";
			for(var k in defaultes.data){
				dump += k + "=" + defaultes.data[k] + "&";
			};
			dump = encodeURI(dump);
			// 处理回调函数的名称
			var cb = null;
			if(defaultes.jsonpCallBack){
				cb = defaultes.jsonpCallBack;
			}else{
				cb = "angular" + (new Date().getTime()) + "_" + (Math.random().toString().replace(".",""));
			};
			$window[cb] = function(data){
				defaultes.success(data);
			};
			var script = $window.document.createElement("script");
			script.src = defaultes.url + "?" + dump + defaultes.jsonp + "=" + cb;
			$window.document.body.appendChild(script);
		};
	}])
})(angular)