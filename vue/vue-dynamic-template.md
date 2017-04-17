Vue 动态添加模板的几种方法
=========================

created钩子中修改 this.$options.template
----------------------------

通常我们会在组件里的 `template` 属性定义模板，或者是在 `*.vue` 文件里的 `<template>..</template>` 标签里写模板。但是有时候会需要动态生成模板的需求，例如让用户自定义组件模板，或者设置组件的布局。

例如要做一个类 select 的组件，用户传入 options 数据，通过 value 属性 获取选中值，最基本的原型如下。

    Vue.component('MySelect', {
        template: `
            <div class="select">
              <input :value="value" readonly />
              <div class="option" v-for="option in options" @click="value=options.value">
                  <span v-text="option.label"></span>
              </div>
            </div>`,
        props: ['value', 'options']
    });

如果此时需要增加一个 API 支持让用户自定义 option 部分的模板。此处用 slot 并不能解决问题。

**通过 $options.template 修改**

通过打印组件对象可以获得一个信息，在 **$options** 里定义了一个 **template** 属性，写在 template 标签里的模板，最终编译后也会在 **$options.template** 里。**通过文档的 生命周期 可以得知，在 created 的时候， 实例已经结束解析选项， 但是还没有开始 DOM 编译** 也就是说，如果用户通过 prop 的数据我们可以获得，但是模板其实还没有渲染成 DOM。经过测试，在 created 修改 this.$options.template 是可以改变最终生成的 DOM 的，同时也能拿到 props 的内容。

那么我们可以修改下代码，使其支持自定义模板

    Vue.component('MySelect', {
        template: `
            <div class="select">
              <input :value="value" readonly />
              <div class="option" v-for="option in options" @click="value=options.value">
                  optionTemplateHolder
              </div>
            </div>`,
        props: ['value', 'options', {name: 'optionTpl', default: '<span v-text="option.label"></span>'}],
        created() {
            var optionTpl = this.optionTpl;
            this.$option.template = thie.$option.template.replace('optionTemplateHolder', optionTpl); // change template
        }
    });

然后调用

    <my-select :value.sync="value" option-tpl="<span>标签:{{option.label}}, 值:{{option.value}}</span>" :options="[{value:1, label:'A'},{value:2, label:'B'},{value:3, label:'C'}]" ></my-select>

可能存在的问题

我们知道 Vue 在内部帮我们做了许多优化，但是在这里可能会由于某些优化导致动态拼接的模板无法渲染成功。如果一个页面有多个 `my-select` 组件，并且 options 长度不一样，会导致长的 options 的组件后面几个选项渲染不出来。究其原因是 Vue 会帮我们缓存模板编译结果。翻看代码可以找到 `vue/src/instance/internal/lifecycle.js` 里有做优化，同时提供的 `_linkerCachable` 本意是给 内联模板 使用。我们可以通过设置 `this.$options._linkerCachable = false` 达到我们的目的。

这样我们就可以开发让用户自定义布局的组件了，用户传入布局参数，通过手工拼接模板，设置了 _linkerCachable = false 也不会被缓存。

通过 $options.partials 动态添加 partial
-----------------------------
使用 partials 也能达到添加自定义模板的目的，但是通常的做法是要全局注册 partial，这么做并不优雅。 `vue-strap` 就是这么做的。如果重名了会被覆盖（初次渲染不会，但是数据更新重新渲染 DOM 时就会被覆盖）。

通过文档我们知道可以在组件内部通过 partials 属性注册局部的 partial，因此自然而然也可以在 `this.$options.partials` 去动态添加了。

    Vue.component('XSelect', {
     template: `
       <div class="select">
       <input :value="value" readonly />
       <div
       class="option"
       v-for="option in options"
       @click="value = option.value">
       <partial name="option"></partial>
       </div>
     </div>`,

     props: ['template','value','options'],

     partials: {
      option: '<span v-text="option.label"></span>'
     },

     created() {
      if(this.template) {
        this.$options.partials.option =this.template
       }
     }
    })

用 interpolate 渲染模板
------------------

这种方式就略显蛋疼，而且效率最差。 interpolate 也是我最开始做动态渲染模板想到的方式，不推荐使用。

    Vue.component('XSelect', {
     template: `
       <div class="select">
       <input :value="value" readonly />
       <div
       class="option"
       v-for="option in options"
       @click="value = option.value"
       v-html="renderOption(option)">
       </div>
     </div>`,

     props: [
      'value',
      'options',
       {
         name: 'template',
         default:'<span v-text="option.label"></span>'
       }
     ],

     methods: {
       renderOption(option) {
        this.option = option;
        return this.$interpolate(this.template)
       }
     }
    })

Vue2.0
=============
目前并没有找到合适的解决方案。2.0 的 Vue 将 **compile** 工作提前，并且 `compiler` 也是单独一个包（除非你直接引用的是 vue.js 文件，包含 compiler 和 `runtime`，那么第一种方法是适用的），那么并不能动态的生成模板。除非用户传入的是 render 能识别的 DOM tree。

按照这样的思路，其实可以让用户传入的模板预先编译好，传入到组件内，拼接 DOM tree 看起来也能解决问题。那么可以这么玩。

看看就好， 性能太渣 

首先要安装 Vue JSX 的 相关插件 

组件

    Vue.component({
     name: 'XSelect',

     render(h) {
    // 这里获得的 this.template 其实是一个函数，调用该函数返回 DOM
    // 因此这里的关键代码是拼接一个新的函数，接受 `option` 参数以及上下文
    // 使用 new Function 创建一个新函数

    return (
    <div class="select">
      <input value={this.value} readonly />
       {
        this.options.map(option =>
          <div
          on-click={() => this.$emit('input', option.value) }
           class="option">
           { new Function('option', 'return ' + this.template)(option)(h) }
          </div>
         )
       }
    </div>)
     },

     props: ['template', 'value', 'options']
    })

入口文件

    new Vue({
     el: '#app',

     data () {
      return {
       value: ''
       }
     },

     created() {
      // 初始化需要传入的模板，这里会被 Vue 的 JSX 插件转成 DOM tree
      this.template = h =><span>标签: { option.label }, 值: { option.value }</span>
     },

     render(h) {
        return (
        <x-select
        v-model="value"
        :template="template"
        :options="[
         {value: 1, label: 'a'},
         {value: 2, label: 'b'},
         {value: 3, label: 'c'}
         ]">
        </x-select>
        )
     }
    })

综上，在 Vue 1.x 里不存在 预编译 的概念，所以想动态修改模板还是有许多方式的，甚至还可以结合 <slot></slot> 取到 slot 里的内容拼接进模板里。但 2.0 就麻烦了，并找不到理想的方法。