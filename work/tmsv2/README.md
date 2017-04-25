TMS 2.0
=========
基于koa2+mongodb的TMS后台接口，只对外提供接口数据，不渲染试图(*即前后端分离的开发方式*)。

安装
------

    cd tmsv2
    cnpm install  #或者 npm install
    cnpm install -g supervisor
    cnpm install -g babel-cli
    cnpm install -g forever

运行
------

    cd tmsv2/app
    npm run dev #开发
    npm run build #构建
    npm run start  #启动
    npm run stop #停止
