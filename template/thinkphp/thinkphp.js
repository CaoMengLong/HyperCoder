/**
 * Created by Myron on 2016/9/23.
 */

hcApp.factory('ThinkPHPFactory',['$http','$q',function($http,$q){
    var service={};
    service.getControllerCode=function(tablename){
        var deferred=$q.defer();
        var data = fs.readFileSync('template/thinkphp/Controller.php','utf-8');
        var code=data.replace("[[classname]]", tablename);
        deferred.resolve(code);
        return deferred.promise;
    }
    //返回
    return service;
}])
