<script>
import TypeThreeTilesDemo from './coms/type_three_content'
import NorthCombustionTiles from './coms/north_tiles'
const componentsJson = {
  'nearNew': TypeThreeTilesDemo,
  'northShowScreen': NorthCombustionTiles
}
export default {
  name: 'type-three-tiles-config',
  data () {
    return {

    }
  },
  props: ['dataSource'],
  render: function (h) {
    return h(this.getTiles(this.dataSource.component.name), { props: {
      dataSource: this.dataSource
    } })
  },
  methods: {
    getTiles (type) {
      return componentsJson[type]
    }
  }
}
</script>
