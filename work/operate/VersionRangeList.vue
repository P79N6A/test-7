<template>
  <div class="version-range-list" v-if="ranges">
    <el-form-item :label="label" required >
      <el-row v-for="(range, index) in ranges" class="range">
          <el-col :span="2"><el-input v-model="range.start.a" />.</el-col>
          <el-col :span="2"><el-input v-model="range.start.b" />.</el-col>
          <el-col :span="2"><el-input v-model="range.start.c" /></el-col>
          <el-col :span="1" class="dashes">--</el-col>
          <el-col :span="2"><el-input v-model="range.end.a" />.</el-col>
          <el-col :span="2"><el-input v-model="range.end.b" />.</el-col>
          <el-col :span="2"><el-input v-model="range.end.c" /></el-col>
          <el-col :span="6">
            <el-button icon="delete"  @click.stop="remove(range, index)">删除</el-button>
          </el-col>
      </el-row>
      <el-button class="btn-add" icon="plus" @click.stop="append">增加</el-button>
    </el-form-item>
  </div>
</template>

<script>
  import {deepClone, defVersionRange} from './operateData';

  export default {
    name: 'VersionRangeList',
    props: ['ranges', 'label'],
    methods: {
      remove(range, index) {
        this.ranges.splice(index, 1);
      },
      append() {
        console.warn(deepClone(defVersionRange), '<--');
        this.ranges.push(deepClone(defVersionRange)[0]);
        debugger;
      }
    }
  };
</script>

<style>
  .version-range-list {
    .range .el-input{
      width: 80%;
      margin: 0 5px;
    }
    .dashes{
      text-align: center;
    }
    .btn-add{
      margin-top: 8px;
      margin-left: 5px;
    }
    .range{
      margin-bottom: 5px;
    }
  }
</style>