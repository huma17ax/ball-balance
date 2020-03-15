<template>
    <div
    class = "flame"
    v-bind:style="[flameStyle, marginStyle]"
    >
        <div v-for="(row,index_r) in mapchips" v-bind:key="row.id"
        class = "maprow">
            <div v-for="(chip,index_c) in row" v-bind:key="chip.id"
            class = "mapchip"
            v-bind:style="mapchipStyle(index_r,index_c)">
            </div>
        </div>
        <ball ref="ball"></ball>
    </div>
</template>

<script>
import ball from './Ball'
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'flame',
  components: {
    ball
  },
  data: function () {
    return {
    }
  },
  methods: {
    run: function () {
      this.$refs.ball.run()
    },
    mapchipStyle: function (row, col) {
      var color = this.mapchips[row][col]
      return {
        'width': this.mapchipSize + 'px',
        'height': this.mapchipSize + 'px',
        'background-color': color}
    }
  },
  computed: {
    ...mapState('manager', ['screenWidth', 'screenHeight', 'mapchips', 'mapWidth', 'mapHeight']),
    ...mapGetters('manager', ['mapchipSize']),
    flameStyle: function () {
      var sizeW = this.mapchipSize * this.mapHeight
      var sizeH = this.mapchipSize * this.mapWidth
      return {'width': sizeW + 'px', 'height': sizeH + 'px'}
    },
    marginStyle: function () {
      var sizeTB = (this.screenHeight - this.mapchipSize * this.mapWidth) / 2
      var sizeLR = (this.screenWidth - this.mapchipSize * this.mapHeight) / 2
      return {
        'margin-top': sizeTB + 'px',
        'margin-bottom': sizeTB + 'px',
        'margin-left': sizeLR + 'px',
        'margin-right': sizeLR + 'px'}
    }
  }
}
</script>

<style scoped>

.flame {
    position: relative;
}

.maprow {
    display: flex;
}

.mapchip {
    background-color: grey;
}
</style>
