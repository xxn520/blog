/**
 * Created by m2mbob on 2017/4/14.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types';
import Title from 'react-title-component';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import spacing from 'material-ui/styles/spacing';
import {darkWhite, lightWhite, grey900} from 'material-ui/styles/colors';
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';
import AppNavDrawer from './AppNavDrawer'
import FullWidthSection from './FullWidthSection'

import { connect } from 'react-redux';
import { changeTheme } from '../actions/theme';

@connect(
    store => ({
        theme: store.theme,
    }),
    dispatch => ({
        changeTheme: (theme) => dispatch(changeTheme(theme))
    })
)
class Master extends PureComponent {
    static propTypes = {
        children: PropTypes.node,
        location: PropTypes.object,
        width: PropTypes.number.isRequired,
    }

    static contextTypes = {
        router: PropTypes.object.isRequired,
    };

    static childContextTypes = {
        muiTheme: PropTypes.object,
    };

    state = {
        navDrawerOpen: false,
    };

    getChildContext() {
        return {
            muiTheme: this.props.theme.muiTheme,
        };
    }

    getStyles() {
        const styles = {
            appBar: {
                position: 'fixed',
                zIndex: this.props.theme.muiTheme.zIndex.appBar + 1,
                top: 0,
            },
            root: {
                paddingTop: spacing.desktopKeylineIncrement,
                minHeight: 400,
            },
            content: {
                margin: spacing.desktopGutter,
            },
            contentWhenMedium: {
                margin: `${spacing.desktopGutter * 1}px ${spacing.desktopGutter * 2}px`,
            },
            footer: {
                backgroundColor: grey900,
                textAlign: 'center',
            },
            a: {
                color: darkWhite,
            },
            p: {
                margin: '0 auto',
                padding: 0,
                color: lightWhite,
                maxWidth: 356,
            },
            thank: {
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                margin: '25px 15px 0',
                padding: 0,
                color: lightWhite,
                lineHeight: '25px',
                fontSize: 12,
            },
            thankLink: {
                margin: '0 3px',
            },
            iconButton: {
                color: darkWhite,
            },
        };

        if (this.props.width === MEDIUM || this.props.width === LARGE) {
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);
        }

        return styles;
    }

    handleTouchTapLeftIconButton = () => {
        this.setState({
            navDrawerOpen: !this.state.navDrawerOpen,
        });
    };

    handleChangeRequestNavDrawer = (open) => {
        this.setState({
            navDrawerOpen: open,
        });
    };

    handleChangeList = (event, value) => {
        this.context.router.push(value);
        this.setState({
            navDrawerOpen: false,
        });
    };

    handleChangeMuiTheme = (muiTheme) => {
        this.props.changeTheme(muiTheme);
    };

    render() {
        const {
            location,
            children,
        } = this.props;
        let {
            navDrawerOpen,
        } = this.state;
        const {
            prepareStyles,
        } = this.props.theme.muiTheme;
        const router = this.context.router;
        const styles = this.getStyles()
        const title =
            router.isActive('/articles') ? 'Articles' : '';
        let docked = false;
        let showMenuIconButton = true;
        if (this.props.width === LARGE && title !== '') {
            docked = true;
            navDrawerOpen = true;
            showMenuIconButton = false;

            styles.navDrawer = {
                zIndex: styles.appBar.zIndex - 1,
            };
            styles.root.paddingLeft = 256;
            styles.footer.paddingLeft = 256;
        }
        return (
            <MuiThemeProvider muiTheme={this.props.theme.muiTheme}>
                <div className="index-page">
                    <Title render="blog" />
                    <AppBar
                        title={title}
                        showMenuIconButton={showMenuIconButton}
                        iconElementRight={
                            <IconButton
                                iconClassName="muidocs-icon-custom-github"
                                href="https://github.com/xxn520/blog"
                            />
                        }
                        onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
                        style={styles.appBar}
                        zDepth={0}
                    />
                    {title !== '' ?
                        <div style={prepareStyles(styles.root)}>
                            <div style={prepareStyles(styles.content)}>
                                {React.cloneElement(children, {
                                    onChangeMuiTheme: this.handleChangeMuiTheme,
                                })}
                            </div>
                        </div> :
                        children
                    }
                    <AppNavDrawer
                        style={styles.navDrawer}
                        location={location}
                        docked={docked}
                        onRequestChangeNavDrawer={this.handleChangeRequestNavDrawer}
                        onChangeList={this.handleChangeList}
                        open={navDrawerOpen}
                    />
                    <FullWidthSection style={styles.footer}>
                        <p style={prepareStyles(styles.p)}>
                            {'Hand crafted with love by the engineers at '}
                            <a style={styles.a} href="https://www.kujiale.com">
                                kujiale
                            </a>
                            {' and you can join us at '}
                            <a
                                style={prepareStyles(styles.a)}
                                href="https://www.kujiale.com/about/join"
                            >
                                here
                            </a>.
                        </p>
                        <IconButton
                            iconStyle={styles.iconButton}
                            iconClassName="muidocs-icon-custom-github"
                            href="https://github.com/xxn520/blog"
                        />
                        <p style={prepareStyles(styles.thank)}>
                            {'Thank you to '}
                            <a href="http://www.material-ui.com" style={prepareStyles(styles.thankLink)} target="_blank">
                                Material-UI
                            </a>
                            {' for providing React Components that Implement Material Design.'}
                        </p>
                    </FullWidthSection>
                </div>
            </MuiThemeProvider>
        )
    }
}

export default withWidth()(Master);
