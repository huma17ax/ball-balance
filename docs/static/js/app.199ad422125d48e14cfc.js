webpackJsonp([1],{ESrn:function(t,i){},GgwT:function(t,i){},JrGn:function(t,i){},NHnr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("7+uW"),h={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},[i("router-view")],1)},staticRenderFns:[]};var a=e("VU/8")({name:"App"},h,!1,function(t){e("JrGn")},null,null).exports,o=e("/ocq"),n=e("Dd8w"),r=e.n(n),c=e("NYxO"),p={name:"Ball",data:function(){return{pos:{x:0,y:0},velocity:{x:0,y:0},keyForce:240,friction:96,repulsion:.5,collisionPoint:10,pressedKey:{},dots:[],corn:{x:0,y:0}}},computed:r()({},Object(c.c)("manager",["deltaTime","updateFlg","screenWidth","screenHeight","mapchips","mapWidth","mapHeight","startPos","controllType","gyro"]),Object(c.b)("manager",["mapchipSize"]),{posStyle:function(){return{top:"calc("+this.pos.y+"% - "+this.ballSize/2+"px)",left:"calc("+this.pos.x+"% - "+this.ballSize/2+"px)"}},ballSize:function(){return this.mapchipSize/2}}),watch:{startPos:function(){this.pos.x=100*(this.startPos.x+.5)/this.mapWidth,this.pos.y=100*(this.startPos.y+.5)/this.mapHeight}},methods:{dotsStyle:function(t,i){return{top:"calc("+i+"% - 2px)",left:"calc("+t+"% - 2px)"}},Rec2Pol:function(t,i){var e=Math.sqrt(Math.pow(t,2)+Math.pow(i,2)),s=Math.atan(i/t);return t<0&&(s+=Math.PI),t>=0&&i<0&&(s+=2*Math.PI),{c:e,deg:s}},Pol2Rec:function(t,i){return{x:t*Math.cos(i),y:t*Math.sin(i)}},run:function(){var t={x:0,y:0};if("keyboard"===this.controllType&&(this.pressedKey.DownArrow&&(t.y+=this.keyForce),this.pressedKey.UpArrow&&(t.y-=this.keyForce),this.pressedKey.LeftArrow&&(t.x-=this.keyForce),this.pressedKey.RightArrow&&(t.x+=this.keyForce)),"gyro"===this.controllType&&(t.x+=this.keyForce*this.gyro.gamma/90,t.y+=this.keyForce*this.gyro.beta/90),0!==this.velocity.x||0!==this.velocity.y){var i=Math.sqrt(Math.pow(this.velocity.x,2)+Math.pow(this.velocity.y,2));t.x-=this.friction*this.velocity.x/i,t.y-=this.friction*this.velocity.y/i}var e=this.velocity.x+t.x*this.deltaTime,s=this.velocity.y+t.y*this.deltaTime;e*this.velocity.x<0&&s*this.velocity.y<0||e*this.velocity.x<0&&0===s&&0===this.velocity.y||0===e&&0===this.velocity.x&&s*this.velocity.y<0?(this.velocity.x=0,this.velocity.y=0):(this.velocity.x=e,this.velocity.y=s);var h=100/this.mapHeight*this.ballSize/this.mapchipSize/2,a=100/this.mapWidth*this.ballSize/this.mapchipSize/2,o=this.pos.x,n=this.pos.y-h;"black"===this.mapchips[Math.floor(n/100*this.mapHeight)][Math.floor(o/100*this.mapWidth)]&&(this.pos.y=100*(Math.floor(n/100*this.mapHeight)+1)/this.mapHeight+h,this.velocity.y=-this.velocity.y*this.repulsion);var r=this.pos.x,c=this.pos.y+h;"black"===this.mapchips[Math.floor(c/100*this.mapHeight)][Math.floor(r/100*this.mapWidth)]&&(this.pos.y=100*Math.floor(c/100*this.mapHeight)/this.mapHeight-h,this.velocity.y=-this.velocity.y*this.repulsion);var p=this.pos.x-a,l=this.pos.y;"black"===this.mapchips[Math.floor(l/100*this.mapHeight)][Math.floor(p/100*this.mapWidth)]&&(this.pos.x=100*(Math.floor(p/100*this.mapWidth)+1)/this.mapWidth+a,this.velocity.x=-this.velocity.x*this.repulsion);var m=this.pos.x+a,d=this.pos.y;"black"===this.mapchips[Math.floor(d/100*this.mapHeight)][Math.floor(m/100*this.mapWidth)]&&(this.pos.x=100*Math.floor(m/100*this.mapWidth)/this.mapWidth-a,this.velocity.x=-this.velocity.x*this.repulsion);var y=this.pos.x/100*this.mapWidth-Math.floor(this.pos.x/100*this.mapWidth)-.5,v=this.pos.y/100*this.mapHeight-Math.floor(this.pos.y/100*this.mapHeight)-.5,u=100*Math.floor(this.pos.x/100*this.mapWidth)/this.mapWidth+(y>0?100/this.mapWidth:0),f=100*Math.floor(this.pos.y/100*this.mapHeight)/this.mapHeight+(v>0?100/this.mapHeight:0),g="black"===this.mapchips[Math.floor(this.pos.y/100*this.mapHeight)+(v<0?-1:1)][Math.floor(this.pos.x/100*this.mapWidth)+(y<0?-1:1)];if(g=(g=g&&"white"===this.mapchips[Math.floor(this.pos.y/100*this.mapHeight)][Math.floor(this.pos.x/100*this.mapWidth)+(y<0?-1:1)])&&"white"===this.mapchips[Math.floor(this.pos.y/100*this.mapHeight)+(v<0?-1:1)][Math.floor(this.pos.x/100*this.mapWidth)]){var w=this.mapchipSize*this.mapWidth*u/100,b=this.mapchipSize*this.mapHeight*f/100,x=this.mapchipSize*this.mapWidth*this.pos.x/100,S=this.mapchipSize*this.mapHeight*this.pos.y/100;if(Math.sqrt(Math.pow(w-x,2)+Math.pow(b-S,2))<this.ballSize/2){var k=this.Rec2Pol(this.mapchipSize*this.mapWidth*(this.pos.x-u)/100,this.mapchipSize*this.mapHeight*(this.pos.y-f)/100),M=this.Pol2Rec(this.ballSize/2,k.deg);if(this.pos.x=u+M.x/this.mapchipSize/this.mapWidth*100,this.pos.y=f+M.y/this.mapchipSize/this.mapHeight*100,0!==this.velocity.x&&0!==this.velocity.y){var H=this.Rec2Pol(this.velocity.x,this.velocity.y);M=this.Pol2Rec(H.c,H.deg-k.deg),H=this.Rec2Pol(-M.x*this.repulsion,M.y),M=this.Pol2Rec(H.c,H.deg+k.deg),this.velocity.x=M.x,this.velocity.y=M.y}}}this.pos.x+=this.velocity.x/2/this.mapWidth*this.deltaTime,this.pos.y+=this.velocity.y/2/this.mapHeight*this.deltaTime},KeyDown:function(t){40===t.keyCode&&(this.pressedKey.DownArrow=!0),38===t.keyCode&&(this.pressedKey.UpArrow=!0),39===t.keyCode&&(this.pressedKey.RightArrow=!0),37===t.keyCode&&(this.pressedKey.LeftArrow=!0)},KeyUp:function(t){40===t.keyCode&&(this.pressedKey.DownArrow=!1),38===t.keyCode&&(this.pressedKey.UpArrow=!1),39===t.keyCode&&(this.pressedKey.RightArrow=!1),37===t.keyCode&&(this.pressedKey.LeftArrow=!1)}},mounted:function(){window.addEventListener("keydown",this.KeyDown),window.addEventListener("keyup",this.KeyUp)}},l={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"ball",style:[t.posStyle,{height:t.ballSize+"px",width:t.ballSize+"px"}]}),t._v(" "),t._l(t.dots,function(i){return e("div",{key:i.id,staticClass:"dot",style:t.dotsStyle(i.x,i.y)})}),t._v(" "),e("div",{staticClass:"corn",style:t.dotsStyle(t.corn.x,t.corn.y)}),t._v(" "),e("div",{staticClass:"vector",style:t.dotsStyle(t.pos.x+t.velocity.x/100,t.pos.y+t.velocity.y/100)})],2)},staticRenderFns:[]};var m={name:"flame",components:{ball:e("VU/8")(p,l,!1,function(t){e("ESrn")},"data-v-7f8b67eb",null).exports},data:function(){return{}},methods:{run:function(){this.$refs.ball.run()},mapchipStyle:function(t,i){var e=this.mapchips[t][i];return{width:this.mapchipSize+"px",height:this.mapchipSize+"px","background-color":e}}},computed:r()({},Object(c.c)("manager",["screenWidth","screenHeight","mapchips","mapWidth","mapHeight"]),Object(c.b)("manager",["mapchipSize"]),{flameStyle:function(){return{width:this.mapchipSize*this.mapHeight+"px",height:this.mapchipSize*this.mapWidth+"px"}},marginStyle:function(){var t=(this.screenHeight-this.mapchipSize*this.mapWidth)/2,i=(this.screenWidth-this.mapchipSize*this.mapHeight)/2;return{"margin-top":t+"px","margin-bottom":t+"px","margin-left":i+"px","margin-right":i+"px"}}})},d={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"flame",style:[t.flameStyle,t.marginStyle]},[t._l(t.mapchips,function(i,s){return e("div",{key:i.id,staticClass:"maprow"},t._l(i,function(i,h){return e("div",{key:i.id,staticClass:"mapchip",style:t.mapchipStyle(s,h)})}),0)}),t._v(" "),e("ball",{ref:"ball"})],2)},staticRenderFns:[]};var y={name:"Main",components:{flame:e("VU/8")(m,d,!1,function(t){e("OeLq")},"data-v-5677ad2e",null).exports},data:function(){return{permission:!1}},computed:r()({},Object(c.c)("manager",["deltaTime","updateFlg"])),methods:{windowResize:function(){this.$store.dispatch("manager/setScreenSize",{width:window.innerWidth,height:window.innerHeight})},getDeviceGyro:function(t){this.$store.dispatch("manager/setDeviceGyro",{alpha:t.alpha,beta:t.beta,gamma:t.gamma})},run:function(){this.$refs.flame.run()},requestDeviceSensor:function(){var t=this;DeviceOrientationEvent.requestPermission().then(function(i){"granted"===i&&(window.addEventListener("deviceorientation",t.getDeviceGyro),t.permission=!0)})}},watch:{updateFlg:function(){this.run()}},mounted:function(){var t=this;this.$store.dispatch("manager/setScreenSize",{width:window.innerWidth,height:window.innerHeight}),this.$store.dispatch("manager/loadMapChips").then(function(){t.$store.dispatch("manager/startUpdateAsync")}),window.addEventListener("resize",this.windowResize)},beforeDestroy:function(){window.removeEventListener("resize",this.windowResize),window.removeEventListener("deviceorientation",this.getDeviceGyro),this.$store.dispatch("manager/stopUpdateAsync")}},v={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"content"},[0==this.permission?i("div",{staticStyle:{"z-index":"1",position:"absolute",width:"100%",height:"100%","background-color":"#000"},attrs:{onclick:"requestDeviceSensor()"}}):this._e(),this._v(" "),1==this.permission?i("flame",{ref:"flame"}):this._e()],1)},staticRenderFns:[]};var u=e("VU/8")(y,v,!1,function(t){e("GgwT")},"data-v-06702bbf",null).exports;s.a.use(o.a);var f=new o.a({routes:[{path:"/",name:"Main",component:u}]}),g={namespaced:!0,state:{fps:60,deltaTime:0,intervalID:void 0,updateFlg:!0,screenWidth:void 0,screenHeight:void 0,mapchips:[],mapWidth:void 0,mapHeight:void 0,startPos:{x:0,y:0},gyroAvailable:!1,gyro:{alpha:0,beta:0,gamma:0},controllType:"gyro"},actions:{initState:function(t){t.commit,t.state},setDeviceGyro:function(t,i){var e=t.commit,s=(t.state,i.alpha),h=i.beta,a=i.gamma;console.log("getDeviceGyro"),e("setDeviceGyro",{alpha:s,beta:h,gamma:a})},startUpdateAsync:function(t){var i=t.commit,e=t.state;i("setDeltaTime",1/e.fps);var s=setInterval(function(){i("inversionUpdateFlg")},1e3/e.fps);i("setIntervalID",s)},stopUpdateAsync:function(t){t.commit;var i=t.state;clearInterval(i.intervalID)},setScreenSize:function(t,i){var e=t.commit,s=(t.state,i.width),h=i.height;e("setScreenWidth",s),e("setScreenHeight",h)},loadMapChips:function(t){var i=t.commit;t.state;i("setMapChips",[["black","black","black","black","black","black","black"],["black","white","white","white","white","white","black"],["black","white","black","white","black","white","black"],["black","white","white","white","white","white","black"],["black","white","black","white","black","white","black"],["black","white","white","white","white","white","black"],["black","black","black","black","black","black","black"]]),i("setStartPos",{x:1,y:1})}},getters:{mapchipSize:function(t){return Math.min(t.screenWidth/t.mapWidth,t.screenHeight/t.mapHeight)}},mutations:{inversionUpdateFlg:function(t){t.updateFlg=!t.updateFlg},setDeltaTime:function(t,i){t.deltaTime=i},setIntervalID:function(t,i){t.intervalID=i},setScreenHeight:function(t,i){t.screenHeight=i},setScreenWidth:function(t,i){t.screenWidth=i},setMapChips:function(t,i){t.mapchips=i,t.mapWidth=i[0].length,t.mapHeight=i.length},setStartPos:function(t,i){t.startPos=i},setDeviceGyro:function(t,i){t.gyro.alpha=i.alpha,t.gyro.beta=i.beta,t.gyro.gamma=i.gamma}}};s.a.use(c.a);var w=new c.a.Store({modules:{manager:g}});s.a.config.productionTip=!1,new s.a({el:"#app",router:f,store:w,components:{App:a},template:"<App/>"})},OeLq:function(t,i){}},["NHnr"]);
//# sourceMappingURL=app.199ad422125d48e14cfc.js.map