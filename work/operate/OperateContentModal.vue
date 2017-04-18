<template>
    <div class="operate-content-modal">
        <el-dialog :title="title" v-model="visible">
            <el-form :model="opInfo" label-width="180px">

                <el-form-item label="内容名称" required>
                    <el-input v-model="opInfo.name"></el-input>
                </el-form-item>

                <el-form-item label="选择运营位" required>
                    <el-input v-if="!isEdit" v-model="operatePosName" readonly @click.native="chooseOperatePos" class="modal-trigger"></el-input>
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
                    <el-form-item label="选择图片" required>
                        <p class="block-tips"> (200*100)</p>
                        <el-upload :action="getApi('//dev.watsons.com:8080/upload.do')" list-type="picture" :on-success="handleUploaded" class="pic-uploader" :show-file-list="false">
                            <img v-if="opInfo.image_url" :src="opInfo.image_url" class="upload-pic" />
                            <i v-else class="el-icon-plus pic-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="文案" required>
                        <el-input v-model="opInfo.text"></el-input>
                    </el-form-item>

                    <el-form-item label="图片跳转URL(APP)" required>
                    	<el-row>
                    		<el-col :span="10">
		                        <el-input v-model="opInfo.forward_protocol" readonly @click.native="chooseProtocol" class="modal-trigger"></el-input>
		                        <span>伪协议前缀</span>
                    		</el-col>
                    		<el-col :span="10" :offset="1">
		                        <el-input v-model="opInfo.forward_param"></el-input>
		                        <span>参数提示：{{opInfo.forward_remark}}</span>
                    		</el-col>
                    	</el-row>
                    </el-form-item>
                </template>

                <template v-if="opInfo.resource_type == 2">
                    <el-form-item label="选择商品" required>
                        <el-input v-model="opInfo.item_group_id" readonly @click.native="chooseItemGroup" class="modal-trigger"></el-input>
                    </el-form-item>
                </template>

                <template v-if="opInfo.resource_type == 3">
                    <el-form-item label="选择专题" required>
                        <el-input v-model="opInfo.topic_id"></el-input>
                    </el-form-item>
                    <el-form-item label="封面图" required>
                        <p class="block-tips"> (200*100)</p>
                        <el-upload :action="getApi('//dev.watsons.com:8080/upload.do')" list-type="picture" :on-success="handleUploaded" class="pic-uploader" :show-file-list="false">
                            <img v-if="opInfo.image_url" :src="opInfo.image_url" class="upload-pic" />
                            <i v-else class="el-icon-plus pic-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="展示商品" required>
                        <el-checkbox v-model="opInfo.show_item"></el-checkbox>
                    </el-form-item>
                    <el-form-item label="展示更多" required>
                        <el-checkbox v-model="opInfo.show_more"></el-checkbox>
                    </el-form-item>
                </template>

                <el-form-item label="仅新客可见" required>
                    <el-checkbox v-model="opInfo.condition_obj.new_user_only"></el-checkbox>
                </el-form-item>

                <el-form-item label="开始-结束时间" required>
                    <el-date-picker format="yyyy-MM-dd HH:mm:ss" type="datetime" v-model="opInfo.start_time" @change="dateChange($event, 'start_time')"></el-date-picker>
                    <span>至</span>
                    <el-date-picker format="yyyy-MM-dd HH:mm:ss" type="datetime" v-model="opInfo.end_time" @change="dateChange($event, 'end_time')"></el-date-picker>
                </el-form-item>

                <el-form-item label="状态" required>
                    <el-radio v-model="opInfo.status" name="status" :label="1">激活</el-radio>
                    <el-radio v-model="opInfo.status" name="status" :label="0">未激活</el-radio>
                </el-form-item>

                <el-form-item label="备注" required>
                    <el-input type="textarea" :rows="3" v-model="opInfo.remark"></el-input>
                </el-form-item>

            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button type="primary" @click="save">确定</el-button>
                <el-button @click="show(false)">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    newOperateCon,
    deepClone
} from './operateData';
import VersionRangeList from './VersionRangeList';
import AndroidChannels from './AndroidChannels';
import operateMixin from './operateMixin';
import {
    bus,
    getApi,
    successHandler,
    queryStringify
} from './helper';

