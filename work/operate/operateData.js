// 运营位相关的数据结构
// ----------------------

const deepClone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
};

// 默认的版本号范围
export const defVersionRange = [{
    start: {
        a: '1',
        b: '0',
        c: '0'
    },
    end: {
        a: '1',
        b: '0',
        c: '0'
    }
}];

// 运营位内容搜索栏对应的数据结构
export const defSeach = {
    name: '',
    id: '',
    app_type: '',
    resource_id: '',
    status: '',
    expire: ''
};

// 新运营位内容对应的数据结构  
export const newOperateCon = {
    name: '',
    resource_id: '',
    resource_name: '',
    resource_type: '', // 图片 商品组 专题
    weight: '',
    resource_app_type: '1', // 用户 BA
    condition_obj: {
        new_user_only: 0,
        ios_version: deepClone(defVersionRange),
        android_version: deepClone(defVersionRange),
        android_channel: ['360', 'xiaomi']
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
};
