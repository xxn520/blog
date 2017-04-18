import React from 'react'
import Notification from 'rc-notification'
import FontIcon from 'material-ui/FontIcon';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './Message.css'

let defaultDuration = 1.5
let defaultTop
let messageInstance
let key = 1
let prefixCls = 'md-message'
let getContainer

function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance({
            prefixCls,
            transitionName: 'move-up',
            style: { top: defaultTop }, // 覆盖原来的样式
            getContainer,
        })
    return messageInstance
}

function notice(content, duration, type, onClose) {
    let iconType = ({
        info: 'info',
        success: 'done',
        error: 'error',
        warning: 'warning',
        loading: 'autorenew',
    })[type]

    let instance = getMessageInstance();
    instance.notice({
        key,
        duration,
        style: {},
        content: (
            <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
                <div className={`${prefixCls}-custom-content ${prefixCls}-${type}`}>
                    <FontIcon className="material-icons">{iconType}</FontIcon>
                    <span>{content}</span>
                </div>
            </MuiThemeProvider>
        ),
        onClose,
    })
    return (function () {
        let target = key++
        return function () {
            instance.removeNotice(target)
        }
    }())
}

export default {
    info(content, duration, onClose) {
        return notice(content, duration, 'info', onClose)
    },
    success(content, duration, onClose) {
        return notice(content, duration, 'success', onClose)
    },
    error(content, duration, onClose) {
        return notice(content, duration, 'error', onClose)
    },
    warning(content, duration, onClose) {
        return notice(content, duration, 'warning', onClose)
    },
    loading(content, duration, onClose) {
        return notice(content, duration, 'loading', onClose)
    },
    config(options) {
        if (options.top !== undefined) {
            defaultTop = options.top
            messageInstance = null // delete messageInstance for new defaultTop
        }
        if (options.duration !== undefined) {
            defaultDuration = options.duration
        }
        if (options.prefixCls !== undefined) {
            prefixCls = options.prefixCls
        }
        if (options.getContainer !== undefined) {
            getContainer = options.getContainer
        }
    },
    destroy() {
        if (messageInstance) {
            messageInstance.destroy()
            messageInstance = null
        }
    },
}
