let jsonData = [
  {
    id: 0,
    name: 'collection',
    icon: 'collection',
    seq: 0,
    tiles: [
      {
        id: 5,
        title: '挂表数',
        sub_title: '当前处于正常使用的表设备',
        tile_type: 1,
        component: {
          id: 2,
          name: 'supenumber',
          path: '/pressureException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: {
          path: '/home/table',
          name: '表具异常详情'
        },
        path: '/home/supeMeter/list',
        childrenConponent: [
          {
            path: '/home/details',
            name: '表具异常详情'
          }
        ],
        seq: 0,
        cat_id: 2,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 3,
        title: '表具异常',
        sub_title: '当前处于用气异常的设备',
        tile_type: 1,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '用气异常'
        },
        tile_size: 1,
        linkedComponent: {
          path: '/home/table',
          name: '表具异常'
        },
        path: '/home/supeMeter/list',
        childrenConponent: [
          {
            path: '/home/details',
            name: '表具异常详情'
          }
        ],
        seq: 0,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 1,
        title: '温度异常',
        sub_title: '当前处于温度异常的设备',
        tile_type: 3,
        component: {
          id: 1,
          name: 'temperatureException',
          path: '/temperatureException',
          remark: '温度异常'
        },
        tile_size: 1,
        linkedComponent: null,
        seq: 19,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      }
    ]
  },
  {
    id: 2,
    name: '供销解决方案',
    icon: 'icon-gasuse',
    seq: 1,
    tiles: [
      {
        id: 2,
        title: '用气预测',
        sub_title: 'demo',
        tile_type: 2,
        component: {
          id: 2,
          name: 'usegasabnormal',
          path: '/pressureException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: 'gasAbnormal',
        path: '/home/gas/list',
        seq: 0,
        cat_id: 2,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 5,
        title: '双显示值误差',
        sub_title: 'demo',
        tile_type: 2,
        component: {
          id: 2,
          name: 'supenumber',
          path: '/pressureException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: 'supeMeter',
        path: '/home/supeMeter/list',
        seq: 0,
        cat_id: 2,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 14,
        title: '在线巡检',
        sub_title: '地图demo',
        tile_type: 2,
        component: {
          id: 2,
          name: 'supenumber',
          path: '/pressureException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: {
          path: '/map',
          name: '地图可视化'
        },
        seq: 0,
        cat_id: 2,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 14,
        title: '压力比对',
        sub_title: '压力比对',
        tile_type: 2,
        component: {
          id: 2,
          name: 'supenumber',
          path: '/pressureException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: {
          path: '/map',
          name: '地图可视化'
        },
        seq: 0,
        cat_id: 2,
        comp_id: null,
        link_comp_id: null
      }
    ]
  },
  {
    id: 1,
    name: '表具异常',
    icon: 'icon-meter',
    seq: 2,
    tiles: [
      {
        id: 3,
        title: '当前异常',
        sub_title: '查看当前异常',
        tile_type: 1,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '用气异常'
        },
        tile_size: 1,
        linkedComponent: {
          path: '/home/table',
          name: '表具异常'
        },
        path: '/home/supeMeter/list',
        childrenConponent: [
          {
            path: '/home/details',
            name: '表具异常详情'
          }
        ],
        seq: 0,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 3,
        title: '历史异常',
        sub_title: '查看当前异常',
        tile_type: 2,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '用气异常'
        },
        tile_size: 1,
        linkedComponent: {
          path: '/home/table',
          name: '历史异常'
        },
        path: '/home/supeMeter/list',
        childrenConponent: [
          {
            path: '/home/details',
            name: '历史异常'
          }
        ],
        seq: 0,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 3,
        title: '温度异常',
        sub_title: '温度异常',
        tile_type: 2,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '温度异常'
        },
        tile_size: 1,
        linkedComponent: {
          path: '/home/table',
          name: '温度异常'
        },
        path: '/home/supeMeter/list',
        childrenConponent: [
          {
            path: '/home/details',
            name: '温度异常'
          }
        ],
        seq: 0,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 3,
        title: '压力异常',
        sub_title: '压力异常',
        tile_type: 2,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: {
          path: '/home/table',
          name: '压力异常'
        },
        path: '/home/supeMeter/list',
        childrenConponent: [
          {
            path: '/home/details',
            name: '压力异常'
          }
        ],
        seq: 0,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 3,
        title: '瞬时流量异常',
        sub_title: '瞬时流量异常',
        tile_type: 2,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '瞬时流量异常'
        },
        tile_size: 1,
        linkedComponent: {
          path: '/home/table',
          name: '瞬时流量异常'
        },
        path: '/home/supeMeter/list',
        childrenConponent: [
          {
            path: '/home/details',
            name: '瞬时流量异常'
          }
        ],
        seq: 0,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 3,
        title: '电池电压异常',
        sub_title: '电池电压异常',
        tile_type: 2,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '用气异常'
        },
        tile_size: 1,
        linkedComponent: {
          path: '/home/table',
          name: '电池电压异常'
        },
        path: '/home/supeMeter/list',
        childrenConponent: [
          {
            path: '/home/details',
            name: '电池电压异常'
          }
        ],
        seq: 0,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      }
    ]
  },
  {
    id: 3,
    name: '营业厅',
    icon: 'icon-gasuse',
    seq: 1,
    tiles: [
      {
        id: 2,
        title: '抄表率',
        sub_title: 'demo',
        tile_type: 2,
        component: {
          id: 2,
          name: 'usegasabnormal',
          path: '/pressureException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: 'gasAbnormal',
        path: '/home/gas/list',
        seq: 0,
        cat_id: 2,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 5,
        title: '月账单',
        sub_title: 'demo',
        tile_type: 2,
        component: {
          id: 2,
          name: 'supenumber',
          path: '/pressureException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: 'supeMeter',
        path: '/home/supeMeter/list',
        seq: 0,
        cat_id: 2,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 14,
        title: '昨日缴费',
        sub_title: 'demo',
        tile_type: 2,
        component: {
          id: 2,
          name: 'supenumber',
          path: '/pressureException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: {
          path: '/map',
          name: '地图可视化'
        },
        seq: 0,
        cat_id: 2,
        comp_id: null,
        link_comp_id: null
      }
    ]
  },
  {
    id: 4,
    name: '展示屏',
    icon: 'icon-gasuse',
    seq: 1,
    tiles: [
      {
        id: 7,
        title: '北燃监控大屏',
        sub_title: '数据中心',
        tile_type: 2,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '用气异常'
        },
        tile_size: 1,
        linkedComponent: {
          path: 'open_other_href',
          name: '表具异常'
        },
        path: 'http://183.129.168.178:30290/#/main1',
        seq: 1,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      }
    ]
  },
  {
    id: 5,
    name: '报表',
    icon: 'icon-gasuse',
    seq: 1,
    tiles: [
      {
        id: 8,
        title: '表具多类别报警报表',
        sub_title: 'demo',
        tile_type: 2,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '用气异常'
        },
        tile_size: 1,
        linkedComponent: {
          path: '/home/meterTypeAlarmReport',
          name: '表计多类别报警报表'
        },
        path: '/home/meterTypeAlarmReport',
        seq: 1,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 9,
        title: '故障率表具类型分布',
        sub_title: 'demo',
        tile_type: 2,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '用气异常'
        },
        tile_size: 1,
        linkedComponent: {
          path: '/home/falutMeterReport',
          name: '故障率表具类型分布'
        },
        path: '/home/falutMeterReport',
        seq: 1,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      }
    ]
  },
  {
    id: 6,
    name: '企业发展',
    icon: 'icon-gasuse',
    seq: 1,
    tiles: [
      {
        id: 2,
        title: '客户发展数',
        sub_title: 'demo',
        tile_type: 2,
        component: {
          id: 2,
          name: 'usegasabnormal',
          path: '/pressureException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: 'gasAbnormal',
        path: '/home/gas/list',
        seq: 0,
        cat_id: 2,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 5,
        title: '大客户管理',
        sub_title: '当前处于正常使用的表设备',
        tile_type: 2,
        component: {
          id: 2,
          name: 'supenumber',
          path: '/pressureException',
          remark: '压力异常'
        },
        tile_size: 2,
        linkedComponent: 'supeMeter',
        path: '/home/supeMeter/list',
        seq: 0,
        cat_id: 2,
        comp_id: null,
        link_comp_id: null
      }
    ]
  },
  {
    id: 7,
    name: '其他',
    icon: 'icon-gasuse',
    seq: 1,
    tiles: [
      {
        id: 10,
        title: '数据透视表',
        sub_title: '应收统计',
        tile_type: 2,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '用气异常'
        },
        linkedComponent: {
          path: '/home/pivotTable',
          name: '数据透视表'
        },
        path: '/home/falutMeterReport',
        seq: 1,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      },
      {
        id: 11,
        title: '数据明细表',
        sub_title: '明细表',
        tile_type: 2,
        component: {
          id: 3,
          name: 'meterAbnormal',
          path: '/gasuseException',
          remark: '用气异常'
        },
        linkedComponent: {
          path: '/home/dataBreak',
          name: '数据明细表'
        },
        path: '/home/dataBreak',
        seq: 1,
        cat_id: 1,
        comp_id: null,
        link_comp_id: null
      }
    ]
  }
]

export default jsonData
