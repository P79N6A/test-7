<template>
  <div class="tooltip-wrap" v-clickout="show">
  	
    <span v-el:trigger v-bind-event="trigger">
  	  <slot></slot>
  	</span>

  	<div class="tooltip" :class="placement" v-el:popover v-show="show" :transition="effect" role="tooltip">
  	  <div class="tooltip-arrow"></div>
  	  <div class="tooltip-inner">
  	     <slot name="content"> {{{content}}} </slot>
  	 </div>
  	</div>

  </div>
</template>

<script>
 import popoverOpts from 'components/Popover';

  export default {
    mixins: [popoverOpts],
    props: {
      trigger: {
        type: String,
        default: 'hover'
      },
      effect: {
        type: String,
        default: 'scale'
      }
    }
  }
</script>

<style lang="less">
  @import "../assets/css/vars.less";

  .tooltip {
    opacity: .9;
    white-space: nowrap;
  }

  .tooltip-wrap{
  	.popoverWrap;
  }
  .tooltip-wrap .tooltip{
  	.popover(auto);
  }
  .tooltip-wrap .tooltip.top{
  	.popoverTop;
  }
  .tooltip-wrap .tooltip.bottom{
  	.popoverBottom;
  }
  .tooltip-wrap .tooltip.left{
  	.popoverLeft;
  }
  .tooltip-wrap .tooltip.right{
  	.popoverRight;
  }

</style>
