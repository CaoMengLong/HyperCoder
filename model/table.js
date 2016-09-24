var fs= require('fs');

hcApp.controller('TableCtrl', ['$scope',
    '$http','$route','$routeParams','TableFactory','ThinkPHPFactory',
    function ($scope, $http,$route,$routeParams,tableFactory,thinkPHPFactory) {
        var AceEditor=null;
        $scope.table={name:$route.current.params.name};
        $scope.FieldList=new Array();
        $scope.fieldNameArray=new Array();
        $scope.fieldNameArrayStr=null;
        $scope.fieldNameParamsStr=null;
        $scope.checkeboxFlag=false;
        $scope.DB_PREFIX= $scope.table.name.split("_")[0]+"_";
        tableFactory.getFieldList(localStorage.databasename,$scope.table.name).then(function(data){
            $scope.FieldList=data;
            console.log(data);
        })

        $scope.CheckedAll=function(){

            for(var i=0;i<$scope.FieldList.length;i++){
                $scope.FieldList[i]['checked']=$scope.checkeboxFlag;
            };
            $scope.Checked();
        };

        $scope.Checked=function(){
            $scope.afterCreat(); //进行先加工 组织待加工字段


            var fieldarray=new Array();
            fieldarray=$scope.fieldNameArrayStr.split(",");

            var fieldarrayparams="";
            for(var i=0;i<fieldarray.length;i++){
                fieldarrayparams=fieldarrayparams+"$"+fieldarray[i]+"='',";
            };
            fieldarrayparams=fieldarrayparams.substring(0,fieldarrayparams.length-1);
            $scope.fieldNameParamsStr=fieldarrayparams;

        };

        //字段文字
        $scope.afterCreat=function(){
            $scope.fieldNameArray = new Array();
            for(var i=0;i<$scope.FieldList.length;i++){
                if($scope.FieldList[i]['checked']==true){
                    $scope.fieldNameArray.push($scope.FieldList[i]['name']);
                }
            }
            $scope.fieldNameArrayStr="";
            $scope.fieldNameArrayStr = $scope.fieldNameArray.join(",");

        };


        $scope.GenerateCode=function(mold){
            var data={
                DB_PREFIX:$scope.DB_PREFIX,
                TableName:$scope.table.name,
                FieldNameArray:$scope.fieldNameArray,
                ParamsStr:$scope.fieldNameParamsStr
            }
            if(mold="OTC"){
                thinkPHPFactory.getControllerCode(data).then(function(data){
                    AceEditor.setValue(data);
                    AceEditor.gotoPageUp();
                    AceEditor.gotoPageUp();
                    AceEditor.gotoPageUp();
                    AceEditor.gotoPageUp();
                });
            }
        }



        $scope.aceLoaded = function(_editor) {
            // Options
            _editor.setReadOnly(false);
            _editor.getSession().setUseWrapMode(true);
            _editor.renderer.setShowGutter(true);
            AceEditor=_editor;

        };

        $scope.aceChanged = function(e) {
            //
        };


    }

]);


hcApp.factory('TableFactory',['$http','$q',function($http,$q){
    var service={};
    service.getFieldList=function(databasename,tablename){
        var deferred=$q.defer();
        var connection = mysql.createConnection({
            host   : localStorage.server,
            port : localStorage.port,
            user   : localStorage.username,
            password : localStorage.password
        });
        var result= new Array();
        var sqlstr="select COLUMN_NAME,COLUMN_COMMENT from information_schema.columns where table_schema='"+databasename+"' and table_name='"+tablename+"'";
        console.log(sqlstr);
        connection.connect();
        connection.query(sqlstr, function(err, rows) {


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

