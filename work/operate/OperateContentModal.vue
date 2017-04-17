<template>
    <div class="operate-content-modal">
    	<el-dialog :title="title" v-model="show">
    		<el-form model="opInfo" label-width="100px">
    			
          <el-form-item label="内容名称"  required>
    				<el-input v-model="opInfo.name"></el-input>
    			</el-form-item>
    			
          <el-form-item label="选择运营位" required>
    				<el-input v-if="!isEdit" v-model="operatePosName" readonly @click="popOpLayoutList"></el-input>
    				<p v-else>{{operatePosName}}</p>
    			</el-form-item>
  				
          <el-form-item label="排序" required>
  					<el-input v-model="opInfo.weight"></el-input>
  				</el-form-item>

  				<el-form-item label="平台" required v-if="opInfo.resource_app_type">
            <p>{{opInfo.resource_app_type | appTypeText}}</p>
  				</el-form-item>
          
          <version-range-list label="IOS" :ranges="opInfo.condition_obj.ios_version"></version-range-list>

          <version-range-list label="Android" :ranges="opInfo.condition_obj.android_version"></version-range-list>

          <android-channels :channels="opInfo.condition_obj.android_channel"></android-channels>

  				<el-form-item label="类型" required v-if="opInfo.resource_type">
  					<p>{{opInfo.resource_type | typeText}}</p>
  				</el-form-item>


  				<template v-if="opInfo.resource_type == 1">
  					<el-form-item label="选择图片" required >
  						<p class="block-tips"> (200*100)</p> 
  						<div class="upload-logo upload-img">
  						    <img v-show="opInfo.image_url" :src="opInfo.image_url" />
  						</div>
  					</el-form-item>

  					<el-form-item label="文案" required>
  						<el-input v-model="opInfo.text"></el-input>
  					</el-form-item>

  					<el-form-item label="图片跳转URL(APP)" required>
              <el-input v-model="opInfo.forward_protocol" readonly @click.prevent="popProtocolList" ></el-input>
  						<span>伪协议前缀</span> 
  						<el-input v-model="opInfo.forward_param"></el-input>
  						<span>参数提示：{{opInfo.forward_remark}}</span>
  					</el-form-item>
  				</template>

  				<template v-if="opInfo.resource_type == 2">
  					<el-form-item label="选择商品" required>
  						<el-input v-model="opInfo.item_group_id" readonly @click.prevent="popItemGroupList"></el-input>
  					</el-form-item>
  				</template>			

  				<template v-if="opInfo.resource_type == 3">
            <el-form-item label="选择专题" required>
              <el-input v-model="opInfo.topic_id"></el-input>
            </el-form-item>
            <el-form-item label="封面图" required>
              <p class="block-tips"> (200*100)</p> 
              <div class="upload-logo upload-img">
                  <img v-show="opInfo.image_url" :src="opInfo.image_url" />
              </div>
            </el-form-item>
            <el-form-item label="展示商品" required>
              <el-input v-model="opInfo.show_item"></el-input>
            </el-form-item>
            <el-form-item label="展示更多" required>
              <el-input v-model="opInfo.show_more"></el-input>
            </el-form-item>
          </template>     
        
          <el-form-item label="仅新客可见" required>
            <el-checkbox v-model="opInfo.condition_obj.new_user_only"></el-checkbox>
          </el-form-item>

          <el-form-item label="开始-结束时间" required>
            <el-date-picker v-model="opInfo.start_time"></el-date-picker>
            <span>至</span>
            <el-date-picker v-model="opInfo.end_time"></el-date-picker>
          </el-form-item>

          <el-form-item label="状态" required>
            <el-radio v-model="opInfo.status" name="status" label="1">激活</el-radio>
            <el-radio v-model="opInfo.status" name="status" label="0">未激活</el-radio>
          </el-form-item>

          <el-form-item label="备注" required>
            <el-input type="textarea" :rows="3" v-model="opInfo.remark"></el-input>
          </el-form-item>

    		</el-form>
    		<div class="dialog-footer" slot="footer">
    			<el-button type="primary" @click="save">确定</el-button>
    			<el-button @click="hide">取消</el-button>
    		</div>
    	</el-dialog>
    </div>
</template>

<script>
import {newOperateCon} from './operateData';
import VersionRangeList from './VersionRangeList';
import operateMixin from './operateMixin';

export default {
	name: 'OperateContentModal',
  mixins: [operateMixin],
	props: {
		show: Boolean,
    operateId: {
      type: [String, Number],
      default: ''
    }
	},
  data: {
    opInfo: newOperateCon,
    count: 0
  },
	computed: {
		isEdit() {
			return !!this.operateId;
		},
		title() {
			const action = this.isEdit ? '编辑' : '录入';
			return `${action}运营内容`;
		}
	},
	methods: {
		hide() {
			this.$emit('hide');
		},
		save() {

		}
	},
  components: {
    VersionRangeList
  }
};

</script>

<style scoped>
	@import '~theme';

	.operate-view {
		
	}

</style>