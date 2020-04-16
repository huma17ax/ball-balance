<template>
    <div class='wrapper'>
      <div class='wall' v-if="tileType=='wall1'" v-bind:style="[tileSize]" >
        <div v-for="(eff, idx) in wallEffectQueue" v-bind:key="eff.id"
        class='wall-in' v-bind:style="wallStyle(idx)"></div>
      </div>
      <div class='air' v-if="tileType=='air1'" v-bind:style="tileSize" ></div>
      <div class='ban' v-if="tileType=='ban1'" v-bind:style="tileSize" ></div>
      <div class='goal' v-if="tileType=='goal1'" v-bind:style="tileSize"></div>
    </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  name: 'Tile',
  props: ['attr'],
  data: function () {
    return {
      wallEffectQueue: []
    }
  },
  computed: {
    ...mapState('manager', ['mapImgs', 'tileEffectQueue']),
    ...mapGetters('manager', ['mapchipSize']),
    tileSize: function () {
      return {'width': this.mapchipSize + 'px', 'height': this.mapchipSize + 'px'}
    },
    tileType: function () {
      return this.mapImgs[this.attr.pos_r][this.attr.pos_c]
    }
  },
  methods: {
    run: function () {
      for (let idx = 0; idx < this.wallEffectQueue.length;) {
        let eff = this.wallEffectQueue[idx]
        console.log(eff.strg)
        if (eff.time > 100 * eff.strg) {
          this.wallEffectQueue.splice(idx, 1)
        } else {
          eff.time++
          idx++
        }
      }
      for (let idx = 0; idx < this.tileEffectQueue.length;) {
        let eff = this.tileEffectQueue[idx]
        if (eff.act === 'clp' &&
          eff.x === this.attr.pos_c &&
          eff.y === this.attr.pos_r &&
          eff.strg / 250 > 0.05) {
          this.wallEffectQueue.push({at: eff.at, time: 0, strg: eff.strg / 250})
          this.tileEffectQueue.splice(idx, 1)
        } else {
          idx++
        }
      }
    },
    wallStyle: function (idx) {
      // let pos = 100 * (this.wallEffectQueue[idx].time / this.wallEffectQueue[idx].dist)
      return {'background': 'radial-gradient(circle at ' + (100 * this.wallEffectQueue[idx].at.x) + '% ' + (100 * this.wallEffectQueue[idx].at.y) + '%, rgba(0, 255, 127, 0) ' + (this.wallEffectQueue[idx].time - 5) + '%, rgba(0, 255, 127, ' + (1 - this.wallEffectQueue[idx].time / (100 * this.wallEffectQueue[idx].strg)) + ') ' + this.wallEffectQueue[idx].time + '%, rgba(0, 255, 127, 0) ' + (this.wallEffectQueue[idx].time + 5) + '%)'}
    }
  }
}
</script>

<style scoped>

.wrapper {
  background-color: black;
  box-sizing: border-box;
}

.wall {
  z-index: 1;
  /* background-color: black; */
  border: solid 3px springgreen;
  position: relative;
  box-sizing: border-box;
  /* background: radial-gradient(rgba(0, 255, 127, 0) 0%, rgba(0, 255, 127, 1) 95%); */
  /* background: -moz-radial-gradient(rgba(0, 255, 127, 0), rgba(0, 255, 127, 0.8));
  background: -webkit-radial-gradient(rgba(0, 255, 127, 0), rgba(0, 255, 127, 0.8)); */
}

.wall-in{
  z-index: 0;
  background-color: red;
  position: absolute;
  width: 100%;
  height: 100%;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}

.air {
  background-color: black;
  box-sizing: border-box;
}

.ban {
  background-color: black;
  border-radius: 50%;
  border: solid 3px crimson;
  box-sizing: border-box;
}

.goal {
    background-color: black;
    border-radius: 30%;
    border: solid 3px yellow;
    box-sizing: border-box;
}
</style>
