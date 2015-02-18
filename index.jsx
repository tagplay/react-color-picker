'use strict';

require('./style/index.styl')

var React              = require('react')
var ColorPicker        = require('./src')
var HueSpectrum        = require('./src/HueSpectrum')
var SaturationSpectrum = require('./src/SaturationSpectrum')

var colorUtils = require('./src/utils/color')

var COLOR = '#F28281'
var picker

function onDrag(c){
    COLOR = c
}

var App = React.createClass({

    getState: function(){},

    onDrag: function(c){
    	// console.log(c)
        onDrag(c)
        this.setState({})
    },

    render: function(){
    	// setTimeout(function(){
    	// 	this.setState({})
    	// }.bind(this), 100)
        return <div>
        	<ColorPicker defaultValue={COLOR} onDrag={this.onDrag} saturationHeight={500}/>
        	<div style={{background: COLOR, width: 100, height: 100}} />
        </div>
    }
})


React.render(<App />, document.body)

