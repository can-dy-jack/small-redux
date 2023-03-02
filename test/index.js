import { createStore, combineReducers } from '../lib/index.js';
import asserts from 'assert';

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
function todosReducer (state, action) {
    switch (action.type) {
        case 'add':
            return { list: [...state.list, action.payload ] };
        case 'remove':
            return { list: state.list.slice(0, state.list.length -1 ) };
        default:
            return state;
    }
}
const reducer = combineReducers({
    counter: counterReducer,
    todos: todosReducer
});
const { subscribe, dispatch, getState } = createStore(
    { 
        counter: {
            count: 0 
        },
        todos: {
            list: []
        }
    },
    reducer
);
let count = 0, todos = [];
subscribe(() => {
    let val = getState();
    count = val.counter.count;
    todos = val.todos.list;
    console.log(`\x1b[32m${JSON.stringify(val, null, 4)}\x1b[0m`)
})

dispatch({ type: 'IN' });
asserts.equal(count, 1);
asserts.deepEqual(todos, []);
dispatch({ type: 'add', payload: 'change reducer' });
asserts.equal(count, 1);
asserts.deepEqual(todos, ['change reducer']);
