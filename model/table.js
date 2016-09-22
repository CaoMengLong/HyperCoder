hcApp.controller('TableCtrl', ['$scope',
    '$http','$route','TableFactory',
    function ($scope, $http,$route,tableFactory) {
        console.log($route);
        console.log($route.current.params.id);
    }

]);


hcApp.factory('TableFactory',['$http','$q',function($http,$q){
    var service={};
    service.getDataBaseName=function(server,port,username,password){
        var deferred=$q.defer();
        var connection = mysql.createConnection({
            host   : server,
            port : port,
            user   : username,
            password : password
        });
        var result= new Array();
        connection.connect();
        connection.query('SELECT `SCHEMA_NAME` FROM `information_schema`.`SCHEMATA`', function(err, rows) {

            console.log(rows[0]);
            console.log(rows.length);
            for (index in rows)
            {
                var name=rows[index].SCHEMA_NAME;
                result[index]={
                    name:name
                }
            }
            deferred.resolve(result);
        });
        connection.end();
        return deferred.promise;
    }
    //返回
    return service;
}])
