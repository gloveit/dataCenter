<template>
  <div>
    <magnet-type-one
      v-if="dataSource.tile_type===1"
      :dataSource='dataSource'
    ></magnet-type-one>
    <magnet-type-two
      v-else-if="dataSource.tile_type===2"
      :dataSource='dataSource'
    ></magnet-type-two>
    <magnet-type-three
      v-if="dataSource.tile_type===3"
      :dataSource='dataSource'
    ></magnet-type-three>
  </div>
</template>
<script>
import MagnetTypeOne from './magnet_type_one'
import MagnetTypeTwo from './magnet_type_two'
import MagnetTypeThree from './magnet_type_three'
export default {
  name: 'magnet',
  props: ['dataSource'],
  components: {
    MagnetTypeOne,
    MagnetTypeTwo,
    MagnetTypeThree
  },
  data () {
    return {}
  },
  mounted: function () {
    // console.log('数据--------', this.dataSource)
  }
}
</script>
