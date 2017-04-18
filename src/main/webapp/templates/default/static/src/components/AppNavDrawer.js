/**
 * Created by m2mbob on 2017/4/16.
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Drawer from 'material-ui/Drawer'
import {List, ListItem, makeSelectable} from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import {spacing, typography, zIndex} from 'material-ui/styles'
import {cyan500} from 'material-ui/styles/colors'

const SelectableList = makeSelectable(List);

const styles = {
    logo: {
        cursor: 'pointer',
        fontSize: 24,
        color: typography.textFullWhite,
        lineHeight: `${spacing.desktopKeylineIncrement}px`,
        fontWeight: typography.fontWeightLight,
        backgroundColor: cyan500,
        paddingLeft: spacing.desktopGutter,
        marginBottom: 8,
    },
};

class AppNavDrawer extends Component {
    static propTypes = {
        docked: PropTypes.bool.isRequired,
        location: PropTypes.object.isRequired,
        onChangeList: PropTypes.func.isRequired,
        onRequestChangeNavDrawer: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        style: PropTypes.object,
        categories: PropTypes.array.isRequired
    };

    static defaultProps = {
        categories: [],
    }

    static contextTypes = {
        muiTheme: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired,
    };

    handleRequestChangeLink = (event, value) => {
        window.location = value;
    };

    handleTouchTapHeader = () => {
        this.context.router.push('/');
        this.props.onRequestChangeNavDrawer(false);
    };

    render() {
        const {
            location,
            docked,
            onRequestChangeNavDrawer,
            onChangeList,
            open,
            style,
            categories,
            user,
        } = this.props;
        return (
            <Drawer
                style={style}
                docked={docked}
                open={open}
                onRequestChange={onRequestChangeNavDrawer}
                containerStyle={{zIndex: zIndex.drawer - 100}}
            >
                <div style={styles.logo} onTouchTap={this.handleTouchTapHeader}>
                    blog
                </div>
                <SelectableList
                    value={decodeURIComponent(location.pathname)}
                    onChange={onChangeList}
                >
                    <ListItem
                        primaryText="Category"
                        primaryTogglesNestedList={true}
                        nestedItems={categories.map((c) =>
                            <ListItem
                                key={`category-${c.id}`}
                                primaryText={c.name}
                                value={`/category/${c.name}`}
                            />
                        )}
                    />
                </SelectableList>
                <SelectableList
                    value={location.pathname}
                    onChange={onChangeList}
                >
                    <ListItem
                        key={`archives`}
                        primaryText="Archives"
                        value={`/archives`}
                    />
                </SelectableList>
                <Divider />
                <SelectableList
                    value=""
                    onChange={onChangeList}
                >
                    <Subheader>User</Subheader>
                    { user && user.id ?
                        <ListItem primaryText="LOG OUT" value="/logout"/> :
                        <ListItem primaryText="LOG IN" value="/login"/>
                    }
                </SelectableList>
                <Divider />
                <SelectableList
                    value=""
                    onChange={this.handleRequestChangeLink}
                >
                    <Subheader>Links</Subheader>
                    <ListItem primaryText="GitHub" value="https://github.com/xxn520" />
                    <ListItem primaryText="Company" value="https://www.kujiale.com" />
                    <ListItem primaryText="Material-UI" value="http://www.material-ui.com/" />
                </SelectableList>
            </Drawer>
        );
    }
}

export default AppNavDrawer
