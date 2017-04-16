/**
 * Created by m2mbob on 2017/4/16.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

export default class ArticleCard extends PureComponent {
    static propTypes = {
        article: PropTypes.object.isRequired,
    }

    render() {
        const {
            title,
            created_by: {
                username,
                avatar,
                nickname,
            },
        } = this.props.article;
        return (
            <Card>
                <CardHeader
                    title={title}
                    subtitle={nickname || username}
                    avatar={avatar}
                />
                <CardMedia
                    overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
                >
                    <img src="images/nature-600-337.jpg" />
                </CardMedia>
                <CardTitle title="Card title" subtitle="Card subtitle" />
                <CardText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </CardText>
                <CardActions>
                    <FlatButton label="Action1" />
                    <FlatButton label="Action2" />
                </CardActions>
            </Card>
        )
    }
}
