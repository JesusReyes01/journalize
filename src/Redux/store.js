import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './authReducer';
import darkModeReducer from './darkModeReducer';
// import { devToolsEnhancer } from 'redux-devtools-extension';
// import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers({
    authReducer: authReducer,
    darkModeReducer: darkModeReducer
})
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));
// export default createStore(rootReducer, devToolsEnhancer());



// import {createStore, combineReducers, applyMiddleware} from 'redux';
// import authReducer from './authReducer'
// import menuReducer from './menuReducer'
// import { devToolsEnhancer } from 'redux-devtools-extension';

// const rootReducer = combineReducers({
//     authReducer: authReducer,
//     // menuReducer: menuReducer

// })
// export default createStore(rootReducer , composeWithDevTools(applyMiddleware(combineReducers(promiseMiddleware))))
// export default createStore(rootReducer, devToolsEnhancer(applyMiddleware(promiseMiddleware)));