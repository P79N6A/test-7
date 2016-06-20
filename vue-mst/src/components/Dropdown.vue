<template>
 <div class="dropdown-wrap dis-ib" :class="{dropup: dropup, dropdown: !dropup, open: open}" v-open="open">
 	
  <slot name="dropdown-toggle">
 		<button class="btn btn-default dropdown-toggle" data-toggle="dropdown" @click.stop="toggle">{{btnText}} <span class="caret"></span></button>
	</slot>

	<slot name="dropdown-menu">
	 	<ul class="dropdown-menu" :class="{'dropdown-menu-right': menuRight}">
			<li v-for="link in links" :class="{disabled: link.disabled, divider:!link.text}">
				<a v-link="{path: link.url}" v-if="!!link.text" v-bread="link">{{link.text}}</a>
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
  			default: false
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
  		}
  	},
  	methods:{
  		toggle(){
  			this.open = !this.open;
  		}
  	},
  	directives: {
		open: {
			bind: function(){
				var self = this;
				var toggleOpen = function (){
					self.vm.open = !self.vm.open;
				};
				
				self.hideDropdown = function hideDropdown(event){
					if (!self.el.contains(event.target)) {
						self.vm.open = false;
					}
				};
				
				$('body').on('click', self.hideDropdown);
				
				self.on('click', toggleOpen);
			},
			unbind: function(){
				$('body').off('click', this.hideDropdown);
			}
		}
	}
  }
</script>
