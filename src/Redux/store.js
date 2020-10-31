import {createStore, combineReducers} from 'redux';
// import promiseMiddleware from 'redux-promise-middleware';
// import { composeWithDevTools } from 'redux-devtools-extension'
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
// export default createStore(rootReducer , composeWithDevTools(applyMiddleware(combineReducers(promiseMiddleware))))
// export default createStore(rootReducer, devToolsEnhancer(applyMiddleware(promiseMiddleware)));