import { createAction, createReducer } from "@reduxjs/toolkit";

const MIN_COUNT_DEFAULT = 0;
const MAX_COUNT_DEFAULT = 5;
const INCREMENT_DEFAULT = 1;

export type CounterType = {
    count: number,
    maxCount: number,
    minCount: number,
    errorMinValue: boolean,
    errorMaxValue: boolean,
}

export const initialState = {
    count: MIN_COUNT_DEFAULT,
    maxCount: MAX_COUNT_DEFAULT,
    minCount: MIN_COUNT_DEFAULT,
    errorMinValue: false,
    errorMaxValue: false,
}

//можно разделить логику для редюсеров типа счетчик (инкремент и сброс) и настройки значений. Но ошибки у них общие

export const incrementCountAC = createAction('counter/increment')
export const resetCountAC = createAction('counter/resetCount')
export const saveNewSettingsAC = createAction<{newMinCount: CounterType['minCount'], newMaxCount: CounterType['maxCount']}>('settings/saveNewSettings')
export const setErrorMinValueAC = createAction<boolean>('settings/setErrorMinValue')
export const setErrorMaxValueAC = createAction<boolean>('settings/setErrorMaxValue')

export const counterReducer = createReducer(initialState, builder => {
    builder
        .addCase(incrementCountAC, (state) => {
            state.count = state.count + INCREMENT_DEFAULT
        })
        .addCase(resetCountAC, (state) => {
            state.count = state.minCount
        })
        .addCase(saveNewSettingsAC, (state, action) => {
            state.count = action.payload.newMinCount
            state.minCount = action.payload.newMinCount
            state.maxCount = action.payload.newMaxCount
        })
        .addCase(setErrorMinValueAC, (state, action) => {
            state.errorMinValue = action.payload
        })
        .addCase(setErrorMaxValueAC, (state, action) => {
            state.errorMinValue = action.payload
        })
})
