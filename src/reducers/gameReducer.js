const gameReducer = (state = { gameCode: "", isHost: false }, action) => {

    switch (action.type) {
        case 'GAMECODECHANGER':
            return { ...state, gameCode: action.payload }
        case 'ISHOSTCHANGER':
            return { ...state, isHost: action.payload }
        default:
            return state
    }
}

export default gameReducer