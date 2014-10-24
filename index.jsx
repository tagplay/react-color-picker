'use strict'

require('./resources/style/index.styl')

var React              = require('react')
var ColorPicker        = require('./src/index')
var HueSpectrum        = require('./src/HueSpectrum')
var SaturationSpectrum = require('./src/SaturationSpectrum')

var colorUtils = require('./src/utils/color')

var COLOR = '#234653'
var picker

function onDrag(c){
    COLOR = c
}

var App = React.createClass({

    getState: function(){},

    onDrag: function(c){
        onDrag(c)
        this.setState({})
    },

    render: function(){

        return <ColorPicker defaultValue={COLOR} onDrag={this.onDrag} saturationHeight={500}/>
    }
})


React.renderComponent(<App />, document.body)

