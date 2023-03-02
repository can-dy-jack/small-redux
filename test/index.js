import createStore from '../lib/index.js';
import asserts from 'assert';

function reducer (state, action) {
    switch (action.type) {
        case 'IN':
            return { count: state.count + 1 };
        case 'DE':
            return { count: state.count - 1 };
        default:
            return state;
    }
}
const { subscribe, dispatch, getState } = createStore(
    { count: 0 },
    reducer
);
let count = 0;
subscribe(() => {
    count = getState().count;
    console.log(`\x1b[32m${getState().count}\x1b[0m`)
})

dispatch({ type: 'IN' });
asserts.equal(count, 1);
dispatch({ type: 'DE' });
asserts.equal(count, 0);
dispatch({ count: 8 });
asserts.equal(count, 0);
