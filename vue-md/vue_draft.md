dom和数据绑定 保持同步

domListener 监听用户操作对model的改变

指令 数据变化需要dom做响应时适用

v-if
v-text
v-html
v-on
v-bind
v-for


动态组件，组件间的数据流， 事件系统
组件系统

根实例

vm = new Vue(options)
Component  = Vue.extend(options);
cmp = new Component(options);

options:
----------
data
methods
el
template
init
created
beforeCompile
compiled
ready
beforeDestroy
destroyed



响应的数据属性

vm.$data
vm.$el
vm.$watch('prop', function(newVal, oldVal){..})
vm.$mount(el)
没有template选项 则会把el.innerHTML作为template
vm.$destroy()


dom模板
插值: {{msg}} {{{html}}} {{* once }}  XSS攻击
标签 特性插值: <div id="item-{{id}}">..</div>

{{..}} 内部的为绑定表达式，有表达式和过滤器构成。 单个表达式 （声明语句和流程控制语句都是不行的)

过滤器 {{msg | capitalize}} {{msg|filterA|filterB}}  {{msg|filterA 'arg1' arg2}}


指令的值限定为绑定表达式:  参考插值 {{msg|filter}} 绑定表达式由：js表达式和过滤器构成

指令的职责是：表达式的值改变时，把特殊的行为应用到dom上.

<a v-bind:href="url>..</a>  href是指令v-bind的参数 url是绑定表达式
<a v-on:click="dosomething">..</a> 
<a v-bind:href.literal="/a/b/c">..</a>  literal为修饰符 表明/a/b/c是字面量，不是表达式.

缩写
	<a :href="url"></a>
	<a @click="dosth"></a>

模板中的绑定表达式(或者说插值)都应该简单，需要复杂逻辑时，可用计算属性

var vm = new Vue({
 el:'#app',
 data: {
  a: 1
 }，
 computed:{
  b: function(){
  	return  this.a+1;
  }
 }

计算属性可以包含: getter, setter

computed: {
	fullName: {
		get: function(){
			return this.firstName + ' ' + this.lastName;
		},
		set: function(fname){
			var names = fname.split(' ');
			this.firstName = names[0];
			this.lastName = names[1];
		}
	}
}


class and style binding
-----------------------------

	<div class="static" :class="{'class-a': isA, 'class-b': isB}">..</div>

	<div :class="classObj">...</div>

	<div :class="[classA, classB, isC?classC:'']">..</div>

	
	可以在数组语法中使用对象语法 避免使用多个条件表达式的繁琐
	<div :class="[classA, {classB: isB, classC: isC}]">..</div>

	<div :style="{color: activeColor, fontSize: fontSize + 'px'}">..</div>
	<div :style="styleObj">..</div> //用计算属性styleObj
	<div :style="[styleA, styleB]">..</div> //样式属性若需要前缀会自动处理


condition render
------------------

	<h1 v-if="yes">yes</h1>
	<h1 v-else>no</h1>

	<template v-if="ok">
		...
	</template>

	<div v-show="ok">...</div>  //注意 v-show不支持 template 语法.


list render
-------------

	<ul>
		<li v-for="item in items">
			{{parentMsg}} >- {{$index}} : {{item.message}}
		</li>
	</ul>

	<div v-for="(index, item) in items">
		{{index}}  {{item.message}}
	</div>

	//of分隔符
	<div v-for="(index, item) of items">
			{{index}}  {{item.message}}
	</div>

	<template v-for="item in items">
		...
	</template>

array changing check
--------------------

数组的变异方法: push(), pop(), shift(), unshift(), splice(), sort(), reverse()

数组非变异方法: filter(), map(), 


