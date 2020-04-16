<template>
    <div
    class = "flame"
    v-bind:style="[flameStyle, marginStyle]"
    >
        <div v-for="(row,index_r) in mapImgs" v-bind:key="row.id"
        class = "maprow">
            <tile v-for="(chip,index_c) in row" v-bind:key="chip.id"
            v-bind:attr="{pos_r: index_r, pos_c: index_c}"
            ref="tile">
            </tile>
        </div>
        <ball ref="ball"></ball>
    </div>
</template>

<script>
import ball from './Ball'
import tile from './Tile'
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'flame',
  components: {
    ball,
    tile
  },
  data: function () {
    return {
    }
  },
  methods: {
    run: function () {
      this.$refs.ball.run()
      for (var tile of this.$refs.tile) {
        tile.run()
      }
    },
    mapchipStyle: function (row, col) {
      var image = this.mapImgs[row][col]
      var ret = {
        'width': this.mapchipSize + 'px',
        'height': this.mapchipSize + 'px'
      }

      if (image === 'black') {
        ret['background-color'] = 'black'
        ret['border'] = 'solid 3px springgreen'
      }
      if (image === 'white') {
        ret['background-color'] = 'black'
      }
      if (image === 'pink') {
        ret['background-color'] = 'black'
        ret['border-radius'] = '50%'
        ret['border'] = 'solid 3px crimson'
      }

      return ret
    }
  },
  computed: {
    ...mapState('manager', ['screenWidth', 'screenHeight', 'mapImgs', 'mapWidth', 'mapHeight']),
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
    background-color:gray;
    box-sizing: border-box;
}
</style>
