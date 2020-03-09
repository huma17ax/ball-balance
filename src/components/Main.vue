<template>
    <div class="content">
        <flame
        ref='flame'
        v-bind:widthsize="width"
        v-bind:heightsize="height"></flame>
    </div>
</template>

<script>
import flame from './Flame'
import GD from '@/assets/GrobalData'
import { mapState } from 'vuex'

export default {
  name: 'Main',
  components: {
    flame
  },
  data: function () {
    return {
      intervalID: undefined,
      width: undefined,
      height: undefined,
      fps: 120
    }
  },
  computed: {
    ...mapState('manager',['deltaTime'])
  },
  methods: {
    windowResize: function () {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.$store.dispatch('manager/setScreenSize', {width:this.width, height:this.height})
    },
    run: function () {
      this.$refs.flame.run()
    }
  },
  mounted: function () {
    this.$store.dispatch('manager/startUpdateAsync')
    this.width = window.innerWidth
    this.height = window.innerHeight
    GD.deltaTime = 1 / this.fps
    window.addEventListener('resize', this.windowResize)
    this.intervalID = setInterval(() => {
      this.run()
    }, 1000 * GD.deltaTime)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.windowResize)
    clearInterval(this.intervalID)
    this.$store.dispatch('manager/stopUpdateAsync')
  }
}
</script>

<style scoped>
.content {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
</style>
