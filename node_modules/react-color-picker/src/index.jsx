'use strict'

var React = require('react')
var copy  = require('copy-utils').copy
var colorUtils = require('./utils/color')

var SaturationSpectrum = require('./SaturationSpectrum')
var HueSpectrum = require('./HueSpectrum')

var toHsv     = colorUtils.toHsv
var toColor   = colorUtils.toColor

function emptyFn(){}

var RESULT = React.createClass({

    displayName: 'ColorPicker',

    getDefaultProps: function(){
        return {
            defaultColor: require('./defaultColor'),
            hueMargin   : 10
        }
    },

    getInitialState: function(){
        return {
            value: this.props.defaultValue
        }
    },

    prepareClasses: function(classes){
        classes.push('cp')
    },

    prepareProps: function(props){

        var classes = [props.className || '']
        this.prepareClasses(classes)
        props.className = classes.join(' ')

        return props
    },

    render: function(){

        var props = this.prepareProps(copy(this.props))

        var hueStyle = this.props.hueStyle || {}

        hueStyle.marginLeft = this.props.hueMargin


        var value = props.value?
                        this.toColorValue(this.props.value):
                        null

        var defaultValue = !value?
                                this.toColorValue(this.state.value || props.defaultValue || props.defaultColor):
                                null

        var saturationConfig = {
            onDrag     : this.handleSaturationDrag,
            onChange   : this.handleSaturationChange,
            onMouseDown: this.handleSaturationMouseDown,
            inPicker   : true
        }

        var hueConfig = {
            onDrag     : this.handleHueDrag,
            onChange   : this.handleHueChange,
            inPicker   : true,
            style      : hueStyle
        }

        if (this.state.dragHue){
            ;(value || defaultValue).h = this.state.dragHue
        }

        if (value){
            saturationConfig.value = copy(value)
            hueConfig.value = copy(value)
        } else {
            saturationConfig.defaultValue = copy(defaultValue)
            hueConfig.defaultValue = copy(defaultValue)
        }

        return React.DOM.div(
                props,
                SaturationSpectrum(saturationConfig),
                HueSpectrum(hueConfig)
            )
    },

    toColorValue: function(value){
        return typeof value == 'string'?
                    toHsv(value):
                    value
    },

    toStringValue: require('./utils/toStringValue'),

    handleChange: function(color){

        this.state.dragHue = null

        color = copy(color)

        var value = this.toStringValue(color)

        ;(this.props.onChange || emptyFn)(value, color)
    },

    handleSaturationChange: function(color){
        this.handleChange(color)
    },

    handleHueChange: function(color){
        this.handleChange(color)
    },

    handleHueDrag: function(hsv){
        this.handleDrag(hsv)
    },

    handleSaturationDrag: function(hsv){
        this.handleDrag(hsv)
    },

    handleDrag: function(color){

        if (!this.props.value){
            this.setState({
                value: color
            })
        }

        ;(this.props.onDrag || emptyFn)(this.toStringValue(color), color)
    },

    handleSaturationMouseDown: function(hsv){

        this.setState({
            dragHue: hsv.h
        })

    }
})

RESULT.HueSpectrum = HueSpectrum
RESULT.SaturationSpectrum = SaturationSpectrum

module.exports = RESULT