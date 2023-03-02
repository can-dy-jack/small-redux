# small-redux [![Node Test](https://github.com/can-dy-jack/small-redux/actions/workflows/node.js.yml/badge.svg)](https://github.com/can-dy-jack/small-redux/actions/workflows/node.js.yml)
> the basic implementation of redux.

参考文章：[完全理解 redux（从零实现一个 redux）#22](https://github.com/brickspert/blog/issues/22)

## 开发记录
### 简单的状态管理器
```js
export default function createStore(initialState) {
    let state = initialState;
    let listeners = [];
    function subscribe(listener) {
        listeners.push(listener);
    }
    function dispatch(newState) {
        state = newState;
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
```
### 有计划的状态管理器
```js
export default function createStore(initialState, reducer) {
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
```
### 实现 `combineReducers`
```js
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
```

