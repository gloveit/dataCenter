<script>
import SupeMeterTiles from './coms/supe_meter_tiles'
import MeterAbnormalTiles from './coms/meter_abnormal_tiles'
import UseGasAbnormal from './coms/use_gas_tiles'
import MeterReadingChance from './coms/meter_reading_chance'
import TotalPayment from './coms/total_payment'
import PaymentMethods from './coms/payment_methods'
import CustomerDevelopment from './coms/customer_development'
import OnlineInspection from './coms/online_inspection'
import GasPrediction from './coms/gas_prediction'
import HistoryAbnormal from './coms/history_abnormal'
import TempAbnormal from './coms/temp_abnormal'
import PressureAbnormal from './coms/pressure_abnormal'
import FlowAbnormal from './coms/flow_abnormal'
import BatterAbnormal from './coms/batter_abnormal'
import DemoTiles from './coms/demo'
const componentsJson = {
  'supenumber': SupeMeterTiles,
  'meterAbnormal': MeterAbnormalTiles,
  'usegasabnormal': UseGasAbnormal,
  'meterReadingChance': MeterReadingChance,
  'totalPayment': TotalPayment,
  'paymentMethods': PaymentMethods,
  'customerDevelopment': CustomerDevelopment,
  'onlineInspection': OnlineInspection,
  'gasPrediction': GasPrediction,
  'historyAbnormal': HistoryAbnormal,
  'tempAbnormal': TempAbnormal,
  'pressureAbnormal': PressureAbnormal,
  'flowAbnormal': FlowAbnormal,
  'batterAbnormal': BatterAbnormal,
  'meterAlarmReportTile': DemoTiles,
  'faultMeterDistribution': DemoTiles,
  'pivotTable': DemoTiles,
  'dataBreakQuery': DemoTiles
}
export default {
  name: 'tiles-config',
  data () {
    return {

    }
  },
  props: ['data'],
  render: function (h) {
    return h(this.getTiles(this.data.component.name))
  },
  methods: {
    getTiles (type) {
      return componentsJson[type]
    }
  }
}
</script>
