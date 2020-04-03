<template>

    <div class="content">
        {{ this.gyro.alpha }}
        \
        {{ this.gyro.beta }}
        \
        {{ this.gyro.gamma }}
        <flame ref='flame'></flame>
    </div>

</template>

<script>
import flame from './Flame'
import { mapState } from 'vuex'

export default {
  name: 'Main',
  components: {
    flame
  },
  data: function () {
    return {
      permission: false
    }
  },
  computed: {
    ...mapState('manager', ['deltaTime', 'updateFlg', 'gyro'])
  },
  methods: {
    windowResize: function () {
      this.$store.dispatch('manager/setScreenSize', {width: window.innerWidth, height: window.innerHeight})
    },
    getDeviceGyro: function (dat) {
      this.$store.dispatch('manager/setDeviceGyro', {alpha: dat.alpha, beta: dat.beta, gamma: dat.gamma})
    },
    run: function () {
      this.$refs.flame.run()
    }
  },
  watch: {
    updateFlg: function () {
      this.run()
    }
  },
  mounted: function () {
    this.$store.dispatch('manager/setScreenSize', {width: window.innerWidth, height: window.innerHeight})
    this.$store.dispatch('manager/loadMapChips')
      .then(() => {
        this.$store.dispatch('manager/startUpdateAsync')
      })
    window.addEventListener('resize', this.windowResize)
    window.addEventListener('deviceorientation', this.getDeviceGyro)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.windowResize)
    window.removeEventListener('deviceorientation', this.getDeviceGyro)
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
