/**
 * Created by m2mbob on 2017/4/16.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth'
import spacing from 'material-ui/styles/spacing'
import transitions from 'material-ui/styles/transitions'
import {grey200, pink100} from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import { DateFormat } from '../../../helpers/DateUtils'

const noop = () => {}

class ArticleCard extends PureComponent {

    static propTypes = {
        article: PropTypes.object.isRequired,
        width: PropTypes.number.isRequired,
        children: PropTypes.element,
        drawerOpen: PropTypes.bool,
    };

    static defaultProps = {
        drawerOpen: false,
    }

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
                margin: `${desktopGutter}px auto`,
            },
            chip: {
                margin: 4,
            },
            wrapper: {
                display: 'flex',
                flexWrap: 'wrap',
            },
        };

        if (!this.props.drawerOpen) {
            styles.root.maxWidth = '80%'
        }

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
            tags,
        } = this.props.article
        const { children } = this.props
        const formatDate = DateFormat(new Date(created_date), 'yyyy年MM月dd日')
        let tagArr = []
        if (tags.length && tags.length > 0) {
            tagArr = tags.split(' ')
        }

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
                    >
                    </CardHeader>
                    <CardMedia
                        overlay={
                            <CardTitle title={title} subtitle={formatDate}>
                                <div style={styles.wrapper}>
                                    {tagArr.map((tag) =>
                                        <Chip
                                            key={`tag-${tag}`}
                                            style={styles.chip}
                                            backgroundColor={pink100}
                                            onTouchTap={noop}
                                        >
                                            {tag}
                                        </Chip>
                                    )}
                                </div>
                            </CardTitle>
                        }
                    >
                        <img src={cover} />
                    </CardMedia>
                    <CardText>
                        { children || summary }
                    </CardText>
                    { typeof children === 'undefined' ? <CardActions>
                        <RaisedButton
                            label="READ MORE"
                            style={{margin: 12}}
                            onTouchTap={() => this.goToDetail(id)}
                        />
                    </CardActions> : null }
                </Card>
            </Paper>
        );
    }
}

export default withWidth()(ArticleCard)

