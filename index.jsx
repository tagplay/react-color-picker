'use strict'

require('./resources/style/index.styl')

var React = require('react')
var ColorPicker = require('./src/index')

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
            </div>
        )
    },

    onDrag: function(color) {
        COLOR = color
        this.setState({})
    }
})

React.renderComponent(App(), document.getElementById('content'))
