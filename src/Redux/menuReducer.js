// import axios from 'axios'

const initialState = {
    menu: false
}

const MENU_TOGGLE = 'MENU_TOGGLE';


export function menuToggle(){
    return {
        type: MENU_TOGGLE,
        payload: !initialState.menu
    }
}

export default function menuReducer(state = initialState, action){
    const {type, payload} = action;

    switch(type){
        case MENU_TOGGLE:
            return {...state, menu: payload}
        default:
            return state;
    }
}
