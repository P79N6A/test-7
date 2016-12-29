Vue.directive('focus', {
    inserted: function(el){
        el.focus();
    }
});

hooks: bind inserted update componentUpdated unbind

update(el, binding, vnode, oldVnode)


Vue.directive('color-swatch', function(el, binding){
    el.style.backgroundColor = binding.value;
});


<div v-demo="{color: white: text: 'foo'}">指令能接收任意合法的js表达式</div>


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