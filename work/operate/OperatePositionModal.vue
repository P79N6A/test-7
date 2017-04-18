<template>
    <div class="operate-position-modal">
        <el-dialog title="编辑运营位" v-model="visible">
            
        <el-form label-width="180px" :model="opInfo">
            
            <el-form-item label="运营位名称" required>
                <el-input v-model="opInfo.name"></el-input>
            </el-form-item>

            <el-form-item label="运营位别名" required>
                <el-input v-model="opInfo.code"></el-input>
                <p class="block-tips">唯一的英文字母或数字组合</p>
            </el-form-item>

            <el-form-item label="平台" required>
                <el-radio name="appType" v-model="opInfo.app_type" :value="1" label="用户"></el-radio>
                <el-radio name="appType" v-model="opInfo.app_type" :value="2" label="BA"></el-radio>
            </el-form-item>

            <el-form-item label="类型" required>
                <el-select v-model="opInfo.type" :disabled="isEdit">
                    <el-option :value="1">图片</el-option>
                    <el-option :value="2">商品</el-option>
                    <el-option :value="3">专题</el-option>
                </el-select>
            </el-form-item>

            <template v-if="opInfo.type == 1">
                <el-form-item label="最大展示张数" required>
                    <el-input v-model="opInfo.max_size"></el-input>
                </el-form-item>
                <el-form-item label="图片尺寸" required>
                    <el-row>
                        <el-col :span="10">
                            宽： <el-input v-model="opInfo.img_width"></el-input>
                        </el-col>
                        <i>X</i>
                        <el-col :span="10">
                            高： <el-input v-model="opInfo.img_height"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="样式" required>
                    <el-radio name="style" v-model="opInfo.style" label="column1">单列</el-radio>
                    <el-radio name="style" v-model="opInfo.style" label="column2">双列</el-radio>
                    <el-radio name="style" v-model="opInfo.style" label="column3">三格</el-radio>
                    <el-radio name="style" v-model="opInfo.style" label="column4">四格</el-radio>
                </el-form-item>
                
            </template>

            <template v-if="opInfo.type == 2">
                
                <el-form-item label="最大展示" required>
                    <el-input v-model="opInfo.max_size"></el-input>
                </el-form-item>
                <el-form-item label="展示方式" required>
                    <el-radio name="style" v-model="opInfo.style" label="column1">单列</el-radio>
                    <el-radio name="style" v-model="opInfo.style" label="column2">双列</el-radio>
                </el-form-item>
                <el-form-item label="间隔" required>
                    <el-row>
                        <el-col :span="10">
                            高： <el-input v-model="opInfo.space_height"></el-input>
                        </el-col>
                        <el-col :span="10">
                            颜色：<el-input v-model="opInfo.space_color"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

            </template>

            
            <template v-if="opInfo.type == 3">
                
                <el-form-item label="最大展示张数" required>
                    <el-input v-model="opInfo.max_size"></el-input>
                </el-form-item>
                <el-form-item label="图片尺寸" required>
                    <el-row>
                        <el-col :span="10">
                            宽： <el-input v-model="opInfo.img_width"></el-input>
                        </el-col>
                        <i>X</i>
                        <el-col :span="10">
                            高： <el-input v-model="opInfo.img_height"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>

            </template>

            <el-form-item label="状态" required>
                <el-radio name="status" v-model="opInfo.status" :label="1">激活</el-radio>
                <el-radio name="status" v-model="opInfo.status" :label="0">未激活</el-radio>
            </el-form-item>
                
        </el-form>

        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'OperatePosModal',
        props: []
    };
</script>