import axios from 'axios'

const initialState = {
    darkMode: false
}

const GET_DARKMODE = 'GET_DARKMODE';
const UPDATE_DARKMODE = 'UPDATE_DARKMODE';
const RESET_DARKMODE = 'RESET_DARKMODE';


export function getDarkMode(){
    let darkMode = axios.get('/api/darkMode')
    return {
        type: GET_DARKMODE,
        payload: darkMode
    }
}

export function updateDarkMode(update){
    let newDarkMode = axios.put('/api/updateDarkmode', {update})
    console.log(newDarkMode)
    return {
        type: UPDATE_DARKMODE,
        payload: newDarkMode
    }
}

export function resetDarkMode(){
    return {
        type: RESET_DARKMODE,
        payload: false
    }
}



export default function darkModeReducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case GET_DARKMODE + '_PENDING':
            return state;
        case GET_DARKMODE + '_FULFILLED':
            return {...state, darkMode: payload}
        case GET_DARKMODE + '_REJECTED':
            return state;
        case UPDATE_DARKMODE + '_PENDING':
            return state;
        case UPDATE_DARKMODE + '_FULFILLED':
            return {...state, darkMode: payload}
        case UPDATE_DARKMODE + '_REJECTED':
            return state;    
        case RESET_DARKMODE:
            return {...state, darkMode: payload}
        default:
            return state;
    }
}
