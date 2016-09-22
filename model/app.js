/**
 * Created by Myron on 2016/9/21.
 */
var hcApp=angular.module('hc-app',['ngRoute']);
var gui = require('nw.gui');
var win = gui.Window.get();
win.maximize();
var mysql  = require('mysql');  //开始使用mysql


var configuration = {
    appPartialPath: "/view/",
    appApiEntryPoint: "/api/"
};

hcApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/choice', {
            templateUrl: configuration.appPartialPath + 'choice.html',
            controller: 'ChoiceCtrl'
        })
        .when('/table/:id', {
            templateUrl: configuration.appPartialPath + 'table.html',
            controller: 'TableCtrl'
        })
        .otherwise({
            redirectTo: '/choice'
        });
}]);