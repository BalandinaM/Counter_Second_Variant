import type { RootState } from '@/app/store';
import type { CounterType } from "./counter-reducer";


export const selectCounter = (state: RootState): CounterType => state.counter