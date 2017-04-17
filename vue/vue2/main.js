import Vue from 'vue';
window.Vue = Vue;

Vue.component('jsx-example', {
    render(h) {
        var data = {
            class: ['some', 'awesome']
        };
        return (
            <div
                id="jsx-example"
                {...data}
                onClick={this.clickHandler}
                nativeOnClick={this.nativeClickHandler}>
                jsx example cool.., try click me
            </div>
        );
    },
    mounted: function() {
        console.log('jsx-example mounted..');
        this.$emit('click'); // no effect
        this.$nextTick(function () {
            this.$emit('click'); // no effect too
        })
    },
    methods: {
        clickHandler() {
            console.log('got click event..');
        },
        nativeClickHandler() {
            console.log('got native click event..'); // click , not exec this method..
        }

    }
});

var app = new Vue({
    el: '#app',
    data: {
        msg: 'hello world'
    }
});