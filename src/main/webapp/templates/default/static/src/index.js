/**
 * Created by m2mbob on 2017/4/14.
 */
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './components/App'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
        </Route>
    </Router>,
    document.getElementById('app')
)
