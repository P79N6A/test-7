<template>
  <div class="searchbar">
    <el-form :inline="true" :label-width="isOperateCon ? '80px' : '100px'" :model="search">

      <el-form-item :label="isOperateCon ? '内容名称:' : '运营位名称:'">
        <el-input v-model="search.name"></el-input>
      </el-form-item>
    
      <el-form-item label="别名:" v-if="!isOperateCon">
        <el-input v-model="search.code"></el-input>
      </el-form-item>
    
      <el-form-item :label="isOperateCon ? '内容ID:' : 'ID:'">
        <el-input v-model="search.id"></el-input>
      </el-form-item>
    
      <el-form-item label="平台:">
        <el-select clearable v-model="search.app_type" placeholder="请选择">
          <el-option label="莴笋APP" value="1"></el-option>
          <el-option label="BA" value="2"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="运营位ID:" v-if="isOperateCon">
        <el-input v-model="search.resource_id"></el-input>
      </el-form-item>
      
      <el-form-item label="是否激活:">
        <el-select clearable v-model="search.status" placeholder="请选择">
          <el-option label="激活" value="1"></el-option>
          <el-option label="未激活" value="0"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item label="是否过期:" v-if="isOperateCon">
        <el-select clearable v-model="search.expire" placeholder="请选择">
          <el-option label="过期" value="1"></el-option>
          <el-option label="未过期" value="0"></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item class="form-item-btns">
        <el-button type="primary" @click="$emit('search')">查询</el-button>
        <el-button type="primary" @click="$emit('reset')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>


<script>
  export default {
    name: 'Searchbar',
    props: {
      searchFor: {// 运营位内容的搜索条 or  运营位的搜索条
        type: String,
        default: 'operateCon'
      },
      search: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    computed: {
      isOperateCon() {
        return this.searchFor === 'operateCon';
      }
    }
  }
</script>