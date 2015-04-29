'use strict';

require('./style/index.styl')

var React       = require('react')
var ColorPicker = require('./src')

var COLOR = '#F28281'

var App = React.createClass({

    onDrag: function(c){
        COLOR = c
        this.setState({})
    },

    render: function(){
    	return <div>
        	<ColorPicker defaultValue={COLOR} onDrag={this.onDrag} saturationHeight={500}/>
        	<div style={{background: COLOR, width: 100, height: 100}} />
        </div>
    }
})


React.render(<App />, document.getElementById('content'))

