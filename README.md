react-colorpicker
=================

> React Color Picker

## Install

```sh
$ npm install react-colorpicker
```

## Usage

You can have either **controlled** (using **value**) or **uncontrolled** (using **defaultValue**) pickers.

Example (**controlled**)
```jsx

var React = require('react')
var ColorPicker = require('react-colorpicker')

var App = React.createClass({

    displayName: 'App',

    onDrag: function(color, c){
        COLOR = color
        this.setState({})
    },

    render: function(){

        return (
            <div>
                <ColorPicker value={COLOR} onDrag={this.onDrag} />
                <div style={{background: COLOR, width: 100, height: 50, color: 'white'}}>
                    {COLOR}
                </div>
            </div>
        )
    }
})

React.renderComponent(App(), document.body)

```

Example (**uncontrolled**)
```jsx
React.renderComponent(
    <ColorPicker defaultValue='#452135'/>,
    document.body
)

```


## HueSpectrum

You can use only the hue spectrum if that is what you need.

```jsx
var React = require('react')
var HueSpectrum = require('react-colorpicker/HueSpectrum')

<HueSpectrum value={color} />
<HueSpectrum defaultValue="red" />
```

## SaturationSpectrum

You can use only the saturation spectrum if that is what you need.

```jsx
var React = require('react')
var SaturationSpectrum = require('react-colorpicker/SaturationSpectrum')

<SaturationSpectrum value={color} />
<SaturationSpectrum defaultValue="red" />
```

## Properties

The ColorPicker, the HueSpectrum and the SaturationSpectrum all accept `onDrag` and `onChange` callbacks.

### onDrag(colorString)

Called during the dragging operation.

### onChange(colorString)

Called after mouse up - when the color has been selected