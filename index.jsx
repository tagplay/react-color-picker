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
                value: COLOR,
                autoUpdate: false,
                onChange: function(color){
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
            (<select onChange={onChange}>
                <option value="#405b94">blue - #405b94</option>
                <option value="#40bb14">green - #40bb14</option>
            </select>
            ),
            React.DOM.div({
                style:{background: COLOR + '', width: 80, height: 30}
            }, COLOR)
        )
    }
})

React.renderComponent(App(), document.getElementById('content'))

