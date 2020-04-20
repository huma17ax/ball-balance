<template>
  <div class="content">
        <!-- <button class="gyro-check"
        v-on:click='requestDeviceSensor()'>
        ジャイロチェック
        </button> -->
        <button class="start"
        v-on:click='controllSetting()'>{{this.message}}</button>
        <div class="note">
          <table class="txt">
            <tr><th>ジャイロ操作を行う場合</th></tr>
            <tr><td>・iOS13+/safari</td><td>STARTボタンを押し，センサーへのアクセスを許可してください</td></tr>
            <tr><td>・iOS12-/safari</td><td>「設定アプリ」などからセンサーへのアクセスを許可してください</td></tr>
            <tr><td>・その他のOS/ブラウザ</td><td>STARTボタンを押すと自動で設定されます</td></tr>
          </table>
        </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  data: function () {
    return {
      message: 'Controll Setting',
      doGyro: false
    }
  },
  methods: {
    controllSetting: function () {
      this.message = 'Checking Gyro Sensor ...'
      if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS13以上(リクエスト)
        this.message = 'センサーへのアクセスを承認してください'
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === 'granted') {
              // 承諾
              this.message = 'Gyro操作で開始します ...'
              this.$store.dispatch('manager/setControllType', 'gyro')
              this.gameStart()
            } else {
              // 拒否
              alert(response)
              this.message = 'アクセスが拒否されました'
            }
          })
          .catch((e) => {
            // リクエストエラー
            alert(e)
            this.message = 'アクセスが拒否されました'
          })
      } else {
        // iOS12以下 or Android or モバイル端末ではない
        this.sensorVerification()
          .then(() => {
            // ジャイロ動く(Android or iOS12以下許可あり)
            this.message = 'Gyro操作で開始します ...'
            this.$store.dispatch('manager/setControllType', 'gyro')
            this.gameStart()
          })
          .catch(() => {
            // ジャイロ動かない(モバイル端末ではない or iOS12以下許可なし)
            this.message = 'Keyboard操作で開始します...'
            this.$store.dispatch('manager/setControllType', 'keyboard')
            this.gameStart()
          })
      }
      // this.sensorVerification()
      //   .then(() => {
      //     // ジャイロ動く
      //     this.message = 'Gyro操作で開始します ...'
      //     this.$store.dispatch('manager/setControllType', 'gyro')
      //     this.gameStart()
      //   })
      //   .catch(() => {
      //     // ジャイロ動かない
      //     if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission === 'function') {
      //       // iOS13以上(リクエスト)
      //       this.message = 'センサーへのアクセスを承認してください'
      //       console.log('!')
      //       DeviceOrientationEvent.requestPermission()
      //         .then((response) => {
      //           if (response === 'granted') {
      //             // 承諾
      //             this.message = 'Gyro操作で開始します ...'
      //             this.$store.dispatch('manager/setControllType', 'gyro')
      //             this.gameStart()
      //           } else {
      //             alert(response)
      //             this.message = 'アクセスが拒否されました'
      //           }
      //         })
      //         .catch((e) => {
      //           alert(e)
      //           this.message = 'アクセスが拒否されました'
      //         })
      //       // this.requestDeviceSensor()
      //       //   .then(() => {
      //       //     // 承諾
      //       //     this.message = 'Gyro操作で開始します ...'
      //       //     this.$store.dispatch('manager/setControllType', 'gyro')
      //       //     this.gameStart()
      //       //   })
      //       //   .catch(() => {
      //       //     // 拒否
      //       //     this.message = 'アクセスが拒否されました'
      //       //   })
      //     } else {
      //       // モバイル端末ではない or iOS12以下で許可なし
      //       this.message = 'Keyboard操作で開始します...'
      //       this.$store.dispatch('manager/setControllType', 'keyboard')
      //       this.gameStart()
      //     }
      //   })
    },
    sensorVerification: function () {
      window.addEventListener('deviceorientation', this.checkSensor, false)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.doGyro === true) {
            resolve()
          } else {
            window.removeEventListener('deviceorientation', this.checkSensor, false)
            reject(new Error('gyro doesnot work'))
          }
        }, 1000)
      })
    },
    checkSensor: function (dat) {
      console.log('verify gyro')
      console.log(dat)
      if (dat.alpha !== 0 && dat.alpha !== null &&
      dat.beta !== 0 && dat.beta !== null &&
      dat.gamma !== 0 && dat.gamma !== null) {
        this.doGyro = true
        window.removeEventListener('deviceorientation', this.checkSensor)
      }
    },
    requestDeviceSensor: function () {
      return new Promise((resolve, reject) => {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === 'granted') {
              resolve()
            } else {
              reject(new Error('sensor request is rejected'))
            }
          })
          .catch((e) => {
            alert(e)
            reject(new Error('request error'))
          })
      })
    },
    gameStart: function () {
      this.$store.dispatch('manager/loadMapChips')
      setTimeout(() => {
        this.$router.push('/game')
      }, 1000)
    }
  }
}
</script>

<style scoped>

.content {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
}

.note {
  position: absolute;
  font-size: 80%;
  width: 100vw;
  margin-top: 81vw;
  margin-left: auto;
  margin-left: auto;
  text-align: center;
}

.txt {
  display: inline-block;
  text-align: left;
  margin-left: auto;
  margin-left: auto;
  color: springgreen;
}

.start {
  position: absolute;
  transform: translate(-50%, 0);
  -webkit-transform: translate(-50%, 0);
  -ms-transform: translate(-50%, 0);
  width: 81vw;
  max-width: 600px;
  height: 27vw;
  max-height: 200px;
  margin-top: 15vw;
  margin-left: auto;
  margin-right: auto;
  background-color: black;
  border: ridge 3px springgreen;
  color: springgreen;
  font-size: 200%;
}

</style>
