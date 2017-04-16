/**
 * Created by m2mbob on 2017/4/14.
 */
import React  from 'react'
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';

const Header = () => (
    <AppBar
        zDepth={0}
        iconElementRight={<IconButton iconClassName="muidocs-icon-custom-github" />}
    />
);

export default Header
