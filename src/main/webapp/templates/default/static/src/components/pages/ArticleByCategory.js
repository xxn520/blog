/**
 * Created by m2mbob on 2017/4/17.
 */
import React, { PureComponent } from 'react'
import ArticleCard from './common/ArticleCard'
import spacing from 'material-ui/styles/spacing'
import MaterialPagination from 'react-ultimate-pagination-material-ui'
import Message from './common/Message'

import Api from '../../helpers/Api'
import Rest from '../../helpers/Rest'

export default class ArticleByCategory extends PureComponent {
    state = {
        currentPage: 0,
        totalPage: 1,
        articles: [],
    }

    componentWillReceiveProps(newProps) {
        if (newProps.params.name !== this.props.params.name) {
            this.fetch(newProps.params.name)
        }
    }

    componentDidMount() {
        const { name } = this.props.params
        this.fetch(name);
    }

    fetch(name, page = this.state.currentPage) {
        Rest.get(Api.articleByCategoryName(name, page))
            .then((data) => {
                this.setState({
                    articles: data.content,
                    currentPage: data.number,
                    totalPage: data.total_pages,
                })
            }).catch((e) => {
                Message.error('loading error');
            })
    }

    onPageChange = (page) => {
        const { name } = this.props.params
        this.fetch(name, page - 1)
    }

    renderArticleList() {
        return this.state.articles.map((article) =>
            <ArticleCard
                key={`article-${article.id}`}
                article={article}
                drawerOpen={true}
            />
        )
    }

    renderPagination() {
        const {
            currentPage,
            totalPage,
        } = this.state
        return (
            <div style={{
                margin: `${spacing.desktopGutter}px 0`,
                textAlign: 'center',
            }}>
                <MaterialPagination
                    currentPage={currentPage + 1}
                    totalPages={totalPage}
                    onChange={this.onPageChange}
                />
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.renderArticleList()}
                {this.renderPagination()}
            </div>
        )
    }
}
