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
      fps: 10
    }
  },
  methods: {
    windowResize: function () {
      this.width = window.innerWidth
      this.height = window.innerHeight
    },
    run: function () {
      this.$refs.flame.run()
    }
  },
  mounted: function () {
    this.width = window.innerWidth
    this.height = window.innerHeight
    GD.deltaTime = 1000 / this.fps
    window.addEventListener('resize', this.windowResize)
    this.intervalID = setInterval(() => {
      this.run()
    }, GD.deltaTime)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.windowResize)
    clearInterval(this.intervalID)
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
