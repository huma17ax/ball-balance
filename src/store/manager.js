
import mapDataPool from '@/assets/mapData.json'

const state = {
  // システム
  fps: 60,
  deltaTime: 0,
  intervalID: undefined,
  updateFlg: true,
  screenWidth: undefined,
  screenHeight: undefined,
  // ゲーム
  mapDataPool: mapDataPool,
  mapchips: [],
  mapImgs: [],
  mapWidth: undefined,
  mapHeight: undefined,
  startPos: {x: 0, y: 0},
  gameOver: false,
  gameClear: false,
  // 操作
  gyroAvailable: false,
  gyro: {alpha: 0, beta: 0, gamma: 0},
  controllType: 'gyro',
  isAvailableGyro: true,
  // タイルエフェクト
  tileEffectQueue: []
}

const getters = {
  mapchipSize (state) {
    return Math.min(state.screenWidth / state.mapWidth, state.screenHeight / state.mapHeight)
  }
}

const actions = {
  initState ({commit, state}) {

  },
  setDeviceGyro ({commit, state}, {alpha, beta, gamma}) {
    console.log('getDeviceGyro')
    commit('setDeviceGyro', {alpha: alpha, beta: beta, gamma: gamma})
  },
  startUpdateAsync ({ commit, state }) {
    commit('setDeltaTime', 1 / state.fps)
    var id = setInterval(() => {
      commit('inversionUpdateFlg')
    }, 1000 / state.fps)
    commit('setIntervalID', id)
  },
  stopUpdateAsync ({ commit, state }) {
    clearInterval(state.intervalID)
  },
  setScreenSize ({ commit, state }, { width, height }) {
    commit('setScreenWidth', width)
    commit('setScreenHeight', height)
  },
  loadMapChips ({ commit, state }) {
    // jsonファイルから読み込みたい
    let id = Math.floor(Math.random() * state.mapDataPool.length)
    var chips = state.mapDataPool[id]['chips']
    var images = state.mapDataPool[id]['images']
    var start = state.mapDataPool[id]['start']
    commit('setMapChips', chips)
    commit('setMapImages', images)
    commit('setStartPos', start)
  },
  setControllType ({commit, state}, type) {
    commit('setControllType', type)
  },
  setGameOver ({commit}, status) {
    commit('setGameOver', status)
  },
  setGameClear ({commit}, status) {
    commit('setGameClear', status)
  }
}

const mutations = {
  inversionUpdateFlg (state) {
    state.updateFlg = !state.updateFlg
  },
  setDeltaTime (state, time) {
    state.deltaTime = time
  },
  setIntervalID (state, id) {
    state.intervalID = id
  },
  setScreenHeight (state, height) {
    state.screenHeight = height
  },
  setScreenWidth (state, width) {
    state.screenWidth = width
  },
  setMapChips (state, chips) {
    state.mapchips = chips
    state.mapWidth = chips[0].length
    state.mapHeight = chips.length
  },
  setMapImages (state, images) {
    state.mapImgs = images
  },
  setStartPos (state, pos) {
    state.startPos = pos
  },
  setDeviceGyro (state, gyro) {
    state.gyro.alpha = (gyro.alpha == null ? 0 : gyro.alpha)
    state.gyro.beta = (gyro.beta == null ? 0 : gyro.beta)
    state.gyro.gamma = (gyro.gamma == null ? 0 : gyro.gamma)
    if (Math.abs(gyro.beta) < 90) {
      state.isAvailableGyro = true
    } else {
      state.isAvailableGyro = false
    }
  },
  setControllType (state, type) {
    state.controllType = type
  },
  setGameOver (state, status) {
    state.gameOver = status
  },
  setGameClear (state, status) {
    state.gameClear = status
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
