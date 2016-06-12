vue-router
===============
安装
--------

    //安装
    npm install vue-router 
    bower install vue-router

    //调用
    var Vue = require('Vue');
    var VueRouter = require('Vue-router');
    Vue.use(VueRouter);

    //在浏览器环境引入vue-router.js会自动调用 Vue.use(VueRouter);

基本使用
------------

    <div id="app">
        <h1>Hello App</h1>
        <p>
            <!-- 使用指令v-link进行导航 -->
            <a v-link="{path: '/foo'}">Go to Foo</a>
            <a v-link="{path: '/bar'}">Go to Bar</a>
        </p>
        <!--路由切换的视图-->
        <router-view></router-view>
    </div>
    <script type="text/javascript">
    //定义组件
    var Foo = Vue.extend({
            template: '<p>this is foo!</p>'
        });
    var Bar = Vue.extend({
            template: '<p>this is bar！</p>'
        })；

    //创建根组件
    var App = Vue.extend({});

    //创建路由器实例
    var router = new VueRouter({});
    //配置路由规则 路由规则映射到组件，组件会被渲染在router-view元素中
    router.map({
        '/foo': {
            component: Foo
        },
        '/bar': {
            component: Bar
        }
    });

    //在App组件上启动路由 ，会自动创建App的实例，并挂载到#app元素上
    router.start(App, '#app');
    </script>


嵌套路由
--------------

    <div id="app">
        <!--顶级外链-->
        <router-view></router-view> 
    </div>

    <script>
        var App = Vue.extend({}); //根组件
        var Foo = Vue.extend({
                template: '<div class="foo">' +
                            '<h2>this is foo!</h2>' +
                            '<router-view></router-view>' +
                          '</div>';
            });
        var Bar = Vue.extend({
                tempalte: '<p>this is bar</p>'
            });

        var router = new VueRouter({}); //路由器实例
        //定义路由规则
        router.map({
            '/foo': {
                component: Foo, //当路由匹配到/foo时，渲染一个Foo组件
                subRoutes: {//子路由规则
                    '/bar': {
                        component: Bar, //当路由匹配/foo/bar时，渲染一个Bar组件在Foo's <router-view>
                        auth: true //自定义属性
                    },
                    '/': {
                        component: {
                            template: '<p>default subview for Foo</p>'; //Foo's<router-view>默认内容
                        }
                    }
                }
            }
        });
        //启动路由
        router.start(App, '#app');

路由规则和路由匹配
--------------------
**路由对象**: 在使用`vue-router`的应用中, 路由对象会被注入到每个组件中, 通过 `vm.$route` 访问. 当路由切换时，路由对象会被更新。

> 通过 element.__vue__访问 vm对象, 然后就可以访问到路由对象 vm.$route, vm._watchers 数据观察

### 路由对象的属性:

+ **$route.path**  路由路径(解析后的绝对路径 如: /foo/bar)
+ **$route.params** 捕获的路径参数
+ **$route.query** url的查询参数queryString (如: /foo?user=1, $route.query.user==1)
+ **$route.router** 路由对象所属的路由器
+ **$route.matched** 数组，包含当前匹配路径中包含的片段及其对应的配置参数
+ **$route.name** 当前路径的名称
+ **自定义字段** 设置路由表时的其他自定义字段

### 在模板中使用路由对象$route

    <div>
        <p>当前路径: {{$route.path}}< /p>
        <p>当前路由参数： {{$router.params}} < /p>
    < /div>

### 动态片段

    router.map({
        '/user/:username': {//动态片段 :username, 匹配 /user/windy
            component: {
                template: '<p>用户名是{{$route.params.username}}< /p>'
            }
        },
        '/user/:username/post/:postid': {//1条路径可包含多个动态片段
            component: {
                template: '<p>用户名是{{$route.params.username}}，当前文章:{{$route.params.postid}}< /p>'
            }
        }
    });


### 全匹配片段
动态片段只能匹配路径的一部分(segment) 如:(/user/:username 规则，在访问/user/windy/post/2时, username只匹配了url的/windy/段)

全匹配片段即贪婪版的动态片段

    /user/*any   #访问路径 /user/a/b/c -> $route.params={any: 'a/b/c'};
    /user/*any/bar #访问路径 /user/a/b/bar -> $route.params={any: 'a/b'};


具名路径
--------------
在有些情况下，给一条路径加上一个名字能够让我们更方便地进行路径的跳转。你可以按照下面的示例给一条路径加上名字：

    <a v-link="{name: 'user', params:{userId:123} }">user< /a>
    <script>
        router.map({
            name: 'user', //给路径命名
            '/user/:userId': {
                component: Foo
            }
        });

        //路由切换 除了 v-link指令，还可以JS切换
        router.go({name:'user', params:{userId: 123}}); //效果同上
    < /script>

路由配置项
---------------

    //创建路由器实例
    var router = new VueRouter(config);

**路由器配置项包括：**

+ **hasbang**  , 默认true, 所有路径被格式化为 `#!`开始, 如 `router.go('/foo/bar')` 浏览器url会变为 example.com/#!/foo/bar
+ **history** , 默认false, 是否使用HTML5 history API(`history.pushState()`, `history.replaceState()` ), 需要服务器做响应配置，不然容易404
+ **abstract** , 默认false, 不依赖于浏览器的浏览历史的虚拟管理后端
+ **root** , 默认null, 根路径作用类似 <base />标签, 路由规则的所有路径都以此为根， 根路径功能需 `history` 设置为true 才可用
+ **linkActiveClass**  , 默认 v-link-active v-link指令指定的路由和当前url匹配 则v-link所在元素添加 v-link-active
+ **saveScrollPosition** 默认 false, HTML5 history模式下可用
+ **transitionOnLoad** 默认 false, 切换时的过度效果
+ **suppressTransitionError** 默认false, 场景切换钩子函数中发生的异常会被吞掉

router-view
--------------
<router-view> 用于渲染匹配的组件，它基于 Vue 的动态组件系统，所以它继承了一个正常动态组件的很多特性。

+ 可以传递 `props`
+ `<router-view></router-view>` 中的内容可以插入到组件中(content属性指定插入点)
+ `v-transition` `transtion-mode`的完整支持, 注意要有组件需有根元素
+ `v-ref`也支持

v-link
--------------
`v-link`是用来在不同路径间跳转的指令，接受一个表达式 `v-link="expr"` , 点击元素时，会自动调用 `router.go(expr) `

    <!--字面量路径 字符串or对象 -->
    <a v-link="'home'">home</a>
    <a v-link="{path: 'home'}">home</a>

    <!--跳转到 具名路径-->
    <a v-link="{name: 'user',  params:{userId: 123} }">user</a>

`v-link`指令表达式可用的属性:

+ name
+ path
+ params
+ activeClass
+ exact   //添加activeClass时，用完全匹配去检测是否满足
+ replace  //跳转时 调用 `router.replace(expr)` 而不是 `router.go(expr)`
+ append  //path为相对路径时，目标路径是path追加到现有路径 ， 如: /foo  v-link="{path:'bar', append: true}"  则跳转到 /foo/bar

> 注意: `v-link` 指令会自动设置 `a` 标签的 `href`属性， 所以 `<a v-link="'home'" href="javascript:;" >home</a>`  ，指定 `href` 属性是多余的
> 

动态载入组件
--------------

    //异步加载跟路由规则相对应的组件
    router.map({
        '/user': {
            component: function(resolve){
                require(['./user.vue'],resolve);//异步加载user.vue AMD方式require的包,webpack会自动分割为独立的trunk
            }
        }
    });


切换钩子函数 
--------------
