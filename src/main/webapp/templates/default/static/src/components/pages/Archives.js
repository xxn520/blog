/**
 * Created by m2mbob on 2017/4/17.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {List, ListItem} from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Avatar from 'material-ui/Avatar'
import Chip from 'material-ui/Chip'
import {pink100} from 'material-ui/styles/colors'
import Message from './common/Message'

import Api from '../../helpers/Api'
import Rest from '../../helpers/Rest'
import { DateFormat } from '../../helpers/DateUtils'

const noop = () => {}

export default class Archives extends PureComponent {
    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    state = {
        archives: {},
    }

    componentDidMount() {
        Rest.get(Api.archives)
            .then((archives) => {
                this.setState({archives});
            })
            .catch((e) => {
                Message.error('loading error');
            })
    }

    goToDetail(id) {
        this.context.router.push(`/articles/${id}`)
    }

    renderList(year, archive) {
        return (
            <List
                key={`year-${year}`}
            >
                <Subheader>{`${year}年`}</Subheader>
                {archive.map((article) => {
                    const { tags } = article
                    let tagArr = []
                    if (tags.length && tags.length > 0) {
                        tagArr = tags.split(' ')
                    }
                    return (
                        <ListItem
                            key={`article-${article.id}`}
                            primaryText={article.title}
                            secondaryText={DateFormat(new Date(article.created_date), 'yyyy年MM月dd日')}
                            leftAvatar={<Avatar src={article.created_by.avatar}/>}
                            rightAvatar={
                                <div style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                }}>
                                    {tagArr.map((tag) =>
                                        <Chip
                                            key={`tag-${tag}`}
                                            style={{margin: 4}}
                                            backgroundColor={pink100}
                                            onTouchTap={noop}
                                        >
                                            {tag}
                                        </Chip>
                                    )}
                                </div>
                            }
                            onTouchTap={() => this.goToDetail(article.id)}
                        >
                        </ListItem>
                    )
                })}
            </List>
        )
    }
    render() {
        const { archives } = this.state
        return (
            <div>
                {Object.keys(archives).map((key) => {
                    return this.renderList(key, archives[key])
                })}
            </div>
        )
    }
}
