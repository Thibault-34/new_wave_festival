import { combineReducers } from 'redux'
import { FETCH_SUCCESS } from '../actions'

// store mirrored data from wemap api to reflect state of the app
export const data = (state = [], action) => {
    switch (action.type) {
        case FETCH_SUCCESS:
            return action.data

        default:
            return state
    }
}

export default combineReducers({
    data,
})
