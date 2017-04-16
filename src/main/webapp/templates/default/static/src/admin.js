/**
 * Created by m2mbob on 2017/4/14.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import { adminRoutes } from './AppRoutes'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <Router
        history={browserHistory}
        onUpdate={() => window.scrollTo(0, 0)}
    >
        {adminRoutes}
    </Router>,
    document.getElementById('app')
)
