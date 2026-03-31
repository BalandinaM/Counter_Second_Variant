import {configureStore} from '@reduxjs/toolkit'
import { counterReducer, initialState } from '../model/counter-reducer';
import { loadState, saveCount, saveState } from '../localStorage';
import throttle from 'lodash/throttle';

const persistedState = loadState();
// создание store
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  preloadedState: persistedState 
    ? { 
        counter: {
          ...initialState,  // сначала все значения по умолчанию
          ...persistedState // затем перезаписываем загруженными
        }
      }
    : undefined
})
 
  store.subscribe(throttle(() => {
    const {count, maxCount, minCount} = store.getState().counter
    saveState(minCount, maxCount, count)
  }, 1000))


// автоматическое определение типа всего объекта состояния
export type RootState = ReturnType<typeof store.getState>
// автоматическое определение типа метода dispatch
export type AppDispatch = typeof store.dispatch
 
// // для возможности обращения к store в консоли браузера
// // @ts-expect-error
// window.store = store