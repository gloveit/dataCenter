import meterAbnormalList from '@/views/meterAbnormal/meterAbnormalList'
import MeterAbnormalDetails from '@/views/meterAbnormal/meterAbnormalDetails'
import gasPredictionLsit from '@/views/gasPrediction/gasPredictionList'
import gasPredictionDetails from '@/views/gasPrediction/gasPredictionDetails'
import FaultMeterTypeDistribution from '@/views/dataReport/faultMeterTypeDistribution/index'
import MeterTypeAlarmReport from '@/views/dataReport/meterTypeAlarmReport/index'
import PivotTable from '@/views/pivotTable/index'
import DataBreak from '@/views/dataBreakDown/dataBreak/index'
import DataConfig from '@/views/dataBreakDown/dataConfig/index'
import ItemTableConfig from '@/views/dataBreakDown/itemTableConfig/index'
import PatrolMan from '@/views/patrolman/index'
export function RouterConfig (type) {
  let json = {
    meterList: {
      path: '/home/table',
      component: meterAbnormalList,
      meta: {
        title: '当前异常',
        keepAlive: true
      }
    },
    meterDetails: {
      path: '/home/details',
      component: MeterAbnormalDetails,
      meta: {
        title: '当前异常详情',
        keepAlive: true
      }
    },
    faultMeterDis: {
      path: 'faultMeterReport',
      component: FaultMeterTypeDistribution,
      meta: {
        title: '故障率表具类型分布'
      }
    },
    meterTypeAlarmReport: {
      path: 'meterTypeAlarmReport',
      component: MeterTypeAlarmReport,
      meta: {
        title: '表具多类别报警报表'
      }
    },
    pivotTable: {
      path: 'pivotTable',
      component: PivotTable,
      meta: {
        title: '数据透视表'
      }
    },
    listQuery: {
      path: 'dataBreak',
      component: DataBreak,
      meta: {
        title: '明细表查询'
      }
    },
    dataTableConfig: {
      path: 'dataConfig',
      component: DataConfig,
      meta: {
        title: '数据表列表'
      }
    },
    tableFieldConfig: {
      path: 'itemTableConfig',
      component: ItemTableConfig,
      meta: {
        title: '表字段配置'
      }
    },
    mapView: {
      path: '/map',
      name: 'map',
      component: PatrolMan,
      meta: {
        title: '在线巡检'
      }
    },
    gasPredictionList: {
      path: 'gasPredictionList',
      component: gasPredictionLsit,
      meta: {
        title: '用气预测列表',
        keepAlive: true
      }
    },
    gasPredictionDetails: {
      path: 'gasPredictionDetails',
      component: gasPredictionDetails,
      meta: {
        title: '用气预测可视化'
      }
    }
  }
  return json[type] || {}
}
// gasAbnormal: [
//   {
//     path: 'gas/list',
//     component: GasAbnormalList,
//     meta: {
//       title: '表具异常'
//     }
//   },
//   {
//     path: 'gas/details',
//     component: GasAbnormalDetails
//   }
// ]
// supeMeter: [
//   {
//     path: 'supeMeter/list',
//     component: SupeMeterNumberList
//   },
//   {
//     path: 'meterInfo/Revision',
//     component: MeterInfoRevision
//   },
//   {
//     path: 'demo',
//     component: JustDemo
//   },
//   {
//     path: 'supeMeter/history',
//     component: SupeMeterNumberHistory
//   },
//   {
//     path: 'supeMeter/details',
//     component: SupeMeterNumberDetails
//   }
// ]
