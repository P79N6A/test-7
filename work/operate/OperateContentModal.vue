<template>
    <div class="operate-content-modal">
    	<el-dialog :title="title" v-model="show">
    		<el-form model="current" label-width="100px">
    			<el-form-item label="内容名称"  required>
    				<el-input v-model="current.name"></el-input>
    			</el-form-item>
    			<el-form-item label="选择运营位" required>
    				<el-input v-if="!isEdit" v-model="operatePosName" readonly @click="popOpLayoutList"></el-input>
    				<p v-else>{{operatePosName}}</p>
    			</el-form-item>
				<el-form-item label="排序" required>
					<el-input v-model="current.weight"></el-input>
				</el-form-item>
				<el-form-item label="平台" required>
					<el-select v-model="current.resource_app_type">
						<el-option label="用户" :value="1"></el-option>
						<el-option label="BA" :value="2"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="IOS" required v-if="current.condition_obj.ios_version">
					<el-row class="f-cl" v-for="(ios_item, index) in current.condition_obj.ios_version">
					    <el-col :span="2"><el-input v-model="ios_item.start.a" />.</el-col>
					    <el-col :span="2"><el-input v-model="ios_item.start.b" />.</el-col>
					    <el-col :span="2"><el-input v-model="ios_item.start.c" /></el-col>
					    <el-col :span="3">--</el-col>
					    <el-col :span="2"><el-input v-model="ios_item.end.a" />.</el-col>
					    <el-col :span="2"><el-input v-model="ios_item.end.b" />.</el-col>
					    <el-col :span="2"><el-input v-model="ios_item.end.c" /></el-col>
					    <el-col :span="6">
					    	<el-button type="text" @click.stop="removeIosVersion(index)">删除</el-button>
					    	<el-button type="text" @click.stop="addIosVersion">增加</el-button>
					    </el-col>
				</el-form-item>
				<el-form-item label="Android" required v-if="current.condition_obj.android_version">
					<el-row class="f-cl" v-for="(android_item, index) in current.condition_obj.android_version">
					    <el-col :span="2"><el-input v-model="android_item.start.a" />.</el-col>
					    <el-col :span="2"><el-input v-model="android_item.start.b" />.</el-col>
					    <el-col :span="2"><el-input v-model="android_item.start.c" /></el-col>
					    <el-col :span="3">--</el-col>
					    <el-col :span="2"><el-input v-model="android_item.end.a" />.</el-col>
					    <el-col :span="2"><el-input v-model="android_item.end.b" />.</el-col>
					    <el-col :span="2"><el-input v-model="android_item.end.c" /></el-col>
					    <el-col :span="6">
					    	<el-button type="text" @click.stop="removeAndroidVersion(index)">删除</el-button>
					    	<el-button type="text" @click.stop="addAndroidVersion">增加</el-button>
					    </el-col>
				</el-form-item>
				<el-form-item label="Android渠道" required  v-if="current.condition_obj.android_channel">
					<el-row v-for="(channel, index) in current.condition_obj.android_channel">
					    <el-col :span="4">
					    	<el-input v-model="current.condition_obj.android_channel[index]" />
					    </el-col>
					    <el-button type="text" @click.stop="removeChannel(index)">删除</el-button>
					</div>
				    <el-button type="text" @click.stop="addChannel">增加</el-button>
				</el-form-item>
				<el-form-item label="类型" required v-if="current.resource_type">
					<p>{{current.resource_type | typeText}}</p>
				</el-form-item>
				<div v-if="current.resource_type == 1">
					<el-form-item label="选择图片" required >
						<p class="block-tips"> (200*100)</p> 
						<div class="upload-logo upload-img">
						    <img v-show="current.image_url" :src="current.image_url" />
						</div>
					</el-form-item>
					<el-form-item label="文案" required>
						<el-input v-model="current.text"></el-input>
					</el-form-item>
					<el-form-item label="图片跳转URL(APP)" required>
						<el-input v-model="current.forward_protocol" readonly @click.prevent="popProtocolList" />
						<span>伪协议前缀</span> 
						<el-input v-model="current.forward_param"></el-input>
						<span>参数提示：{{current.forward_remark}}</span>
					</el-form-item>
				</div>
				<div v-if="current.resource_type == 2">
					<el-form-item label="选择商品" required>
						<el-input v-model="opInfo.item_group_id" readonly @click.prevent="popItemGroupList"></el-input>
					</el-form-item>
					
					<!-- 
				<div class="form-group form-group-sm">
                <label class="control-label col-4"><span class="form-required">*</span>选择商品：</label>
                <div class="col-1">
                    <label><input type="text" class="form-control" v-model="opInfo.item_group_id" readonly="readonly" @click.prevent="popItemGroupList"></label>
                </div>
            </div>
					 -->
				</div>			
				<div v-if="current.resource_type == 3">
					<!-- 
<div class="form-group form-group-sm">
    <label class="control-label col-4"><span class="form-required">*</span>选择专题：</label>
    <div class="col-1">
        <label><input type="text" class="form-control" v-model="opInfo.topic_id"></label>
    </div>
</div>
<div class="form-group form-group-sm">
    <label class="control-label col-4"><span class="form-required">*</span>封面图：</label> 
    <div class="col-8">
        <p class="form-control-static form-hint"> (200*100)</p> 
        <div class="upload-logo upload-img">
            <img v-show="opInfo.image_url" :src="opInfo.image_url" style="display: none;">
        </div>
    </div>
</div>
<div class="form-group form-group-sm">
    <label class="control-label col-4"><span class="form-required">*</span>展示商品：</label>
    <div class="col-4 form-radio">
        <input type="checkbox" class="" v-model="opInfo.show_item">
    </div>
</div>
<div class="form-group form-group-sm">
    <label class="control-label col-4"><span class="form-required">*</span>展示更多：</label>
    <div class="col-4 form-radio">
        <input type="checkbox" class="" v-model="opInfo.show_more">
    </div>
</div>
					-->
				</div>			
				
    		</el-form>
    		<div class="dialog-footer" slot="footer">
    			<el-button type="primary" @click="save">确定</el-button>
    			<el-button @click="hide">取消</el-button>
    		</div>
    	</el-dialog>
    </div>
</template>

<script>


export default {
	name: 'OperateContentModal',
	props: {
		show: Boolean,
		current: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	computed: {
		isEdit() {
			return !!this.current.id;
		},
		title() {
			const action = this.current.id ? '编辑' : '录入';
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
	filters: {
		typeText(i) {
			const types = ['', '图片', '商品', '专题'];
			return types[i];
		}
	}
};

</script>

<style scoped>
	@import '~theme';

	.operate-view {
		
	}

</style>