<template> 
    <div> 
        <div 
        class="ball" 
        v-bind:style="[posStyle, {'height': size+'px', 'width': size+'px'}]" 
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

import GD from '@/assets/GrobalData' 

export default { 
  name: 'Ball', 
  props: ['chipsize', 'startpos', 'mapchips'], 
  data: function () { 
    return { 
      pos: {/*フレームサイズに対するパーセンテージ*/ 
        x: 0, 
        y: 0 
      }, 
      //speed: 100,/*自分の大きさに対するパーセンテージ*/ 
      velocity: { 
        x: 0, 
        y: 0 
      }, 
      keyForce: 2, 
      friction: 0.8, 
      repulsion: 0.5, 
      collisionPoint: 10,// * 4 
      pressedKey:{}, 
      dots: [], 
      corn:{x:0,y:0} 
    } 
  }, 
  computed: { 
    posStyle: function () { 
      return {top: 'calc(' + this.pos.y + '% - ' + this.size / 2 + 'px)', left: 'calc(' + this.pos.x + '% - ' + this.size / 2 + 'px)'} 
    }, 
    size: function () { 
      return this.chipsize /2 
    } 
  }, 
  methods: { 
    dotsStyle: function (x,y) { 
      return {top: 'calc(' + y + '% - ' + 2 + 'px)', left: 'calc(' + x + '% - ' + 2 + 'px)'} 
    }, 

    run: function () { 
      //力をかける 
      var force = {x:0, y:0} 
      if (this.pressedKey["DownArrow"]){ 
        force.y += this.keyForce 
      } 
      if (this.pressedKey["UpArrow"]) { 
        force.y -= this.keyForce 
      } 
      if (this.pressedKey["LeftArrow"]) { 
        force.x -= this.keyForce 
      } 
      if (this.pressedKey["RightArrow"]){ 
        force.x += this.keyForce 
      } 
      //摩擦・速度と逆方向 
      if (this.velocity.x!=0 || this.velocity.y!=0) { 
        var diff = Math.sqrt(Math.pow(this.velocity.x,2) + Math.pow(this.velocity.y,2)) 
        force.x -= this.friction * this.velocity.x / diff 
        force.y -= this.friction * this.velocity.y / diff 
      } 

      // console.log(this.velocity.x + " : " + this.velocity.y) 

      //速度の更新 
      var tmpX = this.velocity.x + force.x 
      var tmpY = this.velocity.y + force.y 
      if ((tmpX*this.velocity.x < 0 && tmpY*this.velocity.y < 0) 
      || (tmpX*this.velocity.x < 0 && tmpY==0 && this.velocity.y==0) 
      || (tmpX==0 && this.velocity.x==0 && tmpY*this.velocity.y < 0)) { 
        //摩擦で速度が逆転しないようにする 
        this.velocity.x = 0 
        this.velocity.y = 0 
      } else { 
        this.velocity.x = tmpX 
        this.velocity.y = tmpY 
      } 

      //console.log("=" + this.velocity.x + "--" + this.velocity.y + "=") 

      // console.log(this.velocity.x + " : " + this.velocity.y) 
      // console.log(this.pos.x + " / " + this.pos.y) 

      //移動 
      this.pos.x += this.velocity.x/2/this.mapchips[0].length*GD.deltaTime 
      this.pos.y += this.velocity.y/2/this.mapchips.length*GD.deltaTime 
 
      //衝突判定 
      var radiusY = 100/this.mapchips.length*this.size/this.chipsize/2 
      var radiusX = 100/this.mapchips[0].length*this.size/this.chipsize/2 

      // console.log(this.pos.x + " / " + this.pos.y) 

      //上下左右 
      var upside = {x: this.pos.x, y: this.pos.y - radiusY} 
      if (this.mapchips[Math.floor(upside.y/100*this.mapchips.length)][Math.floor(upside.x/100*this.mapchips[0].length)]=='B'){ 
        this.pos.y = (Math.floor(upside.y/100*this.mapchips.length) + 1) *100/this.mapchips.length + radiusY 
        this.velocity.y = -this.velocity.y * this.repulsion 
      } 
      var downside = {x: this.pos.x, y: this.pos.y + radiusY} 
      if (this.mapchips[Math.floor(downside.y/100*this.mapchips.length)][Math.floor(downside.x/100*this.mapchips[0].length)]=='B'){ 
        this.pos.y = (Math.floor(downside.y/100*this.mapchips.length)) *100/this.mapchips.length - radiusY 
        this.velocity.y = -this.velocity.y * this.repulsion 
      } 
      var leftside = {x: this.pos.x - radiusX, y:this.pos.y} 
      if (this.mapchips[Math.floor(leftside.y/100*this.mapchips.length)][Math.floor(leftside.x/100*this.mapchips[0].length)]=='B'){ 
        this.pos.x = (Math.floor(leftside.x/100*this.mapchips[0].length) + 1) *100/this.mapchips[0].length + radiusX 
        this.velocity.x = -this.velocity.x * this.repulsion 
      } 
      var rightside = {x: this.pos.x + radiusX, y:this.pos.y} 
      if (this.mapchips[Math.floor(rightside.y/100*this.mapchips.length)][Math.floor(rightside.x/100*this.mapchips[0].length)]=='B'){ 
        this.pos.x = (Math.floor(rightside.x/100*this.mapchips[0].length)) *100/this.mapchips[0].length - radiusX 
        this.velocity.x = -this.velocity.x * this.repulsion 
      } 

      //弧  右上左下 
      for (var i=0;i<4;i++){ 
        for (var j=0;j<this.collisionPoint;j++){ 

          var angle = i*Math.PI/2 + (j+1)*(Math.PI/2/(this.collisionPoint+1)); 

          //console.log(i + " : " + j + " / " + angle) 

          var point = {x:this.pos.x + radiusX*Math.cos(angle), y:this.pos.y + radiusY*Math.sin(angle)} 

          this.dots[i*this.collisionPoint + j] = point 
          // console.log("!!! " + angle + " / " + radiusX*Math.cos(angle) + ":" + radiusY*Math.sin(angle)) 

          if (this.mapchips[Math.floor(point.y/100*this.mapchips.length)][Math.floor(point.x/100*this.mapchips[0].length)]=='B'){ 

            console.log("radius == colision ~~ " + angle) 
            // console.log(Math.cos(0) + " $ " + Math.sin(0)) 
            // console.log(Math.cos(Math.PI/2) + " $ " + Math.sin(Math.PI/2)) 
            // console.log(Math.cos(Math.PI) + " $ " + Math.sin(Math.PI)) 
            // console.log(Math.cos(Math.PI/2*3) + " $ " + Math.sin(Math.PI/2*3)) 

            //角の位置を算出 
            var corner = {x:Math.floor(point.x/100*this.mapchips[0].length)*100/this.mapchips[0].length, y:Math.floor(point.y/100*this.mapchips.length)*100/this.mapchips.length} 
            if (i==1 || i==2) corner.x += 100/this.mapchips[0].length 
            if (i==2 || i==3) corner.y += 100/this.mapchips.length 

            this.corn = corner 

            //位置を調整(検出しない程度に外側に) 
            var theta_corner = Math.atan((this.pos.y-corner.y)/(this.pos.x-corner.x)) 
            // if (i==1 || i==2) theta_corner = -theta_corner 
            if (i==0 || i==3) this.pos.x = corner.x - radiusX * Math.cos(theta_corner) 
            else this.pos.x = corner.x + radiusX * Math.cos(theta_corner) 

            if (i==0 || i==3) this.pos.y = corner.y - radiusY * Math.sin(theta_corner) 
            else this.pos.y = corner.y + radiusY * Math.sin(theta_corner) 

            console.log("i=" + i + " j=" + j) 
            console.log(corner.x + " / " + corner.y + " : ") 

            //角度差
            var theta_vel = Math.atan(this.velocity.y/this.velocity.x) 
            var theta = theta_corner - theta_vel 
            // if (theta < 0) theta+= Math.PI*2 
 
            console.log(corner + " - " + theta_vel + " - " + theta_corner) 
            console.log("! " + theta) 

            //速度の基底変換 
            var toCorner = Math.sqrt(Math.pow(this.velocity.x,2)+Math.pow(this.velocity.y,2)) * Math.cos(theta) 
            var orthogonal = Math.sqrt(Math.pow(this.velocity.x,2)+Math.pow(this.velocity.y,2)) * Math.sin(theta) 

            //角方向の速度を反転してxy基底に戻す 
            var toCorner = -toCorner * this.repulsion 
            var theta_dash = Math.atan(orthogonal / toCorner) 

            var new_theta = theta_dash + theta_corner - Math.PI 

            this.velocity.x = Math.sqrt(Math.pow(toCorner,2)+Math.pow(orthogonal,2)) * Math.cos(new_theta) * (i==0 || i==3 ? -1 : 1) 
            this.velocity.y = Math.sqrt(Math.pow(toCorner,2)+Math.pow(orthogonal,2)) * Math.sin(new_theta) * (i==0 || i==3 ? -1 : 1) 

            console.log(orthogonal + " - " + toCorner + " - " + new_theta) 
 
            //this.pos.x = (Math.floor(point.x/100*this.mapchips[0].length)) *100/this.mapchips[0].length - radiusX 
            //this.velocity.x = -this.velocity.x * this.repulsion 
          } 
        } 
      } 
 
    }, 
    KeyDown: function (e) { 
      if (e.keyCode==40) this.pressedKey["DownArrow"] = true 
      if (e.keyCode==38) this.pressedKey["UpArrow"] = true 
      if (e.keyCode==39) this.pressedKey["RightArrow"] = true 
      if (e.keyCode==37) this.pressedKey["LeftArrow"] = true 
    }, 
    KeyUp: function (e) { 
      if (e.keyCode==40) this.pressedKey["DownArrow"] = false 
      if (e.keyCode==38) this.pressedKey["UpArrow"] = false 
      if (e.keyCode==39) this.pressedKey["RightArrow"] = false 
      if (e.keyCode==37) this.pressedKey["LeftArrow"] = false 
    } 
  }, 
  mounted: function () { 
    this.pos.x = 100 * (this.startpos.x+0.5) / this.mapchips[0].length 
    this.pos.y = 100 * (this.startpos.y+0.5) / this.mapchips.length 
    window.addEventListener('keydown',this.KeyDown); 
    window.addEventListener('keyup',this.KeyUp); 
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
