
const state = {
    fps: 60,
    deltaTime: 0,
    intervalID: undefined,
    updateFlg: true,
    screenWidth: undefined,
    screenHeight: undefined,
    mapchips: [],
    mapWidth: undefined,
    mapHeight: undefined
}

const actions = {
    startUpdateAsync({ commit, state }) {
        var id = setInterval(() => {
            commit('inversionUpdateFlg')
        }, 1000 * state.deltaTime)
        commit('setIntervalID', id)
        commit('setDeltaTime', 1 / state.fps)
    },
    stopUpdateAsync({ commit,state }) {
        clearInterval(state.intervalID)
    },
    setScreenSize({ commit, state }, { width, height }) {
        commit('setScreenWidth', width)
        commit('setScreenHeight', height)
    },
    loadMapChips({ commit, state }) {
        //jsonファイルから読み込みたい
        var chips = [ 
            ['black','black','black','black','black','black','black'], 
            ['black','white','white','white','white','white','black'], 
            ['black','white','black','white','black','white','black'], 
            ['black','white','white','white','white','white','black'], 
            ['black','white','black','white','black','white','black'], 
            ['black','white','white','white','white','white','black'], 
            ['black','black','black','black','black','black','black'] 
        ]
        commit('setMapChips', {chips:chips, width:chips[0].length, height: chips.length})
    }
}

const mutations = {
    inversionUpdateFlg(state) {
        state.updateFlg = !state.updateFlg
    },
    setDeltaTime(state, time) {
        state.deltaTime = time
    },
    setIntervalID(state, id) {
        state.intervalID = id
    },
    setScreenHeight(state, height) {
        state.screenHeight = height
    },
    setScreenWidth(state, width) {
        state.screenWidth = width
    },
    setMapChips(state, { chips, width, height }) {
        state.mapchips = chips
        state.mapWidth = width
        state.mapHeight = height
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}
