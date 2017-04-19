/**
 * Created by m2mbob on 2017/4/19.
 */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

export default class Editor extends PureComponent {
    static propTypes = {
        mardedText: PropTypes.string,
    }

    static defaultProps = {
        mardedText: '',
    }

    componentDidMount() {
        if (!window.mditor) {
            window.mditor = Mditor.fromTextarea(document.getElementById('editor'));
            window.mditor.height = `${window.innerHeight - 100}px`;
            window.mditor.on('ready', () => {
                window.mditor.value = this.props.mardedText
            })
        } else {
            document.getElementById('editor').style.display = "none"
            document.querySelector('.mditor').style.display = "block"
        }
    }

    componentWillUnmount() {
        document.querySelector('.mditor').style.display = "none"
    }

    render() {
        return(
            <textarea
                id="editor"
                name="editor"
            />
        )
    }
}
