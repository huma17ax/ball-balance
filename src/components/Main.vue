<template>

    <div class="content">
        <div v-if='permission==false'
        style="z-index: 1; position: absolute; width: 100%; height: 100%;
        background-color: #000;"
        onclick='requestDeviceSensor()'>
        </div>
        <flame ref='flame' v-if='permission==true'></flame>
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
    ...mapState('manager', ['deltaTime', 'updateFlg'])
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
    },
    requestDeviceSensor: function () {
      DeviceOrientationEvent.requestPermission()
        .then(
          (response) => {
            if (response === 'granted') {
              window.addEventListener('deviceorientation', this.getDeviceGyro)
              this.permission = true
            }
          }
        )
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
