/**
 * Created by m2mbob on 2017/4/14.
 */
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as reducers from './reducers'
import { indexRoutes } from './AppRoutes'

// 服务端拿到的初始状态
const preloadedState = window.__INITIAL_STATE__

const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
})

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q">
        <LogMonitor theme="tomorrow" preserveScrollTop={false} />
    </DockMonitor>
)

const store = createStore(
    reducer,
    preloadedState,
    DevTools.instrument()
)

const history = syncHistoryWithStore(browserHistory, store)

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router
                history={history}
                onUpdate={() => window.scrollTo(0, 0)}
            >
                {indexRoutes}
            </Router>
            <DevTools />
        </div>
    </Provider>,
    document.getElementById('app')
)
