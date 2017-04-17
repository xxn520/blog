/**
 * Created by m2mbob on 2017/4/16.
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FullWidthSection from '../FullWidthSection';
import RaisedButton from 'material-ui/RaisedButton';
import withWidth, {LARGE} from 'material-ui/utils/withWidth';
import spacing from 'material-ui/styles/spacing';
import typography from 'material-ui/styles/typography';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import {cyan500, grey200, darkWhite} from 'material-ui/styles/colors';
import ArticleCard from './common/ArticleCard';

import { connect } from 'react-redux'

@connect(
    store => ({
        articles: store.article,
    })
)
class HomePage extends PureComponent {
    static propTypes = {
        width: PropTypes.number.isRequired,
    };

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    renderBanner() {
        const styles = {
            root: {
                backgroundRepeat: 'no-repeat',
                backgroundImage: "url(//qhyxpicoss.kujiale.com/2016/11/16/LAWBXMQKAEBKMXEQAAAAABY8_1920x800.jpg)",
                backgroundSize: 'cover',
                opacity: 1,
            },
            pngLogo: {
                marginLeft: window.innerWidth * 0.5 - 92,
                height: 157,
            },
            tagline: {
                margin: '16px auto 0 auto',
                textAlign: 'center',
                maxWidth: 575,
            },
            label: {
                color: lightBaseTheme.palette.primary1Color,
            },
            githubStyle: {
                margin: '16px 32px 0px 8px',
            },
            demoStyle: {
                margin: '16px 32px 0px 32px',
            },
            h1: {
                color: darkWhite,
                fontWeight: typography.fontWeightLight,
                lineHeight: 1,
            },
            h2: {
                fontSize: 20,
                lineHeight: '28px',
                paddingTop: 19,
                marginBottom: 13,
                letterSpacing: 0,
            },
            nowrap: {
                whiteSpace: 'nowrap',
            },
            taglineWhenLarge: {
                marginTop: 32,
            },
            h1WhenLarge: {
                fontSize: 56,
            },
            h2WhenLarge: {
                fontSize: 24,
                lineHeight: '32px',
                paddingTop: 16,
                marginBottom: 12,
            },
        };

        styles.h2 = Object.assign({}, styles.h1, styles.h2);

        if (this.props.width === LARGE) {
            styles.tagline = Object.assign({}, styles.tagline, styles.taglineWhenLarge);
            styles.h1 = Object.assign({}, styles.h1, styles.h1WhenLarge);
            styles.h2 = Object.assign({}, styles.h2, styles.h2WhenLarge);
        }

        return (
            <FullWidthSection style={styles.root}>
                <img style={styles.pngLogo} src="/templates/default/static/assets/images/logo.png" />
                <div style={styles.tagline}>
                    <h1 style={styles.h1}>无设计 不生活</h1>
                    <h2 style={styles.h2}>
                        A blog powered by <span style={styles.nowrap}>
            the React and</span> <span style={styles.nowrap}>
            Google&apos;s Material Design</span>
                    </h2>
                    <RaisedButton
                        label="GO TO WRITE"
                        onTouchTap={this.handleTouchTapDemo}
                        style={styles.demoStyle}
                        labelStyle={styles.label}
                    />
                </div>
            </FullWidthSection>
        );
    }

    renderArticles() {
        return (
            <div>
                { this.props.articles && this.props.articles.length ?
                    this.props.articles.map((article) =>
                        <ArticleCard
                            key={`article-${article.id}`}
                            article={article}
                        />
                    ) : null
                }
            </div>
        )
    }

    handleTouchTapDemo = () => {
        this.context.router.push('/admin/editor');
    };

    render() {
        const style = {
            paddingTop: spacing.desktopKeylineIncrement,
        };

        return (
            <div style={style}>
                {this.renderBanner()}
                {this.renderArticles()}
            </div>
        );
    }
}

export default withWidth()(HomePage);
