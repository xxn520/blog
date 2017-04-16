/**
 * Created by m2mbob on 2017/4/15.
 */
import {
    LOGGED_IN,
    LOGGED_SUCCESS,
    LOGGED_ERROR,
    LOGGED_OUT,
} from '../actions/types';

const initialState = {
    isLoggedIn: false,
    currentUser: {}
};

export default function user(state = initialState, action) {
    switch(action.type){
        case LOGGED_IN:
            return {
                ...state,
                isLoggedIn: true
            };

        case LOGGED_SUCCESS:
            return {
                ...state,
                currentUser: action.user
            };

        case LOGGED_ERROR:
            return initialState;

        case LOGGED_OUT:
            return initialState;

        default:
            return state;
    }
}
