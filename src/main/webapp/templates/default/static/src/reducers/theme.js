/**
 * Created by m2mbob on 2017/4/16.
 */
import {
    CHANGE_THEME
} from '../actions/types'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

const initialState = {
    muiTheme: getMuiTheme(lightBaseTheme),
};

export default function theme(state = initialState, action) {
    switch(action.type){
        case CHANGE_THEME:
            return {
                ...state,
                theme: action.muiTheme,
            };
        default:
            return state;
    }
}
