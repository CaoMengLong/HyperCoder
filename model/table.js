hcApp.controller('TableCtrl', ['$scope',
    '$http','$route','$routeParams','TableFactory',
    function ($scope, $http,$route,$routeParams,tableFactory) {
        $scope.table={name:$route.current.params.name};
        $scope.FieldList=new Array();
        $scope.fieldNameArray=new Array();
        $scope.fieldNameArrayStr=null;
        $scope.fieldNameParamsStr=null;
        $scope.checkeboxFlag=false;

        tableFactory.getFieldList($scope.table.name).then(function(data){
            $scope.FieldList=data;
        })

        $scope.CheckedAll=function(){
            for(var i=0;i<$scope.FieldList.length;i++){
                $scope.FieldList[i]['checked']=$scope.checkeboxFlag;
            };
            $scope.Checked();
        };

        $scope.Checked=function(){
            $scope.afterCreat(); //进行先加工 组织待加工字段
            console.log($scope.fieldNameArrayStr);

            var fieldarray=new Array();
            fieldarray=$scope.fieldNameArrayStr.split(",");

            var fieldarrayparams="";
            for(var i=0;i<fieldarray.length;i++){
                fieldarrayparams=fieldarrayparams+"$"+fieldarray[i]+"='',";
            };
            fieldarrayparams=fieldarrayparams.substring(0,fieldarrayparams.length-1);
            $scope.fieldNameParamsStr=fieldarrayparams;
            console.log(fieldarrayparams);

            //indexFactory.getQueryFieldList($scope.fieldNameArrayStr).then(function(data){
            //    $scope.requestStr=data.RequestStr;
            //});
        };

        //字段文字
        $scope.afterCreat=function(){

            for(var i=0;i<$scope.FieldList.length;i++){
                if($scope.FieldList[i]['checked']==true){
                    $scope.fieldNameArray.push($scope.FieldList[i]['name']);
                }
            }

            $scope.fieldNameArrayStr="";
            $scope.fieldNameArrayStr = $scope.fieldNameArray.join(",");
            $scope.fieldNameArray = new Array();

        };

        $scope.aceLoaded = function(_editor) {
            // Options
            _editor.setReadOnly(false);

        };

        $scope.aceChanged = function(e) {
            //
        };


    }

]);


hcApp.factory('TableFactory',['$http','$q',function($http,$q){
    var service={};
    service.getFieldList=function(tablename){
        var deferred=$q.defer();
        var connection = mysql.createConnection({
            host   : localStorage.server,
            port : localStorage.port,
            user   : localStorage.username,
            password : localStorage.password
        });
        var result= new Array();
        connection.connect();
        connection.query('select COLUMN_NAME,COLUMN_COMMENT  from information_schema.COLUMNS where table_name = "'+tablename+'";', function(err, rows) {

            console.log(rows[0]);
            console.log(rows.length);
            for (index in rows)
            {
                var name=rows[index].COLUMN_NAME;
                var comment=rows[index].COLUMN_COMMENT;
                result[index]={
                    name:name,
                    comment:comment,
                    checked:false
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