export default {
    name: 'OperateContentModal',
    mixins: [operateMixin],
    props: {
        operateId: {// 运营位id
            type: [String, Number],
            default: ''
        }
    },
    data() {
        return {
            visible: false,
            opInfo: newOperateCon,
            count: 0
        }
    },
    computed: {
        isEdit() {
            return !!this.operateId;
        },
        title() {
            const action = this.isEdit ? '编辑' : '录入';
            return `${action}运营内容`;
        },
        operatePosName() {
            return `${this.opInfo.resource_id} : ${this.opInfo.resource_name}`;
        }
    },
    methods: {
        show(isShow) {
            this.visible = isShow;
        },
        chooseOperatePos() {
            this.$emit('choose-operate-pos');
        },
        chooseItemGroup() {
            this.$emit('choose-itemgroup');
        },
        chooseProtocol() {
            this.$emit('choose-protocol');
        },
        handleUploaded(res) {
            this.opInfo.image_url = res.data.url;
        },
        checkEmpty(field, tips) {
            if (!this.opInfo[field]) {
                throw new Error(tips);
            }
        },
        validateForm() {
            try {
                this.checkEmpty('name', '请输入运营位内容名称');
                this.checkEmpty('resource_id', '请选择运营位');
                this.checkEmpty('weight', '请选择排序权重');
                this.checkEmpty('resource_app_type', '请选择平台');
                this.checkEmpty('resource_type', '请选择类型');
                this.checkEmpty('start_time', '请选择开始时间');
                this.checkEmpty('end_time', '请选择结束时间');
            } catch (err) {
                this.$message.warning(err.message);
                return;
            }

            var type = this.opInfo.resource_type - 0;
            try {
                switch (type) {
                    case 1:
                        this.checkEmpty('image_url', '请上传图片');
                        this.checkEmpty('text', '请填写文案');
                        this.checkEmpty('forward_code', '请选择伪协议');
                        break;
                    case 2:
                        this.checkEmpty('item_group_id', '请选择商品组');
                        break;
                    case 3:
                        this.checkEmpty('topic_id', '请选择专题');
                        this.checkEmpty('image_url', '请上传封面');
                        break;
                }
            } catch (error) {
                this.$message.warning(error.message);
                return;
            }

            return true;
        },
        save() {
            if (!this.validateForm()) {
                return;
            }
            const getPostData = () => {
                let data = {...this.opInfo,
                    ...this.opInfo.condition_obj
                };
                delete data.condition_obj;

                const boolToNumber = key => {
                    data[key] = data[key] ? 1 : 0;
                };
                const keys = ['new_user_only', 'show_more', 'show_item'];
                keys.forEach(boolToNumber);
                console.warn(data, '--->');
                return queryStringify(data);
            };
            var data = this.opInfo;
            this.axios.post(getApi('/resource/save_data.do'), getPostData()).then(successHandler(data => {
                // reloadTable
                this.$emit('reload-table');
                this.show(false);
            }, this.isEdit ? '修改成功' : '录入成功'));

        },
        dateChange(dt, field) {
            this.opInfo[field] = dt;
        },
        getApi
    },
    components: {
        VersionRangeList,
        AndroidChannels
    },
    watch: {
    	operateId() {
    		if (this.isEdit) {
    			var params = queryStringify({id: this.operateId});
				this.axios.get(getApi(`/resource/get_data.do?${params}`), ).then(successHandler((data, res) => {
					res.data.show_item = !!res.data.show_item;
					res.data.show_more = !!res.data.show_more;
					res.data.condition_obj.new_user_only = !!res.data.condition_obj.new_user_only;

					this.opInfo = res.data;
				}));
    		}
    	}
    },
    created() {
        bus.$on('select-operate-pos', row => {
            const keys = ['id', 'name', 'type', 'app_type'];
            keys.forEach(key => {
                const resourceKey = `resource_${key}`;
                this.opInfo[resourceKey] = row[key];
            });
        });

        bus.$on('select-itemgroup', row => {
        	this.opInfo.item_group_id = row.item_group_info.id;
        });

        bus.$on('select-protocol', row => {
        	const keys = ['protocol', 'code', 'remark'];
        	keys.forEach(key => {
        		const pkey = `forward_${key}`;
        		this.opInfo[pkey] = row[key];
        	});
        });        
    }
};
</script>

<style>
@import '~theme';
.operate-content-modal {
    .el-form-item__label:after {
        content: ':';
    }
    .modal-trigger {
        .el-input__inner {
            cursor: pointer;
            background-color: #eee;
        }
    }
    .el-dialog__body {
        max-height: 600px;
        overflow: auto;
    }
    .pic-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .pic-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .pic-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .upload-pic {
        max-height: 100px;
    }
}
</style>
