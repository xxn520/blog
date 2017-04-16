/**
 * Created by m2mbob on 2017/4/15.
 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Master from './components/Master'

import Home from './components/pages/Home'
import Article from './components/pages/Article'

const indexRoutes = (
    <Route path="/" component={Master}>
        <IndexRoute component={Home} />
        <Route path="/articles">
            <Route path=":id" component={Article}>
            </Route>
        </Route>
    </Route>
)

const adminRoutes = (
    <Route path="/" component={Master}>
    </Route>
)

export {
    indexRoutes,
    adminRoutes,
}
