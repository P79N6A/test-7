<template>
	<div class="typeahead-wrap">
	
	  <input type="text" class="form-control" :placeholder="placeholder" autocomplete="off" v-model="query" @keydown.up="up" @keydown.down="down" @keydown.enter= "select(items[current])" @keydown.esc="reset" @blur="showDropdown = false" @focus="selected=false" @keydown.delete="selected=false" :debounce="debounce" v-el:inputbox />
	  <input type="hidden" name="selectedVal" v-model="value" />

	  <ul class="dropdown-menu" v-show="showDropdown" transition="dropdown">
	    <li v-for="item in items" track-by="$index" :class="{'active': current === $index}" @mouseover="current = $index" @mousedown.prevent="select(item)">
	      <partial name="item"></partial>
	    </li>
	  </ul>

	</div>

</template>

<script>
	import { makeNumber } from 'services/public';

	export default {
	  props: {
	    data: { //提供静态数据 从中筛选
	      type: Array
	    },
	    api: { //后端接口，获取列表数据, 形如:http://site.com/some/api.php?city={query}&other=foo
	      type: String
	    },
	    ondata:{
	    	type: Function,
	    	default(res){
	    		this.items = res.data.data;
	    		this.showDropdown  = this.items.length > 0;
	    	}
	    },
	    value:{
	    	twoWay: true,
	    	type: String
	    },
	    onselect: {
	      type: Function,
	      default (item, vm) {}
	    },
	    placeholder: {
	      type: String,
	      default: '请输入关键字'
	    },
	    itemHtml: {
	      type: String
	    },
	    debounce: { //input后延时查询
	      type: Number,
	      coerce: makeNumber,
	      default: 100
	    }
	  },
	  data() {
	    return {
	      query: '',
	      current: 0,
	      showDropdown: false,
	      selected: false, //是否已选
	      items: []
	    }
	  },
	  computed:{},
	  watch:{
	  	query: function updateList(query, oldQuery){//关键字改变则更新列表
	  		var api, lower = s => s.toLowerCase();
	  		if(!query || this.selected) return;
	  		
	  		if(this.data){
	  			this.items = this.data.filter(item=> lower(item).indexOf(lower(query))>-1);
	  			this.showDropdown  = this.items.length > 0;
	  		}else if(this.api){
	  			api = this.api.replace('{query}', encodeURIComponent(query) );
	  			this.$http.get(api).then(this.ondata);
	  		}
	  	}
	  },
	  partials: {
	  	'item': '<a><span v-html="item | highlight query"></span></a>'
	  },
	  created() {
	    if(this.itemHtml){
	    	this.$options.partials.item = this.itemHtml;
	    }
	  },
	  methods: {
	    reset() {
	      this.items = [];
	      this.query = '';
	      this.showDropdown = false;
	    },
	    select(item) {//选择列表项
	      this.query = item; //文本框赋值
	      this.value = item;//值传递给外部
	      this.selected = true;
	      this.showDropdown = false;//隐藏列表
	      this.onselect(item, this);
	    },
	    up() {
	      if (this.current > 0) this.current--;
	    },
	    down() {
	      if (this.current < this.items.length - 1) this.current++;
	    }
	  },
	  filters: {
	    highlight(value, phrase) {
	      return VIP.isString(value) ? value.replace(new RegExp('(' + phrase + ')', 'gi'), '<strong>$1</strong>') : value;
	    }
	  }
	}

</script>

<style>
	.typeahead-wrap{
		position: relative;
	}

	.dropdown-menu > li > a {
	  cursor: pointer;
	}
</style>
