/**
 * Created by m2mbob on 2017/4/18.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Title from 'react-title-component'
import spacing from 'material-ui/styles/spacing'
import transitions from 'material-ui/styles/transitions'
import {pink500, grey50, blueGrey600} from 'material-ui/styles/colors'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Message from './common/Message'
import { connect } from 'react-redux'
import { logIn } from '../../actions/user'

@connect(
    store => ({}),
    dispatch => ({
        logIn: (username, password) => dispatch(logIn(username, password)),
    }),
)
export default class Login extends PureComponent {

    static contextTypes = {
        router: PropTypes.object.isRequired,
    }

    state = {
        zDepth: 1,
    }

    handleMouseEnter = () => {
        this.setState({
            zDepth: 4,
        })
    }

    handleMouseLeave = () => {
        this.setState({
            zDepth: 0,
        })
    }

    onChange(key, e) {
        this.setState({
            [key]: e.target.value,
        })
    }

    handleRegister = () => {
        this.context.router.push('/register')
    }

    handleLogin = () => {
        const { username, password } = this.state
        this.props.logIn(username, password).then((data) => {
            if (data && data.error) {
                Message.error('login failed');
            } else {
                this.context.router.push('/user')
            }
        })
    }

    renderLoginPanel() {
        const desktopGutter = spacing.desktopGutter;
        const styles = {
            root: {
                transition: transitions.easeOut(),
                margin: `${desktopGutter}px`,
            },
            logo: {
                margin: `${desktopGutter}px auto`,
                width: "100px",
            },
            fontC: {
                color: blueGrey600,
            },
            text: {
                width: `calc(100% - ${desktopGutter * 4}px)`,
                margin: `${desktopGutter / 2}px ${desktopGutter * 2}px`,
                fontSize: '18px',
            },
            input: {
                fontSize: '20px'
            },
            btn: {
                margin: '12px',
            },
        }
        return (
            <Paper
                zDepth={this.state.zDepth}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={styles.root}
            >
                <img src="/templates/default/static/assets/images/blue-logo.png" style={styles.logo} />
                <h2 style={styles.fontC}>LOG IN</h2>
                <TextField
                    hintText="用户名"
                    hintStyle={styles.fontC}
                    style={styles.text}
                    inputStyle={styles.input}
                    onChange={this.onChange.bind(this, 'username')}
                />
                <TextField
                    type="password"
                    hintText="密码"
                    hintStyle={styles.fontC}
                    style={styles.text}
                    inputStyle={styles.input}
                    onChange={this.onChange.bind(this, 'password')}
                />
                <RaisedButton
                    label="Login"
                    primary={true}
                    style={styles.btn}
                    onTouchTap={this.handleLogin}
                />
                <RaisedButton
                    label="Register"
                    secondary={true}
                    style={styles.btn}
                    onTouchTap={this.handleRegister}
                />
            </Paper>
        )
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <Title render={(previousTitle) => `login - ${previousTitle}`} />
                {this.renderLoginPanel()}
            </div>
        )
    }
}
