'use strict'

var React = require('react')

var ColorPicker = require('react-color-picker')
require('react-color-picker/index.css')

var COLOR = 'red'

var App = React.createClass({

    render: function(){

        return (
            <div>
                <ColorPicker value={COLOR} onChange={this.onChange} />
                <div style={{background: COLOR, width: 100, height: 50, color: 'white'}}>
                    {COLOR}
                </div>
            </div>
        )
    },

    onChange: function(color) {
        COLOR = color
        this.setState({})
    }
})

React.renderComponent(<App />, document.body)