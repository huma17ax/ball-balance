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
            <!--{{chip}}--> 
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
    mapchipStyle: function (row,col) { 
      var color = this.mapchips[row][col]; 
      return { 
        'width': this.mapchipSize + 'px', 
        'height': this.mapchipSize + 'px', 
        'background-color': color} 
    }, 
  }, 
  computed: { 
    ...mapState('manager', ['screenWidth', 'screenHeight', 'mapchips', 'mapWidth', 'mapHeight']),
    ...mapGetters('manager',['mapchipSize']),
    flameStyle: function () { 
      var size_w = this.mapchipSize * this.mapHeight 
      var size_h = this.mapchipSize * this.mapWidth
      return {'width': size_w + 'px', 'height': size_h + 'px'}
    }, 
    marginStyle: function () { 
      var size_tb = (this.screenHeight - this.mapchipSize * this.mapWidth) /2 
      var size_lr = (this.screenWidth - this.mapchipSize * this.mapHeight) /2 
      return { 
        'margin-top': size_tb + 'px', 
        'margin-bottom': size_tb + 'px', 
        'margin-left': size_lr + 'px', 
        'margin-right': size_lr + 'px'} 
    }, 
    // mapchipSize: function () {
    //   var size = Math.min(this.screenWidth / this.mapWidth, this.screenHeight / this.mapHeight)
    //   console.log(size)
    // //   this.$store.dispatch('manager/setMapchipSize', size)
    //   return size
    // }, 
    styles: function () {
 
    } 
  }
} 
</script> 
 
<style scoped>
 
.flame { 
    /* border: solid black; */
    position: relative; 
} 
 
.maprow { 
    display: flex; 
} 
 
.mapchip { 
    background-color: grey; 
} 
</style> 
