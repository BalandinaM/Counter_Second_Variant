import type { RootState } from '../app/store';
import type { CounterType } from "./counter-reducer";


export const selectCount = (state: RootState): CounterType['count'] => state.counter.count
export const selectMinCount = (state: RootState): CounterType['minCount'] => state.counter.minCount
export const selectMaxCount = (state: RootState): CounterType['maxCount'] => state.counter.maxCount
export const selectErrorMinCount = (state: RootState): CounterType['errorMinValue'] => state.counter.errorMinValue
export const selectErrorMaxCount = (state: RootState): CounterType['errorMaxValue'] => state.counter.errorMaxValue
