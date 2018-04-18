app.controller("myController", ["$scope", "firstService", "$timeout", "$http", '$state', '$stateParams', function($scope, firstService, $timeout, $http ,$state, $stateParams) {
    $scope.myVar = true;
    $scope.toggle = function() {
        $scope.myVar = !$scope.myVar;
    }
    //监听表单的值，作为搜索的条件
    $scope.$watch("serach_content", function(newVal, oldVal) {
        var timer; //定时器
        if (newVal) {
            //延迟1000ms = 1s 后再进行搜索
            timer = $timeout(function() {
                //调用 firstService 服务中的list 方法，获取数据
                var promise = firstService.list(newVal);

                //对 firstService 服务 中的 promise 对象进行处理，获取数据
                promise.success(function(data) {
                    $scope.datalist = data.result; //在mo ban shang xian shi
                });
            }, 1000);
        }
    });

    $scope.all = function(activeTab) {
        var title = $scope.activeTab
        $http({
            method: "jsonp",
            url: 'https://suggest.taobao.com/sug?code=utf-8&q=' + title + '&callback=JSON_CALLBACK',
            // data: {}
        }).
        success(function(data, status) {
            console.log(data)
            $scope.datalist = data.result;
        }).
        error(function(data) {
            console.log(data)
        });
    }
}])
app.factory("firstService", ["$http", function($http) {
    return { //factory 返回的是一个对象:{key:value,key:value,...}，好调用

        //创建对象的list方法，title 是要搜索的名称
        list: function(title) { //发送ajax请求，返回 promise
            //return getList();
            //https://suggest.taobao.com/sug?code=utf-8&q=%E6%89%8B%E6%9C%BA&callback=JSON_CALLBACK
            var url = 'https://suggest.taobao.com/sug?code=utf-8&q=' + title + '&callback=JSON_CALLBACK';
            var p = $http.jsonp(url);
            //把得到的promise返回(给调用这个服务的对象)
            return p; //数据是放在控制器中处理的，放在这里，会取不到数据
        }
    }
}])
