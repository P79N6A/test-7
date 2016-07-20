<template>
	<div class="popover-wrap" v-clickout="show">
	  <span v-el:trigger v-bind-event="trigger">
	    <slot><button class="btn btn-default">show popover</button></slot>
	  </span>
	  <div class="popover" :class="placement" v-el:popover v-show="show" :transition="effect">
	      <div class="arrow"></div>
	      <h3 class="popover-title" v-show="header"> 
	          <slot name="header">
	            {{header}} 
	          </slot> 
	      </h3>
	      <div class="popover-content">
	        <slot name="content"> 
	            {{{content}}} 
	        </slot> 
	      </div>
	  </div>
	</div>
</template>

<script>
  import {makeBoolean} from 'services/public';
  
  export default {
    props: {
      trigger: {//click, focus, hover
        type: String,
        default: 'click'
      },
      effect: {//fadein, scale
        type: String,
        default: 'fadein'
      },
      header: {
        type: String
      },
      content: {
        type: String
      },
      placement: {//left, right, top, bottom
        type: String,
        default: 'top'
      }
    },
    data() {
      return {
        show: false
      }
    },
    methods: {
      toggle(isShow) {
      	if(isShow == null){
	        this.show = !this.show
      	}else{
      		this.show = isShow;
      	}
      }
    },
    directives: {
    	bindEvent: {
        bind(){
          this.handler = (evt) => {
            let vm = this.vm;
            switch(evt.type){
              case 'mouseenter':
              case 'focus':
                vm.toggle(true);
                break;
            case 'mouseleave':
            case 'blur':
              vm.toggle(false);
              break;
            case 'click':
              vm.toggle();
              break;
            default:
              console.warn('[popover] prop "trigger" is not valid');
            }
          };

          this.events = {
            'hover': 'mouseenter mouseleave',
            'focus': 'focus blur',
            'click': 'click'
          };
        },
    		update(trigger, oldTrigger){
      		if (oldTrigger) {
            $(this.el).off(this.events[oldTrigger], this.handler); 
          }
  				$(this.el).on(this.events[trigger], this.handler);
    		},
    		unbind(){
    			$(this.el).off(this.events[this.vm.trigger], this.hanlder);
    		}
    	}
    }
  }
</script>

<style lang="less">
	@import '../assets/css/vars.less';

	.popover-wrap{
		.popoverWrap;
	}
	.popover-wrap .popover{
		.popover;
	}
	.popover-wrap .popover.top{
		.popoverTop;
	}
	.popover-wrap .popover.bottom{
		.popoverBottom;
	}
	.popover-wrap .popover.left{
		.popoverLeft;
	}
	.popover-wrap .popover.right{
		.popoverRight;
	}

</style>

