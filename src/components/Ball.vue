<template>
    <div>
        <div
        class="ball"
        v-bind:style="[posStyle, {'height': ballSize+'px', 'width': ballSize+'px'}]"
        >
        </div>

        <div
        v-for="d in dots"
        v-bind:key="d.id"
        class = "dot"
        v-bind:style = "dotsStyle(d.x,d.y)">
        </div>
        <div class="corn"
        v-bind:style = "dotsStyle(corn.x,corn.y)"></div>
        <div class="vector"
        v-bind:style = "dotsStyle(pos.x+velocity.x/100 , pos.y+velocity.y/100)"></div>
    </div>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Ball',
  data: function () {
    return {
      pos: {/* フレームサイズに対するパーセンテージ */
        x: 0,
        y: 0
      },
      // speed: 100,/*自分の大きさに対するパーセンテージ*/
      velocity: {
        x: 0,
        y: 0
      },
      keyForce: 240,
      friction: 96,
      repulsion: 0.5,
      collisionPoint: 10, // * 4
      pressedKey: {},
      dots: [],
      corn: {x: 0, y: 0}
    }
  },
  computed: {
    ...mapState('manager', ['deltaTime', 'updateFlg', 'screenWidth', 'screenHeight', 'mapchips', 'mapWidth', 'mapHeight', 'startPos', 'controllType', 'gyro', 'isAvailableGyro']),
    ...mapGetters('manager', ['mapchipSize']),
    posStyle: function () {
      return {top: 'calc(' + this.pos.y + '% - ' + this.ballSize / 2 + 'px)', left: 'calc(' + this.pos.x + '% - ' + this.ballSize / 2 + 'px)'}
    },
    ballSize: function () {
      return this.mapchipSize / 2
    }
  },
  watch: {
    startPos: function () {
      this.pos.x = 100 * (this.startPos.x + 0.5) / this.mapWidth
      this.pos.y = 100 * (this.startPos.y + 0.5) / this.mapHeight
    }
  },
  methods: {
    dotsStyle: function (x, y) {
      return {top: 'calc(' + y + '% - ' + 2 + 'px)', left: 'calc(' + x + '% - ' + 2 + 'px)'}
    },
    Rec2Pol: function (x, y) { // 直交→極
      var c = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
      var d = Math.atan(y / x)
      if (x < 0) d += Math.PI
      if (x >= 0 && y < 0) d += Math.PI * 2
      return {c: c, deg: d}
    },
    Pol2Rec: function (c, deg) { // 極→直交
      var x = c * Math.cos(deg)
      var y = c * Math.sin(deg)
      return {x: x, y: y}
    },
    run: function () {
    //   console.log(this.screenWidth + ' / ' + this.screenHeight)
      console.log(this.gyro.gamma)
      // 力をかける
      var force = {x: 0, y: 0}

      if (this.controllType === 'keyboard') {
        if (this.pressedKey['DownArrow']) {
          force.y += this.keyForce
        }
        if (this.pressedKey['UpArrow']) {
          force.y -= this.keyForce
        }
        if (this.pressedKey['LeftArrow']) {
          force.x -= this.keyForce
        }
        if (this.pressedKey['RightArrow']) {
          force.x += this.keyForce
        }
      }

      if (this.controllType === 'gyro' && this.isAvailableGyro === true) {
        force.x += this.keyForce * this.gyro.gamma / 90
        force.y += this.keyForce * this.gyro.beta / 90
      }

      // 摩擦・速度と逆方向
      if (this.velocity.x !== 0 || this.velocity.y !== 0) {
        var diff = Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2))
        force.x -= this.friction * this.velocity.x / diff
        force.y -= this.friction * this.velocity.y / diff
      }

      // console.log(this.velocity.x + " : " + this.velocity.y)

      // 速度の更新
      var tmpX = this.velocity.x + force.x * this.deltaTime
      var tmpY = this.velocity.y + force.y * this.deltaTime
      if ((tmpX * this.velocity.x < 0 && tmpY * this.velocity.y < 0) ||
      (tmpX * this.velocity.x < 0 && tmpY === 0 && this.velocity.y === 0) ||
      (tmpX === 0 && this.velocity.x === 0 && tmpY * this.velocity.y < 0)) {
        // 摩擦で速度が逆転しないようにする
        this.velocity.x = 0
        this.velocity.y = 0
      } else {
        this.velocity.x = tmpX
        this.velocity.y = tmpY
      }

      // console.log("=" + this.velocity.x + "--" + this.velocity.y + "=")

      // console.log(this.velocity.x + " : " + this.velocity.y)
      // console.log(this.pos.x + " / " + this.pos.y)

      // 衝突判定
      var radiusY = 100 / this.mapHeight * this.ballSize / this.mapchipSize / 2
      var radiusX = 100 / this.mapWidth * this.ballSize / this.mapchipSize / 2

      //   console.log(this.pos.x + " / " + this.pos.y)

      // 上下左右
      var upside = {x: this.pos.x, y: this.pos.y - radiusY}
      if (this.mapchips[Math.floor(upside.y / 100 * this.mapHeight)][Math.floor(upside.x / 100 * this.mapWidth)] === 'black') {
        this.pos.y = (Math.floor(upside.y / 100 * this.mapHeight) + 1) * 100 / this.mapHeight + radiusY
        this.velocity.y = -this.velocity.y * this.repulsion
      }
      var downside = {x: this.pos.x, y: this.pos.y + radiusY}
      if (this.mapchips[Math.floor(downside.y / 100 * this.mapHeight)][Math.floor(downside.x / 100 * this.mapWidth)] === 'black') {
        this.pos.y = (Math.floor(downside.y / 100 * this.mapHeight)) * 100 / this.mapHeight - radiusY
        this.velocity.y = -this.velocity.y * this.repulsion
      }
      var leftside = {x: this.pos.x - radiusX, y: this.pos.y}
      if (this.mapchips[Math.floor(leftside.y / 100 * this.mapHeight)][Math.floor(leftside.x / 100 * this.mapWidth)] === 'black') {
        this.pos.x = (Math.floor(leftside.x / 100 * this.mapWidth) + 1) * 100 / this.mapWidth + radiusX
        this.velocity.x = -this.velocity.x * this.repulsion
      }
      var rightside = {x: this.pos.x + radiusX, y: this.pos.y}
      if (this.mapchips[Math.floor(rightside.y / 100 * this.mapHeight)][Math.floor(rightside.x / 100 * this.mapWidth)] === 'black') {
        this.pos.x = (Math.floor(rightside.x / 100 * this.mapWidth)) * 100 / this.mapWidth - radiusX
        this.velocity.x = -this.velocity.x * this.repulsion
      }

      // 弧  右上左下

      // 接触する可能性のある角の座標(%)
      var tend = {
        x: this.pos.x / 100 * this.mapWidth - Math.floor(this.pos.x / 100 * this.mapWidth) - 0.5,
        y: this.pos.y / 100 * this.mapHeight - Math.floor(this.pos.y / 100 * this.mapHeight) - 0.5
      }

      var corner = {
        x: Math.floor(this.pos.x / 100 * this.mapWidth) * 100 / this.mapWidth + (tend.x > 0 ? 100 / this.mapWidth : 0),
        y: Math.floor(this.pos.y / 100 * this.mapHeight) * 100 / this.mapHeight + (tend.y > 0 ? 100 / this.mapHeight : 0)
      }

      // そこが角であるかどうか
      var isCorner = this.mapchips[Math.floor(this.pos.y / 100 * this.mapHeight) + (tend.y < 0 ? -1 : 1)][Math.floor(this.pos.x / 100 * this.mapWidth) + (tend.x < 0 ? -1 : 1)] === 'black'
      isCorner = isCorner && this.mapchips[Math.floor(this.pos.y / 100 * this.mapHeight)][Math.floor(this.pos.x / 100 * this.mapWidth) + (tend.x < 0 ? -1 : 1)] === 'white'
      isCorner = isCorner && this.mapchips[Math.floor(this.pos.y / 100 * this.mapHeight) + (tend.y < 0 ? -1 : 1)][Math.floor(this.pos.x / 100 * this.mapWidth)] === 'white'

      if (isCorner) {
        //   console.log(this.mapchipSize)
        //   console.log(corner.x)
        var cx1 = this.mapchipSize * this.mapWidth * corner.x / 100
        var cy1 = this.mapchipSize * this.mapHeight * corner.y / 100
        var cx2 = this.mapchipSize * this.mapWidth * this.pos.x / 100
        var cy2 = this.mapchipSize * this.mapHeight * this.pos.y / 100

        //   console.log(cx1 + " : " + cx2 + " / " + cy1 + " : " + cy2 + " / " + this.ballSize/2)

        if (Math.sqrt(Math.pow(cx1 - cx2, 2) + Math.pow(cy1 - cy2, 2)) < this.ballSize / 2) {
          // 衝突している

          // 位置の調整
          var polCollision = this.Rec2Pol(this.mapchipSize * this.mapWidth * (this.pos.x - corner.x) / 100, this.mapchipSize * this.mapHeight * (this.pos.y - corner.y) / 100)
          var rec = this.Pol2Rec(this.ballSize / 2, polCollision.deg)
          this.pos.x = corner.x + (rec.x / this.mapchipSize / this.mapWidth) * 100
          this.pos.y = corner.y + (rec.y / this.mapchipSize / this.mapHeight) * 100

          // 反発
          if (this.velocity.x !== 0 && this.velocity.y !== 0) {
            var polVel = this.Rec2Pol(this.velocity.x, this.velocity.y)
            rec = this.Pol2Rec(polVel.c, polVel.deg - polCollision.deg)
            polVel = this.Rec2Pol(-rec.x * this.repulsion, rec.y)
            rec = this.Pol2Rec(polVel.c, polVel.deg + polCollision.deg)
            this.velocity.x = rec.x
            this.velocity.y = rec.y
          }
        }
      }

      // 移動
      this.pos.x += this.velocity.x / 2 / this.mapWidth * this.deltaTime
      this.pos.y += this.velocity.y / 2 / this.mapHeight * this.deltaTime
    },
    KeyDown: function (e) {
      if (e.keyCode === 40) this.pressedKey['DownArrow'] = true
      if (e.keyCode === 38) this.pressedKey['UpArrow'] = true
      if (e.keyCode === 39) this.pressedKey['RightArrow'] = true
      if (e.keyCode === 37) this.pressedKey['LeftArrow'] = true
    },
    KeyUp: function (e) {
      if (e.keyCode === 40) this.pressedKey['DownArrow'] = false
      if (e.keyCode === 38) this.pressedKey['UpArrow'] = false
      if (e.keyCode === 39) this.pressedKey['RightArrow'] = false
      if (e.keyCode === 37) this.pressedKey['LeftArrow'] = false
    }
  },
  mounted: function () {
    // this.pos.x = 100 * (this.startPos.x+0.5) / this.mapWidth
    // this.pos.y = 100 * (this.startPos.y+0.5) / this.mapHeight
    window.addEventListener('keydown', this.KeyDown)
    window.addEventListener('keyup', this.KeyUp)
  }
}
</script>

<style scoped>

.ball {
    position: absolute;
    border-radius: 50%;
    background-color: red;
}

.dot {
  position: absolute;
  background-color: aqua;
  height: 4px;
  width:4px;
}

.corn {
  position: absolute;
  background-color: pink;
  height: 4px;
  width:4px;
}

.vector{
  position: absolute;
  background-color: green;
  height: 4px;
  width: 4px;
}

</style>
