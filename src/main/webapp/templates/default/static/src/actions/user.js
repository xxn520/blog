/**
 * Created by m2mbob on 2017/4/15.
 */
import {
    LOGGED_IN,
    LOGGED_SUCCESS,
    LOGGED_ERROR,
    LOGGED_OUT,
} from './types'
import Base64 from '../helpers/Base64'
import Api from '../helpers/Api'
import Rest from '../helpers/Rest';

async function setAuthdata(dispatch, authdata, user) {
    await localStorage.setItem('authdata', authdata);
    dispatch({'type': LOGGED_SUCCESS, user: user});
}

async function removeAuthdata(dispatch){
    await localStorage.removeItem('authdata');
    Rest.authdata='';
    return dispatch({
        type: LOGGED_OUT
    });
}

export function logIn(username, password){
    return (dispatch) => {
        dispatch({'type': LOGGED_IN});
        const authdata = Base64.encode(`${username}:${password}`);
        Rest.authdata=authdata;
        Rest.get(Api.login).then((user)=>{
            setAuthdata(dispatch, authdata, user);
        }).catch((e)=>{
            Rest.authdata='';
            dispatch({'type': LOGGED_ERROR, error: e});
        });
    }
}

export function logOut() {
    return (dispatch) => {
        return removeAuthdata(dispatch);
    };
}
