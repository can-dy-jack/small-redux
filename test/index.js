import createStore from '../lib/index.js';

const { subscribe, dispatch, getState } = createStore({ count: 0 });

subscribe(() => {
    console.log(`\x1b[32m${getState().count}\x1b[0m`)
})

dispatch({ count: 4 });
dispatch({ count: 6 });
dispatch({ count: 8 });
