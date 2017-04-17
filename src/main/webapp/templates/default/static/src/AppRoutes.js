/**
 * Created by m2mbob on 2017/4/15.
 */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Master from './components/Master'

import Home from './components/pages/Home'
import Article from './components/pages/Article'
import ArticleByCategory from './components/pages/ArticleByCategory'
import Archives from './components/pages/Archives'

export default (
    <Route path="/" component={Master}>
        <IndexRoute component={Home} />
        <Route path="/articles">
            <Route path=":id" component={Article}>
            </Route>
        </Route>
        <Route path="/category">
            <Route path=":name" component={ArticleByCategory}>
            </Route>
        </Route>
        <Route path="/archives" components={Archives}>
        </Route>
    </Route>
)
