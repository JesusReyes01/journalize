import {createStore} from 'redux'
import authReducer from './Authreducer'
import { devToolsEnhancer } from 'redux-devtools-extension';

export default createStore(authReducer, devToolsEnhancer());