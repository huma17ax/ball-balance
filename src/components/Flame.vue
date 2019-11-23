<template>
    <div
    class = "flame"
    v-bind:style="[flameSize, marginSize]"
    >
        <div v-for="row in mapchips" v-bind:key="row.id"
        class = "maprow">
            <div v-for="chip in row" v-bind:key="chip.id"
            class = "mapchip"
            v-bind:style="mapchipSize">
            {{chip}}
            </div>
        </div>
        <ball ref="ball"></ball>
    </div>
</template>

<script>
import ball from './Ball'
import GD from '@/assets/GrobalData'

export default {
  name: 'flame',
  props: ['widthsize', 'heightsize'],
  components: {
    ball
  },
  data: function () {
    return {
      mapchips: [
        ['B','B','B','B','B'],
        ['B','B','B','B','B'],
        ['B','B','W','B','B'],
        ['B','B','B','B','B'],
        ['B','B','B','B','B']
      ],
      chipsize: undefined
    }
  },
  methods: {
    run: function () {
      this.$refs.ball.run()
    }
  },
  computed: {
    flameSize: function () {
      var size = Math.min(this.widthsize, this.heightsize)
      return {'width': size + 'px', 'height': size + 'px'}
    },
    marginSize: function () {
      var size_tb = Math.max(0, (this.heightsize - this.widthsize) / 2)
      var size_lr = Math.max(0, (this.widthsize - this.heightsize) / 2)
      return {
        'margin-top': size_tb + 'px',
        'margin-bottom': size_tb + 'px',
        'margin-left': size_lr + 'px',
        'margin-right': size_lr + 'px'}
    },
    mapchipSize: function () {
      var size = Math.min(this.widthsize, this.heightsize) / this.mapchips.length;
      return {'width': size + 'px', 'height': size + 'px'}
    },
    styles: function () {

    }
  }
}
</script>

<style scoped>

.flame {
    border: solid black;
}

.maprow {
    display: flex;
}

.mapchip {
    background-color: red;
}
</style>
