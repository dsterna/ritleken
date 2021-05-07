
const rand = Math.floor(1000 + Math.random() * 9000)
const nameReducer = (state = { code: rand, userName: `spelare-${rand}` }, action) => {
    switch (action.type) {
        case 'NAMECHANGER':
            return { ...state, userName: action.payload }
        case 'NAMECODECHANGER':
            let newRand = Math.floor(1000 + Math.random() * 9000)
            return { ...state, code: newRand }
        default:
            return state
    }
}

export default nameReducer