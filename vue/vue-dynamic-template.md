Vue 动态添加模板的几种方法
=========================

通常我们会在组件里的 `template` 属性定义模板，或者是在 `*.vue` 文件里的 `template` 标签里写模板。但是有时候会需要动态生成模板的需求，例如让用户自定义组件模板，或者设置组件的布局。

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

    <my-select :value.sync="value" template="<span>标签:{{option.label}}, 值:{{options.value}}</span>" :options="[{value:1, label:'A'},{value:2, label:'B'},{value:3, label:'C'}]" ></my-select>