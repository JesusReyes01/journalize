import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import authReducer from './authReducer';
import darkModeReducer from './darkModeReducer';


const rootReducer = combineReducers({
    authReducer: authReducer,
    darkModeReducer: darkModeReducer
})
export default createStore(rootReducer, applyMiddleware(promiseMiddleware));

