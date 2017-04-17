<template>
  <div class="version-range-list" v-if="ranges">
    <el-form-item :label="label" required >
      <el-row class="f-cl" v-for="(range, index) in ranges">
          <el-col :span="2"><el-input v-model="range.start.a" />.</el-col>
          <el-col :span="2"><el-input v-model="range.start.b" />.</el-col>
          <el-col :span="2"><el-input v-model="range.start.c" /></el-col>
          <el-col :span="3">--</el-col>
          <el-col :span="2"><el-input v-model="range.end.a" />.</el-col>
          <el-col :span="2"><el-input v-model="range.end.b" />.</el-col>
          <el-col :span="2"><el-input v-model="range.end.c" /></el-col>
          <el-col :span="6">
            <el-button type="text" @click.stop="remove(range)">删除</el-button>
            <el-button type="text" @click.stop="append">增加</el-button>
          </el-col>
    </el-form-item>
  </div>
</template>

<script>
  import {deepClone, defVersionRange} from './operateData';

  export default {
    name: 'VersionRangeList',
    props: ['ranges', 'label'],
    methods: {
      remove(range) {
        this.ranges.$remove(range);
      },
      append() {
        this.ranges.push(deepClone(defVersionRange));
      }
    }
  };
</script>