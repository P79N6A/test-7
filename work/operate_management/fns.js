/**
 * 运营位管理
 */
(function(cb) {
    // debug mod
    Vue.config.devtools = true

    var global = {
        opItemSelection : [],
        opItemList : []
    };

    cb._({
        "~name": "operate.content.newlist",
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
                        app_type: '',
                        resource_id : '',
                        status: '',
                        expire: '',
                        id: ''
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
                    opContentSearch: function() {
                        self.request("getOpContentList");
                    },
                    searchReset: function() {
                        this.search.name = '';
                        this.search.resource_id = '';
                        this.search.id = '';
                        this.search.app_type = '';
                        this.search.status = '';
                        this.search.expire = '';
                    },
                    addOperate: function() {
                        self.addOperate();
                    },
                    getOperate: function(opId) {
                        self.addOperate(opId);
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
            this.request("getOpContentList");
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

            self.request('setOpContentStatus');
        },
        setOpContentStatusArgs : function(){
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
                    self.request("getOpContentList");
                    self._msgBox.done('修改成功');
                })
            }
        },
        getOpContentListArgs : function(){
            var that = this;
            return {
                type : "post",
                dataType : "json",
                data : {
                    offset : (that.operateListVue.pageId-1)*that.operateListVue.pageSize,
                    count: that.operateListVue.pageSize,
                    name: that.operateListVue.search.name,
                    id: that.operateListVue.search.id,
                    app_type: that.operateListVue.search.app_type,
                    status: that.operateListVue.search.status,
                    resource_id: that.operateListVue.search.resource_id,
                    expire: that.operateListVue.search.expire
                },
                xhrFields: {
                    withCredentials: true
                },
                done : cobra.ride(this, function(data){
                    var resultData = [];
                    resultData = data.data.data;
                    that.operateListVue.dataList = resultData;
                    that.operateListVue.checkAllFlag = false;
                    that.pagination(data.data.total_count, $('#p-opcontent'), that.operateListVue, function() {
                        that.request("getOpContentList");
                    });
                })
            }
        },
        getOpContentArgs: function() {
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
        updateOpContentArgs: function() {
            var self = this;
            return {
                type : "post",
                dataType : "json",
                data : {
                    name : self.opInfoVue.opInfo.name,
                    resource_id : self.opInfoVue.opInfo.resource_id,
                    resource_type: self.opInfoVue.opInfo.resource_type,
                    weight: self.opInfoVue.opInfo.weight,
                    app_type : self.opInfoVue.opInfo.app_type,
                    ios_version: self.opInfoVue.ios_version,
                    android_version: self.opInfoVue.android_version,
                    android_channel: JSON.stringify(self.opInfoVue.opInfo.condition_obj.android_channel),
                    new_user_only: self.opInfoVue.opInfo.condition_obj.new_user_only == true ? 1 : 0,
                    start_time: self.opInfoVue.opInfo.start_time,
                    end_time: self.opInfoVue.opInfo.end_time,
                    status : self.opInfoVue.opInfo.status,
                    remark: self.opInfoVue.opInfo.remark,
                    image_url: self.opInfoVue.opInfo.image_url,
                    text: self.opInfoVue.opInfo.text,
                    forward_code: self.opInfoVue.opInfo.forward_code,
                    forward_param: self.opInfoVue.opInfo.forward_param,
                    item_group_id: self.opInfoVue.opInfo.item_group_id,
                    topic_id: self.opInfoVue.opInfo.topic_id,
                    show_item: self.opInfoVue.opInfo.show_item,
                    show_more: self.opInfoVue.opInfo.show_more,
                    id: self.opInfoVue.opInfo.id
                },
                xhrFields: {
                    withCredentials: true
                },
                done : cobra.ride(this, function(data){
                    console.log(data)
                    self.operateListVue.searchReset();
                    self.request("getOpContentList");
                    self._msgBox.done('修改成功');
                })
            }
        },
        addOperate: function (operateId) {
            var self = this;
            var template = $('#J-add-operate').html();
            self.popOutterDialog(template, '录入/编辑运营内容', 800, 600, {
                type: 'highlight',
                text: '提交',
                handler: function (button, dialog) {
                    if(self.validateForm(self.opInfoVue.opInfo)) {
                        self.request('updateOpContent');
                        self.outterDialog.close();
                    }else {
                        console.log('error')
                    }
                }
            })
            self.imgUpload();
            self.opInfoVue = new Vue({
                el: '#opInfoTemplate',
                data: {
                    operateId: '',
                    editStatus: 'add', // add录入 edit编辑
                    opInfo: {
                        name: '',
                        resource_id: '',
                        resource_name: '',
                        resource_type: '', // 图片 商品组 专题
                        weight: '',
                        resource_app_type: '1', // 用户 BA
                        condition_obj: {
                            new_user_only: 0,
                            ios_version: [
                                {
                                    start:{
                                        a: '1',
                                        b: '0',
                                        c: '0'
                                    },
                                    end: {
                                        a: '1',
                                        b: '0',
                                        c: '0'
                                    }
                                }
                            ],
                            android_version:[
                                {
                                    start:{
                                        a: '1',
                                        b: '0',
                                        c: '0'
                                    },
                                    end: {
                                        a: '1',
                                        b: '0',
                                        c: '0'
                                    }
                                }
                            ],
                            android_channel: ['360','xiaomi']
                        },
                        ios_version_start: '',
                        ios_version_end: '',
                        start_time: '',
                        end_time: '',
                        status: '0', // 0 1 未激活 激活
                        remark: '', // 评论
                        show_more: false,
                        show_item: false,
                        text: '',
                        image_url: '',
                        forward_protocol: '', //"watsons-protocol://share/"
                        forward_param: '', //"uid={uid}"
                        forward_code: '', //"share"
                        forward_remark: '',
                        item_group_id: '',
                        topic_id: '',
                        id: ''
                    },
                    count: 0
                },
                computed: {
                    op_name: function() {
                        var self = this;
                        var ret = self.opInfo.resource_id + ':' + self.opInfo.resource_name;
                        return ret
                    },
                    channelArr: function() {
                        var self = this;
                        var ret = '';
                        ret = self.opInfo.condition_obj.android_channel.join(',');
                        return ret
                    },
                    ios_version: function() {
                        var self = this;
                        var obj = {};
                        obj = self.opInfo.condition_obj.ios_version
                        return JSON.stringify(obj)
                    },
                    android_version: function() {
                        var self = this;
                        var obj = {};
                        obj = self.opInfo.condition_obj.android_version
                        return JSON.stringify(obj)
                    }
                },
                methods: {
                    popOpLayoutList: function() {
                        self.getOpLayoutList();
                    },
                    addIosVersion: function() {
                        var self = this;
                        var data = {
                            start:{
                                a: '1',
                                b: '0',
                                c: '0'
                            },
                            end: {
                                a: '1',
                                b: '0',
                                c: '0'
                            }
                        }
                        this.opInfo.condition_obj.ios_version = this.opInfo.condition_obj.ios_version.concat(data)
                    },
                    removeIosVersion: function(index) {
                        this.opInfo.condition_obj.ios_version.splice(index, 1)
                    },
                    addAndroidVersion: function() {
                        var self = this;
                        var data = {
                            start:{
                                a: '1',
                                b: '0',
                                c: '0'
                            },
                            end: {
                                a: '1',
                                b: '0',
                                c: '0'
                            }
                        }
                        this.opInfo.condition_obj.android_version = this.opInfo.condition_obj.android_version.concat(data)
                    },
                    removeAndroidVersion: function(index) {
                        this.opInfo.condition_obj.android_version.splice(index, 1)
                    },
                    popProtocolList: function() { // 伪协议列表
                        self.getProtocolList();
                    },
                    popItemGroupList: function() {
                        self.getItemGroupList();
                    },
                    removeChannel: function(index) {
                        this.opInfo.condition_obj.android_channel.splice(index, 1)
                    },
                    addChannel: function() {
                        var self = this;
                        var data = '';
                        this.opInfo.condition_obj.android_channel = this.opInfo.condition_obj.android_channel.concat(data)
                    }
                },
                mounted: function() {
                    Vue.nextTick(function(){
                        $('#startTime').cxCalendar({
                            type: 'datetime',
                            format: 'YYYY-MM-DD HH:mm:ss'
                        });
                        $('#endTime').cxCalendar({
                            type: 'datetime',
                            format: 'YYYY-MM-DD HH:mm:ss'
                        });
                    })
                }
            });
            if(operateId) {
                self.opInfoVue.editStatus = 'edit'
                self.opInfoVue.operateId = operateId;
                self.request('getOpContent');
            }
        },
        getOpLayoutList: function() {
            var self = this;
            var template = $('#J-op-layout').html();
            self.popDialog(template, '选择运营位', 800, 600, {
                type: 'highlight',
                text: '确定',
                handler: function (button, dialog) {
                    self.popupDialog.close();
                }
            })
            self.opLayoutList = new Vue({
                el: '#opLayoutEl',
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
                    selectOpLayout: function(id, name, type, app_type) {
                        // todo
                        self.opInfoVue.opInfo.resource_id = id;
                        self.opInfoVue.opInfo.resource_name = name;
                        self.opInfoVue.opInfo.resource_type = type;
                        self.opInfoVue.opInfo.resource_app_type = app_type;
                        self.popupDialog.close();
                    }
                }
            });
            this.request("getOperateList");
        },
        getOperateListArgs : function(){
            var that = this;
            return {
                type : "post",
                dataType : "json",
                data : {
                    offset : (that.opLayoutList.pageId-1)*that.opLayoutList.pageSize,
                    count: that.opLayoutList.pageSize,
                    name: that.opLayoutList.search.name,
                    id: that.opLayoutList.search.id,
                    app_type: that.opLayoutList.search.app_type,
                    status: that.opLayoutList.search.status,
                    resource_id: that.opLayoutList.search.resource_id,
                    expire: that.opLayoutList.search.expire
                },
                xhrFields: {
                    withCredentials: true
                },
                done : cobra.ride(this, function(data){
                    var resultData = [];
                    resultData = data.data.data;
                    that.opLayoutList.dataList = resultData;
                    that.opLayoutList.checkAllFlag = false;
                    that.pagination(data.data.total_count, $('#p-layout'), that.opLayoutList, function() {
                        that.request("getOperateList");
                    });
                })
            }
        },
        getProtocolList: function() {
            var self = this;
            var template = $('#J-protocol-layout').html();
            self.popDialog(template, '选择伪协议', 800, 600, {
                type: 'highlight',
                text: '确定',
                handler: function (button, dialog) {
                    self.popupDialog.close();
                }
            })
            self.protocolList = new Vue({
                el: '#protocolEl',
                data: {
                    dataList: [],
                    pageSize: 10, // 每页10个
                    pageIndex: 0, // 从第几个拿
                    pageId: 1, //页码
                    visiblePages: 10, //最大页码
                    checkAllFlag: false
                },
                filters: {},
                methods: {
                    selectProtocol: function(item) {
                        self.opInfoVue.opInfo.forward_protocol = item.protocol;
                        self.opInfoVue.opInfo.forward_code = item.code;
                        // self.opInfoVue.opInfo.forward_param = item.param_list;
                        self.opInfoVue.opInfo.forward_remark = item.remark;
                        self.popupDialog.close();
                    }
                }
            });
            this.request("getProtocolList");
        },
        getProtocolListArgs: function() {
            var that = this;
            return {
                type : "post",
                dataType : "json",
                data : {},
                xhrFields: {
                    withCredentials: true
                },
                done : cobra.ride(this, function(data){
                    var resultData = [];
                    resultData = data.data.module;
                    that.protocolList.dataList = resultData;
                    // that.opLayoutList.dataList = resultData;
                    // that.opLayoutList.checkAllFlag = false;
                    that.pagination(resultData.length, $('#p-protocol'), that.protocolList, function() {
                        that.request("getProtocolList");
                    }); //todo 接口没返回列表长度
                })
            }
        },
        getItemGroupList: function() {
            var self = this;
            var template = $('#J-itemgroup-layout').html();
            self.popDialog(template, '选择商品组', 800, 600, {
                type: 'highlight',
                text: '确定',
                handler: function (button, dialog) {
                    self.popupDialog.close();
                }
            })
            self.itemGroupList = new Vue({
                el: '#itemgroupEl',
                data: {
                    searchId: '',
                    dataList: [],
                    pageSize: 10, // 每页10个
                    pageIndex: 0, // 从第几个拿
                    pageId: 1, //页码
                    visiblePages: 10, //最大页码
                    checkAllFlag: false
                },
                filters: {},
                methods: {
                    groupSearch: function() {
                        self.request("getItemGroupList");
                    },
                    searchReset: function() {
                        this.searchId = '';
                    },
                    selectItemGroup: function(item) {
                        self.opInfoVue.opInfo.item_group_id = item.item_group_info.id;
                        self.popupDialog.close();
                    }
                }
            });
            this.request("getItemGroupList");
        },
        getItemGroupListArgs: function() {
            var that = this;
            return {
                type : "post",
                dataType : "json",
                data : {
                    id: that.itemGroupList.searchId,
                    current_page : (that.itemGroupList.pageId),
                    page_size: that.itemGroupList.pageSize
                },
                xhrFields: {
                    withCredentials: true
                },
                done : cobra.ride(this, function(data){
                    var resultData = [];
                    resultData = data.data.data;
                    that.itemGroupList.dataList = resultData;
                    // that.opLayoutList.dataList = resultData;
                    // that.opLayoutList.checkAllFlag = false;
                    that.pagination(data.data.total_count, $('#p-itemgroup'), that.itemGroupList, function() {
                        that.request("getItemGroupList");
                    }); //todo 接口没返回列表长度
                })
            }
        },
        pagination: function (total, $el, vue_object, callback) {
            var self = this;
            var pagination = $el;
            pagination.jqPaginator({
                totalCounts: total == 0 ? 1 : total,                            // 设置分页的总条目数
                pageSize: vue_object.pageSize,                          // 设置每一页的条目数
                visiblePages: vue_object.visiblePages,                  // 设置最多显示的页码数
                currentPage: vue_object.pageId,   // 设置当前的页码
                prev: '<a class="prev" href="javascript:;">&lt;<\/a>',
                next: '<a class="next" href="javascript:;">&gt;<\/a>',
                page: '<a href="javascript:;">{{page}}<\/a>',
                onPageChange: function (num, type) {
                    if (type == 'change') {
                        vue_object.pageId = num;
                        // self.request("getOpContentList");
                        callback&&callback();
                    }
                }
            });
            var n = vue_object.dataList ? vue_object.dataList.length : 0;
            if (total && total != 0) {
                pagination.append('<span>当前' + n + '条</span>/<span>共' + total + '条</span>')
            } else {
                pagination.append('<span>当前0条</span>/<span>共' + total + '条</span>')
            }
        },
        popOutterDialog: function (content, title, width, height, okBtn) {
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
            self.outterDialog = jDialog.dialog({
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
            return self.outterDialog;
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
        validateForm: function (data) {
            var that = this;
            var type = data.resource_type;
            // todo 将来换vue日期插件
            data.start_time = $('#startTime').val();
            data.end_time = $('#endTime').val();
            if (!data.name) {
                that._msgBox.warn('请输入运营位内容名称');
                return false;
            }
            if (!data.resource_id) {
                that._msgBox.warn('请选择运营位');
                return false;
            }
            if (!data.weight) {
                that._msgBox.warn('请选择排序权重');
                return false;
            }
            if (!data.resource_app_type) {
                that._msgBox.warn('请选择平台');
                return false;
            }
            if (!data.resource_type) {
                that._msgBox.warn('请选择类型');
                return false;
            }
            switch(parseInt(type)) {
                case 1:
                    // goods; 
                    if (!data.image_url) {
                        that._msgBox.warn('请上传图片');
                        return false;
                    }
                    if (!data.text) {
                        that._msgBox.warn('请填写文案');
                        return false;
                    }
                    if (!data.text) {
                        that._msgBox.warn('请填写文案');
                        return false;
                    }
                    if (!data.forward_code) {
                        that._msgBox.warn('请选择伪协议');
                        return false;
                    }
                    if (!data.forward_code) {
                        that._msgBox.warn('请填写参数');
                        return false;
                    }
                    break;
                case 2:
                    // itemGroup; 
                    if (!data.item_group_id) {
                        that._msgBox.warn('请选择商品组');
                        return false;
                    }
                    break;
                case 3:
                    // topic; 
                    if (!data.topic_id) {
                        that._msgBox.warn('请选择专题');
                        return false;
                    }
                    if (!data.image_url) {
                        that._msgBox.warn('请上传封面');
                        return false;
                    }
                    break;
            }
            if (!data.start_time) {
                that._msgBox.warn('请选择开始时间');
                return false;
            }
            if (!data.end_time) {
                that._msgBox.warn('请选择结束时间');
                return false;
            }
            return true;
        },
        imgUpload: function () {
            var self = this;
            var imgUpload = new lib.imgUpload({
                trigger: '.upload-img',
                'onUploadStart': function () {
                },
                'onUploadError': function (e) {
                },
                'onUploadSuccess': function (data) {
                    var $trigger = this.currentTrigger;
                    if (data.code == 10000) {
                        var url = data.data.url;
                        $trigger.css('background', 'none');
                        $trigger.css('border', 'none');
                        if ($trigger.hasClass('upload-logo')) {
                            self.opInfoVue.opInfo.image_url = url;
                        }
                        self._msgBox.done("图片上传成功");
                    } else {
                        self._msgBox.warn("上传失败，请重试！");
                    }
                }
            });
        }
    });

    $(function() {
        new operate.content.newlist();
    });
})(cobra);