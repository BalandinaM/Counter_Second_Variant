const MIN_COUNT_DEFAULT = 0;
const MAX_COUNT_DEFAULT = 5;
const INCREMENT_DEFAULT = 1;


export const ACTIONS = {
    INCREMENT: 'INCREMENT',
    RESET: 'RESET',
    UPDATE_MAX_VALUE: 'UPDATE_MAX_VALUE',
    UPDATE_MIN_VALUE: 'UPDATE_MIN_VALUE',
    SET_ERROR_MAX_VALUE: 'SET_ERROR_MAX_VALUE',
    SET_ERROR_MIN_VALUE: 'SET_ERROR_MIN_VALUE',
    SAVE_SETTINGS: 'SAVE_SETTINGS',
}

export const initialState = {
    count: MIN_COUNT_DEFAULT,
    maxCount: MAX_COUNT_DEFAULT,
    minCount: MIN_COUNT_DEFAULT,
    newMaxCount: MAX_COUNT_DEFAULT,
    newMinCount: MIN_COUNT_DEFAULT,
    errorMinValue: false,
    errorMaxValue: false,
}

export function counterReducer(state, action) {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return {
                ...state,
                 count: state.count < state.maxCount ? state.count + INCREMENT_DEFAULT : state.count
            }
        case ACTIONS.RESET: {
            return {
                ...state,
                count: state.minCount
            }
        }
        case ACTIONS.UPDATE_MAX_VALUE:
            return {
                ...state,
                newMaxCount: action.payload,
                errorMaxValue: action.payload <= state.newMinCount || action.payload < 0
            }
        case ACTIONS.UPDATE_MIN_VALUE: 
            return {
                ...state,
                newMinCount: action.payload,
                errorMinValue: action.payload >= state.newMaxCount || action.payload < 0
            }
        case ACTIONS.SAVE_SETTINGS: 
            if (state.errorMinValue || state.errorMaxValue) {
                return state;
            }
            return {
                ...state,
                count: state.newMinCount,
                maxCount: state.newMaxCount,
                minCount: state.newMinCount
            }
        default: 
            return state;
    }
}