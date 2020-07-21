// 房源效验对象
export const houstValidate = {}
// 租客效验对象
export const tenantsValidate = {
    location: [{
        required: true,
        message: "请选择房源位置",
        trigger: "change"
    }],
    floor: [{
        required: true,
        message: "请输入楼栋号",
        trigger: "change"
    }],
    roomNo: [{
        required: true,
        message: "请输入房间号",
        trigger: "blur"
    }],
    user_name: [{
        required: true,
        message: "请输入承租人",
        trigger: "blur"
    }],
    phone: [{
        required: true,
        message: "请输入联系电话",
        trigger: "blur"
    }, {
        pattern: /^1[2-9][0-9]{9}$/,
        message: "手机号格式错误",
        trigger: "blur"
    }],
    money: [{
            required: true,
            message: "请输入租金",
            trigger: "blur"
        },
        {
            pattern: /^[0-9]+$/,
            message: "请输入数字格式",
            trigger: "blur"
        }
    ],
    pay_type: [{
        required: true,
        message: "请选择支付方式",
        trigger: "change"
    }],
    startTime: [{
        required: true,
        message: "请选择合同周期",
        trigger: "blur"
    }],
    attention_day: [{
            required: true,
            message: "请输入剩余提醒天数",
            trigger: "blur"
        },
        {
            pattern: /^[0-9]+$/,
            message: "请输入数字格式",
            trigger: "blur"
        }
    ]
}
// 小程序房源效验
export const mixiSequenceValidate = {
    title: [{
        required: true,
        message: "请输入房源标题",
        trigger: "blur"
    }],
    houseRecommend: [{
        required: true,
        message: "请输入推荐等级",
        trigger: "blur"
    }, {
        pattern: /^[1-9]+|0$/,
        message: "请输入正整数",
        trigger: "blur"
    }],
    rentPrice: [{
        required: true,
        message: "请输入租价",
        trigger: "blur"
    }],
    agentPhone: [{
        required: true,
        message: "请输入租价",
        trigger: "blur"
    }, {
        pattern: /^1[2-9][0-9]{9}$/,
        message: "手机号格式错误",
        trigger: "blur"
    }],
    orientation: [{
        required: true,
        message: "请选择朝向",
        trigger: "change"
    }],
    location: [{
        required: true,
        message: "请选择位置",
        trigger: "change"
    }],
    rentMode: [{
        required: true,
        message: "请选择承租类型",
        trigger: "change"
    }],
    rentPeriod: [{
        required: true,
        message: "请选择承租周期",
        trigger: "change"
    }],
    status: [{
        required: true,
        message: "请选择是否上架",
        trigger: "change"
    }],
    houseImgs: [{
        required: true,
        message: "请上传图片",
        trigger: "change"
    }]
}