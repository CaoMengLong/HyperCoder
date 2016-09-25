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
        console.log(template);
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

    service.getViewIndexCode=function(data){
        var deferred=$q.defer();
        var templatecode = fs.readFileSync('template/thinkphp/index.html','utf-8');

        var template=new Array();
        //类名的处理

        template.classname=data.TableName.replace(data.DB_PREFIX,"").replace(/_/g,"").replace(/(\w)/,function(v){return v.toUpperCase()});
        template.tablefullname=data.TableName;
        template.tablenoprfixname=data.TableName.replace(data.DB_PREFIX,"");
        template.ParamsStr=data.ParamsStr;
        template.FieldNameArray=data.FieldNameArray;

        template.tablethvalue="";
        template.tabletdvalue="";
        console.log(template);
        for(var i=0;i<template.FieldNameArray.length;i++){
            //template.addvalue=template.addvalue+"'"+template.FieldNameArray[i]+"'=>$"+template.FieldNameArray[i]+",\n\t\t\t\t";
            template.tablethvalue=template.tablethvalue+"<th>"+template.FieldNameArray[i]+"</th>\n\t\t\t\t";
            template.tabletdvalue=template.tabletdvalue+"<td>{$vo."+template.FieldNameArray[i]+"}</td>\n\t\t\t\t\t\t";
        }
        var  code;
        code=service.replaceAll(templatecode,"@@classname@@",template.classname);
        code=service.replaceAll(code,"@@tablenoprfixname@@",template.tablenoprfixname);
        code=service.replaceAll(code,"@@tablefullname@@",template.tablefullname);
        code=service.replaceAll(code,"@@paramsstr@@",template.ParamsStr);
        code=service.replaceAll(code,"@@tablethvalue@@",template.tablethvalue);
        code=service.replaceAll(code,"@@tabletdvalue@@",template.tabletdvalue);

        deferred.resolve(code);
        return deferred.promise;
    }
    service.getViewEditCode=function(data){
        var deferred=$q.defer();
        var templatecode = fs.readFileSync('template/thinkphp/edit.html','utf-8');

        var template=new Array();
        //类名的处理

        template.classname=data.TableName.replace(data.DB_PREFIX,"").replace(/_/g,"").replace(/(\w)/,function(v){return v.toUpperCase()});
        template.tablefullname=data.TableName;
        template.tablenoprfixname=data.TableName.replace(data.DB_PREFIX,"");
        template.ParamsStr=data.ParamsStr;
        template.FieldNameArray=data.FieldNameArray;


        template.editcontrolsvalue="<input type='text' style='display: none' name='id' value='{$data.id}'/>\n";
        console.log(template);
        for(var i=0;i<template.FieldNameArray.length;i++){
            //template.addvalue=template.addvalue+"'"+template.FieldNameArray[i]+"'=>$"+template.FieldNameArray[i]+",\n\t\t\t\t";
            template.editcontrolsvalue=template.editcontrolsvalue+
            "\t\t<div class='form-item'>\n"+
            "\t\t\t<label class='item-label'>"+template.FieldNameArray[i]+"<span class='check-tips'>（提示信息）</span></label>\n"+
            "\t\t\t<div class='controls'>\n"+
            "\t\t\t\t<input type='text' class='text input-large' name='"+template.FieldNameArray[i]+"' value='{$data."+template.FieldNameArray[i]+"}'>\n"+
            "\t\t\t</div>\n"+
            "\t\t</div>\n\t\t";
        }
        var  code;
        code=service.replaceAll(templatecode,"@@classname@@",template.classname);
        code=service.replaceAll(code,"@@tablenoprfixname@@",template.tablenoprfixname);
        code=service.replaceAll(code,"@@tablefullname@@",template.tablefullname);
        code=service.replaceAll(code,"@@paramsstr@@",template.ParamsStr);
        code=service.replaceAll(code,"@@editcontrolsvalue@@",template.editcontrolsvalue);


        deferred.resolve(code);
        return deferred.promise;
    }
    service.getViewAddCode=function(data){
        var deferred=$q.defer();
        var templatecode = fs.readFileSync('template/thinkphp/add.html','utf-8');

        var template=new Array();
        //类名的处理

        template.classname=data.TableName.replace(data.DB_PREFIX,"").replace(/_/g,"").replace(/(\w)/,function(v){return v.toUpperCase()});
        template.tablefullname=data.TableName;
        template.tablenoprfixname=data.TableName.replace(data.DB_PREFIX,"");
        template.ParamsStr=data.ParamsStr;
        template.FieldNameArray=data.FieldNameArray;


        template.addcontrolsvalue="";
        console.log(template);
        for(var i=0;i<template.FieldNameArray.length;i++){
            //template.addvalue=template.addvalue+"'"+template.FieldNameArray[i]+"'=>$"+template.FieldNameArray[i]+",\n\t\t\t\t";
            template.addcontrolsvalue=template.addcontrolsvalue+
                "<div class='form-item'>\n"+
                "\t\t\t<label class='item-label'>"+template.FieldNameArray[i]+"<span class='check-tips'>（提示信息）</span></label>\n"+
                "\t\t\t<div class='controls'>\n"+
                "\t\t\t\t<input type='text' class='text input-large' name='"+template.FieldNameArray[i]+"' value=''>\n"+
                "\t\t\t</div>\n"+
                "\t\t</div>\n\t\t";
        }
        var  code;
        code=service.replaceAll(templatecode,"@@classname@@",template.classname);
        code=service.replaceAll(code,"@@tablenoprfixname@@",template.tablenoprfixname);
        code=service.replaceAll(code,"@@tablefullname@@",template.tablefullname);
        code=service.replaceAll(code,"@@paramsstr@@",template.ParamsStr);
        code=service.replaceAll(code,"@@addcontrolsvalue@@",template.addcontrolsvalue);


        deferred.resolve(code);
        return deferred.promise;
    }
    //返回
    return service;
}])

