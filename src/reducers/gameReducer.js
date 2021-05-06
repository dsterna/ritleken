const gameReducer = (state = { gameCode: '', isHost: true, nrOfPlayers: 2 }, action) => {

    switch (action.type) {
        case 'GAMECODECHANGER':
            return { ...state, gameCode: action.payload }
        case 'ISHOSTCHANGER':
            return { ...state, isHost: action.payload }
        case 'SETNUMBEROFPLAYERS':
            return { ...state, nrOfPlayers: action.payload }
        default:
            return state
    }
}

export default gameReducer