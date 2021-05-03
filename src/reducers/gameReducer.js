const gameReducer = (state = { gameCode: "", isHost: false }, action) => {
    
    switch (action.type) {
        case 'GAMECODECHANGER':
            console.log("hejsan dag, det är real deal ", action.payload )
            return { ...state, gameCode: action.payload }
        case 'ISHOSTCHANGER':
            return { ...state, isHost: action.payload }
        default:
            return state
    }
}

export default gameReducer