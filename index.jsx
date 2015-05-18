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
    	return <div style={{margin: 30}}>
        	<h1>This works correctly</h1>
            <ColorPicker
                defaultValue={ COLOR }
                onDrag={ this.onDrag }
            />
            <h1>This does not work correctly</h1>
            <ColorPicker
                value={ COLOR }
                onDrag={ this.onDrag }
            />

        	<div style={{background: COLOR, width: 100, height: 100}}>
                <span style={{background: 'blue'}}>{COLOR}</span>
            </div>
        </div>
    }
})


React.render(<App />, document.getElementById('content'))

