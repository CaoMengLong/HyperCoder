# 欢迎使用HyperCoder

@(HyperCoder)[代码使用|帮助|Markdown]

**HyperCoder**是一款专为程序员（Programmer）打造的软件开发辅助工具，通过精心的设计与技术实现，全自动生成常用重复性代码，带来前所未有的开发体验。特点概述：
 
- **数据库支持** ：支持MYSQL数据库，自由选择任意表字段自动生成 CURD 代码；
- **得心应手** ：简洁高效的编辑器，灵活简易的操作，一键生成各种代码。跨平台支持可以在 Windows , MacOS , Linux 系统中运行；
- **深度整合** ：支持多种编程语言代码生成，拥有各种常用框架的代码自动生成功能。

![HyperCoder](https://github.com/CaoMengLong/HyperCoder/raw/master/Public/images/hypercoderani.gif)
-------------------



## HyperCoder简介

> HyperCoder 是一款代码生成器，它允许人们使用它快速的生成各种编程代码。  

### HyperCoder 二进制版本使用
目前HyperCoder 已经提供了编译后的二进制版本，可以直接下载解压后直接运行使用。

#####Windows 版本下载地址：
HyperCoder-v0.1.0-win-32bit [下载地址][1]
HyperCoder-v0.1.0-win-64bit  [下载地址][1]

#####MacOS 版本下载地址：
HyperCoder-v0.1.0-osx-32bit [下载地址][1]
HyperCoder-v0.1.0-osx-64bit [下载地址][1]



### HyperCoder 源码使用
您也可以下载HyperCoder 源程序代码进行开发与调试，下面是源程序代码使用方法。HyperCoder 采用 Node.js + [NW.js][2]  开发. UI使用  [AmazeUI][3]  和   [AngularJS][4] ,代码编辑器使用  [Ace][5]  着色器框架。 

代码下载前请确保您的计算机中已经安装一下版本的软件。
Node.js  > Version 4.0
Bower > Last Version
Nw.js > LastVersion

#####安装NW.js
``` bash
npm install nw -g
```

#####安装Bower
``` bash
npm install bower -g
```
#####下载源码并初始化依赖模块
``` bash
git clone https://github.com/CaoMengLong/HyperCoder.git
cd HyperCoder
bower install
npm install
```

#####运行程序
``` bash
cd HyperCoder
nw .
```
进入源码目录直接运行 nw 即可启动程序.

### HyperCoder 源码结构及说明

TODO

---------

 


## 反馈与建议
- 邮箱：<myron@hh.io>

---------
感谢阅读这份帮助文档。非专业文档写手，难免有疏忽，尽请谅解。


  [1]: http://pan.baidu.com/s/1boJdL4V
  [2]: http://nwjs.io/
  [3]: http://amazeui.org/
  [4]: http://www.angularjs.org/
  [5]: https://ace.c9.io/

