var mysql  = require('mysql');  //开始使用mysql

hcApp.controller('ConnectCtrl', ['$scope',
    '$http',
    function ($scope, $http) {
        $scope.server=localStorage.server;
        $scope.port=localStorage.port;
        $scope.username=localStorage.username;
        $scope.password=localStorage.password;
        $scope.connectCheck=function(){
            var $modal = $('#failed-alert');
            var connection = mysql.createConnection({
                host   : $scope.server,
                port : $scope.port,
                user   : $scope.username,
                password : $scope.password
            });
            connection.connect(function(err){
                if(err){
                    console.log('[query] - :'+err);
                    $modal.modal('toggle');
                    return;
                }
                localStorage.server=$scope.server;
                localStorage.port=$scope.port;
                localStorage.username=$scope.username;
                localStorage.password=$scope.password;
                console.log('[connection connect]  succeed!');
                //$location.path("/main");
                //$location.url(‘/test/1#?a=1#hash‘);
                window.location.href="/view/main.html";
            });
            connection.end();
        }
    }

]);
