import {configureStore, combineReducers} from "@reduxjs/toolkit"
import submitvechilesReducer from "./reducers/submitvechilesReducer"
import { persistReducer, persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key:"root",
    version:1,
    storage
}

const reducer = combineReducers({
    submitvechilesReducer:submitvechilesReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store=configureStore({
    reducer:persistedReducer
})