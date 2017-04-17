<template>
  <div class="android-channels" v-if="channels">
    <el-form-item label="Android渠道" required >
      <el-row v-for="(channel, index) in channels">
          <el-col :span="4">
            <el-input v-model="channel" />
          </el-col>
          <el-button type="text" @click.stop="remove(channel)">删除</el-button>
      </el-row>
      <el-button type="text" @click.stop="append">增加</el-button>
    </el-form-item>
  </div>
</template>

<script>
  export default {
    name: 'AndroidChannels',
    props: ['channels'],
    methods: {
      remove(channel) {
        this.channels.$remove(channel);
      },
      append() {
        this.channels.push('');
      }
    }
  };
</script>