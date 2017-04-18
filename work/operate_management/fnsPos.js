/**
 * 运营位管理
 */
(function(cb) {
    var global = {
        opItemSelection : [],
        opItemList : []
    };

    cb._({
        "~name": "operate.layout.list",
        "~superclass": cb.base,
        ctor: function() {
            this.api = "operate";
            this._super();
        },
        postCreate: function() {
            var self = this;

            // 入口 一般把进入页面首先需要执行的js写在里面
            
            self.operateListVue = new Vue({
                el: '#operateEl',
                data: {
                    search: {
                        name: '',
                        code: '',
                        id: '',
                        app_type: '',
                        status: ''
                    },
                    dataList: [],
                    pageSize: 10, // 每页10个
                    pageIndex: 0, // 从第几个拿
                    pageId: 1, //页码
                    visiblePages: 10, //最大页码
                    checkAllFlag: false
                },
                computed: {

                },
                filters: {
                    // 映射平台类型
                    filterAppType: function(value) {
                        var ret = '';
                        switch(value) {
                            case 1: 
                                ret = '莴笋';
                                break;
                            case 2: 
                                ret = 'BA';
                                break;
                        }
                        return ret;
                    },
                    // 映射运营位类型
                    filterType: function(value) {
                        var ret = '';
                        switch(value) {
                            case 1: 
                                ret = '图片';
                                break;
                            case 2: 
                                ret = '商品';
                                break;
                            case 3: 
                                ret = '专题';
                                break;
                        }
                        return ret;
                    },
                    // 映射激活状态
                    filterActivateStatus: function(value) {
                        var ret = '';
                        switch(value) {
                            case 1: 
                                ret = '激活';
                                break;
                            case 0: 
                                ret = '未激活';
                                break;
                        }
                        return ret;
                    },
                    filterActivateReverse: function(value) {
                        var ret = '';
                        switch(value) {
                            case 1: 
                                ret = '取消激活';
                                break;
                            case 0: 
                                ret = '激活';
                                break;
                        }
                        return ret;
                    }
                },
                methods: {
                    operateSearch: function() {
                        self.request("getOperateList");
                    },
                    searchReset: function() {
                        this.search.name = '';
                        this.search.code = '';
                        this.search.id = '';
                        this.search.app_type = '';
                        this.search.status = '';
                    },
                    addOperate: function() {
                        self.addOperate();
                    },
                    getOperate: function(opId) {
                        self.addOperate(opId);
                    },
                    urltoContentList: function() {
                        console.log('内容')
                    },
                    selectedOp: function(item) {
                        var self = this;
                        // 注册item.checked
                        if(typeof item.checked == "undefined") {
                            self.$set(item, "checked", true);
                        }else {
                            item.checked = !item.checked;
                        }
                    },
                    selectAllOp: function() {
                        var self = this;
                        this.checkAllFlag =!this.checkAllFlag;
                        self.dataList.forEach(function(item, index){
                            if(typeof item.checked == "undefined") {
                                self.$set(item, "checked", self.checkAllFlag);
                            }else {
                                item.checked = self.checkAllFlag;
                            }
                        });
                    },
                    setOpStatus: function(id, activate_status) {
                        var that = this;
                        var ids = [],
                            status = '';
                        if(arguments.length == 2) { // 单个设置
                            ids.push(id);
                            status = activate_status == 1 ? 'FREEZE' : 'ACTIVE';
                        }else if(arguments.length == 1){ // 批量处理
                            status = arguments[0];
                            ids = [];

                            //获取选中id数组 
                            that.dataList.forEach(function(item, index){
                                if(typeof item.checked != "undefined" && item.checked == true) {
                                    ids.push(item.id);
                                }
                            });
                            if(ids.length < 1) {
                                alert('最少要选择一条数据！');
                                return
                            }
                        }
                        ids = JSON.stringify(ids);
                        self.setOpStatus(ids, status);
                    }
                }
            }) 
            
            this.request("getOperateList");
        },
        setOpStatus: function (id, status) {
            var self = this;

            self.opStatusVue = new Vue({
                el: '#opStatusTemplate',
                data: {
                    ids: [],
                    status: ''
                },
                methods: {
                    
                }
            })

            self.opStatusVue.id = id;
            self.opStatusVue.status = status;

            self.request('setOpStatus');
        },
        setOpStatusArgs : function(){
            var self = this;
            return {
                type : "post",
                dataType : "json",
                data : {
                    ids : self.opStatusVue.id,
                    status: self.opStatusVue.status,
                },
                xhrFields: {
                    withCredentials: true
                },
                done : cobra.ride(this, function(data){
                    self.operateListVue.searchReset();
                    self.request("getOperateList");
                    self._msgBox.done('修改成功');
                })
            }
        },
        getOperateListArgs : function(){
            var that = this;
            return {
                type : "post",
                dataType : "json",
                data : {
                    offset : (that.operateListVue.pageId-1)*that.operateListVue.pageSize,
                    count: that.operateListVue.pageSize,
                    name:$("#op_name").val(),
                    code:$("#op_byname").val(),
                    id:$("#op_id").val(),
                    app_type:$("#op_platform").val(),
                    status:$("#op_status").val()
                },
                xhrFields: {
                    withCredentials: true
                },
                done : cobra.ride(this, function(data){
                    var resultData = [];
                    resultData = data.data.data;
                    that.operateListVue.dataList = resultData;
                    that.operateListVue.checkAllFlag = false;
                    that.pagination(data.data.total_count);
                    // that.operateListVue.dataList = [];
                })
            }
        },
        getOperateArgs: function() {
            var self = this;
            return {
                type : "get",
                dataType : "json",
                data : {
                    id: self.opInfoVue.operateId
                },
                xhrFields: {
                    withCredentials: true
                },
                done : cobra.ride(this, function(data){
                    var resultData = [];
                    resultData = data.data;
                    self.opInfoVue.opInfo = resultData;
                    console.log(resultData)
                })
            }
        },
        updateOperateArgs: function() {
            var self = this;
            return {
                type : "post",
                dataType : "json",
                data : {
                    name : self.opInfoVue.opInfo.name,
                    code : self.opInfoVue.opInfo.code,
                    id : self.opInfoVue.opInfo.id,
                    app_type : self.opInfoVue.opInfo.app_type,
                    status : self.opInfoVue.opInfo.status,
                    type : self.opInfoVue.opInfo.type,
                    max_size : self.opInfoVue.opInfo.max_size,
                    img_width : self.opInfoVue.opInfo.img_width,
                    img_height : self.opInfoVue.opInfo.img_height,
                    style : self.opInfoVue.opInfo.style,
                    space_height : self.opInfoVue.opInfo.space_height,
                    space_color : self.opInfoVue.opInfo.space_color                                                                          
                },
                xhrFields: {
                    withCredentials: true
                },
                done : cobra.ride(this, function(data){
                    console.log(data)
                    self.operateListVue.searchReset();
                    self.request("getOperateList");
                    self._msgBox.done('修改成功');
                })
            }
        },
        pagination: function (total) {
            var self = this;
            var pagination = $('.pagination');
            pagination.jqPaginator({
                totalCounts: total == 0 ? 1 : total,                            // 设置分页的总条目数
                pageSize: self.operateListVue.pageSize,                          // 设置每一页的条目数
                visiblePages: self.operateListVue.visiblePages,                  // 设置最多显示的页码数
                currentPage: self.operateListVue.pageId,   // 设置当前的页码
                prev: '<a class="prev" href="javascript:;">&lt;<\/a>',
                next: '<a class="next" href="javascript:;">&gt;<\/a>',
                page: '<a href="javascript:;">{{page}}<\/a>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        self.operateListVue.pageId = num;
                        self.request("getOperateList");
                    }
                }
            });
            var n = self.operateListVue.dataList ? self.operateListVue.dataList.length : 0;
            if (total && total != 0) {
                pagination.append('<span>当前' + n + '条</span>/<span>共' + total + '条</span>')
            } else {
                pagination.append('<span>当前0条</span>/<span>共' + total + '条</span>')
            }
        },
        addOperate: function (operateId) {
            var self = this;
            var template = $('#J-add-operate').html();
            self.popDialog(template, '录入/编辑运营位', 800, 600, {
                type: 'highlight',
                text: '保存',
                handler: function (button, dialog) {
                    // self.popupDialog.close();
                    // self.request('updateOperate');

                    if(self.validateForm(self.opInfoVue.opInfo)) {
                        self.request('updateOperate');
                        self.popupDialog.close();
                    }else {
                        console.log('error')
                    }
                }
            })
            self.opInfoVue = new Vue({
                el: '#opInfoTemplate',
                data: {
                    operateId: '',
                    editStatus: 'add', // add录入 edit编辑
                    opInfo: {
                        name: '',
                        code: '',
                        app_type: '1', // 用户 BA
                        type: '1', // 图片 商品 专题
                        max_size: 1, // 最大展示张数
                        img_width: '600',
                        img_height: '800',
                        style: '', // 单列 双列 三格 四格 banner (样式 column1,column2,column3,column4,banner)
                        status: '', // 0 1 未激活 激活
                        space_height: '',
                        space_color: ''
                    }
                },
                methods: {
                }
            });
            if(operateId) {
                self.opInfoVue.editStatus = 'edit'
                self.opInfoVue.operateId = operateId;
                self.request('getOperate');
            }
        },
        validateForm: function (data) {
            var that = this;
            var type = data.type;
            if (!data.name) {
                that._msgBox.warn('请输入运营位名称');
                return false;
            }
            if (!data.code) {
                that._msgBox.warn('请输入运营位别名');
                return false;
            }
            if (!data.app_type) {
                that._msgBox.warn('请选择平台');
                return false;
            }
            if (!data.type) {
                that._msgBox.warn('请选择类型');
                return false;
            }
            switch(parseInt(type)) {
                case 1:
                    // goods; 
                    if (!data.max_size) {
                        that._msgBox.warn('请输入最大展示张数');
                        return false;
                    }
                    if (!data.img_width) {
                        that._msgBox.warn('请输入图片宽度');
                        return false;
                    }
                    if (!data.img_height) {
                        that._msgBox.warn('请输入图片高度');
                        return false;
                    }
                    if (!data.style) {
                        that._msgBox.warn('请选择样式');
                        return false;
                    }
                    break;
                case 2:
                    // itemGroup; 
                    if (!data.max_size) {
                        that._msgBox.warn('请输入最大展示张数');
                        return false;
                    }
                    if (!data.style) {
                        that._msgBox.warn('请选择样式');
                        return false;
                    }
                    if (!data.space_height) {
                        that._msgBox.warn('请填写高度');
                        return false;
                    }
                    if (!data.space_color) {
                        that._msgBox.warn('请填写颜色');
                        return false;
                    }
                    break;
                case 3:
                    // topic; 
                    if (!data.max_size) {
                        that._msgBox.warn('请输入最大展示张数');
                        return false;
                    }
                    if (!data.img_width) {
                        that._msgBox.warn('请输入图片宽度');
                        return false;
                    }
                    if (!data.img_height) {
                        that._msgBox.warn('请输入图片高度');
                        return false;
                    }
                    break;
            }
            if (!data.status) {
                that._msgBox.warn('请选择状态');
                return false;
            }
            return true;
        },
        popDialog: function (content, title, width, height, okBtn) {
            var self = this;
            var buttons = [];
            if (okBtn) {
                buttons.push(okBtn);
            }
            buttons.push({
                type: 'highlight',
                text: '取消',
                handler: function (button, dialog) {
                    dialog.close();
                }
            })
            self.popupDialog = jDialog.dialog({
                title: title,
                content: content,
                width: width,
                height: height,
                closeable: true,
                closeOnBodyClick: false,
                draggable: false,
                buttonAlign: 'right',
                buttons: buttons
            });
            return self.popupDialog;
        },
    });

    $(function() {
        new operate.layout.list();
    });
})(cobra);