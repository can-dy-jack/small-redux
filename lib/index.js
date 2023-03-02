export function createStore(initialState, reducer) {
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
}