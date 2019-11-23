<template>
    <div
    class="ball"
    v-bind:style="[pos, {'height': size+'%', 'width': size+'%'}]"
    >
    </div>
</template>

<script>
export default {
  name: 'Ball',
  data: function () {
    return {
      size: 2,
      posx: 0,
      posy: 0,
      speed: 0.1
    }
  },
  computed: {
    pos: function () {
      return {top: this.posy - this.size / 2 + '%', left: this.posx - this.size / 2 + '%'}
    }
  },
  methods: {
    run: function () {
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped>

.ball {
    position: absolute;
    border-radius: 50%;
    background-color: red;
}

</style>
