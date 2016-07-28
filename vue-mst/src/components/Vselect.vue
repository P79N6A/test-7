<template>
  <div class="select-wrap btn-group">
      <btn class="dropdown-toggle" @click="toggleDropdown" @blur="show = false" :disabled="disabled" :type="btnType" :size="btnSize">
          <span class="btn-placeholder" v-show="showPlaceholder">{{placeholder}}</span>
          <span class="btn-content">{{ selecteds | selectedsText }}</span>
          <span class="caret"></span>
      </btn>
      <ul class="dropdown-menu" v-show="show" transition="dropdown">
          <li v-if="search" class="bs-searchbox">
              <input type="text" placeholder="Search" v-model="searchText" class="form-control" autocomplete="off" @focus="show=true" @blur="show=false">
          </li>
          <li is="voption" v-for="option in options | filterBy searchText "  :option="option" @selectoption="select(option);"></li>
          <div class="notify" v-show="showNotify" transition="fadein">Limit reached ({{limit}} items max). </div>
      </ul>
  </div>
</template>

<script>
import {makeBoolean, makeNumber, isArray} from 'services/public';
import Vue from 'vue';


  export default {
  	name: 'Vselect',
    props: {
      options: {
        type: Array,
        default() { return [] }
      },
      placeholder: {
        type: String,
        default: '请选择'
      },
      btnType: {
        type: String,
        default: 'default'
      },
      btnSize: {//lg md sm
        type: String,
        default: 'md'
      },
      multiple: {//是否多选
        type: Boolean,
        coerce: makeBoolean,
        default: false
      },
      search: {//是否可搜索
      	type: Boolean,
        coerce: makeBoolean,
      	default: false
      },
      limit: {//最多选择几项
        type: Number,
        coerce: makeNumber,
        default: 8
      },
      disabled: {
        type: Boolean,
        coerce: makeBoolean,
        default: false
      }
    },
    created() {
      !this.multiple && (this.limit = 1);
      this.options.forEach( opt => {
      	if (opt.selected == null) {
      		Vue.set(opt,'selected',false);
      	}
      });
    },
    data() {
      return {
        searchText: null,
        show: false,
        showNotify: false
      }
    },
    computed: {
      selecteds() {//计算selecteds数组
      	return this.options.filter( opt => opt.selected );
      },
      showPlaceholder() {
        return this.selecteds.length === 0;
      }
    },
    watch: {},
    methods: {
	  select(opt) {//点选列表项
        if(!opt.selected){//将勾选
          if (!this.multiple && this.selecteds.length) {//单选 且 已选
            this.selecteds[0].selected = false;//清除原有单选项
          }

          if(this.selecteds.length >= this.limit){
            this.showNotify = true;
            setTimeout(() => {this.showNotify = false; this.show = false;}, 1000);
          }else{
            opt.selected = true; //勾选 //selecteds会被立即重新计算
          }

        }else{//将不勾选
          opt.selected = false; //selecteds会被立即重新计算
        }
    	  
    	  if (this.selecteds.length === this.limit && !this.showNotify) {//不可再勾选 则隐藏列表
          this.toggleDropdown();
        }

        this.$dispatch('select', this.selecteds);
    
    },
      toggleDropdown() {//显隐下拉列表
        this.show = !this.show;
      }
    },
    filters:{
    	selectedsText(selecteds){
    		return selecteds.map( opt => opt.text ).join(', ');
    	}
    }
  }
</script>

<style scoped lang="less">
  
  .bs-searchbox {
    padding: 4px 8px;
  }
  .btn-group .dropdown-menu .notify {
    position: absolute;
    bottom: 5px;
    width: 96%;
    margin: 0 2%;
    min-height: 26px;
    padding: 3px 5px;
    background: #f5f5f5;
    border: 1px solid #e3e3e3;
    box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
     pointer-events: none;
    opacity: .9;
  }
  .select-wrap{
    .dropdown-menu {
      display: block; 
      .select-item{
        position: relative;
       
      }
    }

  }
</style>
