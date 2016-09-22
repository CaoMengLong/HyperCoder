hcApp.controller('MainCtrl', ['$scope',
    '$http','$location','MainFactory',
    function ($scope, $http,$location,mainFactory) {
        $scope.server=localStorage.server;
        $scope.port=localStorage.port;
        $scope.username=localStorage.username;
        $scope.password=localStorage.password;

        $scope.DataBaseCount=0;
        $scope.DataBase={
            name:null,
            tableSize:0,
            tableList:new Array()
        }
        //获取数据库的总数量
        $scope.setDataBaseCount=function(number){
            $scope.DataBaseCount=number;
        }

        //获取1个库的所有表
        $scope.getTablesByDataBaseName=function(dataBasename){
            mainFactory.getTablesByDataBaseName(dataBasename).then(function(data){
                $scope.DataBase.tableList=data;
                $scope.DataBase.name=dataBasename;
            });
        }

        //点击进入页面
        $scope.chickTableName=function(index){
            $location.path("/table/"+$scope.DataBase.tableList[index].name);
        }

    }

]);

hcApp.factory('MainFactory',['$http','$q',function($http,$q){
    var service={};
    service.getTablesByDataBaseName=function(dataBasename){
        var deferred=$q.defer();
        var connection = mysql.createConnection({
            host   : localStorage.server,
            port : localStorage.port,
            user   : localStorage.username,
            password : localStorage.password
        });
        var result= new Array();
        connection.connect();
        connection.query('SELECT TABLE_NAME,TABLE_COMMENT FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA ="'+dataBasename+'"', function(err, rows) {

            //console.log(rows[0]);
           // console.log(err);
            for (index in rows)
            {
                var name=rows[index].TABLE_NAME;
                var comment=rows[index].TABLE_COMMENT;
                result[index]={
                    name:name,
                    comment:comment
                }
            }
            deferred.resolve(result);
        });
        connection.end();
        return deferred.promise;
    }
    //返回
    return service;
}]);

(function($) {
    'use strict';
    $(function() {
        var $fullText = $('.admin-fullText');
        $('#admin-fullscreen').on('click', function() {
            $.AMUI.fullscreen.toggle();
        });
        $(document).on($.AMUI.fullscreen.raw.fullscreenchange, function() {
            $fullText.text($.AMUI.fullscreen.isFullscreen ? 'Exit FullScreen' : 'FullScreen');
        });
    });
})(jQuery);