import {GET_MESSAGES, SET_TOKEN, GET_USER, CLEAR_USER, SET_ERROR, CLEAR_ERROR, SET_LOADING} from './types';

const AppReducer = (state, action) => {
    console.log('state: ', state, ', action: ', action);
    
    switch ( action.type ) {
        case GET_MESSAGES: 
            return {...state, messages: action.payload, loading: false };
        case SET_TOKEN:
            return {...state, token: action.payload};
        case GET_USER:
            return {...state, user: action.payload, loading: false};
        case CLEAR_USER:
            return {...state, user: {}};
        case SET_ERROR:
            return {...state, loading: false, error: action.payload};
        case CLEAR_ERROR:
            return {...state, error: null};
        case SET_LOADING:
            return {...state, loading: true};
        default:
            return state;
    }
}

export default AppReducer;