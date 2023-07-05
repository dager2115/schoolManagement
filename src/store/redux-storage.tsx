// file: store.ts
import { configureStore } from '@reduxjs/toolkit'

// We'll use redux-logger just as an example of adding another middleware
import logger from 'redux-logger'


const reducer = {
}

const preloadedState = {
    todos: [
        {
            text: 'Eat food',
            completed: true,
        },
        {
            text: 'Exercise',
            completed: false,
        },
    ],
    visibilityFilter: 'SHOW_COMPLETED',
}


const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
})

export default store