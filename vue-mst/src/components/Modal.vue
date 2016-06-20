<template>
    <div role="dialog"   v-bind:class="{'modal':true, 'fade':effect === 'fade', 'zoom':effect === 'zoom'}"  vxxbackdrop="backdrop"  :show="show"  transition="modal" v-show="show">
        
        <div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small}" role="document" v-bind:style="{width: width}">
            <div class="modal-content">
                <slot name="modal-header">
                    <div class="modal-header">
                        <button type="button" class="close" @click="close"><span>&times;</span></button>
                        <h4 class="modal-title"> 
                          <slot name="title">
                            {{title}}
                          </slot>
                        </h4>
                    </div>
                </slot>
        
                <slot name="modal-body">
                    <div class="modal-body">default body..</div>
                </slot>
        
                <slot name="modal-footer">
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default"  :class=" {'btn-primary': type=='alert'}"  @click="cancelCallback">{{ cancelText }}</button>
                        <button type="button"  v-if="type !== 'alert'" class="btn btn-primary" @click="okCallback">{{ okText }}</button>
                    </div>
                </slot>
            </div>
        </div>

    </div>
</template>
<script>
import {makeBoolean} from 'services/public';
import $ from 'jquery';

export default {
    name:'Modal',
    props: {
        type: {//弹窗类型 alert confirm
            type: String,
            default: 'confirm'
        },
        okText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '取消'
        },
        title: {
            type: String,
            default: '提示'
        },
        show: {
            require: true,
            type: Boolean,
            coerce: makeBoolean,
            twoWay: true
        },
        width: {
            default: null
        },
        okCallback: {
            type: Function,
            default () {}
        },
        effect: {
            type: String,
            default: 'fade'
        },
        backdrop: {//是否需要背景遮罩
            type: Boolean,
            coerce: makeBoolean,
            default: true
        },
        large: {
            type: Boolean,
            coerce: makeBoolean,
            default: false
        },
        small: {
            type: Boolean,
            coerce: makeBoolean,
            default: false
        }
    },
    transitions: {
        'modal': {
            beforeEnter(el){
                setTimeout(()=>{ 
                    $(el).show(); 
                    $('<div class="modal-backdrop fade" deps="1"></div>').appendTo('body');
                }, 1);
            },
            enter(el){
                setTimeout(()=>{
                    $(el).addClass('in');
                    $('.modal-backdrop').addClass('in');
                }, 100);
            },
            leave(el){
                $(el).removeClass('in');
            },
            afterLeave(el){
                $('.modal-backdrop').remove();
                
            }
        } 
    },
    methods: {
        close() {
            this.show = false;
        },
        cancelCallback(){
            this.close();
        }
    }
}
</script>
<style>
.modal {
    transition: all 0.3s ease;
}

.modal.in {
    background-color: rgba(0, 0, 0, 0.5);
}

.modal.zoom .modal-dialog {
    -webkit-transform: scale(0.1);
    -moz-transform: scale(0.1);
    -ms-transform: scale(0.1);
    transform: scale(0.1);
    top: 300px;
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    transition: all 0.3s;
}

.modal.zoom.in .modal-dialog {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    -webkit-transform: translate3d(0, -300px, 0);
    transform: translate3d(0, -300px, 0);
    opacity: 1;
}
</style>
