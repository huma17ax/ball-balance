<template>
  <div class="content">
        <div
        style="z-index: 1; position: absolute; width: 100%; height: 100%;
        background-color: #000;"
        v-on:click='requestDeviceSensor()'>
        </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  methods: {
    requestDeviceSensor: function () {
      if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
        console.log('!')
        DeviceOrientationEvent.requestPermission()
          .then(
            (response) => {
              if (response === 'granted') {
                this.$store.dispatch('manager/setControllType', 'gyro')
                this.$router.push('/game')
              }
            }
          )
      } else {
        this.$store.dispatch('manager/setControllType', 'keyboard')
        this.$router.push('/game')
      }
    }
  }
}
</script>

<style scoped>

</style>
