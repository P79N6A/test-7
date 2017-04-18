<template>
  <div class="android-channels" >
    <el-form-item label="Android渠道" required >
      <el-row v-for="(channel, index) in channels" class="channel">
          <el-col :span="4">
            <el-input v-model="channels[index]"></el-input>            
          </el-col>
          <el-button icon="delete" @click.stop="remove(channel, index)">删除</el-button>
      </el-row>
      <el-button icon="plus" @click.stop="append">增加</el-button>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'AndroidChannels',
    props: ['channels'],
    methods: {
      remove(channel, index) {
        this.channels.splice(index, 1);
      },
      append() {
        this.channels.push('');
      }
    }
  };
</script>

<style>
  .android-channels{
    .channel{
      margin-bottom: 10px;
      .el-col{
        margin-right: 15px;
      }
    }
  }
</style>