/**
 * Created by m2mbob on 2017/4/16.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth'
import spacing from 'material-ui/styles/spacing'
import transitions from 'material-ui/styles/transitions'
import {grey200} from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import { DateFormat } from '../../../helpers/DateUtils'

class ArticleCard extends PureComponent {

    static propTypes = {
        article: PropTypes.object.isRequired,
        width: PropTypes.number.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    state = {
        zDepth: 0,
    };

    getStyles() {
        const desktopGutter = spacing.desktopGutter;
        const styles = {
            root: {
                transition: transitions.easeOut(),
                maxWidth: '80%',
                margin: `${desktopGutter}px auto`,
            },
        };

        return styles;
    }

    handleMouseEnter = () => {
        this.setState({
            zDepth: 4,
        });
    };

    handleMouseLeave = () => {
        this.setState({
            zDepth: 0,
        });
    };

    goToDetail(id) {
        this.context.router.push(`/articles/${id}`)
    }

    render() {
        const styles = this.getStyles();
        const {
            id,
            created_by: {
                username,
                avatar,
                nickname,
                email,
            },
            created_date,
            title,
            cover,
            summary,
        } = this.props.article
        const formatDate = DateFormat(new Date(created_date), 'yyyy年MM月dd日')

        return (
            <Paper
                zDepth={this.state.zDepth}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={styles.root}
            >
                <Card>
                    <CardHeader
                        title={nickname || username}
                        subtitle={email || ''}
                        avatar={avatar}
                    />
                    <CardMedia
                        overlay={<CardTitle title={title} subtitle={formatDate}/>}
                    >
                        <img src={cover} />
                    </CardMedia>
                    <CardText>
                        { summary }
                    </CardText>
                    <CardActions>
                        <RaisedButton
                            primary={true}
                            label="READ MORE"
                            style={{margin: 12}}
                            onTouchTap={() => this.goToDetail(id)}
                        />
                    </CardActions>
                </Card>
            </Paper>
        );
    }
}

export default withWidth()(ArticleCard)

