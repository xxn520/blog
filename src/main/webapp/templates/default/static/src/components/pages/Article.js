/**
 * Created by m2mbob on 2017/4/16.
 */
import React, { PureComponent } from 'react'
import Title from 'react-title-component'

import MarkdownElement from './common/MarkdownElement'
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
                console.log(e)
            })
    }

    render() {
        const {
            content,
            title,
        } = this.state.article
        return(
            <div>
                <Title render={(previousTitle) => `${title} - ${previousTitle}`} />
                <MarkdownElement text={content} />
            </div>
        )
    }
}
