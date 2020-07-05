export default {
    data() {
        return {
            total: 0,
            spanSize: 6,
            regions: [{
                    label: "爱博一村",
                    value: "爱博一村",
                    loctionId: '1'
                },
                {
                    label: "爱博二村",
                    value: "爱博二村",
                    loctionId: '2'

                },
                {
                    label: "爱博三村",
                    value: "爱博三村",
                    loctionId: '3'

                },
                {
                    label: "爱博四村",
                    value: "爱博四村",
                    loctionId: '4'

                },
                {
                    label: "爱博五村",
                    value: "爱博五村",
                    loctionId: '5'

                },
                {
                    label: "爱博六村",
                    value: "爱博六村",
                    loctionId: '6'

                },
                {
                    label: "爱博七村",
                    value: "爱博七村",
                    loctionId: '7'

                },
                {
                    label: "其他",
                    value: "其他",
                    loctionId: '其他'
                }
            ],
            status: [{
                    label: "可租",
                    value: "1"
                },
                {
                    label: "暂缓",
                    value: "2"
                },
                {
                    label: "已租",
                    value: "3"
                }
            ],
            roomList: ['主卧间',
                '阳台间',
                '次卧间',
                '北次卧间',
                '北餐厅间',
                '厨房间'
            ],
            roomLayoutList: ['一室户', "单间", "一房一厅", "两室一厅", "两室两厅", "三室一厅", "三室两厅", "四室一厅", "四室两厅"],
            facilities: [{
                icon: '1',
                title: '电磁炉'
            }, {
                icon: '1',
                title: '宽带'
            }, {
                icon: '1',
                title: '床'
            }, {
                icon: '1',
                title: '衣柜'
            }, {
                icon: '1',
                title: '沙发'
            }, {
                icon: '1',
                title: '电视'
            }, {
                icon: '1',
                title: '空调'
            }, {
                icon: '1',
                title: '洗衣机'
            }, {
                icon: '1',
                title: '冰箱'
            }, {
                icon: '1',
                title: '热水器'
            }, {
                icon: '1',
                title: '独卫'
            }, {
                icon: '1',
                title: '阳台'
            }, {
                icon: '1',
                title: '桌椅'
            }, {
                icon: '1',
                title: '微波炉'
            }, {
                icon: '1',
                title: '可做饭'
            }, {
                icon: '1',
                title: '智能门锁'
            }, {
                icon: '1',
                title: '抽烟机'
            }],
            towardList: ['东', '西', '南', '北', '东北', '东南', '西北', '西南', ],
            tags:['整租','精装修','可做饭','独立阳台','新上','朝南','交通便利','有电梯','近地铁']
        }
    },
    created() {
        this.init && this.init()
    },
    methods: {
        // 分页大小变化
        handleSizeChange(size) {
            this.searchForm.size = size;
            this.getList();
        },
        // 当前页面变化
        handleCurrentChange(page) {
            this.searchForm.page = page;
            this.getList();
        },
        // 搜索
        searchList() {
            this.searchForm.page = 1;
            this.getList();
        },
        indexMethod(index) {
            return (this.searchForm.page - 1) * this.searchForm.size + index + 1;
        },

    },
    computed: {
        // 根据小区计算楼栋数量
        floorList() {
            let location = this.tenantsForm.location;
            let floorNo;
            switch (location) {
                case "爱博一村":
                    floorNo = 93;
                    break;
                case "爱博二村":
                    floorNo = 156;
                    break;
                case "爱博三村":
                    floorNo = 69;
                    break;
                case "爱博四村":
                    floorNo = 48;
                    break;
                case "爱博五村":
                    floorNo = 88;
                    break;
                case "爱博六村":
                    floorNo = 57;
                    break;
                case "爱博七村":
                    floorNo = 55;
                    break;
                default:
                    floorNo = 100;
                    break;
            }
            return floorNo;
        },
        // 房间信息
        room_info() {
            let {
                location,
                floor,
                roomNo,
                room
            } = this.tenantsForm;
            let info = `${location}--${floor}--${roomNo}`;
            if (room) {
                info += `--${room}`;
            }
            return info;
        },
        // 合同剩余天数
        daysToContract() {
            let {
                stopTime
            } = this.tenantsForm;
            if (stopTime) {
                let oneDayTime = 24 * 60 * 60 * 1000;
                return Math.max(Math.floor((stopTime - new Date()) / oneDayTime), 0)
            }
            return 0;
        }
    },
}