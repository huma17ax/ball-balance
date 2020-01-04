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
        <ball ref="ball" 
        v-bind:chipsize="mapchipSize" 
        v-bind:mapchips="mapchips" 
        v-bind:startpos="startpos"></ball> 
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
        ['B','B','B','B','B','B','B'], 
        ['B','W','W','W','W','W','B'], 
        ['B','W','B','W','B','W','B'], 
        ['B','W','W','W','W','W','B'], 
        ['B','W','B','W','B','W','B'], 
        ['B','W','W','W','W','W','B'], 
        ['B','B','B','B','B','B','B'] 
      ], 
      chipRow: undefined, 
      chipCol: undefined, 
      chipsize: undefined, 
      colorSignDefine: { 
        'B': 'black', 
        'Y': 'yellow', 
        'W': 'white', 
        'R': 'red', 
        'BR': 'brown' 
      }, 
      startpos: {x: 1, y: 1} 
    } 
  }, 
  methods: { 
    run: function () { 
      this.$refs.ball.run() 
    }, 
    mapchipStyle: function (row,col) { 
      var color = this.colorSignDefine[this.mapchips[row][col]]; 
      return { 
        'width': this.mapchipSize + 'px', 
        'height': this.mapchipSize + 'px', 
        'background-color': color} 
    }, 
  }, 
  computed: { 
    flameStyle: function () { 
      var size_w = this.mapchipsize * this.chipCol 
      var size_h = this.mapchipSize * this.chipRow 
      return {'width': size_w + 'px', 'height': size_h + 'px'} 
    }, 
    marginStyle: function () { 
      var size_tb = (this.heightsize - this.mapchipSize * this.chipRow) /2 
      var size_lr = (this.widthsize - this.mapchipSize * this.chipCol) /2 
      return { 
        'margin-top': size_tb + 'px', 
        'margin-bottom': size_tb + 'px', 
        'margin-left': size_lr + 'px', 
        'margin-right': size_lr + 'px'} 
    }, 
    mapchipSize: function () { 
      return Math.min(this.widthsize / this.chipCol, this.heightsize / this.chipRow); 
    }, 
    styles: function () {
 
    } 
  }, 
  mounted: function () { 
    this.chipRow = this.mapchips.length; 
    this.chipCol = this.mapchips[0].length; 
  } 
} 
</script> 
 
<style scoped>
 
.flame { 
    border: solid black; 
    position: relative; 
} 
 
.maprow { 
    display: flex; 
} 
 
.mapchip { 
    background-color: grey; 
} 
</style> 
