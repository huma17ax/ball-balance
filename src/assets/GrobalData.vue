<template>
</template>

<script>
/* システム関係などどこからでも参照したり変更したいデータ */
/* あんまりよくない，vuexとか使うべき */

export default {
  name: 'grobalData',
  data: {/* 共有したいので関数にしない */
    width: undefined,
    height: undefined,
    daltaTime: undefined
  }
}
</script>

<style scoped>
</style>
