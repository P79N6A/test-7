Vue2文档快速预览
====================
[vue2官方文档](http://cn.vuejs.org/v2/guide/)

vm
---------
  
    vm.$data
    vm.$el
    vm.$watch()

instantial
----------
派生并注册组件类，使其在模板中可用

    // Vue.component(cmpName, options)
    MyCmp = Vue.extend(options);
    Vue.component(cmpName, MyCmp);

JS中实例化组件类

    MyCmp = Vue.extend(options);
    cmp = new MyCmp(options);

life circle
---------

    create -> mount -> update -> destory
    beforeCreate created -> beforeMount mounted -> beforeUpdate updated -> beforeDestroy destroyed

    template -> virtual dom render fn ; dom diff

directive
---------

    v-if(v-else  v-else-if), v-model, v-bind, v-on, v-once, v-html

    // v-dirName:arg="expr | filter"
    <a v-bind:href="url">hello</a>  

    // v-dirName:arg.modifiers="expr | filter"
    <a v-on:click.prevent="dosth">hello</a>  

    // v-if v-else
    <div v-if="ok">content</div>
    <div v-else>others</div>

template元素指令可以和 v-if v-for 流程控制指令结合使用

    <template v-if="show">
        <em>user</em>
        <p key="p1">p1</p>
    </template>
    <template v-else>
        <em>setting</em>
        <p key="p2">another p</p>
    </template>


    <h1 v-show="ok">hello</h1>
    <h1 v-else>some error</h1>

v-show 不能和template 元素指令一起使用, 如:

    <template v-show="ok"> <!--can not do this-->
        <p>p1</p>
        <p>p2</p>
    </template>

filters
----------
filter用在模板插值 `{{msg | filter}}` 和v-bind的表达式中 `v-bind:href="url | filter"`

    {{message | capitalize}}
    {{msg | filterA | filterB}}
    {{msg | filterA('arg1', arg2)}}
    <div v-bind:id="rawid | formatid">some con</div>

    new Vue({
        filters: {
            capitalize: function(v){
                return v.charAt(0).toUpperCase() + v.slice(1);
            }
        }
    });

computed attribute
---------------

    var vm = new Vue({
        computed: {
            reversedMessage: function() {
                return this.message.split('').reverse().join('');
            }
        },
        methods: {
            reverseMsg: function() {
                return this.message.split('').reverse().join('');
            }
        }
    })

计算属性值的缓存 reversedMessage 和方法 this.reverseMsg  

计算属性设置getter setter

    computed: {
        fullName: {
            get: function(){
                return this.firstName + ' ' + this.lastName;
            },
            set: function() {// return not necessary
                var names = this.fullName.split(' ');
                this.firstName = names[0];
                this.lastName = names[1];
            }
        }
    }
    // vm.fullName = 'lin sindy';


class and style
---------------

    <div v-bind:class="{active: isActive}" >hello</div>
    <div v-bind:class="['foo', 'bar']" >hello</div>
    <div v-bind:class="['foo', 'bar', isActive? 'active': '']" >hello</div>
    <div v-bind:class="['foo', 'bar', {active: isActive}]" >hello</div>

    <div v-bind:style="{color: activeColor, fontSize: fontsize + 'px'}">hello</div>
    <div v-bind:style="[baseStyle, overrideStyle]">hello</div>


v-for 
------------

    <ul>
        <li v-for="item in items">{{item.message}}</li>
        <!--
        <li v-for="item of items">{{item.message}}</li>  also ok..
        -->
    </ul>

    <ul>
        <li v-for="(item, index) in items">{{parentMsg}} - {{index}} - {{item.msg}}</li>
    </ul>

    <ul>
        <template v-for="item in items">
            <li>{{item.message}}</li>
            <li class="divider"></li>
        </template>
    </ul>

    <ul>
        <li v-for="value in obj">{{value}}</li>
        <!--
        <li v-for="(value, key, index) in obj">{{index}}. {{key}}: {{value}}</li>
        -->
    </ul>

    <div>
        <span v-for="n in 10">{{n}}</span>  1...10
    </div>

    <my-cmp v-for="(item, index) in items" v-bind:item="item" v-bind:index="index"></my-cmp>

    <div v-for="item in items" :key="item.id">content</div>

array methods
------------

改写数组的自修改方法，从而方便触发视图更新

    pop(), push(), shift(), unshift(), splice(), sort(), reverse()

数组的非自修改方法: 如: `filter(), concat(), slice()`, 用返回的新数组覆盖旧数组 可触发视图更新

    data.items = data.items.filter(item => item.text.match(/foo/));

不会触发视图更新的数组操作：

    vm.items[i] = newItem;  
    //解决方法: 
    Vue.set(vm.$data.items, i, newItem); 
    vm.items.splice(i, 1, newItem);

    vm.items.length = newLength;
    //解决方法:
    vm.items.splice(newLength);


事件处理
----------

    <button v-on:click="count += 1">count</button>
    <div v-on:click="greet">greeting</div>
    <button v-on:click="say('hi', $event);"></button>

    new Vue({
        methods: {
            say: function(msg, event) {
                alert(msg);
                console.log(event.target.tagName);
            },
            greet: function(event){
                alert('hello ' + this.user + '!');
                console.log(event.target.tagName);
            }
        }
    });

事件修饰符: `.stop`, `.prevent`, `.self`, `.once`, `.capture`  
按键修饰符: `.enter`, `.tab`, `.esc`, `.delete`, `.space`, `.up`, `.down`, `.left`, `.right`

    Vue.config.keyCodes.f1 = 112;

表单控件绑定
---------
`v-model`

    <input type="text" v-model="msg" placeholder="edit me" />
    <textarea v-model="msg" placeholder="edit me"></textarea>

    <!-- one checkbox , true or false -->
    <input type="checkbox" v-model="checked"/>
    <label for="checkbox">{{ checked }}</label>

    <!-- checkbox group, push/pop the value -->
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <label for="jack">Jack</label>
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
    <label for="john">John</label>
    <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
    <label for="mike">Mike</label>
    <br>
    <span>Checked names: {{ checkedNames }}</span>

    <!-- radio, model bind the checked radio's value -->
    <input type="radio" id="one" value="One" v-model="picked">
    <label for="one">One</label>
    <br>
    <input type="radio" id="two" value="Two" v-model="picked">
    <label for="two">Two</label>
    <br>
    <span>Picked: {{ picked }}</span>

    <!-- select, model bind the selected option's value -->
    <select v-model="selected">
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <span>Selected: {{ selected }}</span>

    <select v-model="selected" multiple>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    <br>
    <span>Selected: {{ selected }}</span>

    <select v-model="selected">
      <option v-for="option in options" v-bind:value="option.value">
        {{ option.text }}
      </option>
    </select>
    <span>Selected: {{ selected }}</span>


    <!-- 当选中时，`picked` 为字符串 "a" -->
    <input type="radio" v-model="picked" value="a">
    <!-- `toggle` 为 true 或 false -->
    <input type="checkbox" v-model="toggle">
    <!-- 当选中时，`selected` 为字符串 "abc" -->
    <select v-model="selected">
      <option value="abc">ABC</option>
    </select>

但是有时我们想绑定 value 到 Vue 实例的一个动态属性上，这时可以用 `v-bind:value="foo"` 实现，这个属性的值可以不是字符串。

`v-bind:true-value`, `v-bind:false-value`

    <input
      type="checkbox"
      v-model="toggle"
      v-bind:true-value="a"
      v-bind:false-value="b"
    />

v-model指令的修饰符: `.lazy`, `.number`, `.trim` 

    <!-- 在 "change" 而不是 "input" 事件中更新 -->
    <input v-model.lazy="msg" >

    <!-- 自动将用户输入值转换为数值 -->
    <input v-model.number="age" type="number">

    <!-- 自动去掉头尾空格 -->
    <input v-model.trim="msg" type="text" />


组件
-------
### 组件注册

    // 注册 **注意需在实例化根组件前，注册组件**
    Vue.component(tagName, options);

    // 局部注册
    var Child = {
        template: '<div> a child cmp</div>'
    };
    new Vue({
        components: {
            'my-cmp': Child
        }
    });

DOM模板，html标签嵌套的限制: *table*, *tr*, *ul*, *ol*, *select*

应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用(*即：非dom模板没有标签嵌套的限制*)：

+ `<script type="text/x-template">`
+ JavaScript内联模版字符串
+ .vue 组件

### is
受标签嵌套限制时，可使用is指定原生标签为自定义组件

    <table>
        <tr is="my-row"></tr>
    </table>

> 父子组件的关系： props down ; events up


组件实例的作用域是 **孤立的**。这意味着不能并且不应该在子组件的模板内直接引用父组件的数据。可以使用 props 把数据传给子组件。

### props

    <child message="hello!"></child>
    Vue.component('child', {
      // 声明 props
      props: ['message'],
      // 就像 data 一样，prop 可以用在模板内
      // 同样也可以在 vm 实例中像 “this.message” 这样使用
      template: '<span>{{ message }}</span>'
    })

动态props

    <div>
      <input v-model="parentMsg">
      <br>
      <child v-bind:my-message="parentMsg"></child>
    </div>

单向数据流 

prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。
另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop 。如果你这么做了，Vue 会在控制台给出警告。

> 注意在 JavaScript 中对象和数组是引用类型，指向同一个内存空间，如果 prop 是一个对象或数组，在子组件内部改变它会影响父组件的状态。


props验证  

```js
    Vue.component('example', {
    props: {
        // 基础类型检测 （`null` 意思是任何类型都可以）
        propA: Number,
        // 多种类型
        propB: [String, Number],
        // 必传且是字符串
        propC: {
        type: String,
        required: true
        },
        // 数字，有默认值
        propD: {
        type: Number,
        default: 100
        },
        // 数组／对象的默认值应当由一个工厂函数返回
        propE: {
        type: Object,
        default: function () {
            return { message: 'hello' }
        }
        },
        // 自定义验证函数
        propF: {
        validator: function (value) {
            return value > 10
        }
        }
    }
    })
```

自定义事件
----------
我们知道，父组件是使用 `props` 传递数据给子组件，但如果子组件要把数据传递回去，应该怎样做？那就是自定义事件！

    vm.$on(eventName, callback);
    vm.$emit(eventName, data);

    <div id="counter-event-example">
      <p>{{ total }}</p>
      <button-counter v-on:increment="incrementTotal"></button-counter>
      <button-counter v-on:increment="incrementTotal"></button-counter>
    </div>

```js
    Vue.component('button-counter', {
    template: '<button v-on:click="increment">{{ counter }}</button>',
    data: function () {
        return {
          counter: 0
        }
    },
    methods: {
        increment: function () {
          this.counter += 1
          this.$emit('increment')
        }
    },
    })
    new Vue({
      el: '#counter-event-example',
      data: {
          total: 0
      },
      methods: {
          incrementTotal: function () {
            this.total += 1
          }
      }
    })
```


有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 .native 修饰 v-on 。例如：

    <my-component v-on:click.native="doTheThing"></my-component>


###非父子组件通信 (event bus)

有时候非父子关系的组件也需要通信。在简单的场景下，使用一个空的 Vue 实例作为中央事件总线：

    var bus = new Vue()

    // 触发组件 A 中的事件
    bus.$emit('id-selected', 1)

    // 在组件 B 创建的钩子中监听事件
    bus.$on('id-selected', function (id) {
      // ...
    })


使用 Slot 分发内容
-------------------

父组件模板的内容在父组件作用域内编译；子组件模板的内容在子组件作用域内编译。

### 作用域插槽 scope slot

在子组件中，只需将数据传递到插槽，就像你将 prop 传递给组件一样：

    <div class="child">
      <slot text="hello from child"></slot>
    </div>

    <div class="parent">
      <child>
        <!-- 渲染时，可使用子组件传来的数据 -->
        <template scope="props">
          <span>hello from parent</span>
          <span>{{ props.text }}</span>
        </template>
      </child>
    </div>

### 动态组件

    <component v-bind:is="currentView">
      <!-- 组件在 vm.currentview 变化时改变！ -->
    </component>

### keep-alive

    <keep-alive>
      <component :is="currentView">
        <!-- 非活动组件将被缓存！ -->
      </component>
    </keep-alive>


Vue 组件的 API 来自三部分： `props`, `events` 和 `slots` ：

+ Props 允许外部环境传递数据给组件
+ Events 允许组件触发外部环境的副作用
+ Slots 允许外部环境将额外的内容组合在组件中。

### 子组件索引 ref 

    <div id="parent">
      <user-profile ref="profile"></user-profile>
    </div>
    var parent = new Vue({ el: '#parent' })
    // 访问子组件
    var child = parent.$refs.profile

当 ref 和 v-for 一起使用时， ref 是一个数组或对象，包含相应的子组件。

### 异步组件
Vue.js 允许将组件定义为一个工厂函数，动态地解析组件的定义。Vue.js 只在组件需要渲染时触发工厂函数，并且把结果缓存起来，用于后面的再次渲染。例如：

    Vue.component('async-example', function (resolve, reject) {
      setTimeout(function () {
        // Pass the component definition to the resolve callback
        resolve({
          template: '<div>I am async!</div>'
        })
      }, 1000)
    })

工厂函数接收一个 resolve 回调，在收到从服务器下载的组件定义时调用。
推荐配合使用 ：Webpack 的代码分割功能：

```js
    Vue.component('async-webpack-example', function (resolve) {
    // 这个特殊的 require 语法告诉 webpack
    // 自动将编译后的代码分割成不同的块，
    // 这些块将通过 Ajax 请求自动下载。
    require(['./my-async-component'], resolve)
    })
```

你可以使用 Webpack 2 + ES2015 的语法返回一个 Promise resolve 函数：

```js
    Vue.component(
    'async-webpack-example',
    () => System.import('./my-async-component')
    )
```

### 组件命名约定

```js
    components: {
    // 使用 kebab-case 形式注册
    'kebab-cased-component': { /* ... */ },
    // register using camelCase
    'camelCasedComponent': { /* ... */ },
    // register using TitleCase
    'TitleCasedComponent': { /* ... */ }
    }   
```

当使用字符串模板时，可以不受 HTML 的 case-insensitive 限制。这意味实际上在模版中，你可以使用 camelCase 、 TitleCase 或者 kebab-case 来引用：

    <!-- 在字符串模版中可以用任何你喜欢的方式! -->
    <my-component></my-component>
    <myComponent></myComponent>
    <MyComponent></MyComponent>

如果组件未经 slot 元素传递内容，你甚至可以在组件名后使用 / 使其自闭合：
`<my-component/>`

当然，这只在字符串模版中有效。因为自闭的自定义元素是无效的 HTML ，浏览器原生的解析器也无法识别它。

### 递归组件
组件在它的模板内可以递归地调用自己，不过，只有当它有 name 选项时才可以：
当你利用Vue.component全局注册了一个组件, 全局的ID作为组件的 name 选项，被自动设置.

```js
    Vue.component('unique-name-of-my-component', {
      // ...
    })
```

### 内联模版

    <my-component inline-template>
      <div>
        <p>These are compiled as the component's own template.</p>
        <p>Not parent's transclusion content.</p>
      </div>
    </my-component>

### X-Templates

    <script type="text/x-template" id="hello-world-template">
      <p>Hello hello hello</p>
    </script>
    Vue.component('hello-world', {
      template: '#hello-world-template'
    })

// 使用 v-once 的低级静态组件(Cheap Static Component)
尽管在 Vue 中渲染 HTML 很快，不过当组件中包含大量静态内容时，可以考虑使用 v-once 将渲染结果缓存起来，就像这样：

```js
    Vue.component('terms-of-service', {
      template: '\
        <div v-once>\
          <h1>Terms of Service</h1>\
          ... a lot of static content ...\
        </div>\
      '
    })
```

响应系统
-----------
受现代 Javascript 的限制（以及废弃 Object.observe），Vue 不能检测到对象属性的添加或删除。
由于 Vue 会在初始化实例时对属性执行 getter/setter 转化过程，所以属性必须在 data 对象上存在才能让 Vue 转换它，这样才能让它是响应的。

```js
    var vm = new Vue({
      data:{
      a:1
      }
    })
    // `vm.a` 是响应的
    vm.b = 2
    // `vm.b` 是非响应的
```

Vue 不允许在已经创建的实例上动态添加新的根级响应式属性(root-level reactive property)。
然而它可以使用 Vue.set(object, key, value) 方法将响应属性添加到嵌套的对象上：

```js
    Vue.set(vm.someObject, 'b', 2);
    // or
    vm.$set(vm.someObject,'b',2)
```

有时你想向已有对象上添加一些属性，例如使用 Object.assign() 或 _.extend() 方法来添加属性。
但是，添加到对象上的新属性不会触发更新。在这种情况下可以创建一个新的对象，让它包含原对象的属性和新的属性：

```js
    // 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
    this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

### 声明响应式属性
由于 Vue 不允许动态添加根级响应式属性，所以你必须在初始化实例前声明根级响应式属性，哪怕只是一个空值:

```js
    var vm = new Vue({
      data: {
        // 声明 message 为一个空值字符串
        message: ''
      },
      template: '<div>{{ message }}</div>'
    })
    // 之后设置 `message` 
    vm.message = 'Hello!'
```

### 异步更新队列
Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。
如果同一个 watcher 被多次触发，只会一次推入到队列中。
Vue 在内部尝试对异步队列使用原生的 Promise.then 和 MutationObserver，如果执行环境不支持，会采用 setTimeout(fn, 0) 代替。


为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 `Vue.nextTick(callback)` 。
这样回调函数在 DOM 更新完成后就会调用。例如：

```js
    var vm = new Vue({
      el: '#example',
      data: {
        message: '123'
      }
    })
    vm.message = 'new message' // 更改数据
    vm.$el.textContent === 'new message' // false
    Vue.nextTick(function () {
      vm.$el.textContent === 'new message' // true
    })
```

在组件内使用 vm.$nextTick() 实例方法特别方便，因为它不需要全局 Vue ，
并且回调函数中的 this 将自动绑定到当前的 Vue 实例上：

```js
    Vue.component('example', {
      template: '<span>{{ message }}</span>',
      data: function () {
        return {
          message: 'not updated'
        }
      },
      methods: {
        updateMessage: function () {
          this.message = 'updated'
          console.log(this.$el.textContent) // => '没有更新'
          this.$nextTick(function () {
            console.log(this.$el.textContent) // => '更新完成'
          })
        }
      }
    })
```

过渡效果
-----------
Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。
包括以下工具：

+ 在 CSS 过渡(transition)和动画(animation)中自动应用 class
+ 可以配合使用第三方 CSS 动画库，如 Animate.css
+ 在过渡钩子函数中使用 JavaScript 直接操作 DOM
+ 可以配合使用第三方 JavaScript 动画库，如 Velocity.js

### 单元素/组件的过渡
Vue 提供了 transition 的封装组件，在下列情形中，可以给任何元素和组件添加 entering/leaving 过渡

+ 条件渲染 （使用 v-if）
+ 条件展示 （使用 v-show）
+ 动态组件
+ 组件根节点

    <div id="demo">
      <button v-on:click="show = !show">
        Toggle
      </button>
      <transition name="fade">
        <p v-if="show">hello</p>
      </transition>
    </div>

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
      opacity: 0
    }

// 过渡的-CSS-类名
会有 4 个(CSS)类名在 enter/leave 的过渡中切换

+ v-enter: 定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
+ v-enter-active: 定义进入过渡的结束状态。在元素被插入时生效，在 transition/animation 完成之后移除。
+ v-leave: 定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除。
+ v-leave-active: 定义离开过渡的结束状态。在离开过渡被触发时生效，在 transition/animation 完成之后移除。


// 自定义过渡类名

    <link href="https://unpkg.com/animate.css@3.5.1/animate.min.css" rel="stylesheet" type="text/css">
    <div id="example-3">
      <button @click="show = !show">
        Toggle render
      </button>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated tada"
        leave-active-class="animated bounceOutRight"
      >
        <p v-if="show">hello</p>
      </transition>
    </div>

// 同时使用 Transitions 和 Animations

Vue 为了知道过渡的完成，必须设置相应的事件监听器。它可以是 transitionend 或 animationend ，这取决于给元素应用的 CSS 规则。
如果你使用其中任何一种，Vue 能自动识别类型并设置监听。
但是，在一些场景中，你需要给同一个元素同时设置两种过渡动效，比如 animation 很快的被触发并完成了，
而 transition 效果还没结束。在这种情况中，你就需要使用 type 特性并设置 animation 或 transition 来明确声明你需要 Vue 监听的类型。

// JavaScript 钩子

    <transition
      v-on:before-enter="beforeEnter"
      v-on:enter="enter"
      v-on:after-enter="afterEnter"
      v-on:enter-cancelled="enterCancelled"
      v-on:before-leave="beforeLeave"
      v-on:leave="leave"
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"
    >
      <!-- ... -->
    </transition>

```js
// ...
    methods: {
      // --------
      // 进入中
      // --------
      beforeEnter: function (el) {
        // ...
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      enter: function (el, done) {
        // ...
        done()
      },
      afterEnter: function (el) {
        // ...
      },
      enterCancelled: function (el) {
        // ...
      },
      // --------
      // 离开时
      // --------
      beforeLeave: function (el) {
        // ...
      },
      // 此回调函数是可选项的设置
      // 与 CSS 结合时使用
      leave: function (el, done) {
        // ...
        done()
      },
      afterLeave: function (el) {
        // ...
      },
      // leaveCancelled 只用于 v-show 中
      leaveCancelled: function (el) {
        // ...
      }
    }
```

// 多个元素的过渡

    <transition>
      <button v-if="isEditing" key="save">
        Save
      </button>
      <button v-else key="edit">
        Edit
      </button>
    </transition>

在一些场景中，也可以给通过给同一个元素的 key 特性设置不同的状态来代替 v-if 和 v-else，上面的例子可以重写为：

    <transition>
      <button v-bind:key="isEditing">
        {{ isEditing ? 'Save' : 'Edit' }}
      </button>
    </transition>

// 过渡模式
一个离开过渡的时候另一个开始进入过渡。这是 <transition> 的默认行为 - 进入和离开同时发生。

+ in-out: 新元素先进行过渡，完成之后当前元素过渡离开。
+ out-in: 当前元素先进行过渡，完成之后新元素过渡进入。

    <transition name="fade" mode="out-in">
      <!-- ... the buttons ... -->
    </transition>

// 多个组件的过渡

    <transition name="component-fade" mode="out-in">
      <component v-bind:is="view"></component>
    </transition>

// 列表过渡



changes 
-------------
1. 属性内插值被删除  

      data-foo="hello {{msg}}" #error 
      :data-foo="'test ' + msg" #right

2. 不能在v-bind以外的指令的表达式中使用过滤器, 自定义指令需使用计算属性替代过滤器?
3. 增加 .once 事件修饰符, .once可用于自定义事件  <button v-on:remove.once="dothis">&times;</button>
4. 新增按键修饰符：.ctrl, .alt, .shift, .meta
5. 作用域插槽
6. transition属性 变为 transition元素指令 
7. so many changes ...


API
===============

```js
    Vue.config = {
        silent: false,
        optionMergeStrategies: {},
        errorHandler: function(){..},
        ignoreElements: [],
        keyCodes: {},


    }

    Vue.extend(options);
    Vue.nextTick(fn, context);

    Vue.set(object, key, value);
    Vue.delete(object, key);

    Vue.directive(id, [definition]);
    Vue.filter(id, [definition]);
    Vue.component(id, [definition]);

    Vue.use(plugin);
    Vue.mixin(options);

    Vue.compile(template);

    new Vue({
      data: {// vm.$data  JSON.parse(JSON.stringify(vm.$data))
        a: 1
      },
      /*props: ['size', 'msg'],*/
      props: {
        size: {
          type: Number
        },
        msg: {
          type: String,
          default: 'hi',
          required: true,
          validator: function(v) {
            return v.length > 2;
          }
        }
      },
      computed: {
        adouble: function(){
          return this.a * 2;
        },
        aplus: {
          get: function(){
            return this.a + 1;
          },
          set: function(v) {
            this.a = v -1;
          }
        }
      },
      methods: {
        plus: function(){
          this.a++;
        }
      },
      watch: {
        a: function(val, oldVal){
          console.log('newval=%s, oldval=%s', val, oldVal);
        },
        b: 'someMethod',
        c: {
          handler: function(val, oldVal) {
            //..
          },
          deep: true
        }
      },
      el: '#mount-point',
      //template: '#cmp-tpl'
      template: '<div class="wrap cmp">{{msg}}</div>',
      render: function(createElement){
        //...
      },
      beforeCreate: function() {},
      created: function() {},
      beforeMount: function() {},
      mounted: function() {},
      beforeUpdate: function() {},
      updated: function() {},
      activated: function() {},
      deactivated: function() {},
      beforeDestroy: function() {},
      destroyed: function() {},

      directives:{},
      filters: {},
      components: {},

      parent: parentCmp,
      mixins: [mymixin],
      name: 'MyCmp',
      extends: SuperCmp,
      delimiters: ['${', '}'],
      functional: true,

    });

    MyCmp = Vue.extend({
      data: function() {
        return {
          foo: 'foo-val'
        }
      }
    });

    //组件实例属性
    vm.$data
    vm.$el
    vm.$options

    vm.$parent
    vm.$root
    vm.$children

    vm.$slots
    vm.$scopedSlots

    vm.$refs

    vm.$isServer

    //组件实例方法
    vm.$watch(exprOrFn, callback, [options]);

    vm.$watch('a.b.c', function(val, oldval){
      console.log(val);
    });

    var unwatch = vm.$watch(function(){
      return this.a + this.b;
    }, function(val, oldval){
      //dosth..
    }, {
      depp: true,
      immediate: true
    });

    //unwatch();

    vm.$set(object, key, val);
    vm.$delete(object, key);

    vm.$once(event, callback);
    vm.$on(event, callback);
    vm.$off([event], [callback]);
    vm.$emit(event, [...args]);

    vm.$mount([elementOrSelector]);
    var MyCmp = Vue.extend({..});
    var component = MyCmp.$mount('#app');

    /*
    var component = MyCmp.$mount();
    document.getElementById('app').appendChild(component.$el);
    */

    vm.$forceUpdate()
    vm.$nextTick([callback]);
    var promise = vm.$nextTick(); //if support promise

    vm.$destroy(); // will trigger beforeDestroy and destroyed hooks


```


```html

    // 指令
    //---------------
    v-text
    <span v-text="msg"></span>

    v-html
    <div v-html="rawHtml"></div>

    v-show
    v-if
    v-else  v-else-if

    v-for
    <div v-for="item in items" :key="item.id">{{item.text}}</div>
    <div v-for="(item, index) in items"></div>
    <div v-for="(val,key,index) in obj"></div>

    v-on
    v-bind

    v-model

    v-pre
    v-cloak
    v-once

    特殊属性
    key  //virtual dom 算法相关
    ref //引用元素或组件实例
    slot 


    // 内置组件
    //------------

    component

    <!-- 动态组件由 vm 实例的属性值 `componentId` 控制 -->
    <component :is="componentId"></component>
    <!-- 也能够渲染注册过的组件或 prop 传入的组件 -->
    <component :is="$options.components.child"></component>

    transition

    <!-- 简单元素 -->
    <transition>
      <div v-if="ok">toggled content</div>
    </transition>

    <!-- 动态组件 -->
    <transition name="fade" mode="out-in" appear>
      <component :is="view"></component>
    </transition>

    <!-- 事件钩子 -->
    <div id="transition-demo">
      <transition @after-enter="transitionComplete">
        <div v-show="ok">toggled content</div>
      </transition>
    </div>

    new Vue({
      ...
      methods: {
        transitionComplete: function (el) {
          // 传入 'el' 这个 DOM 元素作为参数。
        }
      }
      ...
    }).$mount('#transition-demo')


    transition-group
    <transition-group tag="ul" name="slide">
      <li v-for="item in items" :key="item.id">
        {{ item.text }}
      </li>
    </transition-group>

    keep-alive
    <!-- 基本 -->
    <keep-alive>
      <component :is="view"></component>
    </keep-alive>
    <!-- 多个条件判断的子组件 -->
    <keep-alive>
      <comp-a v-if="a > 1"></comp-a>
      <comp-b v-else></comp-b>
    </keep-alive>
    <!-- 和 <transition> 一起使用 -->
    <transition>
      <keep-alive>
        <component :is="view"></component>
      </keep-alive>
    </transition>

    <!-- comma-delimited string -->
    <keep-alive include="a,b">
      <component :is="view"></component>
    </keep-alive>
    <!-- regex (use v-bind) -->
    <keep-alive :include="/a|b/">
      <component :is="view"></component>
    </keep-alive>

```

自定义指令
-------------
    Vue.directive('focus', {
        inserted: function(el){
            el.focus();
        }
    });

    hooks: bind inserted update componentUpdated unbind

    // update(el, binding, vnode, oldVnode)
    Vue.directive('color-swatch', function(el, binding){
        el.style.backgroundColor = binding.value;
    });

    <div v-demo="{color: white: text: 'foo'}">指令能接收任意合法的js表达式</div>

混合mixin
---------------
    
    var myMixin = {
        created: function() {
            this.hello();
        },
        methods: {
            hello: function() {
                console.log('nice to meet you..');
            }
        }
    }
    var Component = Vue.extend({
        mixins: [myMixin]
    })

同名钩子，合并为数组 mixins的钩子先调用


全局混合 扩展到Vue.options上

    Vue.mixin({
        created: function(){

        }
    })

    Vue.config.optionMergeStrategies.methods

自定义插件
-------------

    MyPlugin.install = function(vue, options) {
        Vue.globalMethod = function(){..}
        Vue.directive('my-dir', {
            bind: function(){..}
        });
        Vue.mixin({
            created: function(){..}
        })
        Vue.prototype.$myMethod = function(){...} 
    }

    Vue.use(MyPlugin);
