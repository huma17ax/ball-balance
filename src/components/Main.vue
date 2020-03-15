<template>
    <div class="content">
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
    }
  },
  computed: {
    ...mapState('manager',['deltaTime', 'updateFlg'])
  },
  methods: {
    windowResize: function () {
      this.$store.dispatch('manager/setScreenSize', {width:window.innerWidth, height:window.innerHeight})
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
    this.$store.dispatch('manager/setScreenSize', {width:window.innerWidth, height:window.innerHeight})
    this.$store.dispatch('manager/loadMapChips')
    .then(()=>{
        this.$store.dispatch('manager/startUpdateAsync')
    })
    window.addEventListener('resize', this.windowResize)
  },
  beforeDestroy: function () {
    window.removeEventListener('resize', this.windowResize)
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
