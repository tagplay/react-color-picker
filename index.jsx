'use strict'

require('./resources/style/index.styl')

var React = require('react')
var ColorPicker = require('./src/index')

var colorUtils = require('./src/utils/color')

var COLOR = 'magenta'
var App = React.createClass({
    displayName: 'App',
    render: function(){

        var onChange = function(event){
            COLOR = event.target.value
            this.setState({})

        }.bind(this)

        return React.DOM.div({},
            ColorPicker({
                // defaultValue: 'red',
                value: COLOR,
                onDrag: function(color){
                    COLOR = color
                    this.setState({})
                }.bind(this),
                style: {
                    height: 400,
                    width: 400,
                    border: '1px solid red',
                    margin: 10
                }
            }),
            <div style ={{background: COLOR + '', width: 80, height: 30}}>
                {COLOR}
            </div>
        )
    }
})

React.renderComponent(App(), document.getElementById('content'))
