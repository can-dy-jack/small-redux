import { createStore, applyMiddleware } from '../lib/index.js';
import asserts from 'assert';

let counter = {
    count: 0 
};
function counterReducer (state, action) {
    switch (action.type) {
        case 'IN':
            return { count: state.count + 1 };
        case 'DE':
            return { count: state.count - 1 };
        default:
            return state;
    }
}
const loggerMiddleware = store => next => action => {
    console.log('this state', store.getState());
    console.log('action', action);
    next(action);
    console.log('next state', store.getState());
}
const exceptionMiddleware = store => next => action => {
    try {
        next(action);
    } catch (err) {
        console.error('错误报告: ', err)
    }
}
const rewriteCreateStoreFunc = applyMiddleware(exceptionMiddleware, loggerMiddleware);
const newCreateStore = rewriteCreateStoreFunc(createStore);
const store = newCreateStore(counter, counterReducer);

// test
let count = 0;
store.subscribe(() => {
    let val = store.getState();
    count = val.count;
    console.log(`\x1b[32m${JSON.stringify(val, null, 4)}\x1b[0m`)
})
store.dispatch({ type: 'IN' });
asserts.equal(count, 1);
