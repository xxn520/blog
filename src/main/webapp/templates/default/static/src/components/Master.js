/**
 * Created by m2mbob on 2017/4/14.
 */
import React, { PureComponent } from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import zIndex from 'material-ui/styles/zIndex'
import withWidth, {MEDIUM, LARGE} from 'material-ui/utils/withWidth';

export default class IndexPage extends PureComponent {
    getStyles() {
        const styles = {
            appBar: {
                position: 'fixed',
                // Needed to overlap the examples
                zIndex: zIndex.appBar + 1,
                top: 0,
            },
        };

        if (this.props.width === MEDIUM || this.props.width === LARGE) {
            styles.content = Object.assign(styles.content, styles.contentWhenMedium);
        }

        return styles;
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className="index-page">
                    <AppBar
                        className="app-bar"
                        zDepth={0}
                        iconElementRight={
                            <IconButton
                                iconClassName="muidocs-icon-custom-github"
                                href="https://github.com/callemall/material-ui"
                            />
                        }
                    />
                </div>
            </MuiThemeProvider>
        )
    }
}
