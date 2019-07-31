import { combineReducers } from 'redux';

const context = require.context('./', false, /\.js$/);

const reducerModules={};

context.keys().filter(item => item !== './index.js').forEach(key => {
  reducerModules[key.slice(2,-3)]=context(key).default}
)

const rootReducer = combineReducers(reducerModules)

export default rootReducer;
