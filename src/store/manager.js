
const state = {
    fps: 120,
    intervalID: undefined,
    updateFlg: true,
    width: undefined,
    height: undefined
}

const actions = {
    startUpdateAsync({ commit,state }) {
        var id = setInterval(() => {
            commit('inversionUpdateFlg')
        }, 1000 / state.fps)
        commit('setIntervalID', id)
    },
    stopUpdateAsync({ commit,state }) {
        clearInterval(state.intervalID)
    }
}

const mutations = {
    inversionUpdateFlg({ state }) {
        state.updateFlg = !state.updateFlg
    },
    setIntervalID({ state }, id) {
        state.intervalID = id
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations
}