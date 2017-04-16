/**
 * Created by m2mbob on 2017/4/16.
 */
import {
    CHANGE_THEME
} from './types'
import getMuiTheme from 'material-ui/styles/getMuiTheme';

export function changeTheme(theme) {
    return {
        type: CHANGE_THEME,
        muiTheme: getMuiTheme(theme),
    }
}
