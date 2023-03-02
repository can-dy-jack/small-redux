export function createStore(initialState, reducer, rewriteCreateStore) {
    if (rewriteCreateStore) {
        let newCreateStore = rewriteCreateStore(createStore);
        return newCreateStore(initialState, reducer);
    }
    let state = initialState;
    let listeners = [];
    function subscribe(listener) {
        listeners.push(listener);
    }
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(listener => listener());
    }
    function getState() {
        return state;
    }

    return {
        subscribe,
        dispatch,
        getState
    }
}
export function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers);
    return function combinationReducer(state = {}, action) {
        const nextState = {};
        for (let key of reducerKeys) {
            const reducer = reducers[key];
            const pre = state[key];
            const next = reducer(pre, action);
            nextState[key] = next;
        }
        return nextState;
    }
};
// const Middleware = store => next => action => {}
// const newCreateStore  = applyMiddleware(Middleware1, Middleware2, Middleware3)(createStore)
export function applyMiddleware(...middlewares) {
    return function rewriteCreateStore(oldCreateStore) {
        return function newCreateStore(initialState, reducer) {
            const store = oldCreateStore(initialState, reducer);
            const chain = middlewares.map(middleware => middleware(store));
            let next = store.dispatch;
            chain.reverse().forEach(middlewareWithStore => {
                next = middlewareWithStore(next);
            })
            store.dispatch = next;
            return store;
        }
    }
}
