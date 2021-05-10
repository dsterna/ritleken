export const increment = () => {
    return {
        type: 'INCREMENT'
    }
}
export const decrement = () => {
    return {
        type: 'DECREMENT'
    }
}
export const isHost = (bool) => {
    return {
        type: 'ISHOSTCHANGER',
        payload: bool
    }
}
export const changeGameCode = (str) => {
    return {
        type: 'GAMECODECHANGER',
        payload: str
    }
}
export const changeName = (str) => {
    return {
        type: 'NAMECHANGER',
        payload: str
    }
}
export const changeCodeName = () => {
    return {
        type: 'NAMECODECHANGER'
    }
}
export const setNrOfPlayers = (int) => {
    return {
        type: 'SETNUMBEROFPLAYERS',
        payload: int
    }
}