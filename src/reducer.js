import { combineReducers } from 'redux';

const initialState = [];

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET':
            return action.data;
        case 'ADD':
            return ([
                action.data,
                ...state
            ]);
        case 'EDIT':
            return ([
                    {
                        ...state.find(({id}) => id === action.data.id),
                        ...action.data
                    },
                    ...state.filter(({id}) => id !== action.data.id)
            ]);
        case 'DELETE':
            return state.filter(({id}) => id !== action.data);
        default:
            return state;
    }
}

export default combineReducers({
    notes: notesReducer,
})