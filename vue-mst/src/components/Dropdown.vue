<template>
 <div class="dropdown-wrap" :class="dropdownClass" v-ahref="links" v-clickout="open">
 	
  <slot name="dropdown-toggle">
 		<button type="button" class="btn dropdown-toggle" :class="['btn-'+btnSize, 'btn-'+btnType]" data-toggle="dropdown" @click.stop.prevent="toggle">{{btnText}} <span class="caret"></span></button>
	</slot>

	<slot name="dropdown-menu">
	 	<ul class="dropdown-menu" :class="{'dropdown-menu-right': menuRight}"  v-show="open" transition="dropdown">
			<li v-for="link in links" :class="{disabled: link.disabled, divider:!link.text}"  @click="onselect(link, $index, $event)">
				<a v-link="{path: link.url}" v-if="!!link.text">{{link.text}}</a>
			</li>
	 	</ul>
	</slot>
 
 </div>
</template>
<script>
  import {makeBoolean} from 'services/public';

  export default {
    name:'Dropdown',
  	props: {
  		dropup: {
  			type: Boolean,
  			coerce: makeBoolean,
  			default: false
  		},
  		menuRight: {
  			type: Boolean,
  			coerce: makeBoolean, 
  			default: false
  		},
  		open: {
  			type: Boolean,
  			coerce: makeBoolean,
        twoWay: true,
  			default: false
  		},
      btnSize: {//lg, sm, xs
        type: String,
        default: 'md'
      },
      btnType: {//warning, danger, info, success, default
        type: String,
        default: 'default'
      }, 
  		btnText: {
  			type: String,
  			default: 'Dropdown'
  		},
  		links: {
  			type: Array,
  			default(){
  				return [];
  			}
  		},
      onselect:{//选择列表项回调
        type: Function,
        default: (link, index, $event)=>{}
      }
  	},
  	methods:{
  		toggle(ev){
        ev.preventDefault();
  			this.open = !this.open;
  		}
  	},
    computed: {
      inBtnGroup(){
        return this.$parent.constructor.name.toLowerCase().indexOf('btngroup')>-1;
      },
      btnStyle(){
        this.btnSize = this.$parent.size;
        this.btnType = this.$parent.type;
        return 'btn-group-' + this.$parent.size + ' btn-group-' + this.$parent.type;
      },
      dropdownClass(){
        let aClass = [];
        aClass.push(this.dropup?'dropup':'dropdown');
        this.open && aClass.push('open');
        this.inBtnGroup && aClass.push('btn-group', this.btnStyle);
        return aClass.join(' ');
      }
    }/*,

  	directives: {
    		open: {//dropdown显示控制 以及点击其他地方隐藏dropdown
    			bind: function(){
    				var self = this;
    				var toggleOpen = function (){
    					self.vm.open = !self.vm.open;
    				};
    				
    				self.hideDropdown = function hideDropdown(event){
    					if (!self.el.contains(event.target)) {//点击dropdown之外 隐藏dropdown
    						self.vm.open = false;
    					}
    				};
    				
    				$('body').on('click', self.hideDropdown);//其他地方 隐藏
    				
    				self.on('click', toggleOpen);//点击自身 显隐切换
    			},
    			unbind: function(){
    				$('body').off('click', this.hideDropdown);
    			}
    		}
  	}*/
  }
</script>
