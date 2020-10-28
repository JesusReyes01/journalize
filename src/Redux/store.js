import {createStore, combineReducers, applyMiddleware} from 'redux';
// import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './authReducer';
import menuReducer from './menuReducer';
import { devToolsEnhancer } from 'redux-devtools-extension';

const rootReducer = combineReducers({
    authReducer: authReducer,
    menuReducer: menuReducer
})

export default createStore(rootReducer, devToolsEnhancer());



// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import authReducer from './authReducer'
// import menuReducer from './menuReducer'
// import { devToolsEnhancer } from 'redux-devtools-extension';

// const rootReducer = combineReducers({
//     authReducer: authReducer,
//     // menuReducer: menuReducer

// })

// export default createStore(rootReducer, devToolsEnhancer(applyMiddleware(promiseMiddleware)));