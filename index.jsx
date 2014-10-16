'use strict'

var React = require('react')

var ColorPicker = require('react-color-picker')
require('react-color-picker/index.css')

var COLOR = 'red'

var App = React.createClass({

    render: function(){

        return (
            <div style={{padding: 10}}>
                <p>
                    React Color Picker <br /><br />

                    <code>
                        npm install react-color-picker
                    </code>
                </p>

                <ColorPicker value={COLOR} onDrag={this.onDrag} />
                <div style={{background: COLOR, width: 100, height: 50, color: 'white'}}>
                    {COLOR}
                </div>

                <p>NO IMAGES</p>
                <p>
                    For example source code see <a href="./index.jsx">index.jsx</a>
                </p>
                <p>
                    Github: <a href="https://github.com/radubrehar/react-color-picker">radubrehar/react-color-picker</a>
                </p>
            </div>
        )
    },

    onDrag: function(color) {
        COLOR = color
        this.setState({})
    }
})

React.renderComponent(<App />, document.getElementById('content'))