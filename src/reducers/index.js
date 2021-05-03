import { combineReducers } from 'redux'
import gameReducer from './gameReducer'
import nameReducer from './nameReducer'

export const allReducers = combineReducers({ name: nameReducer , game: gameReducer})