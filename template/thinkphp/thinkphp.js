/**
 * Created by Myron on 2016/9/23.
 */

hcApp.factory('ThinkPHPFactory',['$http','$q',function($http,$q){
    var service={};
    service.replaceAll=function(str , replaceKey , replaceVal){
        var reg = new RegExp(replaceKey , 'g');//g就是代表全部
        return str.replace(reg , replaceVal || '');
    }

    service.getControllerCode=function(data){
        //var data={
        //    DB_PREFIX:"gr_",
        //    TABLENAME:"gr_api_jjj"
        //}

        var deferred=$q.defer();
        var templatecode = fs.readFileSync('template/thinkphp/Controller.php','utf-8');

        var template=new Array();
        //类名的处理

        template.classname=data.TableName.replace(data.DB_PREFIX,"").replace(/_/g,"").replace(/(\w)/,function(v){return v.toUpperCase()});
        template.tablefullname=data.TableName;
        template.tablenoprfixname=data.TableName.replace(data.DB_PREFIX,"");
        template.ParamsStr=data.ParamsStr;
        template.FieldNameArray=data.FieldNameArray;
        template.addvalue="";
        for(var i=0;i<template.FieldNameArray.length;i++){
            template.addvalue=template.addvalue+"'"+template.FieldNameArray[i]+"'=>$"+template.FieldNameArray[i]+",\n\t\t\t\t";
        }
        template.addvalue=template.addvalue.substring(0,template.addvalue.length-1);
        template.editvalue=template.addvalue;
        var  code;
        code=service.replaceAll(templatecode,"@@classname@@",template.classname);
        code=service.replaceAll(code,"@@tablenoprfixname@@",template.tablenoprfixname);
        code=service.replaceAll(code,"@@paramsstr@@",template.ParamsStr);
        code=service.replaceAll(code,"@@addvalue@@",template.addvalue);
        code=service.replaceAll(code,"@@editvalue@@",template.editvalue);
        deferred.resolve(code);
        return deferred.promise;
    }
    //返回
    return service;
}])

