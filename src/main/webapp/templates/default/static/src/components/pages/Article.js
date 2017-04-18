/**
 * Created by m2mbob on 2017/4/16.
 */
import React, { PureComponent } from 'react'
import Title from 'react-title-component'

import MarkdownElement from './common/MarkdownElement'
import ArticleCard from './common/ArticleCard'
import Bgm from './common/Bgm'
import Message from './common/Message'
import Api from '../../helpers/Api'
import Rest from '../../helpers/Rest'

export default class Article extends PureComponent {
    state = {
        article: {
            content: ''
        }
    }

    componentDidMount() {
        const { id } = this.props.params
        Rest.get(Api.articleById(id))
            .then((article) => {
                this.setState({article})
            })
            .catch((e) => {
                Message.error('loading error');
            })
    }

    render() {
        const {
            content,
            title,
            bgm,
        } = this.state.article
        const { article } = this.state
        return(
            <div>
                <Title render={(previousTitle) => `${title} - ${previousTitle}`} />
                { article.id ? <ArticleCard
                    article={article}
                    drawerOpen={true}
                >
                    <div>
                        { bgm ? <Bgm bgm={bgm} /> : null }
                        <MarkdownElement text={content} />
                    </div>
                </ArticleCard> : null}
            </div>
        )
    }
}
