
const state = {
  fps: 60,
  deltaTime: 0,
  intervalID: undefined,
  updateFlg: true,
  screenWidth: undefined,
  screenHeight: undefined,
  mapchips: [],
  mapWidth: undefined,
  mapHeight: undefined,
  startPos: {x: 0, y: 0},
  gyroAvailable: false,
  gyro: {alpha: 0, beta: 0, gamma: 0},
  controllType: 'gyro'
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
    var chips = [
      ['black', 'black', 'black', 'black', 'black', 'black', 'black'],
      ['black', 'white', 'white', 'white', 'white', 'white', 'black'],
      ['black', 'white', 'black', 'white', 'black', 'white', 'black'],
      ['black', 'white', 'white', 'white', 'white', 'white', 'black'],
      ['black', 'white', 'black', 'white', 'black', 'white', 'black'],
      ['black', 'white', 'white', 'white', 'white', 'white', 'black'],
      ['black', 'black', 'black', 'black', 'black', 'black', 'black']
    ]
    commit('setMapChips', chips)
    commit('setStartPos', {x: 1, y: 1})
  },
  setControllType ({commit, state}, type) {
    commit('setControllType', type)
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
  setStartPos (state, pos) {
    state.startPos = pos
  },
  setDeviceGyro (state, gyro) {
    state.gyro.alpha = (gyro.alpha == null ? 0 : gyro.alpha)
    state.gyro.beta = (gyro.beta == null ? 0 : gyro.beta)
    state.gyro.gamma = (gyro.gamma == null ? 0 : gyro.gamma)
  },
  setControllType (state, type) {
    state.controllType = type
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
